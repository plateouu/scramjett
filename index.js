import { spawn } from "node:child_process"

const child = spawn(
  process.platform === "win32" ? "npx.cmd" : "npx",
  ["tsx", "devserver.ts"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      PORT: process.env.PORT || "3500",
      DEMO_PORT: process.env.DEMO_PORT || process.env.PORT || "3500",
      PUBLIC_ORIGIN: process.env.PUBLIC_ORIGIN || "https://plateousmp.net",
      PUBLIC_BASE: process.env.PUBLIC_BASE || "/proxy/",
    },
  }
)

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
