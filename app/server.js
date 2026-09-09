const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { spawn, execFileSync } = require("node:child_process");

const PORT = Number(process.env.PORT || 8765);
const CHROME_DEBUG_PORT = Number(process.env.CHROME_DEBUG_PORT || 9222);
const FIREFOX_WEBDRIVER_PORT = Number(process.env.FIREFOX_WEBDRIVER_PORT || 4445);
const ROOT = __dirname;
const APP_VERSION = "2.4.0";
const NETSUITE_ORIGIN = "https://nlcorp.app.netsuite.com";
const CHROME_DEBUG_HOSTS = ["localhost", "127.0.0.1", "[::1]"];
const EXTRACT_DIR = process.env.EXTRACT_DIR || path.join(os.homedir(), "Downloads");
const LINK_CONFIG_PATH = path.join(ROOT, "quick-links.json");
const HYBRID_REPS_PATH = path.join(ROOT, "hybrid-reps.json");
const STATIC_GROUPS_HISTORY_PATH = path.join(ROOT, "static-groups-history.json");
const FIREFOX_SESSION_PATH = path.join(ROOT, "firefox-session.json");
const UPDATE_MANIFEST_URL = "https://raw.githubusercontent.com/crescentwish10/nscorp-companion-updates/main/latest.json";
const UPDATE_REPO_OWNER = "crescentwish10";
const UPDATE_REPO_NAME = "nscorp-companion-updates";
const UPDATE_RESTART_EXIT_CODE = 10;
const LOCAL_APP_FILES = new Set(["quick-links.json", "hybrid-reps.json", "static-groups-history.json", "firefox-session.json"]);
const WORKER_TAB_URL = `${NETSUITE_ORIGIN}/app/center/card.nl?sc=-29&whence=`;
const STATIC_GROUP_CREATE_URL = `${NETSUITE_ORIGIN}/app/crm/common/crmgroup.nl?savedsearch=-1&grouptype=CustJob&dynamic=F`;
const WORKER_TAB_TITLE = "Search and Merge Worker";
const DUPE_WORKER_TAB_TITLE = "Duplicate Finder Worker";
const DOMAIN_WORKER_TAB_TITLE = "Domain Search Worker";
const ROE_WORKER_TAB_TITLE = "ROE Checker Worker";
const TERRITORY_WORKER_TAB_TITLE = "Territories Worker";
const STATIC_GROUP_WORKER_TAB_TITLE = "Static Group Worker";
const SESSION_INVALID_ERROR_CODE = "NSCORP_SESSION_INVALID";
const SESSION_INVALID_MESSAGE = "NSCORP session appears disconnected or hijacked. Launch or connect the selected browser, sign in to NSCORP, then rerun the remaining records.";

function cleanLocalDisplayName(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return raw
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}

function localDisplayName() {
  const candidates = [];
  try {
    candidates.push(path.basename(os.homedir()));
  } catch {}
  try {
    candidates.push(os.userInfo().username);
  } catch {}
  candidates.push(process.env.USERNAME, process.env.USER);
  for (const candidate of candidates) {
    const cleaned = cleanLocalDisplayName(candidate);
    if (cleaned) return cleaned;
  }
  return "there";
}

const EXTRACT_FIELDS = [
  { label: "Inactive", key: "inactive", source: "isinactive", checkbox: true },
  { label: "Internal ID", key: "internalId", source: "internalid" },
  { label: "ID", key: "id", source: "entityid" },
  { label: "Company Name", key: "companyName", source: "companyname" },
  { label: "Status", key: "status", source: "entitystatus" },
  { label: "Sales Rep", key: "salesRep", source: "salesrep" },
  { label: "LSAD Date (Custom)", key: "lsadDate", source: "custentity_lsad_date" },
  { label: "Partner", key: "partner", source: "partner" },
  { label: "Industry (Custom)", key: "industry", source: "custentity_gtm_industry" },
  { label: "Industry Subgroup (Custom)", key: "industrySubgroup", source: "custentity_gtm_industry_subgroup" },
  { label: "Annual Revenue (Custom)", key: "annualRevenue", source: "custentity159" },
  { label: "Web Address", key: "webAddress", source: "url" },
  { label: "Billing State/Province", key: "billingStateProvince", source: "billstate" },
  { label: "Out of Alignment (Custom)", key: "outOfAlignment", source: "custentity172", checkbox: true },
  { label: "Previous Sales Rep (Custom)", key: "previousSalesRep", source: "custentity_prev_salesrep" },
  { label: "Target Record (Custom)", key: "targetRecord", source: "custentity_target_record", checkbox: true },
  { label: "Target Record Date (Custom)", key: "targetRecordDate", source: "custentity_target_record_date" },
];

const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

const DEFAULT_LINK_CONFIG = {
  quickLinks: [
    {
      id: "territory-list",
      label: "Territory List",
      url: "https://nlcorp.app.netsuite.com/app/crm/sales/salesterritorylist.nl?whence=",
    },
    {
      id: "change-sales-rep",
      label: "Change Sales Rep",
      url: "https://nlcorp.app.netsuite.com/app/common/bulk/bulkresults.nl?searchid=1314635",
    },
    {
      id: "change-rep-tal",
      label: "Change Rep + TAL",
      url: "https://nlcorp.app.netsuite.com/app/common/bulk/bulkresults.nl?_entryformparams=null&searchid=1306473&refresh=&whence=",
    },
    {
      id: "add-secondary-sales-rep",
      label: "Add Secondary Sales Rep",
      url: "https://nlcorp.app.netsuite.com/app/common/bulk/bulkop.nl?id=444216&e=T&_entryformparams=",
    },
  ],
  csvLinks: [
    {
      id: "sales-rep-transfer",
      label: "Sales Rep Transfer",
      url: "https://nlcorp.app.netsuite.com/app/setup/assistants/nsimport/importassistant.nl?recid=9784&new=T",
    },
    {
      id: "static-group-creation",
      label: "Static Group Creation",
      url: "https://nlcorp.app.netsuite.com/app/setup/assistants/nsimport/importassistant.nl?recid=10046&new=T",
    },
  ],
};

let launchedChrome = null;
let launchedFirefoxDriver = null;
let firefoxSession = null;
let activeBrowserMode = "chrome";
const firefoxBackgroundTabs = new Set();
let firefoxOperationQueue = Promise.resolve();

function withFirefoxOperation(operation) {
  const run = firefoxOperationQueue.then(operation, operation);
  firefoxOperationQueue = run.catch(() => {});
  return run;
}
const WORKER_LANES = {
  main: { title: WORKER_TAB_TITLE, legacyTitles: ["NSCORP Companion Worker"], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
  dupe: { title: DUPE_WORKER_TAB_TITLE, legacyTitles: ["Duplicate Helper Tab"], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
  domain: { title: DOMAIN_WORKER_TAB_TITLE, legacyTitles: ["Doman Search Worker"], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
  roe: { title: ROE_WORKER_TAB_TITLE, legacyTitles: ["ROE Helper Tab"], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
  territory: { title: TERRITORY_WORKER_TAB_TITLE, legacyTitles: [], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
  staticGroup: { title: STATIC_GROUP_WORKER_TAB_TITLE, legacyTitles: [], tabId: null, queue: Promise.resolve(), generation: 0, running: 0, lastStartedAt: null, lastFinishedAt: null },
};

function normalizeBrowserMode(value) {
  return String(value || "").trim().toLowerCase() === "firefox" ? "firefox" : "chrome";
}

function browserLabel(mode = activeBrowserMode) {
  return normalizeBrowserMode(mode) === "firefox" ? "Firefox" : "Chrome";
}

function browserConnectionLabel(mode = activeBrowserMode) {
  return normalizeBrowserMode(mode) === "firefox" ? "Firefox automation" : "Chrome Debug";
}

function reconnectBrowserMessage() {
  return `Launch or connect ${browserLabel()}, sign in to NSCORP, then try again.`;
}

function hasRunningWorkers() {
  return Object.values(WORKER_LANES).some((state) => Number(state.running || 0) > 0);
}

function switchActiveBrowser(mode) {
  const nextMode = normalizeBrowserMode(mode);
  if (nextMode === activeBrowserMode) return activeBrowserMode;
  if (hasRunningWorkers()) {
    throw new Error("Wait for the current NSCORP task to finish before switching browsers.");
  }
  for (const state of Object.values(WORKER_LANES)) {
    state.generation += 1;
    state.tabId = null;
    state.queue = Promise.resolve();
    state.running = 0;
    state.lastStartedAt = null;
    state.lastFinishedAt = null;
  }
  activeBrowserMode = nextMode;
  return activeBrowserMode;
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body, null, 2));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

async function readJson(req) {
  const body = await readBody(req);
  if (!body.trim()) return {};
  return JSON.parse(body);
}

function cloneLinkConfig(config = DEFAULT_LINK_CONFIG) {
  return {
    quickLinks: (config.quickLinks || []).map((link) => ({ ...link })),
    csvLinks: (config.csvLinks || []).map((link) => ({ ...link })),
  };
}

function normalizeLinkSection(section) {
  if (section === "quickLinks") return "quickLinks";
  if (section === "csvLinks" || section === "csv") return "csvLinks";
  throw new Error("Unknown link section.");
}

function normalizeLinkUrl(url) {
  const raw = String(url || "").trim();
  if (!/^(https?:\/\/|www\.)/i.test(raw)) {
    throw new Error("URL must start with https://, http://, or www.");
  }
  const candidate = /^www\./i.test(raw) ? `https://${raw}` : raw;
  let parsed;
  try {
    parsed = new URL(candidate);
  } catch {
    throw new Error("Enter a valid URL that starts with https://, http://, or www.");
  }
  return parsed.href;
}

function makeLinkId(label, existingLinks = []) {
  const base = String(label || "link")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    || "link";
  const used = new Set(existingLinks.map((link) => link.id));
  let candidate = base;
  let index = 2;
  while (used.has(candidate)) {
    candidate = `${base}-${index}`;
    index += 1;
  }
  return candidate;
}

function sanitizeLink(link, existingLinks = []) {
  const label = String(link?.label || "").replace(/\s+/g, " ").trim();
  if (!label) throw new Error("Link label is required.");
  if (label.length > 80) throw new Error("Link label is too long.");
  return {
    id: String(link?.id || makeLinkId(label, existingLinks)).trim(),
    label,
    url: normalizeLinkUrl(link?.url),
  };
}

async function readLinkConfig() {
  let rawConfig = cloneLinkConfig();
  try {
    const raw = await fs.promises.readFile(LINK_CONFIG_PATH, "utf8");
    rawConfig = { ...rawConfig, ...JSON.parse(raw) };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  const config = { quickLinks: [], csvLinks: [] };
  for (const section of ["quickLinks", "csvLinks"]) {
    const seen = [];
    for (const link of Array.isArray(rawConfig[section]) ? rawConfig[section] : []) {
      try {
        const sanitized = sanitizeLink(link, seen);
        if (!seen.some((existing) => existing.id === sanitized.id)) {
          seen.push(sanitized);
        }
      } catch {
        // Skip malformed saved links; valid defaults stay available.
      }
    }
    config[section] = seen;
  }
  return config;
}

async function writeLinkConfig(config) {
  const safeConfig = {
    quickLinks: (config.quickLinks || []).map((link, index, list) => sanitizeLink(link, list.slice(0, index))),
    csvLinks: (config.csvLinks || []).map((link, index, list) => sanitizeLink(link, list.slice(0, index))),
  };
  await fs.promises.writeFile(LINK_CONFIG_PATH, `${JSON.stringify(safeConfig, null, 2)}\n`, "utf8");
  return safeConfig;
}

function normalizeInternalId(value) {
  return String(value || "").trim();
}

function normalizeHybridConfig(rawConfig = {}) {
  const reps = {};
  const source = rawConfig.reps && typeof rawConfig.reps === "object" ? rawConfig.reps : rawConfig;
  for (const [rawInternalId, rawEntry] of Object.entries(source || {})) {
    const internalId = normalizeInternalId(rawEntry?.internalId || rawInternalId);
    if (!internalId) continue;
    const hybrid = rawEntry === true || Boolean(rawEntry?.hybrid);
    if (!hybrid) continue;
    reps[internalId] = {
      internalId,
      hybrid: true,
      name: String(rawEntry?.name || "").trim(),
      vertical: String(rawEntry?.vertical || "").trim(),
      tier: String(rawEntry?.tier || "").trim(),
      salesSubRegion: String(rawEntry?.salesSubRegion || "").trim(),
      salesRole: String(rawEntry?.salesRole || "").trim(),
      rosterStatus: String(rawEntry?.rosterStatus || "").trim(),
      updatedAt: String(rawEntry?.updatedAt || "").trim(),
    };
  }
  return { reps };
}

async function readHybridConfig() {
  try {
    const raw = await fs.promises.readFile(HYBRID_REPS_PATH, "utf8");
    return normalizeHybridConfig(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return { reps: {} };
  }
}

async function writeHybridConfig(config) {
  const safeConfig = normalizeHybridConfig(config);
  await fs.promises.writeFile(HYBRID_REPS_PATH, `${JSON.stringify(safeConfig, null, 2)}\n`, "utf8");
  return safeConfig;
}

function staticGroupHistoryLabel(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function normalizeStaticGroupHistory(rawItems) {
  const items = Array.isArray(rawItems) ? rawItems : Array.isArray(rawItems?.items) ? rawItems.items : [];
  return items
    .map((item) => {
      const id = String(item?.id || "").trim();
      const name = String(item?.name || "").replace(/\s+/g, " ").trim();
      const url = String(item?.url || "").trim();
      const createdAt = String(item?.createdAt || "").trim();
      if (!name && !url && !id) return null;
      return {
        id,
        name: name || id || "Static Group",
        url,
        memberCount: Number(item?.memberCount || 0),
        skippedCount: Number(item?.skippedCount || 0),
        createdAt,
        createdAtLabel: staticGroupHistoryLabel(createdAt),
      };
    })
    .filter(Boolean)
    .slice(0, 50);
}

async function readStaticGroupHistory() {
  try {
    const raw = await fs.promises.readFile(STATIC_GROUPS_HISTORY_PATH, "utf8");
    return normalizeStaticGroupHistory(JSON.parse(raw));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return [];
  }
}

async function writeStaticGroupHistory(items) {
  const safeItems = normalizeStaticGroupHistory(items);
  await fs.promises.writeFile(STATIC_GROUPS_HISTORY_PATH, `${JSON.stringify({ items: safeItems }, null, 2)}\n`, "utf8");
  return safeItems;
}

async function addStaticGroupHistory(item) {
  const existing = await readStaticGroupHistory();
  const next = normalizeStaticGroupHistory([item, ...existing]);
  return writeStaticGroupHistory(next);
}

async function updateStaticGroupHistoryCount(groupId, memberCount) {
  const id = String(groupId || "").trim();
  const count = Number(memberCount);
  if (!id || !Number.isFinite(count) || count < 0) return readStaticGroupHistory();
  const existing = await readStaticGroupHistory();
  const updated = existing.map((group) => {
    if (String(group.id || "") !== id) return group;
    const originalTotal = Number(group.memberCount || 0) + Number(group.skippedCount || 0);
    return {
      ...group,
      memberCount: count,
      skippedCount: Math.max(0, originalTotal - count),
    };
  });
  return writeStaticGroupHistory(updated);
}

function staticGroupMemberStateExpression() {
  return `(() => {
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const title = document.title || "";
    const text = compact(document.body?.innerText || document.body?.textContent || "");
    const loginLikely = /login|sign in/i.test(title)
      || /email address.*password|forgot your password/i.test(text);
    const errorText = compact(Array.from(document.querySelectorAll(".uir-message-error, .error, .uir-alert-box.error, [class*='error']")).map((node) => node.innerText || node.textContent || "").join(" "));
    const rangeText = document.querySelector("input[name='inpt_groupmembersrange']")?.value || "";
    const rangeMatch = rangeText.match(/\\b\\d+\\s+to\\s+\\d+\\s+of\\s+(\\d+)\\b/i)
      || text.match(/\\b\\d+\\s*-\\s*\\d+\\s+of\\s+(\\d+)\\b/i);
    const memberLabelMatch = text.match(/\\b(?:members?|customers?)\\s*[:(]\\s*(\\d+)\\b/i);
    const dataField = document.forms.main_form?.elements.groupmembersdata || document.querySelector("[name='groupmembersdata']");
    const dataCount = String(dataField?.value || "")
      .split("\\u0002")
      .map((line) => line.split("\\u0001")[2])
      .filter(Boolean)
      .length;
    const linkCount = new Set(Array.from(document.querySelectorAll("a[href*='/app/common/entity/custjob.nl?id=']")).map((anchor) => {
      try { return new URL(anchor.href, location.origin).searchParams.get("id") || ""; } catch { return ""; }
    }).filter(Boolean)).size;
    const memberCount = Number(rangeMatch?.[1] || memberLabelMatch?.[1] || dataCount || linkCount || 0);
    return {
      href: location.href,
      title,
      loginLikely,
      errorText,
      memberCount,
      // An empty group can still expose the member data field. Treat that as a
      // valid zero baseline so later additions can be verified by total count.
      hasCount: Boolean(rangeMatch || memberLabelMatch || dataField || linkCount),
      text: text.slice(0, 1200),
    };
  })()`;
}

async function readStaticGroupMemberState(client, groupId, timeout = 45000) {
  const id = String(groupId || "").trim();
  if (id) {
    const url = `${NETSUITE_ORIGIN}/app/crm/common/crmgroup.nl?id=${encodeURIComponent(id)}`;
    await client.send("Page.navigate", { url });
  }
  await waitForPageReady(client, timeout);
  const result = await client.send("Runtime.evaluate", {
    returnByValue: true,
    expression: staticGroupMemberStateExpression(),
  });
  const value = result?.result?.value || {};
  if (value.loginLikely) {
    throw sessionInvalidError(`${STATIC_GROUP_WORKER_TAB_TITLE} lost its NSCORP login. ${reconnectBrowserMessage()}`);
  }
  return value;
}

async function refreshStaticGroupHistory() {
  const existing = await readStaticGroupHistory();
  const recent = existing.slice(0, 3);
  if (!recent.length) return { items: existing };
  const state = workerLane("staticGroup");
  const generation = state.generation;
  return queueWorkerTask(async () => {
    if (state.generation !== generation) throw workerStoppedError();
    const tab = await ensureWorkerTab("staticGroup");
    const client = await connect(tab.webSocketDebuggerUrl);
    const refreshedById = new Map();
    try {
      await client.send("Page.enable").catch(() => {});
      await client.send("Runtime.enable").catch(() => {});
      for (const group of recent) {
        if (state.generation !== generation) throw workerStoppedError();
        if (!group.id || !group.url) continue;
        await client.send("Page.navigate", { url: group.url });
        await waitForPageReady(client, 45000);
        await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
        const value = await readStaticGroupMemberState(client, group.id, 45000);
        if (!value.hasCount || !Number.isFinite(Number(value.memberCount)) || Number(value.memberCount) < 0) continue;
        const memberCount = Number(value.memberCount);
        const originalTotal = Number(group.memberCount || 0) + Number(group.skippedCount || 0);
        refreshedById.set(group.id, {
          ...group,
          memberCount,
          skippedCount: Math.max(0, originalTotal - memberCount),
        });
      }
    } finally {
      client.close();
    }
    // This refresh uses the dedicated static-group worker only for the refresh pass.
    // Close that temporary tab when the pass is complete so it does not remain in Chrome.
    if (state.tabId === tab.id) {
      state.tabId = null;
      await closeChromeTarget(tab.id);
    }
    const updated = existing.map((group) => refreshedById.get(group.id) || group);
    await writeStaticGroupHistory(updated);
    return { items: updated };
  }, "staticGroup");
}

function isHybridRep(config, internalId) {
  const id = normalizeInternalId(internalId);
  return Boolean(id && config?.reps?.[id]?.hybrid);
}

function decorateSalesRep(rep, config) {
  if (!rep || typeof rep !== "object") return rep;
  return {
    ...rep,
    hybrid: isHybridRep(config, rep.internalId),
  };
}

function decorateSalesRepResult(result, config) {
  return {
    ...result,
    items: Array.isArray(result.items) ? result.items.map((item) => decorateSalesRep(item, config)) : result.items,
  };
}

function hybridRepProfileExpression(internalId) {
  const url = `${NETSUITE_ORIGIN}/app/common/custom/custrecordentry.nl?rectype=1572&id=${encodeURIComponent(String(internalId))}`;
  return `(async () => {
    const targetUrl = ${jsString(url)};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const visibleInput = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (visibleInput) return compact(visibleInput.value || visibleInput.innerText || visibleInput.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) return compact(byValue.innerText || byValue.textContent || byValue.value || "");
      const byFieldSpan = doc.getElementById(fieldId + "_fs");
      if (byFieldSpan && !/nldropdown/i.test(String(byFieldSpan.className || ""))) {
        const text = compact(byFieldSpan.innerText || byFieldSpan.textContent || byFieldSpan.value || "");
        if (text && !/function\\s*\\(/i.test(text)) return text;
      }
      if (labels.length) {
        const byLabelText = fieldByLabels(doc, labels);
        if (byLabelText) return byLabelText;
      }
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) return compact(input.value || input.innerText || input.textContent || "");
      return "";
    };
    const response = await fetch(targetUrl, { credentials: "include", redirect: "follow" });
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const text = compact(doc.body?.innerText || doc.body?.textContent || "");
    const title = doc.title || "";
    const name = firstValue(fieldValue(doc, "custrecord_emproster_bigname"), fieldValue(doc, "name", ["Name"]));
    const profile = {
      internalId: ${jsString(internalId)},
      name,
      vertical: fieldValue(doc, "custrecord_emproster_vertical_amo", ["Vertical"]),
      tier: fieldValue(doc, "custrecord_emproster_sales_tier", ["Tier"]),
      salesSubRegion: firstValue(
        fieldValue(doc, "custrecord_emproster_sales_subregion", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"]),
        fieldValue(doc, "custrecord_emproster_salessubregion", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"]),
        fieldValue(doc, "custrecord_emproster_sales_sub_region", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"])
      ),
      salesRole: fieldValue(doc, "custrecord_emproster_salesrole", ["Sales Role"]),
      rosterStatus: fieldValue(doc, "custrecord_emproster_rosterstatus", ["Roster Status"]),
    };
    const loginLikely = !name && (/login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(text));
    return { ok: !loginLikely, loginLikely, profile };
  })()`;
}

async function refreshHybridRepProfiles(config) {
  const safeConfig = normalizeHybridConfig(config);
  let changed = false;
  for (const rep of Object.values(safeConfig.reps)) {
    if (rep.vertical && rep.tier && rep.salesSubRegion && rep.salesRole && rep.rosterStatus && rep.name) continue;
    try {
      const result = await evaluateInWorkerChrome(hybridRepProfileExpression(rep.internalId), 30000);
      const profile = result?.profile;
      if (!result?.ok || !profile) continue;
      const nextRep = {
        ...rep,
        name: rep.name || String(profile.name || "").trim(),
        vertical: rep.vertical || String(profile.vertical || "").trim(),
        tier: rep.tier || String(profile.tier || "").trim(),
        salesSubRegion: rep.salesSubRegion || String(profile.salesSubRegion || "").trim(),
        salesRole: rep.salesRole || String(profile.salesRole || "").trim(),
        rosterStatus: rep.rosterStatus || String(profile.rosterStatus || "").trim(),
      };
      if (JSON.stringify(nextRep) !== JSON.stringify(rep)) {
        safeConfig.reps[rep.internalId] = nextRep;
        changed = true;
      }
    } catch {
      // Keep the saved local list available even if NSCORP is not connected.
    }
  }
  return changed ? writeHybridConfig(safeConfig) : safeConfig;
}

function hybridRepItems(config) {
  return Object.values(config?.reps || {})
    .filter((rep) => rep?.hybrid)
    .map((rep) => ({
      internalId: rep.internalId,
      kind: "Sales Rep",
      type: "Sales Rep",
      name: rep.name || rep.internalId,
      title: rep.name || rep.internalId,
      vertical: rep.vertical || "",
      tier: rep.tier || "",
      salesSubRegion: rep.salesSubRegion || "",
      salesRole: rep.salesRole || "",
      rosterStatus: rep.rosterStatus || "",
      hybrid: true,
      updatedAt: rep.updatedAt || "",
    }))
    .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base" }));
}

async function updateHybridRep({ internalId, name, vertical, tier, salesSubRegion, salesRole, rosterStatus, hybrid }) {
  const id = normalizeInternalId(internalId);
  if (!id) throw new Error("Sales rep internal ID is required.");
  const config = await readHybridConfig();
  if (hybrid) {
    config.reps[id] = {
      internalId: id,
      hybrid: true,
      name: String(name || "").replace(/\s+/g, " ").trim(),
      vertical: String(vertical || "").replace(/\s+/g, " ").trim(),
      tier: String(tier || "").replace(/\s+/g, " ").trim(),
      salesSubRegion: String(salesSubRegion || "").replace(/\s+/g, " ").trim(),
      salesRole: String(salesRole || "").replace(/\s+/g, " ").trim(),
      rosterStatus: String(rosterStatus || "").replace(/\s+/g, " ").trim(),
      updatedAt: new Date().toISOString(),
    };
  } else {
    delete config.reps[id];
  }
  const nextConfig = await writeHybridConfig(config);
  return {
    hybrid: isHybridRep(nextConfig, id),
    hybridRep: nextConfig.reps[id] || null,
  };
}

function normalizeVersion(version) {
  return String(version || "").trim().replace(/^v/i, "");
}

function compareVersions(left, right) {
  const a = normalizeVersion(left).split(".").map((part) => Number.parseInt(part, 10) || 0);
  const b = normalizeVersion(right).split(".").map((part) => Number.parseInt(part, 10) || 0);
  const length = Math.max(a.length, b.length, 3);
  for (let index = 0; index < length; index += 1) {
    const delta = (a[index] || 0) - (b[index] || 0);
    if (delta !== 0) return delta > 0 ? 1 : -1;
  }
  return 0;
}

function validateUpdateDownloadUrl(downloadUrl) {
  let parsed;
  try {
    parsed = new URL(downloadUrl);
  } catch {
    throw new Error("Update manifest has an invalid download URL.");
  }
  const allowedPath = `/${UPDATE_REPO_OWNER}/${UPDATE_REPO_NAME}/releases/download/`;
  if (parsed.protocol !== "https:" || parsed.hostname !== "github.com" || !parsed.pathname.startsWith(allowedPath)) {
    throw new Error("Update download URL must point to the configured GitHub release repository.");
  }
  if (!parsed.pathname.toLowerCase().endsWith(".zip")) {
    throw new Error("Update download must be a zip package.");
  }
  return parsed.href;
}

async function fetchLatestUpdateManifest() {
  const response = await fetch(`${UPDATE_MANIFEST_URL}?t=${Date.now()}`);
  if (!response.ok) throw new Error(`Could not read latest.json from GitHub (${response.status}).`);
  const manifest = await response.json();
  const version = normalizeVersion(manifest.version);
  if (!version) throw new Error("Update manifest is missing version.");
  const downloadUrl = validateUpdateDownloadUrl(manifest.downloadUrl);
  return {
    version,
    downloadUrl,
    fileName: String(manifest.fileName || path.basename(new URL(downloadUrl).pathname) || "NSCORP_Companion_QA_Package.zip"),
    notes: String(manifest.notes || "").trim(),
  };
}

async function checkForUpdate() {
  const latest = await fetchLatestUpdateManifest();
  return {
    currentVersion: APP_VERSION,
    manifestUrl: UPDATE_MANIFEST_URL,
    latest,
    updateAvailable: compareVersions(latest.version, APP_VERSION) > 0,
  };
}

function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      windowsHide: true,
      ...options,
    });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", (chunk) => { stdout += chunk.toString(); });
    child.stderr?.on("data", (chunk) => { stderr += chunk.toString(); });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(stderr.trim() || stdout.trim() || `${command} exited with code ${code}.`));
    });
  });
}

async function downloadFile(url, destinationPath) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not download update package (${response.status}).`);
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!bytes.length) throw new Error("Downloaded update package is empty.");
  await fs.promises.writeFile(destinationPath, bytes);
  return bytes.length;
}

async function extractZip(zipPath, destinationPath) {
  await fs.promises.mkdir(destinationPath, { recursive: true });
  await runProcess("powershell.exe", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    "Expand-Archive -LiteralPath $env:NSCORP_UPDATE_ZIP -DestinationPath $env:NSCORP_UPDATE_DEST -Force",
  ], {
    env: {
      ...process.env,
      NSCORP_UPDATE_ZIP: zipPath,
      NSCORP_UPDATE_DEST: destinationPath,
    },
  });
}

async function copyDirectoryContents(sourceDir, destinationDir, options = {}) {
  const skipNames = options.skipNames || new Set();
  await fs.promises.mkdir(destinationDir, { recursive: true });
  const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipNames.has(entry.name)) continue;
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);
    if (entry.isDirectory()) {
      await fs.promises.cp(sourcePath, destinationPath, { recursive: true, force: true });
    } else if (entry.isFile()) {
      await fs.promises.copyFile(sourcePath, destinationPath);
    }
  }
}

function scheduleAppRestart() {
  if (process.platform !== "win32") {
    throw new Error("Automatic restart is only supported on Windows in this build.");
  }
  if (process.env.NSCORP_COMPANION_LAUNCHER !== "1") {
    throw new Error("Automatic restart requires starting the app from the NSCORP Companion batch file.");
  }

  setTimeout(() => {
    server.close(() => process.exit(UPDATE_RESTART_EXIT_CODE));
    setTimeout(() => process.exit(UPDATE_RESTART_EXIT_CODE), 1000).unref();
  }, 1200).unref();

  return {
    restartScheduled: true,
    expectedVersion: APP_VERSION,
  };
}

async function installLatestUpdate() {
  const update = await checkForUpdate();
  if (!update.updateAvailable) {
    return {
      ...update,
      installed: false,
      message: `Already on latest version ${APP_VERSION}.`,
    };
  }

  const workDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), "nscorp-companion-update-"));
  const zipPath = path.join(workDir, update.latest.fileName || "update.zip");
  const extractDir = path.join(workDir, "package");
  const packageRoot = path.dirname(ROOT);

  try {
    const byteCount = await downloadFile(update.latest.downloadUrl, zipPath);
    await extractZip(zipPath, extractDir);
    const extractedAppDir = path.join(extractDir, "app");
    const extractedServer = path.join(extractedAppDir, "server.js");
    if (!fs.existsSync(extractedServer)) {
      throw new Error("Update package does not contain app/server.js.");
    }

    await copyDirectoryContents(extractedAppDir, ROOT, {
      skipNames: new Set([...LOCAL_APP_FILES, "chrome-profile", "firefox-profile"]),
    });

    for (const rootFile of ["README_FOR_QA.txt", "Start NSCORP Companion.bat", "Stop NSCORP Companion.bat"]) {
      const sourcePath = path.join(extractDir, rootFile);
      if (fs.existsSync(sourcePath)) {
        await fs.promises.copyFile(sourcePath, path.join(packageRoot, rootFile));
      }
    }

    const extractedRuntimeDir = path.join(extractDir, "runtime");
    if (fs.existsSync(extractedRuntimeDir)) {
      await fs.promises.cp(extractedRuntimeDir, path.join(packageRoot, "runtime"), { recursive: true, force: true });
    }

    return {
      ...update,
      installed: true,
      byteCount,
      message: `Installed version ${update.latest.version}. Restarting the companion app now.`,
    };
  } finally {
    fs.promises.rm(workDir, { recursive: true, force: true }).catch(() => {});
  }
}

function chromeCandidates() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  ];
  const localAppData = process.env.LOCALAPPDATA;
  if (localAppData) {
    candidates.push(path.join(localAppData, "Google", "Chrome", "Application", "chrome.exe"));
  }
  return candidates;
}

function findChromeExe() {
  return chromeCandidates().find((candidate) => fs.existsSync(candidate));
}

function firefoxCandidates() {
  const candidates = [
    "C:\\Program Files\\Mozilla Firefox\\firefox.exe",
    "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe",
  ];
  const localAppData = process.env.LOCALAPPDATA;
  if (localAppData) {
    candidates.push(path.join(localAppData, "Mozilla Firefox", "firefox.exe"));
    candidates.push(path.join(localAppData, "Programs", "Mozilla Firefox", "firefox.exe"));
  }
  return candidates;
}

function findFirefoxExe() {
  return firefoxCandidates().find((candidate) => fs.existsSync(candidate));
}

function findGeckoDriverExe() {
  const candidates = [
    path.join(ROOT, "runtime", "geckodriver", "geckodriver.exe"),
    path.join(ROOT, "geckodriver.exe"),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate));
}

function firefoxDriverUrl(endpoint = "") {
  return `http://127.0.0.1:${FIREFOX_WEBDRIVER_PORT}${endpoint}`;
}

function firefoxErrorMessage(payload, fallback = "Firefox automation request failed.") {
  const value = payload?.value || payload || {};
  return String(value.message || value.error || fallback);
}

async function firefoxRequest(method, endpoint, body) {
  const options = { method, headers: {} };
  if (body !== undefined) {
    options.headers["Content-Type"] = "application/json; charset=utf-8";
    options.body = JSON.stringify(body);
  }
  const response = await fetch(firefoxDriverUrl(endpoint), options);
  const text = await response.text();
  let payload = {};
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { value: { message: text } };
  }
  if (!response.ok || payload?.value?.error) {
    throw new Error(firefoxErrorMessage(payload, `Firefox driver returned ${response.status}.`));
  }
  return payload.value;
}

async function waitForFirefoxDriver(timeoutMs = 15000) {
  const started = Date.now();
  let lastError = null;
  while (Date.now() - started < timeoutMs) {
    try {
      const status = await firefoxRequest("GET", "/status");
      if (status?.ready !== false) return status;
    } catch (error) {
      lastError = error;
    }
    await delay(300);
  }
  throw lastError || new Error("Firefox automation service did not become ready.");
}

function firefoxDriverListenerPid() {
  if (process.platform !== "win32") return "";
  try {
    const output = execFileSync("netstat", ["-ano", "-p", "tcp"], { encoding: "utf8", windowsHide: true });
    const pattern = new RegExp(`127\\.0\\.0\\.1:${FIREFOX_WEBDRIVER_PORT}\\s+\\S+\\s+LISTENING\\s+(\\d+)`, "i");
    return String(output.match(pattern)?.[1] || "");
  } catch {
    return "";
  }
}

function stopStaleFirefoxDriver() {
  const pid = firefoxDriverListenerPid();
  if (!pid || pid === String(process.pid)) return false;
  try {
    execFileSync("taskkill", ["/PID", pid, "/T", "/F"], { stdio: "ignore", windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function ensureFirefoxDriver() {
  try {
    const status = await firefoxRequest("GET", "/status");
    if (status?.ready !== false) return;
    const message = String(status?.message || status?.value?.message || "");
    if (!/session already started/i.test(message)) throw new Error(message || "Firefox driver is not ready.");
    stopStaleFirefoxDriver();
  } catch {
    // Start the bundled local driver when no usable companion driver is available.
  }
  const driverExe = findGeckoDriverExe();
  if (!driverExe) {
    throw new Error("Firefox support is missing its bundled driver. Install the latest Companion package and try again.");
  }
  launchedFirefoxDriver = spawn(driverExe, ["--host", "127.0.0.1", "--port", String(FIREFOX_WEBDRIVER_PORT)], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  });
  launchedFirefoxDriver.unref();
  await waitForFirefoxDriver();
}

async function readSavedFirefoxSession() {
  if (firefoxSession?.id) return firefoxSession;
  try {
    const saved = JSON.parse(await fs.promises.readFile(FIREFOX_SESSION_PATH, "utf8"));
    if (saved?.id) {
      firefoxSession = { id: String(saved.id) };
      return firefoxSession;
    }
  } catch {
    // A missing or stale local session file simply starts a fresh session.
  }
  return null;
}

async function saveFirefoxSession(session) {
  firefoxSession = session?.id ? { id: String(session.id) } : null;
  if (!firefoxSession) {
    await fs.promises.rm(FIREFOX_SESSION_PATH, { force: true }).catch(() => {});
    return null;
  }
  await fs.promises.writeFile(FIREFOX_SESSION_PATH, JSON.stringify(firefoxSession, null, 2), "utf8");
  return firefoxSession;
}

async function validFirefoxSession() {
  const session = await readSavedFirefoxSession();
  if (!session?.id) return null;
  try {
    await firefoxRequest("GET", `/session/${encodeURIComponent(session.id)}/url`);
    return session;
  } catch {
    await saveFirefoxSession(null);
    return null;
  }
}

async function startFirefoxSession() {
  await ensureFirefoxDriver();
  const existing = await validFirefoxSession();
  if (existing) return { session: existing, reused: true };

  const firefoxExe = findFirefoxExe();
  if (!firefoxExe) {
    throw new Error("Mozilla Firefox was not found. Install Firefox, then click Launch NSCORP Firefox again.");
  }
  const value = await firefoxRequest("POST", "/session", {
    capabilities: {
      alwaysMatch: {
        browserName: "firefox",
        "moz:firefoxOptions": {
          binary: firefoxExe,
        },
      },
    },
  });
  const session = await saveFirefoxSession({ id: value?.sessionId });
  if (!session?.id) throw new Error("Firefox started, but the Companion could not establish its automation session.");
  await firefoxRequest("POST", `/session/${encodeURIComponent(session.id)}/timeouts`, { script: 120000 });
  return { session, reused: false, firefoxExe };
}

async function firefoxSessionId() {
  const session = await validFirefoxSession();
  if (!session?.id) {
    throw new Error("No Companion Firefox session is available. Launch NSCORP Firefox first.");
  }
  return session.id;
}

async function firefoxSwitchWindow(handle) {
  const sessionId = await firefoxSessionId();
  await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/window`, { handle });
}

async function firefoxCurrentWindow() {
  const sessionId = await firefoxSessionId();
  return firefoxRequest("GET", `/session/${encodeURIComponent(sessionId)}/window`);
}

async function firefoxTabInfo(handle) {
  const sessionId = await firefoxSessionId();
  await firefoxSwitchWindow(handle);
  const [url, title] = await Promise.all([
    firefoxRequest("GET", `/session/${encodeURIComponent(sessionId)}/url`),
    firefoxRequest("GET", `/session/${encodeURIComponent(sessionId)}/title`),
  ]);
  return {
    id: String(handle),
    type: "page",
    url: String(url || ""),
    title: String(title || ""),
    webSocketDebuggerUrl: `firefox://${encodeURIComponent(String(handle))}`,
  };
}

async function listFirefoxTabs() {
  return withFirefoxOperation(async () => {
    const sessionId = await firefoxSessionId();
    const originalHandle = await firefoxCurrentWindow();
    const handles = await firefoxRequest("GET", `/session/${encodeURIComponent(sessionId)}/window/handles`);
    const tabs = [];
    try {
      for (const handle of handles || []) {
        tabs.push(await firefoxTabInfo(handle));
      }
    } finally {
      if (originalHandle) await firefoxSwitchWindow(originalHandle).catch(() => {});
    }
    return tabs;
  });
}

async function openFirefoxTab(url, options = {}) {
  return withFirefoxOperation(async () => {
    const targetUrl = new URL(normalizeLinkUrl(url)).href;
    const sessionId = await firefoxSessionId();
    const originalHandle = await firefoxCurrentWindow();
    const created = await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/window/new`, { type: "tab" });
    const handle = String(created?.handle || created || "");
    if (!handle) throw new Error("Firefox did not return a new tab.");
    await firefoxSwitchWindow(handle);
    await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/url`, { url: targetUrl });
    const tab = await firefoxTabInfo(handle);
    if (options.background) {
      firefoxBackgroundTabs.add(handle);
      if (originalHandle) await firefoxSwitchWindow(originalHandle).catch(() => {});
    }
    return tab;
  });
}

async function closeFirefoxTab(handle) {
  return withFirefoxOperation(async () => {
    if (!handle) return;
    try {
      const sessionId = await firefoxSessionId();
      await firefoxSwitchWindow(handle);
      await firefoxRequest("DELETE", `/session/${encodeURIComponent(sessionId)}/window`);
    } finally {
      firefoxBackgroundTabs.delete(String(handle));
    }
  });
}

async function firefoxNavigate(handle, url) {
  const sessionId = await firefoxSessionId();
  await firefoxSwitchWindow(handle);
  await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/url`, { url });
}

async function firefoxEvaluate(handle, expression, timeout = 45000) {
  const sessionId = await firefoxSessionId();
  await firefoxSwitchWindow(handle);
  await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/timeouts`, { script: Math.max(1000, Number(timeout) || 45000) });
  const wrappedExpression = `
    const done = arguments[arguments.length - 1];
    const source = arguments[0];
    try {
      const value = (0, eval)(source);
      Promise.resolve(value).then(
        (result) => done({ __nscorpCompanion: true, ok: true, value: result }),
        (error) => done({ __nscorpCompanion: true, ok: false, error: String(error && (error.stack || error.message) || error) }),
      );
    } catch (error) {
      done({ __nscorpCompanion: true, ok: false, error: String(error && (error.stack || error.message) || error) });
    }
  `;
  const result = await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/execute/async`, {
    script: wrappedExpression,
    args: [String(expression || "")],
  });
  if (result?.__nscorpCompanion && !result.ok) throw new Error(result.error || "Firefox page evaluation failed.");
  return result?.__nscorpCompanion ? result.value : result;
}

async function connectFirefoxTab(handle) {
  const tabId = decodeURIComponent(String(handle || "").replace(/^firefox:\/\//, ""));
  const shouldRestore = firefoxBackgroundTabs.has(tabId)
    || Object.values(WORKER_LANES).some((state) => String(state.tabId || "") === tabId);
  return {
    async send(method, params = {}) {
      return withFirefoxOperation(async () => {
        if (method === "Runtime.enable" || method === "Page.enable") return {};
        const restoreHandle = shouldRestore ? await firefoxCurrentWindow().catch(() => "") : "";
        try {
          if (method === "Page.navigate") {
            await firefoxNavigate(tabId, params.url);
            return {};
          }
          if (method === "Runtime.evaluate") {
            try {
              const value = await firefoxEvaluate(tabId, params.expression, params.timeout);
              return { result: { value } };
            } catch (error) {
              return { exceptionDetails: { exception: { description: error.message || String(error) } } };
            }
          }
          throw new Error(`Firefox does not support the Chrome command ${method}.`);
        } finally {
          if (restoreHandle && restoreHandle !== tabId) await firefoxSwitchWindow(restoreHandle).catch(() => {});
        }
      });
    },
    close() {
      // The active tab is restored before each operation is released.
    },
  };
}

async function listTabs() {
  if (activeBrowserMode === "firefox") return listFirefoxTabs();
  const errors = [];
  for (const host of CHROME_DEBUG_HOSTS) {
    try {
      const response = await fetch(`http://${host}:${CHROME_DEBUG_PORT}/json/list`);
      if (!response.ok) throw new Error(`Chrome debug endpoint returned ${response.status}.`);
      return response.json();
    } catch (error) {
      errors.push(`${host}: ${error.message || String(error)}`);
    }
  }
  throw new Error(`Chrome debug endpoint is not available. Tried ${errors.join("; ")}`);
}

async function openChromeTab(url) {
  if (activeBrowserMode === "firefox") return openFirefoxTab(url, { background: false });
  const targetUrl = new URL(normalizeLinkUrl(url));

  const errors = [];
  for (const host of CHROME_DEBUG_HOSTS) {
    try {
      const response = await fetch(`http://${host}:${CHROME_DEBUG_PORT}/json/new?${encodeURIComponent(targetUrl.href)}`, {
        method: "PUT",
      });
      if (!response.ok) throw new Error(`Chrome debug endpoint returned ${response.status}.`);
      return response.json();
    } catch (error) {
      errors.push(`${host}: ${error.message || String(error)}`);
    }
  }
  throw new Error(`Could not open the link in Chrome. Tried ${errors.join("; ")}`);
}

function isMergeNavigationError(error) {
  const text = error?.message || String(error || "");
  return /Internal error|Inspected target navigated or closed|Cannot find context|Execution context was destroyed|Target closed/i.test(text);
}

async function prefillMergePrimary(tabInfo, primaryInternalId, primaryLabel) {
  if (!tabInfo?.webSocketDebuggerUrl || !String(primaryInternalId || "").trim()) {
    return { ok: false, reason: "Missing merge tab or primary internal ID." };
  }
  const client = await connect(tabInfo.webSocketDebuggerUrl);
  try {
    await client.send("Runtime.enable");
    let lastError = null;
    for (let attemptNumber = 1; attemptNumber <= 3; attemptNumber += 1) {
      try {
        await waitForPageReady(client, 20000);
        const result = await client.send("Runtime.evaluate", {
          awaitPromise: true,
          returnByValue: true,
          expression: `(() => new Promise((resolve) => {
            const primaryInternalId = ${jsString(String(primaryInternalId || "").trim())};
            const primaryLabel = ${jsString(String(primaryLabel || "").trim())};
            const started = Date.now();
            const finish = (value) => resolve(value);
            const attempt = () => {
              const display = document.querySelector("#toentity_display");
              const hidden = document.querySelector("#hddn_toentity_fs");
              if (!display || !hidden) {
                if (Date.now() - started > 12000) {
                  finish({ ok: false, reason: "Primary merge fields were not found." });
                  return;
                }
                setTimeout(attempt, 250);
                return;
              }
              const restoreDisplay = () => {
                display.value = primaryLabel;
                display.title = primaryLabel;
                display.isvalid = true;
                display.haschanged = true;
                display.setAttribute("previousvalue", primaryLabel);
              };
              const syncHidden = () => {
                hidden.value = primaryInternalId;
                hidden.setAttribute("value", primaryInternalId);
                restoreDisplay();
              };
              display.focus();
              syncHidden();
              display.dispatchEvent(new Event("input", { bubbles: true }));
              hidden.dispatchEvent(new Event("change", { bubbles: true }));
              if (typeof window.nsapiDispatchFieldChanged === "function") {
                try { window.nsapiDispatchFieldChanged(hidden); } catch {}
              }
              if (typeof window.Searchtoentity === "function") {
                try { window.Searchtoentity(primaryLabel); } catch {}
              }
              if (typeof window.setWindowChanged === "function") {
                try { window.setWindowChanged(window, true); } catch {}
              }
              if (typeof window.Synctoentity === "function") {
                try { window.Synctoentity(true); } catch {}
              }
              setTimeout(() => {
                syncHidden();
                finish({
                  ok: hidden.value === primaryInternalId,
                  displayValue: display.value,
                  hiddenValue: hidden.value,
                  previousValue: display.getAttribute("previousvalue") || "",
                });
              }, 900);
            };
            attempt();
          }))()`,
          timeout: 20000,
        });
        return result?.result?.value || { ok: false, reason: "No prefill result returned." };
      } catch (error) {
        lastError = error;
        if (!isMergeNavigationError(error) || attemptNumber === 3) throw error;
        lastError = new Error(`Prefill attempt ${attemptNumber} failed during NetSuite page navigation; retrying.`);
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
    }
    return { ok: false, reason: `Prefill attempt failed: ${lastError?.message || String(lastError)}` };
  } catch (error) {
    const message = error.message || String(error);
    return { ok: false, reason: message };
  } finally {
    client.close();
  }
}

async function browserWebSocketDebuggerUrl() {
  const errors = [];
  for (const host of CHROME_DEBUG_HOSTS) {
    try {
      const response = await fetch(`http://${host}:${CHROME_DEBUG_PORT}/json/version`);
      if (!response.ok) throw new Error(`Chrome debug endpoint returned ${response.status}.`);
      const version = await response.json();
      if (!version.webSocketDebuggerUrl) throw new Error("Browser websocket URL was not returned.");
      return version.webSocketDebuggerUrl;
    } catch (error) {
      errors.push(`${host}: ${error.message || String(error)}`);
    }
  }
  throw new Error(`Chrome browser debug endpoint is not available. Tried ${errors.join("; ")}`);
}

async function createChromeTarget(url, options = {}) {
  const background = options.background !== false;
  if (activeBrowserMode === "firefox") {
    const tab = await openFirefoxTab(url, { background });
    return { id: tab.id, background, webSocketDebuggerUrl: tab.webSocketDebuggerUrl };
  }
  try {
    const client = await connect(await browserWebSocketDebuggerUrl());
    try {
      const result = await client.send("Target.createTarget", {
        url,
        background,
      });
      if (result?.targetId) return { id: result.targetId, background: true };
    } finally {
      client.close();
    }
  } catch {
    // Some Chrome builds reject background target creation. Fall back to /json/new.
  }

  const tab = await openChromeTab(url);
  return { id: tab.id, background: false };
}

async function closeChromeTarget(id) {
  if (!id) return;
  if (activeBrowserMode === "firefox") {
    await closeFirefoxTab(id).catch(() => {});
    return;
  }
  try {
    const client = await connect(await browserWebSocketDebuggerUrl());
    try {
      await client.send("Target.closeTarget", { targetId: id });
    } finally {
      client.close();
    }
  } catch {
    // Closing a damaged or already-gone worker tab is best effort.
  }
}

async function waitForTabById(id, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const tabs = await listTabs();
    const tab = tabs.find((candidate) => candidate.id === id && candidate.type === "page");
    if (tab?.webSocketDebuggerUrl) return tab;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`${browserLabel()} worker tab was created but did not become ready.`);
}

function isNetSuiteLoginUrl(url) {
  return /\/app\/login\/|enterpriselogin|login\.nl|system\.netsuite\.com/i.test(String(url || ""));
}

function pickNetSuiteTab(tabs, preferredUrlPart = "") {
  return tabs.find((tab) => (
    tab.type === "page"
    && tab.url.includes("nlcorp.app.netsuite.com")
    && !isNetSuiteLoginUrl(tab.url)
    && (!preferredUrlPart || tab.url.includes(preferredUrlPart))
  )) || tabs.find((tab) => tab.type === "page" && tab.url.includes("nlcorp.app.netsuite.com"))
    || tabs.find((tab) => tab.type === "page" && tab.url.startsWith("http"));
}

async function connect(webSocketDebuggerUrl) {
  if (String(webSocketDebuggerUrl || "").startsWith("firefox://")) {
    return connectFirefoxTab(webSocketDebuggerUrl);
  }
  const socket = new WebSocket(webSocketDebuggerUrl);
  let nextId = 1;
  const pending = new Map();

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(JSON.stringify(message.error)));
      else resolve(message.result);
    }
  };

  return new Promise((resolve, reject) => {
    socket.onerror = reject;
    socket.onopen = () => {
      resolve({
        send(method, params = {}) {
          const id = nextId++;
          socket.send(JSON.stringify({ id, method, params }));
          return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
        },
        close() {
          socket.close();
        },
      });
    };
  });
}

async function waitForPageReady(client, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    try {
      const result = await client.send("Runtime.evaluate", {
        expression: "({ readyState: document.readyState, href: location.href })",
        returnByValue: true,
      });
      const value = result?.result?.value || {};
      if (value.readyState === "interactive" || value.readyState === "complete") return value;
    } catch {
      // Navigation can briefly destroy the execution context.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return null;
}

function workerLane(lane = "main") {
  return WORKER_LANES[lane] || WORKER_LANES.main;
}

async function activateChromeTarget(targetId) {
  if (!targetId) return;
  if (activeBrowserMode === "firefox") {
    await firefoxSwitchWindow(targetId).catch(() => {});
    return;
  }
  try {
    const client = await connect(await browserWebSocketDebuggerUrl());
    try {
      await client.send("Target.activateTarget", { targetId });
    } finally {
      client.close();
    }
  } catch {
    // Activation is best-effort; the worker can still complete in the background.
  }
}

function workerLaneSummaries(tabs = []) {
  return Object.entries(WORKER_LANES).map(([lane, state]) => {
    const laneTitles = new Set([state.title, ...(state.legacyTitles || [])]);
    const tab = tabs.find((candidate) => (
      candidate.type === "page"
      && laneTitles.has(candidate.title)
      && !isNetSuiteLoginUrl(candidate.url)
    ));
    return {
      lane,
      title: state.title,
      ready: Boolean(tab),
      running: Number(state.running || 0) > 0,
      tabId: tab?.id || state.tabId || "",
      url: tab?.url || "",
      lastStartedAt: state.lastStartedAt,
      lastFinishedAt: state.lastFinishedAt,
    };
  });
}

async function labelWorkerTab(client, title = WORKER_TAB_TITLE) {
  try {
    await client.send("Runtime.evaluate", {
      expression: `document.title = ${jsString(title)}; true`,
      returnByValue: true,
    });
  } catch {
    // The title label is a convenience only.
  }
}

async function getPageSessionState(client, fallbackUrl = "") {
  try {
    const result = await client.send("Runtime.evaluate", {
      expression: `(() => {
        const href = String(location.href || "");
        const title = String(document.title || "");
        const text = String(document.body?.innerText || "").slice(0, 5000);
        const inputs = Array.from(document.querySelectorAll("input"));
        const hasPasswordInput = inputs.some((input) => {
          const type = String(input.type || "").toLowerCase();
          const name = String(input.name || "").toLowerCase();
          const id = String(input.id || "").toLowerCase();
          return type === "password" || name.includes("password") || id.includes("password");
        });
        const loginLikely = /\\/app\\/login\\/|enterpriselogin|login\\.nl|system\\.netsuite\\.com/i.test(href)
          || (hasPasswordInput && /email address|password|sign in|forgot your password|username|user name/i.test(title + " " + text))
          || (/login|sign in/i.test(title) && /password|email address|username|user name/i.test(text));
        return { href, title, loginLikely };
      })()`,
      returnByValue: true,
    });
    const value = result?.result?.value || {};
    return {
      href: String(value.href || fallbackUrl || ""),
      title: String(value.title || ""),
      loginLikely: Boolean(value.loginLikely) || isNetSuiteLoginUrl(value.href || fallbackUrl),
    };
  } catch (error) {
    return {
      href: String(fallbackUrl || ""),
      title: "",
      loginLikely: isNetSuiteLoginUrl(fallbackUrl),
      error: error.message || String(error),
    };
  }
}

async function recoverWorkerPageIfNeeded(client, tab, workerTitle) {
  let state = await getPageSessionState(client, tab?.url || "");
  const currentUrl = String(state.href || tab?.url || "");
  // Leave an NSCORP login page alone while the user signs in. Re-navigating it
  // on every status poll causes a visible refresh loop and can interrupt login.
  if (!currentUrl.includes("nlcorp.app.netsuite.com") && !state.loginLikely) {
    await client.send("Page.navigate", { url: WORKER_TAB_URL });
    await waitForPageReady(client, 15000);
    state = await getPageSessionState(client, WORKER_TAB_URL);
  }
  if (state.loginLikely) {
    throw sessionInvalidError(`${workerTitle} is on the NSCORP login page. Sign in to NSCORP in the companion ${browserLabel()} window, then try again.`);
  }
  return state;
}

async function ensureWorkerTab(lane = "main") {
  const laneState = workerLane(lane);
  const laneTitles = new Set([laneState.title, ...(laneState.legacyTitles || [])]);
  const tabs = await listTabs();
  const existingWorkerTabs = tabs.filter((candidate) => (
    candidate.type === "page"
    && laneTitles.has(candidate.title)
    && candidate.webSocketDebuggerUrl
  ));
  let tab = laneState.tabId
    ? tabs.find((candidate) => candidate.id === laneState.tabId && candidate.type === "page")
    : null;

  if (!tab?.webSocketDebuggerUrl && existingWorkerTabs.length) {
    tab = existingWorkerTabs[0];
    laneState.tabId = tab.id;
  }

  for (const duplicate of existingWorkerTabs.slice(1)) {
    if (duplicate.id !== laneState.tabId) closeChromeTarget(duplicate.id);
  }

  if (!tab?.webSocketDebuggerUrl) {
    const created = await createChromeTarget(WORKER_TAB_URL, { background: true });
    laneState.tabId = created.id;
    tab = await waitForTabById(laneState.tabId);
  }

  const client = await connect(tab.webSocketDebuggerUrl);
  try {
    await client.send("Page.enable").catch(() => {});
    await client.send("Runtime.enable").catch(() => {});
    await waitForPageReady(client, 6000);
    await recoverWorkerPageIfNeeded(client, tab, laneState.title);
    await labelWorkerTab(client, laneState.title);
  } finally {
    client.close();
  }

  return waitForTabById(laneState.tabId);
}

async function evaluateInTab(tab, expression, timeout = 45000) {
  const client = await connect(tab.webSocketDebuggerUrl);
  try {
    await client.send("Runtime.enable");
    const result = await client.send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
      timeout,
    });
    if (result.exceptionDetails) {
      throw new Error(result.exceptionDetails.exception?.description || JSON.stringify(result.exceptionDetails));
    }
    return result.result.value;
  } finally {
    client.close();
  }
}

function isRecoverableWorkerErrorText(text) {
  return /Internal error|Inspected target navigated or closed|Cannot find context|Execution context was destroyed|Target closed|caller.*callee.*arguments.*strict mode|NetSuite login is required|NetSuite global search helper is not available|search helper is not available|session.*expired|sign in|log in/i.test(String(text || ""));
}

function isRecoverableChromeProtocolError(error) {
  const text = String(error?.message || error || "");
  try {
    const parsed = JSON.parse(text);
    if (parsed?.code === -32603 || parsed?.code === -32000) return true;
  } catch {
    // The protocol error is sometimes wrapped as plain text.
  }
  return isRecoverableWorkerErrorText(text);
}

function recoverableDupeResultMessage(result) {
  if (!result) return "";
  if (result.loginLikely) {
    return `Duplicate Finder Worker needs a live NetSuite login. ${reconnectBrowserMessage()}`;
  }
  const text = [result.error, result.message, result.reason].filter(Boolean).join(" ");
  if (result.error && isRecoverableWorkerErrorText(result.error)) return String(result.error);
  if (result.ok === false && isRecoverableWorkerErrorText(text)) {
    return text || "Duplicate Finder Worker needs to be refreshed.";
  }
  return "";
}

function resultErrorText(result) {
  const error = result?.error;
  if (!error) return "";
  if (typeof error === "string") return error;
  return [error.text, error.message, error.reason, error.code, error.details].filter(Boolean).join(" ");
}

function throwIfWorkerSessionInvalidResult(result, workerTitle) {
  if (!result) return;
  if (result.loginLikely) {
    throw sessionInvalidError(`${workerTitle} lost its NSCORP login. ${reconnectBrowserMessage()}`);
  }
  const text = resultErrorText(result);
  if (text && isRecoverableWorkerErrorText(text)) {
    throw sessionInvalidError(`${workerTitle} is no longer usable. ${reconnectBrowserMessage()}`);
  }
}

async function evaluateInChrome(expression, preferredUrlPart = "", timeout = 45000) {
  const tabs = await listTabs();
  const tab = pickNetSuiteTab(tabs, preferredUrlPart);
  if (!tab) throw new Error(`No ${browserLabel()} page is available. Launch NSCORP ${browserLabel()} first.`);
  return evaluateInTab(tab, expression, timeout);
}

function timeoutError(message) {
  const error = new Error(message);
  error.code = "NSCORP_WORKER_TIMEOUT";
  return error;
}

function sessionInvalidError(message = SESSION_INVALID_MESSAGE) {
  const error = new Error(message);
  error.code = SESSION_INVALID_ERROR_CODE;
  return error;
}

function workerStoppedError(message = "NetSuite worker task was stopped.") {
  const error = new Error(message);
  error.code = "NSCORP_WORKER_STOPPED";
  return error;
}

async function withWorkerTimeout(promise, timeout, onTimeout) {
  let timer = null;
  const timeoutPromise = new Promise((_, reject) => {
    timer = setTimeout(() => {
      // Cleanup must never hold the caller open. A damaged Chrome target can
      // itself stop responding, but the app still needs to report the timeout.
      Promise.resolve(onTimeout?.()).catch(() => {
        // Timeout recovery is best effort.
      });
      reject(timeoutError(`NetSuite worker timed out after ${Math.ceil(timeout / 1000)} seconds. Please try again.`));
    }, timeout);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function resetWorkerLane(lane = "dupe") {
  const state = workerLane(lane);
  const targetId = state.tabId;
  state.generation += 1;
  state.tabId = null;
  state.queue = Promise.resolve();
  state.running = 0;
  state.lastFinishedAt = new Date().toISOString();
  await closeChromeTarget(targetId);
  return { stopped: true, lane };
}

function queueWorkerTask(task, lane = "main") {
  const state = workerLane(lane);
  const generation = state.generation;
  const runTask = async () => {
    if (state.generation !== generation) throw workerStoppedError();
    state.running = Number(state.running || 0) + 1;
    state.lastStartedAt = new Date().toISOString();
    try {
      return await task(generation);
    } finally {
      state.running = Math.max(0, Number(state.running || 0) - 1);
      state.lastFinishedAt = new Date().toISOString();
    }
  };
  const run = state.queue.then(runTask, runTask);
  state.queue = run.catch(() => {});
  return run;
}

async function evaluateInWorkerChrome(expression, timeout = 45000, lane = "main") {
  return queueWorkerTask(async (generation) => {
    const state = workerLane(lane);
    let lastError = null;
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        if (state.generation !== generation) throw workerStoppedError();
        const tab = await ensureWorkerTab(lane);
        if (state.generation !== generation) throw workerStoppedError();
        return await withWorkerTimeout(
          evaluateInTab(tab, expression, timeout),
          timeout + 5000,
          async () => {
            const timedOutWorkerId = state.tabId;
            state.tabId = null;
            await closeChromeTarget(timedOutWorkerId || tab.id);
          },
        );
      } catch (error) {
        lastError = error;
        if (state.generation !== generation) break;
        if (!isRecoverableChromeProtocolError(error) || attempt > 0) break;
        const damagedWorkerId = state.tabId;
        state.tabId = null;
        await closeChromeTarget(damagedWorkerId);
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }
    if (isRecoverableChromeProtocolError(lastError)) {
      throw sessionInvalidError();
    }
    throw lastError;
  }, lane);
}

async function evaluateInDupeWorkerChrome(expression, timeout = 45000) {
  return evaluateInWorkerChrome(expression, timeout, "dupe");
}

async function evaluateInDomainWorkerChrome(expression, timeout = 45000) {
  return evaluateInWorkerChrome(expression, timeout, "domain");
}

async function evaluateInRoeWorkerChrome(expression, timeout = 45000) {
  return evaluateInWorkerChrome(expression, timeout, "roe");
}

async function evaluateInTerritoryWorkerChrome(expression, timeout = 45000) {
  const staleAfterMs = Math.max(timeout + 15000, 90000);
  const state = workerLane("territory");
  const lastStartedAt = state.lastStartedAt ? Date.parse(state.lastStartedAt) : 0;
  if (Number(state.running || 0) > 0 && lastStartedAt && Date.now() - lastStartedAt > staleAfterMs) {
    await resetWorkerLane("territory");
  }
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await evaluateInWorkerChrome(expression, timeout, "territory");
    } catch (error) {
      lastError = error;
      if (error?.code !== "NSCORP_WORKER_TIMEOUT" || attempt > 0) throw error;
      await resetWorkerLane("territory");
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }
  throw lastError;
}

async function evaluateInStaticGroupWorkerChrome(expression, timeout = 45000) {
  let lastError = null;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      return await evaluateInWorkerChrome(expression, timeout, "staticGroup");
    } catch (error) {
      lastError = error;
      if (error?.code !== "NSCORP_WORKER_TIMEOUT" || attempt > 0) throw error;
      await resetWorkerLane("staticGroup");
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
  }
  throw lastError;
}

async function evaluateInDupeWorkerChromeChecked(expression, timeout = 45000, resultMessage = () => "") {
  let lastMessage = "";
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const result = await evaluateInDupeWorkerChrome(expression, timeout);
    const message = String(resultMessage(result) || "");
    if (!message) return result;
    lastMessage = message;
    if (!isRecoverableWorkerErrorText(message) || attempt > 0) break;
    await resetWorkerLane("dupe");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (isRecoverableWorkerErrorText(lastMessage)) {
    throw sessionInvalidError(lastMessage || `Duplicate Finder Worker needs a live NetSuite login. ${reconnectBrowserMessage()}`);
  }
  throw new Error(lastMessage || "Duplicate Finder Worker could not complete the request.");
}

async function evaluateInDomainWorkerChromeChecked(expression, timeout = 45000, resultMessage = () => "") {
  let lastMessage = "";
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const result = await evaluateInDomainWorkerChrome(expression, timeout);
    const message = String(resultMessage(result) || "");
    if (!message) return result;
    lastMessage = message;
    if (!isRecoverableWorkerErrorText(message) || attempt > 0) break;
    await resetWorkerLane("domain");
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  if (isRecoverableWorkerErrorText(lastMessage)) {
    throw sessionInvalidError(lastMessage || `${DOMAIN_WORKER_TAB_TITLE} needs a live NetSuite login. ${reconnectBrowserMessage()}`);
  }
  throw new Error(lastMessage || `${DOMAIN_WORKER_TAB_TITLE} could not complete the request.`);
}

function jsString(value) {
  return JSON.stringify(String(value ?? ""));
}

function sanitizeFilename(value) {
  return String(value || "sales_rep")
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[. ]+$/g, "") || "sales_rep";
}

function csvEscape(value) {
  const text = String(value ?? "");
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

function checkboxText(value) {
  const text = String(value ?? "").trim().toLowerCase();
  if (["t", "true", "yes", "y", "checked"].includes(text)) return "Yes";
  if (["f", "false", "no", "n", "unchecked"].includes(text)) return "No";
  return value || "";
}

async function writeSalesRepExtract(extract) {
  const salesRepName = extract.salesRep?.name || "Sales Rep";
  const safeName = sanitizeFilename(salesRepName);
  const csvPath = path.join(EXTRACT_DIR, `${safeName}_Total_Records.csv`);
  const headers = EXTRACT_FIELDS.map((field) => field.label);
  const rows = Array.isArray(extract.rows) ? extract.rows : [];
  const lines = [
    headers.map(csvEscape).join(","),
    ...rows.map((row) => EXTRACT_FIELDS.map((field) => csvEscape(row[field.key])).join(",")),
  ];

  await fs.promises.mkdir(EXTRACT_DIR, { recursive: true });
  await fs.promises.writeFile(csvPath, `\uFEFF${lines.join("\r\n")}\r\n`, "utf8");

  return {
    csvPath,
    rowCount: rows.length,
    salesRepName,
  };
}

async function writeResultExport(exportRequest) {
  const headers = Array.isArray(exportRequest.headers)
    ? exportRequest.headers.map((header) => String(header ?? "").trim()).filter(Boolean)
    : [];
  if (!headers.length) throw new Error("Export headers are required.");

  const rows = Array.isArray(exportRequest.rows) ? exportRequest.rows : [];
  const normalizedRows = rows.map((row) => {
    if (Array.isArray(row)) return headers.map((_, index) => row[index] ?? "");
    if (row && typeof row === "object") return headers.map((header) => row[header] ?? "");
    return headers.map(() => "");
  });
  const baseName = sanitizeFilename(String(exportRequest.fileName || "NSCORP_Results").replace(/\.csv$/i, ""));
  const csvPath = path.join(EXTRACT_DIR, `${baseName}.csv`);
  const lines = [
    headers.map(csvEscape).join(","),
    ...normalizedRows.map((row) => row.map(csvEscape).join(",")),
  ];

  await fs.promises.mkdir(EXTRACT_DIR, { recursive: true });
  await fs.promises.writeFile(csvPath, `\uFEFF${lines.join("\r\n")}\r\n`, "utf8");

  return {
    csvPath,
    rowCount: normalizedRows.length,
  };
}

function normalizeStaticGroupCreateRequest(request = {}) {
  const name = String(request.name || "").replace(/\s+/g, " ").trim();
  if (!name) throw new Error("Static group name is required.");
  if (name.length > 120) throw new Error("Static group name is too long.");
  const normalized = normalizeStaticGroupMemberRequest(request);
  return {
    name,
    ...normalized,
  };
}

function normalizeStaticGroupAddRequest(request = {}) {
  const groupId = String(request.groupId || "").trim();
  if (!/^\d+$/.test(groupId)) throw new Error("Static group ID is required.");
  return {
    groupId,
    ...normalizeStaticGroupMemberRequest(request),
  };
}

function normalizeStaticGroupMemberRequest(request = {}) {
  const seen = new Set();
  const members = (Array.isArray(request.members) ? request.members : [])
    .map((member) => ({
      internalId: String(member?.internalId || "").trim(),
      label: String(member?.label || "").replace(/\s+/g, " ").trim(),
      input: String(member?.input || member?.label || member?.internalId || "").replace(/\s+/g, " ").trim(),
    }))
    .filter((member) => /^\d+$/.test(member.internalId))
    .filter((member) => {
      if (seen.has(member.internalId)) return false;
      seen.add(member.internalId);
      return true;
    });
  const inputs = (Array.isArray(request.inputs) ? request.inputs : [])
    .map((input) => ({
      raw: String(input?.raw || input?.input || input?.query || input?.internalId || "").replace(/\s+/g, " ").trim(),
      internalId: String(input?.internalId || "").trim(),
      companyId: String(input?.companyId || "").trim(),
      query: String(input?.query || "").replace(/\s+/g, " ").trim(),
      label: String(input?.label || "").replace(/\s+/g, " ").trim(),
      directInternalId: Boolean(input?.directInternalId),
    }))
    .filter((input) => input.raw || input.internalId || input.companyId || input.query);
  if (!members.length && !inputs.length) throw new Error("At least one record is required.");
  return {
    members,
    inputs,
    skipped: Array.isArray(request.skipped) ? request.skipped : [],
  };
}

function staticGroupCreateOnPageExpression(request) {
  return `(async () => {
    const request = ${jsString(JSON.stringify(request))};
    const parsed = JSON.parse(request);
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const formNoticeText = () => compact(Array.from(document.querySelectorAll(".uir-message-error, .uir-alert-box.error, .uir-alert-box.warning, .uir-message, [class*='error']")).map((node) => node.innerText || node.textContent || "").join(" "));
    const duplicateNameError = () => /this record already exists/i.test(formNoticeText()) ? "Static group name already exists." : "";
    const memberCountOnPage = () => {
      const rangeText = document.querySelector("input[name='inpt_groupmembersrange']")?.value || "";
      const pageText = compact(document.body?.innerText || document.body?.textContent || "");
      const rangeMatch = rangeText.match(/\\b\\d+\\s+to\\s+\\d+\\s+of\\s+(\\d+)\\b/i)
        || pageText.match(/\\b\\d+\\s*-\\s*\\d+\\s+of\\s+(\\d+)\\b/i);
      const memberLabelMatch = pageText.match(/\\b(?:members?|customers?)\\s*[:(]\\s*(\\d+)\\b/i);
      const dataField = document.forms.main_form?.elements.groupmembersdata || document.querySelector("[name='groupmembersdata']");
      const dataCount = String(dataField?.value || "")
        .split("\\u0002")
        .map((line) => line.split("\\u0001")[2])
        .filter(Boolean)
        .length;
      const count = Number(rangeMatch?.[1] || memberLabelMatch?.[1] || dataCount || 0);
      return Number.isFinite(count) ? count : 0;
    };
    const mode = parsed.mode === "add" ? "add" : "create";
    const pageText = compact(document.body?.innerText || document.body?.textContent || "");
    const title = document.title || "";
    if (/login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(pageText)) {
      return { ok: false, loginLikely: true, error: "NetSuite login is required." };
    }
    const groupName = document.getElementById("groupname");
    const submitter = document.getElementById("submitter") || document.querySelector("input[type='submit'][value='Save']");
    if (mode === "create" && (!groupName || !submitter || typeof nlapiSelectNewLineItem !== "function")) {
      return { ok: false, error: "Static Group form controls were not found." };
    }
    if (mode === "add" && typeof add_member !== "function") {
      return { ok: false, error: "Static group Name field was not ready." };
    }
    const result = {
      ok: true,
      submitted: false,
      groupName: parsed.name,
      added: [],
      already: [],
      failed: [],
      skipped: [],
      beforeCount: memberCountOnPage(),
      expectedMemberCount: 0,
    };
    const markChanged = () => {
      if (typeof setWindowChanged === "function") {
        try { setWindowChanged(window, true); } catch {}
      }
    };
    const valueOf = (searchResult, column) => {
      try { return compact(searchResult.getValue(column) || ""); } catch { return ""; }
    };
    const labelForSearchResult = (searchResult) => {
      const entityId = valueOf(searchResult, "entityid");
      const name = valueOf(searchResult, "companyname") || valueOf(searchResult, "altname");
      if (entityId && name && !entityId.toLowerCase().includes(name.toLowerCase())) return compact(entityId + " " + name);
      return entityId || name || compact(searchResult.getId?.() || "");
    };
    const searchResultIsJob = (searchResult) => {
      const values = [
        valueOf(searchResult, "entityid"),
        valueOf(searchResult, "companyname"),
        valueOf(searchResult, "altname"),
        labelForSearchResult(searchResult),
      ].map(compact);
      return values.some((value) => /^J(?:\\d|\\s)/i.test(value) || /^job\\b/i.test(value));
    };
    const firstUsableSearchResult = (results) => (results || []).find((result) => !searchResultIsJob(result));
    const activeCustomerSearch = (filters) => {
      if (typeof nlapiSearchRecord !== "function" || typeof nlobjSearchFilter !== "function" || typeof nlobjSearchColumn !== "function") return [];
      const base = [new nlobjSearchFilter("isinactive", null, "is", "F")];
      const columns = [
        new nlobjSearchColumn("internalid"),
        new nlobjSearchColumn("entityid"),
        new nlobjSearchColumn("companyname"),
        new nlobjSearchColumn("altname"),
      ];
      try {
        return nlapiSearchRecord("customer", null, base.concat(filters), columns) || [];
      } catch {
        return [];
      }
    };
    const cleanSearchText = (value) => compact(value)
      .replace(/\\bcu:\\s*\\d{4,}\\b/i, "")
      .replace(/^\\d{4,}\\s+/, "")
      .replace(/\\b(?:llc|ltd|limited|inc|incorporated|corp|corporation|co|company)\\.?$/i, "")
      .replace(/[,.;:\\-|]+$/g, "")
      .trim();
    const resolveInput = (input) => {
      const raw = compact(input.raw || input.input || input.label || input.query || input.internalId);
      const directInternalId = compact(input.internalId);
      const companyId = compact(input.companyId);
      const query = cleanSearchText(input.query || raw);
      if (companyId && typeof nlobjSearchFilter === "function") {
        const exact = firstUsableSearchResult(activeCustomerSearch([new nlobjSearchFilter("entityid", null, "startswith", companyId)]));
        if (exact) {
          const internalId = compact(exact.getId?.() || valueOf(exact, "internalid"));
          if (internalId) return { internalId, label: labelForSearchResult(exact), input: raw };
        }
      }
      if (input.directInternalId && /^\\d+$/.test(directInternalId)) {
        return { internalId: directInternalId, label: compact(input.label || raw || directInternalId), input: raw };
      }
      if (query && typeof nlobjSearchFilter === "function") {
        const byEntity = firstUsableSearchResult(activeCustomerSearch([new nlobjSearchFilter("entityid", null, "startswith", query)]));
        const found = byEntity || firstUsableSearchResult(activeCustomerSearch([new nlobjSearchFilter("companyname", null, "startswith", query)]));
        if (found) {
          const internalId = compact(found.getId?.() || valueOf(found, "internalid"));
          if (internalId) return { internalId, label: labelForSearchResult(found), input: raw };
        }
      }
      if (/^\\d+$/.test(directInternalId)) {
        return { internalId: directInternalId, label: compact(input.label || raw || directInternalId), input: raw };
      }
      return { input: raw, label: compact(input.label || raw), reason: "Inactive or not found." };
    };
    const seenMemberIds = new Set();
    const pendingMembers = [];
    const addPending = (member) => {
      const internalId = compact(member.internalId);
      const label = compact(member.label || member.input || member.raw || "");
      // NSCORP job IDs begin with J; jobs are outside the static-group workflow.
      if (/^J(?:\d|\s)/i.test(label)) {
        result.skipped.push({
          input: compact(member.input || member.raw || member.label || label),
          internalId,
          label,
          reason: "Job record; jobs are not processed.",
        });
        return;
      }
      if (!/^\\d+$/.test(internalId)) {
        result.skipped.push({
          input: compact(member.input || member.raw || member.label),
          label: compact(member.label || member.input || member.raw),
          reason: compact(member.reason) || "Inactive or not found.",
        });
        return;
      }
      if (seenMemberIds.has(internalId)) {
        result.skipped.push({
          input: compact(member.input || member.raw || member.label || internalId),
          internalId,
          label: compact(member.label || member.input || internalId),
          reason: "Duplicate input; record will not be added twice.",
        });
        return;
      }
      seenMemberIds.add(internalId);
      pendingMembers.push({
        internalId,
        label,
        input: compact(member.input || member.raw || member.label || internalId),
      });
    };
    if (mode === "create") {
      try {
        nlapiSetFieldValue("groupname", parsed.name, false, true);
        groupName.value = parsed.name;
        groupName.dispatchEvent(new Event("input", { bubbles: true }));
        groupName.dispatchEvent(new Event("change", { bubbles: true }));
        markChanged();
      } catch (error) {
        return { ok: false, error: "Could not set the static group name: " + compact(error?.message || error) };
      }
      await wait(800);
      const nameError = duplicateNameError();
      if (nameError) return { ok: false, error: nameError };
    }
    const addMemberOnCreatePage = async (member) => {
      const internalId = compact(member.internalId);
      nlapiSelectNewLineItem("groupmembers");
      nlapiSetCurrentLineItemValue("groupmembers", "custjobmember", internalId, true, true);
      nlapiCommitLineItem("groupmembers");
    };
    const addMemberOnExistingGroupPage = async (member) => {
      const internalId = compact(member.internalId);
      const label = compact(member.label || member.input || internalId);
      const display = document.getElementById("groupmembers_custjobmember_display")
        || document.forms.groupmembers_main_form?.elements.custjobmember_display;
      const hidden = document.getElementById("hddn_groupmembers_custjobmember_fs")
        || document.forms.groupmembers_main_form?.elements.custjobmember
        || document.querySelector("input[name='custjobmember']");
      const addButton = document.getElementById("addcont");
      const dataField = document.forms.main_form?.elements.groupmembersdata;
      const hasMember = () => {
        const data = String(dataField?.value || "");
        return data.split("\\u0002").some((line) => line.split("\\u0001")[2] === internalId);
      };
      if (!display || !hidden || typeof add_member !== "function") {
        throw new Error("Static group Name field was not ready.");
      }
      if (hasMember()) return false;
      display.focus();
      display.value = label;
      display.setAttribute("previousvalue", label);
      hidden.value = internalId;
      markChanged();
      if (addButton) addButton.click();
      else add_member();
      const deadline = Date.now() + 2000;
      while (Date.now() < deadline) {
        await wait(350);
        if (hasMember()) return true;
      }
      // After 100 members, NSCORP may save a new member to the next page while
      // groupmembersdata remains limited to the current page. The server
      // verifies the actual total from a freshly opened group page afterward.
      return true;
    };
    for (const member of parsed.members || []) addPending(member);
    for (const input of parsed.inputs || []) addPending(resolveInput(input));
    for (const member of pendingMembers) {
      const internalId = compact(member.internalId);
      if (!internalId) continue;
      try {
        const changed = mode === "add" ? await addMemberOnExistingGroupPage(member) : (await addMemberOnCreatePage(member), true);
        const output = { internalId, label: compact(member.label), input: compact(member.input) };
        if (changed === false) result.already.push(output);
        else result.added.push(output);
      } catch (error) {
        result.failed.push({
          input: compact(member.input),
          internalId,
          label: compact(member.label),
          reason: compact(error?.message || error) || "Could not add member.",
        });
      }
    }
    result.expectedMemberCount = Number(result.beforeCount || 0) + result.added.length;
    if (!result.added.length && !result.already.length) {
      return { ...result, ok: false, error: "No members could be added to the static group." };
    }
    if (!result.added.length) return { ...result, submitted: false };
    const finalNameError = duplicateNameError();
    if (finalNameError) return { ...result, ok: false, error: finalNameError };
    markChanged();
    result.submitted = true;
    return result;
  })()`;
}

function staticGroupErrorMessage(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text) return "";
  if (/this record already exists/i.test(text)) return "Static group name already exists.";
  const parts = text
    .split(/(?=\b(?:Notice|Error|Warning)\b)/i)
    .map((part) => part.replace(/^(?:Notice|Error|Warning)\s+/i, "").trim())
    .filter(Boolean);
  const seen = new Set();
  const unique = [];
  for (const part of parts.length ? parts : [text]) {
    const key = part.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(part);
  }
  return unique.join(" ") || text;
}

async function staticGroupSavedState(client, timeout = 70000) {
  const deadline = Date.now() + timeout;
  let lastState = {};
  while (Date.now() < deadline) {
    await waitForPageReady(client, 5000);
    try {
      const result = await client.send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
          const href = location.href;
          const params = new URL(href).searchParams;
          const id = params.get("id") || "";
          const title = document.title || "";
          const text = compact(document.body?.innerText || document.body?.textContent || "");
          const loginLikely = /login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(text);
          const errorText = compact(Array.from(document.querySelectorAll(".uir-message-error, .error, .uir-alert-box.error, [class*='error']")).map((node) => node.innerText || node.textContent || "").join(" "));
          return { href, id, title, loginLikely, errorText, text: text.slice(0, 1200) };
        })()`,
      });
      lastState = result?.result?.value || {};
      if (lastState.loginLikely) throw sessionInvalidError(`${STATIC_GROUP_WORKER_TAB_TITLE} lost its NSCORP login. ${reconnectBrowserMessage()}`);
      if (lastState.id) return lastState;
      if (lastState.errorText && /error|already|invalid|required|permission|unexpected/i.test(lastState.errorText)) return lastState;
    } catch (error) {
      if (error.code === SESSION_INVALID_ERROR_CODE) throw error;
      // Navigation can briefly destroy the context after Save.
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return lastState;
}

async function saveStaticGroupPage(client, timeout = 90000) {
  const startResult = await client.send("Runtime.evaluate", {
    awaitPromise: false,
    returnByValue: true,
    expression: `(() => {
      const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
      const submitter = document.getElementById("submitter") || document.querySelector("input[type='submit'][value='Save']");
      if (!submitter) return { ok: false, error: "Static group Save button was not found." };
      try {
        if (typeof NLInvokeButton === "function") NLInvokeButton(submitter);
        else submitter.click();
      } catch (error) {
        return { ok: false, error: "Could not click Save: " + compact(error?.message || error) };
      }
      return { ok: true, href: location.href };
    })()`,
  });
  const startValue = startResult?.result?.value || {};
  if (!startValue.ok) throw new Error(startValue.error || "Static group Save could not be started.");

  const deadline = Date.now() + timeout;
  let lastState = startValue;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    try {
      const stateResult = await client.send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
          const href = location.href;
          const params = new URL(href).searchParams;
          const title = document.title || "";
          const text = compact(document.body?.innerText || document.body?.textContent || "");
          const loginLikely = /login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(text);
          const errorText = compact(Array.from(document.querySelectorAll(".uir-message-error, .error, .uir-alert-box.error, [class*='error']")).map((node) => node.innerText || node.textContent || "").join(" "));
          const isEdit = params.get("e") === "T" || /[?&]e=T(?:&|$)/i.test(href);
          return {
            href,
            title,
            readyState: document.readyState,
            loginLikely,
            errorText,
            isEdit,
            text: text.slice(0, 1200),
          };
        })()`,
      });
      lastState = stateResult?.result?.value || {};
      if (lastState.loginLikely) throw sessionInvalidError(`${STATIC_GROUP_WORKER_TAB_TITLE} lost its NSCORP login. ${reconnectBrowserMessage()}`);
      const formError = staticGroupErrorMessage(lastState.errorText || "");
      if (formError) throw new Error(formError);
      if (
        lastState.readyState === "complete"
        && /\/app\/crm\/common\/crmgroup\.nl/i.test(String(lastState.href || ""))
        && !lastState.isEdit
      ) {
        return lastState;
      }
    } catch (error) {
      if (error.code === SESSION_INVALID_ERROR_CODE) throw error;
      if (!isRecoverableChromeProtocolError(error)) throw error;
      // Save navigation can briefly destroy the context.
      lastState = { ...lastState, transientError: error?.message || String(error || "") };
    }
  }

  const formError = staticGroupErrorMessage(lastState.errorText || "");
  throw new Error(formError || "NetSuite did not finish saving the static group. Please check the Static Group Worker tab before retrying.");
}

async function createStaticGroup(request) {
  const normalized = normalizeStaticGroupCreateRequest(request);
  const state = workerLane("staticGroup");
  const generation = state.generation;
  return queueWorkerTask(async () => {
    if (state.generation !== generation) throw workerStoppedError();
    const tab = await ensureWorkerTab("staticGroup");
    const client = await connect(tab.webSocketDebuggerUrl);
    try {
      await client.send("Page.enable").catch(() => {});
      await client.send("Runtime.enable").catch(() => {});
      await client.send("Page.navigate", { url: STATIC_GROUP_CREATE_URL });
      await waitForPageReady(client, 45000);
      if (state.generation !== generation) throw workerStoppedError();
      await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
      const createResult = await client.send("Runtime.evaluate", {
        expression: staticGroupCreateOnPageExpression(normalized),
        awaitPromise: true,
        returnByValue: true,
        timeout: 90000,
      });
      const value = createResult?.result?.value || {};
      throwIfWorkerSessionInvalidResult(value, STATIC_GROUP_WORKER_TAB_TITLE);
      if (!value.ok) {
        const partialSkippedCount = normalized.skipped.length + (value.skipped?.length || 0) + (value.failed?.length || 0);
        if ((value.added?.length || 0) || partialSkippedCount) {
          return {
            ok: false,
            error: value.error || "Static group could not be created.",
            group: {
              id: "",
              name: normalized.name,
              url: "",
              memberCount: value.added?.length || 0,
              skippedCount: partialSkippedCount,
              createdAt: new Date().toISOString(),
              added: value.added || [],
              skipped: [...normalized.skipped, ...(value.skipped || [])],
              failed: value.failed || [],
            },
          };
        }
        throw new Error(value.error || "Static group could not be created.");
      }
      if (value.submitted) {
        await saveStaticGroupPage(client, 90000);
      }
      const savedState = await staticGroupSavedState(client);
      if (savedState.loginLikely) throw sessionInvalidError();
      if (!savedState.id) {
        const errorText = staticGroupErrorMessage(savedState.errorText || savedState.text) || "NetSuite did not return a saved static group ID.";
        throw new Error(errorText);
      }
      const group = {
        id: String(savedState.id),
        name: normalized.name,
        url: `${NETSUITE_ORIGIN}/app/crm/common/crmgroup.nl?id=${encodeURIComponent(String(savedState.id))}`,
        memberCount: value.added?.length || normalized.members.length,
        skippedCount: normalized.skipped.length + (value.skipped?.length || 0) + (value.failed?.length || 0),
        createdAt: new Date().toISOString(),
        added: value.added || [],
        skipped: [...normalized.skipped, ...(value.skipped || [])],
        failed: value.failed || [],
      };
      await addStaticGroupHistory(group);
      await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
      return { ok: true, group };
    } finally {
      client.close();
    }
  }, "staticGroup");
}

async function addStaticGroupMembers(request) {
  const normalized = normalizeStaticGroupAddRequest(request);
  const state = workerLane("staticGroup");
  const generation = state.generation;
  return queueWorkerTask(async () => {
    if (state.generation !== generation) throw workerStoppedError();
    const tab = await ensureWorkerTab("staticGroup");
    const client = await connect(tab.webSocketDebuggerUrl);
    try {
      await client.send("Page.enable").catch(() => {});
      await client.send("Runtime.enable").catch(() => {});
      const url = `${NETSUITE_ORIGIN}/app/crm/common/crmgroup.nl?id=${encodeURIComponent(normalized.groupId)}`;
      await client.send("Page.navigate", { url });
      await waitForPageReady(client, 45000);
      if (state.generation !== generation) throw workerStoppedError();
      await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
      const beforeMemberState = await readStaticGroupMemberState(client, normalized.groupId, 45000);
      const addResult = await client.send("Runtime.evaluate", {
        expression: staticGroupCreateOnPageExpression({ ...normalized, mode: "add" }),
        awaitPromise: true,
        returnByValue: true,
        timeout: 90000,
      });
      const value = addResult?.result?.value || {};
      throwIfWorkerSessionInvalidResult(value, STATIC_GROUP_WORKER_TAB_TITLE);
      if (!value.ok) {
        const skippedCount = normalized.skipped.length + (value.skipped?.length || 0) + (value.failed?.length || 0);
        if ((value.added?.length || 0) || skippedCount) {
          return {
            ok: false,
            error: value.error || "Static group members could not be added.",
            groupId: normalized.groupId,
            added: value.added || [],
            already: value.already || [],
            skipped: [...normalized.skipped, ...(value.skipped || [])],
            failed: value.failed || [],
          };
        }
        throw new Error(value.error || "Static group members could not be added.");
      }
      let savedMemberState = {};
      if ((value.added?.length || 0) > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        savedMemberState = await readStaticGroupMemberState(client, normalized.groupId, 45000);
        const savedMemberCount = Number(savedMemberState.memberCount);
        const beforeMemberCount = Number(beforeMemberState.memberCount);
        const expectedMemberCount = beforeMemberState.hasCount && Number.isFinite(beforeMemberCount)
          ? beforeMemberCount + Number(value.added?.length || 0)
          : Number(value.expectedMemberCount || 0);
        if (!savedMemberState.hasCount || !Number.isFinite(savedMemberCount) || savedMemberCount < expectedMemberCount) {
          const reason = savedMemberState.hasCount && Number.isFinite(savedMemberCount)
            ? `NetSuite saved ${savedMemberCount} member(s), expected at least ${expectedMemberCount}.`
            : "NetSuite did not return a saved member count.";
          const failedAdded = (value.added || []).map((member) => ({
            ...member,
            reason: `${reason} Retry this record.`,
          }));
          if (savedMemberState.hasCount && Number.isFinite(savedMemberCount)) {
            await updateStaticGroupHistoryCount(normalized.groupId, savedMemberCount);
          }
          await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
          return {
            ok: true,
            groupId: normalized.groupId,
            added: [],
            already: value.already || [],
            skipped: [...normalized.skipped, ...(value.skipped || [])],
            failed: [...(value.failed || []), ...failedAdded],
            saveVerified: false,
            savedMemberCount: savedMemberState.hasCount ? savedMemberCount : null,
            expectedMemberCount,
            warning: reason,
          };
        }
        await updateStaticGroupHistoryCount(normalized.groupId, savedMemberCount);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await waitForPageReady(client, 45000);
      }
      await labelWorkerTab(client, STATIC_GROUP_WORKER_TAB_TITLE);
      return {
        ok: true,
        groupId: normalized.groupId,
        added: value.added || [],
        already: value.already || [],
        skipped: [...normalized.skipped, ...(value.skipped || [])],
        failed: value.failed || [],
        saveVerified: (value.added?.length || 0) > 0 ? true : undefined,
        savedMemberCount: savedMemberState.hasCount ? Number(savedMemberState.memberCount) : undefined,
        expectedMemberCount: Number(value.expectedMemberCount || 0) || undefined,
      };
    } finally {
      client.close();
    }
  }, "staticGroup");
}

function pitchbookGroupExpression(groupInput) {
  return `(async () => {
    const input = ${jsString(groupInput)};
    const origin = ${jsString(NETSUITE_ORIGIN)};
    const compact = (value) => String(value || "").replace(/\\s+/g, " ").trim();
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const errorText = (error) => compact(error?.message || error?.name || error || "Pitchbook request failed");
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const inputNode = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (inputNode) return compact(inputNode.value || inputNode.innerText || inputNode.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, ids, labels) => {
      for (const id of ids) {
        const valueNode = doc.getElementById(id + "_val");
        if (valueNode) {
          const value = compact(valueNode.innerText || valueNode.textContent || valueNode.value || "");
          if (value) return value;
        }
        const input = doc.getElementById(id) || doc.querySelector("[name='" + id + "']");
        if (input) {
          const value = compact(input.value || input.innerText || input.textContent || "");
          if (value) return value;
        }
      }
      return fieldByLabels(doc, labels);
    };
    const isLogin = (doc) => Boolean(doc.querySelector("input[type='password'], input[name*='password' i], form[action*='login' i]"));
    const groupUrl = /^https?:\\/\\/[^\\s]+\\/app\\/crm\\/common\\/crmgroup\\.nl(?:\\?|$)/i.test(compact(input)) ? compact(input) : "";
    if (!groupUrl) return { ok: false, error: "Paste a direct Static Group URL from NetSuite." };
    let groupName = "";
    const fetchText = async (url, timeoutMs = 25000) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const response = await fetch(url, { credentials: "include", redirect: "follow", signal: controller.signal });
        const html = await response.text();
        return { html, url: response.url || url };
      } finally {
        clearTimeout(timer);
      }
    };
    const mapWithLimit = async (items, limit, iterator) => {
      const output = new Array(items.length);
      let cursor = 0;
      const workers = Array.from({ length: Math.min(limit, Math.max(1, items.length)) }, async () => {
        while (cursor < items.length) {
          const index = cursor;
          cursor += 1;
          output[index] = await iterator(items[index], index);
        }
      });
      await Promise.all(workers);
      return output;
    };
    const groupFetch = await fetchText(groupUrl, 35000);
    const groupHtml = groupFetch.html;
    const groupDoc = new DOMParser().parseFromString(groupHtml, "text/html");
    const groupText = compact(groupDoc.body?.innerText || groupDoc.body?.textContent || "");
    if (isLogin(groupDoc) || /sign in|login/i.test(groupDoc.title || "")) return { ok: false, loginLikely: true, error: "NetSuite login is required to load the Static Group." };
    groupName = compact(fieldValue(groupDoc, ["groupname", "name"], ["Group Name", "Name"])) || compact(groupDoc.title).replace(/\\s*[-|].*$/, "");
    const idSet = new Set();
    const members = Array.from(groupDoc.querySelectorAll("a[href*='/app/common/entity/custjob.nl?id=']")).map((anchor) => {
      const href = new URL(anchor.getAttribute("href"), origin).href;
      const id = href.match(/[?&]id=(\\d+)/i)?.[1] || "";
      const name = compact(anchor.textContent);
      if (!id || idSet.has(id)) return null;
      idSet.add(id);
      return { id, internalId: id, name, url: origin + "/app/common/entity/custjob.nl?id=" + encodeURIComponent(id), editUrl: origin + "/app/common/entity/custjob.nl?id=" + encodeURIComponent(id) + "&e=T" };
    }).filter(Boolean);
    const readMember = async (member) => {
      try {
        const fetched = await fetchText(member.url, 20000);
        const html = fetched.html;
        const doc = new DOMParser().parseFromString(html, "text/html");
        if (isLogin(doc)) throw new Error("NetSuite login is required.");
        const entityIdRaw = fieldValue(doc, ["entityid", "entityid_display"], ["ID", "Entity ID", "Customer ID", "Company ID", "Lead ID"])
          || compact(html.match(/(?:name|id)=["']entityid(?:_display)?["'][^>]*value=["']([^"']*)/i)?.[1] || "");
        const entityId = entityIdRaw.match(/^(\\S+)/)?.[1] || entityIdRaw;
        return {
          ...member,
          internalId: member.internalId || member.id,
          entityId,
          name: fieldValue(doc, ["companyname", "entityid"], ["Company Name", "Name"]) || member.name,
          privateEquityVentureCapital: fieldValue(doc, ["custentity_private_equity_venture_capital", "custentity_private_equity", "custentity_pevc"], ["Private Equity/Venture Capital", "Private Equity / Venture Capital", "Private Equity/Venture Capital Firm"]),
          additionalPeVc: fieldValue(doc, ["custentity_additional_pe_vc", "custentity_additional_pevc", "custentity_additional_private_equity"], ["Additional PE/VC", "Additional PE / VC", "Additional Private Equity/Venture Capital"]),
        };
      } catch (error) {
        return { ...member, error: errorText(error), privateEquityVentureCapital: "", additionalPeVc: "" };
      }
    };
    const rows = await mapWithLimit(members, 6, readMember);
    return { ok: true, groupName, groupUrl, rows, count: rows.length, warning: !rows.length && groupText.includes("No records") ? "The Static Group has no members." : "" };
  })()`;
}

function recordParseExpression(internalId, options = {}) {
  const requestedInternalId = String(internalId).trim();
  const url = `${NETSUITE_ORIGIN}/app/common/entity/custjob.nl?id=${encodeURIComponent(requestedInternalId)}&__codex_record_fetch=${Date.now()}`;
  const includeRelated = Boolean(options.includeRelated);
  const includeSubcustomerCount = Boolean(options.includeSubcustomerCount);
  return `(() => {
    const targetUrl = ${jsString(url)};
    const requestedInternalId = ${jsString(requestedInternalId)};
    const includeRelated = ${includeRelated ? "true" : "false"};
    const includeSubcustomerCount = ${includeSubcustomerCount ? "true" : "false"};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const input = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (input) return compact(input.value || input.innerText || input.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) return compact(byValue.innerText || byValue.textContent || byValue.value || "");
      const byLabel = doc.querySelector("[aria-labelledby='" + fieldId + "_fs_lbl']");
      if (byLabel) {
        const text = compact(byLabel.innerText || byLabel.textContent || byLabel.value || "");
        if (text) return text;
      }
      const wrapper = doc.querySelector("[data-field-name='" + fieldId + "']");
      if (wrapper) {
        const label = wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink");
        const fieldInput = wrapper.querySelector("[data-nsps-type='field_input']");
        let text = compact((fieldInput || wrapper).innerText || (fieldInput || wrapper).textContent || "");
        if (label) text = text.replace(compact(label.innerText || label.textContent || ""), "").trim();
        return text;
      }
      if (labels.length) return fieldByLabels(doc, labels);
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) return compact(input.value || input.innerText || input.textContent || "");
      return "";
    };
    const linesFromNode = (doc, source) => {
      if (!source) return [];
      const clone = source.cloneNode(true);
      clone.querySelectorAll("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink, script, style").forEach((node) => node.remove());
      clone.querySelectorAll("a, button").forEach((node) => {
        if (/^map$/i.test(compact(node.textContent))) node.remove();
      });
      clone.querySelectorAll("br").forEach((node) => node.replaceWith(doc.createTextNode("\\n")));
      clone.querySelectorAll("div, p, tr, li").forEach((node) => node.appendChild(doc.createTextNode("\\n")));
      return String(clone.textContent || "")
        .split(/\\n+/)
        .map((line) => compact(line).replace(/\\s*Map$/i, ""))
        .filter(Boolean);
    };
    const fieldLinesByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const source = wrapper.querySelector("[data-nsps-type='field_input']") || wrapper;
        return linesFromNode(doc, source);
      }
      return [];
    };
    const formatAddress = (lines) => {
      const cleanLines = lines.map((line) => compact(line).replace(/\\s*Map$/i, "")).filter(Boolean);
      return cleanLines.join("\\n");
    };
    const addressValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) {
        const lines = linesFromNode(doc, byValue);
        if (lines.length) return formatAddress(lines);
      }
      const byLabel = doc.querySelector("[aria-labelledby='" + fieldId + "_fs_lbl']");
      if (byLabel) {
        const lines = linesFromNode(doc, byLabel);
        if (lines.length) return formatAddress(lines);
      }
      const wrapper = doc.querySelector("[data-field-name='" + fieldId + "']");
      if (wrapper) {
        const source = wrapper.querySelector("[data-nsps-type='field_input']") || wrapper;
        const lines = linesFromNode(doc, source);
        if (lines.length) return formatAddress(lines);
      }
      if (labels.length) {
        const lines = fieldLinesByLabels(doc, labels);
        if (lines.length) return formatAddress(lines);
      }
      return fieldValue(doc, fieldId, labels).replace(/\\s*Map$/i, "");
    };
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const checkboxValue = (doc, fieldId, labels = []) => {
      const readOnly = doc.getElementById(fieldId + "_fs");
      if (readOnly) {
        const className = String(readOnly.className || "");
        if (/checkbox_read_unck|checkbox_unck|unchecked/i.test(className)) return "No";
        if (/checkbox_read_ck|checkbox_ck|checked/i.test(className)) return "Yes";
      }
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) {
        if (String(input.type || "").toLowerCase() === "checkbox") return input.checked ? "Yes" : "No";
        const rawInput = compact(input.value || input.innerText || input.textContent || "").toLowerCase();
        if (["t", "true", "yes", "y", "checked"].includes(rawInput)) return "Yes";
        if (["f", "false", "no", "n", "unchecked", ""].includes(rawInput)) return "No";
      }
      const raw = fieldValue(doc, fieldId, labels).toLowerCase();
      if (["t", "true", "yes", "y", "checked"].includes(raw)) return "Yes";
      return "No";
    };
    const searchError = (error) => ({
      text: (() => {
        try { return compact(error?.message || error?.name || "NetSuite search error"); } catch { return "NetSuite search error"; }
      })(),
      name: (() => {
        try { return compact(error?.name || ""); } catch { return ""; }
      })(),
      message: (() => {
        try { return compact(error?.message || ""); } catch { return ""; }
      })(),
      code: (() => {
        try { return compact(error?.code || (typeof error?.getCode === "function" ? error.getCode() : "")); } catch { return ""; }
      })(),
      details: (() => {
        try { return compact(error?.details || (typeof error?.getDetails === "function" ? error.getDetails() : "")); } catch { return ""; }
      })(),
    });
    const valueFromResult = (result, column) => {
      try {
        return compact(result.getText(column) || result.getValue(column) || "");
      } catch {
        return "";
      }
    };
    const checkboxResultText = (value) => {
      const text = compact(value).toLowerCase();
      if (["t", "true", "yes", "y", "checked"].includes(text)) return "Yes";
      if (["f", "false", "no", "n", "unchecked", ""].includes(text)) return "No";
      return compact(value);
    };
    const runRelatedSearch = (type, filterName, columnSpecs, makeUrl, enrichRow) => {
      if (typeof nlapiCreateSearch !== "function") {
        return { ok: false, rows: [], count: 0, error: { message: "NetSuite search helper is not available on this page." } };
      }
      try {
        const columns = columnSpecs.map((column) => new nlobjSearchColumn(column.source));
        const filters = [new nlobjSearchFilter(filterName, null, "anyof", [${jsString(internalId)}])];
        const resultSet = nlapiCreateSearch(type, filters, columns).runSearch();
        const results = resultSet.getResults(0, 51) || [];
        const rows = results.slice(0, 50).map((result) => {
          const row = {
            internalId: result.getId ? String(result.getId() || "") : valueFromResult(result, columns[0]),
            recordType: result.getRecordType ? String(result.getRecordType() || "") : type,
          };
          columnSpecs.forEach((column, index) => {
            row[column.key] = valueFromResult(result, columns[index]);
          });
          row.url = makeUrl(row.internalId);
          if (typeof enrichRow === "function") Object.assign(row, enrichRow(row));
          return row;
        });
        return {
          ok: true,
          rows,
          count: rows.length,
          truncated: results.length > 50,
        };
      } catch (error) {
        return { ok: false, rows: [], count: 0, error: searchError(error) };
      }
    };
    const countSubcustomersFromPage = (doc) => {
      const currentId = compact(requestedInternalId);
      const loadedFlag = compact(doc.getElementById("subsloaded")?.value || doc.querySelector("[name='subsloaded']")?.value || "");
      const dottedFlag = compact(doc.getElementById("subsdotted")?.value || doc.querySelector("[name='subsdotted']")?.value || "");
      if (loadedFlag.toUpperCase() === "F" && dottedFlag.toUpperCase() === "F") return 0;
      const bodyText = compact(doc.body?.innerText || doc.body?.textContent || "");
      const subcustomerIndex = bodyText.toLowerCase().indexOf("subcustomers");
      if (subcustomerIndex >= 0) {
        const subcustomerText = bodyText.slice(subcustomerIndex, subcustomerIndex + 2500);
        if (/no records to show|no records found/i.test(subcustomerText)) return 0;
      }

      const subcustomerNodes = Array.from(doc.querySelectorAll("[id], [name]")).filter((node) => {
        const key = String(node.id || "") + " " + String(node.getAttribute("name") || "");
        return /subcustomers?/i.test(key);
      });
      const containers = Array.from(new Set(subcustomerNodes.map((node) => {
        if (/table|tbody|div|section/i.test(node.tagName || "")) return node;
        return node.closest("table, tbody, div, section");
      }).filter(Boolean)));
      for (const container of containers) {
        const text = compact(container.innerText || container.textContent || "");
        if (/no records to show|no records found/i.test(text)) return 0;
        const ids = new Set();
        Array.from(container.querySelectorAll("tr")).forEach((row) => {
          Array.from(row.querySelectorAll("a[href]")).forEach((anchor) => {
            const href = String(anchor.getAttribute("href") || "");
            const match = href.match(/[?&]id=(\\d+)/i);
            if (match?.[1] && match[1] !== currentId) ids.add(match[1]);
          });
        });
        if (ids.size) return ids.size;
      }
      return null;
    };
    const countSubcustomers = (doc) => {
      if (!includeSubcustomerCount) return "";
      const pageCount = countSubcustomersFromPage(doc);
      if (pageCount !== null) return pageCount;
      if (typeof nlapiCreateSearch !== "function") return 0;
      try {
        const filters = [new nlobjSearchFilter("parent", null, "anyof", [${jsString(internalId)}])];
        const columns = [new nlobjSearchColumn("internalid")];
        const resultSet = nlapiCreateSearch("customer", filters, columns).runSearch();
        const ids = new Set();
        const currentId = compact(${jsString(internalId)});
        let start = 0;
        while (start < 10000) {
          const batch = resultSet.getResults(start, start + 1000) || [];
          batch.forEach((result) => {
            const resultId = compact((result.getId && result.getId()) || result.getValue(columns[0]) || "");
            if (resultId && resultId !== currentId) ids.add(resultId);
          });
          if (batch.length < 1000) break;
          start += batch.length;
        }
        return ids.size;
      } catch {
        return 0;
      }
    };
    const relatedRecords = () => ({
      opportunities: runRelatedSearch("opportunity", "entity", [
        { key: "internalId", source: "internalid" },
        { key: "date", source: "trandate" },
        { key: "title", source: "title" },
        { key: "salesRep", source: "salesrep" },
        { key: "expectedCloseDate", source: "expectedclosedate" },
        { key: "status", source: "status" },
      ], (id) => id ? ${jsString(NETSUITE_ORIGIN)} + "/app/accounting/transactions/opprtnty.nl?id=" + encodeURIComponent(id) : "", (row) => ({
        editUrl: row.internalId ? ${jsString(NETSUITE_ORIGIN)} + "/app/accounting/transactions/opprtnty.nl?id=" + encodeURIComponent(row.internalId) + "&e=T" : "",
      })),
      tasks: runRelatedSearch("task", "company", [
        { key: "internalId", source: "internalid" },
        { key: "title", source: "title" },
        { key: "assigned", source: "assigned" },
        { key: "status", source: "status" },
        { key: "startDate", source: "startdate" },
        { key: "dueDate", source: "duedate" },
        { key: "company", source: "company" },
      ], (id) => id ? ${jsString(NETSUITE_ORIGIN)} + "/app/crm/calendar/task.nl?id=" + encodeURIComponent(id) : "", (row) => ({
        editUrl: row.internalId ? ${jsString(NETSUITE_ORIGIN)} + "/app/crm/calendar/task.nl?id=" + encodeURIComponent(row.internalId) + "&e=T" : "",
      })),
      contacts: runRelatedSearch("contact", "company", [
        { key: "internalId", source: "internalid" },
        { key: "name", source: "entityid" },
        { key: "inactive", source: "isinactive" },
        { key: "company", source: "company" },
        { key: "subsidiary", source: "subsidiary" },
      ], (id) => id ? ${jsString(NETSUITE_ORIGIN)} + "/app/common/entity/contact.nl?id=" + encodeURIComponent(id) : "", (row) => ({
        inactive: checkboxResultText(row.inactive),
        editUrl: row.internalId ? ${jsString(NETSUITE_ORIGIN)} + "/app/common/entity/contact.nl?id=" + encodeURIComponent(row.internalId) + "&e=T" : "",
      })),
    });
    return fetch(targetUrl, { credentials: "include", redirect: "follow", cache: "no-store" })
      .then((response) => response.text().then((html) => ({ response, html })))
      .then(({ response, html }) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        const text = compact(doc.body?.innerText || doc.body?.textContent || "");
        const title = doc.title || "";
        const responseInternalId = (() => {
          try { return new URL(response.url).searchParams.get("id") || ""; } catch { return ""; }
        })();
        const recordIdentityMismatch = Boolean(responseInternalId && responseInternalId !== requestedInternalId);
        const record = {
          internalId: requestedInternalId,
          entityId: fieldValue(doc, "entityid"),
          companyName: fieldValue(doc, "companyname"),
          inactive: checkboxValue(doc, "isinactive", ["Inactive", "Customer is Inactive"]),
          status: fieldValue(doc, "entitystatus"),
          salesRep: fieldValue(doc, "salesrep", ["Sales Rep"]),
          email: fieldValue(doc, "email"),
          address: addressValue(doc, "defaultaddress", ["Address", "Default Address", "Billing Address"]),
          webAddress: fieldValue(doc, "url"),
          phone: fieldValue(doc, "phone"),
          partner: fieldValue(doc, "partner", ["Partner"]),
          parentCompany: fieldValue(doc, "parent", ["Parent Company", "Parent"]),
          subcustomerCount: countSubcustomers(doc),
          category: fieldValue(doc, "category"),
          subsidiary: fieldValue(doc, "subsidiary"),
          lsadDate: fieldValue(doc, "custentity_lsad_date"),
          zoomInfoCompanyId: fieldValue(doc, "custentity_zoominfo_compid", ["ZoomInfo Company ID", "ZoomInfo Company Id"]),
          zoomInfoIndustry: fieldValue(doc, "custentity_zoominfo_industry", ["ZoomInfo Industry"]),
          zoomInfoSubIndustry: fieldValue(doc, "custentity_zoominfo_subindustry", ["ZoomInfo SubIndustry", "ZoomInfo Subindustry", "ZoomInfo Sub Industry"]),
          industry: firstValue(
            fieldValue(doc, "custentity_gtm_industry", ["Industry", "Industry (Custom)"]),
            fieldValue(doc, "custentity_gtm_industry_family", ["Industry", "Industry (Custom)"]),
            fieldValue(doc, "custentity_industry", ["Industry", "Industry (Custom)"])
          ),
          industrySubgroup: fieldValue(doc, "custentity_industry_subgroup", ["Industry Subgroup", "Industry Subgroup (Custom)"]),
          annualRevenue: firstValue(
            fieldValue(doc, "custentity159", ["Annual Revenue", "Annual Revenue (Custom)"]),
            fieldValue(doc, "custentity_annual_revenue", ["Annual Revenue", "Annual Revenue (Custom)"]),
            fieldValue(doc, "annualrevenue", ["Annual Revenue", "Annual Revenue (Custom)"])
          ),
          targetRecord: checkboxValue(doc, "custentity_target_record", ["Target Record", "Target Record (Custom)"]),
          targetRecordDate: fieldValue(doc, "custentity_target_record_date", ["Target Record Date", "Target Record Date (Custom)"]),
          outOfAlignment: checkboxValue(doc, "custentity172", ["Out of Alignment", "Out of Alignment (Custom)"]),
        };
        if (includeRelated) record.related = relatedRecords();
        const hasRecordIdentity = Boolean(record.entityId || record.companyName || record.status);
        const loginLikely = !hasRecordIdentity && (
          /login|sign in/i.test(title)
          || /email address.*password|forgot your password/i.test(text)
        );
        return {
          ok: !loginLikely && !recordIdentityMismatch,
          loginLikely,
          recordIdentityMismatch,
          requestedUrl: targetUrl,
          responseUrl: response.url,
          status: response.status,
          title,
          record,
          textSnippet: text.slice(0, 1500),
        };
      });
  })()`;
}

function searchExpression(query, options = {}) {
  const q = String(query || "").trim();
  const safeQuery = jsString(q);
  const fast = Boolean(options.fast);

  return `(async () => {
    const query = ${safeQuery};
    const fast = ${fast ? "true" : "false"};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const decode = (value) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = String(value || "");
      return compact(textarea.value);
    };
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const errorText = (error) => {
      try {
        if (error && typeof error.message === "string") return error.message;
      } catch {}
      try {
        if (error && typeof error.name === "string") return error.name;
      } catch {}
      return "NetSuite search failed.";
    };
    const safeObjectValue = (object, key) => {
      try {
        return object ? object[key] : "";
      } catch {
        return "";
      }
    };
    const safeResultMethod = (result, methodName, ...args) => {
      try {
        const method = safeObjectValue(result, methodName);
        if (typeof method !== "function") return "";
        return method.apply(result, args);
      } catch {
        return "";
      }
    };
    const resultList = (results) => {
      if (!results) return [];
      try {
        if (Array.isArray(results)) return results.filter(Boolean);
      } catch {}
      const length = Number(safeObjectValue(results, "length") || 0);
      const items = [];
      for (let index = 0; index < length && index < 200; index += 1) {
        const item = safeObjectValue(results, index);
        if (item) items.push(item);
      }
      return items;
    };
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const input = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (input) return compact(input.value || input.innerText || input.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) return compact(byValue.innerText || byValue.textContent || byValue.value || "");
      const byLabel = doc.querySelector("[aria-labelledby='" + fieldId + "_fs_lbl']");
      if (byLabel) return compact(byLabel.innerText || byLabel.textContent || byLabel.value || "");
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) return compact(input.value || input.innerText || input.textContent || "");
      const wrapper = doc.querySelector("[data-field-name='" + fieldId + "']");
      if (wrapper) {
        const label = wrapper.querySelector(".uir-label, .smallgraytextnolink");
        let text = compact(wrapper.innerText || wrapper.textContent || "");
        if (label) text = text.replace(compact(label.innerText || label.textContent || ""), "").trim();
        return text;
      }
      if (labels.length) return fieldByLabels(doc, labels);
      return "";
    };
    const fetchRecordDetail = async (internalId) => {
      const url = new URL("/app/common/entity/custjob.nl", location.origin);
      url.searchParams.set("id", internalId);
      const response = await fetch(url.href, { credentials: "include", redirect: "follow" });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      return {
        id: fieldValue(doc, "entityid", ["ID"]),
        companyName: fieldValue(doc, "companyname", ["Company Name"]),
        status: fieldValue(doc, "entitystatus", ["Status"]),
        salesRep: fieldValue(doc, "salesrep", ["Sales Rep"]),
        email: fieldValue(doc, "email", ["Email"]),
        webAddress: fieldValue(doc, "url", ["Web Address"]),
        industry: firstValue(
          fieldValue(doc, "custentity_gtm_industry", ["Industry", "Industry (Custom)"]),
          fieldValue(doc, "custentity_gtm_industry_family", ["Industry", "Industry (Custom)"]),
          fieldValue(doc, "custentity_industry", ["Industry", "Industry (Custom)"])
        ),
        annualRevenue: firstValue(
          fieldValue(doc, "custentity159", ["Annual Revenue", "Annual Revenue (Custom)"]),
          fieldValue(doc, "custentity_annual_revenue", ["Annual Revenue", "Annual Revenue (Custom)"]),
          fieldValue(doc, "annualrevenue", ["Annual Revenue", "Annual Revenue (Custom)"])
        ),
      };
    };
    const zoomInfoSearchId = (text) => {
      const match = String(text || "").trim().match(/^zi\\s*:\\s*([0-9]+)\\s*$/i);
      return match ? match[1] : "";
    };
    const valueOf = (result, name) => {
      const valuesByKey = safeObjectValue(result, "valuesByKey");
      const keyedValue = safeObjectValue(safeObjectValue(valuesByKey, name), "value");
      return decode(firstValue(safeResultMethod(result, "getValue", name), keyedValue));
    };
    const defaultKindFromSearchPage = (result) => (
      /customer results|searchtype=Customer/i.test(String(result?.title || "") + " " + String(result?.url || ""))
        ? "CUSTOMER"
        : ""
    );
    const normalizeKind = (recordType, typeText) => {
      const rt = String(recordType || "").toLowerCase();
      if (rt === "lead") return "LEAD";
      if (rt === "prospect") return "PROSPECT";
      if (rt === "customer") return "CUSTOMER";
      const type = String(typeText || "").trim().toLowerCase();
      if (/^lead\\b/.test(type)) return "LEAD";
      if (/^prospect\\b/.test(type)) return "PROSPECT";
      if (/^customer\\b/.test(type)) return "CUSTOMER";
      return "";
    };
    const makeItems = (results) => {
      const seen = new Set();
      const items = [];
      for (const result of resultList(results)) {
        try {
        const recordType = safeResultMethod(result, "getRecordType") || safeObjectValue(result, "recordType") || "";
        const type = valueOf(result, "type");
        const kind = normalizeKind(recordType, type);
        if (!kind) continue;
        const internalId = String(safeResultMethod(result, "getId") || safeObjectValue(result, "id") || "").trim();
        if (!internalId) continue;
        const key = kind + ":" + internalId;
        if (seen.has(key)) continue;
        seen.add(key);
        const name = valueOf(result, "name");
        const info1 = valueOf(result, "info1");
        const info2 = valueOf(result, "info2");
        const url = new URL("/app/common/entity/custjob.nl", location.origin);
        url.searchParams.set("id", internalId);
        items.push({
          internalId,
          kind,
          recordType,
          type,
          title: name || internalId,
          info1,
          info2,
          url: url.href,
          salesRep: "",
          email: "",
          webAddress: "",
          industry: "",
          annualRevenue: "",
          text: ["-", "-", "-"].join(" | "),
        });
        if (items.length >= 50) break;
        } catch {
          continue;
        }
      }
      return items;
    };
    const searchZoomInfoCompanyId = async (zoomInfoId) => {
      if (typeof nlapiCreateSearch !== "function" || typeof nlobjSearchFilter !== "function" || typeof nlobjSearchColumn !== "function") {
        throw new Error("NetSuite record search helper is not available on this page.");
      }
      const filters = [
        new nlobjSearchFilter("custentity_zoominfo_compid", null, "is", zoomInfoId),
        new nlobjSearchFilter("stage", null, "anyof", ["LEAD", "PROSPECT", "CUSTOMER"]),
      ];
      const columns = [new nlobjSearchColumn("internalid")];
      const resultSet = nlapiCreateSearch("customer", filters, columns).runSearch();
      const results = resultSet.getResults(0, 50) || [];
      const seen = new Set();
      const items = [];
      for (const result of results) {
        const internalId = String(safeResultMethod(result, "getId") || safeResultMethod(result, "getValue", "internalid") || "").trim();
        if (!internalId || seen.has(internalId)) continue;
        seen.add(internalId);
        const url = new URL("/app/common/entity/custjob.nl", location.origin);
        url.searchParams.set("id", internalId);
        try {
          const detail = await fetchRecordDetail(internalId);
          const detailKind = normalizeKind("", detail.status || "");
          const salesRep = detail.salesRep || "-";
          const email = detail.email || "-";
          const webAddress = detail.webAddress || "-";
          const industry = detail.industry || "-";
          const annualRevenue = detail.annualRevenue || "-";
          items.push({
            internalId,
            kind: detailKind || "CUSTOMER",
            recordType: detailKind ? detailKind.toLowerCase() : "customer",
            type: detailKind || detail.status || "CUSTOMER",
            title: detail.companyName || internalId,
            id: detail.id || "",
            info1: "",
            info2: "",
            url: url.href,
            salesRep,
            email,
            webAddress,
            industry,
            annualRevenue,
            text: [salesRep, industry, annualRevenue].join(" | "),
          });
        } catch {
          items.push({
            internalId,
            kind: "CUSTOMER",
            recordType: "customer",
            type: "CUSTOMER",
            title: internalId,
            id: "",
            info1: "",
            info2: "",
            url: url.href,
            salesRep: "-",
            email: "-",
            webAddress: "-",
            industry: "-",
            annualRevenue: "-",
            text: ["-", "-", "-"].join(" | "),
          });
        }
      }
      return { totalRawResults: results.length, items };
    };
    const searchRows = async (searchText) => {
      const url = new URL("/app/common/search/ubersearchresults.nl", location.origin);
      url.searchParams.set("quicksearch", "T");
      url.searchParams.set("searchtype", "Uber");
      url.searchParams.set("frame", "be");
      url.searchParams.set("Uber_NAMEtype", "KEYWORDSTARTSWITH");
      url.searchParams.set("Uber_NAME", searchText);
      const response = await fetch(url.href, { credentials: "include", redirect: "follow" });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const pageText = compact(doc.body?.innerText || doc.body?.textContent || "");
      const loginForm = Boolean(doc.querySelector("form input[type='password'], form input[name*='password' i], form input[id*='password' i]"));
      const loginLikely = /\\/login|login\\.nl|system\\.netsuite\\.com/i.test(response.url)
        || (loginForm && /email address|password|sign in|forgot your password/i.test((doc.title || "") + " " + pageText.slice(0, 5000)));
      if (loginLikely) return { loginLikely, rows: [], title: doc.title || "", url: response.url };
      const rows = Array.from(doc.querySelectorAll("tr")).map((row) => ({
        cells: Array.from(row.children).map((cell) => compact(cell.innerText || cell.textContent)),
        hrefs: Array.from(row.querySelectorAll("a[href]")).map((anchor) => ({
          text: compact(anchor.innerText || anchor.textContent || anchor.title || ""),
          href: anchor.getAttribute("href") || "",
        })),
      }));
      return { loginLikely: false, rows, title: doc.title || "", url: response.url };
    };
    const makeItemsFromRows = (rows, defaultKind = "") => {
      const seen = new Set();
      const items = [];
      for (const row of rows || []) {
        const viewHref = (row.hrefs || []).find((link) => /custjob\\.nl\\?[^\\s"']*id=/i.test(link.href) && !/[?&]e=T(?:&|$)/i.test(link.href))
          || (row.hrefs || []).find((link) => /custjob\\.nl\\?[^\\s"']*id=/i.test(link.href));
        if (!viewHref) continue;
        const cells = row.cells || [];
        const kindIndex = cells.findIndex((cell) => normalizeKind("", cell));
        const globalIdIndex = kindIndex < 0
          ? cells.findIndex((cell, index) => index > 0 && /^\\d+$/.test(compact(cell)))
          : -1;
        const kind = kindIndex >= 0 ? normalizeKind("", cells[kindIndex]) : (defaultKind || (globalIdIndex >= 0 ? "CUSTOMER" : ""));
        if (!kind) continue;
        const entityHref = (row.hrefs || []).find((link) => (
          /custjob\\.nl\\?[^\\s"']*id=/i.test(link.href)
          && !/^(view|edit|open)$/i.test(compact(link.text || ""))
        ));
        const titleIndex = globalIdIndex >= 0
          ? globalIdIndex + 1
          : kindIndex === 0 ? 2 : kindIndex > 0 ? kindIndex + 1 : 2;
        const fallbackTitle = cells.find((cell, index) => (
          index !== kindIndex
          && !/^(view|edit|open)$/i.test(cell)
          && !/^\\d+$/.test(cell)
          && !normalizeKind("", cell)
        )) || "";
        const nameCell = compact(cells[titleIndex] || entityHref?.text || fallbackTitle || "");
        const idMatch = nameCell.match(/^(\\S+)\\s+(.+)$/);
        const rowId = compact(globalIdIndex >= 0 ? cells[globalIdIndex] : cells[1] || entityHref?.text || "");
        const companyId = globalIdIndex >= 0 ? rowId : (idMatch ? idMatch[1] : /^\\S+$/.test(rowId) ? rowId : "");
        const name = globalIdIndex >= 0
          ? compact(cells[titleIndex] || entityHref?.text || "")
          : (idMatch ? idMatch[2] : nameCell && nameCell !== companyId ? nameCell : "");
        const snippetCells = cells.slice(titleIndex + 1).filter((cell) => !/^(view|edit|open)$/i.test(cell));
        let internalId = "";
        try {
          internalId = new URL(viewHref.href, location.origin).searchParams.get("id") || "";
        } catch {
          internalId = "";
        }
        if (!internalId) continue;
        const key = kind + ":" + internalId;
        if (seen.has(key)) continue;
        seen.add(key);
        const url = new URL("/app/common/entity/custjob.nl", location.origin);
        url.searchParams.set("id", internalId);
        items.push({
          internalId,
          kind,
          recordType: kind.toLowerCase(),
          type: kindIndex >= 0 ? cells[kindIndex] || kind : kind,
          title: name || nameCell || internalId,
          id: companyId,
          info1: snippetCells[0] || "",
          info2: snippetCells[1] || "",
          url: url.href,
          salesRep: "",
          email: snippetCells[0] || "",
          webAddress: "",
          industry: "",
          annualRevenue: "",
          text: ["-", "-", "-"].join(" | "),
        });
        if (items.length >= 50) break;
      }
      return items;
    };
    try {
      if (/^zi\\s*:/i.test(query)) {
        const zoomInfoId = zoomInfoSearchId(query);
        if (!zoomInfoId) {
          return {
            mode: "zoominfo",
            query,
            title: document.title,
            url: location.href,
            totalRawResults: 0,
            items: [],
            error: "Type zi:<ZoomInfo Company ID> using numbers only.",
          };
        }
        const result = await searchZoomInfoCompanyId(zoomInfoId);
        return {
          mode: "zoominfo",
          query,
          zoomInfoCompanyId: zoomInfoId,
          title: document.title,
          url: location.href,
          totalRawResults: result.totalRawResults,
          items: result.items,
        };
      }
      const searchText = /^cu:/i.test(query) ? query : "cu:" + query;
      const directResult = await searchRows(searchText);
      if (directResult.loginLikely) {
        return { mode: "general", query, title: directResult.title, url: directResult.url, totalRawResults: 0, items: [], loginLikely: true };
      }
      const items = makeItemsFromRows(directResult.rows, defaultKindFromSearchPage(directResult));
      if (fast) {
        return {
          mode: "general",
          query,
          title: directResult.title || document.title,
          url: directResult.url || location.href,
          totalRawResults: directResult.rows.length,
          items,
        };
      }
      const enrichedItems = await Promise.all(items.map(async (item) => {
        try {
          const detail = await fetchRecordDetail(item.internalId);
          const detailKind = normalizeKind("", detail.status || "");
          const salesRep = detail.salesRep || "-";
          const email = detail.email || "-";
          const webAddress = detail.webAddress || "-";
          const industry = detail.industry || "-";
          const annualRevenue = detail.annualRevenue || "-";
          return {
            ...item,
            kind: detailKind || item.kind,
            type: detailKind || item.type,
            title: detail.companyName || item.title,
            id: detail.id || item.id,
            salesRep,
            email,
            webAddress,
            industry,
            annualRevenue,
            text: [salesRep, industry, annualRevenue].join(" | "),
          };
        } catch {
          return {
            ...item,
            salesRep: "-",
            email: "-",
            webAddress: "-",
            industry: "-",
            annualRevenue: "-",
            text: ["-", "-", "-"].join(" | "),
          };
        }
      }));
      return {
        mode: "general",
        query,
        title: directResult.title || document.title,
        url: directResult.url || location.href,
        totalRawResults: directResult.rows.length,
        items: enrichedItems,
      };
    } catch (error) {
      return {
        mode: "general",
        query,
        title: document.title,
        url: location.href,
        totalRawResults: 0,
        items: [],
        error: errorText(error),
      };
    }
  })()`;
}

function salesRepSearchExpression(query) {
  const q = String(query || "").trim();
  const safeQuery = jsString(q);

  return `(async () => {
    const query = ${safeQuery};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const errorText = (error) => {
      try {
        if (error && typeof error.message === "string") return error.message;
      } catch {}
      try {
        if (error && typeof error.name === "string") return error.name;
      } catch {}
      return "NetSuite sales rep search failed.";
    };
    const decode = (value) => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = String(value || "");
      return compact(textarea.value);
    };
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const safeObjectValue = (object, key) => {
      try {
        return object ? object[key] : "";
      } catch {
        return "";
      }
    };
    const safeResultMethod = (result, methodName, ...args) => {
      try {
        const method = safeObjectValue(result, methodName);
        if (typeof method !== "function") return "";
        return method.apply(result, args);
      } catch {
        return "";
      }
    };
    const resultList = (results) => {
      if (!results) return [];
      try {
        if (Array.isArray(results)) return results.filter(Boolean);
      } catch {}
      const length = Number(safeObjectValue(results, "length") || 0);
      const items = [];
      for (let index = 0; index < length && index < 200; index += 1) {
        const item = safeObjectValue(results, index);
        if (item) items.push(item);
      }
      return items;
    };
    const valueOf = (result, name) => {
      const valuesByKey = safeObjectValue(result, "valuesByKey");
      const keyedValue = safeObjectValue(safeObjectValue(valuesByKey, name), "value");
      return decode(firstValue(safeResultMethod(result, "getValue", name), keyedValue));
    };
    const lookupField = (recordType, internalId, fieldId, asText = false) => {
      if (typeof nlapiLookupField !== "function") return "";
      try {
        const raw = nlapiLookupField(recordType, internalId, fieldId, asText);
        if (Array.isArray(raw)) {
          return raw.map((item) => decode(item?.text || item?.name || item?.value || item)).filter(Boolean).join(", ");
        }
        if (raw && typeof raw === "object") {
          return decode(raw.text || raw.name || raw.value || "");
        }
        return decode(raw || "");
      } catch {
        return "";
      }
    };
    const industryFromRules = (doc) => {
      const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
      const rows = Array.from(doc.querySelectorAll("#rules_splits tr.uir-machine-row, tr.uir-machine-row"));
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td")).map((cell) => compact(cell.innerText || cell.textContent || ""));
        if (cleanLabel(cells[1]) === "industry" && cells[3]) return cells[3];
      }
      return "";
    };
    const territoryIdFromHref = (href) => {
      try {
        return new URL(href, location.origin).searchParams.get("id") || "";
      } catch {
        return "";
      }
    };
    const territoryRevenueRange = (name) => {
      const tokens = String(name || "").toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
      if (tokens.includes("LMM")) return "$0 to $10M";
      if (tokens.includes("UMM")) return "$10M to $20M";
      if (tokens.includes("MM")) return "$0 to $20M";
      if (tokens.includes("CORP")) return "$20M to $100M";
      if (tokens.includes("ENT")) return "$100M+";
      return "";
    };
    const territoryCoverageSummary = async (employeeInternalId, salesRepName) => {
      if (!employeeInternalId) return { industry: "", annualRevenue: "" };
      try {
        const listUrl = new URL("/app/crm/sales/salesterritorylist.nl", location.origin);
        listUrl.searchParams.set("searchtype", "SalesTerritory");
        listUrl.searchParams.set("SalesTerritory_EMPLOYEE", employeeInternalId);
        if (salesRepName) listUrl.searchParams.set("inpt_SalesTerritory_EMPLOYEE", salesRepName);
        const listResponse = await fetch(listUrl.href, { credentials: "include", redirect: "follow" });
        const listHtml = await listResponse.text();
        const listDoc = new DOMParser().parseFromString(listHtml, "text/html");
        const territoryRows = Array.from(listDoc.querySelectorAll("tr.uir-list-row-tr, tr[id^='row']"));
        const revenueOrder = ["$0 to $10M", "$10M to $20M", "$0 to $20M", "$20M to $100M", "$100M+"];
        const revenueSet = new Set();
        let firstLink = null;
        for (const row of territoryRows) {
          const rowLink = Array.from(row.querySelectorAll("a[href*='salesterritory.nl?id=']"))
            .find((anchor) => /view/i.test(compact(anchor.innerText || anchor.textContent || "")))
            || row.querySelector("a[href*='salesterritory.nl?id=']");
          if (!firstLink && rowLink) firstLink = rowLink;
          const cells = Array.from(row.querySelectorAll("td")).map((cell) => compact(cell.innerText || cell.textContent || ""));
          const territoryName = cells[2] || compact(rowLink?.innerText || rowLink?.textContent || "");
          const revenue = territoryRevenueRange(territoryName);
          if (revenue) revenueSet.add(revenue);
        }
        if (!firstLink) {
          firstLink = Array.from(listDoc.querySelectorAll("a[href*='salesterritory.nl?id=']"))
            .find((anchor) => /view/i.test(compact(anchor.innerText || anchor.textContent || "")))
            || listDoc.querySelector("a[href*='salesterritory.nl?id=']");
        }
        const annualRevenue = revenueOrder.filter((label) => revenueSet.has(label)).join(", ");
        const territoryId = territoryIdFromHref(firstLink?.getAttribute("href") || firstLink?.href || "");
        if (!territoryId) return { industry: "", annualRevenue };
        const detailUrl = new URL("/app/crm/sales/salesterritory.nl", location.origin);
        detailUrl.searchParams.set("id", territoryId);
        const detailResponse = await fetch(detailUrl.href, { credentials: "include", redirect: "follow" });
        const detailHtml = await detailResponse.text();
        const detailDoc = new DOMParser().parseFromString(detailHtml, "text/html");
        return { industry: industryFromRules(detailDoc), annualRevenue };
      } catch {
        return { industry: "", annualRevenue: "" };
      }
    };
    const isSalesRepRecord = (result) => {
      const recordType = String(safeResultMethod(result, "getRecordType") || safeObjectValue(result, "recordType") || "").toLowerCase();
      const type = valueOf(result, "type").toLowerCase();
      return recordType === "customrecord_emproster" || type === "employee roster";
    };
    const addItems = (results, items, seen) => {
      for (const result of resultList(results)) {
        try {
        if (!isSalesRepRecord(result)) continue;
        const internalId = String(safeResultMethod(result, "getId") || safeObjectValue(result, "id") || "").trim();
        if (!internalId || seen.has(internalId)) continue;
        seen.add(internalId);
        const rawName = valueOf(result, "name");
        const name = rawName.replace(new RegExp("^" + internalId + "\\\\s+"), "").trim() || rawName || internalId;
        const salesRole = firstValue(
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_salesrole", true),
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_salesrole"),
          valueOf(result, "custrecord_emproster_salesrole")
        );
        const rosterStatus = firstValue(
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_rosterstatus", true),
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_rosterstatus"),
          valueOf(result, "custrecord_emproster_rosterstatus")
        );
        const url = new URL("/app/common/custom/custrecordentry.nl", location.origin);
        url.searchParams.set("rectype", "1572");
        url.searchParams.set("id", internalId);
        items.push({
          internalId,
          kind: "Sales Rep",
          recordType: "customrecord_emproster",
          type: valueOf(result, "type") || "Employee Roster",
          title: name,
          name,
          salesRole,
          rosterStatus,
          info1: valueOf(result, "info1"),
          info2: valueOf(result, "info2"),
          url: url.href,
          text: salesRole,
        });
        if (items.length >= 50) break;
        } catch {
          continue;
        }
      }
    };
    const searchRows = async (searchText) => {
      const url = new URL("/app/common/search/ubersearchresults.nl", location.origin);
      url.searchParams.set("quicksearch", "T");
      url.searchParams.set("searchtype", "Uber");
      url.searchParams.set("frame", "be");
      url.searchParams.set("Uber_NAMEtype", "KEYWORDSTARTSWITH");
      url.searchParams.set("Uber_NAME", searchText);
      const response = await fetch(url.href, { credentials: "include", redirect: "follow" });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const pageText = compact(doc.body?.innerText || doc.body?.textContent || "");
      const loginForm = Boolean(doc.querySelector("form input[type='password'], form input[name*='password' i], form input[id*='password' i]"));
      const loginLikely = /\\/login|login\\.nl|system\\.netsuite\\.com/i.test(response.url)
        || (loginForm && /email address|password|sign in|forgot your password/i.test((doc.title || "") + " " + pageText.slice(0, 5000)));
      if (loginLikely) return { loginLikely, rows: [], title: doc.title || "", url: response.url };
      const rows = Array.from(doc.querySelectorAll("tr")).map((row) => ({
        cells: Array.from(row.children).map((cell) => compact(cell.innerText || cell.textContent)),
        hrefs: Array.from(row.querySelectorAll("a[href]")).map((anchor) => ({
          text: compact(anchor.innerText || anchor.textContent || anchor.title || ""),
          href: anchor.getAttribute("href") || "",
        })),
      }));
      return { loginLikely: false, rows, title: doc.title || "", url: response.url };
    };
    const addItemsFromRows = async (rows, items, seen) => {
      for (const row of rows || []) {
        const viewHref = (row.hrefs || []).find((link) => /\\/app\\/common\\/custom\\/custrecordentry\\.nl\\?[^\\s"']*rectype=1572[^\\s"']*id=/i.test(link.href) && !/[?&]e=T(?:&|$)/i.test(link.href))
          || (row.hrefs || []).find((link) => /\\/app\\/common\\/custom\\/custrecordentry\\.nl\\?[^\\s"']*rectype=1572[^\\s"']*id=/i.test(link.href));
        if (!viewHref) continue;
        let internalId = "";
        try {
          internalId = new URL(viewHref.href, location.origin).searchParams.get("id") || "";
        } catch {
          internalId = "";
        }
        if (!internalId || seen.has(internalId)) continue;
        seen.add(internalId);
        const cells = row.cells || [];
        const name = compact(cells[3] || "") || internalId;
        const employeeInternalId = firstValue(
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_emp"),
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_emp", true)
        );
        const salesRole = firstValue(
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_salesrole", true),
          lookupField("customrecord_emproster", internalId, "custrecord_emproster_salesrole"),
          compact(cells[7] || "")
        );
        const territoryCoverage = await territoryCoverageSummary(employeeInternalId, name);
        const rosterStatus = compact(cells[11] || "");
        const url = new URL("/app/common/custom/custrecordentry.nl", location.origin);
        url.searchParams.set("rectype", "1572");
        url.searchParams.set("id", internalId);
        items.push({
          internalId,
          employeeInternalId,
          kind: "Sales Rep",
          recordType: "customrecord_emproster",
          type: cells[2] || "Employee Roster",
          title: name,
          name,
          salesRole,
          territoryIndustry: territoryCoverage.industry,
          territoryAnnualRevenue: territoryCoverage.annualRevenue,
          rosterStatus,
          info1: cells[4] || "",
          info2: cells[5] || "",
          url: url.href,
          text: [salesRole, territoryCoverage.industry, territoryCoverage.annualRevenue].filter(Boolean).join(" | "),
        });
        if (items.length >= 50) break;
      }
    };
    try {
      const queries = /^emp:/i.test(query) ? [query] : ["emp:" + query];
      const items = [];
      const seen = new Set();
      let totalRawResults = 0;
      let title = document.title;
      let url = location.href;
      for (const searchText of queries) {
        const result = await searchRows(searchText);
        if (result.loginLikely) {
          return { mode: "salesReps", query, title: result.title, url: result.url, totalRawResults: 0, items: [], loginLikely: true };
        }
        title = result.title || title;
        url = result.url || url;
        totalRawResults += result.rows.length;
        await addItemsFromRows(result.rows, items, seen);
        if (items.length >= 50) break;
      }
      return {
        mode: "salesReps",
        query,
        title,
        url,
        totalRawResults,
        items,
      };
    } catch (error) {
      return {
        mode: "salesReps",
        query,
        title: document.title,
        url: location.href,
        totalRawResults: 0,
        items: [],
        error: errorText(error),
      };
    }
  })()`;
}

function territoryCatalogExpression() {
  const managerUrl = `${NETSUITE_ORIGIN}/app/crm/common/automation/territorymanager.nl`;
  const listUrl = `${NETSUITE_ORIGIN}/app/crm/sales/salesterritorylist.nl?searchtype=SalesTerritory&whence=`;
  return `(async () => {
    const sourceUrls = [${jsString(managerUrl)}, ${jsString(listUrl)}];
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const isLoginDocument = (doc, text) => {
      const title = String(doc.title || "");
      if (doc.querySelector("input[type='password'], input[name*='password' i], input[id*='password' i], form[action*='login' i]")) return true;
      return /login|sign in/i.test(title) && /password|email address|user name|username/i.test(String(text || "").slice(0, 5000));
    };
    const territoryIdFromHref = (href) => {
      try {
        return new URL(href, location.origin).searchParams.get("id") || "";
      } catch {
        return "";
      }
    };
    const cleanName = (value) => compact(value)
      .replace(/^(view|edit|open)\\s+/i, "")
      .replace(/\\s+(view|edit|open)$/i, "")
      .trim();
    const isActionText = (value) => /^(view|edit|open|delete|inactive)$/i.test(compact(value));
    const looksLikeDescription = (value) => {
      const text = compact(value);
      if (!text) return false;
      if (/^(affiliate list|lead source|lead sources|south america partners|status:|countries?:|country:|region:|emea countries|last campaign response|subsidiary\\b|annual campaign)/i.test(text)) return true;
      return /(annual revenue|product interest|lead source)/i.test(text)
        && !/^(20\\d{2}|partner generated|channel|mktg|bpo|lightcms|venda|restricted list|junk_email|nosalesrep_email|bus dev|webinar|prospecting|alliancepartner|oracle|apj|anz|emea|latam|redwood)\\b/i.test(text);
    };
    const looksLikeTerritoryName = (value) => {
      const text = compact(value);
      if (!text || isActionText(text) || /^\\d+$/.test(text) || looksLikeDescription(text)) return false;
      if (/^20\\d{2}(?:[-\\s]|$)/.test(text)) return true;
      if (/^(partner generated|channel|mktg|bpo|lightcms|venda|restricted list|junk_email|nosalesrep_email|bus dev|webinar|prospecting|sdr|alliancepartner|oracle|apj|anz|emea|latam|redwood|outbound)\\b/i.test(text)) return true;
      if (/(?:^|[-_\\s>])(bizsvcs|c&e|conssvcs|h&h|prod|sft|sdr|lmm|umm|mm|corp|ent|noam|apj|anz|emea|latam)(?:$|[-_\\s>])/i.test(text)) return true;
      return /(?:^|[-_\\s])(east|west|south|central|central_qc)(?:$|[-_\\s])/i.test(text) && /[-_]/.test(text);
    };
    const normalizeTerritoryPair = (name, description) => {
      const cleanTerritoryName = cleanName(name);
      const cleanDescription = cleanName(description);
      if (cleanTerritoryName && cleanDescription && looksLikeDescription(cleanTerritoryName) && looksLikeTerritoryName(cleanDescription)) {
        return { name: cleanDescription, description: cleanTerritoryName };
      }
      if (cleanTerritoryName && cleanDescription && !looksLikeTerritoryName(cleanTerritoryName) && looksLikeTerritoryName(cleanDescription)) {
        return { name: cleanDescription, description: cleanTerritoryName };
      }
      return { name: cleanTerritoryName, description: cleanDescription };
    };
    const nameFromRow = (row, anchor, internalId) => {
      const anchorText = cleanName(anchor.innerText || anchor.textContent || anchor.getAttribute("title") || "");
      if (anchorText && !isActionText(anchorText) && anchorText !== internalId && !looksLikeDescription(anchorText)) return anchorText;
      const cells = Array.from(row?.querySelectorAll?.("td, th, span, a") || [])
        .map((cell) => cleanName(cell.innerText || cell.textContent || cell.getAttribute?.("title") || ""))
        .filter(Boolean);
      return cells.find((cell) => looksLikeTerritoryName(cell))
        || cells.find((cell) => !isActionText(cell) && cell !== internalId && !looksLikeDescription(cell))
        || anchorText
        || internalId;
    };
    const descriptionFromRow = (row, name, internalId) => {
      const cells = Array.from(row?.querySelectorAll?.("td, th") || [])
        .map((cell) => cleanName(cell.innerText || cell.textContent || cell.getAttribute?.("title") || ""))
        .filter(Boolean);
      const isNonDescription = (cell) => (
        !cell
        || cell === name
        || cell === internalId
        || isActionText(cell)
        || /^\\d+$/.test(cell)
      );
      const nameIndex = cells.findIndex((cell) => cell === name);
      if (nameIndex >= 0) {
        const afterName = cells.slice(nameIndex + 1).find((cell) => !isNonDescription(cell));
        if (afterName) return afterName;
      }
      return cells.find((cell) => !isNonDescription(cell)) || "";
    };
    const parseDocument = (doc, sourceUrl) => {
      const rows = [];
      const anchors = Array.from(doc.querySelectorAll("a[href*='salesterritory.nl'][href*='id=']"));
      for (const anchor of anchors) {
        const href = anchor.getAttribute("href") || "";
        const internalId = territoryIdFromHref(href);
        if (!internalId) continue;
        const row = anchor.closest("tr") || anchor.closest("li") || anchor.closest("div") || anchor.parentElement;
        const url = new URL(href, location.origin).href;
        const rawName = nameFromRow(row, anchor, internalId);
        const rawDescription = descriptionFromRow(row, rawName, internalId);
        const normalized = normalizeTerritoryPair(rawName, rawDescription);
        rows.push({
          internalId,
          name: normalized.name || internalId,
          description: normalized.description,
          url,
          sourceUrl,
        });
      }
      return rows;
    };
    const byId = new Map();
    const titles = [];
    const errors = [];
    let loginLikely = false;
    for (const sourceUrl of sourceUrls) {
      try {
        const response = await fetch(sourceUrl, { credentials: "include", redirect: "follow" });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        titles.push(doc.title || "");
        const text = compact(doc.body?.innerText || doc.body?.textContent || "");
        const parsedItems = parseDocument(doc, sourceUrl);
        if (!parsedItems.length && isLoginDocument(doc, text)) {
          loginLikely = true;
          continue;
        }
        for (const item of parsedItems) {
          const existing = byId.get(item.internalId);
          if (!existing || (item.name && item.name.length > existing.name.length)) byId.set(item.internalId, item);
        }
      } catch (error) {
        errors.push(compact(error?.message || String(error)));
      }
    }
    const items = Array.from(byId.values())
      .sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), undefined, { numeric: true, sensitivity: "base" }));
    const needsLogin = !items.length && loginLikely;
    return {
      ok: !needsLogin,
      loginLikely: needsLogin,
      title: titles.find(Boolean) || "",
      sourceUrls,
      count: items.length,
      items,
      error: needsLogin ? "NetSuite login is required to load territories." : errors.join("; "),
    };
  })()`;
}

function normalizeTerritoryUpdateRequest(request = {}) {
  const salesRep = request.salesRep || {};
  const repInternalId = String(salesRep.internalId || "").trim();
  const employeeInternalId = String(salesRep.employeeInternalId || "").trim();
  if (!/^\d+$/.test(repInternalId)) throw new Error("Sales Rep internal ID is required.");
  if (!/^\d+$/.test(employeeInternalId)) throw new Error("Sales Rep Employee internal ID is required.");

  const seen = new Set();
  const changes = (Array.isArray(request.changes) ? request.changes : [])
    .map((change) => {
      const action = change?.action === "remove" ? "remove" : "add";
      const territory = change?.territory || {};
      const internalId = String(territory.internalId || "").trim();
      return {
        action,
        territory: {
          internalId,
          name: String(territory.name || internalId || "Territory").replace(/\s+/g, " ").trim(),
          description: String(territory.description || "").replace(/\s+/g, " ").trim(),
          industry: String(territory.industry || "").replace(/\s+/g, " ").trim(),
          url: String(territory.url || "").trim(),
        },
      };
    })
    .filter((change) => /^\d+$/.test(change.territory.internalId))
    .filter((change) => {
      const key = `${change.action}:${change.territory.internalId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  if (!changes.length) throw new Error("At least one territory change is required.");

  return {
    salesRep: {
      internalId: repInternalId,
      employeeInternalId,
      name: String(salesRep.name || "Sales Rep").replace(/\s+/g, " ").trim(),
    },
    changes,
  };
}

function territoryAssignmentOnPageExpression(request) {
  return `(async () => {
    const request = ${jsString(JSON.stringify(request))};
    const parsed = JSON.parse(request);
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const sublist = "entityterritorymap";
    const field = "entity";
    const action = parsed.action === "remove" ? "remove" : "add";
    const employeeInternalId = compact(parsed.salesRep?.employeeInternalId);
    const employeeName = compact(parsed.salesRep?.name);
    const pageText = compact(document.body?.innerText || document.body?.textContent || "");
    const title = document.title || "";
    if (/login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(pageText)) {
      return { ok: false, loginLikely: true, error: "NetSuite login is required." };
    }
    if (!employeeInternalId) return { ok: false, error: "Sales Rep Employee internal ID is required." };
    if (typeof nlapiGetLineItemCount !== "function" || typeof nlapiSetCurrentLineItemValue !== "function") {
      return { ok: false, error: "NetSuite territory assignment controls were not ready." };
    }
    const requestedTerritoryId = compact(parsed.territory?.internalId);
    const currentTerritoryId = compact((typeof nlapiGetRecordId === "function" && nlapiGetRecordId()) || new URL(location.href).searchParams.get("id") || "");
    if (requestedTerritoryId && currentTerritoryId && requestedTerritoryId !== currentTerritoryId) {
      return { ok: false, error: "NetSuite opened a different territory than requested." };
    }
    const countLines = () => Number(nlapiGetLineItemCount(sublist) || 0);
    const lineForEmployee = () => {
      if (typeof nlapiFindLineItemValue === "function") {
        const found = Number(nlapiFindLineItemValue(sublist, field, employeeInternalId) || 0);
        if (found > 0) return found;
      }
      const count = countLines();
      for (let line = 1; line <= count; line += 1) {
        if (compact(nlapiGetLineItemValue(sublist, field, line)) === employeeInternalId) return line;
      }
      return 0;
    };
    const markChanged = () => {
      if (typeof setWindowChanged === "function") {
        try { setWindowChanged(window, true); } catch {}
      }
    };
    const result = {
      ok: true,
      changed: false,
      action,
      beforeCount: countLines(),
      afterCount: countLines(),
      status: "",
      reason: "",
    };
    const existingLine = lineForEmployee();
    if (action === "add") {
      if (existingLine > 0) {
        return { ...result, status: "Already assigned", reason: "Sales Rep is already assigned to this territory." };
      }
      try {
        nlapiSelectNewLineItem(sublist);
        nlapiSetCurrentLineItemValue(sublist, field, employeeInternalId, true, true);
        nlapiCommitLineItem(sublist);
        markChanged();
        await wait(700);
      } catch (error) {
        try { nlapiCancelLineItem(sublist); } catch {}
        return { ...result, ok: false, error: "Could not add Sales Rep: " + compact(error?.message || error) };
      }
      if (!lineForEmployee()) {
        return { ...result, ok: false, error: "NetSuite did not confirm the Sales Rep was added." };
      }
      return { ...result, changed: true, afterCount: countLines(), status: "Added", reason: "Sales Rep added to Lead Assignment." };
    }
    if (!existingLine) {
      return { ...result, status: "Already removed", reason: "Sales Rep is not assigned to this territory." };
    }
    try {
      nlapiRemoveLineItem(sublist, existingLine);
      markChanged();
      await wait(700);
    } catch (error) {
      return { ...result, ok: false, error: "Could not remove Sales Rep: " + compact(error?.message || error) };
    }
    if (lineForEmployee()) {
      return { ...result, ok: false, error: "NetSuite did not confirm the Sales Rep was removed." };
    }
    return { ...result, changed: true, afterCount: countLines(), status: "Removed", reason: "Sales Rep removed from Lead Assignment." };
  })()`;
}

async function saveTerritoryPage(client, territoryId, timeout = 70000) {
  const startResult = await client.send("Runtime.evaluate", {
    awaitPromise: false,
    returnByValue: true,
    expression: `(() => {
      const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
      const submitter = document.getElementById("submitter") || document.querySelector("input[type='submit'][value='Save']");
      if (!submitter) return { ok: false, error: "Territory Save button was not found." };
      try {
        if (typeof NLInvokeButton === "function") NLInvokeButton(submitter);
        else submitter.click();
      } catch (error) {
        return { ok: false, error: "Could not click Save: " + compact(error?.message || error) };
      }
      return { ok: true, href: location.href };
    })()`,
  });
  const startValue = startResult?.result?.value || {};
  if (!startValue.ok) throw new Error(startValue.error || "Territory Save could not be started.");

  const deadline = Date.now() + timeout;
  let lastState = startValue;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    try {
      const stateResult = await client.send("Runtime.evaluate", {
        returnByValue: true,
        expression: `(() => {
          const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
          const href = location.href;
          const params = new URL(href).searchParams;
          const title = document.title || "";
          const text = compact(document.body?.innerText || document.body?.textContent || "");
          const loginLikely = /login|sign in/i.test(title) || /email address.*password|forgot your password/i.test(text);
          const errorText = compact(Array.from(document.querySelectorAll(".uir-message-error, .error, .uir-alert-box.error, [class*='error']")).map((node) => node.innerText || node.textContent || "").join(" "));
          const isEdit = params.get("e") === "T" || /[?&]e=T(?:&|$)/i.test(href);
          return {
            href,
            id: params.get("id") || "",
            title,
            readyState: document.readyState,
            loginLikely,
            errorText,
            isEdit,
            text: text.slice(0, 1200),
          };
        })()`,
      });
      lastState = stateResult?.result?.value || {};
      if (lastState.loginLikely) throw sessionInvalidError(`${TERRITORY_WORKER_TAB_TITLE} lost its NSCORP login. ${reconnectBrowserMessage()}`);
      if (lastState.errorText && /error|invalid|required|permission|unexpected/i.test(lastState.errorText)) {
        throw new Error(lastState.errorText);
      }
      if (
        lastState.readyState === "complete"
        && /\/app\/crm\/sales\/salesterritory\.nl/i.test(String(lastState.href || ""))
        && String(lastState.id || territoryId || "").trim()
        && !lastState.isEdit
      ) {
        return lastState;
      }
    } catch (error) {
      if (error.code === SESSION_INVALID_ERROR_CODE) throw error;
      if (!isRecoverableChromeProtocolError(error)) throw error;
      lastState = { ...lastState, transientError: error?.message || String(error || "") };
    }
  }
  throw new Error(lastState.errorText || "NetSuite did not finish saving the territory.");
}

async function updateTerritoryAssignments(request) {
  const normalized = normalizeTerritoryUpdateRequest(request);
  const state = workerLane("territory");
  const generation = state.generation;
  return queueWorkerTask(async () => {
    if (state.generation !== generation) throw workerStoppedError();
    const tab = await ensureWorkerTab("territory");
    const client = await connect(tab.webSocketDebuggerUrl);
    const results = [];
    try {
      await client.send("Page.enable").catch(() => {});
      await client.send("Runtime.enable").catch(() => {});
      for (const change of normalized.changes) {
        if (state.generation !== generation) throw workerStoppedError();
        const territory = change.territory;
        const url = `${NETSUITE_ORIGIN}/app/crm/sales/salesterritory.nl?id=${encodeURIComponent(territory.internalId)}&e=T`;
        const row = {
          action: change.action,
          territory,
          status: "Failed",
          reason: "",
        };
        try {
          await client.send("Page.navigate", { url });
          await waitForPageReady(client, 45000);
          await labelWorkerTab(client, TERRITORY_WORKER_TAB_TITLE);
          const editResult = await client.send("Runtime.evaluate", {
            expression: territoryAssignmentOnPageExpression({ ...change, salesRep: normalized.salesRep }),
            awaitPromise: true,
            returnByValue: true,
            timeout: 45000,
          });
          const value = editResult?.result?.value || {};
          throwIfWorkerSessionInvalidResult(value, TERRITORY_WORKER_TAB_TITLE);
          if (!value.ok) {
            row.reason = value.error || "Territory change could not be applied.";
            results.push(row);
            continue;
          }
          row.status = value.status || (value.changed ? (change.action === "add" ? "Added" : "Removed") : "No change");
          row.reason = value.reason || "";
          if (value.changed) {
            await saveTerritoryPage(client, territory.internalId, 70000);
            await labelWorkerTab(client, TERRITORY_WORKER_TAB_TITLE);
          }
          results.push(row);
        } catch (error) {
          if (error.code === SESSION_INVALID_ERROR_CODE) throw error;
          row.status = "Failed";
          row.reason = error.message || String(error);
          results.push(row);
        }
      }
      await labelWorkerTab(client, TERRITORY_WORKER_TAB_TITLE);
      return {
        ok: true,
        salesRep: normalized.salesRep,
        results,
        changed: results.filter((row) => /added|removed/i.test(row.status || "")).length,
        failed: results.filter((row) => /failed/i.test(row.status || "")).length,
      };
    } finally {
      client.close();
    }
  }, "territory");
}

function recentRecordsExpression() {
  const homeUrl = `${NETSUITE_ORIGIN}/app/center/card.nl?sc=-29&whence=`;
  return `(async () => {
    const homeUrl = ${jsString(homeUrl)};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const isLoginDocument = (doc, text) => {
      const title = String(doc.title || "");
      if (doc.querySelector("input[type='password'], input[name*='password' i], input[id*='password' i], form[action*='login' i]")) return true;
      return /login|sign in/i.test(title) && /password|email address|user name|username/i.test(String(text || "").slice(0, 5000));
    };
    const extractObjectAt = (text, start) => {
      if (start < 0 || text[start] !== "{") return "";
      let depth = 0;
      let inString = false;
      let escaped = false;
      for (let index = start; index < text.length; index += 1) {
        const char = text[index];
        if (inString) {
          if (escaped) {
            escaped = false;
          } else if (char === "\\\\") {
            escaped = true;
          } else if (char === "\\"") {
            inString = false;
          }
          continue;
        }
        if (char === "\\"") {
          inString = true;
        } else if (char === "{") {
          depth += 1;
        } else if (char === "}") {
          depth -= 1;
          if (depth === 0) return text.slice(start, index + 1);
        }
      }
      return "";
    };
    const recentObjectText = (html) => {
      const marker = html.indexOf('"id":"recentRecords"');
      const fallback = marker >= 0 ? marker : html.indexOf("icon-history.svg");
      if (fallback < 0) return "";
      const start = html.lastIndexOf('{"type":"TAB"', fallback);
      return extractObjectAt(html, start >= 0 ? start : html.lastIndexOf("{", fallback));
    };
    const response = await fetch(homeUrl, { credentials: "include", redirect: "follow" });
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const bodyText = compact(doc.body?.innerText || doc.body?.textContent || "");
    if (isLoginDocument(doc, bodyText)) {
      return { ok: false, loginLikely: true, items: [], title: doc.title, url: response.url };
    }
    const objectText = recentObjectText(html);
    if (!objectText) {
      return { ok: true, items: [], count: 0, title: doc.title, url: response.url, warning: "Recent Records menu was not found." };
    }
    const menu = JSON.parse(objectText);
    const items = (Array.isArray(menu.submenu) ? menu.submenu : [])
      .filter((item) => item && item.type !== "OVERVIEW" && item.label && item.url)
      .slice(0, 20)
      .map((item) => {
        const editItem = Array.isArray(item.submenu)
          ? item.submenu.find((entry) => /edit/i.test(String(entry?.label || "")))
          : null;
        return {
          label: compact(item.label),
          url: new URL(item.url, location.origin).href,
          editUrl: editItem?.url ? new URL(editItem.url, location.origin).href : "",
          recordId: item.recordId || "",
          recordType: item.recordType || "",
          detail: item.detail || "",
          lastAccess: item.lastAccess || "",
        };
      });
    return { ok: true, items, count: items.length, title: doc.title, url: response.url };
  })()`;
}

function salesRepParseExpression(internalId) {
  const url = `${NETSUITE_ORIGIN}/app/common/custom/custrecordentry.nl?rectype=1572&id=${encodeURIComponent(String(internalId))}`;
  return `(async () => {
    const targetUrl = ${jsString(url)};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const hiddenValue = (doc, fieldId) => compact(
      doc.getElementById(fieldId)?.value
      || doc.querySelector("[name='" + fieldId + "']")?.value
      || ""
    );
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const visibleInput = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (visibleInput) return compact(visibleInput.value || visibleInput.innerText || visibleInput.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) return compact(byValue.innerText || byValue.textContent || byValue.value || "");
      const byFieldSpan = doc.getElementById(fieldId + "_fs");
      if (byFieldSpan && !/nldropdown/i.test(String(byFieldSpan.className || ""))) {
        const text = compact(byFieldSpan.innerText || byFieldSpan.textContent || byFieldSpan.value || "");
        if (text && !/function\\s*\\(/i.test(text)) return text;
      }
      if (labels.length) {
        const byLabelText = fieldByLabels(doc, labels);
        if (byLabelText) return byLabelText;
      }
      const byLabel = doc.querySelector("[aria-labelledby='" + fieldId + "_fs_lbl']");
      if (byLabel) return compact(byLabel.innerText || byLabel.textContent || byLabel.value || "");
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) return compact(input.value || input.innerText || input.textContent || "");
      const wrapper = doc.querySelector("[data-field-name='" + fieldId + "']");
      if (wrapper) {
        const label = wrapper.querySelector(".uir-label, .smallgraytextnolink");
        let text = compact(wrapper.innerText || wrapper.textContent || "");
        if (label) text = text.replace(compact(label.innerText || label.textContent || ""), "").trim();
        return text;
      }
      return "";
    };
    const industryFromRules = (doc) => {
      const rows = Array.from(doc.querySelectorAll("#rules_splits tr.uir-machine-row, tr.uir-machine-row"));
      for (const row of rows) {
        const cells = Array.from(row.querySelectorAll("td")).map((cell) => compact(cell.innerText || cell.textContent || ""));
        if (cleanLabel(cells[1]) === "industry" && cells[3]) return cells[3];
      }
      return "";
    };
    const territoryIdFromHref = (href) => {
      try {
        return new URL(href, location.origin).searchParams.get("id") || "";
      } catch {
        return "";
      }
    };
    const fetchTerritoryDetail = async (territory) => {
      if (!territory?.internalId) return territory;
      const detailUrl = new URL("/app/crm/sales/salesterritory.nl", location.origin);
      detailUrl.searchParams.set("id", territory.internalId);
      const detailResponse = await fetch(detailUrl.href, { credentials: "include", redirect: "follow" });
      const detailHtml = await detailResponse.text();
      const detailDoc = new DOMParser().parseFromString(detailHtml, "text/html");
      const description = firstValue(
        fieldValue(detailDoc, "descr", ["Description"]),
        territory.description
      );
      const industry = industryFromRules(detailDoc);
      return {
        ...territory,
        url: detailUrl.href,
        description,
        industry,
      };
    };
    const fetchTerritories = async (employeeInternalId, salesRepName) => {
      if (!employeeInternalId) return [];
      const listUrl = new URL("/app/crm/sales/salesterritorylist.nl", location.origin);
      listUrl.searchParams.set("searchtype", "SalesTerritory");
      listUrl.searchParams.set("SalesTerritory_EMPLOYEE", employeeInternalId);
      if (salesRepName) listUrl.searchParams.set("inpt_SalesTerritory_EMPLOYEE", salesRepName);

      const listResponse = await fetch(listUrl.href, { credentials: "include", redirect: "follow" });
      const listHtml = await listResponse.text();
      const listDoc = new DOMParser().parseFromString(listHtml, "text/html");
      const territories = [];
      const seen = new Set();
      const rows = Array.from(listDoc.querySelectorAll("tr.uir-list-row-tr, tr[id^='row']"));
      for (const row of rows) {
        const viewLink = Array.from(row.querySelectorAll("a[href*='salesterritory.nl?id=']"))
          .find((anchor) => /view/i.test(compact(anchor.innerText || anchor.textContent || "")))
          || row.querySelector("a[href*='salesterritory.nl?id=']");
        if (!viewLink) continue;
        const internalId = territoryIdFromHref(viewLink.href);
        if (!internalId || seen.has(internalId)) continue;
        seen.add(internalId);
        const cells = Array.from(row.querySelectorAll("td")).map((cell) => compact(cell.innerText || cell.textContent || ""));
        const description = cells[3] || "";
        territories.push({
          internalId,
          priority: cells[1] || "",
          name: cells[2] || internalId,
          description,
          industry: "",
          lastAssignmentDate: cells[4] || "",
          url: new URL(viewLink.getAttribute("href"), location.origin).href,
        });
      }
      if (!territories.length) return [];
      try {
        const detailed = await fetchTerritoryDetail(territories[0]);
        territories[0] = detailed;
        const fallbackIndustry = detailed.industry;
        return territories.map((territory) => ({
          ...territory,
          industry: territory.industry || fallbackIndustry || "",
        }));
      } catch {
        return territories;
      }
    };
    const countCustomerRecords = (employeeInternalId, extraFilters = []) => {
      if (!employeeInternalId) return "";
      if (typeof nlapiCreateSearch !== "function") return "";
      const filters = [
        new nlobjSearchFilter("salesrep", null, "anyof", [employeeInternalId]),
        new nlobjSearchFilter("stage", null, "anyof", ["LEAD", "PROSPECT", "CUSTOMER"]),
        ...extraFilters,
      ];
      const columns = [new nlobjSearchColumn("internalid")];
      const resultSet = nlapiCreateSearch("customer", filters, columns).runSearch();
      let total = 0;
      let start = 0;
      const pageSize = 1000;
      while (start < 50000) {
        const results = resultSet.getResults(start, start + pageSize) || [];
        total += results.length;
        if (results.length < pageSize) return String(total);
        start += pageSize;
      }
      return String(total) + "+";
    };
    const countHeldRecords = (employeeInternalId) => countCustomerRecords(employeeInternalId);
    const countHoldoverRecords = (employeeInternalId) => countCustomerRecords(employeeInternalId, [
      new nlobjSearchFilter("custentity172", null, "is", "T"),
    ]);
    const response = await fetch(targetUrl, { credentials: "include", redirect: "follow" });
    const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const text = compact(doc.body?.innerText || doc.body?.textContent || "");
        const title = doc.title || "";
        const employeeInternalId = firstValue(
          hiddenValue(doc, "custrecord_emproster_emp_hddn"),
          hiddenValue(doc, "custrecord_emproster_emp")
        );
        const name = firstValue(
          fieldValue(doc, "custrecord_emproster_bigname"),
          fieldValue(doc, "name", ["Name"])
        );
        let territories = [];
        try {
          territories = await fetchTerritories(employeeInternalId, name);
        } catch {
          territories = [];
        }
        const salesRep = {
          internalId: ${jsString(internalId)},
          employeeInternalId,
          name,
          rosterStatus: fieldValue(doc, "custrecord_emproster_rosterstatus", ["Roster Status"]),
          vertical: fieldValue(doc, "custrecord_emproster_vertical_amo", ["Vertical"]),
          salesTeam: fieldValue(doc, "custrecord_emproster_salesteam", ["Sales Team"]),
          salesRegion: fieldValue(doc, "custrecord_emproster_salesregion", ["Sales Region"]),
          salesSubRegion: firstValue(
            fieldValue(doc, "custrecord_emproster_sales_subregion", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"]),
            fieldValue(doc, "custrecord_emproster_salessubregion", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"]),
            fieldValue(doc, "custrecord_emproster_sales_sub_region", ["Sales Sub Region", "Sales Sub-Region", "Sub Region"])
          ),
          salesRepSupervisor: firstValue(
            fieldValue(doc, "custrecord_emproster_manager", ["MANAGER (ROSTER)", "Manager (Roster)", "Manager Roster", "Manager"]),
            fieldValue(doc, "custrecord_emproster_manager_roster", ["MANAGER (ROSTER)", "Manager (Roster)", "Manager Roster", "Manager"]),
            fieldValue(doc, "custrecord_emproster_mgr_roster", ["MANAGER (ROSTER)", "Manager (Roster)", "Manager Roster", "Manager"]),
            fieldValue(doc, "custrecord_emproster_supervisor", ["MANAGER (ROSTER)", "Manager (Roster)", "Manager Roster", "Manager"])
          ),
          tier: fieldValue(doc, "custrecord_emproster_sales_tier", ["Tier"]),
          salesRole: fieldValue(doc, "custrecord_emproster_salesrole", ["Sales Role"]),
          email: firstValue(
            fieldValue(doc, "custrecord_emproster_email", ["Email"]),
            fieldValue(doc, "custrecord_emproster_oracle_email", ["Oracle Email Address"]),
            fieldValue(doc, "custrecord_emproster_ns_email", ["NS Email"])
          ),
          totalRecords: countHeldRecords(employeeInternalId),
          holdoverCount: countHoldoverRecords(employeeInternalId),
          territories,
        };
        const hasRecordIdentity = Boolean(salesRep.name || salesRep.vertical || salesRep.email);
        const loginLikely = !hasRecordIdentity && (
          /login|sign in/i.test(title)
          || /email address.*password|forgot your password/i.test(text)
        );
        return {
          ok: !loginLikely,
          loginLikely,
          requestedUrl: targetUrl,
          responseUrl: response.url,
          status: response.status,
          title,
          salesRep,
          textSnippet: text.slice(0, 1500),
        };
  })()`;
}

function salesRepExtractExpression(internalId) {
  const url = `${NETSUITE_ORIGIN}/app/common/custom/custrecordentry.nl?rectype=1572&id=${encodeURIComponent(String(internalId))}`;
  const fields = EXTRACT_FIELDS.map((field) => ({
    label: field.label,
    key: field.key,
    source: field.source,
    checkbox: Boolean(field.checkbox),
  }));

  return `(async () => {
    const targetUrl = ${jsString(url)};
    const fields = ${JSON.stringify(fields)};
    const compact = (text) => String(text || "").replace(/\\s+/g, " ").trim();
    const cleanLabel = (value) => compact(value).replace(/\\s*\\*$/, "").toLowerCase();
    const firstValue = (...values) => values.find((value) => compact(value)) || "";
    const hiddenValue = (doc, fieldId) => compact(
      doc.getElementById(fieldId)?.value
      || doc.querySelector("[name='" + fieldId + "']")?.value
      || ""
    );
    const fieldByLabels = (doc, labels) => {
      const wanted = labels.map(cleanLabel);
      const wrappers = Array.from(doc.querySelectorAll("[data-nsps-type='field'], .uir-field-wrapper"));
      for (const wrapper of wrappers) {
        const rawLabel = wrapper.getAttribute("data-nsps-label")
          || wrapper.querySelector("[data-nsps-type='field_label'], .uir-label, .smallgraytextnolink")?.textContent
          || "";
        if (!wanted.includes(cleanLabel(rawLabel))) continue;
        const visibleInput = wrapper.querySelector("input:not([type='hidden']), textarea, select");
        if (visibleInput) return compact(visibleInput.value || visibleInput.innerText || visibleInput.textContent || "");
        const labelText = compact(rawLabel);
        return compact((wrapper.innerText || wrapper.textContent || "").replace(labelText, ""));
      }
      return "";
    };
    const fieldValue = (doc, fieldId, labels = []) => {
      const byValue = doc.getElementById(fieldId + "_val");
      if (byValue) return compact(byValue.innerText || byValue.textContent || byValue.value || "");
      const byFieldSpan = doc.getElementById(fieldId + "_fs");
      if (byFieldSpan && !/nldropdown/i.test(String(byFieldSpan.className || ""))) {
        const text = compact(byFieldSpan.innerText || byFieldSpan.textContent || byFieldSpan.value || "");
        if (text && !/function\\s*\\(/i.test(text)) return text;
      }
      if (labels.length) {
        const byLabelText = fieldByLabels(doc, labels);
        if (byLabelText) return byLabelText;
      }
      const input = doc.getElementById(fieldId) || doc.querySelector("[name='" + fieldId + "']");
      if (input) return compact(input.value || input.innerText || input.textContent || "");
      return "";
    };
    const checkboxText = (value) => {
      const text = compact(value).toLowerCase();
      if (["t", "true", "yes", "y", "checked"].includes(text)) return "Yes";
      if (["f", "false", "no", "n", "unchecked"].includes(text)) return "No";
      return compact(value);
    };
    const errorMessage = (error) => {
      if (!error) return "Unknown error";
      const parts = [
        error.name,
        typeof error.getCode === "function" ? error.getCode() : "",
        typeof error.getDetails === "function" ? error.getDetails() : "",
        error.message,
        String(error),
      ].filter(Boolean);
      return parts.join(" - ");
    };
    const valueFromResult = (result, column, isCheckbox) => {
      let value = "";
      try {
        value = result.getText(column) || result.getValue(column) || "";
      } catch {
        value = "";
      }
      return isCheckbox ? checkboxText(value) : compact(value);
    };
    const repResponse = await fetch(targetUrl, { credentials: "include", redirect: "follow" });
    const repHtml = await repResponse.text();
    const doc = new DOMParser().parseFromString(repHtml, "text/html");
    const text = compact(doc.body?.innerText || doc.body?.textContent || "");
    const title = doc.title || "";
    const employeeInternalId = firstValue(
      hiddenValue(doc, "custrecord_emproster_emp_hddn"),
      hiddenValue(doc, "custrecord_emproster_emp")
    );
    const salesRep = {
      internalId: ${jsString(internalId)},
      employeeInternalId,
      name: firstValue(
        fieldValue(doc, "custrecord_emproster_bigname"),
        fieldValue(doc, "name", ["Name"])
      ),
    };
    const hasRecordIdentity = Boolean(salesRep.name || employeeInternalId);
    const loginLikely = !hasRecordIdentity && (
      /login|sign in/i.test(title)
      || /email address.*password|forgot your password/i.test(text)
    );
    if (loginLikely) {
      return {
        ok: false,
        loginLikely,
        requestedUrl: targetUrl,
        responseUrl: repResponse.url,
        status: repResponse.status,
        title,
        salesRep,
        rows: [],
        textSnippet: text.slice(0, 1500),
      };
    }
    if (!employeeInternalId) throw new Error("Could not find the employee internal ID for this sales rep.");
    if (typeof nlapiCreateSearch !== "function") throw new Error("NetSuite search helper is not available on this page.");

    let filters;
    let columns;
    let resultSet;
    try {
      filters = [
        new nlobjSearchFilter("salesrep", null, "anyof", [employeeInternalId]),
        new nlobjSearchFilter("stage", null, "anyof", ["LEAD", "PROSPECT", "CUSTOMER"]),
      ];
    } catch (error) {
      throw new Error("Failed to build sales rep extract filters: " + errorMessage(error));
    }
    try {
      columns = fields.map((field) => new nlobjSearchColumn(field.source));
    } catch (error) {
      throw new Error("Failed to build sales rep extract columns: " + errorMessage(error));
    }
    try {
      resultSet = nlapiCreateSearch("customer", filters, columns).runSearch();
    } catch (error) {
      throw new Error("Failed to run sales rep extract search: " + errorMessage(error));
    }
    const rows = [];
    let start = 0;
    const pageSize = 1000;
    while (start < 50000) {
      let results;
      try {
        results = resultSet.getResults(start, start + pageSize) || [];
      } catch (error) {
        throw new Error("Failed to read sales rep extract results " + start + "-" + (start + pageSize) + ": " + errorMessage(error));
      }
      for (const result of results) {
        const row = {};
        fields.forEach((field, index) => {
          row[field.key] = valueFromResult(result, columns[index], field.checkbox);
        });
        rows.push(row);
      }
      if (results.length < pageSize) break;
      start += pageSize;
    }

    return {
      ok: true,
      requestedUrl: targetUrl,
      responseUrl: repResponse.url,
      status: repResponse.status,
      title,
      salesRep,
      rows,
      rowCount: rows.length,
    };
  })()`;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function spawnChrome(chromeExe, profileDir) {
  fs.mkdirSync(profileDir, { recursive: true });

  const args = [
    `--remote-debugging-port=${CHROME_DEBUG_PORT}`,
    "--remote-debugging-address=127.0.0.1",
    `--user-data-dir=${profileDir}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-default-apps",
    "--disable-session-crashed-bubble",
    "--disable-gpu",
    "--disable-features=RendererCodeIntegrity",
    NETSUITE_ORIGIN,
  ];

  launchedChrome = spawn(chromeExe, args, {
    detached: true,
    stdio: "ignore",
    windowsHide: false,
  });
  launchedChrome.unref();
}

async function waitForChromeDebugStable(timeoutMs = 18000, stableMs = 9000) {
  const started = Date.now();
  let readySince = 0;
  let sawReady = false;
  let lastError = null;

  while (Date.now() - started < timeoutMs) {
    try {
      const webSocketDebuggerUrl = await browserWebSocketDebuggerUrl();
      if (!readySince) readySince = Date.now();
      sawReady = true;
      if (Date.now() - readySince >= stableMs) return webSocketDebuggerUrl;
    } catch (error) {
      lastError = error;
      if (sawReady) {
        throw new Error("Chrome debug endpoint opened briefly, then closed. Chrome likely crashed while starting.");
      }
      readySince = 0;
    }
    await delay(500);
  }

  throw lastError || new Error("Chrome debug endpoint did not become ready.");
}

async function existingChromeDebugSession() {
  try {
    const webSocketDebuggerUrl = await browserWebSocketDebuggerUrl();
    let hasNetSuiteTab = false;
    let openedNetSuiteTab = false;
    try {
      const tabs = await listTabs();
      hasNetSuiteTab = tabs.some((tab) => tab.type === "page" && tab.url.includes("nlcorp.app.netsuite.com"));
      if (!hasNetSuiteTab) {
        await openChromeTab(NETSUITE_ORIGIN);
        openedNetSuiteTab = true;
      }
    } catch {
      // The debug session is alive; tab listing/opening is best effort.
    }
    return { ok: true, webSocketDebuggerUrl, hasNetSuiteTab, openedNetSuiteTab };
  } catch (error) {
    return { ok: false, error };
  }
}

async function launchChrome() {
  const chromeExe = findChromeExe();
  if (!chromeExe) throw new Error("Google Chrome was not found in the usual install locations.");

  const profileDir = path.join(ROOT, "chrome-profile");

  const existing = await existingChromeDebugSession();
  if (existing.ok) {
    return {
      chromeExe,
      profileDir,
      profileMode: "saved",
      debugPort: CHROME_DEBUG_PORT,
      webSocketDebuggerUrl: existing.webSocketDebuggerUrl,
      recovered: false,
      reused: true,
      warning: existing.openedNetSuiteTab
        ? "Existing companion Chrome debug session was reused and a NetSuite tab was opened."
        : "Existing companion Chrome debug session was reused.",
    };
  }

  try {
    spawnChrome(chromeExe, profileDir);
    const webSocketDebuggerUrl = await waitForChromeDebugStable();
    return {
      chromeExe,
      profileDir,
      profileMode: "saved",
      debugPort: CHROME_DEBUG_PORT,
      webSocketDebuggerUrl,
      recovered: false,
      warning: "",
    };
  } catch (error) {
    throw new Error(
      `Saved companion Chrome profile did not become available on debug port ${CHROME_DEBUG_PORT}. ` +
      "Close any companion Chrome windows, wait a few seconds, then click Launch NSCORP Chrome again. " +
      `Details: ${error.message || String(error)}`,
    );
  }
}

async function launchFirefox() {
  const started = await startFirefoxSession();
  const sessionId = started.session.id;
  await firefoxRequest("POST", `/session/${encodeURIComponent(sessionId)}/url`, { url: NETSUITE_ORIGIN });
  return {
    firefoxExe: started.firefoxExe || findFirefoxExe() || "",
    profileDir: "",
    profileMode: "managed",
    debugPort: FIREFOX_WEBDRIVER_PORT,
    reused: Boolean(started.reused),
    warning: started.reused
      ? "Existing companion Firefox session was reused and a NetSuite tab was opened."
      : "Firefox launched. Log in to NSCORP if prompted, then click Connect.",
  };
}

async function launchSelectedBrowser(mode) {
  switchActiveBrowser(mode);
  return activeBrowserMode === "firefox" ? launchFirefox() : launchChrome();
}

async function selectedBrowserStatus() {
  const tabs = await listTabs();
  const netSuiteTabs = tabs.filter((tab) => tab.type === "page" && tab.url.includes("nlcorp.app.netsuite.com"));
  let worker = { ready: false };
  let statusTabs = tabs;
  if (netSuiteTabs.length) {
    try {
      const workerTab = await ensureWorkerTab();
      worker = {
        ready: true,
        id: workerTab.id,
        title: workerTab.title,
        url: workerTab.url,
      };
    } catch (workerError) {
      worker = {
        ready: false,
        error: workerError.message || String(workerError),
      };
    }
    try {
      statusTabs = await listTabs();
    } catch {
      statusTabs = tabs;
    }
  }
  return {
    connected: true,
    browser: activeBrowserMode,
    browserLabel: browserLabel(),
    connectionLabel: browserConnectionLabel(),
    debugPort: activeBrowserMode === "firefox" ? FIREFOX_WEBDRIVER_PORT : CHROME_DEBUG_PORT,
    worker,
    workers: workerLaneSummaries(statusTabs),
    netSuiteTabs: netSuiteTabs.map((tab) => ({ title: tab.title, url: tab.url })),
  };
}

async function openExtractFolder() {
  await fs.promises.mkdir(EXTRACT_DIR, { recursive: true });
  if (process.platform !== "win32") {
    throw new Error("Opening folders is only supported on Windows in this build.");
  }
  const explorer = spawn("explorer.exe", [EXTRACT_DIR], {
    detached: true,
    stdio: "ignore",
    windowsHide: false,
  });
  explorer.unref();
  return { folderPath: EXTRACT_DIR };
}

async function handleApi(req, res) {
  try {
    if (req.method === "GET" && req.url === "/api/health") {
      sendJson(res, 200, { ok: true, app: "netsuite-companion-app", version: APP_VERSION });
      return;
    }

    if (req.method === "GET" && req.url === "/api/local-user") {
      sendJson(res, 200, {
        ok: true,
        displayName: localDisplayName(),
      });
      return;
    }

    if (req.method === "GET" && req.url === "/api/update/info") {
      sendJson(res, 200, {
        ok: true,
        currentVersion: APP_VERSION,
        manifestUrl: UPDATE_MANIFEST_URL,
      });
      return;
    }

    if (req.method === "GET" && req.url === "/api/update/check") {
      const result = await checkForUpdate();
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/update/install") {
      const result = await installLatestUpdate();
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/update/restart") {
      const result = scheduleAppRestart();
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && (req.url === "/api/browser/select" || req.url === "/api/chrome/select")) {
      const { browser } = await readJson(req);
      const selected = switchActiveBrowser(browser);
      sendJson(res, 200, { ok: true, browser: selected, browserLabel: browserLabel(selected) });
      return;
    }

    if (req.method === "POST" && (req.url === "/api/browser/launch" || req.url === "/api/chrome/launch")) {
      const { browser } = await readJson(req);
      const result = await launchSelectedBrowser(browser || activeBrowserMode);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "GET" && (req.url === "/api/browser/status" || req.url === "/api/chrome/status")) {
      try {
        const status = await selectedBrowserStatus();
        sendJson(res, 200, { ok: true, ...status });
      } catch (error) {
        sendJson(res, 200, {
          ok: true,
          connected: false,
          browser: activeBrowserMode,
          browserLabel: browserLabel(),
          connectionLabel: browserConnectionLabel(),
          debugPort: activeBrowserMode === "firefox" ? FIREFOX_WEBDRIVER_PORT : CHROME_DEBUG_PORT,
          workers: [],
          error: error.message || String(error),
        });
      }
      return;
    }

    if (req.method === "GET" && req.url === "/api/links") {
      const links = await readLinkConfig();
      sendJson(res, 200, { ok: true, links });
      return;
    }

    if (req.method === "POST" && req.url === "/api/links") {
      const { section, label, url } = await readJson(req);
      const key = normalizeLinkSection(section);
      const config = await readLinkConfig();
      const link = sanitizeLink({ label, url }, config[key]);
      config[key].push(link);
      const links = await writeLinkConfig(config);
      sendJson(res, 200, { ok: true, links, link });
      return;
    }

    if (req.method === "POST" && req.url === "/api/links/update") {
      const { section, id, label, url } = await readJson(req);
      const key = normalizeLinkSection(section);
      const config = await readLinkConfig();
      const index = config[key].findIndex((link) => link.id === id);
      if (index < 0) throw new Error("Link not found.");
      config[key][index] = sanitizeLink({ id, label, url }, config[key].filter((link) => link.id !== id));
      const links = await writeLinkConfig(config);
      sendJson(res, 200, { ok: true, links, link: config[key][index] });
      return;
    }

    if (req.method === "POST" && req.url === "/api/links/reorder") {
      const { section, orderedIds } = await readJson(req);
      const key = normalizeLinkSection(section);
      const config = await readLinkConfig();
      const ids = Array.isArray(orderedIds) ? orderedIds.map((id) => String(id || "").trim()).filter(Boolean) : [];
      const existingIds = new Set(config[key].map((link) => link.id));
      if (ids.length !== config[key].length || ids.some((id) => !existingIds.has(id))) {
        throw new Error("Could not save link order because the link list changed.");
      }
      const byId = new Map(config[key].map((link) => [link.id, link]));
      config[key] = ids.map((id) => byId.get(id));
      const links = await writeLinkConfig(config);
      sendJson(res, 200, { ok: true, links });
      return;
    }

    if (req.method === "POST" && req.url === "/api/links/delete") {
      const { section, id } = await readJson(req);
      const key = normalizeLinkSection(section);
      const config = await readLinkConfig();
      const nextLinks = config[key].filter((link) => link.id !== id);
      if (nextLinks.length === config[key].length) throw new Error("Link not found.");
      config[key] = nextLinks;
      const links = await writeLinkConfig(config);
      sendJson(res, 200, { ok: true, links });
      return;
    }

    if (req.method === "GET" && req.url === "/api/hybrid-reps") {
      const config = await refreshHybridRepProfiles(await readHybridConfig());
      const items = hybridRepItems(config);
      sendJson(res, 200, { ok: true, items, count: items.length });
      return;
    }

    if (req.method === "GET" && req.url === "/api/static-groups-history") {
      const items = await readStaticGroupHistory();
      sendJson(res, 200, { ok: true, items });
      return;
    }

    if (req.method === "POST" && req.url === "/api/static-groups-history-refresh") {
      const result = await refreshStaticGroupHistory();
      sendJson(res, 200, { ok: true, ...result, refreshedCount: Math.min(3, result.items.length) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/static-group-create") {
      const result = await createStaticGroup(await readJson(req));
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && req.url === "/api/static-group-add-members") {
      const result = await addStaticGroupMembers(await readJson(req));
      sendJson(res, 200, result);
      return;
    }

    if (req.method === "POST" && req.url === "/api/static-group-search") {
      const { query, fast } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Search text is required.");
      const result = await evaluateInStaticGroupWorkerChrome(searchExpression(query, { fast: Boolean(fast) }), fast ? 15000 : 45000);
      throwIfWorkerSessionInvalidResult(result, STATIC_GROUP_WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/static-group-record") {
      const { internalId, includeRelated } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const result = await evaluateInStaticGroupWorkerChrome(recordParseExpression(internalId, { includeRelated }));
      throwIfWorkerSessionInvalidResult(result, STATIC_GROUP_WORKER_TAB_TITLE);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/pitchbook") {
      const { group } = await readJson(req);
      if (!String(group || "").trim()) throw new Error("Static Group URL, Internal ID, or name is required.");
      const result = await evaluateInStaticGroupWorkerChrome(pitchbookGroupExpression(group), 120000);
      throwIfWorkerSessionInvalidResult(result, STATIC_GROUP_WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "GET" && req.url === "/api/territories") {
      const result = await evaluateInTerritoryWorkerChrome(territoryCatalogExpression(), 60000);
      throwIfWorkerSessionInvalidResult(result, TERRITORY_WORKER_TAB_TITLE);
      if (result.error && !result.items?.length) throw new Error(result.error);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/territory-update") {
      const result = await updateTerritoryAssignments(await readJson(req));
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "GET" && req.url === "/api/recent-records") {
      const result = await evaluateInWorkerChrome(recentRecordsExpression(), 30000);
      throwIfWorkerSessionInvalidResult(result, WORKER_TAB_TITLE);
      if (result.error && !result.items?.length) throw new Error(result.error);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/hybrid-reps/update") {
      const result = await updateHybridRep(await readJson(req));
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/roe-stop") {
      const result = await resetWorkerLane("roe");
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/dupe-stop") {
      const result = await resetWorkerLane("dupe");
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/domain-stop") {
      const result = await resetWorkerLane("domain");
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/territory-stop") {
      const result = await resetWorkerLane("territory");
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && (req.url === "/api/merge-stop" || req.url === "/api/search-stop" || req.url === "/api/main-stop")) {
      const result = await resetWorkerLane("main");
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/roe-search") {
      const { query, fast } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Search text is required.");
      const result = await evaluateInRoeWorkerChrome(searchExpression(query, { fast: Boolean(fast) }), fast ? 15000 : 45000);
      throwIfWorkerSessionInvalidResult(result, ROE_WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/roe-record") {
      const { internalId, includeRelated } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const result = await evaluateInRoeWorkerChrome(recordParseExpression(internalId, { includeRelated }));
      throwIfWorkerSessionInvalidResult(result, ROE_WORKER_TAB_TITLE);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/dupe-search") {
      const { query, fast } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Search text is required.");
      const result = await evaluateInDupeWorkerChromeChecked(
        searchExpression(query, { fast: Boolean(fast) }),
        fast ? 15000 : 45000,
        (candidate) => candidate?.error ? String(candidate.error) : "",
      );
      throwIfWorkerSessionInvalidResult(result, DUPE_WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/domain-search") {
      const { query, fast } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Search text is required.");
      const result = await evaluateInDomainWorkerChromeChecked(
        searchExpression(query, { fast: Boolean(fast) }),
        fast ? 15000 : 45000,
        (candidate) => candidate?.error ? String(candidate.error) : "",
      );
      throwIfWorkerSessionInvalidResult(result, DOMAIN_WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/domain-record") {
      const { internalId, includeRelated } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const result = await evaluateInDomainWorkerChromeChecked(
        recordParseExpression(internalId, { includeRelated }),
        45000,
        recoverableDupeResultMessage,
      );
      throwIfWorkerSessionInvalidResult(result, DOMAIN_WORKER_TAB_TITLE);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/dupe-record") {
      const { internalId, includeRelated } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const result = await evaluateInDupeWorkerChromeChecked(
        recordParseExpression(internalId, { includeRelated }),
        45000,
        recoverableDupeResultMessage,
      );
      throwIfWorkerSessionInvalidResult(result, DUPE_WORKER_TAB_TITLE);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/search") {
      const { query, fast } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Search text is required.");
      const result = await evaluateInWorkerChrome(searchExpression(query, { fast: Boolean(fast) }), fast ? 15000 : 45000);
      throwIfWorkerSessionInvalidResult(result, WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/sales-rep-search") {
      const { query } = await readJson(req);
      if (!String(query || "").trim()) throw new Error("Sales rep search text is required.");
      const result = await evaluateInWorkerChrome(salesRepSearchExpression(query));
      throwIfWorkerSessionInvalidResult(result, WORKER_TAB_TITLE);
      if (result.error) throw new Error(result.error);
      const hybridConfig = await readHybridConfig();
      sendJson(res, 200, { ok: true, ...decorateSalesRepResult(result, hybridConfig) });
      return;
    }

    if (req.method === "POST" && req.url === "/api/record") {
      const { internalId, includeRelated, includeSubcustomerCount } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const result = await evaluateInWorkerChrome(recordParseExpression(internalId, { includeRelated, includeSubcustomerCount }));
      throwIfWorkerSessionInvalidResult(result, WORKER_TAB_TITLE);
      sendJson(res, 200, result.ok ? { ok: true, ...result } : { ok: false, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/sales-rep") {
      const { internalId } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Sales rep internal ID is required.");
      const result = await evaluateInWorkerChrome(salesRepParseExpression(internalId));
      throwIfWorkerSessionInvalidResult(result, WORKER_TAB_TITLE);
      const hybridConfig = await readHybridConfig();
      const decorated = result.salesRep ? { ...result, salesRep: decorateSalesRep(result.salesRep, hybridConfig) } : result;
      sendJson(res, 200, decorated.ok ? { ok: true, ...decorated } : { ok: false, ...decorated });
      return;
    }

    if (req.method === "POST" && req.url === "/api/sales-rep-extract") {
      const { internalId } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Sales rep internal ID is required.");
      const result = await evaluateInWorkerChrome(salesRepExtractExpression(internalId), 120000);
      if (!result.ok) {
        sendJson(res, 200, { ok: false, ...result });
        return;
      }
      const written = await writeSalesRepExtract(result);
      sendJson(res, 200, { ok: true, ...written, salesRep: result.salesRep });
      return;
    }

    if (req.method === "POST" && req.url === "/api/result-export") {
      const result = await writeResultExport(await readJson(req));
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/open-extract-folder") {
      const result = await openExtractFolder();
      sendJson(res, 200, { ok: true, ...result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/open-record") {
      const { internalId, edit } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const url = `${NETSUITE_ORIGIN}/app/common/entity/custjob.nl?id=${encodeURIComponent(String(internalId))}${edit ? "&e=T" : ""}`;
      const result = await openChromeTab(url);
      sendJson(res, 200, { ok: true, targetUrl: url, result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/open-record-merge") {
      const { internalId, primaryInternalId, primaryLabel } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Internal ID is required.");
      const url = `${NETSUITE_ORIGIN}/app/common/entity/entitymerge.nl?e=T&type=custjob&id=${encodeURIComponent(String(internalId))}`;
      const result = await createChromeTarget(url, { background: true });
      const mergeTab = result?.webSocketDebuggerUrl ? result : await waitForTabById(result?.id);
      const primaryPrefill = await prefillMergePrimary(mergeTab, primaryInternalId, primaryLabel);
      sendJson(res, 200, { ok: true, targetUrl: url, result, mergeTab, primaryPrefill });
      return;
    }

    if (req.method === "POST" && req.url === "/api/open-sales-rep") {
      const { internalId } = await readJson(req);
      if (!String(internalId || "").trim()) throw new Error("Sales rep internal ID is required.");
      const url = `${NETSUITE_ORIGIN}/app/common/custom/custrecordentry.nl?rectype=1572&id=${encodeURIComponent(String(internalId))}`;
      const result = await openChromeTab(url);
      sendJson(res, 200, { ok: true, targetUrl: url, result });
      return;
    }

    if (req.method === "POST" && req.url === "/api/open-url") {
      const { url, background } = await readJson(req);
      if (!String(url || "").trim()) throw new Error("URL is required.");
      const targetUrl = normalizeLinkUrl(url);
      const result = background ? await createChromeTarget(targetUrl, { background: true }) : await openChromeTab(targetUrl);
      sendJson(res, 200, { ok: true, targetUrl, result });
      return;
    }

    sendJson(res, 404, { ok: false, error: "Not found." });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message || String(error), code: error.code || "" });
  }
}

function serveStatic(req, res) {
  const requestPath = new URL(req.url, `http://127.0.0.1:${PORT}`).pathname;
  const relativePath = requestPath === "/" ? "index.html" : requestPath.replace(/^\/+/, "");
  const absolutePath = path.resolve(ROOT, relativePath);

  if (!absolutePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(absolutePath, (error, content) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const ext = path.extname(absolutePath).toLowerCase();
    res.writeHead(200, {
      "Content-Type": CONTENT_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(content);
  });
}

const server = http.createServer((req, res) => {
  if (req.url.startsWith("/api/")) {
    handleApi(req, res);
    return;
  }
  serveStatic(req, res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`NetSuite Companion App running at http://127.0.0.1:${PORT}`);
  console.log(`Chrome debug port: ${CHROME_DEBUG_PORT}`);
});
