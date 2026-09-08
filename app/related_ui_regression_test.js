const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = __dirname;
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
const serverJs = fs.readFileSync(path.join(root, "server.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const recordRegionRules = JSON.parse(fs.readFileSync(path.join(root, "record-region-rules.json"), "utf8"));

function sliceBetween(source, start, end) {
  const startIndex = source.indexOf(start);
  assert.notStrictEqual(startIndex, -1, `Missing start marker: ${start}`);
  const endIndex = source.indexOf(end, startIndex);
  assert.notStrictEqual(endIndex, -1, `Missing end marker after ${start}: ${end}`);
  return source.slice(startIndex, endIndex);
}

assert.match(serverJs, /function spawnChrome\(chromeExe, profileDir\)/);
assert.match(serverJs, /--remote-debugging-address=127\.0\.0\.1/);
assert.match(serverJs, /--disable-gpu/);
assert.match(serverJs, /--disable-features=RendererCodeIntegrity/);
assert.match(serverJs, /async function waitForChromeDebugStable\(timeoutMs = 18000, stableMs = 9000\)/);
assert.match(serverJs, /Chrome debug endpoint opened briefly, then closed/);
assert.match(serverJs, /async function existingChromeDebugSession\(\)/);
assert.match(serverJs, /const existing = await existingChromeDebugSession\(\);/);
assert.match(serverJs, /if \(existing\.ok\) \{/);
assert.match(serverJs, /reused: true/);
assert.match(serverJs, /Existing companion Chrome debug session was reused/);
assert.match(serverJs, /const profileDir = path\.join\(ROOT, "chrome-profile"\);/);
assert.match(serverJs, /profileMode: "saved"/);
assert.doesNotMatch(serverJs, /chrome-profile-recovery/);
assert.doesNotMatch(serverJs, /profileMode: "recovery"/);
assert.match(serverJs, /Saved companion Chrome profile did not become available on debug port/);
assert.match(serverJs, /async function launchSelectedBrowser\(mode\)/);
assert.match(serverJs, /async function launchFirefox\(\)/);
assert.match(serverJs, /function findGeckoDriverExe\(\)/);
assert.match(serverJs, /runtime", "geckodriver", "geckodriver\.exe/);
assert.match(serverJs, /async function connectFirefoxTab\(handle\)/);
assert.match(serverJs, /req\.method === "POST" && \(req\.url === "\/api\/browser\/launch"/);
assert.match(serverJs, /req\.method === "GET" && \(req\.url === "\/api\/browser\/status"/);
assert.match(serverJs, /function cleanLocalDisplayName\(value\)/);
assert.match(serverJs, /function localDisplayName\(\)/);
assert.match(serverJs, /req\.method === "GET" && req\.url === "\/api\/local-user"/);
assert.match(indexHtml, /id="browserSelect"/);
assert.match(indexHtml, /Mozilla Firefox/);
assert.match(appJs, /const result = await postJson\("\/api\/browser\/launch", \{ browser: selectedBrowser \}\);/);
assert.match(appJs, /await checkBrowser\(\);/);
assert.match(appJs, /function applyBrowserUi\(browser\)/);

const opportunityColumns = sliceBetween(appJs, "const opportunityColumns = [", "];");
assert.match(opportunityColumns, /key:\s*"date",\s*label:\s*"Date",\s*sortable:\s*true/);
assert.match(opportunityColumns, /key:\s*"title",\s*label:\s*"Title",\s*sortable:\s*true/);
assert.match(opportunityColumns, /key:\s*"salesRep",\s*label:\s*"Sales Rep",\s*sortable:\s*true/);
assert.match(opportunityColumns, /key:\s*"expectedCloseDate",\s*label:\s*"Expected Close"/);
assert.match(opportunityColumns, /key:\s*"status",\s*label:\s*"Opportunity Status"/);
assert.doesNotMatch(opportunityColumns, /Projected Total|projectedTotal|tranId|Opportunity"/);

const taskColumns = sliceBetween(appJs, "const taskColumns = [", "];");
assert.match(taskColumns, /key:\s*"title",\s*label:\s*"Task",\s*sortable:\s*true/);
assert.match(taskColumns, /key:\s*"assigned",\s*label:\s*"Assigned",\s*sortable:\s*true/);
assert.match(taskColumns, /key:\s*"status",\s*label:\s*"Status",\s*sortable:\s*true/);
assert.match(taskColumns, /key:\s*"dueDate",\s*label:\s*"Due Date",\s*sortable:\s*true,\s*sortType:\s*"date"/);
assert.doesNotMatch(taskColumns, /Priority|priority/);

const contactColumns = sliceBetween(appJs, "const contactColumns = [", "];");
assert.match(contactColumns, /key:\s*"name",\s*label:\s*"Name",\s*sortable:\s*true/);
assert.match(contactColumns, /key:\s*"inactive",\s*label:\s*"Inactive",\s*sortable:\s*true/);
assert.match(contactColumns, /key:\s*"company",\s*label:\s*"Company",\s*sortable:\s*true/);
assert.match(contactColumns, /key:\s*"subsidiary",\s*label:\s*"Subsidiary",\s*sortable:\s*true/);

assert.match(appJs, /data-related-sort/);
assert.match(appJs, /related-sort-arrow/);
assert.match(appJs, /function sortRelatedTable/);
assert.match(appJs, /function sortedRelatedRows/);
assert.match(appJs, /const contacts = relatedGroupRows\(record, "contacts"\)/);
assert.match(appJs, /relatedTabButton\("Contacts", "contacts", contacts\.length\)/);
assert.match(appJs, /data-record-panel="contacts"/);
assert.match(appJs, /data-related-column="\$\{escapeHtml\(column\.key\)\}"/);
assert.match(appJs, /label:\s*"Edit",\s*urlKey:\s*"editUrl"/);
assert.match(appJs, /label:\s*"Open",\s*urlKey:\s*"url"/);
assert.match(appJs, /action\.secondary === false \? "" : "secondary"/);
assert.match(appJs, /defaultSortKey:\s*"date",\s*defaultSortDirection:\s*"desc"/);
assert.match(appJs, /defaultSortKey:\s*"dueDate",\s*defaultSortDirection:\s*"desc"/);
assert.match(appJs, /data-record-panel="contacts"[\s\S]*?defaultSortKey:\s*"name",\s*defaultSortDirection:\s*"asc"/);
assert.match(appJs, /const salesRepRows = \[\s*\["email",\s*"internalId"\],\s*\["vertical",\s*"salesTeam"\],\s*\["salesRegion",\s*"salesSubRegion"\],\s*\["salesRole",\s*"tier"\],\s*\["leadHoldoverCount",\s*"salesRepSupervisor"\],\s*\]/);
assert.match(appJs, /leadHoldoverCount:\s*"Total Leads \/ Holdover Count"/);
assert.match(appJs, /salesRepSupervisor:\s*"Sales Rep Supervisor"/);
assert.match(appJs, /displayValue\(rep\?\.totalRecords\).*displayValue\(rep\?\.holdoverCount\)/);
assert.match(appJs, /salesSubRegion:\s*"Sales Sub Region"/);
assert.doesNotMatch(appJs, /summary-placeholder/);
assert.match(appJs, /function salesRepSummarySection/);
assert.match(appJs, /salesRepSummarySection\("Sales Rep Details", salesRepItems\.join\(""\)\)/);
assert.match(appJs, /detailTitle:\s*mode === "eligibility" \? "Target Sales Rep" : activeSalesRepWorkspaceTab === "hybrids" \? "Selected Hybrid Rep" : "Selected Sales Rep"/);
assert.match(indexHtml, /<h4>Territories<\/h4>/);
assert.match(appJs, /territorySectionClassName:\s*"territory-section record-section"/);
assert.match(indexHtml, /id="searchHistory"/);
assert.match(indexHtml, /aria-controls="searchHistory"/);
assert.match(indexHtml, /id="recordSearchTab"[\s\S]*data-record-workspace-tab="search"[\s\S]*>Search<\/button>/);
assert.match(indexHtml, /id="recordMergeTab"[\s\S]*data-record-workspace-tab="merge"[\s\S]*>Merge<\/button>/);
assert.doesNotMatch(indexHtml, /id="hybridsTab"/);
assert.match(indexHtml, /id="salesRepWorkspaceTabs"[\s\S]*aria-label="Sales Rep workspace"/);
assert.match(indexHtml, /id="salesRepSearchTab"[\s\S]*data-sales-rep-workspace-tab="search"[\s\S]*>Search<\/button>/);
assert.match(indexHtml, /id="salesRepHybridTab"[\s\S]*data-sales-rep-workspace-tab="hybrids"[\s\S]*>Hybrid Reps List<\/button>/);
assert.match(indexHtml, /id="territoriesTab"[\s\S]*data-mode="territories"[\s\S]*>Territories<\/button>/);
assert.match(indexHtml, /id="suiteWorldDomainTab"[\s\S]*data-suite-world-tab="domain"[\s\S]*>Domain Search<\/button>/);
assert.match(indexHtml, /id="territoryWorkspace"[\s\S]*class="territory-workspace hidden"/);
assert.match(indexHtml, /class="eligibility-head territory-toolbar"[\s\S]*<h3>Territories<\/h3>[\s\S]*id="territoryRefreshButton"[\s\S]*id="territoryBrowserStatus" class="status-box inline-status territory-inline-status"/);
assert.match(indexHtml, /class="territory-browser-head"[\s\S]*class="territory-browser-title">Territory List<\/div>[\s\S]*id="territoryBrowserCount" class="readonly-pill">0 territories<\/span>/);
assert.match(indexHtml, /id="territoryGeneralFilter"[\s\S]*placeholder="Type any territory text"/);
assert.match(indexHtml, /id="territoryVerticalFilter"[\s\S]*<option value="BizSvcs">BizSvcs<\/option>[\s\S]*<option value="PROD">PROD<\/option>[\s\S]*<option value="SDR">SDR<\/option>[\s\S]*<option value="SFT">SFT<\/option>/);
assert.match(indexHtml, /id="territoryTierFilter"[\s\S]*<option value="MM">MM<\/option>[\s\S]*<option value="CORP">CORP<\/option>[\s\S]*<option value="ENT">ENT<\/option>/);
assert.match(indexHtml, /id="territoryRegionFilter"/);
assert.match(indexHtml, /id="territoryBrowserList"/);
assert.match(indexHtml, /<th>Potential Master<\/th>/);
assert.match(indexHtml, /<th>Column F: Master Record<\/th>/);
assert.match(indexHtml, /<th>Column G: Status \/ Stage<\/th>/);
assert.match(indexHtml, /<th>Column H: Sales Rep<\/th>/);
assert.match(indexHtml, /<tbody id="dupeResultsBody">[\s\S]*?empty-state-cell[\s\S]*?No duplicate finder results yet\./);
assert.match(indexHtml, /<tbody id="domainResultsBody">[\s\S]*?empty-state-cell[\s\S]*?No domain search results yet\./);
assert.match(indexHtml, /<tbody id="eligibilityResultsBody">[\s\S]*?empty-state-cell[\s\S]*?No eligibility results yet\./);
assert.match(indexHtml, /id="recordSearchWorkspace"/);
assert.match(indexHtml, /id="mergeWorkspace"[\s\S]*class="merge-workspace hidden"/);
assert.match(indexHtml, /<input id="mergePrimaryInput"[\s\S]*placeholder="Primary Internal ID, ID, or URL">/);
assert.match(indexHtml, /<textarea id="mergeDuplicateInput"[\s\S]*rows="3"[\s\S]*placeholder="Paste duplicate Internal IDs, IDs, or URLs\. One per line\."/);
assert.match(indexHtml, /id="mergeReviewCheckbox"/);
assert.match(indexHtml, /I reviewed these duplicates\. <strong>Merging is permanent and cannot be undone\.<\/strong> Tick to enable <strong>Merge Page<\/strong>/);
assert.match(indexHtml, /id="mergeLoadButton"/);
assert.match(indexHtml, /id="mergePrimaryCard"/);
assert.match(indexHtml, /id="mergeDuplicateList"/);
assert.match(indexHtml, /id="dupeStopButton"[\s\S]*type="button"[\s\S]*Stop/);
assert.match(indexHtml, /id="eligibilityStopButton"[\s\S]*type="button"[\s\S]*Stop/);
assert.match(indexHtml, /<div class="eligibility-actions batch-actions">[\s\S]*?id="dupeStopButton"[\s\S]*?id="dupeFindButton"/);
assert.match(indexHtml, /<div class="eligibility-actions batch-actions">[\s\S]*?id="eligibilityStopButton"[\s\S]*?id="verifyEligibilityButton"/);
assert.match(indexHtml, /id="dupeCopyFhButton"[\s\S]*type="button"[\s\S]*Copy F-H/);
assert.match(indexHtml, /id="dupeExportButton"[\s\S]*type="button"[\s\S]*Extract/);
assert.match(indexHtml, /id="dupeOpenExtractFolderButton"[\s\S]*type="button"[\s\S]*class="small-button secondary hidden"[\s\S]*Open Folder/);
assert.match(indexHtml, /id="eligibilityExportButton"[\s\S]*type="button"[\s\S]*Extract/);
assert.match(indexHtml, /id="eligibilityOpenExtractFolderButton"[\s\S]*type="button"[\s\S]*class="small-button secondary hidden"[\s\S]*Open Folder/);
assert.match(indexHtml, /id="dupeElapsed"[\s\S]*Elapsed: 00:00/);
assert.match(indexHtml, /id="eligibilityElapsed"[\s\S]*Elapsed: 00:00/);
assert.match(indexHtml, /<th>Industry \/ Annual Revenue<\/th>/);
assert.match(indexHtml, /<th>State\/Region<\/th>/);
assert.doesNotMatch(indexHtml, /<th>Industry<\/th>\s*<th>Annual Revenue<\/th>/);
assert.match(indexHtml, /id="appToast"[\s\S]*class="app-toast hidden"/);
assert.match(appJs, /const SEARCH_HISTORY_LIMIT = 5;/);
assert.match(appJs, /SEARCH_HISTORY_KEY_PREFIX/);
assert.match(appJs, /function noResultsIconHtml\(\)/);
assert.match(appJs, /function noResultsRow\(colspan, message\)/);
assert.match(appJs, /records:\s*noResultsRow\(5, "No Lead, Prospect, or Customer records found\."\)/);
assert.match(appJs, /salesReps:\s*noResultsRow\(5, "No Sales Rep records found\."\)/);
assert.match(appJs, /function saveSearchHistory\(mode, value\)/);
assert.match(appJs, /function renderSearchHistory\(mode = activeMode, options = \{\}\)/);
assert.match(appJs, /localStorage\.setItem\(searchHistoryKey\(mode\), JSON\.stringify\(nextItems\)\)/);
assert.match(appJs, /elements\.searchText\.addEventListener\("focus", \(\) => \{[\s\S]*?renderSearchHistory\(\);[\s\S]*?\}\);/);
assert.match(appJs, /data-search-history-value/);
assert.match(appJs, /if \(activeMode === "territories"\) return "Territories";/);
assert.match(appJs, /territories:\s*\{ running:\s*0,\s*unseen:\s*false \}/);
assert.match(appJs, /const TERRITORY_REGION_OPTIONS = \[[\s\S]*?value:\s*"SOUTH"[\s\S]*?value:\s*"CENTRAL"[\s\S]*?value:\s*"EMEA"[\s\S]*?value:\s*"ANZ"[\s\S]*?value:\s*"APJ"[\s\S]*?value:\s*"LATAM"/);
assert.match(appJs, /function territoryMatchesGeneral\(territory, query\)/);
assert.match(appJs, /function territoryMatchesTier\(territory, tier\)[\s\S]*?if \(value === "MM"\) return \["LMM", "UMM", "MM"\]/);
assert.match(appJs, /function territoryMatchesRegion\(territory, region\)[\s\S]*?if \(value === "CENTRAL"\) return tokens\.has\("CENTRAL"\) \|\| tokens\.has\("CENTRAL_QC"\)/);
assert.match(appJs, /function territoryRegionOptionsForVertical\(vertical\)[\s\S]*?vertical !== "PROD"[\s\S]*?!\["SOUTH", "CENTRAL"\]\.includes\(option\.value\)/);
assert.match(appJs, /const vertical = \["BizSvcs", "C&E", "ConsSvcs", "H&H", "PROD", "SDR", "SFT"\]/);
assert.match(appJs, /tokens\.includes\("LATAM"\)/);
assert.match(appJs, /function renderTerritoryBrowser\(\)/);
assert.match(appJs, /No Territory Found\./);
assert.match(appJs, /data-open-territory-url/);
assert.match(appJs, /class="territory-browser-table"/);
assert.match(appJs, /<th scope="col">Territory<\/th>/);
assert.match(appJs, /<th scope="col">Description<\/th>/);
assert.match(appJs, /territory-browser-description/);
assert.doesNotMatch(appJs, /territory-filter-pill/);
assert.doesNotMatch(appJs, /Internal ID \$\{escapeHtml\(territory\.internalId\)\}/);
assert.match(appJs, /const result = await getJsonWithTimeout\("\/api\/territories", 90000\);/);
assert.match(appJs, /mergePrimaryInput: document\.getElementById\("mergePrimaryInput"\)/);
assert.match(appJs, /let activeRecordWorkspaceTab = "search";/);
assert.match(appJs, /let activeSalesRepWorkspaceTab = "search";/);
assert.match(appJs, /let eligibilityRunState = \{ id: 0, stopped: false \};/);
assert.match(appJs, /let dupeRunState = \{ id: 0, stopped: false \};/);
assert.match(appJs, /let dupeResultRows = \[\];/);
assert.match(appJs, /let eligibilityResultRows = \[\];/);
assert.match(appJs, /let dupeElapsedTimer = null;/);
assert.match(appJs, /let eligibilityElapsedTimer = null;/);
assert.match(appJs, /const DUPE_SEARCH_TIMEOUT_MS = 45000;/);
assert.match(appJs, /const DUPE_RECORD_TIMEOUT_MS = 90000;/);
assert.match(appJs, /function formatElapsedTime\(elapsedMs\)/);
assert.match(appJs, /const SESSION_INVALID_ERROR_CODE = "NSCORP_SESSION_INVALID";/);
assert.match(appJs, /function requestError\(payload, status\)/);
assert.match(appJs, /error\.code = payload\?\.code \|\| "";/);
assert.match(appJs, /function isWorkerSessionInvalidError\(error\)/);
assert.match(appJs, /function workerSessionStoppedMessage\(label, completed, total\)/);
assert.match(appJs, /function startDupeElapsedTimer\(\)/);
assert.match(appJs, /function stopDupeElapsedTimer\(\)/);
assert.match(appJs, /function startEligibilityElapsedTimer\(\)/);
assert.match(appJs, /function stopEligibilityElapsedTimer\(\)/);
assert.match(appJs, /function showToast\(message, mode = "ok"\)/);
assert.match(appJs, /const ACTION_ICONS = \{[\s\S]*?view:[\s\S]*?open:[\s\S]*?edit:/);
assert.match(appJs, /function actionIconButton\(iconName, label, attributes = \{\}, options = \{\}\)/);
assert.match(appJs, /actionIconButton\("view", "View in app", \{ "data-view-id": item\.internalId \}\)/);
assert.match(appJs, /actionIconButton\("open", "Open in NSCORP", \{ "data-open-id": item\.internalId \}, \{ secondary: true \}\)/);
assert.match(appJs, /actionIconButton\("edit", "Edit in NSCORP", \{ "data-edit-id": item\.internalId \}, \{ secondary: true \}\)/);
assert.match(appJs, /const editButton = event\.target\.closest\("\[data-edit-id\]"\)/);
assert.match(appJs, /postJson\("\/api\/open-record", \{ internalId, edit: true \}\)/);
assert.match(appJs, /function beginBatchRun\(runState, startButton, stopButton, runningText\)/);
assert.match(appJs, /function isBatchRunStopped\(runState, runId\)/);
assert.match(appJs, /function stopBatchRun\(runState, stopButton\)/);
assert.match(appJs, /const modeActivityState = \{[\s\S]*?salesReps:\s*\{ running:\s*0,\s*unseen:\s*false \}/);
assert.match(appJs, /const recordWorkspaceActivityState = \{[\s\S]*?search:\s*\{ running:\s*0,\s*unseen:\s*false \}/);
assert.match(appJs, /const APP_ACTIVITY_KEY = "netsuite-companion-activity-feed";/);
assert.match(appJs, /function renderActivityFeed\(\)/);
assert.match(appJs, /function addAppActivity\(type, title, detail = ""\)/);
assert.match(appJs, /elements\.activityClearButton\?\.addEventListener\("click", \(\) => \{/);
assert.match(appJs, /addAppActivity\("search", `You searched for "\$\{submittedQuery\}"/);
assert.match(appJs, /addAppActivity\([\s\S]*?"roe",[\s\S]*?ROE check completed/);
assert.match(appJs, /addAppActivity\([\s\S]*?"dupe",[\s\S]*?Duplicate Finder completed/);
assert.match(appJs, /addAppActivity\([\s\S]*?"domain",[\s\S]*?Domain Search completed/);
assert.match(appJs, /function updateActivityIndicators\(\)/);
assert.match(appJs, /function acknowledgeVisibleActivity\(\)/);
assert.match(appJs, /function beginTabActivity\(mode, recordWorkspaceTab = null\)/);
assert.match(appJs, /function finishTabActivity\(activityToken\)/);
assert.match(appJs, /function recordModeActivityStatus\(\)/);
assert.match(appJs, /function salesRepModeActivityStatus\(\)/);
assert.match(appJs, /setTabActivityClass\(elements\.salesRepSearchTab/);
assert.match(appJs, /setTabActivityClass\(elements\.salesRepHybridTab/);
assert.match(appJs, /const unseenEntries = activeMode === "records"[\s\S]*?tab !== activeRecordWorkspaceTab/);
assert.doesNotMatch(appJs, /function recordModeActivityStatus\(\) \{\s*if \(activeMode === "records"\) return "";/);
assert.match(appJs, /beginTabActivity\("records",\s*"merge"\)/);
assert.match(appJs, /beginTabActivity\("suiteWorld",\s*"dupes"\)/);
assert.match(appJs, /beginTabActivity\("suiteWorld",\s*"domain"\)/);
assert.match(appJs, /beginTabActivity\("eligibility"\)/);
assert.match(appJs, /beginTabActivity\(searchMode,\s*recordWorkspaceTabForMode\(searchMode\)\)/);
assert.match(appJs, /function setRecordWorkspaceTab\(tab\)/);
assert.match(appJs, /function setSalesRepWorkspaceTab\(tab\)/);
assert.match(appJs, /function setSuiteWorldWorkspaceTab\(tab\)/);
assert.match(appJs, /function parseMergeEntries\(value, fieldLabel = "Merge field"\)/);
assert.match(appJs, /entitymerge\.nl URLs are merge pages, not records/);
assert.match(appJs, /\/app\/common\/entity\/custjob\.nl/);
assert.match(appJs, /\/app\/common\/entity\/entity\.nl/);
assert.match(appJs, /Unsupported NetSuite record URL on the \$\{fieldLabel\}/);
assert.match(appJs, /function mergeRecordSearchQueries\(entry\)/);
assert.match(appJs, /function mergeSearchResultForEntry\(entry, items\)/);
assert.match(appJs, /function mergeMissingRecord\(entry\)/);
const mergeLookupHelpers = sliceBetween(appJs, "function mergeRecordSearchQueries(entry) {", "function mergeEmptyCard(message) {");
const mergeNameHelpers = sliceBetween(appJs, "function dupeCompanyNameWithoutInactivePrefix(value) {", "function dupeAddUniqueSearchTerm(items, value) {");
const testMergeLookup = new Function(`${mergeNameHelpers}\n${mergeLookupHelpers}; return { mergeEntryCompanyId, mergeRecordSearchQueries, mergeSearchResultForEntry, mergeMissingRecord };`)();
assert.deepStrictEqual(
  testMergeLookup.mergeRecordSearchQueries({ raw: "6288489", internalId: "6288489", query: "" }),
  ["cu:6288489", "6288489"],
);
assert.deepStrictEqual(
  testMergeLookup.mergeMissingRecord({ raw: "https://nlcorp.app.netsuite.com/app/common/entity/custjob.nl?id=123456" }),
  { missing: true, source: "https://nlcorp.app.netsuite.com/app/common/entity/custjob.nl?id=123456" },
);
assert.strictEqual(
  testMergeLookup.mergeSearchResultForEntry(
    { raw: "6288489", internalId: "6288489", query: "" },
    [
      { internalId: "100", title: "100 Other Company" },
      { internalId: "200", title: "6288489 Exact Company ID Match" },
    ],
  )?.internalId,
  "200",
);
assert.match(appJs, /parseMergeEntries\(elements\.mergePrimaryInput\.value, "Primary field"\)/);
assert.match(appJs, /parseMergeEntries\(elements\.mergeDuplicateInput\.value, "Duplicate field"\)/);
assert.match(appJs, /const primaryHasInput = Boolean\(String\(elements\.mergePrimaryInput\?\.value \|\| ""\)\.trim\(\)\);/);
assert.match(appJs, /primaryHasInput\s*\? ""\s*:\s*mergeEmptyCard\("Load a primary record to begin\."\)/);
assert.match(appJs, /duplicateHasInput\s*\? ""\s*:\s*mergeEmptyCard\("Load one or more duplicate records\."\)/);
assert.match(appJs, /function renderMergeReview\(\)/);
assert.match(appJs, /if \(record\?\.missing\) return "Record does not exist";/);
assert.match(appJs, /const isMissing = Boolean\(record\?\.missing\);/);
assert.match(appJs, /Record does not exist\./);
assert.match(appJs, /const blockerHtml = blocker && !isMissing/);
assert.match(appJs, /Checked \$\{result\.duplicates\.length\} duplicate input\(s\)\. \$\{blockerCount\} needs attention\./);
assert.doesNotMatch(appJs, /need attention before opening edit mode/);
assert.match(appJs, /return mergeMissingRecord\(entry\);/);
assert.match(appJs, /function mergeCompareValue\(value\)/);
assert.match(appJs, /function mergeStageValue\(value\)/);
assert.match(appJs, /for \(const stage of \["LEAD", "PROSPECT", "CUSTOMER"\]\)/);
assert.match(appJs, /function mergeDateWithinPastDays\(value, days\)/);
assert.match(appJs, /function mergeConflictKeys\(primary, duplicate\)/);
assert.match(appJs, /salesRepOkForMergeDifference/);
assert.match(appJs, /mergeRecordCard\(item\.record, "duplicate", \{[\s\S]*?primary/);
assert.match(appJs, /async function loadMergeRecords\(\)/);
assert.match(appJs, /data-open-merge-edit-id/);
assert.match(appJs, /function mergeRecordTitle\(record, fallback = "Record"\)[\s\S]*?join\(" "\)/);
assert.doesNotMatch(appJs, /function mergeRecordTitle\(record, fallback = "Record"\)[\s\S]*?join\(" \| "\)/);
assert.match(appJs, /function mergePrimaryAutocompleteLabel\(record\)/);
assert.match(appJs, /primaryInternalId:\s*mergeState\.primary\?\.internalId/);
assert.match(appJs, /primaryLabel:\s*mergePrimaryAutocompleteLabel\(mergeState\.primary\)/);
assert.match(appJs, /finally\s*{[\s\S]*?renderMergeReview\(\);[\s\S]*?}/);
assert.match(appJs, /result\.primaryPrefill\?\.reason/);
assert.match(appJs, /\/api\/open-record-merge/);
assert.match(appJs, /async function postJsonWithTimeout\(url, body = \{\}, timeoutMs = 15000\)/);
assert.match(appJs, /AbortController/);
assert.match(appJs, /function isRequestTimeoutError\(error\)/);
assert.match(appJs, /async function postDupeJsonWithTimeout\(url, body = \{\}, timeoutMs = 15000\)/);
assert.match(appJs, /Duplicate Finder request timed out\. Resetting worker and retrying once/);
assert.match(appJs, /await postJson\("\/api\/dupe-stop", \{\}\)\.catch\(\(\) => \{\}\);/);

const dupeSourceResolver = sliceBetween(appJs, "async function resolveDupeSourceRecord(entry) {", "async function findDuplicateCandidates(source) {");
assert.match(dupeSourceResolver, /let lastLookupError = null;/);
assert.match(dupeSourceResolver, /const queries = dupeSourceResolveQueries\(entry\);/);
assert.match(dupeSourceResolver, /postDupeJsonWithTimeout\("\/api\/dupe-record", \{ internalId: entry\.internalId \}, DUPE_RECORD_TIMEOUT_MS\)/);
assert.match(dupeSourceResolver, /postDupeJsonWithTimeout\("\/api\/dupe-search", \{ query, fast: true \}, DUPE_SEARCH_TIMEOUT_MS\)/);
assert.match(dupeSourceResolver, /if \(isWorkerSessionInvalidError\(error\)\) throw error;/);
assert.match(dupeSourceResolver, /lastLookupError = error;/);
assert.match(dupeSourceResolver, /Could not resolve \$\{entry\.raw\}: \$\{lastLookupError\.message\}/);
assert.doesNotMatch(dupeSourceResolver, /postJson(?:WithTimeout)?\("\/api\/(?:search|record)"/);

const dupeCandidateFinder = sliceBetween(appJs, "async function findDuplicateCandidates(source) {", "function cleanRecordId(record) {");
assert.doesNotMatch(dupeCandidateFinder, /if \(candidateIds\.size >= DUPE_CANDIDATE_DETAIL_LIMIT\) break;/);
assert.match(dupeCandidateFinder, /const candidateMap = new Map\(\);/);
assert.match(dupeCandidateFinder, /dupePreviewCandidateScore\(source, item, kind, query/);
assert.match(dupeCandidateFinder, /sort\(\(a, b\) => b\.score - a\.score/);
assert.match(dupeCandidateFinder, /slice\(0, DUPE_CANDIDATE_DETAIL_LIMIT\)/);
assert.match(dupeCandidateFinder, /postDupeJsonWithTimeout\("\/api\/dupe-search", \{ query: `cu:\$\{query\}`, fast: true \}, DUPE_SEARCH_TIMEOUT_MS\)/);
assert.match(dupeCandidateFinder, /postDupeJsonWithTimeout\("\/api\/dupe-record", \{ internalId \}, DUPE_RECORD_TIMEOUT_MS\)/);
assert.match(dupeCandidateFinder, /if \(isWorkerSessionInvalidError\(error\)\) throw error;/);
assert.match(dupeCandidateFinder, /return dupeCompressCandidates\(candidates\);/);
assert.doesNotMatch(dupeCandidateFinder, /postJson(?:WithTimeout)?\("\/api\/(?:search|record)"/);
assert.doesNotMatch(dupeCandidateFinder, /Promise\.all/);

const eligibilitySubmit = sliceBetween(appJs, 'elements.eligibilityForm.addEventListener("submit", async (event) => {', 'elements.dupeForm?.addEventListener("submit", async (event) => {');
assert.match(eligibilitySubmit, /const runId = beginBatchRun\(eligibilityRunState, elements\.verifyEligibilityButton, elements\.eligibilityStopButton, "Verifying\.\.\."\);/);
assert.match(eligibilitySubmit, /startEligibilityElapsedTimer\(\);/);
assert.match(eligibilitySubmit, /if \(isBatchRunStopped\(eligibilityRunState, runId\)\) break;/);
assert.match(eligibilitySubmit, /if \(isBatchRunStopped\(eligibilityRunState, runId\)\) continue;/);
assert.match(eligibilitySubmit, /let forcedStopStatus = null;/);
assert.match(eligibilitySubmit, /forcedStopStatus = workerSessionStoppedMessage\("ROE Checker", rows\.length, entries\.length\);/);
assert.match(eligibilitySubmit, /await postJson\("\/api\/roe-stop", \{\}\)\.catch\(\(\) => \{\}\);/);
assert.match(eligibilitySubmit, /const stopped = isBatchRunStopped\(eligibilityRunState, runId\);/);
assert.match(eligibilitySubmit, /finishBatchRun\(eligibilityRunState, runId, elements\.verifyEligibilityButton, elements\.eligibilityStopButton/);
assert.match(eligibilitySubmit, /stopEligibilityElapsedTimer\(\);/);

const eligibilityResolver = sliceBetween(appJs, "async function resolveEligibilityRecord(entry) {", "async function resolveDupeSourceRecord(entry) {");
assert.match(eligibilityResolver, /postJson\("\/api\/roe-record", \{ internalId: entry\.internalId \}\)/);
assert.match(eligibilityResolver, /postJson\("\/api\/roe-search", \{ query: entry\.query \|\| entry\.raw \}\)/);
assert.match(eligibilityResolver, /postJson\("\/api\/roe-record", \{ internalId: item\.internalId \}\)/);
assert.doesNotMatch(eligibilityResolver, /postJson\("\/api\/(?:search|record)"/);

const dupeSubmit = sliceBetween(appJs, 'elements.dupeForm?.addEventListener("submit", async (event) => {', 'elements.extractSalesRepButton.addEventListener("click", async () => {');
assert.match(dupeSubmit, /const runId = beginBatchRun\(dupeRunState, elements\.dupeFindButton, elements\.dupeStopButton, "Finding\.\.\."\);/);
assert.match(dupeSubmit, /startDupeElapsedTimer\(\);/);
assert.match(dupeSubmit, /if \(isBatchRunStopped\(dupeRunState, runId\)\) break;/);
assert.match(dupeSubmit, /if \(isBatchRunStopped\(dupeRunState, runId\)\) continue;/);
assert.match(dupeSubmit, /let forcedStopStatus = null;/);
assert.match(dupeSubmit, /forcedStopStatus = workerSessionStoppedMessage\("Duplicate Finder", rows\.length, entries\.length\);/);
assert.match(dupeSubmit, /await postJson\("\/api\/dupe-stop", \{\}\)\.catch\(\(\) => \{\}\);/);
assert.match(dupeSubmit, /const stopped = isBatchRunStopped\(dupeRunState, runId\);/);
assert.match(dupeSubmit, /finishBatchRun\(dupeRunState, runId, elements\.dupeFindButton, elements\.dupeStopButton/);
assert.match(dupeSubmit, /stopDupeElapsedTimer\(\);/);
assert.match(appJs, /elements\.eligibilityStopButton\?\.addEventListener\("click"/);
assert.match(appJs, /elements\.dupeStopButton\?\.addEventListener\("click"/);
assert.match(appJs, /postJson\("\/api\/roe-stop", \{\}\)/);
assert.match(appJs, /postJson\("\/api\/dupe-stop", \{\}\)/);
assert.match(appJs, /function dupeClipboardValue\(value\)/);
assert.match(appJs, /function dupeRowsToFhClipboard\(rows\)/);
assert.match(appJs, /function duplicateFinderExportRows\(rows\)/);
assert.match(appJs, /dupeRecordLabel\(item\.record\)[\s\S]*?\.join\("\\n\\n"\)/);
assert.match(appJs, /function eligibilityExportRows\(rows\)/);
assert.match(appJs, /async function exportRowsToDownloads\(options\)/);
assert.match(appJs, /async function openDownloadsFolder\(button, statusElement\)/);
assert.match(appJs, /postJson\("\/api\/result-export"/);
assert.match(appJs, /postJson\("\/api\/open-extract-folder"\)/);
assert.match(appJs, /fileName:\s*"Duplicate_Finder_Results"/);
assert.match(appJs, /fileName:\s*"ROE_Checker_Results"/);
assert.match(appJs, /elements\.dupeCopyFhButton\?\.addEventListener\("click"/);
assert.match(appJs, /elements\.dupeExportButton\?\.addEventListener\("click"/);
assert.match(appJs, /elements\.eligibilityExportButton\?\.addEventListener\("click"/);
assert.match(appJs, /elements\.dupeOpenExtractFolderButton\?\.addEventListener\("click"/);
assert.match(appJs, /elements\.eligibilityOpenExtractFolderButton\?\.addEventListener\("click"/);
assert.match(appJs, /navigator\.clipboard\.writeText\(text\)/);
assert.match(appJs, /showToast\(`Copied \$\{dupeResultRows\.length\} row\(s\) for columns F-H\.`\)/);
assert.match(appJs, /function dupeRecordUrl\(record\)/);
assert.match(appJs, /function dupeRecordLinkHtml\(record\)/);
assert.match(appJs, /function recordValueLinkHtml\(record, value\)/);
const dupeRenderer = sliceBetween(appJs, "function renderDupeRows(rows) {", "function dupeClipboardValue(value) {");
assert.match(appJs, /function clearDupeResults\(message = "No duplicate finder results yet\."\)[\s\S]*?elements\.dupeExportButton\) elements\.dupeExportButton\.disabled = true;/);
assert.match(appJs, /function clearDupeResults\(message = "No duplicate finder results yet\."\)[\s\S]*?elements\.dupeOpenExtractFolderButton\.classList\.add\("hidden"\);/);
assert.match(appJs, /message === "No duplicate finder results yet\."[\s\S]*?noResultsRow\(6, message\)/);
assert.match(dupeRenderer, /elements\.dupeExportButton\) elements\.dupeExportButton\.disabled = !dupeResultRows\.length;/);
assert.match(dupeRenderer, /dupeRecordLinkHtml\(row\.source\)/);
assert.match(dupeRenderer, /dupeRecordLinkHtml\(item\.record\)/);
assert.match(dupeRenderer, /dupeRecordLinkHtml\(row\.master\)/);
assert.doesNotMatch(dupeRenderer, /data-open-id/);
assert.match(appJs, /let recordRegionRules = \{ stateProvinceAliases: \{\}, industryRegionRules: \[\] \};/);
assert.match(appJs, /async function loadRecordRegionRules\(\)/);
assert.match(appJs, /record-region-rules\.json/);
assert.match(appJs, /function normalizeStateProvinceCode\(value\)/);
assert.match(appJs, /function recordRegionForIndustryAndState\(industry, stateProvince, annualRevenue = ""\)/);
assert.match(appJs, /function regionSegmentsWithStateRules\(rule, annualRevenue\)/);
assert.match(appJs, /function territoryRegionToken\(name\)/);
assert.match(appJs, /function territoryRegionForMatch\(territory, rep\)/);
assert.match(appJs, /function recordRegionDisplay\(record\)/);
assert.match(appJs, /function recordRegionBadgeDisplay\(record\)/);
assert.match(appJs, /function recordIndustryRevenueDisplay\(record\)/);
assert.match(appJs, /row\.stateRegion/);
assert.match(appJs, /function clearEligibilityResults\(message = "No eligibility results yet\."\)[\s\S]*?eligibilityResultRows = \[\];[\s\S]*?elements\.eligibilityExportButton\) elements\.eligibilityExportButton\.disabled = true;/);
assert.match(appJs, /function clearEligibilityResults\(message = "No eligibility results yet\."\)[\s\S]*?elements\.eligibilityOpenExtractFolderButton\.classList\.add\("hidden"\);/);
assert.match(appJs, /message === "No eligibility results yet\."[\s\S]*?noResultsRow\(8, message\)/);
assert.match(appJs, /function renderEligibilityRows\(rows\)[\s\S]*?eligibilityResultRows = rows\.slice\(\);[\s\S]*?elements\.eligibilityExportButton\) elements\.eligibilityExportButton\.disabled = !eligibilityResultRows\.length;/);
assert.match(appJs, /<td>\$\{recordValueLinkHtml\(row, row\.internalId\)\}<\/td>/);
assert.match(appJs, /<td>\$\{recordValueLinkHtml\(row, row\.entityId\)\}<\/td>/);
assert.match(appJs, /<td>\$\{recordValueLinkHtml\(row, row\.companyName\)\}<\/td>/);
assert.match(indexHtml, /<th>Sales Rep \/ LSAD Date<\/th>/);
assert.match(appJs, /recordIndustryRevenueHtml\(row, conflicts\)/);
assert.match(appJs, /recordSalesRepLsadHtml\(row, conflicts\)/);
assert.match(appJs, /regionBadge:\s*true/);
assert.match(appJs, /summary-label-spread/);
assert.match(appJs, /class="record-region-badge"/);
assert.match(appJs, /const ELIGIBILITY_CONFLICT_ORDER = \["Industry", "Annual Revenue", "State\/Region", "Sales Rep"\];/);
assert.match(appJs, /conflicts\.push\("State\/Region"\)/);
assert.match(appJs, /conflicts\.push\("Sales Rep"\)/);
assert.match(appJs, /eligibilityConflictNote\(conflicts\)/);
assert.match(appJs, /function eligibilityConflictSet\(row\)/);
assert.match(appJs, /function eligibilityConflictText\(value, conflicts, key\)/);
assert.match(appJs, /class="eligibility-conflict-text"/);
assert.match(appJs, /conflicts:\s*result\.conflicts \|\| \[\]/);
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "advertising-business-services-consulting-transportation"));
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "construction-energy"));
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "consumer-services-financial-services-nonprofits-organizations"));
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "health-hospitality-life-sciences-public-sector"));
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "software"));
assert.ok(recordRegionRules.industryRegionRules.some((rule) => rule.id === "consumer-goods-food-beverage-industrial-equipment"));
{
  const sampleRule = recordRegionRules.industryRegionRules.find((rule) => rule.id === "advertising-business-services-consulting-transportation");
  assert.deepStrictEqual(sampleRule.industries, [
    "Advertising, Media & Publishing",
    "Business Services",
    "Consulting",
    "Transportation",
  ]);
  assert.strictEqual(sampleRule.regions.EAST.includes("NY"), true);
  assert.strictEqual(sampleRule.regions.WEST.includes("CA"), true);
  assert.strictEqual(Object.hasOwn(sampleRule.regions, "CENTRAL"), false);
  assert.strictEqual(sampleRule.segments.some((segment) => segment.tier === "ENT" && segment.region === "NOAM"), true);
}
{
  const sampleRule = recordRegionRules.industryRegionRules.find((rule) => rule.id === "consumer-goods-food-beverage-industrial-equipment");
  assert.strictEqual(sampleRule.regions.WEST.includes("CA"), true);
  assert.strictEqual(sampleRule.regions.CENTRAL.includes("TX"), true);
  assert.strictEqual(sampleRule.regions.CENTRAL.includes("QC"), false);
  assert.strictEqual(sampleRule.regions.CENTRAL_QC.includes("QC"), true);
  assert.strictEqual(sampleRule.regions.SOUTH.includes("AL"), true);
  assert.strictEqual(sampleRule.regions.EAST.includes("NS"), true);
  assert.strictEqual(sampleRule.regions.CENTRAL.includes("NS"), true);
}
assert.match(appJs, /function dupeCompanyNameWithoutInactivePrefix\(value\)/);
assert.match(appJs, /function dupeCompanySearchTerms\(source\)/);
assert.match(appJs, /function dupeSourceResolveQueries\(entry\)/);
assert.match(appJs, /function dupeSourceCompanyId\(entry\)/);
assert.match(appJs, /function chooseDupeSourceSearchItem\(entry, items\)/);
assert.match(appJs, /function dupeCandidateSearchQueries\(source\)/);
assert.match(appJs, /const DUPE_CANDIDATE_DETAIL_LIMIT = 8;/);
assert.match(appJs, /function dupePreviewCandidateScore\(source, item, queryKind, query = "", order = 0\)/);
assert.match(appJs, /const candidateMap = new Map\(\);/);
assert.doesNotMatch(appJs, /if \(candidateIds\.size >= DUPE_CANDIDATE_DETAIL_LIMIT\) break;/);

const dupeNameHelpers = sliceBetween(appJs, "function mergeWebDomainParts(value) {", "function dupeStage(record) {");
const testDupeNames = new Function(`${dupeNameHelpers}; return { dupeCompanyNameWithoutInactivePrefix, normalizeCompanyName, dupeCompanySearchTerms, dupeSourceResolveQueries, dupeSourceCompanyId, chooseDupeSourceSearchItem, dupeCandidateSearchQueries, parseDomainSearchEntries };`)();
assert.strictEqual(testDupeNames.dupeCompanyNameWithoutInactivePrefix("12487186 INACTIVE_Moffitt Corp."), "Moffitt Corp.");
assert.strictEqual(testDupeNames.normalizeCompanyName("INACTIVE_Moffitt Corp."), "moffitt");
assert.strictEqual(testDupeNames.normalizeCompanyName("Moffitt Corporation, Inc."), "moffitt");
assert.deepStrictEqual(
  testDupeNames.dupeCompanySearchTerms({ companyName: "INACTIVE_Moffitt Corp." }),
  ["Moffitt"],
);
assert.deepStrictEqual(
  testDupeNames.dupeCompanySearchTerms({ companyName: "MAI Capital Management" }),
  ["MAI Capital Management"],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "MAI Capital Management",
    webAddress: "http://mai.capital",
  }),
  [
    { query: "mai.capital", kind: "domain-exact" },
    { query: "MAI Capital Management", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.parseDomainSearchEntries("sq uare- enix . com\nbandai. com").map((entry) => entry.domain),
  ["square-enix.com", "bandai.com"],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Stored Energy Holdings, Inc",
    webAddress: "",
    email: "jtilly@northeastbattery.com",
  }),
  [
    { query: "northeastbattery.com", kind: "domain-exact" },
    { query: "Stored Energy Holdings", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Stored Energy Holdings, Inc",
    webAddress: "https://storedenergy.com",
    email: "jtilly@northeastbattery.com",
  }),
  [
    { query: "storedenergy.com", kind: "domain-exact" },
    { query: "northeastbattery.com", kind: "email-domain" },
    { query: "Stored Energy Holdings", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Stored Energy Holdings, Inc",
    webAddress: "https://northeastbattery.com",
    email: "jtilly@northeastbattery.com",
  }),
  [
    { query: "northeastbattery.com", kind: "domain-exact" },
    { query: "Stored Energy Holdings", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Gmail Test Company",
    webAddress: "",
    email: "owner@gmail.com",
  }),
  [
    { query: "Gmail Test Company", kind: "name" },
    { query: "Gmail Test", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Yahoo Test Company",
    webAddress: "",
    email: "owner@yahoo.com",
  }),
  [
    { query: "Yahoo Test Company", kind: "name" },
    { query: "Yahoo Test", kind: "name" },
  ],
);
assert.deepStrictEqual(
  testDupeNames.dupeCompanySearchTerms({ companyName: "Ground Solutions | Bedrock Slingers" }),
  ["Ground Solutions | Bedrock Slingers", "Ground Solutions Bedrock Slingers", "Ground Solutions", "Bedrock Slingers"],
);
assert.deepStrictEqual(
  testDupeNames.dupeCompanySearchTerms({ companyName: "StepStone Group" }),
  ["StepStone Group"],
);
assert.deepStrictEqual(
  testDupeNames.dupeCandidateSearchQueries({
    companyName: "Ground Solutions | Bedrock Slingers",
    webAddress: "https://groundsolutionsco.com",
  }),
  [
    { query: "groundsolutionsco.com", kind: "domain-exact" },
    { query: "Ground Solutions | Bedrock Slingers", kind: "name" },
    { query: "Ground Solutions Bedrock Slingers", kind: "name" },
    { query: "Ground Solutions", kind: "name" },
    { query: "Bedrock Slingers", kind: "name" },
  ],
);
assert.doesNotMatch(appJs, /domain-broad/);
assert.deepStrictEqual(
  testDupeNames.dupeSourceResolveQueries({ raw: "12441314 MAI Capital Management", query: "12441314 MAI Capital Management" }),
  ["cu:12441314", "cu:MAI Capital Management"],
);
assert.deepStrictEqual(
  testDupeNames.dupeSourceResolveQueries({ raw: "cu:12441314 MAI Capital Management", query: "cu:12441314 MAI Capital Management" }),
  ["cu:12441314", "cu:MAI Capital Management"],
);
assert.strictEqual(testDupeNames.dupeSourceCompanyId({ raw: "57085 True Commerce, Inc." }), "57085");
assert.strictEqual(
  testDupeNames.chooseDupeSourceSearchItem(
    { raw: "57085 True Commerce, Inc." },
    [
      { internalId: "56117108", title: "5528205 Rock Castle Construction 57085" },
      { internalId: "56222073", title: "5532618 Rock Castle Construction 57085" },
      { internalId: "42817394", title: "57085 True Commerce, Inc." },
    ],
  )?.internalId,
  "42817394",
);
assert.strictEqual(
  testDupeNames.chooseDupeSourceSearchItem(
    { raw: "57085 True Commerce, Inc." },
    [{ internalId: "56117108", title: "5528205 Rock Castle Construction 57085" }],
  ),
  null,
);

const dupeMasterHelpers = sliceBetween(appJs, "function mergeCompareValue(value) {", "function mergeAddressCountry(value) {");
const testDupeMasters = new Function(`const displayValue = (value) => String(value || "---"); ${dupeMasterHelpers}; return { dupeCandidateMatches, dupeIsCustomerWon, dupePreviewLooksPromising, dupePreviewCandidateScore, chooseDupeMaster, dupeCompressCandidates };`)();
assert.strictEqual(testDupeMasters.dupeIsCustomerWon({ status: "CUSTOMER-CLOSED WON" }), true);
assert.strictEqual(testDupeMasters.dupeIsCustomerWon({ status: "Customer Closed Won" }), true);
assert.strictEqual(testDupeMasters.dupeIsCustomerWon({ status: "CUSTOMER-Non Licensed" }), false);
assert.strictEqual(testDupeMasters.dupeIsCustomerWon({ status: "CUSTOMER-NON RENEWING" }), false);
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "10005025", companyName: "Switchback Advisors (US) LLC (SI)", status: "CUSTOMER-Non Licensed", internalId: "10005025" },
    [{ entityId: "11964559", companyName: "Switchback Advisors LLC", status: "CUSTOMER-CLOSED WON", internalId: "11964559" }],
  );
  assert.strictEqual(result.master.entityId, "11964559");
  assert.strictEqual(result.reason, "Customer-Won record selected");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "11886428 Stored Energy Holdings, Inc", companyName: "Stored Energy Holdings, Inc", status: "LEAD-LOST", internalId: "11886428" },
    [{ entityId: "11344174 Stored Energy Holdings", companyName: "Stored Energy Holdings", status: "LEAD-IN PROCESS", internalId: "11344174" }],
  );
  assert.strictEqual(result.master.entityId, "11344174 Stored Energy Holdings");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "1000 Lead Lost", companyName: "Lead Lost", status: "LEAD-LOST", internalId: "1000" },
    [{ entityId: "9000 Lead Duplicate", companyName: "Lead Duplicate", status: "LEAD-DUPLICATE", internalId: "9000" }],
  );
  assert.strictEqual(result.master.entityId, "1000 Lead Lost");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "1000 Lead Winner", companyName: "Lead Winner", status: "LEAD-IN PROCESS", internalId: "1000" },
    [{ entityId: "9000 Prospect Bronto", companyName: "Prospect Bronto", status: "PROSPECT-BRONTO - NURTURE (NEW)", internalId: "9000" }],
  );
  assert.strictEqual(result.master.entityId, "1000 Lead Winner");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "9000 Prospect Lost", companyName: "Prospect Lost", status: "PROSPECT-Prospect LOST", internalId: "9000" },
    [{ entityId: "1000 Prospect Active", companyName: "Prospect Active", status: "PROSPECT-IN PROCESS", internalId: "1000" }],
  );
  assert.strictEqual(result.master.entityId, "1000 Prospect Active");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "9000 Customer Lost", companyName: "Customer Lost", status: "CUSTOMER-LOST", internalId: "9000" },
    [{ entityId: "1000 Customer Active", companyName: "Customer Active", status: "CUSTOMER-Non Licensed", internalId: "1000" }],
  );
  assert.strictEqual(result.master.entityId, "1000 Customer Active");
}
assert.deepStrictEqual(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "Breadwinner", webAddress: "https://breadwinnerbreads.com", internalId: "5925797" },
    { companyName: "Breadwinners Foods Corporation", webAddress: "https://cocopan.com.ph", internalId: "11640338" },
  ),
  [],
);
assert.ok(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "StepStone Group", webAddress: "https://stepstonegroup.com", zoomInfoCompanyId: "36652039", internalId: "211037774" },
    { companyName: "StepStone Group LP", webAddress: "https://stepstoneglobal.com", zoomInfoCompanyId: "36652039", internalId: "27504318" },
  ).includes("Exact company name"),
);
assert.strictEqual(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "StepStone Group", webAddress: "https://stepstonegroup.com", zoomInfoCompanyId: "36652039", internalId: "211037774" },
    { companyName: "StepStone Group LP", webAddress: "https://stepstoneglobal.com", zoomInfoCompanyId: "27504318", internalId: "27504318" },
  ).includes("Same ZoomInfo Company ID"),
  false,
);
assert.deepStrictEqual(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "Stored Energy Holdings, Inc", email: "jtilly@northeastbattery.com", internalId: "11886428" },
    { companyName: "Northeast Battery & Alternator", webAddress: "https://northeastbattery.com", internalId: "437039" },
  ),
  [],
);
assert.ok(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "Moffitt Corp.", email: "info@moffitt.com", internalId: "12487186" },
    { companyName: "Moffitt Corporation, Inc.", webAddress: "https://moffitt.com", internalId: "5787771" },
  ).includes("Same web domain"),
);
assert.ok(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "Gutters Example", email: "person@gmail.com", internalId: "1" },
    { companyName: "GuttersDirect.com", webAddress: "https://guttersdirect.com", internalId: "2" },
  ).length === 0,
);
assert.ok(
  testDupeMasters.dupeCandidateMatches(
    { companyName: "Ground Solutions | Bedrock Slingers", webAddress: "https://groundsolutionsco.com", internalId: "11026831" },
    { companyName: "Bedrock LLC", email: "info@bedrockslingers.com", internalId: "11027340" },
  ).length === 0,
);
assert.strictEqual(
  testDupeMasters.dupePreviewLooksPromising(
    { companyName: "Ground Solutions | Bedrock Slingers" },
    { title: "11027340 Bedrock LLC", text: "CUSTOMER-CLOSED WON" },
    "name",
    "Bedrock Slingers",
  ),
  true,
);
assert.strictEqual(
  testDupeMasters.dupePreviewLooksPromising(
    { companyName: "StepStone Group", internalId: "12335216" },
    { title: "4469338 StepStone Group LP", text: "CUSTOMER-CLOSED WON" },
    "name",
    "StepStone Group",
  ),
  true,
);
assert.ok(
  testDupeMasters.dupePreviewCandidateScore(
    { companyName: "StepStone Group", internalId: "12335216" },
    { title: "4469338 StepStone Group LP", text: "CUSTOMER-CLOSED WON" },
    "name",
    "StepStone Group",
  ) > testDupeMasters.dupePreviewCandidateScore(
    { companyName: "StepStone Group", internalId: "12335216" },
    { title: "12445346 StepStone Group", text: "LEAD-IN PROCESS" },
    "name",
    "StepStone Group",
  ),
);
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "12335216 StepStone Group", companyName: "StepStone Group", status: "LEAD-IN PROCESS", internalId: "12335216" },
    [{ entityId: "4469338 StepStone Group LP", companyName: "StepStone Group LP", status: "CUSTOMER-CLOSED WON", internalId: "4469338" }],
  );
  assert.strictEqual(result.master.internalId, "4469338");
  assert.strictEqual(result.reason, "Customer-Won record selected");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "100 Customer Same", companyName: "Customer Same", status: "CUSTOMER-CLOSED WON", internalId: "100" },
    [{ entityId: "900 Customer Same Dupe", companyName: "Customer Same Dupe", status: "CUSTOMER-CLOSED WON", internalId: "900" }],
  );
  assert.strictEqual(result.master.entityId, "100 Customer Same");
}
{
  const result = testDupeMasters.chooseDupeMaster(
    { entityId: "1000 Lead Same", companyName: "Lead Same", status: "LEAD-IN PROCESS", internalId: "1000" },
    [{ entityId: "9000 Lead Same Dupe", companyName: "Lead Same Duplicate", status: "LEAD-IN PROCESS", internalId: "9000" }],
  );
  assert.strictEqual(result.master.entityId, "1000 Lead Same");
}
{
  const compressed = testDupeMasters.dupeCompressCandidates([
    { record: { entityId: "100 Lead In Process", status: "LEAD-IN PROCESS", internalId: "100" }, reasons: ["Similar company name"] },
    { record: { entityId: "200 Lead New", status: "LEAD-NEW", internalId: "200" }, reasons: ["Similar company name"] },
    { record: { entityId: "300 Customer Won", status: "CUSTOMER-CLOSED WON", internalId: "300" }, reasons: ["Similar company name"] },
    { record: { entityId: "400 Customer Non Licensed", status: "CUSTOMER-Non Licensed", internalId: "400" }, reasons: ["Similar company name"] },
    { record: { entityId: "500 Customer Non Renewing", status: "CUSTOMER-NON RENEWING", internalId: "500" }, reasons: ["Similar company name"] },
  ]);
  assert.deepStrictEqual(
    compressed.map((item) => item.record.entityId),
    ["300 Customer Won", "400 Customer Non Licensed", "100 Lead In Process"],
  );
}
assert.match(appJs, /const DUPE_CANDIDATE_DETAIL_LIMIT = 8;/);

const eligibilityHelpers = sliceBetween(appJs, "function normalizeIndustryText(value) {", "function renderEligibilityRows(rows) {");
const testEligibility = new Function(`let recordRegionRules = ${JSON.stringify(recordRegionRules)}; function escapeHtml(value) { return String(value || ""); } function displayValue(value) { const text = String(value ?? "").trim(); return text || "---"; } function isHybridSalesRep(rep) { return Boolean(rep?.hybrid); } ${eligibilityHelpers}; return { normalizeStateProvinceCode, recordStateProvinceCode, recordRegionForIndustryAndState, recordRegionInfo, territoryRegionToken, territoryRegionForMatch, recordRegionDisplay, recordRegionBadgeDisplay, recordIndustryRevenueDisplay, evaluateLeadEligibility };`)();
function dateTextDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Transportation",
      annualRevenue: "$50M to $100M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
      salesRep: "Stone, Ryley",
      lsadDate: dateTextDaysAgo(2),
    },
    {
      name: "Stone, Ryley",
      territories: [
        { name: "2027-BizSvcs-CORP-OB-WEST", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Eligible");
  assert.strictEqual(result.notes, "No conflicts encountered");
}
assert.strictEqual(testEligibility.normalizeStateProvinceCode("California"), "CA");
assert.strictEqual(testEligibility.normalizeStateProvinceCode("CA"), "CA");
assert.strictEqual(testEligibility.normalizeStateProvinceCode("Quebec"), "QC");
assert.strictEqual(
  testEligibility.recordStateProvinceCode({ address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States" }),
  "CA",
);
assert.deepStrictEqual(
  {
    region: testEligibility.recordRegionForIndustryAndState("Transportation", "CA", "$400M").region,
    stateProvince: testEligibility.recordRegionForIndustryAndState("Transportation", "CA", "$400M").stateProvince,
  },
  { region: "WEST", stateProvince: "CA" },
);
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Transportation", "Alabama", "$400M").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Business Services", "New York", "$100M+").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Consulting", "Puerto Rico", "$50M to $100M").region, "WEST");
assert.strictEqual(testEligibility.territoryRegionToken("2027-BizSvcs-ENT-OB-WEST"), "WEST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Construction & Energy", "Illinois", "$50M to $100M").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Construction & Energy", "Manitoba", "$50M to $100M").region, "WEST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Financial Services", "Louisiana", "$5M").region, "WEST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Hospitality", "Arkansas", "$15M").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Software", "Texas", "$100M+").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Software", "California", "$50M to $100M").region, "WEST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Food & Beverage", "California", "$50M to $100M").region, "WEST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Industrial & Equipment", "Texas", "$50M to $100M").region, "CENTRAL");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Industrial & Equipment", "Texas", "$400M").region, "EAST");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Consumer Goods", "Quebec", "$50M to $100M").region, "CENTRAL_QC");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Consumer Goods", "Alabama", "$5M").region, "SOUTH");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Consumer Goods", "Ohio", "$5M").region, "SOUTH");
assert.strictEqual(testEligibility.recordRegionForIndustryAndState("Consumer Goods", "Ohio", "$400M").region, "EAST");
assert.deepStrictEqual(testEligibility.recordRegionForIndustryAndState("Consumer Goods", "Nova Scotia", "$50M to $100M").regions, ["CENTRAL", "EAST"]);
assert.strictEqual(testEligibility.territoryRegionToken("2027-PROD-LMM-IB-CENTRAL_QC"), "CENTRAL_QC");
assert.strictEqual(testEligibility.territoryRegionToken("2027-PROD-CORP-SOUTH"), "SOUTH");
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Construction & Energy",
      annualRevenue: "$5M to $10M",
      billingStateProvince: "TX",
      salesRep: "nurturing, marketing",
      lsadDate: dateTextDaysAgo(45),
    },
    {
      salesSubRegion: "CENTRAL",
      territories: [
        { name: "2027-PROD-LMM-OB-CENTRAL", industry: "Consumer Goods, Food & Beverage, Industrial & Equipment" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "Industry conflict");
  assert.deepStrictEqual(result.conflicts, ["Industry"]);
}
assert.strictEqual(
  testEligibility.recordRegionDisplay({
    industry: "Software",
    annualRevenue: "$50M to $100M",
    address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
  }),
  "CA (WEST)",
);
assert.strictEqual(
  testEligibility.recordRegionDisplay({
    industry: "Consumer Goods",
    annualRevenue: "$50M to $100M",
    billingStateProvince: "Quebec",
  }),
  "QC (CENTRAL_QC)",
);
assert.strictEqual(
  testEligibility.recordRegionBadgeDisplay({
    industry: "Consumer Goods",
    annualRevenue: "$50M to $100M",
    billingStateProvince: "Quebec",
  }),
  "CENTRAL_QC",
);
assert.strictEqual(
  testEligibility.recordRegionDisplay({
    industry: "Consumer Goods",
    annualRevenue: "$2M to $5M",
    billingStateProvince: "Quebec",
  }),
  "QC (CENTRAL_QC)",
);
assert.strictEqual(
  testEligibility.recordIndustryRevenueDisplay({ industry: "Software", annualRevenue: "$10M to $20M" }),
  "Software / $10M to $20M",
);
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Transportation",
      annualRevenue: "$50M to $100M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
      salesRep: "Stone, Ryley",
      lsadDate: dateTextDaysAgo(10),
    },
    {
      territories: [
        { name: "2027-BizSvcs-CORP-OB-WEST", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "Sales Rep conflict");
  assert.deepStrictEqual(result.conflicts, ["Sales Rep"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Transportation",
      annualRevenue: "$50M to $100M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
      salesRep: "nurturing, marketing",
      lsadDate: dateTextDaysAgo(10),
    },
    {
      territories: [
        { name: "2027-BizSvcs-CORP-OB-WEST", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Eligible");
  assert.strictEqual(result.notes, "No conflicts encountered");
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Transportation",
      annualRevenue: "$50M to $100M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
      salesRep: "Stone, Ryley",
      lsadDate: dateTextDaysAgo(45),
    },
    {
      territories: [
        { name: "2027-BizSvcs-CORP-OB-WEST", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Eligible");
  assert.strictEqual(result.notes, "No conflicts encountered");
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Transportation",
      annualRevenue: "$50M to $100M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
    },
    {
      territories: [
        { name: "2027-BizSvcs-CORP-OB-EAST", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Software",
      annualRevenue: "$0 to $10M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
    },
    {
      salesSubRegion: "EAST",
      territories: [
        { name: "2027-SFT-MM", industry: "Software" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Software",
      annualRevenue: "$100M+",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
    },
    {
      salesSubRegion: "EAST",
      territories: [
        { name: "2027-SFT-LMM", industry: "Software" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "Annual Revenue and State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["Annual Revenue", "State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Software",
      annualRevenue: "$0 to $10M",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
    },
    {
      salesSubRegion: "EAST",
      territories: [
        { name: "2027-BizSvcs-LMM-OB", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "Industry and State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["Industry", "State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Software",
      annualRevenue: "$100M+",
      address: "Sample Company\n123 Main St\nIrvine CA 92602\nUnited States",
    },
    {
      salesSubRegion: "EAST",
      territories: [
        { name: "2027-BizSvcs-LMM-OB", industry: "Advertising, Media & Publishing, Business Services, Consulting, Transportation" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "Industry, Annual Revenue, and State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["Industry", "Annual Revenue", "State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Consumer Goods",
      annualRevenue: "$2M to $5M",
      billingStateProvince: "Quebec",
      salesRep: "nurturing, marketing",
      lsadDate: dateTextDaysAgo(45),
    },
    {
      salesSubRegion: "CENTRAL",
      territories: [
        { name: "2027-PROD-LMM-IB-CENTRAL", industry: "Consumer Goods, Food & Beverage, Industrial & Equipment" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Not Eligible");
  assert.strictEqual(result.notes, "State/Region conflict");
  assert.deepStrictEqual(result.conflicts, ["State/Region"]);
}
{
  const result = testEligibility.evaluateLeadEligibility(
    {
      industry: "Consumer Goods",
      annualRevenue: "$2M to $5M",
      billingStateProvince: "Quebec",
      salesRep: "nurturing, marketing",
      lsadDate: dateTextDaysAgo(45),
    },
    {
      salesSubRegion: "CENTRAL_QC",
      territories: [
        { name: "2027-PROD-LMM-IB-CENTRAL_QC", industry: "Consumer Goods, Food & Beverage, Industrial & Equipment" },
      ],
    },
  );
  assert.strictEqual(result.eligibility, "Eligible");
  assert.strictEqual(result.notes, "No conflicts encountered");
}

const salesRepSearch = sliceBetween(serverJs, "function salesRepSearchExpression(query) {", "function salesRepParseExpression(internalId) {");
assert.match(salesRepSearch, /const safeResultMethod = \(result, methodName, \.\.\.args\) =>/);
assert.match(salesRepSearch, /safeResultMethod\(result, "getRecordType"\)/);
assert.match(salesRepSearch, /safeResultMethod\(result, "getId"\)/);
assert.match(salesRepSearch, /ubersearchresults\.nl/);
assert.match(salesRepSearch, /Uber_NAMEtype", "KEYWORDSTARTSWITH"/);
assert.match(salesRepSearch, /const queries = \/\^emp:\/i\.test\(query\) \? \[query\] : \["emp:" \+ query\];/);
assert.match(salesRepSearch, /const addItemsFromRows = \(rows, items, seen\) =>/);
assert.doesNotMatch(salesRepSearch, /result\.getRecordType\?\.\(\)|result\.getId\?\.\(\)/);

const generalSearch = sliceBetween(serverJs, "function searchExpression(query, options = {}) {", "function salesRepSearchExpression(query) {");
assert.match(generalSearch, /const safeResultMethod = \(result, methodName, \.\.\.args\) =>/);
assert.match(generalSearch, /const resultList = \(results\) =>/);
assert.match(generalSearch, /const fast = Boolean\(options\.fast\);/);
assert.match(generalSearch, /const zoomInfoSearchId = \(text\) =>/);
assert.match(generalSearch, /custentity_zoominfo_compid/);
assert.match(generalSearch, /const searchZoomInfoCompanyId = async \(zoomInfoId\) =>/);
assert.match(generalSearch, /mode: "zoominfo"/);
assert.match(generalSearch, /\^zi\\\\s\*:/);
assert.match(generalSearch, /if \(fast\) \{/);
assert.match(generalSearch, /ubersearchresults\.nl/);
assert.match(generalSearch, /Uber_NAMEtype", "KEYWORDSTARTSWITH"/);
assert.match(generalSearch, /const searchText = \/\^cu:\/i\.test\(query\) \? query : "cu:" \+ query;/);
assert.match(generalSearch, /const makeItemsFromRows = \(rows, defaultKind = ""\) =>/);
assert.match(generalSearch, /const defaultKindFromSearchPage = \(result\) =>/);
assert.match(generalSearch, /customer results\|searchtype=Customer/);
assert.match(generalSearch, /const kindIndex = cells\.findIndex\(\(cell\) => normalizeKind\("", cell\)\);/);
assert.match(generalSearch, /const titleIndex = kindIndex === 0 \? 2 : kindIndex > 0 \? kindIndex \+ 1 : 2;/);
assert.match(generalSearch, /const items = makeItemsFromRows\(directResult\.rows, defaultKindFromSearchPage\(directResult\)\);/);
assert.match(generalSearch, /type: kindIndex >= 0 \? cells\[kindIndex\] \|\| kind : kind,/);
assert.match(generalSearch, /safeResultMethod\(result, "getRecordType"\)/);
assert.match(generalSearch, /safeResultMethod\(result, "getId"\)/);
assert.match(generalSearch, /safeResultMethod\(result, "getValue", name\)/);
assert.doesNotMatch(generalSearch, /result\.getRecordType\?\.\(\)|result\.getId\?\.\(\)|result\.getValue\?\.\(name\)|Array\.from\(results \|\| \[\]\)/);
assert.match(indexHtml, /Search using ZoomInfo\?/);
assert.match(indexHtml, /zi:&lt;ZoomInfo Company ID&gt;/);
assert.match(indexHtml, /zi:&lt;ZoomInfo ID&gt;/);
assert.match(appJs, /Type any number, text, URL, or zi:<ZoomInfo ID>/);

assert.match(serverJs, /async function writeResultExport\(exportRequest\)/);
assert.match(serverJs, /headers\.map\(csvEscape\)\.join\(","\)/);
assert.match(serverJs, /normalizedRows\.map\(\(row\) => row\.map\(csvEscape\)\.join\(","\)\)/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/result-export"/);
assert.match(serverJs, /const WORKER_TAB_TITLE = "Search and Merge Worker";/);
assert.match(serverJs, /const DUPE_WORKER_TAB_TITLE = "Duplicate Finder Worker";/);
assert.match(serverJs, /const ROE_WORKER_TAB_TITLE = "ROE Checker Worker";/);
assert.match(serverJs, /const TERRITORY_WORKER_TAB_TITLE = "Territories Worker";/);
assert.match(serverJs, /const SESSION_INVALID_ERROR_CODE = "NSCORP_SESSION_INVALID";/);
assert.match(serverJs, /const SESSION_INVALID_MESSAGE = "NSCORP session appears disconnected or hijacked/);
assert.match(serverJs, /const WORKER_LANES = \{/);
assert.match(serverJs, /dupe:\s*\{[\s\S]*?title:\s*DUPE_WORKER_TAB_TITLE/);
assert.match(serverJs, /roe:\s*\{[\s\S]*?title:\s*ROE_WORKER_TAB_TITLE/);
assert.match(serverJs, /territory:\s*\{[\s\S]*?title:\s*TERRITORY_WORKER_TAB_TITLE/);
assert.match(serverJs, /legacyTitles:\s*\["NSCORP Companion Worker"\]/);
assert.match(serverJs, /legacyTitles:\s*\["Duplicate Helper Tab"\]/);
assert.match(serverJs, /legacyTitles:\s*\["ROE Helper Tab"\]/);
assert.match(serverJs, /function workerLane\(lane = "main"\)/);
assert.match(serverJs, /async function ensureWorkerTab\(lane = "main"\)/);
assert.match(serverJs, /const laneState = workerLane\(lane\);/);
assert.match(serverJs, /await labelWorkerTab\(client, laneState\.title\);/);
assert.match(serverJs, /function queueWorkerTask\(task, lane = "main"\)/);
assert.match(serverJs, /async function evaluateInWorkerChrome\(expression, timeout = 45000, lane = "main"\)/);
assert.match(serverJs, /async function evaluateInDupeWorkerChrome\(expression, timeout = 45000\)/);
assert.match(serverJs, /async function evaluateInDupeWorkerChromeChecked\(expression, timeout = 45000, resultMessage = \(\) => ""\)/);
assert.match(serverJs, /const DOMAIN_WORKER_TAB_TITLE = "Domain Search Worker";/);
assert.match(serverJs, /function territoryCatalogExpression\(\)/);
assert.match(serverJs, /territorymanager\.nl`;/);
assert.doesNotMatch(serverJs, /territorymanager\.nl\?sales=T/);
assert.match(serverJs, /const descriptionFromRow = \(row, name, internalId\) => \{/);
assert.match(serverJs, /const looksLikeDescription = \(value\) => \{[\s\S]*?affiliate list[\s\S]*?south america partners[\s\S]*?lead source/);
assert.match(serverJs, /const normalizeTerritoryPair = \(name, description\) => \{[\s\S]*?looksLikeDescription\(cleanTerritoryName\)[\s\S]*?looksLikeTerritoryName\(cleanDescription\)/);
assert.match(serverJs, /anchorText && !isActionText\(anchorText\) && anchorText !== internalId && !looksLikeDescription\(anchorText\)/);
assert.match(serverJs, /salesterritorylist\.nl\?searchtype=SalesTerritory/);
assert.match(serverJs, /const isLoginDocument = \(doc, text\) => \{/);
assert.match(serverJs, /if \(!parsedItems\.length && isLoginDocument\(doc, text\)\) \{/);
assert.match(serverJs, /req\.method === "GET" && req\.url === "\/api\/territories"/);
assert.match(serverJs, /evaluateInTerritoryWorkerChrome\(territoryCatalogExpression\(\), 60000\)/);
assert.match(serverJs, /throwIfWorkerSessionInvalidResult\(result, TERRITORY_WORKER_TAB_TITLE\);/);
assert.match(serverJs, /domain:\s*\{ title: DOMAIN_WORKER_TAB_TITLE, legacyTitles: \["Doman Search Worker"\]/);
assert.match(serverJs, /async function evaluateInDomainWorkerChrome\(expression, timeout = 45000\)/);
assert.match(serverJs, /async function evaluateInDomainWorkerChromeChecked\(expression, timeout = 45000, resultMessage = \(\) => ""\)/);
assert.match(serverJs, /async function evaluateInRoeWorkerChrome\(expression, timeout = 45000\)/);
assert.match(serverJs, /async function evaluateInTerritoryWorkerChrome\(expression, timeout = 45000\)/);
assert.match(serverJs, /function recoverableDupeResultMessage\(result\)/);
assert.match(serverJs, /function sessionInvalidError\(message = SESSION_INVALID_MESSAGE\)/);
assert.match(serverJs, /function throwIfWorkerSessionInvalidResult\(result, workerTitle\)/);
assert.match(serverJs, /throw sessionInvalidError\(\);/);
assert.match(serverJs, /throw sessionInvalidError\(lastMessage \|\| "Duplicate Finder Worker needs a live NetSuite login/);
assert.match(serverJs, /function workerStoppedError\(message = "NetSuite worker task was stopped\."\)/);
assert.match(serverJs, /async function resetWorkerLane\(lane = "dupe"\)/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/roe-stop"/);
assert.match(serverJs, /const result = await resetWorkerLane\("roe"\);/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/roe-search"/);
assert.match(serverJs, /evaluateInRoeWorkerChrome\([\s\S]*?searchExpression\(query, \{ fast: Boolean\(fast\) \}\),[\s\S]*?fast \? 15000 : 45000/);
assert.match(serverJs, /throwIfWorkerSessionInvalidResult\(result, ROE_WORKER_TAB_TITLE\);/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/roe-record"/);
assert.match(serverJs, /evaluateInRoeWorkerChrome\([\s\S]*?recordParseExpression\(internalId, \{ includeRelated \}\)/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/dupe-search"/);
assert.match(serverJs, /evaluateInDupeWorkerChromeChecked\([\s\S]*?searchExpression\(query, \{ fast: Boolean\(fast\) \}\),[\s\S]*?fast \? 15000 : 45000/);
assert.match(serverJs, /throwIfWorkerSessionInvalidResult\(result, DUPE_WORKER_TAB_TITLE\);/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/domain-search"/);
assert.match(serverJs, /evaluateInDomainWorkerChromeChecked\([\s\S]*?searchExpression\(query, \{ fast: Boolean\(fast\) \}\),[\s\S]*?fast \? 15000 : 45000/);
assert.match(serverJs, /throwIfWorkerSessionInvalidResult\(result, DOMAIN_WORKER_TAB_TITLE\);/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/domain-record"/);
assert.match(serverJs, /evaluateInDomainWorkerChromeChecked\([\s\S]*?recordParseExpression\(internalId, \{ includeRelated \}\)/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/dupe-record"/);
assert.match(serverJs, /evaluateInDupeWorkerChromeChecked\([\s\S]*?recordParseExpression\(internalId, \{ includeRelated \}\)/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/dupe-stop"/);
assert.match(serverJs, /const result = await resetWorkerLane\("dupe"\);/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/domain-stop"/);
assert.match(serverJs, /const result = await resetWorkerLane\("domain"\);/);
assert.match(serverJs, /sendJson\(res, 400, \{ ok: false, error: error\.message \|\| String\(error\), code: error\.code \|\| "" \}\)/);

const recoverableWorkerHelper = sliceBetween(serverJs, "function isRecoverableWorkerErrorText(text) {", "async function evaluateInChrome");
const testRecoverableWorker = new Function(`${recoverableWorkerHelper}; return { isRecoverableWorkerErrorText, isRecoverableChromeProtocolError, recoverableDupeResultMessage };`)();
assert.strictEqual(
  testRecoverableWorker.isRecoverableWorkerErrorText("'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them"),
  true,
);
assert.strictEqual(
  testRecoverableWorker.isRecoverableWorkerErrorText("NetSuite global search helper is not available on this page."),
  true,
);
assert.strictEqual(
  testRecoverableWorker.isRecoverableChromeProtocolError(new Error("{\"code\":-32000,\"message\":\"Inspected target navigated or closed\"}")),
  true,
);
assert.match(
  testRecoverableWorker.recoverableDupeResultMessage({ ok: false, loginLikely: true }),
  /Duplicate Finder Worker/,
);

assert.match(appJs, /async function postDomainJsonWithTimeout/);
assert.match(appJs, /Domain Search request timed out\. Resetting worker and retrying once/);
assert.match(appJs, /await postJson\("\/api\/domain-stop", \{\}\)\.catch\(\(\) => \{\}\)/);
assert.match(appJs, /function domainCandidateSummary\(record\)/);
assert.match(appJs, /return `\$\{displayValue\(record\?\.status\)\} \| \$\{displayValue\(record\?\.salesRep\)\}`;/);
assert.match(appJs, /function domainCandidateReasons\(domain, record\)/);
assert.match(appJs, /return \[domainCandidateSummary\(record\)\];/);
assert.doesNotMatch(appJs, /Domain search result/);
assert.doesNotMatch(appJs, /Review: search result matched domain text/);
assert.match(appJs, /function domainMasterResultForCandidates\(candidates\)/);
assert.match(appJs, /async function domainCandidatesFromSearchItems\(domain, items\)/);
assert.match(appJs, /postDomainJsonWithTimeout\("\/api\/domain-search"/);
assert.match(appJs, /postDomainJsonWithTimeout\("\/api\/domain-search", \{ query: `cu:\$\{entry\.domain\}`, fast: true \}, DUPE_RECORD_TIMEOUT_MS\)/);
assert.match(appJs, /domainCandidatesFromSearchItems\(entry\.domain, searchItems\)/);
assert.match(appJs, /headers: \["Input", "Search Domain", "Potential Master", "Column F: Master Record", "Column G: Status \/ Stage", "Column H: Sales Rep", "Reason"\]/);
assert.match(appJs, /row\.items\.map\(\(item\) => `\$\{dupeClipboardValue\(dupeRecordLabel\(item\.record\)\)\} - \$\{dupeClipboardValue\(item\.reasons\?\.join\(", "\)\)\}`\)\.join\("\\n\\n"\)/);
assert.match(stylesCss, /\.domain-table \{\s*min-width: 1500px;/);
assert.match(stylesCss, /\.dupe-master-cell\.review/);

const relatedBackend = sliceBetween(serverJs, "const relatedRecords = () => ({", "});");
assert.match(relatedBackend, /key:\s*"date",\s*source:\s*"trandate"/);
assert.match(relatedBackend, /opportunities:[\s\S]*?editUrl:[\s\S]*?"\/app\/accounting\/transactions\/opprtnty\.nl\?id="/);
assert.match(relatedBackend, /tasks:[\s\S]*?editUrl:[\s\S]*?"\/app\/crm\/calendar\/task\.nl\?id="/);
assert.match(relatedBackend, /contacts:\s*runRelatedSearch\("contact", "company"/);
assert.match(relatedBackend, /key:\s*"name",\s*source:\s*"entityid"/);
assert.match(relatedBackend, /key:\s*"inactive",\s*source:\s*"isinactive"/);
assert.match(relatedBackend, /"\/app\/common\/entity\/contact\.nl\?id="/);
assert.match(relatedBackend, /editUrl:/);
assert.doesNotMatch(relatedBackend, /projectedtotal|probability|source:\s*"priority"/);
assert.match(serverJs, /salesSubRegion:\s*firstValue\(/);
assert.match(serverJs, /"Sales Sub Region"/);
assert.match(serverJs, /salesRepSupervisor:\s*firstValue/);
assert.match(serverJs, /"MANAGER \(ROSTER\)"/);
assert.doesNotMatch(serverJs, /"\.svg":\s*"image\/svg\+xml/);
assert.match(serverJs, /const \{ internalId, edit \} = await readJson\(req\);/);
assert.match(serverJs, /edit \? "&e=T" : ""/);
assert.match(serverJs, /req\.method === "POST" && req\.url === "\/api\/open-record-merge"/);
assert.match(serverJs, /entitymerge\.nl\?e=T&type=custjob&id=\$\{encodeURIComponent\(String\(internalId\)\)\}/);
assert.match(serverJs, /const mergeTab = result\?\.webSocketDebuggerUrl \? result : await waitForTabById\(result\?\.id\);/);
assert.match(serverJs, /await prefillMergePrimary\(mergeTab, primaryInternalId, primaryLabel\)/);
assert.match(serverJs, /async function prefillMergePrimary\(tabInfo, primaryInternalId, primaryLabel\)/);
assert.match(serverJs, /function isMergeNavigationError\(error\)/);
assert.match(serverJs, /for \(let attemptNumber = 1; attemptNumber <= 3; attemptNumber \+= 1\)/);
assert.match(serverJs, /isMergeNavigationError\(error\)/);
assert.match(serverJs, /Prefill attempt \$\{attemptNumber\} failed during NetSuite page navigation; retrying\./);
assert.match(serverJs, /document\.querySelector\("#toentity_display"\)/);
assert.match(serverJs, /document\.querySelector\("#hddn_toentity_fs"\)/);
assert.match(serverJs, /hidden\.value = primaryInternalId;/);
assert.match(serverJs, /display\.setAttribute\("previousvalue", primaryLabel\)/);
assert.match(serverJs, /const restoreDisplay = \(\) => \{/);
assert.match(serverJs, /if \(typeof window\.Searchtoentity === "function"\)/);
assert.match(serverJs, /setTimeout\(\(\) => \{/);
assert.doesNotMatch(serverJs, /display\.dispatchEvent\(new Event\("change", \{ bubbles: true \}\)\);/);

["command", "lucis", "soldier"].forEach((theme) => {
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.record-tab-list`));
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.record-tab-button\\.active`));
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.related-table-wrap`));
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.related-table th\\.related-open-column`));
});

assert.match(stylesCss, /body\[data-theme="lcie"\] \.related-sort-button\[data-sort-direction="asc"\]/);
assert.match(stylesCss, /body\[data-theme="lcie"\] \.related-sort-button\[data-sort-direction="desc"\]/);
assert.match(stylesCss, /body\[data-theme="lcie"\] \.related-sort-button:hover/);
assert.match(stylesCss, /color:\s*inherit/);
assert.match(stylesCss, /body\[data-theme="command"\]\s*{[\s\S]*?radial-gradient\(ellipse at center, transparent 34%, rgba\(0, 0, 0, 0\.56\) 100%\)/);
assert.match(stylesCss, /body\[data-theme="command"\]\s*{[\s\S]*?linear-gradient\(100deg, #1f3541 0%, #2f3d43 33%, #5f5744 64%, #9b7a3f 100%\)/);
assert.match(stylesCss, /body\[data-theme="command"\] \.theme-picker select\s*{[\s\S]*?stroke='%23f3f1e8'/);
assert.match(stylesCss, /body\[data-theme="command"\] \.quick-links-panel \.panel-heading h2::before,[\s\S]*?body\[data-theme="lcie"\] \.update-panel \.panel-heading h2::before\s*{[\s\S]*?background:\s*currentColor;/);
assert.match(stylesCss, /body\[data-theme="lcie"\]\s*{[\s\S]*?radial-gradient\(ellipse at center, rgba\(255, 255, 255, 0\.20\) 0%, transparent 38%, rgba\(55, 72, 92, 0\.20\) 100%\)/);
assert.match(stylesCss, /body\[data-theme="lcie"\]\s*{[\s\S]*?linear-gradient\(108deg, #c8d8e6 0%, #edf5fb 34%, #f7fbff 55%, #b6cce2 100%\)/);
assert.match(stylesCss, /body\[data-theme="lcie"\] \.theme-picker select\s*{[\s\S]*?stroke='%2316242f'/);
assert.match(stylesCss, /body\[data-theme="lucis"\]\s*{[\s\S]*?radial-gradient\(ellipse at center, rgba\(42, 169, 232, 0\.12\) 0%, transparent 36%, rgba\(0, 0, 0, 0\.70\) 100%\)/);
assert.match(stylesCss, /body\[data-theme="lucis"\]\s*{[\s\S]*?linear-gradient\(108deg, #01050d 0%, #06152d 34%, #0d4670 66%, #010713 100%\)/);
assert.match(stylesCss, /body\[data-theme="lucis"\]::before\s*{[\s\S]*?linear-gradient\(101deg, transparent 0 43%, rgba\(115, 219, 255, 0\.24\) 44%, transparent 47%\)/);
assert.match(stylesCss, /body\[data-theme="lucis"\]::after\s*{[\s\S]*?transform:\s*rotate\(45deg\);[\s\S]*?box-shadow:/);
const lucisBeforeLayer = sliceBetween(stylesCss, 'body[data-theme="lucis"]::before {', 'body[data-theme="lucis"]::after {');
assert.doesNotMatch(lucisBeforeLayer, /repeating-linear-gradient\(90deg/);
assert.match(lucisBeforeLayer, /radial-gradient\(circle at 72% 9%, rgba\(226, 252, 255, 0\.78\) 0 1px, transparent 3px\)/);
assert.match(lucisBeforeLayer, /radial-gradient\(circle at 44% 46%, rgba\(172, 235, 255, 0\.58\) 0 1px, transparent 3px\)/);
assert.match(lucisBeforeLayer, /radial-gradient\(circle at 91% 42%, rgba\(101, 211, 255, 0\.50\) 0 1px, transparent 3px\)/);
const soldierThemeBlock = sliceBetween(stylesCss, 'body[data-theme="soldier"] {', '.app-shell {');
assert.doesNotMatch(soldierThemeBlock, /position:\s*relative;/);
assert.doesNotMatch(soldierThemeBlock, /overflow-x:\s*hidden;/);
assert.match(soldierThemeBlock, /radial-gradient\(circle at 13% 12%, rgba\(25, 169, 255, 0\.32\), transparent 28%\)/);
assert.match(soldierThemeBlock, /repeating-linear-gradient\(0deg, rgba\(69, 215, 255, 0\.055\) 0 1px, transparent 1px 48px\)/);
assert.doesNotMatch(stylesCss, /soldier-hex-edge\.svg/);
assert.doesNotMatch(stylesCss, /body\[data-theme="soldier"\]::before/);
assert.doesNotMatch(stylesCss, /body\[data-theme="soldier"\]::after/);

assert.match(indexHtml, /<button id="homeTab"[^>]*class="tab-button active sidebar-option icon-home"[\s\S]*>Home<\/button>/);
assert.match(indexHtml, /<button id="recordsTab"[^>]*aria-selected="false"[\s\S]*>Records<\/button>/);
assert.match(indexHtml, /<h2 id="workspaceTitle" class="work-panel-title">Home<\/h2>/);
assert.match(indexHtml, /id="homeWorkspace"[\s\S]*class="home-workspace"/);
assert.match(indexHtml, /<h2>Tools<\/h2>/);
assert.doesNotMatch(indexHtml, /<h2>Search<\/h2>[\s\S]*?<div class="mode-tabs sidebar-mode-tabs"/);
assert.doesNotMatch(indexHtml, /Welcome back, Yeye/);
assert.doesNotMatch(indexHtml, /Recent NSCORP records and app status live here/);
assert.doesNotMatch(indexHtml, /homeConnectionSummary/);
assert.doesNotMatch(indexHtml, /homeVersionSummary/);
assert.match(indexHtml, /home-section-icon icon-search/);
assert.match(indexHtml, /id="recentRecordsList"/);
assert.match(indexHtml, /id="activityFeedList"/);
assert.match(indexHtml, /id="activityClearButton"/);
assert.match(indexHtml, /Activity Feed/);
assert.match(indexHtml, /id="appGreetingTitle" class="app-greeting-title">[\s\S]*id="appGreetingText">Good day<\/span>[\s\S]*id="appGreetingIcon" class="greeting-icon icon-sun-cloud"/);
assert.match(indexHtml, /id="appGreetingSubtitle" class="muted">Here's what's happening today\.<\/p>/);
assert.match(indexHtml, /id="workspaceSubtitle" class="work-panel-subtitle">Overview of your activity and quick access to Oracle sites\.<\/p>/);
assert.doesNotMatch(indexHtml, /<h1>NetSuite Companion App<\/h1>/);
assert.match(indexHtml, /styles\.css\?v=ui-v200-search-button-align-20260805/);
assert.match(indexHtml, /class="home-shortcut-grid" aria-label="Oracle shortcuts"/);
assert.match(indexHtml, /data-home-shortcut-label="Oracle HCM"/);
assert.match(indexHtml, /data-home-shortcut-label="My Login Profile"/);
assert.match(indexHtml, /data-home-shortcut-label="ARIA"/);
assert.match(indexHtml, /data-home-shortcut-label="Darwin"/);
assert.match(indexHtml, /eeho\.fa\.us2\.oraclecloud\.com\/hcmUI\/faces\/FuseWelcome/);
assert.match(indexHtml, /my_profile_security/);
assert.match(indexHtml, /people\.oracle\.com\/apex\/f\?p=8000:1/);
assert.match(indexHtml, /perquisite\.net\/rewardcentre\/federation/);
assert.doesNotMatch(indexHtml, /data-open-url="https:\/\/eeho\.fa/);
assert.match(indexHtml, /id="rightPanelToggle"[^>]*aria-controls="rightPanel"/);
assert.match(indexHtml, /<aside id="rightPanel" class="right-column">/);
assert.match(indexHtml, /id="openClipboardLinkButton"[^>]*class="secondary sidebar-option icon-clipboard"/);
assert.match(indexHtml, /id="manualLinkToggle"[^>]*class="secondary subtle-toggle sidebar-option icon-globe"/);
assert.doesNotMatch(indexHtml, /Read only/);
assert.match(indexHtml, /id="searchLabel" class="field-label-hidden"/);
assert.doesNotMatch(indexHtml, /id="recentRecordsCount"/);
assert.doesNotMatch(indexHtml, /class="home-refresh-row"/);
assert.match(indexHtml, /<div class="home-section-head recent-records-head">[\s\S]*<div class="home-section-title-line">[\s\S]*Recent Records[\s\S]*id="recentRecordsStatus" class="status-box inline-status"[\s\S]*id="homeRefreshRecentButton"/);
assert.match(appJs, /workspaceTitle:\s*document\.getElementById\("workspaceTitle"\)/);
assert.match(appJs, /workspaceSubtitle:\s*document\.getElementById\("workspaceSubtitle"\)/);
assert.match(appJs, /appGreetingTitle:\s*document\.getElementById\("appGreetingTitle"\)/);
assert.match(appJs, /appGreetingText:\s*document\.getElementById\("appGreetingText"\)/);
assert.match(appJs, /appGreetingIcon:\s*document\.getElementById\("appGreetingIcon"\)/);
assert.match(appJs, /function currentGreetingLabel\(date = new Date\(\)\)\s*{[\s\S]*?Good morning[\s\S]*?Good afternoon[\s\S]*?Good evening/);
assert.match(appJs, /function currentGreetingIcon\(date = new Date\(\)\)\s*{[\s\S]*?4 \* 60[\s\S]*?10 \* 60[\s\S]*?16 \* 60[\s\S]*?19 \* 60[\s\S]*?return "moon"/);
assert.match(appJs, /function renderAppGreetingSubtitle\(\)\s*{[\s\S]*?Here's what's happening today\.[\s\S]*?Ready to streamline your NSCORP tasks\./);
assert.match(appJs, /async function initializeAppGreeting\(\)\s*{[\s\S]*?setInterval\(renderAppGreeting,\s*60000\)[\s\S]*?\/api\/local-user/);
assert.match(appJs, /initializeAppGreeting\(\);[\s\S]*?setMode\("home"\);/);
assert.match(appJs, /rightPanel:\s*document\.getElementById\("rightPanel"\)/);
assert.match(appJs, /rightPanelToggle:\s*document\.getElementById\("rightPanelToggle"\)/);
assert.match(appJs, /function activeWorkspaceTitle\(\)\s*{[\s\S]*?Home[\s\S]*?Merge Assistant[\s\S]*?Duplicate Finder[\s\S]*?Domain Search/);
assert.match(appJs, /const RIGHT_PANEL_COLLAPSED_KEY = "netsuite-companion-right-panel-collapsed";/);
assert.match(appJs, /function setRightPanelCollapsed\(collapsed, options = \{\}\)\s*{[\s\S]*?document\.body\.classList\.toggle\("right-panel-collapsed", nextCollapsed\);[\s\S]*?aria-expanded/);
assert.match(appJs, /elements\.rightPanelToggle\?\.addEventListener\("click", \(\) => \{[\s\S]*?setRightPanelCollapsed\(!document\.body\.classList\.contains\("right-panel-collapsed"\)\);/);
assert.match(appJs, /initializeRightPanelState\(\);[\s\S]*?setMode\("home"\);/);
assert.match(appJs, /data-home-shortcut-url/);
assert.match(appJs, /Opened Oracle shortcut/);
assert.match(appJs, /postJson\("\/api\/open-url", \{ url \}\)/);
const topbarBlock = sliceBetween(stylesCss, ".topbar {", ".topbar-actions {");
assert.match(topbarBlock, /grid-template-columns:\s*minmax\(0, 1fr\) 388px;/);
assert.match(topbarBlock, /border-bottom:\s*1px solid rgba\(87, 111, 111, 0\.16\);/);
assert.doesNotMatch(topbarBlock, /position:\s*sticky|backdrop-filter|box-shadow|background:/);
const topbarActionsBlock = sliceBetween(stylesCss, ".topbar-actions {", ".theme-picker {");
assert.match(topbarActionsBlock, /grid-template-columns:\s*minmax\(0, 1fr\) minmax\(136px, 1fr\) 38px;/);
assert.match(topbarActionsBlock, /width:\s*388px;/);
assert.doesNotMatch(stylesCss, /body\[data-theme="(?:lucis|soldier|command|lcie)"\] \.topbar\s*{/);
assert.match(stylesCss, /\.side-panel-toggle\s*{[\s\S]*?width:\s*38px;[\s\S]*?min-height:\s*38px;/);
assert.match(stylesCss, /body\.right-panel-collapsed \.content-grid\s*{[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\);/);
assert.match(stylesCss, /body\.right-panel-collapsed \.right-column\s*{[\s\S]*?display:\s*none;/);
assert.match(stylesCss, /body\.right-panel-collapsed \.side-panel-toggle svg\s*{[\s\S]*?transform:\s*rotate\(180deg\);/);
assert.match(stylesCss, /\.work-panel-title\s*{[\s\S]*?font-size:\s*25px;/);
assert.match(stylesCss, /\.app-greeting-title\s*{[\s\S]*?display:\s*flex;[\s\S]*?gap:\s*8px;/);
assert.match(stylesCss, /\.greeting-icon\s*{[\s\S]*?width:\s*30px;[\s\S]*?height:\s*30px;/);
assert.match(stylesCss, /\.greeting-icon\.icon-sun-cloud\s*{[\s\S]*?--greeting-icon-bg:[\s\S]*?#a6dfeb/);
assert.match(stylesCss, /\.greeting-icon\.icon-sun-cloud::before\s*{[\s\S]*?inset:\s*2px 1px -2px -3px;/);
assert.match(stylesCss, /\.greeting-icon\.icon-sun\s*{[\s\S]*?--greeting-icon-bg:[\s\S]*?#9bddea/);
assert.match(stylesCss, /\.greeting-icon\.icon-setting-sun\s*{[\s\S]*?--greeting-icon-bg:[\s\S]*?#fff0b8/);
assert.match(stylesCss, /\.greeting-icon\.icon-moon\s*{[\s\S]*?--greeting-icon-bg:[\s\S]*?#6172c4[\s\S]*?mask='url\(%23crescent\)'/);
assert.match(stylesCss, /\.workspace-title-block\s*{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*4px;/);
assert.match(stylesCss, /\.work-panel-subtitle\s*{[\s\S]*?color:\s*var\(--muted\);[\s\S]*?font-size:\s*15px;/);
assert.match(stylesCss, /\.field-label-hidden\s*{[\s\S]*?clip:\s*rect\(0, 0, 0, 0\);/);
assert.match(stylesCss, /\.layout\s*{[\s\S]*?grid-template-columns:\s*300px minmax\(0,\s*1fr\)/);
assert.match(stylesCss, /\.layout\s*{[\s\S]*?align-items:\s*stretch;/);
assert.match(stylesCss, /\.content-grid\s*{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\) 340px;/);
assert.match(stylesCss, /\.left-column\s*{[\s\S]*?width:\s*300px;[\s\S]*?min-width:\s*300px;/);
assert.match(stylesCss, /\.right-column\s*{[\s\S]*?width:\s*340px;[\s\S]*?min-width:\s*340px;/);
assert.match(stylesCss, /\.layout > \.panel,\s*\n\.content-grid > \.panel\s*{[\s\S]*?min-width:\s*0;/);
assert.match(stylesCss, /\.app-shell\s*{[\s\S]*?width:\s*min\(1680px,\s*calc\(100vw - 20px\)\)/);
assert.match(stylesCss, /\.app-sidebar\s*{[\s\S]*?position:\s*sticky;[\s\S]*?linear-gradient\(180deg, #043f48 0%, #05313b 54%, #032530 100%\)/);
assert.match(stylesCss, /\.app-sidebar\s*{[\s\S]*?align-self:\s*stretch;[\s\S]*?min-height:\s*auto;/);
assert.match(stylesCss, /\.sidebar-brand\s*{[\s\S]*?display:\s*flex;[\s\S]*?gap:\s*12px;/);
assert.match(stylesCss, /\.app-sidebar \.sidebar-option::before\s*{[\s\S]*?-webkit-mask:\s*var\(--sidebar-icon\) center \/ contain no-repeat;/);
assert.doesNotMatch(sliceBetween(stylesCss, ".app-sidebar::before {", ".app-sidebar > * {"), /repeating-linear-gradient/);
assert.match(stylesCss, /\.app-sidebar \.icon-chrome::before\s*{[\s\S]*?conic-gradient\(from -32deg, #ea4335 0 33%, #fbbc05 33% 66%, #34a853 66% 100%\);[\s\S]*?mask:\s*none;/);
assert.match(stylesCss, /\.quick-links-panel \.panel-heading h2::before/);
assert.match(stylesCss, /\.csv-panel \.panel-heading h2::before/);
assert.match(stylesCss, /\.update-panel \.panel-heading h2::before/);
assert.match(stylesCss, /\.record-detail-grid\s*{[\s\S]*?gap:\s*8px;/);
assert.match(stylesCss, /\.record-row\s*{[\s\S]*?gap:\s*8px;[\s\S]*?border-bottom:\s*0;/);
assert.match(stylesCss, /\.record-row \.summary-item\s*{[\s\S]*?border:\s*1px solid var\(--line\);[\s\S]*?border-radius:\s*6px;/);
assert.match(stylesCss, /\.sales-rep-summary\s*{[\s\S]*?gap:\s*8px;[\s\S]*?border:\s*0;/);
assert.match(stylesCss, /\.sales-rep-summary\s*{[\s\S]*?padding:\s*1px;/);
assert.match(stylesCss, /\.sales-rep-detail-section \.sales-rep-summary\s*{[\s\S]*?padding:\s*8px;[\s\S]*?background:\s*transparent;/);
assert.match(stylesCss, /body\[data-theme\] \.sales-rep-detail-section \.sales-rep-summary\s*{[\s\S]*?background:\s*transparent;/);
assert.match(stylesCss, /\.record-tab-panel\.active\s*{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*8px;/);
assert.match(stylesCss, /\.related-table\s*{[\s\S]*?width:\s*max-content;[\s\S]*?min-width:\s*100%;[\s\S]*?table-layout:\s*auto;/);
assert.match(stylesCss, /\.related-table th,\s*\n\.related-table td\s*{[\s\S]*?max-width:\s*40ch;[\s\S]*?white-space:\s*normal;[\s\S]*?overflow-wrap:\s*anywhere;/);
assert.match(stylesCss, /\.related-table th\s*{[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.related-open-column\s*{[\s\S]*?width:\s*154px;[\s\S]*?min-width:\s*154px;[\s\S]*?max-width:\s*154px;/);
assert.match(stylesCss, /\.related-table td\.related-open-column\s*{[\s\S]*?display:\s*flex;[\s\S]*?gap:\s*6px;[\s\S]*?justify-content:\s*flex-end;[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.dupe-table th:nth-child\(2\),\s*\n\.domain-table th:nth-child\(2\),\s*\n\.domain-table th:nth-child\(3\)\s*{[\s\S]*?min-width:\s*max-content;[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.related-open-link\s*{[\s\S]*?border:\s*1px solid var\(--accent\);[\s\S]*?background:[\s\S]*?linear-gradient\(180deg, #12a49e, #067a75\);/);
assert.match(stylesCss, /\.related-open-link\.secondary\s*{[\s\S]*?background:[\s\S]*?#fff;[\s\S]*?color:\s*var\(--accent\);/);
assert.match(stylesCss, /\.sr-only\s*{[\s\S]*?position:\s*absolute;[\s\S]*?clip:\s*rect\(0, 0, 0, 0\);/);
assert.match(stylesCss, /\.row-actions\s*{[\s\S]*?text-align:\s*right;/);
assert.match(stylesCss, /\.row-action-button\s*{[\s\S]*?width:\s*32px;[\s\S]*?min-height:\s*30px;[\s\S]*?padding:\s*0;/);
assert.match(stylesCss, /\.row-action-button svg\s*{[\s\S]*?width:\s*15px;[\s\S]*?stroke-width:\s*2\.2;/);
assert.match(stylesCss, /\.record-region-badge\s*{/);
assert.match(stylesCss, /\.summary-label-spread\s*{/);
assert.match(stylesCss, /\.eligibility-conflict-text\s*{[\s\S]*?color:\s*var\(--danger\);[\s\S]*?font-weight:\s*900;/);
assert.match(stylesCss, /\.territory-workspace\s*{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*10px;/);
assert.match(stylesCss, /\.territory-toolbar\s*{[\s\S]*?margin-bottom:\s*0;/);
assert.match(stylesCss, /\.territory-head-actions\s*{[\s\S]*?align-items:\s*center;/);
assert.match(stylesCss, /\.territory-inline-status\s*{[\s\S]*?max-width:\s*min\(46vw, 360px\);[\s\S]*?text-align:\s*right;/);
assert.match(stylesCss, /\.territory-filter-grid\s*{[\s\S]*?grid-template-columns:\s*minmax\(260px, 1\.5fr\) repeat\(3, minmax\(126px, 0\.7fr\)\);/);
assert.match(stylesCss, /\.territory-browser-list\s*{[\s\S]*?overflow:\s*auto;[\s\S]*?border:\s*1px solid var\(--line\);/);
assert.match(stylesCss, /\.territory-browser-head\s*{[\s\S]*?display:\s*flex;[\s\S]*?justify-content:\s*space-between;[\s\S]*?margin:\s*2px 0 -1px;/);
assert.match(stylesCss, /\.territory-browser-title\s*{[\s\S]*?font-weight:\s*650;/);
assert.match(stylesCss, /\.territory-browser-table\s*{[\s\S]*?width:\s*max-content;[\s\S]*?border-collapse:\s*collapse;/);
assert.match(stylesCss, /\.territory-browser-header th\s*{[\s\S]*?position:\s*sticky;[\s\S]*?text-transform:\s*uppercase;[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.territory-browser-table th:nth-child\(2\),[\s\S]*?\.territory-browser-table td:nth-child\(2\)\s*{[\s\S]*?min-width:\s*780px;/);
assert.match(stylesCss, /body\[data-theme="lcie"\] \.territory-browser-table \.territory-browser-header th\s*{[\s\S]*?linear-gradient\(180deg, #7fc5e1, #2e86b8\);/);
assert.match(stylesCss, /body\[data-theme="command"\] \.territory-browser-table \.territory-browser-header th\s*{[\s\S]*?linear-gradient\(180deg, #d7bd73, #9f8444\);/);
assert.match(stylesCss, /\.territory-browser-item td\s*{[\s\S]*?border-bottom:\s*1px solid rgba\(100, 112, 112, 0\.18\);[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.territory-browser-name\s*{[\s\S]*?text-decoration:\s*none;[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.territory-browser-item:hover \.territory-browser-name,[\s\S]*?\.territory-browser-item:focus-within \.territory-browser-name\s*{[\s\S]*?text-decoration:\s*underline;/);
assert.match(stylesCss, /\.territory-browser-description\s*{[\s\S]*?color:\s*var\(--muted\);[\s\S]*?white-space:\s*nowrap;/);
assert.doesNotMatch(stylesCss, /\.territory-filter-pill/);
assert.match(stylesCss, /\.app-sidebar \.icon-territory/);
assert.match(stylesCss, /\.territory-section\.record-section\s*{[\s\S]*?margin-top:\s*12px;[\s\S]*?padding-top:\s*0;/);
assert.match(stylesCss, /\.territory-section\.record-section \.territory-list\s*{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*8px;[\s\S]*?border:\s*0;[\s\S]*?border-radius:\s*0;[\s\S]*?padding:\s*8px;[\s\S]*?background:\s*transparent;/);
assert.match(stylesCss, /\.territory-section\.record-section \.territory-item\s*{[\s\S]*?border:\s*1px solid var\(--line\);[\s\S]*?border-radius:\s*6px;/);
assert.match(stylesCss, /\.search-input-shell\s*{[\s\S]*?position:\s*relative;/);
assert.match(stylesCss, /\.search-history\s*{[\s\S]*?position:\s*absolute;[\s\S]*?z-index:\s*30;/);
assert.match(stylesCss, /\.search-history\s*{[\s\S]*?background:\s*[\s\S]*?linear-gradient\(120deg, rgba\(255, 255, 255, 0\.90\), rgba\(245, 251, 250, 0\.72\)\),[\s\S]*?#fff;/);
assert.match(stylesCss, /\.stop-button\s*{[\s\S]*?color:\s*var\(--danger\);/);
assert.match(stylesCss, /\.stop-button svg\s*{[\s\S]*?width:\s*14px;/);
assert.match(stylesCss, /\.stop-button\.hidden\s*{[\s\S]*?display:\s*none;/);
assert.match(stylesCss, /\.batch-actions\s*{[\s\S]*?flex-direction:\s*column;/);
assert.match(stylesCss, /\.batch-actions > button\s*{[\s\S]*?width:\s*100%;/);
assert.match(stylesCss, /\.dupe-record-link\s*{[\s\S]*?text-decoration:\s*none;/);
assert.match(stylesCss, /\.dupe-record-link:hover,[\s\S]*?\.dupe-record-link:focus\s*{[\s\S]*?border-bottom-color:\s*currentColor;/);
assert.match(stylesCss, /\.home-workspace\s*{[\s\S]*?gap:\s*12px;/);
assert.match(stylesCss, /\.home-shortcut-grid\s*{[\s\S]*?grid-template-columns:\s*repeat\(4, minmax\(0, 1fr\)\)/);
assert.match(stylesCss, /\.home-shortcut-card\s*{[\s\S]*?min-height:\s*132px;[\s\S]*?text-align:\s*center;/);
assert.match(stylesCss, /\.home-shortcut-icon\s*{[\s\S]*?width:\s*64px;[\s\S]*?height:\s*64px;/);
assert.match(stylesCss, /\.home-shortcut-label\s*{[\s\S]*?font-weight:\s*700;/);
assert.match(stylesCss, /body\[data-theme="lucis"\] button\.home-shortcut-card,[\s\S]*?body\[data-theme="soldier"\] button\.home-shortcut-card\s*{[\s\S]*?var\(--panel\);/);
assert.match(stylesCss, /body\[data-theme="command"\] button\.home-shortcut-card\s*{[\s\S]*?rgba\(71, 61, 39, 0\.92\)/);
assert.match(stylesCss, /body\[data-theme="command"\] \.home-shortcut-label,[\s\S]*?body\[data-theme="soldier"\] \.home-shortcut-label\s*{[\s\S]*?color:\s*var\(--text\);/);
assert.match(stylesCss, /@media \(max-width: 1100px\)\s*{[\s\S]*?\.home-shortcut-grid\s*{[\s\S]*?grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\);/);
assert.doesNotMatch(stylesCss, /\.home-refresh-row/);
assert.match(stylesCss, /\.status-box\.inline-status\s*{[\s\S]*?min-height:\s*0;[\s\S]*?margin-top:\s*0;[\s\S]*?font-size:\s*12px;/);
assert.match(stylesCss, /\.home-section-title-line\s*{[\s\S]*?display:\s*inline-flex;[\s\S]*?align-items:\s*center;[\s\S]*?gap:\s*10px;/);
assert.match(stylesCss, /\.recent-records-head\s*{[\s\S]*?margin-bottom:\s*-1px;/);
assert.match(stylesCss, /\.home-section\s*{[\s\S]*?gap:\s*7px;/);
assert.match(stylesCss, /\.home-section-icon,[\s\S]*?\.activity-feed-icon\s*{[\s\S]*?-webkit-mask:\s*var\(--sidebar-icon\) center \/ contain no-repeat;/);
assert.match(appJs, /function recentRecordTypeLabel\(record\)\s*{[\s\S]*?employee roster[\s\S]*?Opportunity[\s\S]*?Customer[\s\S]*?Lead/);
assert.match(appJs, /function recentRecordName\(record\)\s*{[\s\S]*?replace\(\s*\/\\s\+#\\d\+\\s\*\$\/,\s*""\s*\)/);
assert.match(appJs, /<table class="recent-record-table" aria-label="Recent Records">[\s\S]*?<th scope="col">Type<\/th>[\s\S]*?<th scope="col">Name<\/th>/);
assert.doesNotMatch(appJs, /recent-record-time/);
assert.doesNotMatch(appJs, /formatRecentAccess/);
assert.match(appJs, /querySelector\("\.recent-record-name"\)/);
assert.doesNotMatch(appJs, /recentRecordsCount/);
assert.match(stylesCss, /\.recent-record-list\s*{[\s\S]*?height:\s*296px;[\s\S]*?max-height:\s*296px;[\s\S]*?min-height:\s*296px;[\s\S]*?overflow:\s*auto;[\s\S]*?border:\s*1px solid var\(--line\);[\s\S]*?border-radius:\s*8px;[\s\S]*?box-shadow:/);
assert.match(stylesCss, /#homeWorkspace:not\(\.hidden\) #recentRecordsList\.recent-record-list\s*{[\s\S]*?height:\s*296px !important;[\s\S]*?overflow-y:\s*auto !important;[\s\S]*?border-radius:\s*10px;[\s\S]*?box-shadow:/);
assert.match(stylesCss, /body\[data-theme="lucis"\] #homeWorkspace:not\(\.hidden\) #recentRecordsList\.recent-record-list,[\s\S]*?body\[data-theme="command"\] #homeWorkspace:not\(\.hidden\) #recentRecordsList\.recent-record-list\s*{[\s\S]*?background:[\s\S]*?var\(--panel\);/);
assert.match(stylesCss, /body\[data-theme="lucis"\] #connectionBadge\.badge,[\s\S]*?body\[data-theme="command"\] #connectionBadge\.badge\s*{[\s\S]*?background:[\s\S]*?var\(--panel\);/);
assert.match(stylesCss, /\.recent-record-table\s*{[\s\S]*?border-collapse:\s*collapse;/);
assert.match(stylesCss, /\.recent-record-table th,[\s\S]*?\.recent-record-table td\s*{[\s\S]*?border-bottom:\s*1px solid rgba\(100, 112, 112, 0\.16\);/);
assert.match(stylesCss, /\.recent-record-table th,[\s\S]*?\.recent-record-table td\s*{[\s\S]*?height:\s*40px;[\s\S]*?padding:\s*9px 14px;/);
assert.match(stylesCss, /\.recent-record-table th:first-child,[\s\S]*?\.recent-record-type\s*{[\s\S]*?width:\s*150px;/);
assert.match(stylesCss, /\.recent-record-name\s*{[\s\S]*?text-overflow:\s*ellipsis;[\s\S]*?font-weight:\s*650;/);
assert.match(stylesCss, /\.activity-feed-list\s*{[\s\S]*?min-height:\s*210px;[\s\S]*?border:\s*1px solid var\(--line\);/);
assert.match(stylesCss, /\.activity-feed-item\s*{[\s\S]*?grid-template-columns:\s*38px minmax\(0, 1fr\) max-content;/);
["command", "lcie", "lucis", "soldier"].forEach((theme) => {
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] input,[\\s\\S]*?body\\[data-theme="${theme}"\\] \\.search-history\\s*{[\\s\\S]*?background:`));
});
assert.match(stylesCss, /\.search-history-button,\s*\nbody\[data-theme\] \.search-history-button\s*{[\s\S]*?justify-content:\s*flex-start;[\s\S]*?border:\s*0;[\s\S]*?background:\s*transparent;[\s\S]*?box-shadow:\s*none;/);
assert.match(stylesCss, /\.search-history-button:hover,[\s\S]*?body\[data-theme\] \.search-history-button:focus\s*{[\s\S]*?border:\s*0;[\s\S]*?background:\s*var\(--soft\);[\s\S]*?box-shadow:\s*none;/);
assert.match(stylesCss, /\.record-workspace-tabs,\s*\nbody\[data-theme\] \.record-workspace-tabs\s*{[\s\S]*?display:\s*grid;[\s\S]*?grid-template-columns:\s*96px 96px;[\s\S]*?width:\s*min\(208px, 100%\);[\s\S]*?border-bottom:\s*1px solid var\(--line\);[\s\S]*?background:\s*transparent;/);
assert.match(stylesCss, /\.sidebar-mode-tabs,\s*\nbody\[data-theme\] \.sidebar-mode-tabs\s*{[\s\S]*?grid-template-columns:\s*1fr;[\s\S]*?background:\s*transparent;/);
assert.match(stylesCss, /\.sidebar-nav-group\s*{[\s\S]*?display:\s*grid;[\s\S]*?gap:\s*5px;/);
assert.match(stylesCss, /\.suiteworld-workspace-tabs,\s*\nbody\[data-theme\] \.suiteworld-workspace-tabs\s*{[\s\S]*?grid-template-columns:\s*184px 150px;[\s\S]*?width:\s*min\(344px, 100%\);/);
assert.match(stylesCss, /\.record-workspace-tabs #suiteWorldDupeTab\s*{[\s\S]*?width:\s*184px;/);
assert.match(stylesCss, /#salesRepWorkspaceTabs,\s*\nbody\[data-theme\] #salesRepWorkspaceTabs\s*{[\s\S]*?grid-template-columns:\s*96px 148px;[\s\S]*?width:\s*min\(254px, 100%\);/);
assert.match(stylesCss, /#salesRepWorkspaceTabs #salesRepHybridTab\s*{[\s\S]*?width:\s*148px;/);
assert.match(stylesCss, /\.sidebar-subtabs\.record-workspace-tabs,\s*\nbody\[data-theme\] \.sidebar-subtabs\.record-workspace-tabs/);
const sidebarSubtabBaseBlock = sliceBetween(
  stylesCss,
  ".app-sidebar .sidebar-subtabs.record-workspace-tabs .tab-button,",
  ".app-sidebar .sidebar-subtabs.record-workspace-tabs #recordSearchTab,"
);
assert.doesNotMatch(sidebarSubtabBaseBlock, /#recordSearchTab|#recordMergeTab|#salesRepSearchTab|#salesRepHybridTab|#suiteWorldDupeTab|#suiteWorldDomainTab/);
const sidebarSubtabWidthBlock = sliceBetween(
  stylesCss,
  ".app-sidebar .sidebar-subtabs.record-workspace-tabs #recordSearchTab,",
  ".app-sidebar .sidebar-subtabs.record-workspace-tabs .tab-button.active,"
);
assert.match(sidebarSubtabWidthBlock, /#salesRepHybridTab/);
assert.match(sidebarSubtabWidthBlock, /width:\s*100%;/);
assert.doesNotMatch(sidebarSubtabWidthBlock, /background|box-shadow|border-bottom/);
assert.match(stylesCss, /:root\s*{[\s\S]*?font-family:\s*"Inter", "Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif;/);
assert.match(stylesCss, /\.work-panel-title\s*{[\s\S]*?font-weight:\s*650;/);
assert.match(stylesCss, /\.app-sidebar \.panel-heading h2\s*{[\s\S]*?font-weight:\s*500;/);
assert.match(stylesCss, /\.app-sidebar \.sidebar-subtabs\.record-workspace-tabs \.tab-button\.active,[\s\S]*?\.app-sidebar \.sidebar-subtabs\.record-workspace-tabs \.tab-button\[aria-selected="true"\],[\s\S]*?body\[data-theme\] \.app-sidebar \.sidebar-subtabs\.record-workspace-tabs \.tab-button\[aria-selected="true"\]\s*{[\s\S]*?border-color:\s*transparent;[\s\S]*?border-bottom:\s*1px solid transparent;[\s\S]*?linear-gradient\(90deg, transparent 0%, rgba\(117, 243, 226, 0\.10\)[\s\S]*?bottom center \/ calc\(100% - 18px\) 2px no-repeat;[\s\S]*?box-shadow:\s*none;[\s\S]*?text-shadow:\s*0 0 10px rgba\(117, 243, 226, 0\.30\);[\s\S]*?transform:\s*none !important;/);
assert.match(stylesCss, /\.app-sidebar \.sidebar-option\.active,[\s\S]*?body\[data-theme\] \.app-sidebar \.sidebar-mode-tabs \.sidebar-nav-group > \.tab-button\.active\s*{[\s\S]*?color:\s*#ffffff !important;/);
assert.match(stylesCss, /\.record-workspace-tabs \.tab-button,\s*\nbody\[data-theme\] \.record-workspace-tabs \.tab-button\s*{[\s\S]*?border-radius:\s*7px 7px 0 0;[\s\S]*?transform-origin:\s*bottom center;[\s\S]*?white-space:\s*nowrap;/);
assert.match(stylesCss, /\.record-workspace-tabs \.tab-button\.active,\s*\nbody\[data-theme\] \.record-workspace-tabs \.tab-button\.active\s*{[\s\S]*?min-height:\s*31px;[\s\S]*?border-bottom-color:\s*rgba\(8, 127, 122, 0\.88\);[\s\S]*?rgba\(8, 127, 122, 0\.96\) calc\(100% - 3px\)[\s\S]*?transform:\s*none;/);
assert.match(stylesCss, /\.mode-tabs \.tab-button,\s*\n\.record-workspace-tabs \.tab-button,\s*\n\.record-tab-list \.record-tab-button\s*{[\s\S]*?transform-origin:\s*center;/);
assert.match(stylesCss, /\.mode-tabs \.tab-button:hover,\s*\n\.record-workspace-tabs \.tab-button:hover,\s*\n\.record-tab-list \.record-tab-button:not\(:disabled\):hover,[\s\S]*?transform:\s*translateY\(-1px\) scale\(1\.035\);/);
assert.match(stylesCss, /\.mode-tabs \.tab-button\.active,\s*\n\.record-tab-list \.record-tab-button\.active\s*{[\s\S]*?transform:\s*translateY\(-1px\) scale\(1\.035\);/);
assert.match(appJs, /elements\.searchButton\.classList\.toggle\("hidden", isHybrids\)/);
assert.doesNotMatch(appJs, /isHybrids \? "Refresh"/);
assert.match(stylesCss, /\.tab-button\.tab-activity-running::after\s*{[\s\S]*?background:\s*#e83f46;/);
assert.match(stylesCss, /\.tab-button\.tab-activity-running::after\s*{[\s\S]*?animation:\s*tabActivityPulse/);
assert.match(stylesCss, /\.tab-button\.tab-activity-done::after\s*{[\s\S]*?background:\s*#29b86f;/);
assert.match(stylesCss, /@keyframes tabActivityPulse/);
assert.match(stylesCss, /\.merge-workspace\s*{/);
assert.match(stylesCss, /\.merge-grid\s*{[\s\S]*?align-items:\s*start;/);
assert.match(stylesCss, /\.merge-grid label\s*{[\s\S]*?align-self:\s*start;/);
assert.match(stylesCss, /\.merge-form input#mergePrimaryInput\s*{[\s\S]*?height:\s*38px;[\s\S]*?min-height:\s*38px;/);
assert.match(stylesCss, /\.merge-form textarea#mergeDuplicateInput\s*{[\s\S]*?height:\s*74px;[\s\S]*?min-height:\s*74px;/);
assert.match(stylesCss, /\.merge-confirm input\s*{[\s\S]*?height:\s*14px;[\s\S]*?min-height:\s*14px;/);
assert.match(stylesCss, /button:disabled,[\s\S]*?button:disabled:hover\s*{[\s\S]*?cursor:\s*not-allowed;[\s\S]*?opacity:\s*0\.48;/);
assert.match(stylesCss, /\.merge-card,\s*\n\.merge-empty\s*{/);
assert.match(stylesCss, /\.merge-card\.primary\s*{/);
assert.match(stylesCss, /\.merge-card\.duplicate\s*{/);
assert.match(stylesCss, /\.merge-card \.status-pill\.eligible\s*{[\s\S]*?font-size:\s*13px;/);
assert.match(stylesCss, /\.merge-card \.status-pill\.review\s*{[\s\S]*?background:\s*#fff3d7;[\s\S]*?color:\s*#9a6500;/);
assert.match(stylesCss, /\.merge-duplicate-list\s*{[\s\S]*?border-top:\s*1px solid var\(--line\);/);
assert.match(stylesCss, /\.merge-card \.summary-item\.merge-field-warning\s*{/);
["command", "lucis", "soldier"].forEach((theme) => {
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.merge-card,`));
  assert.match(stylesCss, new RegExp(`body\\[data-theme="${theme}"\\] \\.merge-card \\.summary-item`));
});
assert.match(stylesCss, /\.merge-direction\s*{/);

console.log("Related UI regression checks passed.");
