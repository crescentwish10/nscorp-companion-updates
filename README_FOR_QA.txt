NSCORP Companion App - QA Test Package

This is a portable local test copy. It does not include any Chrome profile, login session, extracted files, or NetSuite credentials.

Fresh install:

1. Unzip the package to a local folder.
2. Double-click "Start NSCORP Companion.bat".
3. Your browser should open http://127.0.0.1:8765/.
4. In the app, choose Google Chrome or Mozilla Firefox.
5. Click the matching "Launch NSCORP" button.
6. Log in to NSCORP using your own account.
7. Click "Connect".

To stop the app server completely, double-click "Stop NSCORP Companion.bat".

Current package version: v2.4.0

Current features to check:

- Home page shortcuts, PH HR Hub, Stickies, Recent Records, and Activity Feed
- Records Search and selected record view
- Merge Assistant under Records > Merge
- Static Group Creator under Records > Static Group, including Create New, Add to Existing, direct creation, skipped-record retry, removable rows, duplicate-name safeguard, and app-created group history
- Pitchbook static group review
- Territory search and filters under Territories
- SuiteWorld > Duplicate Finder, including Copy F-H, Extract, Open Folder, and elapsed timer
- SuiteWorld > Domain Search, including domain-based master selection, Extract, Open Folder, and elapsed timer
- Sales Rep search, selected sales rep details, hybrid rep tools, industry and annual revenue coverage
- ROE Checker with target sales rep review, state/region checks, conflict highlights, stop button, Extract, Open Folder, and elapsed timer
- Quick Links and CSV links
- Themes: Standard, l'Cie, Lucis, SOLDIER, and Ivalice
- App Updates panel for checking and installing GitHub release packages

Notes:

- Google Chrome must already be installed for the default browser option. Mozilla Firefox must be installed only when the Firefox option is selected.
- No NetSuite token, OAuth client, or admin setup is needed.
- The app uses your own logged-in NSCORP browser session. Chrome and Firefox stay separate inside the Companion app.
- Node is bundled in this package under runtime\node\node.exe.
- Firefox automation support is bundled in this package under runtime\geckodriver\geckodriver.exe.
- Extracted files are saved in your Windows Downloads folder.
- Local app data is stored inside the app folder, including quick links, hybrid reps, static group history, stickies, logs, and the local Chrome profile.
- App updates preserve local app data and the local Chrome profile. Firefox uses a separate Companion-managed session.
- The app creates a local "chrome-profile" folder after launch. Do not share that folder because it may contain browser/session data.
- The app server runs in the background after launch, so no command window needs to stay open.
- If port 8765 is already in use, close any other running copy of the companion app and start again.
