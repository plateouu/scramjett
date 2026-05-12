import { spawn } from "node:child_process"

const env = {
  ...process.env,
  COREPACK_ENABLE_DOWNLOAD_PROMPT: "0",
  PORT: process.env.PORT || "3500",
  DEMO_PORT: process.env.DEMO_PORT || process.env.PORT || "3500",
  PUBLIC_ORIGIN: process.env.PUBLIC_ORIGIN || "https://plateousmp.net",
  PUBLIC_BASE: process.env.PUBLIC_BASE || "/proxy/",
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
      env,
    })

    child.on("exit", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(" ")} exited with ${code}`))
    })
  })
}

await run("corepack", ["enable"])
await run("corepack", ["prepare", "pnpm@10.12.1", "--activate"])
await run("corepack", ["pnpm", "install"])

const dev = spawn("corepack", ["pnpm", "run", "dev"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  env,
})

dev.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
