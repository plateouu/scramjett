import { spawn } from "node:child_process"

const env = {
  ...process.env,
  PORT: process.env.PORT || "3500",
  DEMO_PORT: process.env.DEMO_PORT || process.env.PORT || "3500",
  PUBLIC_ORIGIN: process.env.PUBLIC_ORIGIN || "https://plateousmp.net",
  PUBLIC_BASE: process.env.PUBLIC_BASE || "/proxy/",
}

const child = spawn("npx", ["tsx", "devserver.ts"], {
  stdio: "inherit",
  shell: true,
  env,
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
