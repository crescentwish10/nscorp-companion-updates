# NetSuite Companion App

This is a local companion app for NSCORP. It uses your own logged-in browser session instead of NetSuite API credentials.

No OAuth client ID, client secret, access token, or admin integration record is required.

## What It Does

- Runs locally on `http://127.0.0.1:8765`
- Lets you choose a dedicated Google Chrome or Mozilla Firefox session for NSCORP
- Connects to that browser session after you log in normally
- Searches NetSuite using the website's own general global search helper
- Opens and reads Lead/Customer pages by internal ID
- Shows the record details in a cleaner local UI
- Supports Home, Records search, Merge Assistant, Territories, SuiteWorld Duplicate Finder/Domain Search, Sales Reps, Hybrid Reps, and ROE Checker workflows
- Keeps review-first workflows inside the app; merge and NetSuite edits still require your final action in NSCORP

## Start

Double-click:

```text
start_netsuite_companion.bat
```

The launcher starts the local server in the background, then opens the app. A command window does not need to stay open.

To fully stop the local app server, double-click:

```text
stop_netsuite_companion.bat
```

Then use the app:

1. Choose `Google Chrome` or `Mozilla Firefox` in the Browser picker.
2. Click the matching `Launch NSCORP` button.
3. Log in to NetSuite in the browser window if asked.
4. Click `Connect`.
5. Type any number or text in the search box.
6. Use Records for Search/Merge, SuiteWorld for Duplicate Finder/Domain Search, and Territories for territory lookup.

Fresh GitHub release packages include a bundled Node runtime at `runtime/node/node.exe`, so users do not need a separate Node install. Google Chrome is required for the default browser option; Mozilla Firefox is required only when the Firefox option is selected. The package includes the local Firefox automation component used by the app.

## Browser Choice

- **Google Chrome** remains the default and uses the Companion app's dedicated Chrome profile on local port `9222`.
- **Mozilla Firefox** uses a separate Companion-managed session. It does not reuse, close, or modify Companion Chrome tabs.
- Pick one browser before starting a task. The app prevents switching while a worker is running, so an in-progress task keeps using the browser it started with.
- Worker tabs stay in the selected browser and are intended to run in the background while you work in other tabs.

## Search Behavior

The app now treats every search as a general NetSuite global search.

It calls NetSuite's page-side `nlapiSearchGlobal(...)` helper through your logged-in selected browser session, then filters the companion-app display to exact record types:

- Lead
- Prospect
- Customer

Other NetSuite global-search matches, such as opportunities, cases, issues, and custom records, are ignored in the companion app results.

## Release

Current packaged version: `2.4.0`

## Notes

- This app uses the same permissions as your logged-in NetSuite user.
- The Chrome profile is stored under this app folder in `chrome-profile`. Firefox is managed separately by the Companion's local Firefox session.
- If NetSuite changes the page layout, some scraping logic may need updates.
- This is the practical no-admin path. The official API path is cleaner, but needs an admin-created OAuth integration.
