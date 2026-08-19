---
name: rtk
description: >
  Token optimization and output compression skill for terminal commands and CLI interactions.
  Compresses noisy command outputs (git, npm, cargo, tests, linter) by 60-90% before context consumption.
  Also provides rules for state management and clean execution patterns.
argument-hint: "[on|off|status]"
license: MIT
---

# RTK (Rust Token Killer) & Terminal Compression

Filter and compress terminal and tool outputs to prevent context bloat.

## Rules

1. **Compress Terminal Noise:** Strip decorative ASCII borders, progress bars, success noise, and duplicated logs from CLI output.
2. **Decisive Error Quoting:** When commands or builds fail, quote only the root error line, file path, and line number. Skip hundred-line stack traces if first 3 lines locate the fault.
3. **Selective Git & Diffs:** Only output modified file names or concise diff hunks rather than dumping full files or complete git history.
4. **Clean Command Execution:** Run compact commands that output only needed fields (e.g., specific flags, filtered queries).
5. **Escape Hatch:** If raw uncompressed output is needed for debugging, bypass filtering explicitly.
