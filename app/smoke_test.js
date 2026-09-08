const { spawn } = require("node:child_process");

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const port = 8766;
  const baseUrl = `http://127.0.0.1:${port}`;
  const child = spawn(process.execPath, ["server.js"], {
    cwd: __dirname,
    env: { ...process.env, PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  for (let attempt = 0; attempt < 20; attempt += 1) {
    await wait(250);
    try {
      const health = await fetch(`${baseUrl}/api/health`);
      const home = await fetch(`${baseUrl}/`);
      const browser = await fetch(`${baseUrl}/api/browser/status`);
      const selectFirefox = await fetch(`${baseUrl}/api/browser/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ browser: "firefox" }),
      });
      const firefoxStatus = await fetch(`${baseUrl}/api/browser/status`);
      const selectChrome = await fetch(`${baseUrl}/api/browser/select`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ browser: "chrome" }),
      });
      console.log(JSON.stringify({
        ok: health.ok && home.ok && browser.ok && selectFirefox.ok && firefoxStatus.ok && selectChrome.ok,
        healthStatus: health.status,
        homeStatus: home.status,
        browserStatus: browser.status,
        firefoxStatus: firefoxStatus.status,
      }, null, 2));
      child.kill();
      return;
    } catch {
      if (child.exitCode !== null) break;
    }
  }

  child.kill();
  throw new Error(`Smoke test failed. Server output: ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
