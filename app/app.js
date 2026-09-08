const elements = {
  browserSelect: document.getElementById("browserSelect"),
  launchButton: document.getElementById("launchButton"),
  connectButton: document.getElementById("connectButton"),
  appGreetingTitle: document.getElementById("appGreetingTitle"),
  appGreetingText: document.getElementById("appGreetingText"),
  appGreetingIcon: document.getElementById("appGreetingIcon"),
  appGreetingDateTime: document.getElementById("appGreetingDateTime"),
  appGreetingSubtitle: document.getElementById("appGreetingSubtitle"),
  connectionBadge: document.getElementById("connectionBadge"),
  connectStatus: document.getElementById("connectStatus"),
  sessionHealthToggle: document.getElementById("sessionHealthToggle"),
  sessionHealthCard: document.getElementById("sessionHealthCard"),
  sessionHealthSummary: document.getElementById("sessionHealthSummary"),
  sessionHealthReconnectButton: document.getElementById("sessionHealthReconnectButton"),
  healthBrowserLabel: document.getElementById("healthBrowserLabel"),
  healthChromeValue: document.getElementById("healthChromeValue"),
  healthNscorpValue: document.getElementById("healthNscorpValue"),
  healthMainValue: document.getElementById("healthMainValue"),
  healthRoeValue: document.getElementById("healthRoeValue"),
  healthSuiteWorldValue: document.getElementById("healthSuiteWorldValue"),
  healthTerritoryValue: document.getElementById("healthTerritoryValue"),
  healthStaticGroupValue: document.getElementById("healthStaticGroupValue"),
  healthLastCheck: document.getElementById("healthLastCheck"),
  appVersion: document.getElementById("appVersion"),
  checkUpdateButton: document.getElementById("checkUpdateButton"),
  installUpdateButton: document.getElementById("installUpdateButton"),
  updateStatus: document.getElementById("updateStatus"),
  openClipboardLinkButton: document.getElementById("openClipboardLinkButton"),
  openLinkStatus: document.getElementById("openLinkStatus"),
  quickLinkStatus: document.getElementById("quickLinkStatus"),
  csvLinkStatus: document.getElementById("csvLinkStatus"),
  quickLinkList: document.getElementById("quickLinkList"),
  csvLinkList: document.getElementById("csvLinkList"),
  stickyNotesInput: document.getElementById("stickyNotesInput"),
  stickyNotesSavedAt: document.getElementById("stickyNotesSavedAt"),
  stickyNotesClearButton: document.getElementById("stickyNotesClearButton"),
  tabList: document.getElementById("tabList"),
  homeTab: document.getElementById("homeTab"),
  recordsTab: document.getElementById("recordsTab"),
  salesRepsTab: document.getElementById("salesRepsTab"),
  territoriesTab: document.getElementById("territoriesTab"),
  eligibilityTab: document.getElementById("eligibilityTab"),
  suiteWorldTab: document.getElementById("suiteWorldTab"),
  pitchbookTab: document.getElementById("pitchbookTab"),
  recordWorkspaceTabs: document.getElementById("recordWorkspaceTabs"),
  recordSearchTab: document.getElementById("recordSearchTab"),
  recordMergeTab: document.getElementById("recordMergeTab"),
  recordStaticGroupTab: document.getElementById("recordStaticGroupTab"),
  salesRepWorkspaceTabs: document.getElementById("salesRepWorkspaceTabs"),
  salesRepSearchTab: document.getElementById("salesRepSearchTab"),
  salesRepHybridTab: document.getElementById("salesRepHybridTab"),
  suiteWorldWorkspaceTabs: document.getElementById("suiteWorldWorkspaceTabs"),
  suiteWorldDupeTab: document.getElementById("suiteWorldDupeTab"),
  suiteWorldDomainTab: document.getElementById("suiteWorldDomainTab"),
  homeWorkspace: document.getElementById("homeWorkspace"),
  homeRefreshRecentButton: document.getElementById("homeRefreshRecentButton"),
  homeConnectionSummary: document.getElementById("homeConnectionSummary"),
  homeVersionSummary: document.getElementById("homeVersionSummary"),
  recentRecordsStatus: document.getElementById("recentRecordsStatus"),
  recentRecordsList: document.getElementById("recentRecordsList"),
  activityFeedList: document.getElementById("activityFeedList"),
  activityClearButton: document.getElementById("activityClearButton"),
  hrHubStatus: document.getElementById("hrHubStatus"),
  recordSearchWorkspace: document.getElementById("recordSearchWorkspace"),
  mergeWorkspace: document.getElementById("mergeWorkspace"),
  mergeForm: document.getElementById("mergeForm"),
  mergePrimaryInput: document.getElementById("mergePrimaryInput"),
  mergeDuplicateInput: document.getElementById("mergeDuplicateInput"),
  mergeReviewCheckbox: document.getElementById("mergeReviewCheckbox"),
  mergeLoadButton: document.getElementById("mergeLoadButton"),
  mergeFlipButton: document.getElementById("mergeFlipButton"),
  mergeStatus: document.getElementById("mergeStatus"),
  mergeCount: document.getElementById("mergeCount"),
  mergeContactCheck: document.getElementById("mergeContactCheck"),
  mergeContactHint: document.getElementById("mergeContactHint"),
  mergeContactCheckButton: document.getElementById("mergeContactCheckButton"),
  mergeContactResults: document.getElementById("mergeContactResults"),
  mergePrimaryCard: document.getElementById("mergePrimaryCard"),
  mergeDuplicateList: document.getElementById("mergeDuplicateList"),
  staticGroupWorkspace: document.getElementById("staticGroupWorkspace"),
  staticGroupForm: document.getElementById("staticGroupForm"),
  staticGroupCreateModeButton: document.getElementById("staticGroupCreateModeButton"),
  staticGroupAppendModeButton: document.getElementById("staticGroupAppendModeButton"),
  staticGroupNameInput: document.getElementById("staticGroupNameInput"),
  staticGroupNameLabel: document.getElementById("staticGroupNameLabel"),
  staticGroupExistingGroupField: document.getElementById("staticGroupExistingGroupField"),
  staticGroupExistingGroupInput: document.getElementById("staticGroupExistingGroupInput"),
  staticGroupConfirmText: document.getElementById("staticGroupConfirmText"),
  staticGroupRecordInput: document.getElementById("staticGroupRecordInput"),
  staticGroupConfirmCheckbox: document.getElementById("staticGroupConfirmCheckbox"),
  staticGroupCreateButton: document.getElementById("staticGroupCreateButton"),
  staticGroupRetrySkippedButton: document.getElementById("staticGroupRetrySkippedButton"),
  staticGroupStatus: document.getElementById("staticGroupStatus"),
  staticGroupCount: document.getElementById("staticGroupCount"),
  staticGroupElapsed: document.getElementById("staticGroupElapsed"),
  staticGroupResultsBody: document.getElementById("staticGroupResultsBody"),
  staticGroupHistoryRefreshButton: document.getElementById("staticGroupHistoryRefreshButton"),
  staticGroupHistoryList: document.getElementById("staticGroupHistoryList"),
  dupeWorkspace: document.getElementById("dupeWorkspace"),
  dupeForm: document.getElementById("dupeForm"),
  dupeInput: document.getElementById("dupeInput"),
  dupeFindButton: document.getElementById("dupeFindButton"),
  dupeStopButton: document.getElementById("dupeStopButton"),
  dupeExportButton: document.getElementById("dupeExportButton"),
  dupeOpenExtractFolderButton: document.getElementById("dupeOpenExtractFolderButton"),
  dupeCopyFhButton: document.getElementById("dupeCopyFhButton"),
  dupeStatus: document.getElementById("dupeStatus"),
  dupeCount: document.getElementById("dupeCount"),
  dupeElapsed: document.getElementById("dupeElapsed"),
  dupeResultsBody: document.getElementById("dupeResultsBody"),
  domainWorkspace: document.getElementById("domainWorkspace"),
  domainForm: document.getElementById("domainForm"),
  domainInput: document.getElementById("domainInput"),
  domainSearchButton: document.getElementById("domainSearchButton"),
  domainStopButton: document.getElementById("domainStopButton"),
  domainExportButton: document.getElementById("domainExportButton"),
  domainOpenExtractFolderButton: document.getElementById("domainOpenExtractFolderButton"),
  domainStatus: document.getElementById("domainStatus"),
  domainCount: document.getElementById("domainCount"),
  domainElapsed: document.getElementById("domainElapsed"),
  domainResultsBody: document.getElementById("domainResultsBody"),
  pitchbookWorkspace: document.getElementById("pitchbookWorkspace"),
  pitchbookForm: document.getElementById("pitchbookForm"),
  pitchbookGroupInput: document.getElementById("pitchbookGroupInput"),
  pitchbookLoadButton: document.getElementById("pitchbookLoadButton"),
  pitchbookStatus: document.getElementById("pitchbookStatus"),
  pitchbookCount: document.getElementById("pitchbookCount"),
  pitchbookResultsBody: document.getElementById("pitchbookResultsBody"),
  territoryWorkspace: document.getElementById("territoryWorkspace"),
  territoryRefreshButton: document.getElementById("territoryRefreshButton"),
  territoryBrowserCount: document.getElementById("territoryBrowserCount"),
  territoryGeneralFilter: document.getElementById("territoryGeneralFilter"),
  territoryVerticalFilter: document.getElementById("territoryVerticalFilter"),
  territoryTierFilter: document.getElementById("territoryTierFilter"),
  territoryRegionFilter: document.getElementById("territoryRegionFilter"),
  territoryBrowserStatus: document.getElementById("territoryBrowserStatus"),
  territoryBrowserList: document.getElementById("territoryBrowserList"),
  territorySalesRepForm: document.getElementById("territorySalesRepForm"),
  territorySalesRepInput: document.getElementById("territorySalesRepInput"),
  territorySalesRepHistory: document.getElementById("territorySalesRepHistory"),
  territorySalesRepSearchButton: document.getElementById("territorySalesRepSearchButton"),
  territorySalesRepStatus: document.getElementById("territorySalesRepStatus"),
  territorySalesRepResults: document.getElementById("territorySalesRepResults"),
  territorySelectedPanel: document.getElementById("territorySelectedPanel"),
  territorySelectedName: document.getElementById("territorySelectedName"),
  territorySelectedMeta: document.getElementById("territorySelectedMeta"),
  territorySelectedCount: document.getElementById("territorySelectedCount"),
  territorySelectedList: document.getElementById("territorySelectedList"),
  territoryChangeCount: document.getElementById("territoryChangeCount"),
  territoryChangeSummary: document.getElementById("territoryChangeSummary"),
  territoryConfirmCheckbox: document.getElementById("territoryConfirmCheckbox"),
  territoryRunButton: document.getElementById("territoryRunButton"),
  territoryRunResults: document.getElementById("territoryRunResults"),
  searchForm: document.getElementById("searchForm"),
  searchLabel: document.getElementById("searchLabel"),
  searchText: document.getElementById("searchText"),
  searchHistory: document.getElementById("searchHistory"),
  searchHelp: document.querySelector(".search-help"),
  searchButton: document.getElementById("searchButton"),
  workspaceTitle: document.getElementById("workspaceTitle"),
  workspaceSubtitle: document.getElementById("workspaceSubtitle"),
  lookupStatus: document.getElementById("lookupStatus"),
  resultsHead: document.getElementById("resultsHead"),
  resultsBody: document.getElementById("resultsBody"),
  detailCollapseButton: document.getElementById("detailCollapseButton"),
  detailTitle: document.getElementById("detailTitle"),
  summary: document.getElementById("summary"),
  selectedRecordHint: document.getElementById("selectedRecordHint"),
  extractSalesRepButton: document.getElementById("extractSalesRepButton"),
  openExtractFolderButton: document.getElementById("openExtractFolderButton"),
  territorySection: document.getElementById("territorySection"),
  territoryCount: document.getElementById("territoryCount"),
  territoryList: document.getElementById("territoryList"),
  eligibilitySection: document.getElementById("eligibilitySection"),
  eligibilityForm: document.getElementById("eligibilityForm"),
  eligibilityLeadInput: document.getElementById("eligibilityLeadInput"),
  verifyEligibilityButton: document.getElementById("verifyEligibilityButton"),
  eligibilityStopButton: document.getElementById("eligibilityStopButton"),
  eligibilityExportButton: document.getElementById("eligibilityExportButton"),
  eligibilityOpenExtractFolderButton: document.getElementById("eligibilityOpenExtractFolderButton"),
  eligibilityStatus: document.getElementById("eligibilityStatus"),
  eligibilityCount: document.getElementById("eligibilityCount"),
  eligibilityElapsed: document.getElementById("eligibilityElapsed"),
  eligibilityResultsBody: document.getElementById("eligibilityResultsBody"),
  themeSelect: document.getElementById("themeSelect"),
  rightPanel: document.getElementById("rightPanel"),
  rightPanelToggle: document.getElementById("rightPanelToggle"),
  appToast: document.getElementById("appToast"),
};

let activeMode = null;
let activeRecordWorkspaceTab = "search";
let activeSalesRepWorkspaceTab = "search";
let activeSuiteWorldTab = "dupes";
let mergeState = { primary: null, duplicates: [], blockers: [] };
let mergeAddressPopover = null;
let staticGroupState = { rows: [], created: null, sourceText: "" };
let staticGroupMode = "create";
let staticGroupHistoryState = { items: [], loaded: false };
let territoryCatalogState = { items: [], loaded: false, loadingPromise: null };
let territoryUpdateState = { repResults: [], selectedRep: null, changes: [], results: [], running: false };
let recentRecordsState = { items: [], loaded: false, loadingPromise: null };
let eligibilityRunState = { id: 0, stopped: false };
let dupeRunState = { id: 0, stopped: false };
let domainRunState = { id: 0, stopped: false };
let dupeResultRows = [];
let domainResultRows = [];
let pitchbookResultRows = [];
let eligibilityResultRows = [];
const staticGroupValidationCache = new Map();
const eligibilityValidationCache = new Map();
const dupeValidationCache = new Map();
const domainValidationCache = new Map();
let dupeElapsedTimer = null;
let dupeElapsedStartedAt = 0;
let domainElapsedTimer = null;
let domainElapsedStartedAt = 0;
let eligibilityElapsedTimer = null;
let eligibilityElapsedStartedAt = 0;
let staticGroupElapsedTimer = null;
let staticGroupElapsedStartedAt = 0;
let appDisplayName = "";
let appGreetingTimer = null;
let sessionHealthTimer = null;
let stickyNotesSaveTimer = null;
let selectedBrowser = "chrome";

function activeWorkspaceTitle() {
  if (activeMode === "home") return "Home";
  if (activeMode === "records") {
    if (activeRecordWorkspaceTab === "merge") return "Merge Assistant";
    if (activeRecordWorkspaceTab === "staticGroup") return "Static Group Creator";
    return "Records Search";
  }
  if (activeMode === "salesReps") return "Sales Rep Search";
  if (activeMode === "hybrids") return "Hybrid Reps";
  if (activeMode === "territories") return "Territories";
  if (activeMode === "eligibility") return "ROE Checker";
  if (activeMode === "suiteWorld") return activeSuiteWorldTab === "domain" ? "Domain Search" : "Duplicate Finder";
  if (activeMode === "pitchbook") return "Pitchbook";
  return "Records Search";
}

function updateWorkspaceTitle() {
  if (elements.workspaceTitle) elements.workspaceTitle.textContent = activeWorkspaceTitle();
  const isHome = activeMode === "home";
  if (elements.workspaceSubtitle) {
    elements.workspaceSubtitle.textContent = isHome ? "Overview of your activity and quick access to Oracle sites." : "";
    elements.workspaceSubtitle.classList.toggle("hidden", !isHome);
  }
  renderAppGreetingSubtitle();
}

function currentGreetingLabel(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  return "Good evening";
}

function currentGreetingIcon(date = new Date()) {
  const minutes = date.getHours() * 60 + date.getMinutes();
  if (minutes >= 4 * 60 && minutes < 10 * 60) return "sun-cloud";
  if (minutes >= 10 * 60 && minutes < 16 * 60) return "sun";
  if (minutes >= 16 * 60 && minutes < 19 * 60) return "setting-sun";
  return "moon";
}

function formatAppGreetingDateTime(date = new Date()) {
  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
  return `${datePart} \u2022 ${timePart}`;
}

function renderAppGreetingSubtitle() {
  if (!elements.appGreetingSubtitle) return;
  elements.appGreetingSubtitle.textContent = activeMode === "home" ? "Here's what's happening today." : "Ready to streamline your NSCORP tasks.";
}

function renderAppGreeting() {
  if (!elements.appGreetingTitle) return;
  const nameSuffix = appDisplayName ? `, ${appDisplayName}` : "";
  const label = `${currentGreetingLabel()}${nameSuffix}`;
  if (elements.appGreetingText) {
    elements.appGreetingText.textContent = label;
  } else {
    elements.appGreetingTitle.textContent = label;
  }
  if (elements.appGreetingIcon) {
    const icon = currentGreetingIcon();
    elements.appGreetingIcon.className = `greeting-icon icon-${icon}`;
    elements.appGreetingIcon.setAttribute("aria-label", icon.replace("-", " "));
  }
  if (elements.appGreetingDateTime) {
    elements.appGreetingDateTime.textContent = formatAppGreetingDateTime();
  }
  renderAppGreetingSubtitle();
}

async function initializeAppGreeting() {
  renderAppGreeting();
  if (appGreetingTimer) clearInterval(appGreetingTimer);
  appGreetingTimer = setInterval(renderAppGreeting, 60000);
  try {
    const result = await getJson("/api/local-user");
    appDisplayName = String(result.displayName || "").trim();
    renderAppGreeting();
  } catch {
    appDisplayName = "";
    renderAppGreeting();
  }
}

let selectedSalesRep = null;
let activeDetailMode = null;
let linkState = { quickLinks: [], csvLinks: [] };
let linkReorderState = { quickLinks: false, csvLinks: false };
let latestUpdate = null;
let toastTimer = null;
let recordRegionRules = { stateProvinceAliases: {}, industryRegionRules: [] };
const modeActivityState = {
  salesReps: { running: 0, unseen: false },
  hybrids: { running: 0, unseen: false },
  territories: { running: 0, unseen: false },
  eligibility: { running: 0, unseen: false },
};
const recordWorkspaceActivityState = {
  search: { running: 0, unseen: false },
  merge: { running: 0, unseen: false },
  staticGroup: { running: 0, unseen: false },
};
const suiteWorldWorkspaceActivityState = {
  dupes: { running: 0, unseen: false },
  domain: { running: 0, unseen: false },
};
const THEME_STORAGE_KEY = "netsuite-companion-theme";
const SEARCH_HISTORY_KEY_PREFIX = "netsuite-companion-search-history:";
const APP_ACTIVITY_KEY = "netsuite-companion-activity-feed";
const RIGHT_PANEL_COLLAPSED_KEY = "netsuite-companion-right-panel-collapsed";
const STICKY_NOTES_STORAGE_KEY = "netsuite-companion-sticky-notes";
const STICKY_NOTES_SAVED_AT_KEY = "netsuite-companion-sticky-notes-saved-at";
const BROWSER_STORAGE_KEY = "netsuite-companion-browser";
const SEARCH_HISTORY_LIMIT = 5;
const APP_ACTIVITY_LIMIT = 30;
const APP_ACTIVITY_VISIBLE_LIMIT = 10;
const RECENT_RECORD_VISIBLE_LIMIT = 20;
const SEARCH_HISTORY_MODES = new Set(["records", "salesReps", "eligibility", "territories"]);
// NetSuite global search and record pages can be slow even when the worker
// session is healthy. Give the duplicate workflow enough time to distinguish
// a slow response from a genuinely lost worker session.
const DUPE_SEARCH_TIMEOUT_MS = 45000;
const DUPE_RECORD_TIMEOUT_MS = 90000;
const MERGE_SEARCH_TIMEOUT_MS = 25000;
const MERGE_RECORD_TIMEOUT_MS = 60000;
const DUPE_CANDIDATE_DETAIL_LIMIT = 8;
const TERRITORY_MANAGER_URL = "https://nlcorp.app.netsuite.com/app/crm/common/automation/territorymanager.nl?sales=T&whence=&siaT=1788310001531&siaWhc=%2Fapp%2Fcenter%2Fcard.nl&siaNv=ct2";
const SESSION_INVALID_ERROR_CODE = "NSCORP_SESSION_INVALID";
const TERRITORY_REGION_OPTIONS = [
  { value: "", label: "All regions" },
  { value: "EAST", label: "East" },
  { value: "WEST", label: "West" },
  { value: "SOUTH", label: "South" },
  { value: "CENTRAL", label: "Central" },
  { value: "EMEA", label: "EMEA" },
  { value: "ANZ", label: "ANZ" },
  { value: "APJ", label: "APJ" },
  { value: "LATAM", label: "LATAM" },
];
const statusTimers = new WeakMap();

const ACTION_ICONS = {
  view: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  `,
  open: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M15 3h6v6"></path>
      <path d="M10 14 21 3"></path>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    </svg>
  `,
  edit: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"></path>
    </svg>
  `,
  plus: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 5v14"></path>
      <path d="M5 12h14"></path>
    </svg>
  `,
  x: `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M18 6 6 18"></path>
      <path d="M6 6l12 12"></path>
    </svg>
  `,
};

const DETAIL_COLLAPSE_CHEVRON = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>';

function actionIconButton(iconName, label, attributes = {}, options = {}) {
  const attrHtml = Object.entries(attributes)
    .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
    .join(" ");
  const className = `small-button row-action-button${options.secondary ? " secondary" : ""}`;
  return `
    <button type="button" class="${className}" ${attrHtml} title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
      ${ACTION_ICONS[iconName] || ""}
      <span class="sr-only">${escapeHtml(label)}</span>
    </button>
  `;
}

function noResultsIconHtml() {
  return `
    <span class="empty-state-icon" aria-hidden="true">
      <span></span>
      <span></span>
    </span>
  `;
}

function tableEmptyRow(colspan, message) {
  return `<tr><td colspan="${colspan}" class="empty">${escapeHtml(message)}</td></tr>`;
}

function noResultsRow(colspan, message) {
  return `
    <tr>
      <td colspan="${colspan}" class="empty empty-state-cell">
        <div class="empty-state">
          ${noResultsIconHtml()}
          <span>${escapeHtml(message)}</span>
        </div>
      </td>
    </tr>
  `;
}

const resultHeadHtml = {
  records: `
    <th>Type</th>
    <th>Internal ID</th>
    <th>Title</th>
    <th class="merged-tail-header" colspan="2">Snippet</th>
  `,
  salesReps: `
                    <th>Internal ID / ID / Name</th>
    <th>Sales Role</th>
    <th>Industry</th>
    <th class="merged-tail-header" colspan="2">Annual Revenue</th>
  `,
  hybrids: `
    <th>Internal ID</th>
    <th>Name</th>
    <th>Vertical</th>
    <th>Tier</th>
    <th>Sales Sub Region</th>
    <th class="merged-tail-header" colspan="2">Sales Role</th>
  `,
  eligibility: `
    <th>Type</th>
    <th>Internal ID</th>
    <th>Name</th>
    <th class="merged-tail-header" colspan="2">Sales Role</th>
  `,
};

const emptyResultBodyHtml = {
  records: noResultsRow(5, "No Lead, Prospect, or Customer records found."),
  salesReps: noResultsRow(5, "No Sales Rep records found."),
  hybrids: tableEmptyRow(7, "No hybrid reps saved locally."),
  eligibility: tableEmptyRow(5, "Search for a target sales rep."),
};

function defaultModeState(mode) {
  const isRecords = mode === "records";
  const isHybrids = mode === "hybrids";
  const isEligibility = mode === "eligibility";
  return {
    query: "",
    resultsHeadHtml: resultHeadHtml[mode],
    resultsBodyHtml: emptyResultBodyHtml[mode],
    detailTitle: isRecords ? "Selected Record" : isHybrids ? "Hybrid Reps" : isEligibility ? "Target Sales Rep" : "Selected Sales Rep",
    selectedRecordHint: isRecords ? "Use View to load details here." : isHybrids ? "Saved local hybrid reps appear above." : isEligibility ? "Select a sales rep to verify transfer eligibility." : "Use View to load sales rep details here.",
    summaryHtml: "",
    summaryClassName: "summary-grid",
    lookupStatusClassName: "status-box",
    lookupStatusText: "",
    territorySectionClassName: "territory-section hidden",
    territoryCountText: "",
    territoryListHtml: "",
    extractButtonClassName: "small-button hidden",
    extractButtonText: "Extract",
    extractButtonDisabled: false,
    openExtractFolderButtonClassName: "small-button secondary hidden",
    openExtractFolderButtonDisabled: false,
    detailCollapsed: false,
    selectedSalesRep: null,
    detailMode: null,
  };
}

const modeState = {
  records: defaultModeState("records"),
  salesReps: defaultModeState("salesReps"),
  hybrids: defaultModeState("hybrids"),
  eligibility: defaultModeState("eligibility"),
};

const linkSections = {
  quickLinks: {
    list: elements.quickLinkList,
    status: elements.quickLinkStatus,
    empty: "No quick links yet.",
  },
  csvLinks: {
    list: elements.csvLinkList,
    status: elements.csvLinkStatus,
    empty: "No CSV links yet.",
  },
};

function statusClassName(element, mode = "") {
  const classes = ["status-box"];
  if (element?.classList?.contains("link-status")) classes.push("link-status");
  if (element === elements.recentRecordsStatus) classes.push("inline-status");
  if (mode) classes.push(mode);
  return classes.join(" ");
}

function clearStatus(element) {
  if (!element) return;
  const timer = statusTimers.get(element);
  if (timer) clearTimeout(timer);
  statusTimers.delete(element);
  element.className = statusClassName(element);
  element.textContent = "";
}

function setStatus(element, message, mode = "", options = {}) {
  if (!element) return;
  const existingTimer = statusTimers.get(element);
  if (existingTimer) clearTimeout(existingTimer);
  statusTimers.delete(element);
  element.className = statusClassName(element, mode);
  element.textContent = message;

  const autoClear = options.autoClear ?? (mode === "ok" && element !== elements.connectStatus);
  if (!message || !autoClear) return;

  const delayMs = Number(options.delayMs || 5000);
  const timer = setTimeout(() => {
    if (element.textContent === message) clearStatus(element);
  }, delayMs);
  statusTimers.set(element, timer);
}

function showToast(message, mode = "ok") {
  if (!elements.appToast) return;
  if (toastTimer) clearTimeout(toastTimer);
  elements.appToast.className = `app-toast ${mode}`;
  elements.appToast.textContent = message;
  toastTimer = setTimeout(() => {
    elements.appToast.classList.add("hidden");
    toastTimer = null;
  }, 3500);
}

function setBadge(mode, text) {
  setSessionHealthToggleMode(mode);
  if (elements.connectionBadge) {
    elements.connectionBadge.textContent = "Session Health";
  }
  if (elements.homeConnectionSummary) {
    elements.homeConnectionSummary.textContent = text || "---";
    elements.homeConnectionSummary.className = mode || "";
  }
}

function normalizeBrowser(value) {
  return String(value || "").trim().toLowerCase() === "firefox" ? "firefox" : "chrome";
}

function selectedBrowserLabel(browser = selectedBrowser) {
  return normalizeBrowser(browser) === "firefox" ? "Firefox" : "Chrome";
}

function applyBrowserUi(browser) {
  selectedBrowser = normalizeBrowser(browser);
  if (elements.browserSelect) elements.browserSelect.value = selectedBrowser;
  if (elements.launchButton) {
    const label = selectedBrowserLabel();
    elements.launchButton.textContent = `Launch NSCORP ${label}`;
    elements.launchButton.classList.toggle("icon-chrome", selectedBrowser === "chrome");
    elements.launchButton.classList.toggle("icon-firefox", selectedBrowser === "firefox");
  }
  if (elements.healthBrowserLabel) {
    elements.healthBrowserLabel.textContent = selectedBrowser === "firefox" ? "Firefox Automation" : "Chrome Debug";
  }
}

function restoreBrowserChoice() {
  try {
    return normalizeBrowser(localStorage.getItem(BROWSER_STORAGE_KEY));
  } catch {
    return "chrome";
  }
}

function saveBrowserChoice(browser) {
  try {
    localStorage.setItem(BROWSER_STORAGE_KEY, normalizeBrowser(browser));
  } catch {
    // Browser preference is optional; Chrome remains the safe default.
  }
}

async function initializeBrowserChoice() {
  const browser = restoreBrowserChoice();
  applyBrowserUi(browser);
  try {
    const result = await postJson("/api/browser/select", { browser });
    applyBrowserUi(result.browser || browser);
  } catch {
    // The launch button remains available even if the local service is still starting.
  }
}

function readAppActivities() {
  try {
    const parsed = JSON.parse(localStorage.getItem(APP_ACTIVITY_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.title) : [];
  } catch {
    return [];
  }
}

function saveAppActivities(items) {
  try {
    localStorage.setItem(APP_ACTIVITY_KEY, JSON.stringify(items.slice(0, APP_ACTIVITY_LIMIT)));
  } catch {
    // Local activity is a convenience only.
  }
}

function activityIconClass(type) {
  const map = {
    search: "icon-search",
    view: "icon-records",
    rep: "icon-users",
    export: "icon-domain",
    roe: "icon-shield",
    merge: "icon-merge",
    group: "icon-group",
    dupe: "icon-copy",
    domain: "icon-domain",
    territory: "icon-territory",
    open: "icon-link",
    oracle: "icon-link",
    session: "icon-pulse",
    warning: "icon-warning",
    stop: "icon-stop",
    copy: "icon-copy",
    update: "icon-update",
    folder: "icon-folder",
  };
  return map[type] || "icon-pulse";
}

function activityTypeClass(type) {
  const cleanType = String(type || "pulse").toLowerCase().replace(/[^a-z0-9-]/g, "");
  return `activity-type-${cleanType || "pulse"}`;
}

function formatActivityTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function compactActivityDetail(parts) {
  return parts
    .map((part) => String(part ?? "").trim())
    .filter(Boolean)
    .join(" ");
}

function renderActivityFeed() {
  if (!elements.activityFeedList) return;
  const items = readAppActivities().slice(0, APP_ACTIVITY_VISIBLE_LIMIT);
  if (!items.length) {
    elements.activityFeedList.innerHTML = `
      <div class="empty-state">
        ${noResultsIconHtml()}
        <span>Companion app activity will appear here.</span>
      </div>
    `;
    return;
  }
  elements.activityFeedList.innerHTML = items.map((item) => `
    <div class="activity-feed-item">
      <span class="activity-feed-icon ${escapeHtml(activityIconClass(item.type))} ${escapeHtml(activityTypeClass(item.type))}" aria-hidden="true"></span>
      <span class="activity-feed-text">
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.detail || "")}</span>
      </span>
      <time datetime="${escapeHtml(item.timestamp || "")}">${escapeHtml(formatActivityTime(item.timestamp))}</time>
    </div>
  `).join("");
}

function addAppActivity(type, title, detail = "") {
  const nextItem = {
    type,
    title: String(title || "").trim(),
    detail: String(detail || "").trim(),
    timestamp: new Date().toISOString(),
  };
  if (!nextItem.title) return;
  const items = readAppActivities();
  saveAppActivities([nextItem, ...items].slice(0, APP_ACTIVITY_LIMIT));
  renderActivityFeed();
}

function clearAppActivities() {
  saveAppActivities([]);
  renderActivityFeed();
}

function setStickyNotesSavedText(text) {
  if (!elements.stickyNotesSavedAt) return;
  elements.stickyNotesSavedAt.textContent = text;
}

function formatStickyNotesSavedAt(value) {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return "Saved locally";
  return `Saved ${date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function readStickyNotes() {
  try {
    return localStorage.getItem(STICKY_NOTES_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function readStickyNotesSavedAt() {
  try {
    return localStorage.getItem(STICKY_NOTES_SAVED_AT_KEY) || "";
  } catch {
    return "";
  }
}

function saveStickyNotes(value) {
  try {
    const text = String(value || "");
    const savedAt = new Date().toISOString();
    if (text) {
      localStorage.setItem(STICKY_NOTES_STORAGE_KEY, text);
      localStorage.setItem(STICKY_NOTES_SAVED_AT_KEY, savedAt);
    } else {
      localStorage.removeItem(STICKY_NOTES_STORAGE_KEY);
      localStorage.removeItem(STICKY_NOTES_SAVED_AT_KEY);
    }
    setStickyNotesSavedText(text ? formatStickyNotesSavedAt(savedAt) : "Cleared");
  } catch {
    setStickyNotesSavedText("Could not save");
  }
}

function scheduleStickyNotesSave() {
  if (!elements.stickyNotesInput) return;
  if (stickyNotesSaveTimer) clearTimeout(stickyNotesSaveTimer);
  setStickyNotesSavedText("Saving...");
  stickyNotesSaveTimer = setTimeout(() => {
    stickyNotesSaveTimer = null;
    saveStickyNotes(elements.stickyNotesInput.value);
  }, 350);
}

function initializeStickyNotes() {
  if (!elements.stickyNotesInput) return;
  elements.stickyNotesInput.value = readStickyNotes();
  setStickyNotesSavedText(formatStickyNotesSavedAt(readStickyNotesSavedAt()));

  elements.stickyNotesInput.addEventListener("input", scheduleStickyNotesSave);
  elements.stickyNotesClearButton?.addEventListener("click", () => {
    if (stickyNotesSaveTimer) clearTimeout(stickyNotesSaveTimer);
    stickyNotesSaveTimer = null;
    elements.stickyNotesInput.value = "";
    saveStickyNotes("");
    elements.stickyNotesInput.focus();
  });
}

function initializeHrHubTooltips() {
  document.querySelectorAll(".hr-hub-link").forEach((link) => {
    const description = link.querySelector(".hr-hub-link-text small")?.textContent?.trim();
    if (description) link.setAttribute("title", description);
  });
}

function recordWorkspaceTabForMode(mode) {
  if (mode === "records") return activeRecordWorkspaceTab;
  if (mode === "suiteWorld") return activeSuiteWorldTab;
  return null;
}

function activityStateFor(mode, recordWorkspaceTab = null) {
  if (mode === "records") {
    return recordWorkspaceActivityState[recordWorkspaceTab || "search"] || null;
  }
  if (mode === "suiteWorld") {
    return suiteWorldWorkspaceActivityState[recordWorkspaceTab || "dupes"] || null;
  }
  return modeActivityState[mode] || null;
}

function isActivityVisible(mode, recordWorkspaceTab = null) {
  if (mode === "records") {
    return activeMode === "records" && (!recordWorkspaceTab || activeRecordWorkspaceTab === recordWorkspaceTab);
  }
  if (mode === "suiteWorld") {
    return activeMode === "suiteWorld" && (!recordWorkspaceTab || activeSuiteWorldTab === recordWorkspaceTab);
  }
  return activeMode === mode;
}

function tabActivityStatus(state, visible) {
  if (state.running > 0) return "running";
  if (!state || visible) return "";
  return state.unseen ? "done" : "";
}

function setTabActivityClass(tab, status) {
  if (!tab) return;
  tab.classList.remove("tab-activity-running", "tab-activity-done");
  tab.removeAttribute("data-tab-activity");
  if (!status) return;
  tab.classList.add(status === "running" ? "tab-activity-running" : "tab-activity-done");
  tab.setAttribute("data-tab-activity", status);
}

function recordModeActivityStatus() {
  const entries = Object.entries(recordWorkspaceActivityState);
  if (entries.some(([, state]) => state.running > 0)) return "running";
  const unseenEntries = activeMode === "records"
    ? entries.filter(([tab]) => tab !== activeRecordWorkspaceTab)
    : entries;
  return unseenEntries.some(([, state]) => state.unseen) ? "done" : "";
}

function salesRepModeActivityStatus() {
  const entries = [
    ["search", modeActivityState.salesReps],
    ["hybrids", modeActivityState.hybrids],
  ];
  if (entries.some(([, state]) => state.running > 0)) return "running";
  const activeSubTab = activeMode === "salesReps" ? "search" : activeMode === "hybrids" ? "hybrids" : null;
  const unseenEntries = activeSubTab
    ? entries.filter(([tab]) => tab !== activeSubTab)
    : entries;
  return unseenEntries.some(([, state]) => state.unseen) ? "done" : "";
}

function suiteWorldModeActivityStatus() {
  const entries = Object.entries(suiteWorldWorkspaceActivityState);
  if (entries.some(([, state]) => state.running > 0)) return "running";
  const unseenEntries = activeMode === "suiteWorld"
    ? entries.filter(([tab]) => tab !== activeSuiteWorldTab)
    : entries;
  return unseenEntries.some(([, state]) => state.unseen) ? "done" : "";
}

function updateActivityIndicators() {
  setTabActivityClass(elements.recordsTab, recordModeActivityStatus());
  setTabActivityClass(elements.salesRepsTab, salesRepModeActivityStatus());
  setTabActivityClass(elements.territoriesTab, tabActivityStatus(modeActivityState.territories, activeMode === "territories"));
  setTabActivityClass(elements.eligibilityTab, tabActivityStatus(modeActivityState.eligibility, activeMode === "eligibility"));
  setTabActivityClass(elements.suiteWorldTab, suiteWorldModeActivityStatus());
  setTabActivityClass(elements.recordSearchTab, tabActivityStatus(recordWorkspaceActivityState.search, activeMode === "records" && activeRecordWorkspaceTab === "search"));
  setTabActivityClass(elements.recordMergeTab, tabActivityStatus(recordWorkspaceActivityState.merge, activeMode === "records" && activeRecordWorkspaceTab === "merge"));
  setTabActivityClass(elements.recordStaticGroupTab, tabActivityStatus(recordWorkspaceActivityState.staticGroup, activeMode === "records" && activeRecordWorkspaceTab === "staticGroup"));
  setTabActivityClass(elements.salesRepSearchTab, tabActivityStatus(modeActivityState.salesReps, activeMode === "salesReps"));
  setTabActivityClass(elements.salesRepHybridTab, tabActivityStatus(modeActivityState.hybrids, activeMode === "hybrids"));
  setTabActivityClass(elements.suiteWorldDupeTab, tabActivityStatus(suiteWorldWorkspaceActivityState.dupes, activeMode === "suiteWorld" && activeSuiteWorldTab === "dupes"));
  setTabActivityClass(elements.suiteWorldDomainTab, tabActivityStatus(suiteWorldWorkspaceActivityState.domain, activeMode === "suiteWorld" && activeSuiteWorldTab === "domain"));
}

function acknowledgeVisibleActivity() {
  if (activeMode === "records") {
    const state = recordWorkspaceActivityState[activeRecordWorkspaceTab];
    if (state) state.unseen = false;
  } else if (activeMode === "suiteWorld") {
    const state = suiteWorldWorkspaceActivityState[activeSuiteWorldTab];
    if (state) state.unseen = false;
  } else if (modeActivityState[activeMode]) {
    modeActivityState[activeMode].unseen = false;
  }
  updateActivityIndicators();
}

function beginTabActivity(mode, recordWorkspaceTab = null) {
  const state = activityStateFor(mode, recordWorkspaceTab);
  if (!state) return null;
  state.running += 1;
  if (isActivityVisible(mode, recordWorkspaceTab)) state.unseen = false;
  updateActivityIndicators();
  return { mode, recordWorkspaceTab };
}

function finishTabActivity(activityToken) {
  if (!activityToken) return;
  const state = activityStateFor(activityToken.mode, activityToken.recordWorkspaceTab);
  if (!state) return;
  state.running = Math.max(0, state.running - 1);
  if (state.running === 0) {
    state.unseen = !isActivityVisible(activityToken.mode, activityToken.recordWorkspaceTab);
  }
  updateActivityIndicators();
}

function readSavedTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return "";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme persistence is optional; the UI still works without localStorage.
  }
}

function searchHistoryKey(mode) {
  return `${SEARCH_HISTORY_KEY_PREFIX}${mode}`;
}

function canUseSearchHistory(mode = activeMode) {
  return SEARCH_HISTORY_MODES.has(mode);
}

function normalizedSearchHistoryValue(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function readSearchHistory(mode) {
  if (!canUseSearchHistory(mode)) return [];
  try {
    const rawItems = JSON.parse(localStorage.getItem(searchHistoryKey(mode)) || "[]");
    if (!Array.isArray(rawItems)) return [];
    return rawItems
      .map(normalizedSearchHistoryValue)
      .filter(Boolean)
      .slice(0, SEARCH_HISTORY_LIMIT);
  } catch {
    return [];
  }
}

function saveSearchHistory(mode, value) {
  const normalizedValue = normalizedSearchHistoryValue(value);
  if (!canUseSearchHistory(mode) || !normalizedValue) return;

  const nextItems = [
    normalizedValue,
    ...readSearchHistory(mode).filter((item) => item.toLowerCase() !== normalizedValue.toLowerCase()),
  ].slice(0, SEARCH_HISTORY_LIMIT);

  try {
    localStorage.setItem(searchHistoryKey(mode), JSON.stringify(nextItems));
  } catch {
    // Search history is optional; searches still work without localStorage.
  }
}

function hideSearchHistory(historyElement = elements.searchHistory, inputElement = elements.searchText) {
  if (!historyElement) return;
  historyElement.classList.add("hidden");
  historyElement.innerHTML = "";
  inputElement?.setAttribute("aria-expanded", "false");
}

function hideAllSearchHistories() {
  hideSearchHistory(elements.searchHistory, elements.searchText);
  hideSearchHistory(elements.territorySalesRepHistory, elements.territorySalesRepInput);
}

function renderSearchHistory(mode = activeMode, options = {}) {
  const historyElement = options.historyElement || elements.searchHistory;
  const inputElement = options.inputElement || elements.searchText;
  if (!historyElement || !inputElement || !canUseSearchHistory(mode) || inputElement.disabled) {
    hideSearchHistory(historyElement, inputElement);
    return;
  }

  const typedValue = normalizedSearchHistoryValue(inputElement.value).toLowerCase();
  const items = readSearchHistory(mode)
    .filter((item) => !typedValue || item.toLowerCase().includes(typedValue))
    .slice(0, SEARCH_HISTORY_LIMIT);

  if (!items.length) {
    hideSearchHistory(historyElement, inputElement);
    return;
  }

  historyElement.innerHTML = items.map((item) => `
    <button type="button" class="search-history-button" role="option" data-search-history-value="${escapeHtml(item)}">${escapeHtml(item)}</button>
  `).join("");
  historyElement.classList.remove("hidden");
  inputElement.setAttribute("aria-expanded", "true");
}

function applySearchHistoryValue(value, options = {}) {
  const historyElement = options.historyElement || elements.searchHistory;
  const inputElement = options.inputElement || elements.searchText;
  if (!inputElement) return;
  inputElement.value = value;
  hideSearchHistory(historyElement, inputElement);
  inputElement.focus();
}

function applyTheme(theme) {
  const requestedTheme = theme === "midgar" ? "soldier" : theme;
  const nextTheme = ["command", "lcie", "lucis", "soldier"].includes(requestedTheme) ? requestedTheme : "standard";
  document.body.dataset.theme = nextTheme;
  if (elements.themeSelect) elements.themeSelect.value = nextTheme;
  saveTheme(nextTheme);
}

function initializeTheme() {
  applyTheme(readSavedTheme() || "standard");
}

function readSavedRightPanelCollapsed() {
  try {
    return localStorage.getItem(RIGHT_PANEL_COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

function saveRightPanelCollapsed(collapsed) {
  try {
    localStorage.setItem(RIGHT_PANEL_COLLAPSED_KEY, String(Boolean(collapsed)));
  } catch {
    // The panel toggle still works for the current page when localStorage is unavailable.
  }
}

function setRightPanelCollapsed(collapsed, options = {}) {
  const nextCollapsed = Boolean(collapsed);
  document.body.classList.toggle("right-panel-collapsed", nextCollapsed);
  elements.rightPanel?.setAttribute("aria-hidden", String(nextCollapsed));
  if (elements.rightPanelToggle) {
    elements.rightPanelToggle.setAttribute("aria-expanded", String(!nextCollapsed));
    elements.rightPanelToggle.setAttribute("aria-label", nextCollapsed ? "Show right panel" : "Hide right panel");
    elements.rightPanelToggle.title = nextCollapsed ? "Show right panel" : "Hide right panel";
  }
  if (options.persist !== false) saveRightPanelCollapsed(nextCollapsed);
}

function initializeRightPanelState() {
  setRightPanelCollapsed(readSavedRightPanelCollapsed(), { persist: false });
  requestAnimationFrame(() => document.body.classList.add("right-panel-motion-ready"));
}

function isDetailCollapsed() {
  return Boolean(elements.summary.closest(".panel")?.classList.contains("detail-collapsed"));
}

function setDetailCollapsed(collapsed) {
  const panel = elements.summary.closest(".panel");
  panel?.classList.toggle("detail-collapsed", Boolean(collapsed));
  elements.detailCollapseButton.innerHTML = DETAIL_COLLAPSE_CHEVRON;
  elements.detailCollapseButton.title = collapsed ? "Expand view" : "Collapse view";
  elements.detailCollapseButton.setAttribute("aria-label", collapsed ? "Expand view" : "Collapse view");
  elements.detailCollapseButton.setAttribute("aria-expanded", String(!collapsed));
}

function lookupStatusClass(mode = "") {
  return mode ? `status-box ${mode}` : "status-box";
}

function setScopedLookupStatus(mode, message, statusMode = "", options = {}) {
  if (mode === activeMode) {
    setStatus(elements.lookupStatus, message, statusMode, options);
    return;
  }
  if (!modeState[mode]) return;
  modeState[mode] = {
    ...modeState[mode],
    lookupStatusClassName: lookupStatusClass(statusMode),
    lookupStatusText: message,
  };
}

function saveModeState(mode = activeMode) {
  if (!modeState[mode]) return;
  modeState[mode] = {
    query: elements.searchText.value,
    resultsHeadHtml: elements.resultsHead.innerHTML,
    resultsBodyHtml: elements.resultsBody.innerHTML,
    detailTitle: elements.detailTitle.textContent,
    selectedRecordHint: elements.selectedRecordHint.textContent,
    summaryHtml: elements.summary.innerHTML,
    summaryClassName: elements.summary.className,
    lookupStatusClassName: elements.lookupStatus.className,
    lookupStatusText: elements.lookupStatus.textContent,
    territorySectionClassName: elements.territorySection.className,
    territoryCountText: elements.territoryCount.textContent,
    territoryListHtml: elements.territoryList.innerHTML,
    extractButtonClassName: elements.extractSalesRepButton.className,
    extractButtonText: elements.extractSalesRepButton.textContent,
    extractButtonDisabled: elements.extractSalesRepButton.disabled,
    openExtractFolderButtonClassName: elements.openExtractFolderButton.className,
    openExtractFolderButtonDisabled: elements.openExtractFolderButton.disabled,
    detailCollapsed: isDetailCollapsed(),
    selectedSalesRep,
    detailMode: activeDetailMode,
  };
}

function restoreModeState(mode) {
  const state = modeState[mode] || defaultModeState(mode);
  const defaultState = defaultModeState(mode);
  const mismatchedDetail = (state.detailMode && state.detailMode !== mode)
    || (mode === "records" && (state.detailTitle === "Sales Rep Information" || state.detailTitle === "Selected Sales Rep"))
    || (mode !== "records" && state.detailTitle === "Selected Record");
  const detailState = mismatchedDetail ? defaultState : state;
  elements.searchText.value = state.query || "";
  elements.resultsHead.innerHTML = state.resultsHeadHtml || resultHeadHtml[mode];
  elements.resultsBody.innerHTML = state.resultsBodyHtml || emptyResultBodyHtml[mode];
  elements.detailTitle.textContent = detailState.detailTitle;
  elements.selectedRecordHint.textContent = detailState.selectedRecordHint;
  elements.summary.innerHTML = detailState.summaryHtml || "";
  elements.summary.className = detailState.summaryClassName || "summary-grid";
  elements.lookupStatus.className = state.lookupStatusClassName || "status-box";
  elements.lookupStatus.textContent = state.lookupStatusText || "";
  elements.territorySection.className = detailState.territorySectionClassName || "territory-section hidden";
  elements.territoryCount.textContent = detailState.territoryCountText || "";
  elements.territoryList.innerHTML = detailState.territoryListHtml || "";
  elements.extractSalesRepButton.className = detailState.extractButtonClassName || "small-button hidden";
  elements.extractSalesRepButton.textContent = detailState.extractButtonText || "Extract";
  elements.extractSalesRepButton.disabled = Boolean(detailState.extractButtonDisabled);
  elements.openExtractFolderButton.className = detailState.openExtractFolderButtonClassName || "small-button secondary hidden";
  elements.openExtractFolderButton.disabled = Boolean(detailState.openExtractFolderButtonDisabled);
  setDetailCollapsed(Boolean(detailState.detailCollapsed));
  selectedSalesRep = mode === "salesReps" || mode === "hybrids" || mode === "eligibility" ? (detailState.selectedSalesRep || null) : null;
  activeDetailMode = detailState.detailMode || null;
  updateEligibilityControls();
}

function resetDetailForMode(mode) {
  const isRecords = mode === "records";
  const isHybrids = mode === "hybrids";
  const isEligibility = mode === "eligibility";
  elements.detailTitle.textContent = isRecords ? "Selected Record" : isHybrids ? "Hybrid Reps" : isEligibility ? "Target Sales Rep" : "Selected Sales Rep";
  elements.selectedRecordHint.textContent = isRecords ? "Use View to load details here." : isHybrids ? "Saved local hybrid reps appear above." : isEligibility ? "Select a sales rep to verify transfer eligibility." : "Use View to load sales rep details here.";
  elements.summary.innerHTML = "";
  elements.summary.className = "summary-grid";
  clearTerritories();
  selectedSalesRep = null;
  activeDetailMode = null;
  elements.extractSalesRepButton.className = "small-button hidden";
  elements.extractSalesRepButton.textContent = "Extract";
  elements.extractSalesRepButton.disabled = false;
  elements.openExtractFolderButton.className = "small-button secondary hidden";
  elements.openExtractFolderButton.disabled = false;
  setDetailCollapsed(false);
  updateEligibilityControls();
}

async function getJson(url) {
  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok || !payload.ok) throw requestError(payload, response.status);
  return payload;
}

async function getJsonWithTimeout(url, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw requestError(payload, response.status);
    return payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      const timeout = new Error("NetSuite request timed out. Refresh and try again.");
      timeout.code = "NSCORP_REQUEST_TIMEOUT";
      throw timeout;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

async function postJson(url, body = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok || !payload.ok) throw requestError(payload, response.status);
  return payload;
}

async function postJsonWithTimeout(url, body = {}, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const payload = await response.json();
    if (!response.ok || !payload.ok) throw requestError(payload, response.status);
    return payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      const timeout = new Error("NetSuite request timed out. Try a smaller list or refresh the app.");
      timeout.code = "NSCORP_REQUEST_TIMEOUT";
      throw timeout;
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function requestError(payload, status) {
  const error = new Error(payload?.error || `Request failed with ${status}`);
  error.code = payload?.code || "";
  error.payload = payload;
  return error;
}

function isWorkerSessionInvalidError(error) {
  const text = String(error?.message || error || "");
  return error?.code === SESSION_INVALID_ERROR_CODE
    || /NSCORP session appears disconnected|lost its NSCORP login|worker.*no longer usable|needs a live NetSuite login|NetSuite global search helper is not available|search helper is not available|caller.*callee.*arguments.*strict mode|Execution context was destroyed|Inspected target navigated or closed/i.test(text);
}

function isRequestTimeoutError(error) {
  return error?.code === "NSCORP_REQUEST_TIMEOUT"
    || /NetSuite request timed out/i.test(String(error?.message || error || ""));
}

function cloneBatchValue(value) {
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

function normalizedCacheText(value) {
  return String(value || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function cachedBatchValue(cache, key) {
  if (!key || !cache.has(key)) return null;
  return cloneBatchValue(cache.get(key));
}

function setCachedBatchValue(cache, key, value) {
  if (!key) return;
  cache.set(key, cloneBatchValue(value));
}

async function postDupeJsonWithTimeout(url, body = {}, timeoutMs = 15000) {
  try {
    return await postJsonWithTimeout(url, body, timeoutMs);
  } catch (error) {
    if (!isRequestTimeoutError(error)) throw error;
    setStatus(elements.dupeStatus, "Duplicate Finder request timed out. Resetting worker and retrying once...", "ok", { autoClear: false });
    await postJson("/api/dupe-stop", {}).catch(() => {});
    return postJsonWithTimeout(url, body, Math.max(timeoutMs, 75000));
  }
}

async function postDomainJsonWithTimeout(url, body = {}, timeoutMs = 15000) {
  try {
    return await postJsonWithTimeout(url, body, timeoutMs);
  } catch (error) {
    if (!isRequestTimeoutError(error)) throw error;
    setStatus(elements.domainStatus, "Domain Search request timed out. Resetting worker and retrying once...", "ok", { autoClear: false });
    await postJson("/api/domain-stop", {}).catch(() => {});
    return postJsonWithTimeout(url, body, timeoutMs);
  }
}

async function postMergeJsonWithTimeout(url, body = {}, timeoutMs = 15000) {
  try {
    return await postJsonWithTimeout(url, body, timeoutMs);
  } catch (error) {
    if (!isRequestTimeoutError(error)) throw error;
    setStatus(elements.mergeStatus, "Search and Merge Worker timed out. Resetting worker and retrying once...", "ok", { autoClear: false });
    await postJson("/api/merge-stop", {}).catch(() => {});
    return postJsonWithTimeout(url, body, timeoutMs);
  }
}

async function postStaticGroupJsonWithTimeout(url, body = {}, timeoutMs = 15000) {
  try {
    return await postJsonWithTimeout(url, body, timeoutMs);
  } catch (error) {
    if (!isRequestTimeoutError(error)) throw error;
    setStatus(elements.staticGroupStatus, "Static Group request timed out. Refresh the app and try again.", "error", { autoClear: false });
    throw error;
  }
}

function workerSessionStoppedMessage(label, completed, total) {
  return `${label} stopped because the NSCORP session is no longer usable. Launch or connect ${selectedBrowserLabel()}, sign in again, then rerun the remaining records. Completed rows were kept (${completed} of ${total}).`;
}

function beginBatchRun(runState, startButton, stopButton, runningText) {
  runState.id += 1;
  runState.stopped = false;
  if (startButton) {
    startButton.disabled = true;
    startButton.dataset.originalText = startButton.textContent;
    startButton.textContent = runningText;
  }
  if (stopButton) {
    stopButton.disabled = false;
    stopButton.classList.remove("hidden");
  }
  return runState.id;
}

function isBatchRunStopped(runState, runId) {
  return runState.id !== runId || runState.stopped;
}

function stopBatchRun(runState, stopButton) {
  runState.stopped = true;
  if (stopButton) {
    stopButton.disabled = true;
    stopButton.classList.remove("hidden");
  }
}

function finishBatchRun(runState, runId, startButton, stopButton, disabled = false) {
  if (runState.id !== runId) return;
  if (startButton) {
    startButton.disabled = disabled;
    startButton.textContent = startButton.dataset.originalText || startButton.textContent;
    delete startButton.dataset.originalText;
  }
  if (stopButton) {
    stopButton.disabled = true;
    stopButton.classList.add("hidden");
  }
}

function formatElapsedTime(elapsedMs) {
  const totalSeconds = Math.max(0, Math.floor(Number(elapsedMs || 0) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value) => String(value).padStart(2, "0");
  return hours ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

function updateDupeElapsedTimer() {
  if (!elements.dupeElapsed || !dupeElapsedStartedAt) return;
  elements.dupeElapsed.textContent = `Elapsed: ${formatElapsedTime(Date.now() - dupeElapsedStartedAt)}`;
}

function startDupeElapsedTimer() {
  if (dupeElapsedTimer) clearInterval(dupeElapsedTimer);
  dupeElapsedStartedAt = Date.now();
  updateDupeElapsedTimer();
  dupeElapsedTimer = setInterval(updateDupeElapsedTimer, 1000);
}

function stopDupeElapsedTimer() {
  if (dupeElapsedTimer) clearInterval(dupeElapsedTimer);
  dupeElapsedTimer = null;
  updateDupeElapsedTimer();
}

function updateDomainElapsedTimer() {
  if (!elements.domainElapsed || !domainElapsedStartedAt) return;
  elements.domainElapsed.textContent = `Elapsed: ${formatElapsedTime(Date.now() - domainElapsedStartedAt)}`;
}

function startDomainElapsedTimer() {
  if (domainElapsedTimer) clearInterval(domainElapsedTimer);
  domainElapsedStartedAt = Date.now();
  updateDomainElapsedTimer();
  domainElapsedTimer = setInterval(updateDomainElapsedTimer, 1000);
}

function stopDomainElapsedTimer() {
  if (domainElapsedTimer) clearInterval(domainElapsedTimer);
  domainElapsedTimer = null;
  updateDomainElapsedTimer();
}

function updateEligibilityElapsedTimer() {
  if (!elements.eligibilityElapsed || !eligibilityElapsedStartedAt) return;
  elements.eligibilityElapsed.textContent = `Elapsed: ${formatElapsedTime(Date.now() - eligibilityElapsedStartedAt)}`;
}

function startEligibilityElapsedTimer() {
  if (eligibilityElapsedTimer) clearInterval(eligibilityElapsedTimer);
  eligibilityElapsedStartedAt = Date.now();
  updateEligibilityElapsedTimer();
  eligibilityElapsedTimer = setInterval(updateEligibilityElapsedTimer, 1000);
}

function stopEligibilityElapsedTimer() {
  if (eligibilityElapsedTimer) clearInterval(eligibilityElapsedTimer);
  eligibilityElapsedTimer = null;
  updateEligibilityElapsedTimer();
}

function updateStaticGroupElapsedTimer() {
  if (!elements.staticGroupElapsed || !staticGroupElapsedStartedAt) return;
  elements.staticGroupElapsed.textContent = `Elapsed: ${formatElapsedTime(Date.now() - staticGroupElapsedStartedAt)}`;
}

function startStaticGroupElapsedTimer() {
  if (staticGroupElapsedTimer) clearInterval(staticGroupElapsedTimer);
  staticGroupElapsedStartedAt = Date.now();
  updateStaticGroupElapsedTimer();
  staticGroupElapsedTimer = setInterval(updateStaticGroupElapsedTimer, 1000);
}

function stopStaticGroupElapsedTimer() {
  if (staticGroupElapsedTimer) clearInterval(staticGroupElapsedTimer);
  staticGroupElapsedTimer = null;
  updateStaticGroupElapsedTimer();
}

function resetStaticGroupElapsedTimer() {
  if (staticGroupElapsedTimer) clearInterval(staticGroupElapsedTimer);
  staticGroupElapsedTimer = null;
  staticGroupElapsedStartedAt = 0;
  if (elements.staticGroupElapsed) elements.staticGroupElapsed.textContent = "Elapsed: 00:00";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUpdatedServer(expectedVersion) {
  const deadline = Date.now() + 45000;
  await sleep(1500);
  while (Date.now() < deadline) {
    try {
      const response = await fetch("/api/health", { cache: "no-store" });
      const payload = await response.json();
      if (response.ok && payload.ok && (!expectedVersion || payload.version === expectedVersion)) {
        updateVersionLabel(payload.version);
        window.location.reload();
        return true;
      }
    } catch {
      // The server is expected to be offline briefly while it restarts.
    }
    await sleep(1000);
  }
  return false;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderTabs(tabs) {
  if (!elements.tabList) return;
  const visibleTabs = Array.isArray(tabs) ? tabs.slice(0, 3) : [];
  if (!visibleTabs.length) {
    elements.tabList.innerHTML = "";
    return;
  }
  elements.tabList.innerHTML = visibleTabs.map((tab) => `
    <div class="tab-item">
      <strong>${escapeHtml(tab.title || "NetSuite")}</strong>
      <span>${escapeHtml(tab.url || "")}</span>
    </div>
  `).join("");
}

function iconSvg(name) {
  const icons = {
    pencil: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 20h9"></path><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>',
    trash: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path></svg>',
    arrowUp: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"></path></svg>',
    arrowDown: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>',
  };
  return icons[name] || "";
}

function getLinkEditor(section) {
  return document.querySelector(`[data-link-editor="${section}"]`);
}

function renderManagedLinks(section) {
  const sectionConfig = linkSections[section];
  const links = Array.isArray(linkState[section]) ? linkState[section] : [];
  const reorderMode = Boolean(linkReorderState[section]);
  if (!sectionConfig) return;
  document.querySelectorAll(`[data-link-reorder-toggle="${section}"]`).forEach((button) => {
    button.classList.toggle("active", reorderMode);
    button.setAttribute("aria-pressed", String(reorderMode));
    button.title = reorderMode ? "Done reordering" : "Reorder";
  });
  if (!links.length) {
    sectionConfig.list.innerHTML = `<div class="quick-link-empty">${sectionConfig.empty}</div>`;
    return;
  }

  sectionConfig.list.innerHTML = links.map((link, index) => `
    <div class="quick-link-row ${reorderMode ? "is-reordering" : ""}">
      <button type="button" class="quick-link-button ${section === "csvLinks" ? "secondary-link" : ""}" data-open-url="${escapeHtml(link.url)}" data-open-label="${escapeHtml(link.label)}">${escapeHtml(link.label)}</button>
      <div class="quick-link-actions">
        ${reorderMode ? `
          <button type="button" class="link-action-button icon-button reorder-action" data-link-move="${section}" data-link-id="${escapeHtml(link.id)}" data-link-direction="up" ${index === 0 ? "disabled" : ""} aria-label="Move ${escapeHtml(link.label)} up" title="Move up">${iconSvg("arrowUp")}</button>
          <button type="button" class="link-action-button icon-button reorder-action" data-link-move="${section}" data-link-id="${escapeHtml(link.id)}" data-link-direction="down" ${index === links.length - 1 ? "disabled" : ""} aria-label="Move ${escapeHtml(link.label)} down" title="Move down">${iconSvg("arrowDown")}</button>
        ` : `
          <button type="button" class="link-action-button icon-button" data-link-edit="${section}" data-link-id="${escapeHtml(link.id)}" aria-label="Edit ${escapeHtml(link.label)}" title="Edit">${iconSvg("pencil")}</button>
          <button type="button" class="link-action-button icon-button danger" data-link-delete="${section}" data-link-id="${escapeHtml(link.id)}" aria-label="Delete ${escapeHtml(link.label)}" title="Delete">${iconSvg("trash")}</button>
        `}
      </div>
    </div>
  `).join("");
}

async function moveManagedLink(section, id, direction) {
  const links = Array.isArray(linkState[section]) ? linkState[section].slice() : [];
  const index = links.findIndex((link) => link.id === id);
  const nextIndex = index + (direction === "up" ? -1 : 1);
  if (index < 0 || nextIndex < 0 || nextIndex >= links.length) return;
  [links[index], links[nextIndex]] = [links[nextIndex], links[index]];
  linkState = { ...linkState, [section]: links };
  renderManagedLinks(section);

  const status = linkSections[section]?.status;
  try {
    const result = await postJson("/api/links/reorder", {
      section,
      orderedIds: links.map((link) => link.id),
    });
    linkState = result.links || linkState;
    renderManagedLinks(section);
    setStatus(status, "Link order saved.", "ok");
  } catch (error) {
    setStatus(status, error.message, "error");
    await loadLinks();
  }
}

function renderAllLinks() {
  renderManagedLinks("quickLinks");
  renderManagedLinks("csvLinks");
}

async function loadLinks() {
  const result = await getJson("/api/links");
  linkState = result.links || { quickLinks: [], csvLinks: [] };
  renderAllLinks();
}

async function loadRecordRegionRules() {
  try {
    const response = await fetch("/record-region-rules.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load record region rules (${response.status}).`);
    const rules = await response.json();
    recordRegionRules = {
      stateProvinceAliases: rules?.stateProvinceAliases || {},
      industryRegionRules: Array.isArray(rules?.industryRegionRules) ? rules.industryRegionRules : [],
    };
  } catch (error) {
    recordRegionRules = { stateProvinceAliases: {}, industryRegionRules: [] };
    console.warn(error);
  }
}

function hideLinkEditor(section) {
  const editor = getLinkEditor(section);
  if (!editor) return;
  editor.classList.add("hidden");
  editor.reset();
  editor.elements.id.value = "";
}

function showLinkEditor(section, link = null) {
  const editor = getLinkEditor(section);
  const status = linkSections[section]?.status;
  if (!editor) return;
  editor.classList.remove("hidden");
  editor.elements.id.value = link?.id || "";
  editor.elements.label.value = link?.label || "";
  editor.elements.url.value = link?.url || "";
  setStatus(status, "");
  editor.elements.label.focus();
}

async function openDebugChromeLink(url, statusElement) {
  const cleanUrl = String(url || "").trim();
  if (!cleanUrl) throw new Error("Paste or copy a link first.");
  const result = await postJson("/api/open-url", { url: cleanUrl });
  setStatus(statusElement, `Opened ${result.targetUrl}.`, "ok");
  return result;
}

function updateVersionLabel(version) {
  elements.appVersion.textContent = version ? `v${version}` : "v...";
  if (elements.homeVersionSummary) elements.homeVersionSummary.textContent = version ? `v${version}` : "v...";
}

function setInstallUpdateVisible(visible) {
  elements.installUpdateButton.classList.toggle("hidden", !visible);
}

async function loadUpdateInfo() {
  try {
    const result = await getJson("/api/update/info");
    updateVersionLabel(result.currentVersion);
  } catch {
    updateVersionLabel("");
  }
}

function recentRecordTypeLabel(record) {
  const detail = String(record?.detail || "").trim().toLowerCase();
  const type = String(record?.recordType || "").trim();
  const url = String(record?.url || "");
  if (/static\s+(customer\s+)?group/i.test(detail) || /\/crm\/common\/crmgroup\.nl/i.test(url)) return "Static Group";
  if (/employee roster/i.test(detail) || /rectype=1572/i.test(url)) return "Employee";
  if (/opportunity/i.test(detail) || /opprtnty\.nl/i.test(url)) return "Opportunity";
  if (/task/i.test(detail) || /\/task\.nl/i.test(url)) return "Task";
  if (/partner/i.test(detail) || /\/partner\.nl/i.test(url)) return "Partner";
  if (/job/i.test(detail) || type.toLowerCase() === "job") return "Job";
  if (/customer/i.test(detail) || type.toLowerCase() === "customer") return "Customer";
  if (/prospect/i.test(detail) || type.toLowerCase() === "prospect") return "Prospect";
  if (/lead/i.test(detail) || type.toLowerCase() === "lead") return "Lead";
  return type && type.toLowerCase() !== "generic"
    ? type.replace(/\b\w/g, (char) => char.toUpperCase())
    : "Record";
}

function recentRecordName(record) {
  return displayValue(record?.label)
    .replace(/\s+#\d+\s*$/, "")
    .trim()
    || "---";
}

function renderRecentRecords(items = recentRecordsState.items) {
  if (!elements.recentRecordsList) return;
  const records = Array.isArray(items) ? items.slice(0, RECENT_RECORD_VISIBLE_LIMIT) : [];
  if (!records.length) {
    elements.recentRecordsList.innerHTML = `
      <div class="empty-state">
        ${noResultsIconHtml()}
        <span>No recent NSCORP records found.</span>
      </div>
    `;
    return;
  }
  elements.recentRecordsList.innerHTML = `
    <table class="recent-record-table" aria-label="Recent Records">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Name</th>
        </tr>
      </thead>
      <tbody>
        ${records.map((record) => `
          <tr class="recent-record-item" data-open-recent-url="${escapeHtml(record.url || "")}">
            <td class="recent-record-type">${escapeHtml(recentRecordTypeLabel(record))}</td>
            <td>
              <a class="recent-record-name" href="${escapeHtml(record.url || "#")}" data-open-recent-url="${escapeHtml(record.url || "")}">${escapeHtml(recentRecordName(record))}</a>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function setHomeHrHubTab(tabName) {
  const cleanTabName = String(tabName || "bookmarks").trim() || "bookmarks";
  document.querySelectorAll("[data-hr-hub-tab]").forEach((button) => {
    const active = button.getAttribute("data-hr-hub-tab") === cleanTabName;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-hr-hub-panel]").forEach((panel) => {
    const active = panel.getAttribute("data-hr-hub-panel") === cleanTabName;
    panel.classList.toggle("active", active);
    panel.toggleAttribute("hidden", !active);
  });
  setStatus(elements.hrHubStatus, "");
}

function renderRecentRecordsLoading() {
  if (!elements.recentRecordsList) return;
  elements.recentRecordsList.innerHTML = `
    <div class="empty-state recent-record-loading" role="status" aria-live="polite">
      <span class="loading-spinner" aria-hidden="true"></span>
      <span>Loading recent records...</span>
    </div>
  `;
}

function renderRecentRecordsError() {
  if (!elements.recentRecordsList) return;
  elements.recentRecordsList.innerHTML = `
    <div class="empty-state">
      ${noResultsIconHtml()}
      <span>Recent records could not be loaded. Refresh to try again.</span>
    </div>
  `;
}

async function loadRecentRecords(options = {}) {
  if (recentRecordsState.loaded && !options.force) {
    renderRecentRecords();
    return recentRecordsState.items;
  }
  if (recentRecordsState.loadingPromise) return recentRecordsState.loadingPromise;
  setStatus(elements.recentRecordsStatus, "");
  renderRecentRecordsLoading();
  recentRecordsState.loadingPromise = (async () => {
    try {
      const result = await getJsonWithTimeout("/api/recent-records", 45000);
      recentRecordsState.items = Array.isArray(result.items) ? result.items : [];
      recentRecordsState.loaded = true;
      renderRecentRecords();
      setStatus(elements.recentRecordsStatus, "");
      return recentRecordsState.items;
    } catch (error) {
      setStatus(elements.recentRecordsStatus, error.message, "error", { autoClear: false });
      if (recentRecordsState.items.length) renderRecentRecords();
      else renderRecentRecordsError();
      throw error;
    } finally {
      recentRecordsState.loadingPromise = null;
    }
  })();
  return recentRecordsState.loadingPromise;
}

function updateStatusMessage(result) {
  const latest = result?.latest;
  if (!latest) return "";
  return result.updateAvailable
    ? `Version ${latest.version} is available.`
    : `You are on the latest version (${result.currentVersion}).`;
}

async function checkForUpdates() {
  const originalText = elements.checkUpdateButton.textContent;
  elements.checkUpdateButton.disabled = true;
  elements.checkUpdateButton.textContent = "Checking...";
  setInstallUpdateVisible(false);
  setStatus(elements.updateStatus, "Checking GitHub for updates...");
  try {
    const result = await getJson("/api/update/check");
    latestUpdate = result;
    updateVersionLabel(result.currentVersion);
    setInstallUpdateVisible(Boolean(result.updateAvailable));
    setStatus(elements.updateStatus, updateStatusMessage(result), result.updateAvailable ? "" : "ok", {
      autoClear: !result.updateAvailable,
    });
  } catch (error) {
    latestUpdate = null;
    setInstallUpdateVisible(false);
    setStatus(elements.updateStatus, error.message, "error");
  } finally {
    elements.checkUpdateButton.disabled = false;
    elements.checkUpdateButton.textContent = originalText;
  }
}

async function installUpdate() {
  const originalText = elements.installUpdateButton.textContent;
  let restarting = false;
  elements.checkUpdateButton.disabled = true;
  elements.installUpdateButton.disabled = true;
  elements.installUpdateButton.textContent = "Installing...";
  setStatus(elements.updateStatus, "Downloading and installing update. Keep this app window open...");
  try {
    const result = await postJson("/api/update/install", {});
    latestUpdate = result;
    setInstallUpdateVisible(false);
    if (result.installed) {
      const expectedVersion = result.latest?.version || "";
      restarting = true;
      setStatus(elements.updateStatus, result.message || "Update installed. Restarting the companion app now...", "ok", {
        autoClear: false,
      });
      try {
        await postJson("/api/update/restart", {});
        setStatus(elements.updateStatus, "Restarting. This page will refresh automatically when the app is ready...", "ok", {
          autoClear: false,
        });
        const reconnected = await waitForUpdatedServer(expectedVersion);
        if (!reconnected) {
          restarting = false;
          setStatus(elements.updateStatus, "Update installed, but automatic reconnect timed out. Start the companion app again from the batch file.", "error", {
            autoClear: false,
          });
        }
      } catch (restartError) {
        restarting = false;
        setStatus(elements.updateStatus, `Update installed, but automatic restart did not start. Start the companion app again from the batch file. ${restartError.message}`, "error", {
          autoClear: false,
        });
      }
      return;
    }
    setStatus(elements.updateStatus, result.message || "No update was installed.", "ok", {
      autoClear: false,
    });
  } catch (error) {
    setStatus(elements.updateStatus, error.message, "error");
  } finally {
    if (!restarting) {
      elements.checkUpdateButton.disabled = false;
      elements.installUpdateButton.disabled = false;
      elements.installUpdateButton.textContent = originalText;
    }
  }
}

function setSessionHealthPill(mode, text) {
  if (!elements.sessionHealthSummary) return;
  elements.sessionHealthSummary.className = `session-health-pill ${mode || "neutral"}`;
  elements.sessionHealthSummary.textContent = text || "Idle";
}

function setSessionHealthToggleMode(mode) {
  if (!elements.sessionHealthToggle) return;
  elements.sessionHealthToggle.className = `badge ${mode || "neutral"} session-health-toggle`;
}

function setSessionHealthPopoverOpen(open) {
  if (!elements.sessionHealthCard) return;
  elements.sessionHealthCard.classList.toggle("hidden", !open);
  elements.sessionHealthToggle?.setAttribute("aria-expanded", String(open));
}

function setSessionHealthRow(key, mode, text) {
  const row = document.querySelector(`[data-health-row="${key}"]`);
  const elementKey = `health${key.charAt(0).toUpperCase()}${key.slice(1)}Value`;
  const valueElement = elements[elementKey];
  row?.classList.remove("ok", "error", "warn", "neutral", "running");
  row?.classList.add(mode || "neutral");
  if (valueElement) valueElement.textContent = text || "---";
}

function setSessionHealthSuiteWorld(mode, text) {
  const row = document.querySelector('[data-health-row="suiteworld"]');
  row?.classList.remove("ok", "error", "warn", "neutral", "running");
  row?.classList.add(mode || "neutral");
  if (elements.healthSuiteWorldValue) elements.healthSuiteWorldValue.textContent = text || "---";
}

function statusWorker(status, lane) {
  const workers = Array.isArray(status?.workers) ? status.workers : [];
  return workers.find((item) => item.lane === lane) || null;
}

function workerHealthDisplay(worker, idleText = "Idle") {
  if (worker?.running) return { mode: "running", text: "Running" };
  if (worker?.ready) return { mode: "ok", text: "Ready" };
  return { mode: "neutral", text: idleText };
}

function renderSessionHealth(status) {
  const connected = Boolean(status?.connected);
  const statusBrowser = normalizeBrowser(status?.browser || selectedBrowser);
  applyBrowserUi(statusBrowser);
  const netSuiteTabCount = Array.isArray(status?.netSuiteTabs) ? status.netSuiteTabs.length : 0;
  const mainWorker = statusWorker(status, "main");
  const roeWorker = statusWorker(status, "roe");
  const dupeWorker = statusWorker(status, "dupe");
  const domainWorker = statusWorker(status, "domain");
  const territoryWorker = statusWorker(status, "territory");
  const staticGroupWorker = statusWorker(status, "staticGroup");
  const workers = [mainWorker, roeWorker, dupeWorker, domainWorker, territoryWorker, staticGroupWorker].filter(Boolean);
  const anyRunning = workers.some((worker) => worker.running);

  if (!connected) {
    setSessionHealthPill("error", "Offline");
    setSessionHealthToggleMode("error");
    setSessionHealthRow("chrome", "error", "Offline");
    setSessionHealthRow("nscorp", "error", "No session");
  } else {
    setSessionHealthRow("chrome", "ok", "Ready");
    if (netSuiteTabCount) {
      setSessionHealthRow("nscorp", "ok", "OK");
    } else {
      setSessionHealthRow("nscorp", "warn", "No NSCORP tab");
    }
  }

  const main = workerHealthDisplay(mainWorker);
  const roe = workerHealthDisplay(roeWorker);
  const territory = workerHealthDisplay(territoryWorker);
  const staticGroup = workerHealthDisplay(staticGroupWorker);
  const suiteWorldReadyCount = [dupeWorker, domainWorker].filter((worker) => worker?.ready).length;
  const suiteWorldRunning = [dupeWorker, domainWorker].some((worker) => worker?.running);
  const suiteWorldMode = suiteWorldRunning ? "running" : suiteWorldReadyCount ? "ok" : "neutral";
  const suiteWorldText = suiteWorldRunning ? "Running" : suiteWorldReadyCount ? `${suiteWorldReadyCount}/2 ready` : "Idle";

  setSessionHealthRow("main", main.mode, main.text);
  setSessionHealthRow("roe", roe.mode, roe.text);
  setSessionHealthSuiteWorld(suiteWorldMode, suiteWorldText);
  setSessionHealthRow("territory", territory.mode, territory.text);
  setSessionHealthRow("staticGroup", staticGroup.mode, staticGroup.text);

  if (connected && netSuiteTabCount && anyRunning) {
    setSessionHealthPill("running", "Working");
    setSessionHealthToggleMode("running");
  } else if (connected && netSuiteTabCount && mainWorker?.ready) {
    setSessionHealthPill("ok", "Healthy");
    setSessionHealthToggleMode("ok");
  } else if (connected) {
    setSessionHealthPill("warn", "Needs check");
    setSessionHealthToggleMode("warn");
  }

  if (elements.healthLastCheck) {
    elements.healthLastCheck.textContent = `Checked ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
}

async function refreshSessionHealth() {
  const status = await getJson("/api/browser/status");
  renderSessionHealth(status);
  return status;
}

function startSessionHealthMonitor() {
  if (sessionHealthTimer) clearInterval(sessionHealthTimer);
  sessionHealthTimer = setInterval(() => {
    refreshSessionHealth().catch((error) => {
      renderSessionHealth({ connected: false, error: error.message });
    });
  }, 30000);
}

async function checkBrowser() {
  const status = await getJson("/api/browser/status");
  renderSessionHealth(status);
  const label = selectedBrowserLabel(status?.browser || selectedBrowser);
  if (status.connected && status.netSuiteTabs?.length) {
    setBadge("ok", "Connected");
    setStatus(elements.connectStatus, `Connected to ${label}.`, "ok");
    renderTabs(status.netSuiteTabs);
    return true;
  }
  if (status.connected) {
    setBadge("neutral", `${label} open`);
    setStatus(elements.connectStatus, `${label} is open, but no NSCORP tab was found. Open NSCORP in that ${label} window.`);
    renderTabs([]);
    return false;
  }
  setBadge("error", "Not connected");
  setStatus(elements.connectStatus, status.error || `${label} is not available.`, "error");
  renderTabs([]);
  return false;
}

function renderResults(items) {
  elements.resultsHead.innerHTML = resultHeadHtml.records;
  elements.resultsBody.innerHTML = recordsResultsBodyHtml(items);
}

function recordsResultsBodyHtml(items) {
  if (!items?.length) {
    return emptyResultBodyHtml.records;
  }

  return items.map((item) => `
    <tr>
      <td>${escapeHtml(item.kind || item.type || "")}</td>
      <td>${escapeHtml(item.internalId)}</td>
      <td>${escapeHtml(item.title || item.companyName || item.entityId || "")}</td>
      <td>${escapeHtml(item.text || [item.entityId, item.companyName, item.status, item.salesRep].filter(Boolean).join(" | "))}</td>
      <td class="nowrap actions-column row-actions">
        ${actionIconButton("view", "View in app", { "data-view-id": item.internalId })}
        ${actionIconButton("open", "Open in NSCORP", { "data-open-id": item.internalId }, { secondary: true })}
        ${actionIconButton("edit", "Edit in NSCORP", { "data-edit-id": item.internalId }, { secondary: true })}
      </td>
    </tr>
  `).join("");
}

function salesRepResultsBodyHtml(items, options = {}) {
  if (!items?.length) {
    return emptyResultBodyHtml[options.mode || "salesReps"];
  }
  const isHybrids = options.mode === "hybrids";
  const isSalesRepSearch = options.mode === "salesReps";
  const actionHtml = (item) => `
    <td class="nowrap actions-column row-actions">
      ${options.eligibility ? `<button type="button" class="small-button" data-select-eligibility-rep-id="${escapeHtml(item.internalId)}">Select</button>` : actionIconButton("view", "View in app", { "data-view-rep-id": item.internalId })}
      ${actionIconButton("open", "Open in NSCORP", { "data-open-rep-id": item.internalId }, { secondary: true })}
    </td>
  `;

  if (isSalesRepSearch) {
    return items.map((item) => `
      <tr>
        <td><span class="result-name-line"><span class="result-name-text">${escapeHtml(item.name || item.title || "")}</span><span class="result-name-badges">${salesRepResultStatusBadge(item.rosterStatus)}${hybridBadge(item)}</span></span></td>
        <td>${escapeHtml(displayValue(item.salesRole))}</td>
        <td>${escapeHtml(displayValue(item.territoryIndustry || item.industry))}</td>
        <td>${escapeHtml(displayValue(item.territoryAnnualRevenue || item.annualRevenue))}</td>
        ${actionHtml(item)}
      </tr>
    `).join("");
  }

  return items.map((item) => `
    <tr>
      ${isHybrids ? "" : `<td>${escapeHtml(item.kind || item.type || "Sales Rep")}</td>`}
      <td>${escapeHtml(item.internalId)}</td>
      <td><span class="result-name-line"><span class="result-name-text">${escapeHtml(item.name || item.title || "")}</span><span class="result-name-badges">${salesRepResultStatusBadge(item.rosterStatus)}${hybridBadge(item)}</span></span></td>
      ${isHybrids ? `<td>${escapeHtml(displayValue(item.vertical))}</td>` : ""}
      ${isHybrids ? `<td>${escapeHtml(displayValue(item.tier))}</td>` : ""}
      ${isHybrids ? `<td>${escapeHtml(displayValue(item.salesSubRegion))}</td>` : ""}
      <td>${escapeHtml(displayValue(item.salesRole))}</td>
      ${actionHtml(item)}
    </tr>
  `).join("");
}

function renderSalesRepResults(items) {
  elements.resultsHead.innerHTML = resultHeadHtml.salesReps;
  elements.resultsBody.innerHTML = salesRepResultsBodyHtml(items, { mode: "salesReps" });
}

function updateModeResults(mode, headHtml, bodyHtml) {
  if (mode === activeMode) {
    elements.resultsHead.innerHTML = headHtml;
    elements.resultsBody.innerHTML = bodyHtml;
    return;
  }
  if (!modeState[mode]) return;
  modeState[mode] = {
    ...modeState[mode],
    resultsHeadHtml: headHtml,
    resultsBodyHtml: bodyHtml,
  };
}

function clearTerritories() {
  elements.territorySection.classList.add("hidden");
  elements.territoryCount.textContent = "";
  elements.territoryList.innerHTML = "";
}

function territoryRevenueRange(name) {
  const tokens = String(name || "").toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
  if (tokens.includes("LMM")) return "$0 to $10M";
  if (tokens.includes("UMM")) return "$10M to $20M";
  if (tokens.includes("MM")) return "$0 to $20M";
  if (tokens.includes("CORP")) return "$20M to $100M";
  if (tokens.includes("ENT")) return "$100M+";
  return "";
}

function territoryIndustryText(territory) {
  const industry = displayValue(territory?.industry);
  const revenue = territoryRevenueRange(territory?.name);
  return revenue ? `${industry} | ${revenue}` : industry;
}

function territoryKey(territory) {
  return String(territory?.internalId || "").trim();
}

function compactTerritory(territory) {
  return {
    internalId: territoryKey(territory),
    name: String(territory?.name || "Territory").trim(),
    description: String(territory?.description || "").trim(),
    industry: String(territory?.industry || "").trim(),
    url: String(territory?.url || "").trim(),
  };
}

function selectedRepTerritoryIds() {
  return new Set((territoryUpdateState.selectedRep?.territories || [])
    .map((territory) => territoryKey(territory))
    .filter(Boolean));
}

function pendingTerritoryChange(action, territoryId) {
  const id = String(territoryId || "").trim();
  return (territoryUpdateState.changes || []).find((change) => change.action === action && territoryKey(change.territory) === id);
}

function territoryChangePill(action) {
  const label = action === "remove" ? "Remove" : "Add";
  const mode = action === "remove" ? "inactive" : "eligible";
  return `<span class="status-pill ${mode}">${label}</span>`;
}

function territoryAnnualRevenueText(territory) {
  return displayValue(territoryRevenueRange(territory?.name));
}

function territoryIndustrySummaryText(territory) {
  return displayValue(territory?.industry || territory?.description);
}

function territoryCurrentSummaryText(territory) {
  const industry = territoryIndustrySummaryText(territory);
  const revenue = territoryAnnualRevenueText(territory);
  const parts = [industry, revenue].filter((value) => value && value !== "---");
  return parts.length ? parts.join(" | ") : "---";
}

function resetTerritoryConfirmation() {
  if (elements.territoryConfirmCheckbox) elements.territoryConfirmCheckbox.checked = false;
}

function updateTerritoryRunControls() {
  const hasRep = Boolean(territoryUpdateState.selectedRep?.internalId && territoryUpdateState.selectedRep?.employeeInternalId);
  const hasChanges = Boolean(territoryUpdateState.changes?.length);
  const confirmed = Boolean(elements.territoryConfirmCheckbox?.checked);
  if (elements.territoryConfirmCheckbox) {
    elements.territoryConfirmCheckbox.disabled = !hasRep || !hasChanges || territoryUpdateState.running;
  }
  if (elements.territoryRunButton) {
    elements.territoryRunButton.disabled = !hasRep || !hasChanges || !confirmed || territoryUpdateState.running;
    elements.territoryRunButton.textContent = territoryUpdateState.running ? "Running..." : "Run Territory Update";
  }
}

function territorySearchResultsHtml(items) {
  if (!items?.length) {
    return `
      <div class="empty-state territory-empty-state territory-inline-empty">
        ${noResultsIconHtml()}
        <span>Search for a Sales Rep to start.</span>
      </div>
    `;
  }
  return `
    <table class="territory-rep-results-table related-table" aria-label="Sales Rep results">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sales Role</th>
          <th>Industry</th>
          <th>Annual Revenue</th>
          <th class="related-open-column" aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        ${items.map((item) => `
          <tr>
            <td><span class="result-name-line"><span class="result-name-text">${escapeHtml(item.name || item.title || "")}</span><span class="result-name-badges">${salesRepResultStatusBadge(item.rosterStatus)}${hybridBadge(item)}</span></span></td>
            <td>${escapeHtml(displayValue(item.salesRole))}</td>
            <td>${escapeHtml(displayValue(item.territoryIndustry || item.industry))}</td>
            <td>${escapeHtml(displayValue(item.territoryAnnualRevenue || item.annualRevenue))}</td>
            <td class="related-open-column">
              <button type="button" class="small-button" data-territory-select-rep-id="${escapeHtml(item.internalId)}">Select</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderTerritoryRepResults() {
  if (!elements.territorySalesRepResults) return;
  elements.territorySalesRepResults.innerHTML = territorySearchResultsHtml(territoryUpdateState.repResults || []);
}

function territorySelectedMeta(rep) {
  return [
    rep?.salesRole,
    rep?.salesRegion,
    rep?.salesSubRegion,
    rep?.tier,
  ].map(displayValue).filter((value) => value !== "---").join(" | ") || "Selected Sales Rep";
}

function territoryCurrentListHtml(rep) {
  const territories = Array.isArray(rep?.territories) ? rep.territories : [];
  if (!territories.length) {
    return `
      <div class="empty-state territory-empty-state territory-inline-empty">
        ${noResultsIconHtml()}
        <span>No territories found.</span>
      </div>
    `;
  }
  return territories.map((territory) => {
    const id = territoryKey(territory);
    const pendingRemove = Boolean(pendingTerritoryChange("remove", id));
    return `
      <div class="territory-current-item${pendingRemove ? " pending-remove" : ""}">
        <div class="territory-current-main">
          <a class="territory-link" href="${escapeHtml(territory.url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(territory.name || "Territory")}</a>
          <span>${escapeHtml(territoryCurrentSummaryText(territory))}</span>
        </div>
        <div class="territory-current-meta">
          <button type="button" class="territory-circle-action territory-remove-action" data-territory-stage-remove="${escapeHtml(id)}" title="${pendingRemove ? "Marked for removal" : "Remove from selected Sales Rep"}" aria-label="${pendingRemove ? "Marked for removal" : "Remove from selected Sales Rep"}" ${pendingRemove ? "disabled" : ""}></button>
        </div>
      </div>
    `;
  }).join("");
}

function territoryChangeSummaryHtml() {
  const changes = territoryUpdateState.changes || [];
  if (!changes.length) {
    return `
      <div class="empty-state territory-empty-state territory-inline-empty">
        ${noResultsIconHtml()}
        <span>No pending territory changes.</span>
      </div>
    `;
  }
  return `
    <table class="territory-change-table related-table" aria-label="Pending territory changes">
      <thead>
        <tr>
          <th>Change</th>
          <th>Territory</th>
          <th>Industry</th>
          <th>Annual Revenue</th>
          <th class="related-open-column" aria-label="Actions"></th>
        </tr>
      </thead>
      <tbody>
        ${changes.map((change, index) => `
          <tr>
            <td>${territoryChangePill(change.action)}</td>
            <td><a class="territory-link" href="${escapeHtml(change.territory?.url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(change.territory?.name || "Territory")}</a></td>
            <td>${escapeHtml(territoryIndustrySummaryText(change.territory))}</td>
            <td>${escapeHtml(territoryAnnualRevenueText(change.territory))}</td>
            <td class="related-open-column">
              <button type="button" class="territory-circle-action territory-remove-action" data-territory-remove-change="${index}" title="Remove from pending changes" aria-label="Remove from pending changes"></button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function territoryUpdateResultsHtml() {
  const rows = territoryUpdateState.results || [];
  if (!rows.length) return "";
  return `
    <div class="territory-update-results">
      <div class="territory-browser-title">Last Run</div>
      <table class="territory-change-table related-table" aria-label="Territory update results">
        <thead>
          <tr>
            <th>Change</th>
            <th>Territory</th>
            <th>Result</th>
            <th>Reason</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${territoryChangePill(row.action)}</td>
              <td>${escapeHtml(row.territory?.name || "Territory")}</td>
              <td>${escapeHtml(displayValue(row.status))}</td>
              <td>${escapeHtml(displayValue(row.reason))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderTerritoryUpdatePanel() {
  renderTerritoryRepResults();
  const rep = territoryUpdateState.selectedRep;
  const hasRep = Boolean(rep?.internalId);
  elements.territorySelectedPanel?.classList.toggle("hidden", !hasRep);
  if (hasRep) {
    if (elements.territorySelectedName) elements.territorySelectedName.textContent = rep.name || "Selected Sales Rep";
    if (elements.territorySelectedMeta) elements.territorySelectedMeta.textContent = territorySelectedMeta(rep);
    if (elements.territorySelectedCount) {
      const count = Array.isArray(rep.territories) ? rep.territories.length : 0;
      elements.territorySelectedCount.textContent = `${count} ${count === 1 ? "territory" : "territories"}`;
    }
    if (elements.territorySelectedList) elements.territorySelectedList.innerHTML = territoryCurrentListHtml(rep);
  }
  if (elements.territoryChangeCount) {
    const count = territoryUpdateState.changes?.length || 0;
    elements.territoryChangeCount.textContent = `${count} pending`;
  }
  if (elements.territoryChangeSummary) {
    elements.territoryChangeSummary.classList.toggle("has-territory-changes", Boolean(territoryUpdateState.changes?.length));
    elements.territoryChangeSummary.innerHTML = territoryChangeSummaryHtml();
  }
  if (elements.territoryRunResults) elements.territoryRunResults.innerHTML = territoryUpdateResultsHtml();
  updateTerritoryRunControls();
}

function territoryAddButtonHtml(territory) {
  const id = territoryKey(territory);
  const hasRep = Boolean(territoryUpdateState.selectedRep?.internalId);
  const assigned = selectedRepTerritoryIds().has(id);
  const pending = Boolean(pendingTerritoryChange("add", id));
  const disabled = !hasRep || assigned || pending;
  const title = !hasRep ? "Select a Sales Rep first" : assigned ? "Already assigned to selected Sales Rep" : pending ? "Already marked for addition" : "Add to selected Sales Rep";
  return `
    <button type="button" class="territory-circle-action territory-add-action" data-territory-stage-add="${escapeHtml(id)}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}" ${disabled ? "disabled" : ""}>
      ${ACTION_ICONS.plus}
    </button>
  `;
}

function findTerritoryById(internalId) {
  const id = String(internalId || "").trim();
  const selectedTerritory = (territoryUpdateState.selectedRep?.territories || []).find((territory) => territoryKey(territory) === id);
  return selectedTerritory || (territoryCatalogState.items || []).find((territory) => territoryKey(territory) === id) || null;
}

function stageTerritoryChange(action, territory) {
  const rep = territoryUpdateState.selectedRep;
  const id = territoryKey(territory);
  if (!rep?.internalId) {
    setStatus(elements.territoryBrowserStatus, "Select a Sales Rep first.", "error");
    return;
  }
  if (!rep.employeeInternalId) {
    setStatus(elements.territoryBrowserStatus, "Selected Sales Rep is missing an Employee internal ID.", "error");
    return;
  }
  if (!id) {
    setStatus(elements.territoryBrowserStatus, "Territory internal ID is required.", "error");
    return;
  }
  const assigned = selectedRepTerritoryIds().has(id);
  if (action === "add" && assigned) {
    setStatus(elements.territoryBrowserStatus, "That territory is already assigned to the selected Sales Rep.", "error");
    return;
  }
  if (action === "remove" && !assigned) {
    setStatus(elements.territoryBrowserStatus, "That territory is not assigned to the selected Sales Rep.", "error");
    return;
  }
  if (pendingTerritoryChange(action, id)) {
    setStatus(elements.territoryBrowserStatus, "That territory change is already in the summary.", "error");
    return;
  }
  territoryUpdateState.changes.push({ action, territory: compactTerritory(territory) });
  territoryUpdateState.results = [];
  resetTerritoryConfirmation();
  renderTerritoryBrowser();
  renderTerritoryUpdatePanel();
  setStatus(elements.territoryBrowserStatus, `${action === "add" ? "Addition" : "Removal"} added to the summary.`, "ok");
}

function removeTerritoryChange(index) {
  const changes = territoryUpdateState.changes || [];
  if (index < 0 || index >= changes.length) return;
  changes.splice(index, 1);
  territoryUpdateState.results = [];
  resetTerritoryConfirmation();
  renderTerritoryBrowser();
  renderTerritoryUpdatePanel();
}

function territoryUpdatePayload() {
  const rep = territoryUpdateState.selectedRep || {};
  return {
    salesRep: {
      internalId: rep.internalId || "",
      employeeInternalId: rep.employeeInternalId || "",
      name: rep.name || "",
    },
    changes: territoryUpdateState.changes || [],
  };
}

function renderTerritories(rep) {
  const territoryState = territoryDetailState(rep);
  elements.territorySection.className = territoryState.territorySectionClassName;
  elements.territoryCount.textContent = territoryState.territoryCountText;
  elements.territoryList.innerHTML = territoryState.territoryListHtml;
}

function territoryDetailState(rep) {
  const territories = Array.isArray(rep?.territories) ? rep.territories : [];
  if (!territories.length) {
    return {
      territorySectionClassName: "territory-section record-section territory-empty-section",
      territoryCountText: "0 territories",
      territoryListHtml: `
        <div class="territory-empty-action">
          <div>
            <strong>No territories found</strong>
            <span>Add this sales rep to a territory in NSCORP.</span>
          </div>
          <button type="button" class="small-button secondary territory-add-button" data-open-add-territory>Add to Territory</button>
        </div>
      `,
    };
  }

  return {
    territorySectionClassName: "territory-section record-section",
    territoryCountText: `${territories.length} ${territories.length === 1 ? "territory" : "territories"}`,
    territoryListHtml: territories.map((territory) => `
      <div class="territory-item">
        <div class="territory-main">
          <a class="territory-link" href="${escapeHtml(territory.url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(territory.name || "Territory")}</a>
        </div>
        <div class="territory-meta">
          <span>Industry</span>
          <strong>${escapeHtml(territoryIndustryText(territory))}</strong>
        </div>
      </div>
    `).join(""),
  };
}

function renderHybridResults(items) {
  elements.resultsHead.innerHTML = resultHeadHtml.hybrids;
  elements.resultsBody.innerHTML = salesRepResultsBodyHtml(items, { mode: "hybrids" });
}

async function loadHybridReps(options = {}) {
  const targetMode = "hybrids";
  if (activeMode === targetMode || options.showStatus) setScopedLookupStatus(targetMode, "Loading local hybrid reps...");
  const result = await getJson("/api/hybrid-reps");
  updateModeResults(targetMode, resultHeadHtml.hybrids, salesRepResultsBodyHtml(result.items || [], { mode: "hybrids" }));
  if (activeMode === targetMode || options.showStatus) setScopedLookupStatus(targetMode, `Showing ${(result.items || []).length} local hybrid rep(s).`, "ok");
  return result.items || [];
}

function territoryNameTokens(territory) {
  return String(territory?.name || "")
    .toUpperCase()
    .split(/[^A-Z0-9&]+/)
    .filter(Boolean);
}

function territoryTokenSet(territory) {
  return new Set(territoryNameTokens(territory));
}

function territoryGeneralText(territory) {
  return [
    territory?.name,
    territory?.internalId,
    territory?.description,
    territory?.url,
  ].filter(Boolean).join(" ").toLowerCase();
}

function territoryMatchesGeneral(territory, query) {
  const terms = String(query || "").trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return true;
  const haystack = territoryGeneralText(territory);
  return terms.every((term) => haystack.includes(term));
}

function territoryMatchesVertical(territory, vertical) {
  if (!vertical) return true;
  return String(territory?.name || "").toUpperCase().includes(String(vertical).toUpperCase());
}

function territoryMatchesTier(territory, tier) {
  if (!tier) return true;
  const tokens = territoryTokenSet(territory);
  const value = String(tier || "").toUpperCase();
  if (value === "MM") return ["LMM", "UMM", "MM"].some((token) => tokens.has(token));
  return tokens.has(value);
}

function territoryMatchesRegion(territory, region) {
  if (!region) return true;
  const tokens = territoryTokenSet(territory);
  const value = String(region || "").toUpperCase();
  if (value === "CENTRAL") return tokens.has("CENTRAL") || tokens.has("CENTRAL_QC");
  return tokens.has(value);
}

function territoryRegionOptionsForVertical(vertical) {
  if (vertical && vertical !== "PROD") {
    return TERRITORY_REGION_OPTIONS.filter((option) => !["SOUTH", "CENTRAL"].includes(option.value));
  }
  return TERRITORY_REGION_OPTIONS;
}

function refreshTerritoryRegionOptions() {
  if (!elements.territoryRegionFilter) return;
  const currentValue = elements.territoryRegionFilter.value;
  const options = territoryRegionOptionsForVertical(elements.territoryVerticalFilter?.value || "");
  elements.territoryRegionFilter.innerHTML = options
    .map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`)
    .join("");
  elements.territoryRegionFilter.value = options.some((option) => option.value === currentValue) ? currentValue : "";
}

function territoryBadges(territory) {
  const name = String(territory?.name || "");
  const tokens = territoryTokenSet(territory);
  const vertical = ["BizSvcs", "C&E", "ConsSvcs", "H&H", "PROD", "SDR", "SFT"]
    .find((value) => name.toUpperCase().includes(value.toUpperCase())) || "";
  const tier = tokens.has("ENT") ? "ENT"
    : tokens.has("CORP") ? "CORP"
      : ["LMM", "UMM", "MM"].find((value) => tokens.has(value)) || "";
  const region = tokens.has("SOUTH") ? "South"
    : (tokens.has("CENTRAL") || tokens.has("CENTRAL_QC")) ? "Central"
      : tokens.has("EAST") ? "East"
        : tokens.has("WEST") ? "West"
          : ["EMEA", "ANZ", "APJ", "LATAM"].find((value) => tokens.has(value)) || "";
  return [vertical, tier, region].filter(Boolean);
}

function filteredTerritories() {
  const general = elements.territoryGeneralFilter?.value || "";
  const vertical = elements.territoryVerticalFilter?.value || "";
  const tier = elements.territoryTierFilter?.value || "";
  const region = elements.territoryRegionFilter?.value || "";
  return (territoryCatalogState.items || []).filter((territory) => (
    territoryMatchesGeneral(territory, general)
    && territoryMatchesVertical(territory, vertical)
    && territoryMatchesTier(territory, tier)
    && territoryMatchesRegion(territory, region)
  ));
}

function renderTerritoryBrowser() {
  if (!elements.territoryBrowserList) return;
  refreshTerritoryRegionOptions();
  const total = territoryCatalogState.items.length;
  const items = filteredTerritories();
  elements.territoryBrowserCount.textContent = total
    ? `${items.length} of ${total} ${total === 1 ? "territory" : "territories"}`
    : "0 territories";
  if (territoryCatalogState.loadingPromise) {
    elements.territoryBrowserList.innerHTML = `
      <div class="empty-state territory-empty-state">
        ${noResultsIconHtml()}
        <span>Loading territories...</span>
      </div>
    `;
    return;
  }
  if (!territoryCatalogState.loaded) {
    elements.territoryBrowserList.innerHTML = `
      <div class="empty-state territory-empty-state">
        ${noResultsIconHtml()}
        <span>Territories will load here.</span>
      </div>
    `;
    return;
  }
  if (!items.length) {
    elements.territoryBrowserList.innerHTML = `
      <div class="empty-state territory-empty-state">
        ${noResultsIconHtml()}
        <span>No Territory Found.</span>
      </div>
    `;
    return;
  }
  elements.territoryBrowserList.innerHTML = `
    <table class="territory-browser-table" aria-label="Territory list">
      <thead>
        <tr class="territory-browser-header">
          <th scope="col">Territory</th>
          <th scope="col">Description</th>
          <th scope="col" class="territory-action-column" aria-label="Action"></th>
        </tr>
      </thead>
      <tbody>
        ${items.map((territory) => `
          <tr class="territory-browser-item">
            <td>
              <a class="territory-browser-name" href="${escapeHtml(territory.url || "#")}" data-open-territory-url="${escapeHtml(territory.url || "")}">${escapeHtml(territory.name || "Territory")}</a>
            </td>
            <td class="territory-browser-description">${escapeHtml(displayValue(territory.description))}</td>
            <td class="territory-action-column">${territoryAddButtonHtml(territory)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function ensureTerritoriesLoaded(options = {}) {
  if (territoryCatalogState.loaded && !options.force) {
    renderTerritoryBrowser();
    return territoryCatalogState.items;
  }
  if (territoryCatalogState.loadingPromise) {
    if (!options.force) return territoryCatalogState.loadingPromise;
    await postJson("/api/territory-stop", {}).catch(() => {});
    territoryCatalogState.loadingPromise = null;
  }
  const activityToken = beginTabActivity("territories");
  setStatus(elements.territoryBrowserStatus, "Loading territories from NSCORP...", "", { autoClear: false });
  territoryCatalogState.loadingPromise = (async () => {
    try {
      renderTerritoryBrowser();
      const result = await getJsonWithTimeout("/api/territories", 90000);
      territoryCatalogState.items = Array.isArray(result.items) ? result.items : [];
      territoryCatalogState.loaded = true;
      setStatus(elements.territoryBrowserStatus, `Loaded ${territoryCatalogState.items.length} territory record(s).`, "ok");
      renderTerritoryBrowser();
      return territoryCatalogState.items;
    } finally {
      territoryCatalogState.loadingPromise = null;
      finishTabActivity(activityToken);
      renderTerritoryBrowser();
    }
  })();
  return territoryCatalogState.loadingPromise;
}

function isNoValue(value) {
  return ["no", "n", "false", "f", "unchecked"].includes(String(value || "").trim().toLowerCase());
}

function isYesValue(value) {
  return ["yes", "y", "true", "t", "checked"].includes(String(value || "").trim().toLowerCase());
}

function displayValue(value) {
  if (value === 0) return "0";
  const text = String(value ?? "").trim();
  return text || "---";
}

function webAddressUrl(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "---") return "";
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw.replace(/^\/\//, "")}`;
  try {
    return new URL(candidate).toString();
  } catch {
    return "";
  }
}

function linkedDisplayValue(value, options = {}) {
  const text = displayValue(value);
  const linkUrl = options.webLink ? webAddressUrl(value) : "";
  if (!linkUrl) return escapeHtml(text);
  return `<a class="field-text-link" href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(text)}</a>`;
}

function salesRepStatusBadge(status) {
  const text = String(status || "").trim();
  if (!text) return "";
  const mode = /inactive/i.test(text) ? "inactive" : /active/i.test(text) ? "active" : "neutral";
  return `<span class="status-pill ${mode}">${escapeHtml(text)}</span>`;
}

function salesRepResultStatusBadge(status) {
  return /inactive/i.test(String(status || "")) ? '<span class="status-pill inactive">Inactive</span>' : "";
}

function isHybridSalesRep(rep) {
  return rep?.hybrid === true || isYesValue(rep?.hybrid);
}

function hybridBadge(rep) {
  return isHybridSalesRep(rep) ? '<span class="status-pill hybrid">Hybrid</span>' : "";
}

function recordInactiveBadge(record) {
  return isYesValue(record?.inactive) ? '<span class="status-pill inactive">Inactive</span>' : "";
}

function eligibilityEmptyRow(message = "No eligibility results yet.") {
  return message === "No eligibility results yet."
    ? noResultsRow(8, message)
    : tableEmptyRow(8, message);
}

function updateEligibilityControls() {
  if (!elements.verifyEligibilityButton) return;
  const active = activeMode === "eligibility";
  elements.verifyEligibilityButton.disabled = !active || !selectedSalesRep?.internalId;
}

function clearEligibilityResults(message = "No eligibility results yet.") {
  if (!elements.eligibilityResultsBody) return;
  eligibilityResultRows = [];
  elements.eligibilityResultsBody.innerHTML = eligibilityEmptyRow(message);
  elements.eligibilityCount.textContent = "0 records";
  if (elements.eligibilityExportButton) elements.eligibilityExportButton.disabled = true;
  if (elements.eligibilityOpenExtractFolderButton) {
    elements.eligibilityOpenExtractFolderButton.classList.add("hidden");
    elements.eligibilityOpenExtractFolderButton.disabled = false;
    elements.eligibilityOpenExtractFolderButton.textContent = "Open Folder";
  }
}

function parseEligibilityLeadInput(text) {
  const seen = new Set();
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
       let internalId = "";
       let directUrl = "";
      try {
        const urlMatch = line.match(/https?:\/\/\S+|www\.\S+/i);
        if (urlMatch) {
          const parsed = new URL(urlMatch[0].startsWith("www.") ? `https://${urlMatch[0]}` : urlMatch[0]);
           directUrl = parsed.href;
           internalId = parsed.searchParams.get("id") || "";
          internalId = internalId.match(/\d+/)?.[0] || "";
        }
      } catch {
        internalId = "";
      }
      if (!internalId) {
        const idMatch = line.match(/(?:^|\s)(?:internal\s*id[:#]?\s*)?(\d{4,})(?:\s|$)/i);
        if (idMatch && /^(\d+)$/.test(line.replace(/internal\s*id[:#]?\s*/i, "").trim())) internalId = idMatch[1];
      }
      const key = internalId ? `id:${internalId}` : `q:${line.toLowerCase()}`;
      if (seen.has(key)) return null;
      seen.add(key);
       return { raw: line, internalId, directUrl, query: internalId ? "" : line };
    })
    .filter(Boolean);
}

function parseMergeEntries(value, fieldLabel = "Merge field") {
  const seen = new Set();
  return String(value || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
       let internalId = "";
       let directUrl = "";
      try {
        const urlMatch = line.match(/https?:\/\/\S+|www\.\S+/i);
        if (urlMatch) {
          const parsed = new URL(urlMatch[0].startsWith("www.") ? `https://${urlMatch[0]}` : urlMatch[0]);
          const path = parsed.pathname.toLowerCase();
          const allowedPaths = ["/app/common/entity/custjob.nl", "/app/common/entity/entity.nl"];
          if (path.includes("/app/common/entity/entitymerge.nl")) {
            throw new Error(`entitymerge.nl URLs are merge pages, not records on the ${fieldLabel}. Use the actual record URL instead.`);
          }
          if (!allowedPaths.includes(path)) {
            throw new Error(`Unsupported NetSuite record URL on the ${fieldLabel}. Use custjob.nl or entity.nl record URLs only.`);
          }
           directUrl = parsed.href;
           internalId = parsed.searchParams.get("id") || "";
          internalId = internalId.match(/\d+/)?.[0] || "";
          if (!internalId) {
            throw new Error(`The record URL on the ${fieldLabel} must include an id value.`);
          }
        }
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error(`Invalid URL on the ${fieldLabel}: ${line}`);
        }
        throw error;
      }
      if (!internalId) {
        const idMatch = line.match(/(?:^|\s)(?:internal\s*id[:#]?\s*)?(\d{4,})(?:\s|$)/i);
        if (idMatch && /^(\d+)$/.test(line.replace(/internal\s*id[:#]?\s*/i, "").trim())) internalId = idMatch[1];
      }
      const key = internalId ? `id:${internalId}` : `q:${line.toLowerCase()}`;
      if (seen.has(key)) return null;
      seen.add(key);
       return { raw: line, internalId, directUrl, query: internalId ? "" : line };
    })
    .filter(Boolean);
}

function mergeRecordSearchQueries(entry) {
  const queries = [];
  const add = (value) => {
    const text = String(value || "").trim();
    if (text && !queries.some((item) => item.toLowerCase() === text.toLowerCase())) queries.push(text);
  };
  const companyId = mergeEntryCompanyId(entry);
  const raw = String(entry?.raw || "").trim();
  const rawLooksLikeUrl = /^https?:\/\//i.test(raw) || /^www\./i.test(raw);
  const requestedName = mergeEntryCompanyName(entry);
  if (companyId && requestedName) add(`cu:${companyId} ${requestedName}`);
  if (companyId) add(`cu:${companyId}`);
  const cleanedQuery = mergeCleanCompanySearchText(entry?.query || raw);
  if (cleanedQuery) add(cleanedQuery);
  add(entry?.query);
  if (raw && !rawLooksLikeUrl) add(raw);
  return queries;
}

function mergeEntryCompanyName(entry) {
  const raw = String(entry?.raw || entry?.query || "").trim();
  if (!raw || /^https?:\/\//i.test(raw) || /^www\./i.test(raw)) return "";
  if (/^\d{4,}$/.test(raw)) return "";
  let name = raw
    .replace(/^cu:\s*\d{4,}\b\s*/i, "")
    .replace(/^internal\s*id[:#]?\s*\d{4,}\b\s*/i, "")
    .replace(/^\d{4,}\s+/, "")
    .replace(/\s+/g, " ")
    .trim();
  return dupeStripTrailingLegalSuffixes(name).replace(/\s*,\s*$/g, "").trim();
}

function mergeEntryCompanyId(entry) {
  const raw = String(entry?.raw || entry?.query || "").trim();
  const cuMatch = raw.match(/\bcu:\s*(\d{4,})\b/i);
  if (cuMatch) return cuMatch[1];
  if (/^\d{4,}$/.test(raw)) return raw;
  if (!/\binternal\s*id\b/i.test(raw)) {
    const leadingCompanyId = raw.match(/^\s*(\d{4,})(?=\s+\S)/);
    if (leadingCompanyId) return leadingCompanyId[1];
  }
  return "";
}

function mergeCleanCompanySearchText(value) {
  let text = String(value || "").replace(/\s+/g, " ").trim();
  if (!text || /^https?:\/\//i.test(text) || /^www\./i.test(text)) return "";
  text = text.replace(/\bcu:\s*\d{4,}\b/i, "").trim();
  text = text.replace(/^\s*\d{4,}\s+/, "").trim();
  text = text.replace(/^[,;:\-|\s]+|[,;:\-|\s]+$/g, "").trim();
  const cleaned = dupeStripTrailingLegalSuffixes(text)
    .replace(/\s*,\s*$/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned && cleaned.toLowerCase() !== text.toLowerCase() ? cleaned : "";
}

function mergeSearchItemCompanyId(item) {
  const explicitId = String(item?.companyId || item?.entityId || item?.id || "").trim();
  const explicitIdMatch = explicitId.match(/^\s*(\d{4,})\b/);
  if (explicitIdMatch) return explicitIdMatch[1];
  const text = String(item?.title || item?.name || item?.entityId || "").trim();
  return text.match(/^\s*(\d{4,})\b/)?.[1] || "";
}

function mergeSearchItemIsJob(item) {
  const values = [item?.entityId, item?.companyId, item?.title, item?.name, item?.type, item?.recordType]
    .map((value) => String(value || "").trim());
  return values.some((value) => /^J(?:\d|\s)/i.test(value) || /^job\b/i.test(value));
}

function mergeSearchResultForEntry(entry, items) {
  const list = (Array.isArray(items) ? items : []).filter((item) => !mergeSearchItemIsJob(item));
  const companyId = mergeEntryCompanyId(entry);
  if (companyId) {
    const exact = list.find((item) => mergeSearchItemCompanyId(item) === companyId);
    if (!exact) return null;
    const requestedName = normalizeCompanyName(mergeEntryCompanyName(entry));
    if (!requestedName) return exact;
    const resultName = normalizeCompanyName(String(exact?.title || exact?.name || "").replace(/^\d{4,}\s+/, ""));
    return resultName && (resultName === requestedName || resultName.includes(requestedName) || requestedName.includes(resultName))
      ? exact
      : null;
  }
  const requestedName = normalizeCompanyName(mergeEntryCompanyName(entry));
  if (!requestedName) return null;
  return list.find((item) => {
    const resultName = normalizeCompanyName(String(item?.title || item?.name || "").replace(/^\d{4,}\s+/, ""));
    return resultName && (resultName === requestedName || resultName.includes(requestedName) || requestedName.includes(resultName));
  }) || null;
}

function recordEntryCacheKey(entry) {
  if (entry?.internalId) return `internal:${String(entry.internalId).trim()}`;
  const companyId = mergeEntryCompanyId(entry);
  if (companyId) return `company:${companyId}`;
  const query = normalizedCacheText(entry?.query || entry?.raw);
  return query ? `query:${query}` : "";
}

function eligibilityEntryCacheKey(entry, rep) {
  const repKey = String(rep?.internalId || rep?.name || "").trim();
  const entryKey = entry?.internalId
    ? `internal:${String(entry.internalId).trim()}`
    : `query:${normalizedCacheText(entry?.query || entry?.raw)}`;
  return repKey && entryKey ? `rep:${repKey}|${entryKey}` : "";
}

function domainEntryCacheKey(entry) {
  const domain = normalizedCacheText(entry?.domain);
  return domain ? `domain:${domain}` : "";
}

function mergeMissingRecord(entry) {
  return {
    missing: true,
    source: String(entry?.raw || entry?.query || entry?.internalId || "").trim(),
  };
}

function mergeEmptyCard(message) {
  return `<div class="merge-empty">${escapeHtml(message)}</div>`;
}

function mergeRecordTitle(record, fallback = "Record") {
  if (record?.missing) return "Record does not exist";
  const id = cleanRecordId(record);
  const name = String(record?.companyName || "").trim();
  const idName = normalizeCompanyName(id);
  const companyName = normalizeCompanyName(name);
  if (id && name && idName && companyName && idName.includes(companyName)) {
    return id;
  }
  return [id, name].filter(Boolean).join(" ") || record?.internalId || fallback;
}

function mergePrimaryAutocompleteLabel(record) {
  if (record?.missing) return "";
  const id = cleanRecordId(record);
  const name = String(record?.companyName || "").trim();
  return [id, name].filter(Boolean).join(" ") || String(record?.internalId || "").trim();
}

function mergeRecordValue(record, key) {
  if (key === "entityId") return displayValue(cleanRecordId(record));
  return displayValue(record?.[key]);
}

function mergeCompareValue(value) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim();
  return normalized === "---" ? "" : normalized.toLowerCase();
}

function mergeStatusValue(value) {
  return String(value || "").replace(/\s+/g, " ").trim().toUpperCase();
}

function mergeStageValue(value) {
  const status = mergeStatusValue(value);
  for (const stage of ["LEAD", "PROSPECT", "CUSTOMER"]) {
    if (status.includes(stage)) return stage;
  }
  return status;
}

function mergeDateWithinPastDays(value, days) {
  const raw = String(value || "").trim();
  if (!raw || raw === "---") return false;
  const match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const parsed = match
    ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2]))
    : new Date(raw);
  if (Number.isNaN(parsed.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - parsed.getTime()) / 86400000);
  return diffDays >= 0 && diffDays <= days;
}

function salesRepOkForMergeDifference(value) {
  const normalized = mergeCompareValue(value);
  return normalized === "nurturing, marketing" || normalized === "none";
}

function mergeWebDomainParts(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "---") return null;
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  let hostname = "";
  try {
    hostname = new URL(candidate).hostname;
  } catch {
    hostname = raw.split(/[/?#]/)[0];
  }
  const labels = hostname
    .toLowerCase()
    .replace(/^www\./, "")
    .split(".")
    .filter(Boolean);
  if (labels.length < 2) return null;
  const twoPartSuffixes = new Set(["co.uk", "com.au", "com.br", "com.cn", "com.mx", "com.ph", "com.sg", "co.jp"]);
  const suffix = labels.slice(-2).join(".");
  if (labels.length >= 3 && twoPartSuffixes.has(suffix)) {
    return { secondLevel: labels[labels.length - 3], topLevel: suffix };
  }
  return { secondLevel: labels[labels.length - 2], topLevel: labels[labels.length - 1] };
}

function mergeWebAddressDiffers(primaryValue, duplicateValue) {
  const primary = mergeWebDomainParts(primaryValue);
  const duplicate = mergeWebDomainParts(duplicateValue);
  if (!primary || !duplicate) return false;
  return primary.secondLevel !== duplicate.secondLevel || primary.topLevel !== duplicate.topLevel;
}

function dupeFullHostKey(value) {
  const raw = String(value || "").trim();
  if (!raw || raw === "---") return "";

  const emailMatch = raw.match(/[a-z0-9._%+-]+@([a-z0-9.-]+\.[a-z]{2,})/i);
  let candidate = emailMatch ? emailMatch[1] : raw.replace(/^mailto:/i, "").trim();

  candidate = candidate
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, "")
    .replace(/^\/\//, "")
    .replace(/^[^@/?#]+@/, "")
    .split(/[/?#]/)[0]
    .split(/\s+/)[0]
    .replace(/:\d+$/, "")
    .toLowerCase()
    .replace(/^www\./, "")
    .replace(/^\.+|\.+$/g, "");

  return /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(candidate) ? candidate : "";
}

function dupeDomainKey(value) {
  return dupeFullHostKey(value);
}

function dupeSearchDomain(value) {
  const key = dupeDomainKey(value);
  return key;
}

function parseDomainSearchEntries(value) {
  return String(value || "")
    .split(/\r?\n/)
    .map((raw) => raw.trim())
    .filter(Boolean)
    .map((raw) => {
      const cleaned = raw.replace(/^[<("'`]+|[>)"'`,;]+$/g, "").replace(/\s+/g, "").trim();
      const isNetSuiteUrl = /(?:^|\/\/)nlcorp\.app\.netsuite\.com\b/i.test(cleaned)
        || /\/app\/common\/entity\//i.test(cleaned);
      const domain = isNetSuiteUrl ? "" : dupeDomainKey(cleaned);
      const isPublic = domain ? dupeIsPublicEmailDomain(domain) : false;
      return {
        raw,
        domain: isPublic ? "" : domain,
        error: isNetSuiteUrl
          ? "Unsupported input. Paste website or email domain only."
          : isPublic
            ? "Public email domain ignored."
            : domain
              ? ""
              : "Could not read a valid domain.",
      };
    });
}

function dupeIsPublicEmailDomain(domain) {
  const publicDomains = new Set([
    "gmail.com",
    "googlemail.com",
    "yahoo.com",
    "ymail.com",
    "rocketmail.com",
    "aol.com",
    "hotmail.com",
    "outlook.com",
    "live.com",
    "msn.com",
    "icloud.com",
    "me.com",
    "mac.com",
    "proton.me",
    "protonmail.com",
    "mail.com",
    "gmx.com",
    "gmx.net",
    "comcast.net",
    "verizon.net",
    "att.net",
    "sbcglobal.net",
  ]);
  return publicDomains.has(String(domain || "").toLowerCase());
}

function dupeRecordWebDomain(record) {
  return dupeDomainKey(record?.webAddress);
}

function dupeRecordEmailDomain(record) {
  const emailDomain = dupeDomainKey(record?.email);
  return emailDomain && !dupeIsPublicEmailDomain(emailDomain) ? emailDomain : "";
}

function dupeRecordDomainKeys(record) {
  const webDomain = dupeRecordWebDomain(record);
  const emailDomain = dupeRecordEmailDomain(record);
  return [webDomain, emailDomain]
    .filter((value, index, list) => value && list.indexOf(value) === index);
}

function dupeUsesEmailOnlyDomain(record) {
  const webDomain = dupeRecordWebDomain(record);
  const emailDomain = dupeRecordEmailDomain(record);
  return Boolean(!webDomain && emailDomain);
}

function dupeCompanyNameWithoutInactivePrefix(value) {
  return String(value || "")
    .replace(/^\s*\d+\s+/, "")
    .replace(/^\s*inactive\s*[_:-]\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function dupeNameAfterDba(value) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  const match = text.match(/(?:^|[\s,;(])(?:d\s*\.?\s*b\s*\.?\s*a\s*\.?|doing\s+business\s+as)(?:[\s:;.,-]+)(.+)$/i);
  return match?.[1]?.trim() || text;
}

function dupeStripTrailingLegalSuffixes(value) {
  let text = String(value || "").replace(/\s+/g, " ").trim();
  const suffixPattern = /[\s,]*(?:l\.?\s*l\.?\s*c\.?|l\.?\s*l\.?\s*p\.?|l\.?\s*p\.?|l\.?\s*t\.?\s*d\.?|limited|incorporated|inc\.?|corp\.?|corporation)\.?$/i;
  let previous = "";
  while (text && text !== previous) {
    previous = text;
    text = text.replace(suffixPattern, "").trim();
  }
  return text;
}

function dupeComparableCompanyName(value) {
  return dupeStripTrailingLegalSuffixes(dupeNameAfterDba(dupeCompanyNameWithoutInactivePrefix(value)));
}

function dupeCompanyLegalCoreSearchTerm(value) {
  return dupeComparableCompanyName(value)
    .replace(/&/g, " and ")
    .replace(/\b(incorporated|inc|llc|llp|lp|ltd|limited|corp|corporation|company|co|plc|gmbh|sa|ag|the)\b\.?/gi, " ")
    .replace(/[^a-z0-9]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeCompanyName(value) {
  return dupeCompanyLegalCoreSearchTerm(value)
    .toLowerCase()
    .trim();
}

function dupeAddUniqueSearchTerm(items, value) {
  const term = String(value || "").trim();
  if (term && !items.some((item) => item.toLowerCase() === term.toLowerCase())) items.push(term);
}

function dupeCompanySearchTerms(source) {
  const rawName = dupeComparableCompanyName(source?.companyName || cleanRecordId(source) || source?.entityId);
  const terms = [];
  const addNameTerms = (value) => {
    const name = dupeComparableCompanyName(value);
    dupeAddUniqueSearchTerm(terms, name);
    dupeAddUniqueSearchTerm(terms, dupeCompanyLegalCoreSearchTerm(name));
  };
  addNameTerms(rawName);
  if (rawName.includes("|")) {
    rawName.split("|").forEach(addNameTerms);
  }
  return terms;
}

function dupePipeNameSegments(source) {
  const rawName = dupeComparableCompanyName(source?.companyName || cleanRecordId(source) || source?.entityId);
  if (!rawName.includes("|")) return [];
  return rawName
    .split("|")
    .map((part) => dupeComparableCompanyName(part))
    .filter(Boolean);
}

function dupeSourceResolveQueries(entry) {
  const raw = String(entry?.raw || entry?.query || "").trim();
  const withoutPrefix = raw.replace(/^cu:\s*/i, "").trim();
  const leadingMatch = withoutPrefix.match(/^(\d{4,})(?:\s+(.+))?$/);
  const queries = [];
  const addQuery = (value) => {
    const query = String(value || "").trim();
    if (query && !queries.some((item) => item.toLowerCase() === query.toLowerCase())) queries.push(query);
  };

  if (leadingMatch) {
    addQuery(`cu:${leadingMatch[1]}`);
    const trailingName = dupeComparableCompanyName(leadingMatch[2] || "");
    if (trailingName) addQuery(`cu:${trailingName}`);
    return queries;
  }

  if (raw) {
    addQuery(raw.startsWith("cu:") ? raw : `cu:${raw}`);
    const comparableRaw = dupeComparableCompanyName(withoutPrefix);
    if (comparableRaw && comparableRaw.toLowerCase() !== withoutPrefix.toLowerCase()) {
      addQuery(`cu:${comparableRaw}`);
    }
    if (!raw.startsWith("cu:")) addQuery(raw);
  }
  return queries;
}

function dupeSourceCompanyId(entry) {
  const raw = String(entry?.raw || entry?.query || "").trim();
  const withoutPrefix = raw.replace(/^cu:\s*/i, "").trim();
  const match = withoutPrefix.match(/^(\d{4,})(?:\s|$)/);
  return match ? match[1] : "";
}

function chooseDupeSourceSearchItem(entry, items) {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (!list.length) return null;
  const companyId = dupeSourceCompanyId(entry);
  if (!companyId) return list[0];
  return list.find((item) => {
    const title = String(item?.title || "").trim();
    const titleMatch = title.match(/^(\d{4,})(?:\s|$)/);
    const resultId = String(item?.id || item?.companyId || item?.entityId || "").trim();
    return titleMatch?.[1] === companyId || resultId === companyId;
  }) || null;
}

function dupeCandidateSearchQueries(source) {
  const webDomain = dupeRecordWebDomain(source);
  const emailDomain = dupeRecordEmailDomain(source);
  const domainQueries = [];
  if (webDomain) {
    domainQueries.push({ query: webDomain, kind: "domain-exact" });
    if (emailDomain && emailDomain !== webDomain) {
      domainQueries.push({ query: emailDomain, kind: "email-domain" });
    }
  } else if (emailDomain) {
    domainQueries.push({ query: emailDomain, kind: "domain-exact" });
  }
  return [
    ...domainQueries,
    ...dupeCompanySearchTerms(source).map((query) => ({ query, kind: "name" })),
  ]
    .filter(Boolean)
    .filter((item, index, list) => item.query && list.findIndex((other) => other.query.toLowerCase() === item.query.toLowerCase()) === index);
}

function dupeStage(record) {
  const status = mergeStageValue(record?.status);
  if (status === "CUSTOMER") return "Customer";
  if (status === "PROSPECT") return "Prospect";
  if (status === "LEAD") return "Lead";
  return displayValue(record?.status);
}

function dupeStageRank(record) {
  const stage = dupeStage(record).toLowerCase();
  if (stage === "customer") return 3;
  if (stage === "prospect") return 2;
  if (stage === "lead") return 1;
  return 0;
}

function dupeIsCustomerWon(record) {
  const status = String(record?.status || "").replace(/\s+/g, " ").trim();
  return /\bcustomer\b/i.test(status) && /\b(?:closed\s+)?won\b/i.test(status);
}

function dupeStatusRank(record) {
  const status = mergeStatusValue(record?.status);
  const stage = mergeStageValue(status);
  if (dupeIsCustomerWon(record)) return 4200;
  if (stage === "CUSTOMER") {
    if (/\bLOST\b/.test(status)) return 3000;
    return 3500;
  }
  if (stage === "PROSPECT") {
    if (/\bBRONTO\b/.test(status) && /\bNURTURE\b/.test(status) && /\bNEW\b/.test(status)) return 50;
    if (/\bLOST\b/.test(status)) return 2000;
    return 2500;
  }
  if (stage === "LEAD") {
    if (/\bDUPLICATE\b/.test(status)) return 100;
    if (/\bLOST\b/.test(status)) return 200;
    if (/\bDISQUALIFIED\b/.test(status)) return 300;
    return 1000;
  }
  return 0;
}

function dupeHasDummyDomain(record) {
  const values = [record?.email, record?.webAddress].map((value) => String(value || "").toLowerCase());
  return values.some((value) => /(?:^|[@./])(?:netsuite|oracle)\.com(?:[/?#:]|$)/i.test(value));
}

function dupeRecordLabel(record) {
  return mergeRecordTitle(record, "Record");
}

function dupeRecordUrl(record) {
  const internalId = String(record?.internalId || "").trim();
  return internalId ? `https://nlcorp.app.netsuite.com/app/common/entity/custjob.nl?id=${encodeURIComponent(internalId)}` : "";
}

function dupeRecordLinkHtml(record) {
  const label = escapeHtml(dupeRecordLabel(record));
  const url = dupeRecordUrl(record);
  if (!url) return label;
  return `<a class="dupe-record-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
}

function recordValueLinkHtml(record, value) {
  const text = escapeHtml(displayValue(value));
  const url = dupeRecordUrl(record);
  if (!url) return text;
  return `<a class="dupe-record-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
}

function dupeIsDemoRecord(record) {
  const text = [
    record?.companyName,
    record?.entityId,
    record?.title,
  ].filter(Boolean).join(" ");
  return /\bdemo(?:\s+account)?\b/i.test(text);
}

function dupeCompanyNamesCompatible(source, candidate, pipeNameMatch = false) {
  const sourceName = normalizeCompanyName(source?.companyName || cleanRecordId(source));
  const candidateName = normalizeCompanyName(candidate?.companyName || cleanRecordId(candidate));
  if (!sourceName || !candidateName) return false;
  if (sourceName === candidateName || sourceName.includes(candidateName) || candidateName.includes(sourceName)) return true;
  if (pipeNameMatch) return true;
  const sourceTokens = dupeMeaningfulTokens(sourceName);
  const candidateTokens = dupeMeaningfulTokens(candidateName);
  const sharedTokens = sourceTokens.filter((token) => candidateTokens.includes(token));
  return sharedTokens.length >= 2;
}

function dupeCompanyNamesExactlyCompatible(source, candidate) {
  const sourceName = normalizeCompanyName(source?.companyName || cleanRecordId(source));
  const candidateName = normalizeCompanyName(candidate?.companyName || cleanRecordId(candidate));
  if (!sourceName || !candidateName) return false;
  if (sourceName === candidateName) return true;
  const compactSource = sourceName.replace(/\band\b/g, "").replace(/\s+/g, "");
  const compactCandidate = candidateName.replace(/\band\b/g, "").replace(/\s+/g, "");
  return Boolean(compactSource.length >= 6 && compactSource === compactCandidate);
}

function dupeIsGenericCompanyToken(token) {
  return new Set([
    "company",
    "corporate",
    "global",
    "group",
    "holding",
    "holdings",
    "home",
    "homes",
    "international",
    "loan",
    "loans",
    "management",
    "properties",
    "property",
    "realty",
    "service",
    "services",
    "solution",
    "solutions",
    "system",
    "systems",
    "technologies",
    "technology",
    "consultant",
    "consultants",
    "consulting",
  ]).has(String(token || "").toLowerCase());
}

function dupeSimilarityTokens(value) {
  return normalizeCompanyName(value)
    .split(/\s+/)
    .filter((token) => token.length >= 4 && !dupeIsGenericCompanyToken(token));
}

function dupeCompanyNamesStronglySimilar(source, candidate) {
  const sourceName = normalizeCompanyName(source?.companyName || cleanRecordId(source));
  const candidateName = normalizeCompanyName(candidate?.companyName || cleanRecordId(candidate));
  const sourceTokens = dupeSimilarityTokens(sourceName);
  const candidateTokens = dupeSimilarityTokens(candidateName);
  if (sourceTokens.length < 2 || candidateTokens.length < 2) return false;
  const sharedCount = sourceTokens.filter((token) => candidateTokens.includes(token)).length;
  const sourceCoverage = sharedCount / sourceTokens.length;
  const diceSimilarity = (2 * sharedCount) / (sourceTokens.length + candidateTokens.length);
  return sharedCount >= 2 && sourceCoverage >= 0.85 && diceSimilarity >= 0.66;
}

function dupeCompanyNamesSingleTokenVariant(source, candidate) {
  const sourceName = normalizeCompanyName(source?.companyName || cleanRecordId(source));
  const candidateName = normalizeCompanyName(candidate?.companyName || cleanRecordId(candidate));
  const sourceTokens = dupeSimilarityTokens(sourceName);
  const candidateTokens = dupeSimilarityTokens(candidateName);
  if (sourceTokens.length !== 1 || !candidateTokens.length) return false;
  return sourceTokens[0].length >= 4 && candidateTokens[0] === sourceTokens[0];
}

function dupeCandidateMatches(source, candidate) {
  if (!source || !candidate) return [];
  const sourceId = String(source.internalId || "").trim();
  const candidateId = String(candidate.internalId || "").trim();
  if (sourceId && candidateId && sourceId === candidateId) return [];
  if (dupeIsDemoRecord(candidate)) return [];

  const reasons = [];
  const sourceDomains = dupeRecordDomainKeys(source);
  const candidateDomains = dupeRecordDomainKeys(candidate);
  const sharedDomain = sourceDomains.find((domain) => candidateDomains.includes(domain));
  const sourcePipeSegments = dupePipeNameSegments(source);
  const sourceName = normalizeCompanyName(source.companyName || cleanRecordId(source));
  const candidateName = normalizeCompanyName(candidate.companyName || cleanRecordId(candidate));
  const namesLookSimilar = Boolean(sourceName && candidateName
    && (sourceName === candidateName || sourceName.includes(candidateName) || candidateName.includes(sourceName)));
  const pipeNameMatch = sourcePipeSegments.some((segment) => {
    const segmentName = normalizeCompanyName(segment);
    return Boolean(segmentName && candidateName && (segmentName.includes(candidateName) || candidateName.includes(segmentName) || dupeSharesMeaningfulToken(segmentName, candidateName)));
  });
  const namesCompatible = dupeCompanyNamesCompatible(source, candidate, pipeNameMatch);
  const namesExactlyCompatible = dupeCompanyNamesExactlyCompatible(source, candidate);
  const namesStronglySimilar = dupeCompanyNamesStronglySimilar(source, candidate);
  const namesSingleTokenVariant = dupeCompanyNamesSingleTokenVariant(source, candidate);
  if (sourceDomains.length && candidateDomains.length) {
    if (!sharedDomain && !namesExactlyCompatible && !namesStronglySimilar && !namesSingleTokenVariant) return [];
    if (sharedDomain && !namesCompatible && !namesStronglySimilar && !namesSingleTokenVariant) return [];
    if (dupeUsesEmailOnlyDomain(source) && !namesCompatible && !namesStronglySimilar && !namesSingleTokenVariant) return [];
    if (sharedDomain) reasons.push("Same web domain");
  }
  if (pipeNameMatch) reasons.push("Pipe-separated company name");

  if (sourceName && candidateName) {
    if (sourceName === candidateName) reasons.push("Exact company name");
    else if (sourceName.length >= 6 && candidateName.length >= 6 && (sourceName.includes(candidateName) || candidateName.includes(sourceName))) {
      reasons.push("Similar company name");
    } else if (namesStronglySimilar || namesSingleTokenVariant) {
      reasons.push("Similar company name");
    }
  }

  return [...new Set(reasons)];
}

function dupeNormalizedAddress(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\bmap\b/g, " ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dupeSameAddress(source, candidate) {
  const sourceAddress = dupeNormalizedAddress(source?.address);
  const candidateAddress = dupeNormalizedAddress(candidate?.address);
  return Boolean(sourceAddress && candidateAddress && sourceAddress.length >= 12 && sourceAddress === candidateAddress);
}

function dupeCandidateReviewReasons(source, candidate) {
  if (!source || !candidate) return [];
  const sourceId = String(source.internalId || "").trim();
  const candidateId = String(candidate.internalId || "").trim();
  if (sourceId && candidateId && sourceId === candidateId) return [];
  if (dupeIsDemoRecord(candidate)) return [];
  if (dupeCandidateMatches(source, candidate).length) return [];

  const reasons = [];
  const sourceWebDomain = dupeRecordWebDomain(source);
  const sourceEmailDomain = dupeRecordEmailDomain(source);
  const candidateDomains = [
    dupeRecordWebDomain(candidate),
    dupeRecordEmailDomain(candidate),
  ].filter(Boolean);

  if (sourceWebDomain && candidateDomains.includes(sourceWebDomain)) {
    reasons.push("Review: same domain, different name");
  }
  if (sourceEmailDomain && sourceEmailDomain !== sourceWebDomain && candidateDomains.includes(sourceEmailDomain)) {
    reasons.push("Review: same email domain, different name");
  }
  if (dupeSameAddress(source, candidate)) {
    reasons.push("Review: same address, different name");
  }

  return [...new Set(reasons)];
}

function dupeMeaningfulTokens(value) {
  return normalizeCompanyName(value)
    .split(/\s+/)
    .filter((token) => token.length >= 5 && !dupeIsGenericCompanyToken(token));
}

function dupeSharesMeaningfulToken(first, second) {
  const firstTokens = dupeMeaningfulTokens(first);
  const secondTokens = dupeMeaningfulTokens(second);
  return firstTokens.some((token) => secondTokens.includes(token));
}

function dupePreviewLooksPromising(source, item, queryKind, query = "") {
  const sourceName = normalizeCompanyName(source.companyName || "");
  const rawText = [item?.title, item?.text, item?.info1, item?.info2].filter(Boolean).join(" ").toLowerCase();
  const itemText = normalizeCompanyName(rawText);
  if (queryKind === "name") {
    const queryText = normalizeCompanyName(query);
    return Boolean(
      sourceName && itemText && (itemText.includes(sourceName) || sourceName.includes(itemText)
        || (queryText && (itemText.includes(queryText) || queryText.includes(itemText) || dupeSharesMeaningfulToken(queryText, itemText)))),
    );
  }
  if (queryKind === "domain-exact" || queryKind === "email-domain") {
    const domainKey = dupeDomainKey(query || source.webAddress || source.email).toLowerCase();
    return Boolean(domainKey && rawText.includes(domainKey));
  }
  if (queryKind === "domain") {
    const domain = dupeSearchDomain(source.webAddress);
    const domainKey = dupeDomainKey(source.webAddress).toLowerCase();
    return Boolean(domain && (itemText.includes(normalizeCompanyName(domain)) || (domainKey && rawText.includes(domainKey))));
  }
  return false;
}

function dupePreviewCandidateScore(source, item, queryKind, query = "", order = 0) {
  const rawText = [item?.title, item?.text, item?.info1, item?.info2].filter(Boolean).join(" ").toLowerCase();
  const sourceName = normalizeCompanyName(source.companyName || "");
  const itemText = normalizeCompanyName(rawText);
  const queryText = normalizeCompanyName(query);
  let score = 0;

  if (queryKind === "domain-exact") score += 30;
  if (queryKind === "email-domain") score += 28;
  if (queryKind === "name") score += 20;
  if (sourceName && itemText && (itemText.includes(sourceName) || sourceName.includes(itemText))) score += 25;
  if (queryText && itemText && (itemText.includes(queryText) || queryText.includes(itemText))) score += 15;
  if (/\bcustomer\b.*\bclosed\b.*\bwon\b|\bclosed\b.*\bwon\b/i.test(rawText)) score += 120;
  else if (/\bcustomer\b/i.test(rawText)) score += 70;
  else if (/\bprospect\b/i.test(rawText)) score += 35;
  else if (/\blead\b/i.test(rawText)) score += 10;

  return score - (order / 1000);
}

function chooseDupeMaster(source, duplicates) {
  if (dupeHasDummyDomain(source)) {
    return { master: source, reason: "Oracle/NetSuite email or web address; original retained" };
  }
  const group = [source, ...duplicates].filter(Boolean);
  const customerWon = group.find((record) => dupeIsCustomerWon(record));
  if (customerWon) {
    return { master: customerWon, reason: "Customer-Won record selected" };
  }
  if (duplicates.length) {
    const master = group
      .slice()
      .sort((a, b) => dupeStatusRank(b) - dupeStatusRank(a) || String(b.internalId || "").localeCompare(String(a.internalId || "")))[0];
    if (master !== source && dupeStatusRank(master) <= dupeStatusRank(source)) {
      return { master: source, reason: "No higher-status duplicate found; original retained" };
    }
    return { master, reason: "Highest status selected" };
  }
  return { master: source, reason: "No duplicate found; original retained" };
}

function dupeMasterResultForCandidates(source, candidates) {
  const candidateItems = Array.isArray(candidates) ? candidates : [];
  const validRecords = candidateItems
    .filter((item) => item?.record && !item.review)
    .map((item) => item.record);
  const result = chooseDupeMaster(source, validRecords);
  if (result.master === source && candidateItems.some((item) => item?.review)) {
    return { master: source, reason: "Review candidate found; needs manual review" };
  }
  return result;
}

function dupeIsHighConfidenceCustomerProspectCandidate(item) {
  if (!item?.record || item.review) return false;
  if (dupeStageRank(item.record) < 2) return false;
  const reasons = Array.isArray(item.reasons) ? item.reasons : [];
  const hasDomainMatch = reasons.includes("Same web domain");
  const hasNameMatch = reasons.some((reason) => ["Exact company name", "Similar company name", "Pipe-separated company name"].includes(reason));
  return hasDomainMatch && hasNameMatch;
}

function dupeCompressCandidates(candidates) {
  const limit = typeof DUPE_CANDIDATE_DETAIL_LIMIT === "number" ? DUPE_CANDIDATE_DETAIL_LIMIT : 8;
  const candidateItems = (Array.isArray(candidates) ? candidates : []).filter((item) => item?.record);
  const hasHighConfidenceCustomerProspect = candidateItems.some((item) => dupeIsHighConfidenceCustomerProspectCandidate(item));
  const displayItems = hasHighConfidenceCustomerProspect
    ? candidateItems.filter((item) => dupeStage(item.record).toLowerCase() !== "lead")
    : candidateItems;
  const byRank = new Map();
  for (const item of displayItems) {
    const rank = dupeStatusRank(item.record);
    const key = `${item.review ? "review" : "valid"}:${rank}`;
    if (!byRank.has(key)) byRank.set(key, item);
  }
  return [...byRank.values()]
    .sort((a, b) => dupeStatusRank(b.record) - dupeStatusRank(a.record) || Number(Boolean(a.review)) - Number(Boolean(b.review)))
    .slice(0, limit)
}

function mergeAddressCountry(value) {
  const lines = String(value || "")
    .split(/\r?\n| {2,}/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!lines.length) return "";
  const country = lines[lines.length - 1].replace(/[.,]+$/g, "").toLowerCase();
  const aliases = new Map([
    ["usa", "united states"],
    ["u.s.a", "united states"],
    ["u.s.a.", "united states"],
    ["us", "united states"],
    ["u.s", "united states"],
    ["u.s.", "united states"],
    ["united states of america", "united states"],
  ]);
  return aliases.get(country) || country;
}

function titleCaseCountry(value) {
  return String(value || "")
    .split(/(\s+|-)/)
    .map((part) => /^[a-z]/i.test(part) ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() : part)
    .join("");
}

function mergeAddressCountryDisplay(value) {
  const country = mergeAddressCountry(value);
  return country ? titleCaseCountry(country) : "";
}

function mergeAddressCountryDiffers(primaryValue, duplicateValue) {
  const primaryCountry = mergeAddressCountry(primaryValue);
  const duplicateCountry = mergeAddressCountry(duplicateValue);
  return Boolean(primaryCountry && duplicateCountry && primaryCountry !== duplicateCountry);
}

function mergeHasSubsidiaryRisk() {
  const primarySubsidiary = mergeCompareValue(mergeState.primary?.subsidiary);
  const duplicates = Array.isArray(mergeState.duplicates) ? mergeState.duplicates : [];
  return Boolean(primarySubsidiary && duplicates.some((item) => {
    const duplicateSubsidiary = mergeCompareValue(item.record?.subsidiary);
    return duplicateSubsidiary && duplicateSubsidiary !== primarySubsidiary;
  }));
}

function resetMergeContactResults() {
  if (elements.mergeContactResults) {
    elements.mergeContactResults.classList.add("hidden");
    elements.mergeContactResults.innerHTML = "";
  }
}

function renderMergeContactCheckState() {
  const loaded = Boolean(mergeState.primary?.internalId && mergeState.duplicates?.length);
  const hasRisk = mergeHasSubsidiaryRisk();
  elements.mergeContactCheck?.classList.toggle("hidden", !loaded);
  if (!loaded) return;
  if (elements.mergeContactHint) {
    elements.mergeContactHint.textContent = hasRisk
      ? "Subsidiary differs on at least one duplicate. Contact check is recommended."
      : "Subsidiaries match. Contact check is optional.";
  }
  elements.mergeContactCheck?.classList.toggle("recommended", hasRisk);
  if (elements.mergeContactCheckButton) elements.mergeContactCheckButton.disabled = false;
}

function normalizeMergeContactName(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function contactEditUrl(url) {
  const raw = String(url || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw);
    parsed.searchParams.set("e", "T");
    return parsed.toString();
  } catch {
    return raw.includes("?") ? `${raw}&e=T` : `${raw}?e=T`;
  }
}

async function fetchMergeContacts(record) {
  if (!record?.internalId) return [];
  const result = await postJson("/api/record", { internalId: record.internalId, includeRelated: true });
  return relatedGroupRows(result.record || {}, "contacts");
}

function mergeContactConflictRows(primaryContacts, duplicateContacts, duplicateRecord) {
  const primaryByName = new Map();
  for (const contact of primaryContacts) {
    const name = normalizeMergeContactName(contact.name);
    if (!name) continue;
    if (!primaryByName.has(name)) primaryByName.set(name, []);
    primaryByName.get(name).push(contact);
  }
  const conflicts = [];
  for (const duplicateContact of duplicateContacts) {
    const name = normalizeMergeContactName(duplicateContact.name);
    const primaryMatches = primaryByName.get(name) || [];
    for (const primaryContact of primaryMatches) {
      const primarySubsidiary = mergeCompareValue(primaryContact.subsidiary);
      const duplicateSubsidiary = mergeCompareValue(duplicateContact.subsidiary);
      if (primarySubsidiary && duplicateSubsidiary && primarySubsidiary !== duplicateSubsidiary) {
        conflicts.push({
          name: duplicateContact.name || primaryContact.name || "---",
          duplicateRecord: mergeRecordTitle(duplicateRecord, "Duplicate"),
          primarySubsidiary: primaryContact.subsidiary || "---",
          duplicateSubsidiary: duplicateContact.subsidiary || "---",
          primaryUrl: primaryContact.editUrl || contactEditUrl(primaryContact.url) || "",
          duplicateUrl: duplicateContact.editUrl || contactEditUrl(duplicateContact.url) || "",
        });
      }
    }
  }
  return conflicts;
}

function renderMergeContactConflicts(conflicts) {
  if (!elements.mergeContactResults) return;
  elements.mergeContactResults.classList.remove("hidden");
  if (!conflicts.length) {
    elements.mergeContactResults.innerHTML = '<div class="merge-empty">No contact subsidiary conflicts found.</div>';
    return;
  }
  elements.mergeContactResults.innerHTML = `
    <div class="merge-contact-title">${conflicts.length} contact ${conflicts.length === 1 ? "conflict" : "conflicts"} found</div>
    <div class="related-table-wrap">
      <table class="related-table merge-contact-table">
        <thead>
          <tr>
            <th>Contact Name</th>
            <th>Duplicate Record</th>
            <th>Primary Subsidiary</th>
            <th>Duplicate Subsidiary</th>
            <th class="related-open-column" aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          ${conflicts.map((row) => `
            <tr>
              <td>${escapeHtml(displayValue(row.name))}</td>
              <td>${escapeHtml(displayValue(row.duplicateRecord))}</td>
              <td class="merge-field-warning">${escapeHtml(displayValue(row.primarySubsidiary))}</td>
              <td class="merge-field-warning">${escapeHtml(displayValue(row.duplicateSubsidiary))}</td>
              <td class="related-open-column">
                ${row.primaryUrl ? `<button type="button" class="small-button secondary related-open-link" data-open-merge-contact-url="${escapeHtml(row.primaryUrl)}" data-open-merge-contact-label="Primary">Primary</button>` : ""}
                ${row.duplicateUrl ? `<button type="button" class="small-button related-open-link" data-open-merge-contact-url="${escapeHtml(row.duplicateUrl)}" data-open-merge-contact-label="Duplicate">Duplicate</button>` : ""}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function mergeConflictKeys(primary, duplicate) {
  if (!primary || !duplicate) return new Set();
  const keys = new Set();
  const primaryStatus = mergeStageValue(primary.status);
  const duplicateStatus = mergeStageValue(duplicate.status);
  if (primaryStatus && duplicateStatus && primaryStatus !== duplicateStatus) {
    keys.add("status");
  }
  const primarySalesRep = mergeCompareValue(primary.salesRep);
  const duplicateSalesRep = mergeCompareValue(duplicate.salesRep);
  const salesRepSame = primarySalesRep && duplicateSalesRep && primarySalesRep === duplicateSalesRep;
  const duplicateSalesRepDiffers = primarySalesRep && duplicateSalesRep && primarySalesRep !== duplicateSalesRep;
  const primaryLsad = mergeCompareValue(primary.lsadDate);
  const duplicateLsad = mergeCompareValue(duplicate.lsadDate);
  const duplicateLsadDiffers = primaryLsad && duplicateLsad && primaryLsad !== duplicateLsad;
  const duplicateSalesRepBypassesWarning = salesRepOkForMergeDifference(duplicate.salesRep);
  if (!salesRepSame && !duplicateSalesRepBypassesWarning && (duplicateSalesRepDiffers || (duplicateLsadDiffers && mergeDateWithinPastDays(duplicate.lsadDate, 30)))) {
    keys.add("salesRepLsad");
  }
  if (mergeCompareValue(primary.subsidiary) && mergeCompareValue(duplicate.subsidiary) && mergeCompareValue(primary.subsidiary) !== mergeCompareValue(duplicate.subsidiary)) {
    keys.add("subsidiary");
  }
  if (mergeCompareValue(primary.category) && mergeCompareValue(duplicate.category) && mergeCompareValue(primary.category) !== mergeCompareValue(duplicate.category)) {
    keys.add("category");
  }
  if (mergeAddressCountryDiffers(primary.address, duplicate.address)) {
    keys.add("address");
  }
  if (mergeWebAddressDiffers(primary.webAddress, duplicate.webAddress)) {
    keys.add("webAddress");
  }
  const primaryPartner = mergeCompareValue(primary.partner);
  const duplicatePartner = mergeCompareValue(duplicate.partner);
  if (duplicatePartner && duplicatePartner !== primaryPartner) {
    keys.add("partner");
  }
  return keys;
}

function mergeField(label, value, options = {}) {
  const classes = ["summary-item"];
  if (options.warning) classes.push("merge-field-warning");
  return `
    <div class="${classes.join(" ")}">
      <span>${escapeHtml(label)}</span>
      <strong>${linkedDisplayValue(value, options)}</strong>
    </div>
  `;
}

function mergeSubcustomerCountDisplay(record) {
  if (!record || record.missing) return "";
  const value = record.subcustomerCount;
  if (value === "" || value === null || typeof value === "undefined") return 0;
  return value;
}

function mergeRecordFields(record, conflictKeys = new Set(), options = {}) {
  return `
    <div class="merge-card-fields">
      ${options.includeCompany ? mergeField("Company", mergeRecordTitle(record, "Record")) : ""}
      ${mergeField("Status", record?.status, { warning: conflictKeys.has("status") })}
      ${mergeField("Sales Rep / LSAD Date", [record?.salesRep, record?.lsadDate].filter(Boolean).join(" / "), { warning: conflictKeys.has("salesRepLsad") })}
      ${mergeField("Category", record?.category, { warning: conflictKeys.has("category") })}
      ${mergeField("Address", record?.address, { warning: conflictKeys.has("address") })}
      ${mergeField("Subsidiary", record?.subsidiary, { warning: conflictKeys.has("subsidiary") })}
      ${mergeField("Subcustomers", mergeSubcustomerCountDisplay(record))}
      ${mergeField("Partner", record?.partner, { warning: conflictKeys.has("partner") })}
      ${mergeField("Web Address", record?.webAddress, { warning: conflictKeys.has("webAddress"), webLink: true })}
    </div>
  `;
}

function mergeCompareCell(value, warning = false, options = {}) {
  const classes = ["merge-compare-cell"];
  if (warning) classes.push("merge-field-warning");
  return `<td class="${classes.join(" ")}">${linkedDisplayValue(value, options)}</td>`;
}

function mergeCountryCell(record, warning = false) {
  const classes = ["merge-compare-cell", "merge-country-cell"];
  if (warning) classes.push("merge-field-warning");
  const country = mergeAddressCountryDisplay(record?.address);
  const address = displayValue(record?.address);
  const hasAddress = address !== "---";
  const button = hasAddress
    ? `
      <button
        type="button"
        class="merge-address-popover-button"
        data-merge-address="${escapeHtml(address)}"
        data-merge-address-title="${escapeHtml(mergeRecordTitle(record, "Record"))}"
        aria-expanded="false"
        aria-label="Show full address"
        title="Show full address">
        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"></path></svg>
      </button>
    `
    : "";
  return `
    <td class="${classes.join(" ")}">
      <div class="merge-country-content">
        <span class="merge-country-value">${escapeHtml(displayValue(country))}</span>
        ${button}
      </div>
    </td>
  `;
}

function ensureMergeAddressPopover() {
  if (mergeAddressPopover) return mergeAddressPopover;
  mergeAddressPopover = document.createElement("div");
  mergeAddressPopover.className = "merge-address-popover hidden";
  mergeAddressPopover.setAttribute("role", "dialog");
  mergeAddressPopover.setAttribute("aria-label", "Full address");
  document.body.appendChild(mergeAddressPopover);
  return mergeAddressPopover;
}

function closeMergeAddressPopover() {
  if (!mergeAddressPopover) return;
  mergeAddressPopover.classList.add("hidden");
  mergeAddressPopover.style.left = "";
  mergeAddressPopover.style.top = "";
  document.querySelectorAll(".merge-address-popover-button.open").forEach((button) => {
    button.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Show full address");
    button.setAttribute("title", "Show full address");
  });
}

function openMergeAddressPopover(button) {
  const address = displayValue(button?.getAttribute("data-merge-address"));
  const title = displayValue(button?.getAttribute("data-merge-address-title"));
  const popover = ensureMergeAddressPopover();
  const isAlreadyOpen = button?.classList.contains("open") && !popover.classList.contains("hidden");
  closeMergeAddressPopover();
  if (isAlreadyOpen) return;

  popover.innerHTML = `
    <div class="merge-address-popover-head">
      <strong>Full Address</strong>
      <span>${escapeHtml(title)}</span>
    </div>
    <div class="merge-address-popover-body">${escapeHtml(address)}</div>
  `;
  popover.classList.remove("hidden", "above");
  button.classList.add("open");
  button.setAttribute("aria-expanded", "true");
  button.setAttribute("aria-label", "Hide full address");
  button.setAttribute("title", "Hide full address");

  const rect = button.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();
  const gap = 8;
  const margin = 16;
  let top = rect.bottom + gap;
  if (top + popoverRect.height > window.innerHeight - margin) {
    top = Math.max(margin, rect.top - popoverRect.height - gap);
    popover.classList.add("above");
  }
  const left = Math.min(
    window.innerWidth - popoverRect.width - margin,
    Math.max(margin, rect.right - popoverRect.width)
  );
  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function mergeWebDomainDisplay(value) {
  const parts = mergeWebDomainParts(value);
  return parts ? `${parts.secondLevel}.${parts.topLevel}` : value;
}

function mergePrimaryPanel(record) {
  const isMissing = Boolean(record?.missing);
  const badge = isMissing
    ? '<span class="status-pill inactive">Missing</span>'
    : '<span class="status-pill eligible">Surviving record</span>';
  const inactive = isMissing ? "" : recordInactiveBadge(record);
  return `
    <section class="merge-compact-panel merge-primary-panel ${isMissing ? "missing" : ""}">
      <div class="merge-compact-head">
        <h4>Primary Record</h4>
        <div class="merge-card-kicker">
          ${badge}${inactive}
          ${record?.internalId ? `<button type="button" class="small-button secondary" data-open-id="${escapeHtml(record.internalId)}">Open</button>` : ""}
        </div>
      </div>
      <div class="merge-primary-name">
        <span>Company</span>
        <strong>${escapeHtml(mergeRecordTitle(record, "Primary"))}</strong>
      </div>
      ${mergeRecordFields(record)}
    </section>
  `;
}

function mergeBlockerBadgeLabel(blocker) {
  const text = String(blocker || "").toLowerCase();
  if (!text) return "";
  if (text.includes("does not exist") || text.includes("could not be loaded") || text.includes("failed to load")) return "Missing";
  if (text.includes("same as the primary")) return "Same as primary";
  if (text.includes("more than once") || text.includes("appears more than once") || text.includes("repeated")) return "Repeated";
  return "Review";
}

function mergeDuplicateComparisonRow(item, index, primary) {
  const record = item?.record || {};
  const isMissing = Boolean(record?.missing);
  const blocker = item?.blocker || (isMissing ? "Record does not exist." : "");
  const conflictKeys = isMissing ? new Set() : mergeConflictKeys(primary, record);
  const canOpenMerge = !blocker && !isMissing && elements.mergeReviewCheckbox?.checked;
  const salesRepLsad = [record?.salesRep, record?.lsadDate].filter(Boolean).join(" / ");
  const title = mergeRecordTitle(record, "Duplicate");
  const titleButton = record?.internalId
    ? `<button type="button" class="merge-record-link" data-open-id="${escapeHtml(record.internalId)}">${escapeHtml(title)}</button>`
    : `<strong>${escapeHtml(title)}</strong>`;
  const inactive = isMissing ? "" : recordInactiveBadge(record);
  const blockerBadge = mergeBlockerBadgeLabel(blocker);
  const rowClasses = ["merge-compare-row"];
  if (blocker) rowClasses.push("blocked");
  if (isMissing) rowClasses.push("missing");
  return `
    <tr class="${rowClasses.join(" ")}">
      <td class="merge-record-cell">
        <div class="merge-record-summary">
          <span class="merge-record-title-wrap">
            ${titleButton}
            ${inactive}
          </span>
          ${blockerBadge ? `<span class="status-pill inactive merge-attention-pill" title="${escapeHtml(blocker)}">${escapeHtml(blockerBadge)}</span>` : ""}
        </div>
      </td>
      ${mergeCompareCell(record?.status, conflictKeys.has("status"))}
      ${mergeCompareCell(salesRepLsad, conflictKeys.has("salesRepLsad"))}
      ${mergeCompareCell(record?.subsidiary, conflictKeys.has("subsidiary"))}
      ${mergeCompareCell(record?.category, conflictKeys.has("category"))}
      ${mergeCountryCell(record, conflictKeys.has("address"))}
      ${mergeCompareCell(mergeWebDomainDisplay(record?.webAddress), conflictKeys.has("webAddress"), { webLink: true })}
      ${mergeCompareCell(record?.partner, conflictKeys.has("partner"))}
      ${mergeCompareCell(mergeSubcustomerCountDisplay(record))}
      <td class="merge-compare-actions">
        <button type="button" class="small-button" data-open-merge-edit-id="${escapeHtml(record?.internalId || "")}" ${canOpenMerge ? "" : "disabled"}>Merge Page</button>
      </td>
    </tr>
  `;
}

function mergeDuplicateComparisonTable(duplicates, primary) {
  return `
    <section class="merge-compact-panel merge-duplicate-panel">
      <div class="merge-compact-head">
        <div class="merge-compact-title">
          <h4>Duplicate Comparison</h4>
          <p class="merge-comparison-hint">Use the arrow to review the full address. Orange fields may need review.</p>
        </div>
        <span class="status-pill review">${duplicates.length} ${duplicates.length === 1 ? "duplicate" : "duplicates"}</span>
      </div>
      <div class="related-table-wrap merge-comparison-wrap">
        <table class="related-table merge-comparison-table">
          <thead>
            <tr>
              <th>Duplicate Record</th>
              <th>Status</th>
              <th>Sales Rep / LSAD</th>
              <th>Subsidiary</th>
              <th>Category</th>
              <th>Country</th>
              <th>Web Domain</th>
              <th>Partner</th>
              <th>Subcustomers</th>
              <th class="merge-compare-actions-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${duplicates.map((item, index) => mergeDuplicateComparisonRow(item, index, primary)).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderMergeReview() {
  const primary = mergeState.primary;
  const duplicates = Array.isArray(mergeState.duplicates) ? mergeState.duplicates : [];
  const primaryHasInput = Boolean(String(elements.mergePrimaryInput?.value || "").trim());
  const duplicateHasInput = Boolean(String(elements.mergeDuplicateInput?.value || "").trim());
  if (elements.mergeReviewCheckbox) {
    elements.mergeReviewCheckbox.disabled = !primary?.internalId || !duplicates.length;
    if (elements.mergeReviewCheckbox.disabled) elements.mergeReviewCheckbox.checked = false;
  }
  elements.mergePrimaryCard.innerHTML = primary
    ? mergePrimaryPanel(primary)
    : primaryHasInput ? "" : mergeEmptyCard("Load a primary record to begin.");
  elements.mergeDuplicateList.innerHTML = duplicates.length
    ? mergeDuplicateComparisonTable(duplicates, primary)
    : duplicateHasInput ? "" : mergeEmptyCard("Load one or more duplicate records.");
  elements.mergeCount.textContent = `${duplicates.length} ${duplicates.length === 1 ? "duplicate" : "duplicates"}`;
  renderMergeContactCheckState();
}

function mergeInputValueForRecord(record) {
  return String(record?.internalId || "").trim();
}

function flipMergePrimaryWithFirstDuplicate() {
  const primary = mergeState.primary;
  const duplicates = Array.isArray(mergeState.duplicates) ? mergeState.duplicates : [];
  const firstDuplicate = duplicates[0]?.record;
  if (!primary?.internalId) throw new Error("Load a primary record before flipping.");
  if (!firstDuplicate?.internalId) throw new Error("Load at least one duplicate record before flipping.");

  const nextPrimary = firstDuplicate;
  const nextDuplicateRecords = [primary, ...duplicates.slice(1).map((item) => item.record)];
  const seenIds = new Set();
  const nextDuplicates = nextDuplicateRecords.map((record) => ({
    record,
    blocker: duplicateBlocker(nextPrimary, record, seenIds),
  }));

  elements.mergePrimaryInput.value = mergeInputValueForRecord(nextPrimary);
  elements.mergeDuplicateInput.value = nextDuplicateRecords
    .map((record) => mergeInputValueForRecord(record))
    .filter(Boolean)
    .join("\n");
  elements.mergeReviewCheckbox.checked = false;
  resetMergeContactResults();
  mergeState = {
    primary: nextPrimary,
    duplicates: nextDuplicates,
    blockers: nextDuplicates.map((item) => item.blocker).filter(Boolean),
  };
  renderMergeReview();
}

async function resolveMergeRecord(entry, options = {}) {
  const searchEndpoint = options.searchEndpoint || "/api/search";
  const recordEndpoint = options.recordEndpoint || "/api/record";
  const searchTimeout = options.searchTimeout || MERGE_SEARCH_TIMEOUT_MS;
  const recordTimeout = options.recordTimeout || MERGE_RECORD_TIMEOUT_MS;
  const postWithTimeout = options.postWithTimeout || postMergeJsonWithTimeout;
  const recordRequestExtras = options.recordRequestExtras || (recordEndpoint === "/api/record" ? { includeSubcustomerCount: true } : {});
  if (entry.internalId) {
    try {
      const detail = await postWithTimeout(recordEndpoint, { internalId: entry.internalId, ...recordRequestExtras }, recordTimeout);
      if (detail.recordIdentityMismatch) {
        if (entry.directUrl) return mergeMissingRecord(entry);
      } else if (hasUsableRecord(detail.record)) return detail.record;
    } catch (error) {
      if (isRequestTimeoutError(error) || isWorkerSessionInvalidError(error)) throw error;
      if (entry.directUrl) return mergeMissingRecord(entry);
      // Fall through to Company ID / general merge lookup before declaring it missing.
    }
  }
  const queries = mergeRecordSearchQueries(entry);
  for (const query of queries) {
    try {
      const search = await postWithTimeout(searchEndpoint, { query }, searchTimeout);
      const item = mergeSearchResultForEntry(entry, search.items || []);
      if (!item?.internalId) continue;
      const detail = await postWithTimeout(recordEndpoint, { internalId: item.internalId, ...recordRequestExtras }, recordTimeout);
      if (hasUsableRecord(detail.record)) return detail.record;
    } catch (error) {
      if (isRequestTimeoutError(error) || isWorkerSessionInvalidError(error)) throw error;
      // Keep trying the remaining lookup paths.
    }
  }
  return mergeMissingRecord(entry);
}

function resolveStaticGroupRecord(entry) {
  return resolveMergeRecord(entry, {
    searchEndpoint: "/api/static-group-search",
    recordEndpoint: "/api/static-group-record",
    postWithTimeout: postStaticGroupJsonWithTimeout,
  });
}

function duplicateBlocker(primary, duplicate, seenIds) {
  const primaryId = String(primary?.internalId || "").trim();
  const duplicateId = String(duplicate?.internalId || "").trim();
  if (primary?.missing) return "Primary record does not exist.";
  if (duplicate?.missing) return "Record does not exist.";
  if (!primaryId) return "Primary record failed to load.";
  if (!duplicateId) return "Duplicate record failed to load.";
  if (primaryId === duplicateId) return "Duplicate is the same as the primary record.";
  if (seenIds.has(duplicateId)) return "Duplicate appears more than once.";
  seenIds.add(duplicateId);
  return "";
}

async function loadMergeRecords() {
  const primaryEntries = parseMergeEntries(elements.mergePrimaryInput.value, "Primary field");
  const duplicateEntries = parseMergeEntries(elements.mergeDuplicateInput.value, "Duplicate field");
  if (!primaryEntries.length) throw new Error("Enter one primary record.");
  if (primaryEntries.length > 1) throw new Error("Enter only one primary record.");
  if (!duplicateEntries.length) throw new Error("Enter at least one duplicate record.");

  elements.mergeReviewCheckbox.checked = false;
  resetMergeContactResults();
  mergeState = { primary: null, duplicates: [], blockers: [] };
  renderMergeReview();
  setStatus(elements.mergeStatus, "Loading primary record...");
  const primary = await resolveMergeRecord(primaryEntries[0]);
  mergeState = { primary, duplicates: [], blockers: [] };
  renderMergeReview();
  setStatus(elements.mergeStatus, `Primary loaded. Loading ${duplicateEntries.length} duplicate input(s)...`);
  const seenIds = new Set();
  const duplicates = [];
  for (const entry of duplicateEntries) {
    setStatus(elements.mergeStatus, `Loading duplicate ${duplicates.length + 1} of ${duplicateEntries.length}...`);
    try {
      const record = await resolveMergeRecord(entry);
      const blocker = duplicateBlocker(primary, record, seenIds);
      duplicates.push({ record, blocker });
    } catch (error) {
      duplicates.push({
        record: mergeMissingRecord(entry),
        blocker: error.message || "Record does not exist.",
      });
    }
    mergeState = { primary, duplicates: duplicates.slice(), blockers: duplicates.map((item) => item.blocker).filter(Boolean) };
    renderMergeReview();
    setStatus(elements.mergeStatus, `Loaded ${duplicates.length} of ${duplicateEntries.length} duplicate input(s)...`);
  }
  mergeState = { primary, duplicates, blockers: duplicates.map((item) => item.blocker).filter(Boolean) };
  renderMergeReview();
  return mergeState;
}

function staticGroupEmptyRow(message = "No records added yet.") {
  return message === "No records added yet."
    ? noResultsRow(8, message)
    : tableEmptyRow(8, message);
}

function staticGroupReadyRows() {
  return staticGroupState.rows.filter((row) => row.addable && row.record?.internalId);
}

function staticGroupSkippedRows() {
  return (staticGroupState.rows || []).filter((row) => !row.addable && row.resultLabel !== "Already added");
}

function staticGroupInputText() {
  return String(elements.staticGroupRecordInput?.value || "").trim();
}

function resetStaticGroupConfirmation() {
  if (elements.staticGroupConfirmCheckbox) elements.staticGroupConfirmCheckbox.checked = false;
}

function setStaticGroupMode(mode) {
  resetStaticGroupConfirmation();
  staticGroupMode = mode === "append" ? "append" : "create";
  const append = staticGroupMode === "append";
  elements.staticGroupCreateModeButton?.classList.toggle("active", !append);
  elements.staticGroupAppendModeButton?.classList.toggle("active", append);
  elements.staticGroupExistingGroupField?.classList.toggle("hidden", !append);
  const nameField = elements.staticGroupNameInput?.closest("label");
  nameField?.classList.toggle("hidden", append);
  if (elements.staticGroupNameLabel) elements.staticGroupNameLabel.textContent = "Static Group Name";
  if (elements.staticGroupNameInput) {
    elements.staticGroupNameInput.placeholder = append ? "Optional label for this append run" : "Enter static group name";
    elements.staticGroupNameInput.required = !append;
  }
  if (elements.staticGroupConfirmText) {
    elements.staticGroupConfirmText.textContent = append
      ? "I reviewed the records and want to proceed in adding them to the existing static group."
      : "I reviewed the records and want to proceed in creating the static group.";
  }
  if (elements.staticGroupCreateButton) elements.staticGroupCreateButton.textContent = append ? "Add to Existing Group" : "Create Static Group";
  updateStaticGroupCreateControls();
}

function staticGroupExistingId() {
  const value = String(elements.staticGroupExistingGroupInput?.value || "").trim();
  const urlMatch = value.match(/[?&]id=(\d+)/i);
  const id = urlMatch ? urlMatch[1] : value.match(/^\d+$/)?.[0] || "";
  return id;
}

function staticGroupHasRecordInput() {
  return Boolean(staticGroupInputText() || staticGroupState.rows?.length);
}

function staticGroupRecordName(record) {
  if (record?.missing) return record.missingLabel || "Record does not exist";
  return displayValue(record?.companyName || cleanRecordId(record) || record?.entityId || record?.internalId);
}

function staticGroupRecordIdentity(record) {
  if (record?.missing) return record.missingLabel || "Record does not exist";
  const id = displayValue(cleanRecordId(record));
  const name = displayValue(record?.companyName || record?.entityId || record?.internalId);
  if (id !== "---" && name !== "---" && id !== name) return `${id} ${name}`;
  return id !== "---" ? id : name;
}

function staticGroupResultPill(row) {
  const label = row.resultLabel || (row.addable ? "Ready" : "Skipped");
  const mode = label === "Added"
    ? "added"
    : label === "Already added"
      ? "already"
      : label === "Ready"
        ? "ready"
        : /error|failed/i.test(label)
          ? "error"
          : "skipped";
  return `<span class="status-pill ${mode}">${escapeHtml(label)}</span>`;
}

function renderStaticGroupRows() {
  if (!elements.staticGroupResultsBody) return;
  const rows = staticGroupState.rows || [];
  if (!rows.length) {
    elements.staticGroupResultsBody.innerHTML = staticGroupEmptyRow();
    if (elements.staticGroupCount) elements.staticGroupCount.textContent = "0 records";
    updateStaticGroupCreateControls();
    return;
  }
  const readyCount = staticGroupReadyRows().length;
  const skippedCount = staticGroupSkippedRows().length;
  const alreadyCount = rows.filter((row) => row.resultLabel === "Already added").length;
  if (elements.staticGroupCount) {
    const createdRows = rows.some((row) => row.resultLabel === "Added");
    elements.staticGroupCount.textContent = createdRows
      ? `${readyCount} added${alreadyCount ? ` / ${alreadyCount} already added` : ""}${skippedCount ? ` / ${skippedCount} skipped` : ""}`
      : `${readyCount} ready${alreadyCount ? ` / ${alreadyCount} already added` : ""}${skippedCount ? ` / ${skippedCount} skipped` : ""}`;
  }
  elements.staticGroupResultsBody.innerHTML = rows.map((row, index) => {
    const record = row.record || {};
    const inactive = displayValue(record.inactive);
    const rowLabel = staticGroupRecordIdentity(record);
    return `
      <tr class="${row.addable ? "" : "review-row"}">
        <td>${escapeHtml(displayValue(row.input))}</td>
        <td>${recordValueLinkHtml(record, record.internalId)}</td>
        <td>${recordValueLinkHtml(record, rowLabel)}</td>
        <td>${escapeHtml(displayValue(record.status))}</td>
        <td>${escapeHtml(displayValue(record.salesRep))}</td>
        <td>${escapeHtml(inactive)}</td>
        <td>
          <div class="static-group-result-cell">
            ${staticGroupResultPill(row)}
            <span>${escapeHtml(displayValue(row.reason))}</span>
          </div>
        </td>
        <td class="row-action-cell">
          <button type="button" class="static-group-remove-button" data-static-group-remove-index="${index}" title="Remove from static group list" aria-label="Remove ${escapeHtml(rowLabel)} from static group list">
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M18 6 6 18"></path><path d="M6 6l12 12"></path></svg>
          </button>
        </td>
      </tr>
    `;
  }).join("");
  updateStaticGroupCreateControls();
}

function removeStaticGroupRow(index) {
  const rows = staticGroupState.rows || [];
  if (!Number.isInteger(index) || index < 0 || index >= rows.length) return;
  const [removed] = rows.splice(index, 1);
  staticGroupState.rows = rows;
  resetStaticGroupConfirmation();
  renderStaticGroupRows();
  const label = staticGroupRecordIdentity(removed?.record || {});
  showToast(`Removed ${label} from the static group list.`, "ok");
}

function clearStaticGroupRows(message = "No records added yet.") {
  staticGroupState.rows = [];
  staticGroupState.sourceText = "";
  if (elements.staticGroupResultsBody) elements.staticGroupResultsBody.innerHTML = staticGroupEmptyRow(message);
  if (elements.staticGroupCount) elements.staticGroupCount.textContent = "0 records";
  resetStaticGroupElapsedTimer();
  updateStaticGroupCreateControls();
}

function updateStaticGroupCreateControls() {
  const readyRows = staticGroupReadyRows();
  const hasName = Boolean(String(elements.staticGroupNameInput?.value || "").trim());
  const hasRecords = staticGroupHasRecordInput();
  const hasExistingGroup = Boolean(staticGroupExistingId());
  const canConfirm = hasRecords;
  if (elements.staticGroupConfirmCheckbox) {
    elements.staticGroupConfirmCheckbox.disabled = !canConfirm;
    if (!canConfirm) elements.staticGroupConfirmCheckbox.checked = false;
  }
  if (elements.staticGroupCreateButton) {
    elements.staticGroupCreateButton.disabled = (staticGroupMode === "create" ? !hasName : !hasExistingGroup) || !hasRecords || !elements.staticGroupConfirmCheckbox?.checked;
  }
  if (elements.staticGroupRetrySkippedButton) {
    const canRetry = Boolean(staticGroupState.created?.id && staticGroupSkippedRows().length);
    elements.staticGroupRetrySkippedButton.classList.toggle("hidden", !canRetry);
    elements.staticGroupRetrySkippedButton.disabled = !canRetry;
  }
}

function staticGroupRowForRecord(entry, record, seenInternalIds) {
  const internalId = String(record?.internalId || "").trim();
  if (!record || record.missing || !internalId) {
    return {
      input: entry.raw || entry.query || entry.internalId || "",
      record: mergeMissingRecord(entry),
      addable: false,
      reason: "Record does not exist.",
    };
  }
  const recordId = String(record?.entityId || cleanRecordId(record) || "").trim();
  if (/^J/i.test(recordId) || String(record?.recordType || "").toLowerCase() === "job") {
    return {
      input: entry.raw || entry.query || entry.internalId || "",
      record,
      addable: false,
      reason: "Job record; jobs are not processed.",
    };
  }
  if (seenInternalIds.has(internalId)) {
    return {
      input: entry.raw || entry.query || entry.internalId || "",
      record,
      addable: false,
      reason: "Duplicate input; record will not be added twice.",
    };
  }
  seenInternalIds.add(internalId);
  if (isYesValue(record.inactive)) {
    return {
      input: entry.raw || entry.query || entry.internalId || "",
      record,
      addable: false,
      reason: "Inactive record; not added.",
    };
  }
  const stage = mergeStageValue(record.status);
  if (!["LEAD", "PROSPECT", "CUSTOMER"].includes(stage)) {
    return {
      input: entry.raw || entry.query || entry.internalId || "",
      record,
      addable: false,
      reason: "Not a Lead, Prospect, or Customer record.",
    };
  }
  return {
    input: entry.raw || entry.query || entry.internalId || "",
    record,
    addable: true,
    reason: "Ready to add.",
  };
}

async function fetchStaticGroupRecordByInternalId(internalId) {
  const id = String(internalId || "").trim();
  if (!id) return null;
  const detail = await postStaticGroupJsonWithTimeout("/api/static-group-record", { internalId: id }, MERGE_RECORD_TIMEOUT_MS);
  if (hasUsableRecord(detail.record)) return detail.record;
  return mergeMissingRecord({ internalId: id });
}

function staticGroupCachedRowNeedsLiveRecheck(row) {
  const recordId = String(row?.record?.entityId || cleanRecordId(row?.record) || "").trim();
  return isYesValue(row?.record?.inactive)
    || /^J/i.test(recordId)
    || String(row?.record?.recordType || "").toLowerCase() === "job"
    || /inactive record|job record/i.test(row?.reason || "");
}

async function revalidateStaticGroupInactiveCachedRow(entry, cachedRow, seenInternalIds, cacheKey) {
  const internalId = String(cachedRow?.record?.internalId || "").trim();
  if (!internalId) return null;
  const refreshEntry = {
    ...entry,
    raw: entry.raw || cachedRow.input || internalId,
    internalId,
  };
  const record = await fetchStaticGroupRecordByInternalId(internalId);
  const row = staticGroupRowForRecord(refreshEntry, record, seenInternalIds);
  const internalCacheKey = recordEntryCacheKey({ internalId });
  if (!/duplicate input/i.test(row.reason || "")) {
    setCachedBatchValue(staticGroupValidationCache, cacheKey, row);
    setCachedBatchValue(staticGroupValidationCache, internalCacheKey, row);
  }
  return row;
}

async function validateStaticGroupRecords() {
  const entries = parseMergeEntries(elements.staticGroupRecordInput?.value || "", "Static Group field");
  if (!entries.length) throw new Error("Enter at least one record.");
  if (staticGroupMode === "create" && !String(elements.staticGroupNameInput?.value || "").trim()) {
    throw new Error("Enter a static group name.");
  }
  if (staticGroupMode === "append" && !staticGroupExistingId()) {
    throw new Error("Enter an existing static group URL or Internal ID.");
  }

  elements.staticGroupConfirmCheckbox.checked = false;
  staticGroupState = { ...staticGroupState, rows: [], created: null, sourceText: staticGroupInputText(), validationCacheHits: 0, validationInactiveRefreshes: 0 };
  renderStaticGroupRows();
  const seenInternalIds = new Set();
  let cacheHits = 0;
  let inactiveRefreshes = 0;
  for (const entry of entries) {
    let row;
    let rowAlreadyAccountedFor = false;
    const cacheKey = recordEntryCacheKey(entry);
    const cachedRow = cachedBatchValue(staticGroupValidationCache, cacheKey);
    if (cachedRow) {
      if (staticGroupCachedRowNeedsLiveRecheck(cachedRow)) {
        try {
          row = await revalidateStaticGroupInactiveCachedRow(entry, cachedRow, seenInternalIds, cacheKey);
          rowAlreadyAccountedFor = Boolean(row);
          inactiveRefreshes += 1;
        } catch (error) {
          row = {
            input: entry.raw || entry.query || entry.internalId || "",
            record: cachedRow.record || mergeMissingRecord(entry),
            addable: false,
            reason: error.message || "Record could not be refreshed.",
          };
        }
      }
      if (!row) {
        row = { ...cachedRow, input: entry.raw || cachedRow.input };
        cacheHits += 1;
      }
      const internalId = String(row.record?.internalId || "").trim();
      if (internalId && !rowAlreadyAccountedFor) {
        if (seenInternalIds.has(internalId)) {
          row = {
            ...row,
            addable: false,
            reason: "Duplicate input; record will not be added twice.",
          };
        } else {
          seenInternalIds.add(internalId);
        }
      }
      staticGroupState.rows.push(row);
      renderStaticGroupRows();
      continue;
    }
    try {
      const record = await resolveStaticGroupRecord(entry);
      row = staticGroupRowForRecord(entry, record, seenInternalIds);
      if (!/duplicate input/i.test(row.reason || "")) {
        setCachedBatchValue(staticGroupValidationCache, cacheKey, row);
      }
    } catch (error) {
      row = {
        input: entry.raw || entry.query || entry.internalId || "",
        record: mergeMissingRecord(entry),
        addable: false,
        reason: error.message || "Record could not be loaded.",
      };
      if (!isRequestTimeoutError(error) && !isWorkerSessionInvalidError(error)) {
        setCachedBatchValue(staticGroupValidationCache, cacheKey, row);
      }
    }
    staticGroupState.rows.push(row);
    renderStaticGroupRows();
  }
  staticGroupState.validationCacheHits = cacheHits;
  staticGroupState.validationInactiveRefreshes = inactiveRefreshes;
  return staticGroupState.rows;
}

function staticGroupInputPayload(entry) {
  const directInternalId = String(entry?.internalId || "").trim();
  const companyId = directInternalId ? "" : mergeEntryCompanyId(entry);
  const raw = String(entry?.raw || entry?.query || entry?.internalId || "").trim();
  return {
    raw,
    internalId: directInternalId,
    companyId,
    query: String(entry?.query || raw || "").trim(),
    label: raw,
    directInternalId: Boolean(directInternalId),
  };
}

function staticGroupCreatePayloadFromCurrentInput() {
  const name = String(elements.staticGroupNameInput?.value || "").trim();
  if (staticGroupMode === "create" && !name) throw new Error("Enter a static group name.");
  const currentText = staticGroupInputText();
  const entries = parseMergeEntries(currentText, "Static Group field");
  if (!entries.length) throw new Error("Enter at least one record.");
  return {
    name,
    inputs: entries.map(staticGroupInputPayload),
    skipped: [],
  };
}

function splitStaticGroupContinuation(payload, batchSize = 100) {
  const members = Array.isArray(payload?.members) ? payload.members : [];
  const inputs = Array.isArray(payload?.inputs) ? payload.inputs : [];
  const firstMembers = members.slice(0, batchSize);
  const firstInputs = members.length
    ? inputs
    : inputs.slice(0, batchSize);
  return {
    payload: {
      ...payload,
      members: firstMembers,
      inputs: firstInputs,
    },
    continuationMembers: members.slice(batchSize),
    continuationInputs: members.length ? inputs : inputs.slice(batchSize),
  };
}

function staticGroupRecordFromMember(member) {
  const label = String(member?.label || member?.input || member?.internalId || "").trim();
  const idMatch = label.match(/^(\S+)\s+(.+)$/);
  return {
    internalId: String(member?.internalId || "").trim(),
    entityId: idMatch ? idMatch[1] : "",
    companyName: idMatch ? idMatch[2] : label,
    status: "",
    salesRep: "",
    inactive: "",
  };
}

function staticGroupRowFromAddedMember(member, reason = "Added to group.") {
  return {
    input: member?.input || member?.label || member?.internalId || "",
    record: staticGroupRecordFromMember(member),
    addable: true,
    resultLabel: "Added",
    reason,
  };
}

function staticGroupRowFromSkippedMember(member, fallbackReason = "Skipped.") {
  const internalId = String(member?.internalId || "").trim();
  const reason = member?.reason || fallbackReason;
  const missingLabel = /inactive|could not resolve|not found/i.test(reason) ? "Inactive or not found" : "Record does not exist";
  const missingRecord = { ...mergeMissingRecord({ raw: member?.input || member?.raw || member?.label || "" }), missingLabel };
  return {
    input: member?.input || member?.raw || member?.label || internalId || "",
    record: internalId ? staticGroupRecordFromMember(member) : missingRecord,
    addable: false,
    resultLabel: "Skipped",
    reason,
  };
}

function staticGroupRowFromAlreadyMember(member) {
  return {
    input: member?.input || member?.label || member?.internalId || "",
    record: staticGroupRecordFromMember(member),
    addable: false,
    resultLabel: "Already added",
    reason: "Already in group; no change made.",
  };
}

function staticGroupRowsFromCreateResult(group) {
  const added = Array.isArray(group?.added) ? group.added : [];
  const already = Array.isArray(group?.already) ? group.already : [];
  const skipped = Array.isArray(group?.skipped) ? group.skipped : [];
  const failed = Array.isArray(group?.failed) ? group.failed : [];
  return [
    ...added.map((member) => staticGroupRowFromAddedMember(member)),
    ...already.map((member) => staticGroupRowFromAlreadyMember(member)),
    ...skipped.map((member) => staticGroupRowFromSkippedMember(member)),
    ...failed.map((member) => staticGroupRowFromSkippedMember(member, "Could not add member.")),
  ];
}

function staticGroupRetryPayload() {
  const groupId = String(staticGroupState.created?.id || "").trim();
  if (!groupId) throw new Error("Create the static group first before retrying skipped records.");
  const skippedRows = staticGroupSkippedRows();
  if (!skippedRows.length) throw new Error("No skipped records to retry.");
  return {
    groupId,
    inputs: skippedRows.map((row) => staticGroupInputPayload({
      raw: row.input || staticGroupRecordIdentity(row.record || {}),
      internalId: row.record?.internalId || "",
      query: row.input || "",
    })),
  };
}

function renderStaticGroupHistory(items = staticGroupHistoryState.items) {
  if (!elements.staticGroupHistoryList) return;
  const groups = Array.isArray(items) ? items : [];
  if (!groups.length) {
    elements.staticGroupHistoryList.innerHTML = `
      <div class="empty-state">
        ${noResultsIconHtml()}
        <span>No static groups created from this app yet.</span>
      </div>
    `;
    return;
  }
  elements.staticGroupHistoryList.innerHTML = `
    <table class="recent-record-table static-group-history-table" aria-label="Created Static Groups">
      <thead>
        <tr>
          <th scope="col">Static Group</th>
          <th scope="col">Members</th>
          <th scope="col">Skipped</th>
          <th scope="col">Created</th>
        </tr>
      </thead>
      <tbody>
        ${groups.map((item) => `
          <tr>
            <td><a href="${escapeHtml(item.url || "#")}" data-open-static-group-url="${escapeHtml(item.url || "")}">${escapeHtml(displayValue(item.name))}</a></td>
            <td>${escapeHtml(displayValue(item.memberCount))}</td>
            <td>${escapeHtml(displayValue(item.skippedCount))}</td>
            <td>${escapeHtml(displayValue(item.createdAtLabel || ""))}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

async function loadStaticGroupHistory(options = {}) {
  if (staticGroupHistoryState.loaded && !options.force) {
    renderStaticGroupHistory();
    return staticGroupHistoryState.items;
  }
  const result = await getJson("/api/static-groups-history");
  staticGroupHistoryState.items = Array.isArray(result.items) ? result.items : [];
  staticGroupHistoryState.loaded = true;
  renderStaticGroupHistory();
  return staticGroupHistoryState.items;
}

async function createStaticGroupFromReview() {
  if (staticGroupMode === "create" && !String(elements.staticGroupNameInput?.value || "").trim()) throw new Error("Enter a static group name.");
  if (staticGroupMode === "append" && !staticGroupExistingId()) throw new Error("Enter an existing static group URL or Internal ID.");
  if (!elements.staticGroupConfirmCheckbox?.checked) throw new Error("Tick the review confirmation before creating the static group.");
  const rawPayload = staticGroupCreatePayloadFromCurrentInput();
  if (!rawPayload.members?.length && !rawPayload.inputs?.length) throw new Error("No records are ready to add.");
  const split = splitStaticGroupContinuation(rawPayload);
  const firstPayload = staticGroupMode === "append"
    ? { ...split.payload, groupId: staticGroupExistingId() }
    : split.payload;
  const result = staticGroupMode === "append"
    ? await postJson("/api/static-group-add-members", firstPayload)
    : await postJson("/api/static-group-create", firstPayload);
  const groupId = String(result?.group?.id || result?.groupId || staticGroupExistingId() || "").trim();
  const remaining = [
    ...split.continuationMembers.map((member) => ({ members: [member], inputs: [] })),
    ...split.continuationInputs.map((input) => ({ members: [], inputs: [input] })),
  ];
  if (!groupId || !remaining.length) return result;
  const aggregate = {
    added: [],
    already: [],
    skipped: [],
    failed: [],
  };
  for (let index = 0; index < remaining.length; index += 100) {
    const batch = remaining.slice(index, index + 100);
    const addResult = await postJson("/api/static-group-add-members", {
      groupId,
      members: batch.flatMap((item) => item.members),
      inputs: batch.flatMap((item) => item.inputs),
      skipped: [],
    });
    for (const key of Object.keys(aggregate)) {
      if (Array.isArray(addResult?.[key])) aggregate[key].push(...addResult[key]);
    }
  }
  if (result.group) {
    result.group.added = [...(result.group.added || []), ...aggregate.added, ...aggregate.already];
    result.group.skipped = [...(result.group.skipped || []), ...aggregate.skipped, ...aggregate.failed];
    result.group.failed = [...(result.group.failed || []), ...aggregate.failed];
    result.group.memberCount = result.group.added.length;
    result.group.skippedCount = result.group.skipped.length;
  } else {
    result.added = [...(result.added || []), ...aggregate.added];
    result.already = [...(result.already || []), ...aggregate.already];
    result.skipped = [...(result.skipped || []), ...aggregate.skipped];
    result.failed = [...(result.failed || []), ...aggregate.failed];
  }
  return result;
}

async function retryStaticGroupSkippedRecords() {
  const payload = staticGroupRetryPayload();
  return postJson("/api/static-group-add-members", payload);
}

function normalizeIndustryText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function industryMatches(recordIndustry, territoryIndustry) {
  const record = normalizeIndustryText(recordIndustry);
  if (!record) return false;
  const candidates = String(territoryIndustry || "")
    .split(/[,;|]/)
    .map((part) => normalizeIndustryText(part))
    .filter(Boolean);
  candidates.push(normalizeIndustryText(territoryIndustry));
  return [...new Set(candidates)]
    .some((candidate) => candidate === record || candidate.includes(record) || record.includes(candidate));
}

function parseRevenueMillions(value) {
  const text = String(value || "").trim().toLowerCase();
  if (!text || text === "---") return null;
  const match = text.replace(/,/g, "").match(/(-?\d+(?:\.\d+)?)\s*([bmk])?/i);
  if (!match) return null;
  const amount = Number.parseFloat(match[1]);
  if (!Number.isFinite(amount)) return null;
  const suffix = String(match[2] || "").toLowerCase();
  if (suffix === "b") return amount * 1000;
  if (suffix === "m") return amount;
  if (suffix === "k") return amount / 1000;
  return amount >= 10000 ? amount / 1000000 : amount;
}

function territoryRevenueRule(name) {
  const tokens = String(name || "").toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
  if (tokens.includes("LMM")) return { label: "$0 to $10M", min: 0, max: 10 };
  if (tokens.includes("UMM")) return { label: "$10M to $20M", min: 10, max: 20 };
  if (tokens.includes("MM")) return { label: "$0 to $20M", min: 0, max: 20 };
  if (tokens.includes("CORP")) return { label: "$20M to $100M", min: 20, max: 100 };
  if (tokens.includes("ENT")) return { label: "$100M+", min: 100, max: Number.POSITIVE_INFINITY };
  return null;
}

function revenueInRule(revenueMillions, rule) {
  if (!rule || revenueMillions === null) return false;
  return revenueMillions >= rule.min && revenueMillions <= rule.max;
}

function revenueInRegionSegment(revenueMillions, segment) {
  if (revenueMillions === null || !segment?.revenue) return false;
  const min = Number.isFinite(segment.revenue.min) ? segment.revenue.min : null;
  const max = Number.isFinite(segment.revenue.max) ? segment.revenue.max : null;
  if (min === null) return false;
  return revenueMillions >= min && (max === null || revenueMillions <= max);
}

function normalizeRegionRuleText(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function regionRuleTokens(value) {
  return normalizeRegionRuleText(value).split(" ").filter(Boolean);
}

function regionRuleTokensContainSequence(tokens, sequence) {
  if (!Array.isArray(tokens) || !Array.isArray(sequence) || !sequence.length) return false;
  return tokens.some((_, index) => sequence.every((part, offset) => tokens[index + offset] === part));
}

function normalizeTerritoryRegionScope(value) {
  const tokens = regionRuleTokens(value);
  if (regionRuleTokensContainSequence(tokens, ["CENTRAL", "QC"])) return "CENTRAL_QC";
  if (tokens.includes("EAST")) return "EAST";
  if (tokens.includes("WEST")) return "WEST";
  if (tokens.includes("CENTRAL")) return "CENTRAL";
  if (tokens.includes("SOUTH")) return "SOUTH";
  if (tokens.includes("EMEA")) return "EMEA";
  if (tokens.includes("ANZ")) return "ANZ";
  if (tokens.includes("APJ")) return "APJ";
  if (tokens.includes("LATAM")) return "LATAM";
  return "";
}

function stateProvinceAliasMap() {
  const map = new Map();
  for (const [name, code] of Object.entries(recordRegionRules?.stateProvinceAliases || {})) {
    const normalizedCode = normalizeRegionRuleText(code);
    if (!normalizedCode) continue;
    map.set(normalizeRegionRuleText(name), normalizedCode);
    map.set(normalizedCode, normalizedCode);
  }
  for (const rule of recordRegionRules?.industryRegionRules || []) {
    for (const codes of Object.values(rule?.regions || {})) {
      for (const code of Array.isArray(codes) ? codes : []) {
        const normalizedCode = normalizeRegionRuleText(code);
        if (normalizedCode) map.set(normalizedCode, normalizedCode);
      }
    }
  }
  return map;
}

function normalizeStateProvinceCode(value) {
  const text = normalizeRegionRuleText(value);
  if (!text) return "";
  const aliases = stateProvinceAliasMap();
  if (aliases.has(text)) return aliases.get(text);
  const tokens = text.split(" ").filter(Boolean);
  for (let index = tokens.length - 1; index >= 0; index -= 1) {
    if (aliases.has(tokens[index])) return aliases.get(tokens[index]);
  }
  for (let start = 0; start < tokens.length; start += 1) {
    for (let end = tokens.length; end > start; end -= 1) {
      const phrase = tokens.slice(start, end).join(" ");
      if (aliases.has(phrase)) return aliases.get(phrase);
    }
  }
  return "";
}

function recordStateProvinceCode(record) {
  const direct = normalizeStateProvinceCode(record?.billingStateProvince || record?.stateProvince || record?.state);
  if (direct) return direct;
  const lines = String(record?.address || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const code = normalizeStateProvinceCode(lines[index]);
    if (code) return code;
  }
  return "";
}

function recordRegionRuleForIndustry(industry) {
  const recordIndustry = normalizeIndustryText(industry);
  if (!recordIndustry) return null;
  return (recordRegionRules?.industryRegionRules || []).find((rule) => {
    const industries = Array.isArray(rule?.industries) ? rule.industries : [];
    return industries.some((candidate) => industryMatches(recordIndustry, candidate));
  }) || null;
}

function regionSegmentsWithStateRules(rule, annualRevenue) {
  const segments = (Array.isArray(rule?.segments) ? rule.segments : [])
    .filter((segment) => Array.isArray(segment?.states) && segment.states.length && normalizeRegionRuleText(segment.region) !== "NOAM");
  if (!segments.length) return [];
  const revenueMillions = parseRevenueMillions(annualRevenue);
  if (revenueMillions !== null) {
    const revenueSegments = segments.filter((segment) => revenueInRegionSegment(revenueMillions, segment));
    if (revenueSegments.length) return revenueSegments;
  }
  return segments;
}

function recordRegionForIndustryAndState(industry, stateProvince, annualRevenue = "") {
  const rule = recordRegionRuleForIndustry(industry);
  const code = normalizeStateProvinceCode(stateProvince);
  if (!rule || !code) return { region: "", regions: [], stateProvince: code, rule: rule || null };
  const segments = regionSegmentsWithStateRules(rule, annualRevenue);
  const regions = [];
  if (segments.length) {
    for (const segment of segments) {
      const normalizedRegion = normalizeTerritoryRegionScope(segment.region);
      const codes = (Array.isArray(segment.states) ? segment.states : []).map(normalizeRegionRuleText);
      if (normalizedRegion && codes.includes(code) && !regions.includes(normalizedRegion)) {
        regions.push(normalizedRegion);
      }
    }
  } else {
    for (const [region, codes] of Object.entries(rule.regions || {})) {
      const normalizedRegion = normalizeTerritoryRegionScope(region);
      if ((Array.isArray(codes) ? codes : []).map(normalizeRegionRuleText).includes(code)) {
        regions.push(normalizedRegion);
      }
    }
  }
  return { region: regions[0] || "", regions, stateProvince: code, rule };
}

function recordRegionInfo(record) {
  return recordRegionForIndustryAndState(record?.industry, recordStateProvinceCode(record), record?.annualRevenue);
}

function territoryRegionToken(name) {
  return normalizeTerritoryRegionScope(name);
}

function territoryRegionForMatch(territory, rep) {
  return territoryRegionToken(territory?.name)
    || territoryRegionToken(territory?.salesSubRegion)
    || territoryRegionToken(rep?.salesSubRegion);
}

function territoryStateRuleForMatch(territory) {
  return recordRegionRuleForIndustry(territory?.industry || territory?.description || "");
}

function normalizedRevenueMax(value) {
  return value === null || value === undefined ? Number.POSITIVE_INFINITY : value;
}

function territoryRevenueRuleMatchesSegment(territoryRule, segment) {
  if (!territoryRule || !segment?.revenue) return true;
  const segmentMin = Number.isFinite(segment.revenue.min) ? segment.revenue.min : null;
  const segmentMax = normalizedRevenueMax(segment.revenue.max);
  if (segmentMin === null) return false;
  if (territoryRule.label === "$0 to $20M") {
    return segmentMin >= territoryRule.min && segmentMax <= territoryRule.max;
  }
  return segmentMin === territoryRule.min && segmentMax === normalizedRevenueMax(territoryRule.max);
}

function territoryStateCoverageSegments(item, rep) {
  const region = normalizeTerritoryRegionScope(item?.region || territoryRegionForMatch(item?.territory, rep));
  const rule = territoryStateRuleForMatch(item?.territory);
  if (!region || !rule) return [];
  return (Array.isArray(rule?.segments) ? rule.segments : [])
    .filter((segment) => Array.isArray(segment?.states) && segment.states.length)
    .filter((segment) => normalizeTerritoryRegionScope(segment.region) === region)
    .filter((segment) => territoryRevenueRuleMatchesSegment(item?.rule, segment));
}

function territoryCoversStateProvince(item, rep, stateProvince) {
  const code = normalizeStateProvinceCode(stateProvince);
  if (!code) return false;
  return territoryStateCoverageSegments(item, rep)
    .some((segment) => (Array.isArray(segment.states) ? segment.states : [])
      .map(normalizeRegionRuleText)
      .includes(code));
}

function recordRegionDisplay(record) {
  const info = recordRegionInfo(record);
  if (!info.stateProvince) return "---";
  if (info.regions?.length) return `${info.stateProvince} (${info.regions.join("/")})`;
  if (info.rule) return `${info.stateProvince} (Needs Review)`;
  return info.stateProvince;
}

function recordRegionBadgeDisplay(record) {
  const info = recordRegionInfo(record);
  if (info.regions?.length) return info.regions.join("/");
  if (info.rule && info.stateProvince) return "Needs Review";
  return "";
}

function recordRegionBadge(record) {
  const text = recordRegionBadgeDisplay(record);
  if (!text) return "";
  return `<span class="record-region-badge" title="Record State/Region">${escapeHtml(text)}</span>`;
}

function recordIndustryRevenueDisplay(record) {
  return `${displayValue(record?.industry)} / ${displayValue(record?.annualRevenue)}`;
}

function eligibilityPill(result) {
  const value = String(result || "").trim();
  const mode = value === "Eligible"
    ? "eligible"
    : value === "Maybe"
      ? "maybe"
      : value === "Needs Review"
        ? "review"
        : "not-eligible";
  return `<span class="status-pill ${mode}">${escapeHtml(value)}</span>`;
}

const ELIGIBILITY_CONFLICT_ORDER = ["Industry", "Annual Revenue", "State/Region", "Sales Rep"];

function eligibilityConflictList(conflicts) {
  return [...new Set(conflicts)]
    .filter(Boolean)
    .sort((left, right) => {
      const leftIndex = ELIGIBILITY_CONFLICT_ORDER.indexOf(left);
      const rightIndex = ELIGIBILITY_CONFLICT_ORDER.indexOf(right);
      return (leftIndex === -1 ? ELIGIBILITY_CONFLICT_ORDER.length : leftIndex) - (rightIndex === -1 ? ELIGIBILITY_CONFLICT_ORDER.length : rightIndex);
    });
}

function eligibilityConflictNote(conflicts) {
  const uniqueConflicts = eligibilityConflictList(conflicts);
  if (!uniqueConflicts.length) return "";
  if (uniqueConflicts.length === 1) return `${uniqueConflicts[0]} conflict`;
  if (uniqueConflicts.length === 2) return `${uniqueConflicts[0]} and ${uniqueConflicts[1]} conflict`;
  return `${uniqueConflicts.slice(0, -1).join(", ")}, and ${uniqueConflicts.at(-1)} conflict`;
}

function eligibilityNotEligible(conflicts) {
  const normalizedConflicts = eligibilityConflictList(conflicts);
  return {
    eligibility: "Not Eligible",
    notes: eligibilityConflictNote(normalizedConflicts),
    conflicts: normalizedConflicts,
  };
}

function eligibilityConflictSet(row) {
  const conflicts = Array.isArray(row?.conflicts) ? eligibilityConflictList(row.conflicts) : [];
  if (conflicts.length) return new Set(conflicts);
  const notes = String(row?.notes || "");
  return new Set(ELIGIBILITY_CONFLICT_ORDER.filter((key) => notes.includes(key)));
}

function eligibilityConflictText(value, conflicts, key) {
  const className = conflicts.has(key) ? ' class="eligibility-conflict-text"' : "";
  return `<span${className}>${escapeHtml(displayValue(value))}</span>`;
}

function recordIndustryRevenueHtml(record, conflicts) {
  return `
    <span class="eligibility-field-pair">
      ${eligibilityConflictText(record?.industry, conflicts, "Industry")}
      <span class="eligibility-field-divider">/</span>
      ${eligibilityConflictText(record?.annualRevenue, conflicts, "Annual Revenue")}
    </span>
  `;
}

function recordSalesRepLsadHtml(record, conflicts) {
  return `
    <span class="eligibility-field-pair">
      ${eligibilityConflictText(record?.salesRep, conflicts, "Sales Rep")}
      <span class="eligibility-field-divider">/</span>
      ${eligibilityConflictText(record?.lsadDate, conflicts, "Sales Rep")}
    </span>
  `;
}

function eligibilityDateWithinPastDays(value, days) {
  const raw = String(value || "").trim();
  if (!raw || raw === "---") return false;
  const match = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  const parsed = match
    ? new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2]))
    : new Date(raw);
  if (Number.isNaN(parsed.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsed.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - parsed.getTime()) / 86400000);
  return diffDays >= 0 && diffDays <= days;
}

function hasCurrentSalesRep(value) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
  return Boolean(normalized && normalized !== "---" && normalized !== "none");
}

function normalizeSalesRepName(value) {
  return String(value || "")
    .replace(/^\d+\s+/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function isSameSalesRep(recordSalesRep, selectedSalesRep) {
  const currentName = normalizeSalesRepName(recordSalesRep);
  const selectedName = normalizeSalesRepName(selectedSalesRep?.name);
  return Boolean(currentName && selectedName && currentName === selectedName);
}

function isNurturingMarketingSalesRep(value) {
  const normalized = String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
  return normalized === "nurturing, marketing";
}

function evaluateLeadEligibility(record, rep) {
  const notes = [];
  const industry = String(record?.industry || "").trim();
  const revenueText = String(record?.annualRevenue || "").trim();
  const revenueMillions = parseRevenueMillions(revenueText);
  const conflicts = [];
  if (
    hasCurrentSalesRep(record?.salesRep)
    && !isSameSalesRep(record?.salesRep, rep)
    && !isNurturingMarketingSalesRep(record?.salesRep)
    && eligibilityDateWithinPastDays(record?.lsadDate, 30)
  ) {
    conflicts.push("Sales Rep");
  }
  if (!industry) notes.push("Missing Industry");
  if (!revenueText || revenueMillions === null) notes.push("Missing Annual Revenue");
  if (notes.length) {
    return conflicts.length ? eligibilityNotEligible(conflicts) : { eligibility: "Needs Review", notes: notes.join("; ") };
  }

  const territories = Array.isArray(rep?.territories) ? rep.territories : [];
  if (!territories.length) {
    return conflicts.length ? eligibilityNotEligible(conflicts) : { eligibility: "Needs Review", notes: "No sales rep territories found" };
  }
  if (!territories.some((territory) => String(territory?.industry || "").trim())) {
    return conflicts.length ? eligibilityNotEligible(conflicts) : { eligibility: "Needs Review", notes: "No sales rep territory industry found" };
  }
  const territoryMatches = territories.map((territory) => ({ territory, rule: territoryRevenueRule(territory.name) }));
  const matchingTerritories = territories
    .map((territory) => ({ territory, rule: territoryRevenueRule(territory.name) }))
    .filter(({ territory }) => industryMatches(industry, territory.industry));

  if (!matchingTerritories.length) {
    conflicts.push("Industry");
  }

  let revenueTerritories = matchingTerritories.length ? matchingTerritories : territoryMatches;
  const stateProvince = recordStateProvinceCode(record);
  const regionCheckTerritories = matchingTerritories.length ? matchingTerritories : territoryMatches;
  const regionSpecificTerritories = regionCheckTerritories
    .map((item) => ({ ...item, region: territoryRegionForMatch(item.territory, rep) }))
    .filter((item) => item.region);
  if (regionSpecificTerritories.length) {
    if (!stateProvince) {
      return conflicts.length ? eligibilityNotEligible(conflicts) : { eligibility: "Needs Review", notes: "Record state needs review" };
    }
    const stateCoverageTerritories = regionSpecificTerritories
      .filter((item) => territoryStateCoverageSegments(item, rep).length);
    const stateMatches = stateCoverageTerritories
      .filter((item) => territoryCoversStateProvince(item, rep, stateProvince));
    if (stateCoverageTerritories.length && !stateMatches.length) {
      conflicts.push("State/Region");
    } else if (matchingTerritories.length && stateMatches.length) {
      revenueTerritories = stateMatches;
    }
  }

  const regularMatch = revenueTerritories.find(({ rule }) => revenueInRule(revenueMillions, rule));
  if (regularMatch) {
    return conflicts.length
      ? eligibilityNotEligible(conflicts)
      : { eligibility: "Eligible", notes: "No conflicts encountered", conflicts: [] };
  }

  const hybridRevenueCovered = isHybridSalesRep(rep) && revenueMillions >= 0 && revenueMillions <= 20;
  if (hybridRevenueCovered) {
    if (conflicts.length) {
      return eligibilityNotEligible(conflicts);
    }
    return { eligibility: "Maybe", notes: "Covered by Hybrid revenue range", conflicts: [] };
  }

  const hasRevenueRule = revenueTerritories.some(({ rule }) => Boolean(rule));
  if (hasRevenueRule) {
    conflicts.push("Annual Revenue");
  }
  if (conflicts.length) {
    return eligibilityNotEligible(conflicts);
  }
  return { eligibility: "Needs Review", notes: "No territory revenue range found", conflicts: [] };
}

function renderEligibilityRows(rows) {
  if (!rows.length) {
    clearEligibilityResults();
    return;
  }
  eligibilityResultRows = rows.slice();
  elements.eligibilityCount.textContent = `${rows.length} ${rows.length === 1 ? "record" : "records"}`;
  if (elements.eligibilityExportButton) elements.eligibilityExportButton.disabled = !eligibilityResultRows.length;
  elements.eligibilityResultsBody.innerHTML = rows.map((row) => {
    const conflicts = eligibilityConflictSet(row);
    return `
      <tr>
        <td>${recordValueLinkHtml(row, row.internalId)}</td>
        <td>${recordValueLinkHtml(row, row.entityId)}</td>
        <td>${recordValueLinkHtml(row, row.companyName)}</td>
        <td>${recordIndustryRevenueHtml(row, conflicts)}</td>
        <td>${recordSalesRepLsadHtml(row, conflicts)}</td>
        <td>${eligibilityConflictText(row.stateRegion, conflicts, "State/Region")}</td>
        <td>${eligibilityPill(row.eligibility)}</td>
        <td>${escapeHtml(displayValue(row.notes))}</td>
      </tr>
    `;
  }).join("");
}

function renderPitchbookRows(rows = []) {
  if (elements.pitchbookCount) elements.pitchbookCount.textContent = `${rows.length} ${rows.length === 1 ? "record" : "records"}`;
  if (!elements.pitchbookResultsBody) return;
  if (!rows.length) {
    elements.pitchbookResultsBody.innerHTML = `<tr><td colspan="5" class="empty empty-state-cell"><div class="empty-state"><span class="empty-state-icon" aria-hidden="true"><span></span><span></span></span><span>No Pitchbook group records found.</span></div></td></tr>`;
    return;
  }
  elements.pitchbookResultsBody.innerHTML = rows.map((row) => {
    const pitchbookId = String(row.entityId || "").trim().split(/\s+/)[0] || "";
    const pitchbookIdName = [pitchbookId, row.name].filter(Boolean).join(" ");
    return `
    <tr>
      <td>${escapeHtml(displayValue(row.internalId || row.id))}</td>
      <td><a class="field-text-link" href="${escapeHtml(row.url || "#")}" target="_blank" rel="noopener noreferrer">${escapeHtml(pitchbookIdName)}</a></td>
      <td>${escapeHtml(displayValue(row.privateEquityVentureCapital))}</td>
      <td>${escapeHtml(displayValue(row.additionalPeVc))}</td>
      <td class="row-actions">
        ${row.editUrl ? `<a class="small-button secondary row-action-button related-open-link" href="${escapeHtml(row.editUrl)}" target="_blank" rel="noopener noreferrer" title="Edit in NSCORP" aria-label="Edit in NSCORP">${ACTION_ICONS.edit}<span class="sr-only">Edit</span></a>` : ""}
        ${row.url ? `<a class="small-button row-action-button related-open-link" href="${escapeHtml(row.url)}" target="_blank" rel="noopener noreferrer" title="Open in NSCORP" aria-label="Open in NSCORP">${ACTION_ICONS.open}<span class="sr-only">Open</span></a>` : ""}
      </td>
    </tr>
  `;
  }).join("");
}

function clearDupeResults(message = "No duplicate finder results yet.") {
  if (!elements.dupeResultsBody) return;
  dupeResultRows = [];
  elements.dupeResultsBody.innerHTML = message === "No duplicate finder results yet."
    ? noResultsRow(6, message)
    : tableEmptyRow(6, message);
  if (elements.dupeCount) elements.dupeCount.textContent = "0 records";
  if (elements.dupeCopyFhButton) elements.dupeCopyFhButton.disabled = true;
  if (elements.dupeExportButton) elements.dupeExportButton.disabled = true;
  if (elements.dupeOpenExtractFolderButton) {
    elements.dupeOpenExtractFolderButton.classList.add("hidden");
    elements.dupeOpenExtractFolderButton.disabled = false;
    elements.dupeOpenExtractFolderButton.textContent = "Open Folder";
  }
}

function renderDupeRows(rows) {
  if (!rows.length) {
    clearDupeResults();
    return;
  }
  dupeResultRows = rows.slice();
  elements.dupeCount.textContent = `${rows.length} ${rows.length === 1 ? "record" : "records"}`;
  if (elements.dupeCopyFhButton) elements.dupeCopyFhButton.disabled = !dupeResultRows.length;
  if (elements.dupeExportButton) elements.dupeExportButton.disabled = !dupeResultRows.length;
  elements.dupeResultsBody.innerHTML = rows.map((row) => {
    const duplicateHtml = row.duplicates.length
      ? row.duplicates.map((item) => `<div class="dupe-candidate-line${item.review ? " review" : ""}">${dupeRecordLinkHtml(item.record)}<span>${escapeHtml(item.reasons.join(", "))}</span></div>`).join("")
      : escapeHtml("---");
    return `
      <tr>
        <td>${dupeRecordLinkHtml(row.source)}</td>
        <td class="multiline-cell">${duplicateHtml}</td>
        <td>
          <div class="dupe-master-cell">
            <strong>${dupeRecordLinkHtml(row.master)}</strong>
          </div>
        </td>
        <td>${escapeHtml(displayValue(row.master?.status))}</td>
        <td>${escapeHtml(displayValue(row.master?.salesRep))}</td>
        <td>${escapeHtml(row.reason)}</td>
      </tr>
    `;
  }).join("");
}

function clearDomainResults(message = "No domain search results yet.") {
  if (!elements.domainResultsBody) return;
  domainResultRows = [];
  elements.domainResultsBody.innerHTML = message === "No domain search results yet."
    ? noResultsRow(7, message)
    : tableEmptyRow(7, message);
  if (elements.domainCount) elements.domainCount.textContent = "0 domains";
  if (elements.domainExportButton) elements.domainExportButton.disabled = true;
  if (elements.domainOpenExtractFolderButton) {
    elements.domainOpenExtractFolderButton.classList.add("hidden");
    elements.domainOpenExtractFolderButton.disabled = false;
    elements.domainOpenExtractFolderButton.textContent = "Open Folder";
  }
}

function domainPotentialMasterHtml(items, status) {
  if (!items?.length) return escapeHtml(status || "No records found");
  return items.map((item) => {
    const reasons = Array.isArray(item.reasons) ? item.reasons.join(", ") : "";
    return `<div class="dupe-candidate-line${item.review ? " review" : ""}">${dupeRecordLinkHtml(item.record)}<span>${escapeHtml(reasons)}</span></div>`;
  }).join("");
}

function renderDomainRows(rows) {
  if (!rows.length) {
    clearDomainResults();
    return;
  }
  domainResultRows = rows.slice();
  if (elements.domainCount) elements.domainCount.textContent = `${rows.length} ${rows.length === 1 ? "domain" : "domains"}`;
  if (elements.domainExportButton) elements.domainExportButton.disabled = !domainResultRows.length;
  elements.domainResultsBody.innerHTML = rows.map((row) => {
    const potentialMasterHtml = domainPotentialMasterHtml(row.items, row.status);
    return `
      <tr>
        <td>${escapeHtml(row.input)}</td>
        <td>${escapeHtml(displayValue(row.domain))}</td>
        <td class="multiline-cell">${potentialMasterHtml}</td>
        <td>
          <div class="dupe-master-cell${row.review ? " review" : ""}">
            <strong>${row.master ? dupeRecordLinkHtml(row.master) : escapeHtml("---")}</strong>
          </div>
        </td>
        <td>${escapeHtml(displayValue(row.master?.status))}</td>
        <td>${escapeHtml(displayValue(row.master?.salesRep))}</td>
        <td>${escapeHtml(displayValue(row.reason))}</td>
      </tr>
    `;
  }).join("");
}

function dupeClipboardValue(value) {
  return displayValue(value).replace(/\t/g, " ").replace(/\r?\n/g, " ").trim();
}

function dupeRowsToFhClipboard(rows) {
  return (rows || []).map((row) => [
    dupeClipboardValue(dupeRecordLabel(row.master)),
    dupeClipboardValue(row.master?.status),
    dupeClipboardValue(row.master?.salesRep),
  ].join("\t")).join("\n");
}

function duplicateFinderExportRows(rows) {
  return (rows || []).map((row) => [
    dupeClipboardValue(dupeRecordLabel(row.source)),
    row.duplicates?.length
      ? row.duplicates.map((item) => `${dupeClipboardValue(dupeRecordLabel(item.record))} - ${dupeClipboardValue(item.reasons?.join(", "))}`).join("\n\n")
      : "---",
    dupeClipboardValue(dupeRecordLabel(row.master)),
    dupeClipboardValue(row.master?.status),
    dupeClipboardValue(row.master?.salesRep),
    dupeClipboardValue(row.reason),
  ]);
}

function domainSearchExportRows(rows) {
  return (rows || []).map((row) => [
    dupeClipboardValue(row.input),
    dupeClipboardValue(row.domain),
    row.items?.length
      ? row.items.map((item) => `${dupeClipboardValue(dupeRecordLabel(item.record))} - ${dupeClipboardValue(item.reasons?.join(", "))}`).join("\n\n")
      : dupeClipboardValue(row.status || "No records found"),
    dupeClipboardValue(dupeRecordLabel(row.master)),
    dupeClipboardValue(row.master?.status),
    dupeClipboardValue(row.master?.salesRep),
    dupeClipboardValue(row.reason),
  ]);
}

function eligibilityExportRows(rows) {
  return (rows || []).map((row) => [
    displayValue(row.internalId),
    displayValue(row.entityId),
    displayValue(row.companyName),
    displayValue(row.industry),
    displayValue(row.annualRevenue),
    displayValue(row.salesRep),
    displayValue(row.lsadDate),
    displayValue(row.stateRegion),
    displayValue(row.eligibility),
    displayValue(row.notes),
  ]);
}

async function exportRowsToDownloads(options) {
  const rows = Array.isArray(options.rows) ? options.rows : [];
  if (!rows.length) {
    setStatus(options.statusElement, `No ${options.label} rows to extract.`, "error");
    return;
  }

  const button = options.button;
  const originalText = button?.textContent || "Extract";
  if (button) {
    button.disabled = true;
    button.textContent = "Extracting...";
  }
  try {
    const result = await postJson("/api/result-export", {
      fileName: options.fileName,
      headers: options.headers,
      rows,
    });
    setStatus(options.statusElement, `Extracted ${result.rowCount} row(s) to ${result.csvPath}.`, "ok", { autoClear: false });
    if (options.folderButton) {
      options.folderButton.classList.remove("hidden");
      options.folderButton.disabled = false;
      options.folderButton.textContent = "Open Folder";
    }
    showToast(`${options.label} extracted to Downloads.`);
    addAppActivity("export", `${options.label} extracted`, `${result.rowCount} row(s) exported`);
  } catch (error) {
    setStatus(options.statusElement, error.message || `Could not extract ${options.label}.`, "error", { autoClear: false });
  } finally {
    if (button) {
      button.textContent = originalText;
      button.disabled = !rows.length;
    }
  }
}

async function openDownloadsFolder(button, statusElement) {
  const originalText = button?.textContent || "Open Folder";
  if (button) {
    button.disabled = true;
    button.textContent = "Opening...";
  }
  try {
    const result = await postJson("/api/open-extract-folder");
    setStatus(statusElement, `Opened ${result.folderPath}.`, "ok");
    addAppActivity("folder", "Opened Downloads folder", result.folderPath || "Downloads");
  } catch (error) {
    setStatus(statusElement, error.message || "Could not open Downloads folder.", "error", { autoClear: false });
  } finally {
    if (button) {
      button.disabled = false;
      button.textContent = originalText;
    }
  }
}

function renderEligibilitySalesRepResults(items) {
  elements.resultsHead.innerHTML = resultHeadHtml.eligibility;
  if (!items?.length) {
    elements.resultsBody.innerHTML = emptyResultBodyHtml.eligibility;
    return;
  }

  elements.resultsBody.innerHTML = items.map((item) => `
    <tr>
      <td>${escapeHtml(item.kind || item.type || "Sales Rep")}</td>
      <td>${escapeHtml(item.internalId)}</td>
      <td><span class="result-name-line"><span class="result-name-text">${escapeHtml(item.name || item.title || "")}</span><span class="result-name-badges">${salesRepResultStatusBadge(item.rosterStatus)}${hybridBadge(item)}</span></span></td>
      <td>${escapeHtml(displayValue(item.salesRole))}</td>
      <td class="nowrap actions-column">
        <button type="button" class="small-button" data-select-eligibility-rep-id="${escapeHtml(item.internalId)}">Select</button>
        <button type="button" class="small-button secondary" data-open-rep-id="${escapeHtml(item.internalId)}">Open</button>
      </td>
    </tr>
  `).join("");
}

function hasUsableRecord(record) {
  return Boolean(record?.internalId && (record?.entityId || record?.companyName || record?.industry || record?.annualRevenue));
}

async function resolveEligibilityRecord(entry) {
  if (entry.internalId) {
    const detail = await postJson("/api/roe-record", { internalId: entry.internalId });
    if (hasUsableRecord(detail.record)) return detail.record;
    if (!entry.raw) return detail.record || { internalId: entry.internalId };
  }
  const search = await postJson("/api/roe-search", { query: entry.query || entry.raw });
  const item = (search.items || [])[0];
  if (!item?.internalId) {
    return {
      source: entry.raw,
      eligibility: "Needs Review",
      notes: "Could not resolve record",
    };
  }
  const detail = await postJson("/api/roe-record", { internalId: item.internalId });
  return detail.record || { internalId: item.internalId };
}

async function resolveDupeSourceRecord(entry) {
  if (entry.internalId) {
    const detail = await postDupeJsonWithTimeout("/api/dupe-record", { internalId: entry.internalId }, DUPE_RECORD_TIMEOUT_MS);
    if (hasUsableRecord(detail.record)) return detail.record;
    return detail.record || { internalId: entry.internalId };
  }

  let lastLookupError = null;
  const queries = dupeSourceResolveQueries(entry);
  for (const query of queries) {
    try {
      const search = await postDupeJsonWithTimeout("/api/dupe-search", { query, fast: true }, DUPE_SEARCH_TIMEOUT_MS);
      const item = chooseDupeSourceSearchItem(entry, search.items || []);
      if (item?.internalId) {
        const detail = await postDupeJsonWithTimeout("/api/dupe-record", { internalId: item.internalId }, DUPE_RECORD_TIMEOUT_MS);
        if (hasUsableRecord(detail.record)) return detail.record;
      }
    } catch (error) {
      if (isWorkerSessionInvalidError(error)) throw error;
      lastLookupError = error;
      // Try the next source lookup path.
    }
  }
  if (lastLookupError?.message) {
    throw new Error(`Could not resolve ${entry.raw}: ${lastLookupError.message}`);
  }
  throw new Error(`Could not resolve ${entry.raw}.`);
}

async function findDuplicateCandidates(source) {
  const queries = dupeCandidateSearchQueries(source);

  const candidateMap = new Map();
  let candidateOrder = 0;
  for (const { query, kind } of queries) {
    try {
      const result = await postDupeJsonWithTimeout("/api/dupe-search", { query: `cu:${query}`, fast: true }, DUPE_SEARCH_TIMEOUT_MS);
      (result.items || []).slice(0, DUPE_CANDIDATE_DETAIL_LIMIT).forEach((item) => {
        const internalId = String(item.internalId || "");
        if (internalId && internalId !== String(source.internalId || "") && dupePreviewLooksPromising(source, item, kind, query)) {
          const order = candidateOrder;
          candidateOrder += 1;
          const score = dupePreviewCandidateScore(source, item, kind, query, order);
          const current = candidateMap.get(internalId);
          if (!current || score > current.score) {
            candidateMap.set(internalId, { internalId, score, order });
          }
        }
      });
    } catch (error) {
      if (isWorkerSessionInvalidError(error)) throw error;
      // Keep processing the source record even if one duplicate search fails.
    }
  }

  const candidates = [];
  const candidateIds = [...candidateMap.values()]
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, DUPE_CANDIDATE_DETAIL_LIMIT);
  for (const { internalId } of candidateIds) {
    try {
      const detail = await postDupeJsonWithTimeout("/api/dupe-record", { internalId }, DUPE_RECORD_TIMEOUT_MS);
      const record = detail.record || { internalId };
      const reasons = dupeCandidateMatches(source, record);
      if (reasons.length) {
        candidates.push({ record, reasons, review: false });
        if (dupeIsCustomerWon(record)) break;
      } else {
        const reviewReasons = dupeCandidateReviewReasons(source, record);
        if (reviewReasons.length) {
          candidates.push({ record, reasons: reviewReasons, review: true });
        }
      }
    } catch (error) {
      if (isWorkerSessionInvalidError(error)) throw error;
      // Skip slow or unparseable candidates so one bad match does not block the app.
    }
  }

  return dupeCompressCandidates(candidates);
}

function domainCandidateSummary(record) {
  return `${displayValue(record?.status)} | ${displayValue(record?.salesRep)}`;
}

function domainCandidateReasons(domain, record) {
  if (!record || dupeIsDemoRecord(record)) return [];
  return [domainCandidateSummary(record)];
}

function domainMasterFromRecords(records) {
  const list = (Array.isArray(records) ? records : []).filter(Boolean);
  if (!list.length) return { master: null, reason: "No records found" };

  const customerWon = list.find((record) => dupeIsCustomerWon(record));
  if (customerWon) return { master: customerWon, reason: "Customer-Won record selected" };

  const master = list
    .map((record, index) => ({ record, index }))
    .sort((a, b) => dupeStatusRank(b.record) - dupeStatusRank(a.record) || a.index - b.index)[0]?.record || null;
  return { master, reason: master ? "Highest status selected" : "No records found" };
}

function domainMasterResultForCandidates(candidates) {
  const candidateItems = Array.isArray(candidates) ? candidates : [];
  const validRecords = candidateItems
    .filter((item) => item?.record && !item.review)
    .map((item) => item.record);
  if (validRecords.length) return domainMasterFromRecords(validRecords);

  const reviewRecords = candidateItems
    .filter((item) => item?.record && item.review)
    .map((item) => item.record);
  if (reviewRecords.length) {
    const { master } = domainMasterFromRecords(reviewRecords);
    return { master, reason: "Review candidate found; needs manual review", review: true };
  }

  return { master: null, reason: "No records found" };
}

function fallbackDomainRecordFromItem(item) {
  return {
    internalId: item?.internalId || "",
    entityId: item?.title || item?.internalId || "",
    companyName: item?.title || "",
    status: item?.kind || item?.type || "",
    salesRep: item?.salesRep || "",
    email: item?.email || "",
    webAddress: item?.webAddress || "",
  };
}

async function domainRecordFromSearchItem(item) {
  if (!item?.internalId) return fallbackDomainRecordFromItem(item);
  const detail = await postDomainJsonWithTimeout("/api/domain-record", { internalId: item.internalId }, DUPE_RECORD_TIMEOUT_MS);
  return hasUsableRecord(detail.record) ? detail.record : { ...fallbackDomainRecordFromItem(item), ...(detail.record || {}) };
}

async function domainCandidatesFromSearchItems(domain, items) {
  const seen = new Set();
  const candidates = [];
  const searchableItems = (Array.isArray(items) ? items : [])
    .filter((item) => item?.internalId && !seen.has(String(item.internalId)) && seen.add(String(item.internalId)))
    .slice(0, DUPE_CANDIDATE_DETAIL_LIMIT);

  for (const item of searchableItems) {
    try {
      const record = await domainRecordFromSearchItem(item);
      const reasons = domainCandidateReasons(domain, record);
      if (reasons.length) {
        candidates.push({ record, reasons, review: false });
      }
    } catch (error) {
      if (isWorkerSessionInvalidError(error)) throw error;
      const record = fallbackDomainRecordFromItem(item);
      candidates.push({
        record,
        reasons: [error.message || "Review: record details could not be loaded"],
        review: true,
      });
    }
  }

  return dupeCompressCandidates(candidates);
}

function cleanRecordId(record) {
  const rawId = String(record?.entityId || "").trim();
  const companyName = String(record?.companyName || "").trim();
  if (!rawId || !companyName) return rawId;
  if (!rawId.toLowerCase().endsWith(companyName.toLowerCase())) return rawId;
  return rawId.slice(0, rawId.length - companyName.length).replace(/[-:|,\s]+$/g, "").trim();
}

function zoomInfoProfileUrl(companyId) {
  const id = String(companyId || "").trim();
  if (!id) return "";
  return `https://app.zoominfo.com/#/apps/profile/company/${encodeURIComponent(id)}/overview`;
}

function recordSummaryItem(record, key, label, options = {}) {
  const value = displayValue(record?.[key]);
  const zoomInfoUrl = options.zoomInfo ? zoomInfoProfileUrl(record?.zoomInfoCompanyId) : "";
  const valueHtml = linkedDisplayValue(record?.[key], options);
  const labelBadges = `${options.inactiveBadge ? recordInactiveBadge(record) : ""}${options.regionBadge ? recordRegionBadge(record) : ""}`;
  const labelClasses = [
    labelBadges ? "summary-label" : "",
    options.regionBadge ? "summary-label-spread" : "",
  ].filter(Boolean).join(" ");
  const labelHtml = `<span class="${labelClasses}">${escapeHtml(label)}${labelBadges}</span>`;
  const action = zoomInfoUrl
    ? `<a class="inline-action-button" href="${escapeHtml(zoomInfoUrl)}" target="_blank" rel="noopener noreferrer">View in ZoomInfo</a>`
    : "";
  return `
    <div class="summary-item" data-summary-key="${escapeHtml(key)}">
      ${labelHtml}
      <div class="summary-value-line">
        <strong>${valueHtml}</strong>
        ${action}
      </div>
    </div>
  `;
}

function recordSummaryRow(record, items) {
  const rowClass = items.length === 1 ? "record-row single" : "record-row";
  return `
    <div class="${rowClass}">
      ${items.map((item) => recordSummaryItem(record, item.key, item.label, item)).join("")}
    </div>
  `;
}

function recordSummarySection(title, record, rows) {
  return `
    <section class="record-section">
      <div class="record-section-title">${escapeHtml(title)}</div>
      <div class="record-detail-grid">
        ${rows.map((row) => recordSummaryRow(record, row)).join("")}
      </div>
    </section>
  `;
}

function salesRepSummarySection(title, contentHtml) {
  return `
    <section class="record-section sales-rep-detail-section">
      <div class="record-section-title">${escapeHtml(title)}</div>
      <div class="summary-grid sales-rep-summary">
        ${contentHtml}
      </div>
    </section>
  `;
}

function relatedGroupRows(record, key) {
  const group = record?.related?.[key];
  if (!group?.ok) return [];
  return Array.isArray(group.rows) ? group.rows : [];
}

function relatedTabButton(label, panel, count, active = false) {
  const disabled = count < 1;
  return `
    <button
      type="button"
      class="record-tab-button ${active ? "active" : ""}"
      data-record-tab="${escapeHtml(panel)}"
      ${disabled ? "disabled aria-disabled=\"true\"" : ""}
      aria-selected="${active ? "true" : "false"}"
    >
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(count)}</strong>
    </button>
  `;
}

function relatedSortArrow(direction) {
  if (direction === "asc") return "↑";
  if (direction === "desc") return "↓";
  return "";
}

function relatedAriaSort(direction) {
  if (direction === "asc") return "ascending";
  if (direction === "desc") return "descending";
  return "none";
}

function relatedColumnHeader(column, activeDirection = "") {
  const columnAttr = escapeHtml(column.key);
  if (!column.sortable) return `<th data-related-column="${columnAttr}">${escapeHtml(column.label)}</th>`;
  return `
    <th aria-sort="${relatedAriaSort(activeDirection)}" data-related-column="${columnAttr}">
      <button
        type="button"
        class="related-sort-button"
        data-related-sort="${escapeHtml(column.key)}"
        data-sort-type="${escapeHtml(column.sortType || "text")}"
        ${activeDirection ? `data-sort-direction="${escapeHtml(activeDirection)}"` : ""}
      >
        <span>${escapeHtml(column.label)}</span>
        <span class="related-sort-arrow" aria-hidden="true">${relatedSortArrow(activeDirection)}</span>
      </button>
    </th>
  `;
}

function relatedRecordsTable(rows, columns, emptyText, options = {}) {
  if (!rows.length) {
    return `<div class="related-empty">${escapeHtml(emptyText)}</div>`;
  }
  const defaultSortDirection = options.defaultSortDirection || "desc";
  const sortedRows = sortedRelatedRows(rows, columns, options.defaultSortKey, defaultSortDirection);
  const actionLinks = options.actionLinks || [
    { label: "Edit", urlKey: "editUrl", secondary: false },
    { label: "Open", urlKey: "url", secondary: true },
  ];

  return `
    <div class="related-table-wrap">
      <table class="related-table">
        <thead>
          <tr>
            ${columns.map((column) => relatedColumnHeader(
              column,
              column.key === options.defaultSortKey ? defaultSortDirection : "",
            )).join("")}
            <th class="related-open-column" aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          ${sortedRows.map((row) => `
            <tr>
              ${columns.map((column) => `<td data-related-column="${escapeHtml(column.key)}">${escapeHtml(displayValue(row[column.key]))}</td>`).join("")}
              <td class="related-open-column">
                ${actionLinks.map((action) => {
                  const href = row[action.urlKey];
                  const actionClass = action.secondary === false ? "" : "secondary";
                  return href ? `<a class="small-button ${actionClass} related-open-link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(action.label)}</a>` : "";
                }).join("")}
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function relatedSortValue(text, type) {
  const value = String(text || "").trim();
  if (!value || value === "---") return { blank: true, value: "" };
  if (type === "date") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed)
      ? { blank: false, value: value.toLowerCase() }
      : { blank: false, value: parsed };
  }
  return { blank: false, value: value.toLowerCase() };
}

function compareRelatedValues(left, right, direction) {
  if (left.blank && right.blank) return 0;
  if (left.blank) return 1;
  if (right.blank) return -1;
  if (left.value === right.value) return 0;
  const result = left.value > right.value ? 1 : -1;
  return direction === "desc" ? -result : result;
}

function sortedRelatedRows(rows, columns, sortKey, direction = "desc") {
  const column = columns.find((item) => item.key === sortKey);
  if (!column) return rows.slice();
  return rows.slice().sort((rowA, rowB) => {
    const left = relatedSortValue(rowA[column.key], column.sortType || "text");
    const right = relatedSortValue(rowB[column.key], column.sortType || "text");
    return compareRelatedValues(left, right, direction);
  });
}

function updateRelatedSortIndicators(headerRow, activeButton, direction) {
  headerRow.querySelectorAll("[data-related-sort]").forEach((button) => {
    const active = button === activeButton;
    button.toggleAttribute("data-sort-direction", active);
    if (active) {
      button.setAttribute("data-sort-direction", direction);
    }
    const arrow = button.querySelector(".related-sort-arrow");
    if (arrow) arrow.textContent = active ? relatedSortArrow(direction) : "";
    const sortHeader = button.closest("th");
    if (sortHeader) sortHeader.setAttribute("aria-sort", active ? relatedAriaSort(direction) : "none");
  });
}

function sortRelatedTable(sortButton) {
  const table = sortButton.closest("table");
  const header = sortButton.closest("th");
  const headerRow = header?.parentElement;
  const body = table?.tBodies?.[0];
  if (!table || !header || !headerRow || !body) return;

  const columnIndex = Array.from(headerRow.children).indexOf(header);
  if (columnIndex < 0) return;

  const currentDirection = sortButton.getAttribute("data-sort-direction");
  const nextDirection = currentDirection === "asc" ? "desc" : "asc";
  const sortType = sortButton.getAttribute("data-sort-type") || "text";
  const rows = Array.from(body.rows);

  rows.sort((rowA, rowB) => {
    const left = relatedSortValue(rowA.cells[columnIndex]?.textContent, sortType);
    const right = relatedSortValue(rowB.cells[columnIndex]?.textContent, sortType);
    return compareRelatedValues(left, right, nextDirection);
  });

  rows.forEach((row) => body.appendChild(row));
  updateRelatedSortIndicators(headerRow, sortButton, nextDirection);
}

function recordRelatedTabs(record, detailsHtml) {
  const opportunities = relatedGroupRows(record, "opportunities");
  const tasks = relatedGroupRows(record, "tasks");
  const contacts = relatedGroupRows(record, "contacts");
  const opportunityColumns = [
    { key: "date", label: "Date", sortable: true, sortType: "date" },
    { key: "title", label: "Title", sortable: true },
    { key: "salesRep", label: "Sales Rep", sortable: true },
    { key: "expectedCloseDate", label: "Expected Close" },
    { key: "status", label: "Opportunity Status" },
  ];
  const taskColumns = [
    { key: "title", label: "Task", sortable: true },
    { key: "assigned", label: "Assigned", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "dueDate", label: "Due Date", sortable: true, sortType: "date" },
  ];
  const contactColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "inactive", label: "Inactive", sortable: true },
    { key: "company", label: "Company", sortable: true },
    { key: "subsidiary", label: "Subsidiary", sortable: true },
  ];

  return `
    <div class="record-detail-tabs" data-record-detail-tabs>
      <div class="record-tab-list" role="tablist" aria-label="Selected record details">
        <button type="button" class="record-tab-button active" data-record-tab="details" aria-selected="true">
          <span>Details</span>
        </button>
        ${relatedTabButton("Opportunities", "opportunities", opportunities.length)}
        ${relatedTabButton("Tasks", "tasks", tasks.length)}
        ${relatedTabButton("Contacts", "contacts", contacts.length)}
      </div>
      <section class="record-tab-panel active" data-record-panel="details">
        ${detailsHtml}
      </section>
      <section class="record-tab-panel" data-record-panel="opportunities">
        ${relatedRecordsTable(opportunities, opportunityColumns, "No opportunities associated with this record.", {
          defaultSortKey: "date",
          defaultSortDirection: "desc",
        })}
      </section>
      <section class="record-tab-panel" data-record-panel="tasks">
        ${relatedRecordsTable(tasks, taskColumns, "No tasks associated with this record.", {
          defaultSortKey: "dueDate",
          defaultSortDirection: "desc",
        })}
      </section>
      <section class="record-tab-panel" data-record-panel="contacts">
        ${relatedRecordsTable(contacts, contactColumns, "No contacts associated with this record.", {
          defaultSortKey: "name",
          defaultSortDirection: "asc",
          actionLinks: [
            { label: "Edit", urlKey: "editUrl", secondary: false },
            { label: "Open", urlKey: "url", secondary: true },
          ],
        })}
      </section>
    </div>
  `;
}

function recordDetailState(record) {
  const displayRecord = {
    ...record,
    entityId: cleanRecordId(record),
    targetRecordDate: isNoValue(record?.targetRecord) ? "---" : record?.targetRecordDate,
  };

  const companyRows = [
    [{ key: "companyName", label: "Company Name", inactiveBadge: true }],
    [{ key: "entityId", label: "ID" }, { key: "internalId", label: "Internal ID" }],
    [{ key: "status", label: "Status" }, { key: "category", label: "Category" }],
    [{ key: "address", label: "Address", regionBadge: true }, { key: "webAddress", label: "Web Address", webLink: true }],
    [{ key: "subsidiary", label: "Subsidiary" }, { key: "zoomInfoCompanyId", label: "ZoomInfo Company ID", zoomInfo: true }],
    [{ key: "zoomInfoIndustry", label: "ZoomInfo Industry" }, { key: "zoomInfoSubIndustry", label: "ZoomInfo SubIndustry" }],
    [{ key: "industry", label: "Industry" }, { key: "annualRevenue", label: "Annual Revenue" }],
  ];
  const salesRows = [
    [{ key: "salesRep", label: "Sales Rep" }, { key: "lsadDate", label: "LSAD Date" }],
    [{ key: "targetRecord", label: "Target Record" }, { key: "targetRecordDate", label: "Target Record Date" }],
    [{ key: "outOfAlignment", label: "Out of Alignment" }, { key: "partner", label: "Partner" }],
  ];

  return {
    detailTitle: "Selected Record",
    selectedRecordHint: displayRecord?.entityId || displayRecord?.companyName
      ? `${displayRecord.entityId || ""} ${displayRecord.companyName || ""}`.trim()
      : "Selected record details",
    summaryHtml: recordRelatedTabs(displayRecord, [
      recordSummarySection("Company Details", displayRecord, companyRows),
      recordSummarySection("Sales Details", displayRecord, salesRows),
    ].join("")),
    summaryClassName: "summary-grid record-detail-stack",
    territorySectionClassName: "territory-section hidden",
    territoryCountText: "",
    territoryListHtml: "",
    extractButtonClassName: "small-button hidden",
    extractButtonText: "Extract",
    extractButtonDisabled: false,
    openExtractFolderButtonClassName: "small-button secondary hidden",
    openExtractFolderButtonDisabled: false,
    selectedSalesRep: null,
    detailMode: "records",
  };
}

function applyDetailState(detailState) {
  elements.detailTitle.textContent = detailState.detailTitle;
  elements.selectedRecordHint.textContent = detailState.selectedRecordHint;
  elements.summary.innerHTML = detailState.summaryHtml || "";
  elements.summary.className = detailState.summaryClassName || "summary-grid";
  elements.territorySection.className = detailState.territorySectionClassName || "territory-section hidden";
  elements.territoryCount.textContent = detailState.territoryCountText || "";
  elements.territoryList.innerHTML = detailState.territoryListHtml || "";
  elements.extractSalesRepButton.className = detailState.extractButtonClassName || "small-button hidden";
  elements.extractSalesRepButton.textContent = detailState.extractButtonText || "Extract";
  elements.extractSalesRepButton.disabled = Boolean(detailState.extractButtonDisabled);
  elements.openExtractFolderButton.className = detailState.openExtractFolderButtonClassName || "small-button secondary hidden";
  elements.openExtractFolderButton.disabled = Boolean(detailState.openExtractFolderButtonDisabled);
  selectedSalesRep = detailState.selectedSalesRep || null;
  activeDetailMode = detailState.detailMode || null;
  setDetailCollapsed(Boolean(detailState.detailCollapsed));
  updateEligibilityControls();
}

function updateModeDetail(mode, detailState) {
  const nextState = {
    ...detailState,
    detailCollapsed: mode === activeMode ? isDetailCollapsed() : Boolean(modeState[mode]?.detailCollapsed),
  };
  if (mode === activeMode) {
    applyDetailState(nextState);
    return;
  }
  if (!modeState[mode]) return;
  modeState[mode] = {
    ...modeState[mode],
    ...nextState,
  };
}

function renderSummary(record, mode = "records") {
  updateModeDetail(mode, recordDetailState(record));
}

function salesRepDetailState(rep, mode = "salesReps") {
  const labels = {
    email: "Email Address",
    internalId: "Internal ID",
    vertical: "Vertical",
    salesTeam: "Sales Team",
    salesRegion: "Sales Region",
    salesSubRegion: "Sales Sub Region",
    tier: "Tier",
    salesRole: "Sales Role",
    leadHoldoverCount: "Total Leads / Holdover Count",
    salesRepSupervisor: "Sales Rep Supervisor",
  };
  const salesRepRows = [
    ["email", "internalId"],
    ["vertical", "salesTeam"],
    ["salesRegion", "salesSubRegion"],
    ["salesRole", "tier"],
    ["leadHoldoverCount", "salesRepSupervisor"],
  ];
  const salesRepDisplayValue = (key) => {
    if (key === "leadHoldoverCount") {
      return `${displayValue(rep?.totalRecords)} / ${displayValue(rep?.holdoverCount)}`;
    }
    return displayValue(rep?.[key]);
  };

  const nameLabelHtml = `<span class="summary-label">Name${salesRepStatusBadge(rep?.rosterStatus)}${hybridBadge(rep)}</span>`;
  const hybridToggleHtml = `
    <label class="hybrid-toggle name-hybrid-toggle">
      <input type="checkbox" data-hybrid-toggle ${isHybridSalesRep(rep) ? "checked" : ""} ${rep?.internalId ? "" : "disabled"}>
      <span>
        <strong>Hybrid Rep</strong>
        <em>Local tag only</em>
      </span>
    </label>
  `;
  const salesRepItems = [
    `<div class="summary-item sales-rep-name-item" data-summary-key="name"><div class="sales-rep-name-main">${nameLabelHtml}<strong>${escapeHtml(displayValue(rep?.name))}</strong></div>${hybridToggleHtml}</div>`,
  ];
  salesRepItems.push(...salesRepRows
    .flatMap((row) => row.map((key) => {
      const label = labels[key];
      const labelHtml = `<span>${label}</span>`;
      return `<div class="summary-item" data-summary-key="${escapeHtml(key)}">${labelHtml}<strong>${escapeHtml(salesRepDisplayValue(key))}</strong></div>`;
    })));
  return {
    detailTitle: mode === "eligibility" ? "Target Sales Rep" : activeSalesRepWorkspaceTab === "hybrids" ? "Selected Hybrid Rep" : "Selected Sales Rep",
    selectedRecordHint: rep?.name || "Selected sales rep details",
    summaryHtml: salesRepSummarySection("Sales Rep Details", salesRepItems.join("")),
    summaryClassName: "summary-grid record-detail-stack sales-rep-detail-stack",
    ...territoryDetailState(rep),
    extractButtonClassName: mode === "eligibility" || !rep?.internalId ? "small-button hidden" : "small-button",
    extractButtonText: "Extract",
    extractButtonDisabled: false,
    openExtractFolderButtonClassName: "small-button secondary hidden",
    openExtractFolderButtonDisabled: false,
    selectedSalesRep: rep || null,
    detailMode: mode,
  };
}

function renderSalesRepSummary(rep, mode = activeMode) {
  updateModeDetail(mode, salesRepDetailState(rep, mode));
}

function setRecordWorkspaceTab(tab) {
  const nextTab = tab === "merge" || tab === "staticGroup" ? tab : "search";
  activeRecordWorkspaceTab = nextTab;
  const searchActive = nextTab === "search";
  const mergeActive = nextTab === "merge";
  const staticGroupActive = nextTab === "staticGroup";
  elements.recordSearchTab?.classList.toggle("active", searchActive);
  elements.recordMergeTab?.classList.toggle("active", mergeActive);
  elements.recordStaticGroupTab?.classList.toggle("active", staticGroupActive);
  elements.recordSearchTab?.setAttribute("aria-selected", String(searchActive));
  elements.recordMergeTab?.setAttribute("aria-selected", String(mergeActive));
  elements.recordStaticGroupTab?.setAttribute("aria-selected", String(staticGroupActive));
  const usesSearchWorkspace = ["records", "salesReps", "hybrids", "eligibility"].includes(activeMode);
  const searchWorkspaceVisible = usesSearchWorkspace && (activeMode === "records" ? searchActive : true);
  elements.recordSearchWorkspace?.classList.toggle("hidden", !searchWorkspaceVisible);
  elements.mergeWorkspace?.classList.toggle("hidden", !(activeMode === "records" && mergeActive));
  elements.staticGroupWorkspace?.classList.toggle("hidden", !(activeMode === "records" && staticGroupActive));
  updateWorkspaceTitle();
  acknowledgeVisibleActivity();
  if (activeMode === "records" && staticGroupActive) {
    loadStaticGroupHistory().catch((error) => setStatus(elements.staticGroupStatus, error.message, "error"));
  }
}

function setSalesRepWorkspaceTab(tab) {
  const nextTab = tab === "hybrids" ? "hybrids" : "search";
  activeSalesRepWorkspaceTab = nextTab;
  const searchActive = nextTab === "search";
  const hybridsActive = nextTab === "hybrids";
  elements.salesRepSearchTab?.classList.toggle("active", searchActive);
  elements.salesRepHybridTab?.classList.toggle("active", hybridsActive);
  elements.salesRepSearchTab?.setAttribute("aria-selected", String(searchActive));
  elements.salesRepHybridTab?.setAttribute("aria-selected", String(hybridsActive));
  updateWorkspaceTitle();
  acknowledgeVisibleActivity();
}

function setSuiteWorldWorkspaceTab(tab) {
  const nextTab = tab === "domain" ? "domain" : "dupes";
  activeSuiteWorldTab = nextTab;
  const suiteWorldActive = activeMode === "suiteWorld";
  const dupeActive = suiteWorldActive && nextTab === "dupes";
  const domainActive = suiteWorldActive && nextTab === "domain";
  elements.suiteWorldDupeTab?.classList.toggle("active", nextTab === "dupes");
  elements.suiteWorldDomainTab?.classList.toggle("active", nextTab === "domain");
  elements.suiteWorldDupeTab?.setAttribute("aria-selected", String(nextTab === "dupes"));
  elements.suiteWorldDomainTab?.setAttribute("aria-selected", String(nextTab === "domain"));
  elements.dupeWorkspace?.classList.toggle("hidden", !dupeActive);
  elements.domainWorkspace?.classList.toggle("hidden", !domainActive);
  updateWorkspaceTitle();
  acknowledgeVisibleActivity();
}

function setSidebarSubtabsExpanded(element, expanded) {
  if (!element) return;
  element.classList.remove("hidden");
  element.classList.toggle("sidebar-subtabs-open", expanded);
  element.classList.toggle("sidebar-subtabs-collapsed", !expanded);
  element.style.display = "grid";
  element.style.maxHeight = expanded ? "180px" : "0px";
  element.style.margin = expanded ? "5px 0 4px" : "0";
  element.style.padding = expanded ? "3px 0 2px 18px" : "0 0 0 18px";
  element.style.borderLeftColor = expanded ? "rgba(134, 241, 231, 0.28)" : "transparent";
  element.style.opacity = expanded ? "1" : "0";
  element.style.pointerEvents = expanded ? "auto" : "none";
  element.style.transform = expanded ? "translateY(0)" : "translateY(-4px)";
  element.style.visibility = expanded ? "visible" : "hidden";
  element.setAttribute("aria-hidden", String(!expanded));
  element.querySelectorAll("button").forEach((button) => {
    button.tabIndex = expanded ? 0 : -1;
  });
}

function syncSidebarSubtabsForMode(mode = activeMode) {
  const isRecords = mode === "records";
  const isSalesRepArea = mode === "salesReps" || mode === "hybrids";
  const isSuiteWorld = mode === "suiteWorld";
  setSidebarSubtabsExpanded(elements.recordWorkspaceTabs, isRecords);
  setSidebarSubtabsExpanded(elements.salesRepWorkspaceTabs, isSalesRepArea);
  setSidebarSubtabsExpanded(elements.suiteWorldWorkspaceTabs, isSuiteWorld);
}

function setMode(mode) {
  if (mode === activeMode) {
    syncSidebarSubtabsForMode(mode);
    return;
  }
  hideAllSearchHistories();
  if (mode !== activeMode) saveModeState(activeMode);
  activeMode = mode;
  const isHome = mode === "home";
  const isRecords = mode === "records";
  const isSalesReps = mode === "salesReps";
  const isHybrids = mode === "hybrids";
  const isSalesRepArea = isSalesReps || isHybrids;
  const isTerritories = mode === "territories";
  const isEligibility = mode === "eligibility";
  const isSuiteWorld = mode === "suiteWorld";
  const isPitchbook = mode === "pitchbook";
  elements.homeTab?.classList.toggle("active", isHome);
  elements.recordsTab.classList.toggle("active", isRecords);
  elements.salesRepsTab.classList.toggle("active", isSalesRepArea);
  elements.territoriesTab?.classList.toggle("active", isTerritories);
  elements.eligibilityTab.classList.toggle("active", isEligibility);
  elements.suiteWorldTab?.classList.toggle("active", isSuiteWorld);
  elements.pitchbookTab?.classList.toggle("active", isPitchbook);
  elements.homeTab?.setAttribute("aria-selected", String(isHome));
  elements.recordsTab.setAttribute("aria-selected", String(isRecords));
  elements.salesRepsTab.setAttribute("aria-selected", String(isSalesRepArea));
  elements.territoriesTab?.setAttribute("aria-selected", String(isTerritories));
  elements.eligibilityTab.setAttribute("aria-selected", String(isEligibility));
  elements.suiteWorldTab?.setAttribute("aria-selected", String(isSuiteWorld));
  elements.pitchbookTab?.setAttribute("aria-selected", String(isPitchbook));
  elements.searchForm.classList.toggle("list-mode", isHybrids);
  elements.searchText.disabled = isHybrids;
  elements.searchLabel.textContent = isRecords ? "Records Search" : isHybrids ? "Hybrid Reps" : isEligibility ? "Target Sales Rep" : "Sales Rep Search";
  elements.searchText.placeholder = isRecords ? "Type any number, text, URL, or zi:<ZoomInfo ID>" : isHybrids ? "" : isEligibility ? "Type a sales rep name" : "Type a sales rep name";
  elements.searchHelp?.classList.toggle("hidden", !isRecords);
  elements.searchButton.classList.toggle("hidden", isHybrids);
  elements.searchButton.textContent = isEligibility ? "Find Rep" : "Search";
  elements.homeWorkspace?.classList.toggle("hidden", !isHome);
  elements.eligibilitySection.classList.toggle("hidden", !isEligibility);
  elements.territoryWorkspace?.classList.toggle("hidden", !isTerritories);
  syncSidebarSubtabsForMode(mode);
  elements.pitchbookWorkspace?.classList.toggle("hidden", !isPitchbook);
  if (isHome) {
    elements.recordSearchWorkspace?.classList.add("hidden");
    elements.mergeWorkspace?.classList.add("hidden");
    elements.staticGroupWorkspace?.classList.add("hidden");
    elements.eligibilitySection?.classList.add("hidden");
    elements.territoryWorkspace?.classList.add("hidden");
    elements.dupeWorkspace?.classList.add("hidden");
    elements.domainWorkspace?.classList.add("hidden");
    elements.pitchbookWorkspace?.classList.add("hidden");
  } else if (isRecords) {
    elements.pitchbookWorkspace?.classList.add("hidden");
    setRecordWorkspaceTab(activeRecordWorkspaceTab);
    setSalesRepWorkspaceTab(activeSalesRepWorkspaceTab);
    setSuiteWorldWorkspaceTab(activeSuiteWorldTab);
  } else if (isSuiteWorld) {
    elements.recordSearchWorkspace?.classList.add("hidden");
    elements.mergeWorkspace?.classList.add("hidden");
    elements.staticGroupWorkspace?.classList.add("hidden");
    elements.territoryWorkspace?.classList.add("hidden");
    elements.pitchbookWorkspace?.classList.add("hidden");
    setSalesRepWorkspaceTab(activeSalesRepWorkspaceTab);
    setSuiteWorldWorkspaceTab(activeSuiteWorldTab);
  } else if (isTerritories) {
    elements.recordSearchWorkspace?.classList.add("hidden");
    elements.mergeWorkspace?.classList.add("hidden");
    elements.staticGroupWorkspace?.classList.add("hidden");
    elements.dupeWorkspace?.classList.add("hidden");
    elements.domainWorkspace?.classList.add("hidden");
    elements.pitchbookWorkspace?.classList.add("hidden");
    setSalesRepWorkspaceTab(activeSalesRepWorkspaceTab);
    setSuiteWorldWorkspaceTab(activeSuiteWorldTab);
  } else if (isPitchbook) {
    elements.recordSearchWorkspace?.classList.add("hidden");
    elements.mergeWorkspace?.classList.add("hidden");
    elements.staticGroupWorkspace?.classList.add("hidden");
    elements.eligibilitySection?.classList.add("hidden");
    elements.territoryWorkspace?.classList.add("hidden");
    elements.dupeWorkspace?.classList.add("hidden");
    elements.domainWorkspace?.classList.add("hidden");
  } else {
    setRecordWorkspaceTab("search");
    setSalesRepWorkspaceTab(isHybrids ? "hybrids" : "search");
    setSuiteWorldWorkspaceTab(activeSuiteWorldTab);
    elements.pitchbookWorkspace?.classList.add("hidden");
  }
  updateWorkspaceTitle();
  if (!isHome && !isSuiteWorld && !isTerritories) restoreModeState(mode);
  updateEligibilityControls();
  acknowledgeVisibleActivity();
  if (isHome) {
    loadRecentRecords().catch(() => {});
  }
  if (isHybrids) {
    loadHybridReps().catch((error) => setScopedLookupStatus("hybrids", error.message, "error"));
  }
  if (isTerritories) {
    renderTerritoryUpdatePanel();
    ensureTerritoriesLoaded().catch((error) => setStatus(elements.territoryBrowserStatus, error.message, "error"));
  }
}

elements.browserSelect?.addEventListener("change", async () => {
  const requestedBrowser = normalizeBrowser(elements.browserSelect.value);
  const previousBrowser = selectedBrowser;
  elements.browserSelect.disabled = true;
  setStatus(elements.connectStatus, `Switching Companion to ${selectedBrowserLabel(requestedBrowser)}...`);
  try {
    const result = await postJson("/api/browser/select", { browser: requestedBrowser });
    applyBrowserUi(result.browser || requestedBrowser);
    saveBrowserChoice(selectedBrowser);
    renderSessionHealth({ connected: false, browser: selectedBrowser });
    setStatus(elements.connectStatus, `${selectedBrowserLabel()} selected. Launch it, sign in to NSCORP, then click Connect.`, "ok");
  } catch (error) {
    applyBrowserUi(previousBrowser);
    setStatus(elements.connectStatus, error.message, "error");
  } finally {
    elements.browserSelect.disabled = false;
  }
});

elements.launchButton.addEventListener("click", async () => {
  const label = selectedBrowserLabel();
  setBadge("neutral", "Launching");
  setStatus(elements.connectStatus, `Launching dedicated NSCORP ${label}...`);
  try {
    const result = await postJson("/api/browser/launch", { browser: selectedBrowser });
    setStatus(elements.connectStatus, result.warning || `${label} launched. Log in to NSCORP if prompted, then click Connect.`, "ok");
    addAppActivity("session", `Launched NSCORP ${label}`, result.warning || result.message || `Dedicated ${label} session opened`);
    await checkBrowser();
  } catch (error) {
    setBadge("error", "Launch failed");
    setStatus(elements.connectStatus, error.message, "error");
    renderSessionHealth({ connected: false, error: error.message });
    addAppActivity("warning", `${label} launch failed`, error.message);
  }
});

elements.connectButton.addEventListener("click", async () => {
  const label = selectedBrowserLabel();
  setStatus(elements.connectStatus, `Checking ${label} session...`);
  try {
    const connected = await checkBrowser();
    addAppActivity("session", `${label} session checked`, connected ? `Connected to NSCORP ${label}` : `${label} found, but NSCORP needs attention`);
  } catch (error) {
    setBadge("error", "Not connected");
    setStatus(elements.connectStatus, error.message, "error");
    renderSessionHealth({ connected: false, error: error.message });
    addAppActivity("warning", `${label} session check failed`, error.message);
  }
});

elements.sessionHealthToggle?.addEventListener("click", async (event) => {
  event.stopPropagation();
  const opening = elements.sessionHealthCard?.classList.contains("hidden");
  setSessionHealthPopoverOpen(Boolean(opening));
  if (opening) {
    try {
      await refreshSessionHealth();
    } catch (error) {
      renderSessionHealth({ connected: false, error: error.message });
    }
  }
});

elements.sessionHealthReconnectButton?.addEventListener("click", async () => {
  const originalText = elements.sessionHealthReconnectButton.textContent;
  elements.sessionHealthReconnectButton.disabled = true;
  elements.sessionHealthReconnectButton.textContent = "Checking...";
  try {
    await checkBrowser();
    addAppActivity("session", "Session Health refreshed", elements.sessionHealthSummary?.textContent || "Checked");
  } catch (error) {
    renderSessionHealth({ connected: false, error: error.message });
    addAppActivity("warning", "Session Health refresh failed", error.message);
  } finally {
    elements.sessionHealthReconnectButton.disabled = false;
    elements.sessionHealthReconnectButton.textContent = originalText;
  }
});

document.addEventListener("click", (event) => {
  if (elements.sessionHealthCard?.classList.contains("hidden")) return;
  if (event.target.closest(".session-health-wrap")) return;
  setSessionHealthPopoverOpen(false);
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".merge-address-popover") || event.target.closest("[data-merge-address]")) return;
  closeMergeAddressPopover();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  setSessionHealthPopoverOpen(false);
  closeMergeAddressPopover();
});

elements.checkUpdateButton.addEventListener("click", () => {
  checkForUpdates();
});

elements.installUpdateButton.addEventListener("click", () => {
  if (!latestUpdate?.updateAvailable && !window.confirm("No newer version was detected. Install anyway?")) return;
  installUpdate();
});

elements.openClipboardLinkButton.addEventListener("click", async () => {
  const originalText = elements.openClipboardLinkButton.textContent;
  elements.openClipboardLinkButton.disabled = true;
  elements.openClipboardLinkButton.textContent = "Opening...";
  setStatus(elements.openLinkStatus, "Reading clipboard...");
  try {
    if (!navigator.clipboard?.readText) {
      throw new Error("Clipboard access is not available. Copy a valid link, then try again.");
    }
    const url = await navigator.clipboard.readText();
    const result = await openDebugChromeLink(url, elements.openLinkStatus);
    addAppActivity("open", "Opened clipboard link", result.targetUrl || url);
  } catch (error) {
    setStatus(elements.openLinkStatus, error.message, "error");
  } finally {
    elements.openClipboardLinkButton.disabled = false;
    elements.openClipboardLinkButton.textContent = originalText;
  }
});

elements.homeTab?.addEventListener("click", () => setMode("home"));
elements.recordsTab.addEventListener("click", () => setMode("records"));
elements.salesRepsTab.addEventListener("click", () => setMode(activeSalesRepWorkspaceTab === "hybrids" ? "hybrids" : "salesReps"));
elements.territoriesTab?.addEventListener("click", () => setMode("territories"));
elements.eligibilityTab.addEventListener("click", () => setMode("eligibility"));
elements.suiteWorldTab?.addEventListener("click", () => setMode("suiteWorld"));
elements.pitchbookTab?.addEventListener("click", () => setMode("pitchbook"));
elements.recordSearchTab?.addEventListener("click", () => setRecordWorkspaceTab("search"));
elements.recordMergeTab?.addEventListener("click", () => setRecordWorkspaceTab("merge"));
elements.recordStaticGroupTab?.addEventListener("click", () => setRecordWorkspaceTab("staticGroup"));
elements.salesRepSearchTab?.addEventListener("click", () => setMode("salesReps"));
elements.salesRepHybridTab?.addEventListener("click", () => setMode("hybrids"));
elements.suiteWorldDupeTab?.addEventListener("click", () => setSuiteWorldWorkspaceTab("dupes"));
elements.suiteWorldDomainTab?.addEventListener("click", () => setSuiteWorldWorkspaceTab("domain"));
elements.homeRefreshRecentButton?.addEventListener("click", () => {
  loadRecentRecords({ force: true })
    .then((items) => addAppActivity("view", "Recent Records refreshed", `${items.length} record(s) loaded`))
    .catch(() => {});
});
elements.activityClearButton?.addEventListener("click", () => {
  clearAppActivities();
});
elements.homeWorkspace?.addEventListener("click", async (event) => {
  const hrTab = event.target.closest("[data-hr-hub-tab]");
  if (hrTab) {
    event.preventDefault();
    setHomeHrHubTab(hrTab.getAttribute("data-hr-hub-tab"));
    return;
  }

  const hrLink = event.target.closest("[data-hr-hub-url]");
  if (hrLink) {
    event.preventDefault();
    const url = hrLink.getAttribute("data-hr-hub-url") || "";
    const label = hrLink.getAttribute("data-hr-hub-label") || hrLink.textContent.trim() || "HR link";
    if (!url) return;

    hrLink.disabled = true;
    hrLink.classList.add("is-opening");
    setStatus(elements.hrHubStatus, `Opening ${label}...`);
    try {
      await postJson("/api/open-url", { url });
      setStatus(elements.hrHubStatus, `Opened ${label}.`, "ok");
      showToast(`Opened ${label}.`, "ok");
      addAppActivity("open", "Opened PH HR Hub link", label);
    } catch (error) {
      const message = error.message || `Could not open ${label}.`;
      setStatus(elements.hrHubStatus, message, "error");
      showToast(message, "error");
    } finally {
      hrLink.disabled = false;
      hrLink.classList.remove("is-opening");
    }
    return;
  }

  const shortcut = event.target.closest("[data-home-shortcut-url]");
  if (!shortcut) return;
  event.preventDefault();

  const url = shortcut.getAttribute("data-home-shortcut-url") || "";
  const label = shortcut.getAttribute("data-home-shortcut-label") || shortcut.textContent.trim() || "Oracle shortcut";
  if (!url) return;

  shortcut.disabled = true;
  shortcut.classList.add("is-opening");
  try {
    await postJson("/api/open-url", { url });
    showToast(`Opened ${label}.`, "ok");
    addAppActivity("open", "Opened Oracle shortcut", label);
  } catch (error) {
    showToast(error.message || `Could not open ${label}.`, "error");
    setStatus(elements.recentRecordsStatus, error.message || `Could not open ${label}.`, "error");
  } finally {
    shortcut.disabled = false;
    shortcut.classList.remove("is-opening");
  }
});
elements.recentRecordsList?.addEventListener("click", async (event) => {
  const link = event.target.closest("[data-open-recent-url]");
  if (!link) return;
  event.preventDefault();
  const url = link.getAttribute("data-open-recent-url");
  if (!url) return;
  try {
    await openDebugChromeLink(url, elements.recentRecordsStatus);
    const label = link.querySelector(".recent-record-name")?.textContent?.trim() || link.textContent?.trim() || "recent record";
    addAppActivity("open", "Opened recent record", label);
  } catch (error) {
    setStatus(elements.recentRecordsStatus, error.message, "error");
  }
});
elements.detailCollapseButton.addEventListener("click", () => {
  setDetailCollapsed(!isDetailCollapsed());
  saveModeState(activeMode);
});
elements.territoryList?.addEventListener("click", async (event) => {
  const addButton = event.target.closest("[data-open-add-territory]");
  if (!addButton) return;
  event.preventDefault();

  const actionMode = activeDetailMode || activeMode;
  const repName = selectedSalesRep?.name || selectedSalesRep?.internalId || "sales rep";
  addButton.disabled = true;
  setScopedLookupStatus(actionMode, "Opening Territory Manager...");
  try {
    await postJson("/api/open-url", { url: TERRITORY_MANAGER_URL });
    setScopedLookupStatus(actionMode, `Territory Manager opened in ${selectedBrowserLabel()}.`, "ok");
    addAppActivity("territory", "Opened Territory Manager", displayValue(repName));
  } catch (error) {
    setScopedLookupStatus(actionMode, error.message || "Could not open Territory Manager.", "error");
  } finally {
    addButton.disabled = false;
  }
});
elements.themeSelect?.addEventListener("change", () => applyTheme(elements.themeSelect.value));
elements.rightPanelToggle?.addEventListener("click", () => {
  setRightPanelCollapsed(!document.body.classList.contains("right-panel-collapsed"));
});

function invalidateMergeReviewAfterInputChange() {
  const hasLoadedReview = Boolean(mergeState.primary?.internalId || mergeState.duplicates?.length);
  if (elements.mergeReviewCheckbox) elements.mergeReviewCheckbox.checked = false;
  if (!hasLoadedReview) return;
  mergeState = { primary: null, duplicates: [], blockers: [] };
  resetMergeContactResults();
  renderMergeReview();
  setStatus(elements.mergeStatus, "Merge inputs changed. Load Merge Review again before proceeding.", "", { autoClear: false });
}

elements.mergeReviewCheckbox?.addEventListener("change", () => renderMergeReview());
elements.mergePrimaryInput?.addEventListener("input", invalidateMergeReviewAfterInputChange);
elements.mergeDuplicateInput?.addEventListener("input", invalidateMergeReviewAfterInputChange);
elements.staticGroupConfirmCheckbox?.addEventListener("change", () => updateStaticGroupCreateControls());
elements.staticGroupCreateModeButton?.addEventListener("click", () => setStaticGroupMode("create"));
elements.staticGroupAppendModeButton?.addEventListener("click", () => setStaticGroupMode("append"));
elements.staticGroupNameInput?.addEventListener("input", () => {
  resetStaticGroupConfirmation();
  updateStaticGroupCreateControls();
});
elements.staticGroupExistingGroupInput?.addEventListener("input", () => {
  resetStaticGroupConfirmation();
  updateStaticGroupCreateControls();
});
elements.staticGroupRecordInput?.addEventListener("input", () => {
  resetStaticGroupConfirmation();
  updateStaticGroupCreateControls();
});
elements.staticGroupResultsBody?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-static-group-remove-index]");
  if (!removeButton) return;
  event.preventDefault();
  removeStaticGroupRow(Number(removeButton.getAttribute("data-static-group-remove-index")));
});

elements.mergeFlipButton?.addEventListener("click", () => {
  try {
    flipMergePrimaryWithFirstDuplicate();
    setStatus(elements.mergeStatus, "Flipped primary with the first duplicate. Review again before opening merge.", "ok");
  } catch (error) {
    setStatus(elements.mergeStatus, error.message, "error");
  }
});

elements.mergeContactCheckButton?.addEventListener("click", async () => {
  if (!mergeState.primary?.internalId || !mergeState.duplicates?.length) {
    setStatus(elements.mergeStatus, "Load merge records before checking contacts.", "error");
    return;
  }
  const activityToken = beginTabActivity("records", "merge");
  const originalText = elements.mergeContactCheckButton.textContent;
  elements.mergeContactCheckButton.disabled = true;
  elements.mergeContactCheckButton.textContent = "Checking...";
  setStatus(elements.mergeStatus, "Checking contact subsidiaries...");
  try {
    const primaryContacts = await fetchMergeContacts(mergeState.primary);
    const conflicts = [];
    for (const item of mergeState.duplicates) {
      if (!item.record?.internalId || item.blocker) continue;
      const duplicateContacts = await fetchMergeContacts(item.record);
      conflicts.push(...mergeContactConflictRows(primaryContacts, duplicateContacts, item.record));
    }
    renderMergeContactConflicts(conflicts);
    setStatus(
      elements.mergeStatus,
      conflicts.length ? `Found ${conflicts.length} contact subsidiary conflict(s).` : "No contact subsidiary conflicts found.",
      conflicts.length ? "error" : "ok",
      { autoClear: false }
    );
    addAppActivity("merge", "Merge contacts checked", conflicts.length ? `${conflicts.length} conflict(s) found` : "No conflicts found");
  } catch (error) {
    setStatus(elements.mergeStatus, error.message, "error");
  } finally {
    elements.mergeContactCheckButton.disabled = false;
    elements.mergeContactCheckButton.textContent = originalText;
    finishTabActivity(activityToken);
  }
});

elements.mergeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const activityToken = beginTabActivity("records", "merge");
  const originalText = elements.mergeLoadButton.textContent;
  elements.mergeLoadButton.disabled = true;
  elements.mergeLoadButton.textContent = "Loading...";
  setStatus(elements.mergeStatus, "Loading merge review records...");
  try {
    const result = await loadMergeRecords();
    const blockerCount = result.blockers.length;
    setStatus(
      elements.mergeStatus,
      blockerCount
        ? `Checked ${result.duplicates.length} duplicate input(s). ${blockerCount} needs attention.`
        : `Loaded ${result.duplicates.length} duplicate(s). Tick the review confirmation to enable edit actions.`,
      blockerCount ? "error" : "ok",
      { autoClear: false },
    );
    addAppActivity("merge", "Merge review loaded", blockerCount ? `${result.duplicates.length} duplicate(s), ${blockerCount} need attention` : `${result.duplicates.length} duplicate(s) ready for review`);
  } catch (error) {
    setStatus(elements.mergeStatus, error.message, "error");
  } finally {
    elements.mergeLoadButton.disabled = false;
    elements.mergeLoadButton.textContent = originalText;
    finishTabActivity(activityToken);
  }
});

elements.staticGroupCreateButton?.addEventListener("click", async () => {
  const activityToken = beginTabActivity("records", "staticGroup");
  const originalText = elements.staticGroupCreateButton.textContent;
  elements.staticGroupCreateButton.disabled = true;
  elements.staticGroupCreateButton.textContent = "Creating...";
  setStatus(
    elements.staticGroupStatus,
    staticGroupMode === "append"
      ? "Adding records to the group. Report will be generated below after addition."
      : "Creating static group. Skipped records will be reported.",
    "",
    { autoClear: false },
  );
  startStaticGroupElapsedTimer();
  try {
    const result = await createStaticGroupFromReview();
    if (staticGroupMode === "append") {
      staticGroupState.created = { id: result.groupId || staticGroupExistingId() };
      staticGroupState.rows = staticGroupRowsFromCreateResult(result);
    } else {
      staticGroupState.created = result.group || null;
      staticGroupState.rows = staticGroupRowsFromCreateResult(result.group || {});
    }
    staticGroupState.sourceText = staticGroupInputText();
    renderStaticGroupRows();
    elements.staticGroupConfirmCheckbox.checked = false;
    updateStaticGroupCreateControls();
    const skippedCount = staticGroupSkippedRows().length;
    const addedCount = Array.isArray(result.added) ? result.added.length : Number(result.group?.memberCount || 0);
    setStatus(
      elements.staticGroupStatus,
      staticGroupMode === "append"
        ? `Appended ${addedCount} record(s) to the existing static group.${skippedCount ? ` ${skippedCount} skipped.` : ""}${result.warning ? ` ${result.warning}` : ""}`
        : `Created ${result.group?.name || "static group"} with ${result.group?.memberCount || 0} member(s).${skippedCount ? ` ${skippedCount} skipped; fix those records, then click Retry Skipped.` : ""}`,
      skippedCount ? "error" : "ok",
      { autoClear: false },
    );
    showToast(staticGroupMode === "append" ? "Records appended to the static group." : "Static group created.");
    addAppActivity("group", staticGroupMode === "append" ? "Static group updated" : "Static group created", `${addedCount} member(s)`);
    if (staticGroupMode === "create") await loadStaticGroupHistory({ force: true });
  } catch (error) {
    if (error.payload?.group) {
      staticGroupState.created = null;
      staticGroupState.rows = staticGroupRowsFromCreateResult(error.payload.group);
      staticGroupState.sourceText = staticGroupInputText();
      renderStaticGroupRows();
    }
    setStatus(elements.staticGroupStatus, error.message || "Could not create static group.", "error", { autoClear: false });
  } finally {
    stopStaticGroupElapsedTimer();
    elements.staticGroupCreateButton.textContent = originalText;
    updateStaticGroupCreateControls();
    finishTabActivity(activityToken);
  }
});

elements.staticGroupRetrySkippedButton?.addEventListener("click", async () => {
  const activityToken = beginTabActivity("records", "staticGroup");
  const originalText = elements.staticGroupRetrySkippedButton.textContent;
  elements.staticGroupRetrySkippedButton.disabled = true;
  elements.staticGroupRetrySkippedButton.textContent = "Retrying...";
  resetStaticGroupConfirmation();
  setStatus(elements.staticGroupStatus, "Retrying skipped records in the existing static group...", "", { autoClear: false });
  startStaticGroupElapsedTimer();
  try {
    const previousRows = staticGroupState.rows || [];
    const result = await retryStaticGroupSkippedRecords();
    const retainedRows = previousRows.filter((row) => row.addable);
    const retryRows = staticGroupRowsFromCreateResult(result);
    staticGroupState.rows = [...retainedRows, ...retryRows];
    renderStaticGroupRows();
    const addedCount = Array.isArray(result.added) ? result.added.length : 0;
    const skippedCount = staticGroupSkippedRows().length;
    setStatus(
      elements.staticGroupStatus,
      `Retried skipped records. ${addedCount} added${skippedCount ? `, ${skippedCount} still skipped` : ""}.`,
      skippedCount ? "error" : "ok",
      { autoClear: false },
    );
    showToast("Skipped records retried.");
    addAppActivity("group", "Static group skipped records retried", `${addedCount} added${skippedCount ? `, ${skippedCount} still skipped` : ""}`);
  } catch (error) {
    if (error.payload) {
      const previousRows = staticGroupState.rows || [];
      const retainedRows = previousRows.filter((row) => row.addable);
      const retryRows = staticGroupRowsFromCreateResult(error.payload);
      if (retryRows.length) {
        staticGroupState.rows = [...retainedRows, ...retryRows];
        renderStaticGroupRows();
      }
    }
    setStatus(elements.staticGroupStatus, error.message || "Could not retry skipped records.", "error", { autoClear: false });
  } finally {
    stopStaticGroupElapsedTimer();
    elements.staticGroupRetrySkippedButton.textContent = originalText;
    updateStaticGroupCreateControls();
    finishTabActivity(activityToken);
  }
});

elements.staticGroupHistoryRefreshButton?.addEventListener("click", async () => {
  const originalText = elements.staticGroupHistoryRefreshButton.textContent;
  elements.staticGroupHistoryRefreshButton.disabled = true;
  elements.staticGroupHistoryRefreshButton.textContent = "Refreshing...";
  try {
    const result = await postJson("/api/static-groups-history-refresh", {});
    staticGroupHistoryState.items = Array.isArray(result.items) ? result.items : [];
    staticGroupHistoryState.loaded = true;
    renderStaticGroupHistory();
    setStatus(elements.staticGroupStatus, `Refreshed the ${Math.min(3, staticGroupHistoryState.items.length)} most recent group(s).`, "ok");
  } catch (error) {
    setStatus(elements.staticGroupStatus, error.message || "Could not load created groups.", "error");
  } finally {
    elements.staticGroupHistoryRefreshButton.disabled = false;
    elements.staticGroupHistoryRefreshButton.textContent = originalText;
  }
});

document.addEventListener("change", async (event) => {
  const checkbox = event.target.closest("[data-hybrid-toggle]");
  if (!checkbox) return;
  if (!selectedSalesRep?.internalId) return;

  const actionMode = activeMode;
  const targetRep = { ...selectedSalesRep };
  const nextHybrid = checkbox.checked;
  checkbox.disabled = true;
  setScopedLookupStatus(actionMode, nextHybrid ? "Saving hybrid tag..." : "Removing hybrid tag...");
  try {
    const result = await postJson("/api/hybrid-reps/update", {
      internalId: targetRep.internalId,
      name: targetRep.name,
      vertical: targetRep.vertical,
      tier: targetRep.tier,
      salesSubRegion: targetRep.salesSubRegion,
      salesRole: targetRep.salesRole,
      rosterStatus: targetRep.rosterStatus,
      hybrid: nextHybrid,
    });
    const updatedRep = { ...targetRep, hybrid: Boolean(result.hybrid) };
    renderSalesRepSummary(updatedRep, actionMode);
    if (actionMode === "hybrids") {
      await loadHybridReps();
    }
    setScopedLookupStatus(actionMode, result.hybrid ? "Hybrid tag saved locally." : "Hybrid tag removed locally.", "ok");
    addAppActivity("rep", result.hybrid ? "Hybrid tag saved" : "Hybrid tag removed", displayValue(targetRep.name || targetRep.internalId));
  } catch (error) {
    checkbox.checked = !nextHybrid;
    checkbox.disabled = false;
    setScopedLookupStatus(actionMode, error.message, "error");
  }
});

document.addEventListener("click", async (event) => {
  const staticGroupHistoryLink = event.target.closest("[data-open-static-group-url]");
  if (staticGroupHistoryLink) {
    event.preventDefault();
    const url = staticGroupHistoryLink.getAttribute("data-open-static-group-url") || "";
    if (!url) return;
    setStatus(elements.staticGroupStatus, "Opening static group...");
    try {
      await openDebugChromeLink(url, elements.staticGroupStatus);
      addAppActivity("open", "Opened static group", staticGroupHistoryLink.textContent?.trim() || url);
    } catch (error) {
      setStatus(elements.staticGroupStatus, error.message, "error");
    }
    return;
  }

  const mergeAddressButton = event.target.closest("#mergeWorkspace [data-merge-address]");
  if (mergeAddressButton) {
    openMergeAddressPopover(mergeAddressButton);
    return;
  }

  const mergeOpenButton = event.target.closest("#mergeWorkspace [data-open-id]");
  if (mergeOpenButton) {
    const internalId = mergeOpenButton.getAttribute("data-open-id");
    setStatus(elements.mergeStatus, `Opening ${internalId}...`);
    try {
      await postJson("/api/open-record", { internalId });
      setStatus(elements.mergeStatus, `Opened ${internalId} in ${selectedBrowserLabel()}.`, "ok");
      addAppActivity("open", "Opened merge card record", internalId);
    } catch (error) {
      setStatus(elements.mergeStatus, error.message, "error");
    }
    return;
  }

  const mergeEditButton = event.target.closest("[data-open-merge-edit-id]");
  if (mergeEditButton) {
    const internalId = mergeEditButton.getAttribute("data-open-merge-edit-id");
    mergeEditButton.disabled = true;
    setStatus(elements.mergeStatus, `Opening duplicate ${internalId} on the merge page...`);
    try {
      const result = await postJson("/api/open-record-merge", {
        internalId,
        primaryInternalId: mergeState.primary?.internalId || "",
        primaryLabel: mergePrimaryAutocompleteLabel(mergeState.primary),
      });
      const fillNote = result.primaryPrefill?.ok
        ? "Primary record was prefilled. Review it before submitting."
        : `Primary record was not auto-filled${result.primaryPrefill?.reason ? `: ${result.primaryPrefill.reason}` : ""}. Choose it manually in NetSuite.`;
      setStatus(elements.mergeStatus, `Opened duplicate ${internalId} on the merge page. ${fillNote}`, "ok", {
        autoClear: false,
      });
      addAppActivity("merge", "Opened duplicate merge page", internalId);
    } catch (error) {
      setStatus(elements.mergeStatus, error.message, "error");
      mergeEditButton.disabled = false;
    } finally {
      renderMergeReview();
    }
    return;
  }

  const mergeContactOpenButton = event.target.closest("#mergeWorkspace [data-open-merge-contact-url]");
  if (mergeContactOpenButton) {
    const url = mergeContactOpenButton.getAttribute("data-open-merge-contact-url") || "";
    const label = mergeContactOpenButton.getAttribute("data-open-merge-contact-label") || "Contact";
    if (!url) return;
    mergeContactOpenButton.disabled = true;
    setStatus(elements.mergeStatus, `Opening ${label} contact...`);
    try {
      const result = await postJson("/api/open-url", { url, background: true });
      setStatus(elements.mergeStatus, `${label} contact opened in ${selectedBrowserLabel()}.`, "ok");
      addAppActivity("open", `Opened merge ${label.toLowerCase()} contact`, result.targetUrl || url);
    } catch (error) {
      setStatus(elements.mergeStatus, error.message, "error");
    } finally {
      mergeContactOpenButton.disabled = false;
    }
    return;
  }

  const relatedSortButton = event.target.closest("[data-related-sort]");
  if (relatedSortButton) {
    sortRelatedTable(relatedSortButton);
    saveModeState(activeMode);
    return;
  }

  const recordTab = event.target.closest("[data-record-tab]");
  if (recordTab) {
    if (recordTab.disabled) return;
    const tabsRoot = recordTab.closest("[data-record-detail-tabs]");
    const panelName = recordTab.getAttribute("data-record-tab");
    if (!tabsRoot || !panelName) return;
    tabsRoot.querySelectorAll("[data-record-tab]").forEach((button) => {
      const active = button === recordTab;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    tabsRoot.querySelectorAll("[data-record-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.getAttribute("data-record-panel") === panelName);
    });
    saveModeState(activeMode);
    return;
  }

  const addLink = event.target.closest("[data-link-add]");
  if (addLink) {
    showLinkEditor(addLink.getAttribute("data-link-add"));
    return;
  }

  const reorderToggle = event.target.closest("[data-link-reorder-toggle]");
  if (reorderToggle) {
    const section = reorderToggle.getAttribute("data-link-reorder-toggle");
    linkReorderState = { ...linkReorderState, [section]: !linkReorderState[section] };
    renderManagedLinks(section);
    setStatus(linkSections[section]?.status, linkReorderState[section] ? "Reorder mode on." : "", "ok");
    return;
  }

  const moveLink = event.target.closest("[data-link-move]");
  if (moveLink) {
    await moveManagedLink(
      moveLink.getAttribute("data-link-move"),
      moveLink.getAttribute("data-link-id"),
      moveLink.getAttribute("data-link-direction")
    );
    return;
  }

  const editLink = event.target.closest("[data-link-edit]");
  if (editLink) {
    const section = editLink.getAttribute("data-link-edit");
    const id = editLink.getAttribute("data-link-id");
    const link = (linkState[section] || []).find((item) => item.id === id);
    if (link) showLinkEditor(section, link);
    return;
  }

  const deleteLink = event.target.closest("[data-link-delete]");
  if (deleteLink) {
    const section = deleteLink.getAttribute("data-link-delete");
    const id = deleteLink.getAttribute("data-link-id");
    const link = (linkState[section] || []).find((item) => item.id === id);
    if (!link) return;
    if (!window.confirm(`Delete "${link.label}"?`)) return;
    const status = linkSections[section]?.status;
    try {
      const result = await postJson("/api/links/delete", { section, id });
      linkState = result.links || linkState;
      renderAllLinks();
      hideLinkEditor(section);
      setStatus(status, "");
    } catch (error) {
      setStatus(status, error.message, "error");
    }
    return;
  }

  const cancelLink = event.target.closest("[data-link-cancel]");
  if (cancelLink) {
    hideLinkEditor(cancelLink.closest(".link-editor")?.getAttribute("data-link-editor"));
    return;
  }

  const quickLink = event.target.closest("[data-open-url]");
  if (!quickLink) return;

  const url = quickLink.getAttribute("data-open-url");
  const originalText = quickLink.textContent;
  const statusElement = quickLink.closest(".panel")?.querySelector(".link-status") || elements.quickLinkStatus;
  quickLink.disabled = true;
  quickLink.textContent = "Opening...";
  setStatus(statusElement, "");
  try {
    await postJson("/api/open-url", { url });
    setStatus(statusElement, "");
    addAppActivity("open", "Opened link", quickLink.getAttribute("data-open-label") || url);
  } catch (error) {
    setStatus(statusElement, error.message, "error");
  } finally {
    quickLink.disabled = false;
    quickLink.textContent = originalText;
  }
});

document.addEventListener("submit", async (event) => {
  const editor = event.target.closest(".link-editor");
  if (!editor) return;
  event.preventDefault();

  const section = editor.getAttribute("data-link-editor");
  const id = editor.elements.id.value.trim();
  const label = editor.elements.label.value.trim();
  const url = editor.elements.url.value.trim();
  const status = linkSections[section]?.status;
  const endpoint = id ? "/api/links/update" : "/api/links";
  try {
    const result = await postJson(endpoint, { section, id, label, url });
    linkState = result.links || linkState;
    renderAllLinks();
    hideLinkEditor(section);
    setStatus(status, "");
  } catch (error) {
    setStatus(status, error.message, "error");
  }
});

elements.searchText.addEventListener("focus", () => {
  hideSearchHistory(elements.territorySalesRepHistory, elements.territorySalesRepInput);
  renderSearchHistory();
});
elements.searchText.addEventListener("input", () => renderSearchHistory());
elements.searchText.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideSearchHistory();
});

elements.searchHistory?.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

elements.searchHistory?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-search-history-value]");
  if (!button) return;
  applySearchHistoryValue(button.getAttribute("data-search-history-value") || "");
});

elements.territorySalesRepInput?.addEventListener("focus", () => {
  hideSearchHistory(elements.searchHistory, elements.searchText);
  renderSearchHistory("territories", {
    historyElement: elements.territorySalesRepHistory,
    inputElement: elements.territorySalesRepInput,
  });
});
elements.territorySalesRepInput?.addEventListener("input", () => renderSearchHistory("territories", {
  historyElement: elements.territorySalesRepHistory,
  inputElement: elements.territorySalesRepInput,
}));
elements.territorySalesRepInput?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideSearchHistory(elements.territorySalesRepHistory, elements.territorySalesRepInput);
});

elements.territorySalesRepHistory?.addEventListener("mousedown", (event) => {
  event.preventDefault();
});

elements.territorySalesRepHistory?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-search-history-value]");
  if (!button) return;
  applySearchHistoryValue(button.getAttribute("data-search-history-value") || "", {
    historyElement: elements.territorySalesRepHistory,
    inputElement: elements.territorySalesRepInput,
  });
});

[
  elements.territoryGeneralFilter,
  elements.territoryVerticalFilter,
  elements.territoryTierFilter,
  elements.territoryRegionFilter,
].forEach((control) => {
  control?.addEventListener("input", renderTerritoryBrowser);
  control?.addEventListener("change", renderTerritoryBrowser);
});

elements.territoryRefreshButton?.addEventListener("click", () => {
  ensureTerritoriesLoaded({ force: true }).catch((error) => setStatus(elements.territoryBrowserStatus, error.message, "error"));
});

elements.territorySalesRepForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = String(elements.territorySalesRepInput?.value || "").trim();
  hideSearchHistory(elements.territorySalesRepHistory, elements.territorySalesRepInput);
  if (!query) {
    setStatus(elements.territorySalesRepStatus, "Enter a Sales Rep name.", "error");
    return;
  }
  saveSearchHistory("territories", query);
  const activityToken = beginTabActivity("territories");
  territoryUpdateState.repResults = [];
  renderTerritoryRepResults();
  setStatus(elements.territorySalesRepStatus, "Searching Sales Reps...");
  try {
    const result = await postJson("/api/sales-rep-search", { query });
    territoryUpdateState.repResults = Array.isArray(result.items) ? result.items : [];
    renderTerritoryRepResults();
    setStatus(elements.territorySalesRepStatus, `Showing ${territoryUpdateState.repResults.length} Sales Rep result(s).`, "ok");
    addAppActivity("rep", `You searched Sales Reps for "${query}"`, `${territoryUpdateState.repResults.length} result(s) found`);
  } catch (error) {
    setStatus(elements.territorySalesRepStatus, error.message || "Sales Rep search failed.", "error");
  } finally {
    finishTabActivity(activityToken);
  }
});

elements.territorySalesRepResults?.addEventListener("click", async (event) => {
  const selectButton = event.target.closest("[data-territory-select-rep-id]");
  if (!selectButton) return;
  const internalId = selectButton.getAttribute("data-territory-select-rep-id") || "";
  if (!internalId) return;
  const activityToken = beginTabActivity("territories");
  selectButton.disabled = true;
  setStatus(elements.territorySalesRepStatus, `Loading Sales Rep ${internalId}...`);
  try {
    const result = await postJson("/api/sales-rep", { internalId });
    territoryUpdateState.selectedRep = result.salesRep || null;
    territoryUpdateState.changes = [];
    territoryUpdateState.results = [];
    resetTerritoryConfirmation();
    renderTerritoryBrowser();
    renderTerritoryUpdatePanel();
    setStatus(elements.territorySalesRepStatus, "Sales Rep loaded. Review current territories below.", "ok");
    addAppActivity("territory", "Territory Sales Rep selected", displayValue(result.salesRep?.name || internalId));
  } catch (error) {
    setStatus(elements.territorySalesRepStatus, error.message || "Could not load Sales Rep.", "error");
  } finally {
    selectButton.disabled = false;
    finishTabActivity(activityToken);
  }
});

elements.territorySelectedList?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-territory-stage-remove]");
  if (!removeButton) return;
  const territory = findTerritoryById(removeButton.getAttribute("data-territory-stage-remove"));
  if (!territory) {
    setStatus(elements.territoryBrowserStatus, "Could not find that territory in the selected Sales Rep list.", "error");
    return;
  }
  stageTerritoryChange("remove", territory);
});

elements.territoryChangeSummary?.addEventListener("click", (event) => {
  const removeButton = event.target.closest("[data-territory-remove-change]");
  if (!removeButton) return;
  removeTerritoryChange(Number(removeButton.getAttribute("data-territory-remove-change")));
});

elements.territoryConfirmCheckbox?.addEventListener("change", updateTerritoryRunControls);

elements.territoryRunButton?.addEventListener("click", async () => {
  const payload = territoryUpdatePayload();
  if (!payload.salesRep.internalId || !payload.salesRep.employeeInternalId) {
    setStatus(elements.territoryBrowserStatus, "Select a Sales Rep before running territory changes.", "error");
    return;
  }
  if (!payload.changes.length) {
    setStatus(elements.territoryBrowserStatus, "Add at least one territory change to the summary.", "error");
    return;
  }
  const activityToken = beginTabActivity("territories");
  territoryUpdateState.running = true;
  updateTerritoryRunControls();
  setStatus(elements.territoryBrowserStatus, "Applying territory changes in NSCORP...", "", { autoClear: false });
  try {
    const result = await postJson("/api/territory-update", payload);
    territoryUpdateState.results = Array.isArray(result.results) ? result.results : [];
    const failedCount = territoryUpdateState.results.filter((row) => /failed/i.test(row.status || "")).length;
    const changedCount = territoryUpdateState.results.filter((row) => /added|removed/i.test(row.status || "")).length;
    const failedChangeKeys = new Set(territoryUpdateState.results
      .filter((row) => /failed/i.test(row.status || ""))
      .map((row) => `${row.action}:${territoryKey(row.territory)}`));
    const retryChanges = failedChangeKeys.size
      ? payload.changes.filter((change) => failedChangeKeys.has(`${change.action}:${territoryKey(change.territory)}`))
      : [];
    setStatus(
      elements.territoryBrowserStatus,
      `Territory update completed. ${changedCount} changed${failedCount ? `, ${failedCount} failed` : ""}. Refreshing Sales Rep territories...`,
      failedCount ? "error" : "ok",
      { autoClear: false },
    );
    try {
      const refreshed = await postJson("/api/sales-rep", { internalId: payload.salesRep.internalId });
      territoryUpdateState.selectedRep = refreshed.salesRep || territoryUpdateState.selectedRep;
      territoryUpdateState.changes = retryChanges;
      resetTerritoryConfirmation();
      renderTerritoryBrowser();
      renderTerritoryUpdatePanel();
      const refreshedCount = Array.isArray(territoryUpdateState.selectedRep?.territories) ? territoryUpdateState.selectedRep.territories.length : 0;
      setStatus(
        elements.territoryBrowserStatus,
        `Territory update completed. Selected Sales Rep now shows ${refreshedCount} ${refreshedCount === 1 ? "territory" : "territories"}.`,
        failedCount ? "error" : "ok",
        { autoClear: false },
      );
    } catch (refreshError) {
      renderTerritoryUpdatePanel();
      setStatus(elements.territoryBrowserStatus, `Territory update completed, but the Sales Rep list could not refresh: ${refreshError.message || refreshError}`, "error", { autoClear: false });
    }
    addAppActivity("territory", "Territory update completed", `${changedCount} changed${failedCount ? `, ${failedCount} failed` : ""}`);
  } catch (error) {
    setStatus(elements.territoryBrowserStatus, error.message || "Territory update failed.", "error", { autoClear: false });
  } finally {
    territoryUpdateState.running = false;
    updateTerritoryRunControls();
    finishTabActivity(activityToken);
  }
});

elements.territoryBrowserList?.addEventListener("click", async (event) => {
  const addButton = event.target.closest("[data-territory-stage-add]");
  if (addButton) {
    const territory = findTerritoryById(addButton.getAttribute("data-territory-stage-add"));
    if (!territory) {
      setStatus(elements.territoryBrowserStatus, "Could not find that territory in the list.", "error");
      return;
    }
    stageTerritoryChange("add", territory);
    return;
  }

  const link = event.target.closest("[data-open-territory-url]");
  if (!link) return;
  event.preventDefault();
  const url = link.getAttribute("data-open-territory-url");
  if (!url) return;
  const territoryName = link.textContent.trim() || "Territory";
  setStatus(elements.territoryBrowserStatus, "Opening territory...");
  try {
    await postJson("/api/open-url", { url });
    setStatus(elements.territoryBrowserStatus, `Territory opened in ${selectedBrowserLabel()}.`, "ok");
    addAppActivity("territory", "Opened territory", territoryName);
  } catch (error) {
    setStatus(elements.territoryBrowserStatus, error.message, "error");
  }
});

document.addEventListener("pointerdown", (event) => {
  if (event.target.closest(".search-input-shell")) return;
  hideAllSearchHistories();
});

elements.searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const searchMode = activeMode;
  const submittedQuery = elements.searchText.value.trim();
  hideAllSearchHistories();
  if (searchMode === "hybrids") {
    const activityToken = beginTabActivity("hybrids");
    try {
      await loadHybridReps({ showStatus: true });
    } catch (error) {
      setScopedLookupStatus(searchMode, error.message, "error");
    } finally {
      finishTabActivity(activityToken);
    }
    return;
  }
  saveSearchHistory(searchMode, submittedQuery);
  if (searchMode === "eligibility") {
    const activityToken = beginTabActivity("eligibility");
    resetDetailForMode(searchMode);
    clearEligibilityResults("No eligibility results yet.");
    setScopedLookupStatus(searchMode, "Searching sales reps...");
    try {
      const result = await postJson("/api/sales-rep-search", {
        query: submittedQuery,
      });
      updateModeResults(searchMode, resultHeadHtml.eligibility, salesRepResultsBodyHtml(result.items || [], { mode: "eligibility", eligibility: true }));
      setScopedLookupStatus(searchMode, `Showing ${(result.items || []).length} Sales Rep result(s).`, "ok");
      addAppActivity("rep", `You searched target sales rep "${submittedQuery}"`, `${(result.items || []).length} result(s) found`);
    } catch (error) {
      setScopedLookupStatus(searchMode, error.message, "error");
    } finally {
      finishTabActivity(activityToken);
    }
    return;
  }
  const activityToken = beginTabActivity(searchMode, recordWorkspaceTabForMode(searchMode));
  resetDetailForMode(searchMode);
  setScopedLookupStatus(searchMode, searchMode === "records" ? "Searching through NetSuite..." : "Searching sales reps...");
  try {
    if (searchMode === "records") {
      const result = await postJson("/api/search", {
        query: submittedQuery,
      });
      updateModeResults(searchMode, resultHeadHtml.records, recordsResultsBodyHtml(result.items || []));
      if (result.record?.record) renderSummary(result.record.record, searchMode);
      setScopedLookupStatus(searchMode, `Showing ${(result.items || []).length} Lead/Prospect/Customer result(s) from ${result.totalRawResults || 0} global result(s).`, "ok");
      addAppActivity("search", `You searched for "${submittedQuery}"`, `${(result.items || []).length} record result(s) found`);
      return;
    }

    const result = await postJson("/api/sales-rep-search", {
      query: submittedQuery,
    });
    updateModeResults(searchMode, resultHeadHtml.salesReps, salesRepResultsBodyHtml(result.items || [], { mode: "salesReps" }));
    setScopedLookupStatus(searchMode, `Showing ${(result.items || []).length} Sales Rep result(s).`, "ok");
    addAppActivity("rep", `You searched sales reps for "${submittedQuery}"`, `${(result.items || []).length} result(s) found`);
  } catch (error) {
    setScopedLookupStatus(searchMode, error.message, "error");
  } finally {
    finishTabActivity(activityToken);
  }
});

elements.resultsBody.addEventListener("click", async (event) => {
  const actionMode = activeMode;
  const viewButton = event.target.closest("[data-view-id]");
  const openButton = event.target.closest("[data-open-id]");
  const editButton = event.target.closest("[data-edit-id]");
  const viewRepButton = event.target.closest("[data-view-rep-id]");
  const selectEligibilityRepButton = event.target.closest("[data-select-eligibility-rep-id]");
  const openRepButton = event.target.closest("[data-open-rep-id]");
  let activityToken = null;
  try {
    if (viewButton) {
      activityToken = beginTabActivity(actionMode, recordWorkspaceTabForMode(actionMode));
      const internalId = viewButton.getAttribute("data-view-id");
      setScopedLookupStatus(actionMode, `Loading ${internalId}...`);
      const result = await postJson("/api/record", { internalId, includeRelated: true });
      renderSummary(result.record || {}, actionMode);
      setScopedLookupStatus(actionMode, "Record details loaded below in Selected Record.", "ok");
      addAppActivity("view", "You viewed a record", compactActivityDetail([result.record?.entityId || internalId, result.record?.companyName]));
    }
    if (openButton) {
      const internalId = openButton.getAttribute("data-open-id");
      await postJson("/api/open-record", { internalId });
      setScopedLookupStatus(actionMode, `Opened ${internalId} in ${selectedBrowserLabel()}.`, "ok");
      addAppActivity("open", "Opened record in NSCORP", internalId);
    }
    if (editButton) {
      const internalId = editButton.getAttribute("data-edit-id");
      await postJson("/api/open-record", { internalId, edit: true });
      setScopedLookupStatus(actionMode, `Opened ${internalId} in edit mode.`, "ok");
      addAppActivity("open", "Opened record edit mode", internalId);
    }
    if (viewRepButton) {
      activityToken = beginTabActivity(actionMode, recordWorkspaceTabForMode(actionMode));
      const internalId = viewRepButton.getAttribute("data-view-rep-id");
      setScopedLookupStatus(actionMode, `Loading sales rep ${internalId}...`);
      const result = await postJson("/api/sales-rep", { internalId });
      renderSalesRepSummary(result.salesRep || {}, actionMode);
      setScopedLookupStatus(actionMode, `Sales rep details loaded below in ${activeSalesRepWorkspaceTab === "hybrids" ? "Selected Hybrid Rep" : "Selected Sales Rep"}.`, "ok");
      addAppActivity("rep", "You viewed a sales rep", compactActivityDetail([result.salesRep?.name || internalId, result.salesRep?.salesRole ? `- ${result.salesRep.salesRole}` : ""]));
    }
    if (selectEligibilityRepButton) {
      activityToken = beginTabActivity(actionMode, recordWorkspaceTabForMode(actionMode));
      const internalId = selectEligibilityRepButton.getAttribute("data-select-eligibility-rep-id");
      setScopedLookupStatus(actionMode, `Loading target sales rep ${internalId}...`);
      const result = await postJson("/api/sales-rep", { internalId });
      renderSalesRepSummary(result.salesRep || {}, actionMode);
      setScopedLookupStatus(actionMode, "Target sales rep loaded.", "ok");
      addAppActivity("roe", "Target sales rep loaded", displayValue(result.salesRep?.name || internalId));
      if (actionMode === activeMode) setStatus(elements.eligibilityStatus, "");
    }
    if (openRepButton) {
      const internalId = openRepButton.getAttribute("data-open-rep-id");
      await postJson("/api/open-sales-rep", { internalId });
      setScopedLookupStatus(actionMode, `Opened sales rep ${internalId} in ${selectedBrowserLabel()}.`, "ok");
      addAppActivity("open", "Opened sales rep in NSCORP", internalId);
    }
  } catch (error) {
    setScopedLookupStatus(actionMode, error.message, "error");
  } finally {
    finishTabActivity(activityToken);
  }
});

elements.dupeResultsBody?.addEventListener("click", async (event) => {
  const openButton = event.target.closest("[data-open-id]");
  if (!openButton) return;
  const internalId = openButton.getAttribute("data-open-id");
  try {
    await postJson("/api/open-record", { internalId });
    setStatus(elements.dupeStatus, `Opened ${internalId} in ${selectedBrowserLabel()}.`, "ok");
    addAppActivity("open", "Opened duplicate finder record", internalId);
  } catch (error) {
    setStatus(elements.dupeStatus, error.message, "error");
  }
});

elements.dupeCopyFhButton?.addEventListener("click", async () => {
  const text = dupeRowsToFhClipboard(dupeResultRows);
  if (!text) {
    setStatus(elements.dupeStatus, "No Duplicate Finder rows to copy.", "error");
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    setStatus(elements.dupeStatus, `Copied ${dupeResultRows.length} row(s) for columns F-H.`, "ok");
    showToast(`Copied ${dupeResultRows.length} row(s) for columns F-H.`);
    addAppActivity("copy", "Copied Duplicate Finder F-H", `${dupeResultRows.length} row(s)`);
  } catch (error) {
    setStatus(elements.dupeStatus, error.message || "Could not copy results.", "error");
  }
});

elements.dupeExportButton?.addEventListener("click", async () => {
  await exportRowsToDownloads({
    button: elements.dupeExportButton,
    folderButton: elements.dupeOpenExtractFolderButton,
    statusElement: elements.dupeStatus,
    label: "Duplicate Finder results",
    fileName: "Duplicate_Finder_Results",
    headers: ["Input Record", "Potential Master", "Column F: Master Record", "Column G: Status / Stage", "Column H: Sales Rep", "Reason"],
    rows: duplicateFinderExportRows(dupeResultRows),
  });
});

elements.domainExportButton?.addEventListener("click", async () => {
  await exportRowsToDownloads({
    button: elements.domainExportButton,
    folderButton: elements.domainOpenExtractFolderButton,
    statusElement: elements.domainStatus,
    label: "Domain Search results",
    fileName: "Domain_Search_Results",
    headers: ["Input", "Search Domain", "Potential Master", "Column F: Master Record", "Column G: Status / Stage", "Column H: Sales Rep", "Reason"],
    rows: domainSearchExportRows(domainResultRows),
  });
});

elements.eligibilityExportButton?.addEventListener("click", async () => {
  await exportRowsToDownloads({
    button: elements.eligibilityExportButton,
    folderButton: elements.eligibilityOpenExtractFolderButton,
    statusElement: elements.eligibilityStatus,
    label: "ROE Checker results",
    fileName: "ROE_Checker_Results",
    headers: ["Internal ID", "ID", "Name", "Industry", "Annual Revenue", "Sales Rep", "LSAD Date", "State/Region", "Eligibility", "Notes"],
    rows: eligibilityExportRows(eligibilityResultRows),
  });
});

elements.dupeOpenExtractFolderButton?.addEventListener("click", async () => {
  await openDownloadsFolder(elements.dupeOpenExtractFolderButton, elements.dupeStatus);
});

elements.domainOpenExtractFolderButton?.addEventListener("click", async () => {
  await openDownloadsFolder(elements.domainOpenExtractFolderButton, elements.domainStatus);
});

elements.eligibilityOpenExtractFolderButton?.addEventListener("click", async () => {
  await openDownloadsFolder(elements.eligibilityOpenExtractFolderButton, elements.eligibilityStatus);
});

elements.eligibilityStopButton?.addEventListener("click", async () => {
  stopBatchRun(eligibilityRunState, elements.eligibilityStopButton);
  setStatus(elements.eligibilityStatus, "Stopping ROE Checker and resetting its worker...", "ok", { autoClear: false });
  addAppActivity("stop", "ROE Checker stop requested", "Partial results will be kept");
  try {
    await postJson("/api/roe-stop", {});
    setStatus(elements.eligibilityStatus, "ROE Checker stopped. Partial results were kept.", "ok", { autoClear: false });
  } catch (error) {
    setStatus(elements.eligibilityStatus, error.message || "ROE Checker stop request failed.", "error", { autoClear: false });
  }
});

elements.dupeStopButton?.addEventListener("click", async () => {
  stopBatchRun(dupeRunState, elements.dupeStopButton);
  setStatus(elements.dupeStatus, "Stopping Duplicate Finder and resetting its worker...", "ok", { autoClear: false });
  addAppActivity("stop", "Duplicate Finder stop requested", "Partial results will be kept");
  try {
    await postJson("/api/dupe-stop", {});
    setStatus(elements.dupeStatus, "Duplicate Finder stopped. Partial results were kept.", "ok", { autoClear: false });
  } catch (error) {
    setStatus(elements.dupeStatus, error.message || "Duplicate Finder stop request failed.", "error", { autoClear: false });
  }
});

elements.domainStopButton?.addEventListener("click", async () => {
  stopBatchRun(domainRunState, elements.domainStopButton);
  setStatus(elements.domainStatus, "Stopping Domain Search and resetting its worker...", "ok", { autoClear: false });
  addAppActivity("stop", "Domain Search stop requested", "Partial results will be kept");
  try {
    await postJson("/api/domain-stop", {});
    setStatus(elements.domainStatus, "Domain Search stopped. Partial results were kept.", "ok", { autoClear: false });
  } catch (error) {
    setStatus(elements.domainStatus, error.message || "Domain Search stop request failed.", "error", { autoClear: false });
  }
});

elements.eligibilityForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedSalesRep?.internalId) {
    setStatus(elements.eligibilityStatus, "Select a target sales rep first.", "error");
    return;
  }

  const entries = parseEligibilityLeadInput(elements.eligibilityLeadInput.value);
  if (!entries.length) {
    clearEligibilityResults("No leads pasted.");
    setStatus(elements.eligibilityStatus, "Paste at least one lead.", "error");
    return;
  }

  const activityToken = beginTabActivity("eligibility");
  const runId = beginBatchRun(eligibilityRunState, elements.verifyEligibilityButton, elements.eligibilityStopButton, "Verifying...");
  startEligibilityElapsedTimer();
  const targetSalesRep = selectedSalesRep;
  clearEligibilityResults("Checking records...");
  addAppActivity("roe", "ROE check started", `${entries.length} record(s) for ${displayValue(targetSalesRep.name || targetSalesRep.internalId)}`);
  const rows = [];
  let forcedStopStatus = null;
  let eligibilityCacheHits = 0;
  try {
    for (let index = 0; index < entries.length; index += 1) {
      if (isBatchRunStopped(eligibilityRunState, runId)) break;
      const entry = entries[index];
      setStatus(elements.eligibilityStatus, `Checking ${index + 1} of ${entries.length}...`);
      const cacheKey = eligibilityEntryCacheKey(entry, targetSalesRep);
      const cachedRow = cachedBatchValue(eligibilityValidationCache, cacheKey);
      if (cachedRow) {
        rows.push(cachedRow);
        eligibilityCacheHits += 1;
        renderEligibilityRows(rows);
        continue;
      }
      try {
        const record = await resolveEligibilityRecord(entry);
        if (isBatchRunStopped(eligibilityRunState, runId)) continue;
        let row;
        if (record.eligibility) {
          row = {
            internalId: record.internalId || "",
            entityId: record.entityId || entry.raw,
            companyName: record.companyName || "",
            industry: record.industry || "",
            annualRevenue: record.annualRevenue || "",
            salesRep: record.salesRep || "",
            lsadDate: record.lsadDate || "",
            stateRegion: recordRegionDisplay(record),
            eligibility: record.eligibility,
            notes: record.notes,
            conflicts: record.conflicts || [],
          };
        } else {
          const cleanRecord = {
            ...record,
            entityId: cleanRecordId(record),
          };
          const result = evaluateLeadEligibility(cleanRecord, targetSalesRep);
          row = {
            internalId: cleanRecord.internalId || "",
            entityId: cleanRecord.entityId || "",
            companyName: cleanRecord.companyName || "",
            industry: cleanRecord.industry || "",
            annualRevenue: cleanRecord.annualRevenue || "",
            salesRep: cleanRecord.salesRep || "",
            lsadDate: cleanRecord.lsadDate || "",
            stateRegion: recordRegionDisplay(cleanRecord),
            eligibility: result.eligibility,
            notes: result.notes,
            conflicts: result.conflicts || [],
          };
        }
        rows.push(row);
        setCachedBatchValue(eligibilityValidationCache, cacheKey, row);
      } catch (error) {
        if (isBatchRunStopped(eligibilityRunState, runId)) continue;
        if (isWorkerSessionInvalidError(error)) {
          stopBatchRun(eligibilityRunState, elements.eligibilityStopButton);
          forcedStopStatus = workerSessionStoppedMessage("ROE Checker", rows.length, entries.length);
          await postJson("/api/roe-stop", {}).catch(() => {});
          break;
        }
        rows.push({
          internalId: entry.internalId || "",
          entityId: entry.query || entry.raw,
          companyName: "",
          industry: "",
          annualRevenue: "",
          salesRep: "",
          lsadDate: "",
          stateRegion: "---",
          eligibility: "Needs Review",
          notes: error.message || "Could not verify record",
          conflicts: [],
        });
      }
      renderEligibilityRows(rows);
    }
    if (forcedStopStatus && !rows.length) clearEligibilityResults("ROE Checker stopped before any rows completed.");
    const eligible = rows.filter((row) => row.eligibility === "Eligible").length;
    const maybe = rows.filter((row) => row.eligibility === "Maybe").length;
    const review = rows.filter((row) => row.eligibility === "Needs Review").length;
    const notEligible = rows.filter((row) => row.eligibility === "Not Eligible").length;
    const stopped = isBatchRunStopped(eligibilityRunState, runId);
    setStatus(
      elements.eligibilityStatus,
      forcedStopStatus
        ? forcedStopStatus
        : stopped
        ? `Stopped after ${rows.length} of ${entries.length} record(s).`
        : `Verified ${rows.length}: ${eligible} eligible, ${maybe} maybe, ${review} needs review, ${notEligible} not eligible.${eligibilityCacheHits ? ` ${eligibilityCacheHits} reused from session cache.` : ""}`,
      forcedStopStatus ? "error" : "ok",
      { autoClear: false },
    );
    addAppActivity(
      "roe",
      forcedStopStatus || stopped ? "ROE check stopped" : "ROE check completed",
      `${rows.length} of ${entries.length} record(s) checked`,
    );
  } finally {
    stopEligibilityElapsedTimer();
    finishBatchRun(eligibilityRunState, runId, elements.verifyEligibilityButton, elements.eligibilityStopButton, !selectedSalesRep?.internalId);
    finishTabActivity(activityToken);
  }
});

elements.pitchbookForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const group = String(elements.pitchbookGroupInput?.value || "").trim();
  if (!group) {
    setStatus(elements.pitchbookStatus, "Paste the direct Static Group URL.", "error");
    return;
  }
  elements.pitchbookLoadButton.disabled = true;
  pitchbookResultRows = [];
  renderPitchbookRows([]);
  setStatus(elements.pitchbookStatus, "Loading Static Group records...");
  addAppActivity("view", "Pitchbook group review started", group);
  try {
    const result = await postJson("/api/pitchbook", { group });
    pitchbookResultRows = result.rows || [];
    renderPitchbookRows(pitchbookResultRows);
    setStatus(elements.pitchbookStatus, `${pitchbookResultRows.length} record(s) loaded from ${result.groupName || "the Static Group"}.`, "ok", { autoClear: false });
    addAppActivity("view", "Pitchbook group loaded", `${pitchbookResultRows.length} record(s)`);
  } catch (error) {
    renderPitchbookRows([]);
    setStatus(elements.pitchbookStatus, error.message || "Pitchbook group could not be loaded.", "error", { autoClear: false });
  } finally {
    elements.pitchbookLoadButton.disabled = false;
  }
});

elements.dupeForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const entries = parseMergeEntries(elements.dupeInput.value, "Duplicate Finder");
  if (!entries.length) {
    clearDupeResults("No records pasted.");
    setStatus(elements.dupeStatus, "Paste at least one record.", "error");
    return;
  }

  const activityToken = beginTabActivity("suiteWorld", "dupes");
  const runId = beginBatchRun(dupeRunState, elements.dupeFindButton, elements.dupeStopButton, "Finding...");
  startDupeElapsedTimer();
  clearDupeResults("Checking records...");
  addAppActivity("dupe", "Duplicate Finder started", `${entries.length} record(s)`);
  const rows = [];
  let forcedStopStatus = null;
  let dupeCacheHits = 0;
  try {
    for (let index = 0; index < entries.length; index += 1) {
      if (isBatchRunStopped(dupeRunState, runId)) break;
      const entry = entries[index];
      setStatus(elements.dupeStatus, `Checking ${index + 1} of ${entries.length}...`);
      const cacheKey = recordEntryCacheKey(entry);
      const cachedRow = cachedBatchValue(dupeValidationCache, cacheKey);
      if (cachedRow) {
        rows.push(cachedRow);
        dupeCacheHits += 1;
        renderDupeRows(rows);
        continue;
      }
      try {
        const source = await resolveDupeSourceRecord(entry);
        if (isBatchRunStopped(dupeRunState, runId)) continue;
        let row;
        if (dupeHasDummyDomain(source)) {
          const { master, reason } = chooseDupeMaster(source, []);
          row = { source, duplicates: [], master, reason };
          rows.push(row);
          setCachedBatchValue(dupeValidationCache, cacheKey, row);
          renderDupeRows(rows);
          continue;
        }
        const duplicates = await findDuplicateCandidates(source);
        if (isBatchRunStopped(dupeRunState, runId)) continue;
        const { master, reason } = dupeMasterResultForCandidates(source, duplicates);
        row = { source, duplicates, master, reason };
        rows.push(row);
        setCachedBatchValue(dupeValidationCache, cacheKey, row);
      } catch (error) {
        if (isBatchRunStopped(dupeRunState, runId)) continue;
        if (isWorkerSessionInvalidError(error)) {
          stopBatchRun(dupeRunState, elements.dupeStopButton);
          forcedStopStatus = workerSessionStoppedMessage("Duplicate Finder", rows.length, entries.length);
          await postJson("/api/dupe-stop", {}).catch(() => {});
          break;
        }
        const fallback = { entityId: entry.raw, companyName: "", internalId: entry.internalId || "", status: "", salesRep: "" };
        rows.push({
          source: fallback,
          duplicates: [],
          master: fallback,
          reason: error.message || "Could not check record",
        });
      }
      renderDupeRows(rows);
    }
    if (forcedStopStatus && !rows.length) clearDupeResults("Duplicate Finder stopped before any rows completed.");
    const withDupes = rows.filter((row) => row.duplicates.length).length;
    const stopped = isBatchRunStopped(dupeRunState, runId);
    setStatus(
      elements.dupeStatus,
      forcedStopStatus
        ? forcedStopStatus
        : stopped
        ? `Stopped after ${rows.length} of ${entries.length} record(s).`
        : `Checked ${rows.length} record(s). ${withDupes} had possible duplicate(s).${dupeCacheHits ? ` ${dupeCacheHits} reused from session cache.` : ""}`,
      forcedStopStatus ? "error" : "ok",
      { autoClear: false },
    );
    addAppActivity(
      "dupe",
      forcedStopStatus || stopped ? "Duplicate Finder stopped" : "Duplicate Finder completed",
      `${rows.length} of ${entries.length} record(s) checked`,
    );
  } finally {
    stopDupeElapsedTimer();
    finishBatchRun(dupeRunState, runId, elements.dupeFindButton, elements.dupeStopButton);
    finishTabActivity(activityToken);
  }
});

elements.domainForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const entries = parseDomainSearchEntries(elements.domainInput.value);
  if (!entries.length) {
    clearDomainResults("No domains pasted.");
    setStatus(elements.domainStatus, "Paste at least one website or email domain.", "error");
    return;
  }

  const activityToken = beginTabActivity("suiteWorld", "domain");
  const runId = beginBatchRun(domainRunState, elements.domainSearchButton, elements.domainStopButton, "Searching...");
  startDomainElapsedTimer();
  clearDomainResults("Checking domains...");
  addAppActivity("domain", "Domain Search started", `${entries.length} domain(s)`);
  const rows = [];
  let forcedStopStatus = null;
  let domainCacheHits = 0;
  try {
    for (let index = 0; index < entries.length; index += 1) {
      if (isBatchRunStopped(domainRunState, runId)) break;
      const entry = entries[index];
      setStatus(elements.domainStatus, `Checking ${index + 1} of ${entries.length}...`);
      if (entry.error) {
        rows.push({
          input: entry.raw,
          domain: entry.domain,
          items: [],
          master: null,
          reason: entry.error,
          status: entry.error,
        });
        renderDomainRows(rows);
        continue;
      }
      const cacheKey = domainEntryCacheKey(entry);
      const cachedRow = cachedBatchValue(domainValidationCache, cacheKey);
      if (cachedRow) {
        rows.push({ ...cachedRow, input: entry.raw, domain: entry.domain || cachedRow.domain });
        domainCacheHits += 1;
        renderDomainRows(rows);
        continue;
      }
      try {
        const result = await postDomainJsonWithTimeout("/api/domain-search", { query: `cu:${entry.domain}`, fast: true }, DUPE_RECORD_TIMEOUT_MS);
        if (isBatchRunStopped(domainRunState, runId)) continue;
        const searchItems = Array.isArray(result.items) ? result.items : [];
        const items = await domainCandidatesFromSearchItems(entry.domain, searchItems);
        if (isBatchRunStopped(domainRunState, runId)) continue;
        const masterResult = domainMasterResultForCandidates(items);
        const row = {
          input: entry.raw,
          domain: entry.domain,
          items,
          master: masterResult.master,
          reason: masterResult.reason,
          review: Boolean(masterResult.review),
          status: items.length ? "Results found" : "No records found",
        };
        rows.push(row);
        if (row.items.length) setCachedBatchValue(domainValidationCache, cacheKey, row);
      } catch (error) {
        if (isBatchRunStopped(domainRunState, runId)) continue;
        if (isWorkerSessionInvalidError(error)) {
          stopBatchRun(domainRunState, elements.domainStopButton);
          forcedStopStatus = workerSessionStoppedMessage("Domain Search", rows.length, entries.length);
          await postJson("/api/domain-stop", {}).catch(() => {});
          break;
        }
        rows.push({
          input: entry.raw,
          domain: entry.domain,
          items: [],
          master: null,
          reason: error.message || "Could not search domain",
          status: error.message || "Could not search domain",
        });
      }
      renderDomainRows(rows);
    }
    if (forcedStopStatus && !rows.length) clearDomainResults("Domain Search stopped before any rows completed.");
    const withResults = rows.filter((row) => row.items?.length).length;
    const stopped = isBatchRunStopped(domainRunState, runId);
    const cacheSuffix = domainCacheHits ? ` ${domainCacheHits} reused from session cache.` : "";
    setStatus(
      elements.domainStatus,
      forcedStopStatus
        ? forcedStopStatus
        : stopped
          ? `Stopped after ${rows.length} of ${entries.length} domain(s).`
          : `Checked ${rows.length} domain(s). ${withResults} had result(s).${cacheSuffix}`,
      forcedStopStatus ? "error" : "ok",
      { autoClear: false },
    );
    addAppActivity(
      "domain",
      forcedStopStatus || stopped ? "Domain Search stopped" : "Domain Search completed",
      `${rows.length} of ${entries.length} domain(s) checked`,
    );
  } finally {
    stopDomainElapsedTimer();
    finishBatchRun(domainRunState, runId, elements.domainSearchButton, elements.domainStopButton);
    finishTabActivity(activityToken);
  }
});

elements.extractSalesRepButton.addEventListener("click", async () => {
  if (!selectedSalesRep?.internalId) return;
  const actionMode = activeMode;
  const targetRep = { ...selectedSalesRep };
  const activityToken = beginTabActivity(actionMode, recordWorkspaceTabForMode(actionMode));
  const originalText = elements.extractSalesRepButton.textContent;
  elements.extractSalesRepButton.disabled = true;
  elements.extractSalesRepButton.textContent = "Extracting...";
  setScopedLookupStatus(actionMode, `Extracting records for ${targetRep.name || targetRep.internalId}...`);
  try {
    const result = await postJson("/api/sales-rep-extract", { internalId: targetRep.internalId });
    setScopedLookupStatus(actionMode, `Extracted ${result.rowCount} record(s) to ${result.csvPath}.`, "ok");
    addAppActivity("export", "Sales rep records extracted", `${targetRep.name || targetRep.internalId}: ${result.rowCount} record(s)`);
    if (actionMode === activeMode) {
      elements.selectedRecordHint.textContent = result.csvPath;
      elements.openExtractFolderButton.classList.remove("hidden");
      saveModeState(actionMode);
    } else if (modeState[actionMode]) {
      modeState[actionMode] = {
        ...modeState[actionMode],
        selectedRecordHint: result.csvPath,
        openExtractFolderButtonClassName: "small-button secondary",
        openExtractFolderButtonDisabled: false,
      };
    }
  } catch (error) {
    setScopedLookupStatus(actionMode, error.message, "error");
  } finally {
    if (actionMode === activeMode) {
      elements.extractSalesRepButton.disabled = false;
      elements.extractSalesRepButton.textContent = originalText;
    } else if (modeState[actionMode]) {
      modeState[actionMode] = {
        ...modeState[actionMode],
        extractButtonDisabled: false,
        extractButtonText: originalText,
      };
    }
    finishTabActivity(activityToken);
  }
});

elements.openExtractFolderButton.addEventListener("click", async () => {
  const actionMode = activeMode;
  const originalText = elements.openExtractFolderButton.textContent;
  elements.openExtractFolderButton.disabled = true;
  elements.openExtractFolderButton.textContent = "Opening...";
  try {
    const result = await postJson("/api/open-extract-folder");
    setScopedLookupStatus(actionMode, `Opened ${result.folderPath}.`, "ok");
    addAppActivity("folder", "Opened Downloads folder", result.folderPath || "Downloads");
  } catch (error) {
    setScopedLookupStatus(actionMode, error.message, "error");
  } finally {
    if (actionMode === activeMode) {
      elements.openExtractFolderButton.disabled = false;
      elements.openExtractFolderButton.textContent = originalText;
    } else if (modeState[actionMode]) {
      modeState[actionMode] = {
        ...modeState[actionMode],
        openExtractFolderButtonDisabled: false,
      };
    }
  }
});

initializeTheme();
initializeRightPanelState();
initializeAppGreeting();
initializeStickyNotes();
initializeHrHubTooltips();
initializeBrowserChoice().finally(() => {
  checkBrowser().catch(() => {});
});
setStaticGroupMode("create");
refreshTerritoryRegionOptions();
renderActivityFeed();
setMode("home");
loadUpdateInfo();
startSessionHealthMonitor();
loadLinks().catch((error) => {
  setStatus(elements.quickLinkStatus, error.message, "error");
});
loadRecordRegionRules();
