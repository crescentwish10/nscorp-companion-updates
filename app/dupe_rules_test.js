const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const appSource = fs.readFileSync(path.join(__dirname, "app.js"), "utf8");

function extractBetween(startMarker, endMarker) {
  const start = appSource.indexOf(startMarker);
  const end = appSource.indexOf(endMarker, start);
  if (start < 0 || end < 0) {
    throw new Error(`Could not extract ${startMarker} -> ${endMarker}`);
  }
  return appSource.slice(start, end);
}

const ruleSource = [
  extractBetween("function displayValue", "function mergeAddressCountry"),
  extractBetween("function cleanRecordId", "function zoomInfoProfileUrl"),
].join("\n");

const context = vm.createContext({ URL });
vm.runInContext(ruleSource, context, { filename: "dupe-rule-slice.js" });

function reasons(source, candidate) {
  return Array.from(context.dupeCandidateMatches(source, candidate));
}

function reviewReasons(source, candidate) {
  return Array.from(context.dupeCandidateReviewReasons(source, candidate));
}

function assertNoMatch(name, source, candidate) {
  assert.deepStrictEqual(reasons(source, candidate), [], name);
}

function assertMatch(name, source, candidate, expectedReason) {
  const matchReasons = reasons(source, candidate);
  assert(
    matchReasons.includes(expectedReason),
    `${name}: expected ${expectedReason}, got ${JSON.stringify(matchReasons)}`,
  );
}

assertMatch(
  "strips trailing legal suffixes before matching",
  { internalId: "1", companyName: "Stored Energy Holdings, Inc", webAddress: "storedenergy.com" },
  { internalId: "2", companyName: "Stored Energy Holdings", webAddress: "storedenergy.com" },
  "Same web domain",
);

assert.deepStrictEqual(
  Array.from(context.dupeCompanySearchTerms({ companyName: "Redhill Holdings d.b.a. Redhill Business Analytics, LLC" })),
  ["Redhill Business Analytics"],
  "DBA names should search only the public DBA name",
);

assert.strictEqual(
  context.dupeDomainKey("www.testwebsite.com.ph/education/parcel/test.html"),
  "testwebsite.com.ph",
  "duplicate finder domain search should preserve the full host and drop URL paths",
);

assert.strictEqual(
  context.dupeDomainKey("support@ashomes.mb.ca"),
  "ashomes.mb.ca",
  "duplicate finder email domain search should preserve provincial Canadian domains",
);

assertNoMatch(
  "rejects generic single-token name fallback from A&S Homes",
  { internalId: "211024565", companyName: "A&S Homes", webAddress: "ashomes.ca", email: "support@ashomes.mb.ca" },
  { internalId: "1494612", companyName: "Homes, Loans and Beyond", webAddress: "homesloansandbeyond.com", status: "CUSTOMER-CLOSED WON" },
);

assertNoMatch(
  "rejects shared-domain customer when company names do not match",
  { internalId: "5951293", companyName: "J Horton Foods LLC", webAddress: "culvers.com" },
  { internalId: "11257624", companyName: "Culver Franchising System, LLC", webAddress: "culvers.com", status: "CUSTOMER-CLOSED WON" },
);

assert(
  reviewReasons(
    { internalId: "5951293", companyName: "J Horton Foods LLC", webAddress: "culvers.com" },
    { internalId: "11257624", companyName: "Culver Franchising System, LLC", webAddress: "culvers.com", status: "CUSTOMER-CLOSED WON" },
  ).includes("Review: same domain, different name"),
  "shared-domain different-name customers should be shown for review, not used as valid masters",
);

assertNoMatch(
  "rejects email-domain customer when company names do not match",
  { internalId: "11664906", companyName: "PSJ Netsuite Solutions", email: "ops@example-domain.com" },
  { internalId: "90001", companyName: "Different Customer, Inc.", webAddress: "example-domain.com", status: "CUSTOMER-CLOSED WON" },
);

assert(
  reviewReasons(
    { internalId: "11664906", companyName: "PSJ Netsuite Solutions", email: "ops@example-domain.com" },
    { internalId: "90001", companyName: "Different Customer, Inc.", webAddress: "example-domain.com", status: "CUSTOMER-CLOSED WON" },
  ).includes("Review: same email domain, different name"),
  "email-domain different-name customers should be shown for review, not used as valid masters",
);

assertNoMatch(
  "rejects demo account candidates",
  { internalId: "11449588", companyName: "Redhill Business Analytics", webAddress: "redhillanalytics.com" },
  { internalId: "12187178", companyName: "Redhill Business Analytics LLC (NSEPM Demo Account #1 - 2025-12-09)", webAddress: "redhillanalytics.com", status: "CUSTOMER-CLOSED WON" },
);

assertMatch(
  "allows StepStone-style matches by name without using ZoomInfo",
  { internalId: "12335216", companyName: "StepStone Group", webAddress: "stepstonegroup.com", zoomInfoCompanyId: "36652039" },
  { internalId: "4469338", companyName: "StepStone Group LP", webAddress: "stepstoneglobal.com", zoomInfoCompanyId: "36652039", status: "CUSTOMER-CLOSED WON" },
  "Exact company name",
);

assertMatch(
  "allows strong DBA name variants without requiring exact domains",
  { internalId: "12454454", companyName: "Core Fueling", webAddress: "corefueling.com" },
  { internalId: "7558913", companyName: "Permian Global Inc DBA CORE Automated Fueling Solutions", webAddress: "coreautomatedfueling.com", status: "CUSTOMER-CLOSED WON" },
  "Similar company name",
);

assertMatch(
  "allows single-token source names to match candidate names that begin with the same token",
  { internalId: "12454186", companyName: "REED", webAddress: "reed.com", status: "LEAD-IN PROCESS" },
  { internalId: "7502715", companyName: "Reed Consultants International Pty Ltd", webAddress: "reedconsultants.com", status: "CUSTOMER-CLOSED WON" },
  "Similar company name",
);

assert(
  !reasons(
    { internalId: "12335216", companyName: "StepStone Group", webAddress: "stepstonegroup.com", zoomInfoCompanyId: "36652039" },
    { internalId: "4469338", companyName: "StepStone Group LP", webAddress: "stepstoneglobal.com", zoomInfoCompanyId: "36652039", status: "CUSTOMER-CLOSED WON" },
  ).includes("Same ZoomInfo Company ID"),
  "ZoomInfo should not appear as a duplicate reason",
);

assertNoMatch(
  "rejects Valid Solutions versus Consultant Lead Undisclosed",
  { internalId: "5462597", companyName: "Valid Solutions Consulting LLC", webAddress: "validsolutions.com" },
  { internalId: "9635996", companyName: "Consultant Lead Undisclosed", webAddress: "validsolutions.com", status: "PROSPECT" },
);

{
  const result = context.chooseDupeMaster(
    { internalId: "12454186", companyName: "REED", status: "LEAD-IN PROCESS" },
    [
      { internalId: "7502232", companyName: "Reed Consultants", status: "PROSPECT-Prospect LOST" },
      { internalId: "7502715", companyName: "Reed Consultants International Pty Ltd", status: "CUSTOMER-CLOSED WON" },
    ],
  );
  assert.strictEqual(result.master.internalId, "7502715", "Customer Closed Won should beat a closer lower-stage name match");
}

{
  const source = { internalId: "5951293", companyName: "J Horton Foods LLC", webAddress: "culvers.com", status: "LEAD-IN PROCESS" };
  const result = context.dupeMasterResultForCandidates(source, [
    {
      review: true,
      record: { internalId: "11257624", companyName: "Culver Franchising System, LLC", webAddress: "culvers.com", status: "CUSTOMER-CLOSED WON" },
      reasons: ["Review: same domain, different name"],
    },
  ]);
  assert.strictEqual(result.master.internalId, "5951293", "review-only candidates should not populate Column F");
  assert.strictEqual(result.reason, "Review candidate found; needs manual review");
}

{
  const compressed = context.dupeCompressCandidates([
    {
      record: { internalId: "900", companyName: "Acme Holdings", status: "CUSTOMER-CLOSED WON" },
      reasons: ["Same web domain", "Exact company name"],
    },
    {
      record: { internalId: "901", companyName: "Acme Holdings Lead", status: "LEAD-IN PROCESS" },
      reasons: ["Similar company name"],
    },
    {
      record: { internalId: "902", companyName: "Acme Holdings Cold Lead", status: "LEAD-COLD CALL" },
      review: true,
      reasons: ["Review: same domain, different name"],
    },
  ]);
  assert.deepStrictEqual(
    Array.from(compressed, (item) => item.record.internalId),
    ["900"],
    "high-confidence customer/prospect candidates should hide Lead candidates from Potential Master",
  );
}

{
  const compressed = context.dupeCompressCandidates([
    {
      record: { internalId: "900", companyName: "Different Customer", status: "CUSTOMER-CLOSED WON" },
      review: true,
      reasons: ["Review: same domain, different name"],
    },
    {
      record: { internalId: "901", companyName: "Acme Holdings Lead", status: "LEAD-IN PROCESS" },
      reasons: ["Similar company name"],
    },
  ]);
  assert.deepStrictEqual(
    Array.from(compressed, (item) => item.record.internalId),
    ["900", "901"],
    "review-only customer/prospect candidates should not hide Lead candidates",
  );
}

assert.strictEqual(
  context.dupeRecordLabel({
    entityId: "81339 Gibney Consulting (US) LLC d.b.a. Redhill Business Analytics (SI)",
    companyName: "Gibney Consulting LLC d.b.a. Redhill Business Analytics",
    internalId: "11449588",
  }),
  "81339 Gibney Consulting (US) LLC d.b.a. Redhill Business Analytics (SI)",
  "record labels should not append a company name already represented in the ID",
);

console.log("dupe rule tests passed");
