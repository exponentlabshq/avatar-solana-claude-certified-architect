## Domain 3: Claude Code Configuration & Workflows

*20% of scored content*

---

### Iroh Opens Domain 3

Sit with me a moment before we enter this domain. What you are about to study is not a collection of file paths and syntax rules — though we will attend carefully to those. What you are about to study is the formal cause applied to Claude Code itself.

In my philosophical studies, I came to understand that the Form of a thing — its essential organizing principle — is not separate from what the thing does. The Form *is* the thing, in its essential character. A tea leaf is not wood and not stone; it is tea, because its Form organizes its matter into the kind of thing that, steeped in hot water, produces something worth drinking. Change the Form, and you change the tea.

The CLAUDE.md hierarchy is a formal cause system. What Claude Code *is* in your project — what it knows, what it attends to, what conventions it carries into every file it touches — is constituted by what its configuration files say it is. You change the formal cause; you change the behavior. This is not metaphor. It is the architecture's actual logic.

The Order of the White Lotus operates through exactly this principle. What any member *is* in any context — soldier, scholar, sage, strategist — is determined by the charter they carry and the context in which they operate. Grand Lotus commands from the project level. Local cells operate with directory-level instructions. My private teachings to Zuko were user-level knowledge: personal, portable with me, never written into the shared scrolls of any particular campaign.

The figure/ground diagnostic for Domain 3, which I ask you to carry with you through every question: the CLAUDE.md hierarchy *is* the ground structure. User settings are universal ground — they apply wherever you go. Project settings are contextual ground — they apply to this project. Directory settings are local ground — they apply here, in this location, for this work. When configuration is missing or placed in the wrong level, Claude's behaviors lose their grounding and drift. The figure cannot hold its shape without the ground beneath it.

Mark this well: configuration without scope is instruction without address. The right knowledge must be in the right place.

---

### Task Statement 3.1: CLAUDE.md Hierarchy and Scoping

The CLAUDE.md system organizes Claude Code's configuration across three distinct levels, each with its own scope and purpose. Understanding where instructions live is as important as knowing what those instructions say.

**The Three Levels**

The *user level* lives at `~/.claude/CLAUDE.md`. Instructions here apply to every session that user runs, regardless of which project they are working in. This is personal knowledge — portable, universal, entirely belonging to the individual. Critically: these instructions are *not* shared with teammates via version control. A new team member who clones your repository will not receive anything you have placed in your user-level CLAUDE.md. They must configure their own, or look elsewhere.

The *project level* lives at `.claude/CLAUDE.md` or at the root `CLAUDE.md` of the project. This is shared knowledge — committed to version control, available to every developer who works in this codebase. Project-level instructions establish the shared ground: the conventions, the standards, the expectations that every Claude session in this project will carry.

The *directory level* is a CLAUDE.md file placed within a subdirectory. These instructions apply when Claude is working within that directory, giving you the ability to establish local ground for specific parts of the codebase that have their own character and requirements.

**Modular Organization**

Rather than maintaining a single monolithic CLAUDE.md that grows unwieldy, two organizing patterns serve well. The `@import` syntax allows you to reference external files — so a package's CLAUDE.md might import the standards file most relevant to its domain, keeping each file focused. The `.claude/rules/` directory provides an alternative: topic-specific rule files (testing.md, api-conventions.md, deployment.md) that Claude Code assembles rather than a single overgrown document.

The `/memory` command verifies which memory files are currently loaded. When a session behaves inconsistently — when you cannot understand why Claude Code is ignoring instructions that should be present — the `/memory` command is your first diagnostic tool. You may find the instructions are in the wrong ring of the hierarchy entirely.

**The Fire Nation Chain of Command — and Its Important Difference**

The hierarchy here has the shape of a chain of command. Fire Lord Ozai's absolute decree applies to every part of the empire — that is the user-level setting: personal, highest authority, applies to all contexts. Azula's operational orders for the Earth Kingdom campaign apply to that campaign — project-level settings: shared with the team, apply to this project. An individual soldier's tactical instructions for a specific engagement — directory-level CLAUDE.md: local, specific, contextual.

But here I must offer you an important correction that the exam will test through distractors designed to exploit confusion. Unlike Ozai's empire, the CLAUDE.md hierarchy's authority does not derive from domination. User settings are personal — they do not override project settings in a hierarchy of dominance. They apply in a hierarchy of *scope*. The user-level configuration is not more authoritative than the project level; it is simply more personal. A user-level instruction that contradicts a project-level instruction creates ambiguity, not resolution. They occupy different rings of scope, not a single chain of power.

The teammate who does not receive your team's coding standards may have looked in the wrong place — they searched the project level and found nothing, when in fact you placed the instructions in your personal user-level file, which version control never sees. The Order of the White Lotus does not allow a grand strategy to exist only in one member's private notes.

---

**Practice Questions — Task Statement 3.1**

**Question 1.** Your team's Claude Code setup includes detailed project conventions in `~/.claude/CLAUDE.md`. A new engineer joins, clones the repository, and reports that Claude Code is ignoring all conventions and behaving inconsistently with how it works for existing team members. What is the most likely cause?

A) The new engineer's Claude Code installation is outdated and does not read CLAUDE.md files.
B) The team's conventions are in the user-level `~/.claude/CLAUDE.md`, which is not shared via version control, so the new engineer has no corresponding file.
C) The conventions need to be placed in a `.claude/rules/` directory to take effect.
D) Directory-level CLAUDE.md files override project-level configuration, so the new engineer's empty directory settings are suppressing the team conventions.

**Correct Answer: B.** User-level CLAUDE.md at `~/.claude/CLAUDE.md` is personal to each user and is not shared via version control. New team members do not receive it when they clone the repository. Project-level configuration at `.claude/CLAUDE.md` or the root `CLAUDE.md` is version-controlled and shared. The instructions are in the wrong ring of the hierarchy.

---

**Question 2.** Your monorepo has three distinct packages: a React frontend, a Node.js API, and a Python data pipeline. Each package has different coding conventions. You want Claude Code to automatically apply the relevant conventions when working in each package, without loading all three packages' standards simultaneously. Which approach achieves this most effectively?

A) Create a single root `CLAUDE.md` with all three packages' conventions under labeled headers, and instruct Claude to read only the relevant section.
B) Create a `.claude/rules/` file for each package's conventions with YAML frontmatter specifying the appropriate glob paths, so each rule loads only when editing matching files.
C) Place a CLAUDE.md file in each package directory containing that package's conventions, so the directory-level configuration applies when Claude works in each package.
D) Create a user-level `~/.claude/CLAUDE.md` that imports the relevant package conventions based on the current working directory.

**Correct Answer: C** — directory-level CLAUDE.md files placed in each package subdirectory will apply when Claude Code works within that directory. Option B is also a valid approach (and is the exam's preferred answer when test files span multiple directories), but for package-by-package conventions that are cleanly separated by directory, directory-level CLAUDE.md files are the natural fit. Note: if conventions must apply to files *spread across* directory boundaries (for example, test files throughout the codebase), the `.claude/rules/` glob pattern approach in Option B is the correct choice. Know which situation you are diagnosing.

---

### Task Statement 3.2: Custom Slash Commands and Skills

Custom slash commands and skills extend Claude Code with project-specific and personal workflows. Understanding their scoping — and the particular mechanics of the `context: fork` option — is essential for the exam.

**Commands**

Project-scoped commands live in `.claude/commands/` within the repository. These are committed to version control and become available to every developer who works with the project. When you want a `/review` command that runs your team's standard code review checklist — available automatically to anyone who clones the repo — this is where it belongs.

User-scoped commands live in `~/.claude/commands/`. These are personal commands, not shared, available only to you across all your sessions.

**Skills**

Skills live in `.claude/skills/` and are defined by SKILL.md files. Their frontmatter configuration is where the exam precision lives:

- `context: fork` runs the skill in an isolated sub-agent, preventing the skill's output from polluting the main conversation context.
- `allowed-tools` restricts which tools are available during skill execution — useful when a skill should only write files, for example, and you want to prevent destructive actions.
- `argument-hint` prompts developers for required parameters when they invoke the skill without arguments.

Personal skill customization is achieved by creating variants in `~/.claude/skills/` with different names. This lets you modify a skill's behavior for your own use without affecting teammates who depend on the shared version.

The distinction between skills and CLAUDE.md instructions is worth holding clearly: CLAUDE.md instructions are always loaded — they constitute the ground for every session. Skills are on-demand — they are invoked when needed and run their workflow in response.

**The Kyoshi Warriors — Two Principles in One Story**

The Kyoshi Warriors' discipline illuminates two of this section's most important distinctions.

The Warrior Code governs all Kyoshi Warriors regardless of context — that is CLAUDE.md: always present, always operative. The specific mission orders for the Ba Sing Se infiltration apply to that assignment — project settings, version-controlled, shared with the team assigned to this work. The detailed tactics for a specific engagement — directory-level CLAUDE.md: local, contextual, precise. And the personal variations in fighting style that each warrior maintains privately — user-scoped personal skills in `~/.claude/skills/`: not shared, entirely their own.

Now consider what Suki's warriors did inside Ba Sing Se. They operated in a self-contained cell, completing their mission in isolation from the broader context of the operation. They executed their task, gathered their results, and reported back to Aang without the intermediate work of their infiltration contaminating the broader mission context. This is precisely what `context: fork` achieves. The skill runs in its own isolated sub-agent. The verbose exploration it conducts — the codebase analysis, the brainstorming, the discovery work — does not accumulate in your main conversation. When the skill completes, its summary returns to you, clean and useful, without having crowded out the context you need for subsequent work.

A codebase analysis skill that runs without `context: fork` will fill your main session with discovery output. Run with `context: fork`, the same skill completes its mission in isolation and hands you only what you need to proceed.

---

**Practice Questions — Task Statement 3.2**

**Question 3.** You are building a skill that explores a large codebase to identify all API surface points. The exploration produces several hundred lines of intermediate findings. You want to use this skill regularly, but you have noticed that invoking it consumes so much of your main conversation's context that subsequent questions about the codebase receive worse answers. What configuration change most directly addresses this?

A) Add the skill to `.claude/commands/` instead of `.claude/skills/` to reduce its context footprint.
B) Add `context: fork` to the skill's SKILL.md frontmatter so it runs in an isolated sub-agent, preventing verbose output from polluting the main conversation.
C) Add `allowed-tools: [Read, Grep, Glob]` to the skill's frontmatter to limit the number of tools it can use during exploration.
D) Move the skill to `~/.claude/skills/` so it runs with reduced permissions in a personal context.

**Correct Answer: B.** `context: fork` runs the skill in an isolated sub-agent. The skill's verbose intermediate output stays in the isolated context; only the summary returns to the main conversation. This is the architectural purpose of the `context: fork` option — precisely this class of problem.

---

**Question 4.** A developer on your team has a personal variation of the team's `/test-coverage` skill that uses different output formatting they find easier to read. They want to maintain their personal version without changing the shared team skill or affecting teammates. What is the correct approach?

A) Modify the shared skill in `.claude/skills/` and add a conditional in the SKILL.md frontmatter to output different formats based on the invoking user's username.
B) Create a personal variant in `~/.claude/skills/` with a different name (e.g., `/my-coverage`), which will be available only to them and will not affect the shared team skill.
C) Fork the team's repository, modify the skill there, and instruct teammates to pull from the fork when they need the shared version.
D) Create a personal command in `~/.claude/commands/` that overrides the project-level skill by matching the same slash command name.

**Correct Answer: B.** Personal skill customization is achieved by creating variants in `~/.claude/skills/` with different names. The personal skill is available only to that developer, does not affect teammates, and does not require any modification to the shared team configuration.

---

### Task Statement 3.3: Path-Specific Rules

Path-specific rules allow conventions to activate only when Claude Code is editing files that match a glob pattern. This is a more targeted approach than directory-level CLAUDE.md files when conventions must apply to files that are spread throughout the codebase rather than gathered in a single location.

**How They Work**

Rules files live in `.claude/rules/` and use YAML frontmatter with a `paths` field containing glob patterns. A rule file with:

```yaml
---
paths: ["**/*.test.tsx"]
---
```

...will load only when Claude Code is editing a file that matches that pattern. When editing a non-test file, the rule is simply absent — reducing irrelevant context and token usage.

The key advantage over directory-level CLAUDE.md files: a test convention applied via `**/*.test.tsx` activates for every test file in the codebase, regardless of which directory that file lives in. A directory-level CLAUDE.md in `src/components/__tests__/` would not activate for test files in `src/api/__tests__/` or `src/utils/__tests__/`. When your test files are spread throughout a codebase next to the code they test, path-specific rules are the correct tool.

**Toph's Seismic Sense as Path-Specific Rules**

Toph's seismic sense does not respond to everything. It responds to specific vibration patterns in the earth — the signature of an approaching opponent, the composition of a wall, the impurities within processed metal. She does not apply earthbending conventions to waterbending situations. Her perception is precisely scoped to the relevant signal.

Path-specific rules work by the same principle. `paths: ["**/*.test.tsx"]` activates testing conventions when and only when the relevant file type is present. The React component conventions do not activate when you are editing a test file. The API handler conventions do not activate when you are in the database layer. Each rule activates at exactly the moment its pattern is matched — not before, not in irrelevant contexts. Toph would recognize this economy of perception immediately. You sense what is there. You do not sense what is not.

---

**Practice Questions — Task Statement 3.3**

**Question 5.** Your codebase contains test files spread throughout the source tree, co-located with the components they test (e.g., `Button.test.tsx` alongside `Button.tsx`, `api/users.test.ts` alongside `api/users.ts`). You want Claude Code to automatically apply your team's test writing conventions when editing any test file, regardless of its location. What is the correct configuration?

A) Create a CLAUDE.md file in each directory that contains test files, duplicating the test conventions across all locations.
B) Add the test conventions to the root CLAUDE.md file with a note that they apply only to test files, relying on Claude to infer when they are relevant.
C) Create a `.claude/rules/` file with YAML frontmatter specifying `paths: ["**/*.test.tsx", "**/*.test.ts"]`, so the conventions load only when editing matching files anywhere in the codebase.
D) Create a `.claude/skills/` entry for testing conventions that developers invoke manually before writing tests.

**Correct Answer: C.** Path-specific rules with glob patterns in `.claude/rules/` are the correct tool for conventions that span multiple directories. They activate only when editing matching files, work regardless of directory location, and require no manual invocation. Directory-level CLAUDE.md (Option A) would require duplication at every location. Root CLAUDE.md with a note (Option B) relies on inference rather than deterministic matching. A skill (Option D) requires manual invocation, contradicting the requirement for automatic application.

---

**Question 6.** You have a `.claude/rules/` file with the frontmatter `paths: ["terraform/**/*"]` containing your Terraform naming and structure conventions. A developer reports that the conventions are not activating when they edit `infrastructure/terraform/main.tf`. What is the most likely cause?

A) Rules files in `.claude/rules/` only apply to source code files and do not support infrastructure configuration files.
B) The glob pattern `terraform/**/*` does not match files at `infrastructure/terraform/main.tf` because the path begins with `infrastructure/`, not `terraform/`.
C) The YAML frontmatter `paths` field requires absolute file paths, not glob patterns.
D) Path-specific rules only activate for files in the project root directory.

**Correct Answer: B.** The glob pattern `terraform/**/*` will match files whose path begins with `terraform/` — for example, `terraform/main.tf` or `terraform/modules/vpc/main.tf`. It will not match `infrastructure/terraform/main.tf` because that path begins with `infrastructure/`. The correct glob would be `**/terraform/**/*` to match `terraform` at any depth in the directory tree, or `infrastructure/terraform/**/*` to match specifically within that location.

---

### Task Statement 3.4: Plan Mode vs Direct Execution

The choice between plan mode and direct execution is a judgment call, and the exam tests whether you understand the shape of tasks that warrant each approach.

**Plan Mode**

Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, architectural decisions, and multi-file modifications. It enables safe codebase exploration and design before committing to changes — preventing costly rework when the wrong path is chosen before the codebase has been properly understood.

Use plan mode when: restructuring a monolithic application into microservices affecting 45 or more files, migrating a library where different integration approaches have fundamentally different infrastructure requirements, making architectural decisions where the codebase must be explored before a sound approach can be determined.

The Explore subagent is plan mode's companion for intensive discovery phases. It isolates verbose exploration output in its own context and returns a summary to the main conversation, preserving the main context's clarity for coordination and decision-making.

**Direct Execution**

Direct execution is appropriate for simple, well-scoped changes: adding a single validation check to one function, fixing a bug with a clear stack trace and obvious correction, adding a date validation conditional where the requirement is unambiguous. When the change is well-understood, the scope is clear, and there is only one reasonable approach, plan mode adds overhead without adding value.

**Settings.json: User vs Project Scope**

The `settings.json` file follows the same scoping logic as CLAUDE.md. User-level settings live in `~/.claude/settings.json` and apply to all your sessions. Project-level settings live in `.claude/settings.json` and apply to all sessions in that project. One configuration detail the exam may test directly: the `--add-dir` flag appends directories to Claude Code's accessible scope. It does not replace existing directories. If Claude Code can already access `/src` and you run with `--add-dir /scripts`, it now has access to both — not just `/scripts`. Substitution is not the behavior. Addition is.

**The Kyoshi Warriors' Reconnaissance**

Before Suki leads the Kyoshi Warriors into a complex operation, she studies the terrain. She does not send her warriors in without reconnaissance when the operation involves 45 or more coordination points, multiple approach vectors, and decisions that could restructure the entire mission. The reconnaissance is not delay — it is the prevention of costly and potentially irreversible mistakes made under the pressure of mid-execution discovery.

Plan mode is that reconnaissance. You do not commit to the implementation before you understand the landscape.

But for a simple task with a clear scope — sharpening a single sword before a known engagement — you do not convene a reconnaissance mission. Direct execution. The overhead of planning would be greater than the risk of proceeding. The master swordsmith does not deliberate over a single known technique.

---

**Practice Questions — Task Statement 3.4**

**Question 7.** A bug report arrives with a stack trace pointing to a single function in `src/auth/validation.ts`. The trace makes clear that a null check is missing on line 47. What is the appropriate Claude Code approach?

A) Use plan mode to explore the authentication module, understand all related validation logic, and design a comprehensive improvement before making any changes.
B) Use direct execution, since this is a well-scoped single-file change with a clear, unambiguous correction.
C) Use the Explore subagent to survey all null-handling patterns in the codebase before making any changes.
D) Use plan mode because authentication code is sensitive and requires careful planning before modification.

**Correct Answer: B.** The task is well-understood (stack trace is explicit), the scope is clear (one function, one file), and there is one correct approach (add the null check on line 47). Plan mode adds overhead without adding value here. Direct execution is appropriate. Option A's planning step would be appropriate for a broader authentication redesign, not a targeted null check fix.

---

**Question 8.** Your task is to migrate a codebase from library version 2 to version 3. The migration affects approximately 60 files. Library version 3 introduced breaking changes with two distinct migration strategies: an adapter pattern that minimizes code changes but adds runtime overhead, and a direct API migration that is faster at runtime but requires touching every call site. The right strategy depends on the codebase's actual usage patterns. What is the appropriate Claude Code approach?

A) Use direct execution with a comprehensive instruction set that covers both migration strategies, letting Claude choose as it proceeds file by file.
B) Use plan mode to explore the codebase, understand actual usage patterns, evaluate both strategies in context, and design an implementation approach before making changes.
C) Use direct execution on a single representative file to determine which strategy applies, then proceed with direct execution across all 60 files.
D) Use the Explore subagent to gather usage data, then proceed with direct execution on all files simultaneously.

**Correct Answer: B.** This task has all the markers for plan mode: large-scale change (60 files), multiple valid approaches (two migration strategies with different tradeoffs), an architectural decision that depends on codebase exploration (the right strategy depends on actual usage patterns). Plan mode enables exploration and design before committing to a path that would be costly to reverse. Option C's sampling approach is insufficient — a single representative file may not reveal the usage patterns that determine which strategy is correct across the full codebase.

---

**Question 9.** You configure Claude Code with the command `claude --add-dir /scripts`. Your Claude Code already has access to `/src` and `/tests` through existing configuration. What is the effect of the `--add-dir` flag?

A) Claude Code's accessible scope is replaced with `/scripts` only; it loses access to `/src` and `/tests`.
B) Claude Code's accessible scope is expanded to include `/scripts` in addition to the already-accessible `/src` and `/tests`.
C) The flag creates a new isolated session that only has access to `/scripts`.
D) The flag adds `/scripts` to the CLAUDE.md hierarchy as a directory-level configuration source.

**Correct Answer: B.** The `--add-dir` flag appends directories to Claude Code's accessible scope. It does not replace existing directories. The result is access to `/src`, `/tests`, and `/scripts` simultaneously.

---

### Task Statement 3.5: Iterative Refinement

Iterative refinement is the practice of progressively improving Claude Code's output through structured feedback, concrete examples, and deliberate iteration patterns.

**Concrete Input/Output Examples**

When natural language descriptions of a required transformation produce inconsistent results — Claude interprets the instruction slightly differently each time, producing varied output formats or handling edge cases differently — the remedy is concrete examples. Two to three complete demonstrations of the transformation, showing the full input and the exact expected output, give Claude Code a pattern to match rather than an abstraction to interpret. The model generalizes from the concrete examples to novel inputs.

**Test-Driven Iteration**

Write the test suite first, covering expected behavior, edge cases, and performance requirements. Then share the test failures with Claude Code as the feedback mechanism for each iteration. This is more precise than natural language feedback: "these five tests fail, here is the output you produced, here is what was expected" gives Claude Code specific, unambiguous information about where the implementation diverges from requirements.

**The Interview Pattern**

For complex implementations in unfamiliar domains, have Claude Code ask clarifying questions before it implements. This surfaces design considerations — cache invalidation strategies, failure modes, edge cases in the requirements — that you may not have anticipated in your initial description. The interview happens before implementation, not during it.

**When to Batch vs When to Sequence**

Provide all interacting issues in a single message when the fixes interact with each other — when addressing one issue affects how another should be addressed. Provide issues sequentially when they are independent — when each fix can be evaluated and confirmed before the next is addressed. Bundling independent issues creates confusion about which fix corresponds to which outcome. Separating interacting issues creates instability where a partial fix changes the context for the next.

**Piandao's Teaching**

Master Piandao did not describe the sword in abstract terms. When he taught Sokka the forms of swordsmanship, he demonstrated — concrete execution of each technique, performed with full precision, allowing Sokka to see the complete form before attempting it himself. He showed three or four demonstrations of each technique, each one a complete example from which a capable student could generalize to novel situations.

Few-shot examples are Piandao's demonstrations. You do not tell the model "produce output that is well-formatted and handles edge cases gracefully." You show it. You demonstrate two or three complete instances of the transformation — input and output, including one or two edge cases — and the model generalizes. The student's mind forms the pattern from the demonstration. Abstract instruction produces inconsistent results; concrete demonstration produces consistent ones.

Piandao knew that a student who has watched the form performed does not merely match the specific demonstration — they internalize the underlying pattern and can apply it to swords they have never held, in situations they have never practiced. This is the power of the concrete example over the abstract rule.

---

**Practice Questions — Task Statement 3.5**

**Question 10.** Your Claude Code prompt asks the assistant to "refactor function signatures to follow our team's naming conventions." The output is inconsistent across sessions — sometimes it applies the convention correctly, sometimes it misinterprets which part of the signature should be renamed. What is the most effective way to improve consistency?

A) Add "be precise and consistent" to the prompt instruction to emphasize the importance of consistent output.
B) Provide two or three concrete input/output examples showing a function signature before and after correct refactoring, demonstrating the specific transformation expected.
C) Switch to plan mode so Claude Code deliberates before making each change.
D) Add a detailed prose description of the naming convention, covering all edge cases in writing.

**Correct Answer: B.** Concrete input/output examples are the most effective technique for achieving consistent transformation behavior when prose descriptions produce inconsistent results. Option A adds a vague instruction that does not provide the information needed to resolve the ambiguity. Option D's prose description is the type of instruction that has already proven inconsistent — more prose does not resolve the inconsistency.

---

**Question 11.** You have identified three issues with a data migration script: (1) a null handling bug that causes crashes on empty fields, (2) a logging format inconsistency that makes log parsing fail, and (3) an off-by-one error in the pagination logic. The null handling fix changes how the data is structured before it reaches the pagination logic. How should you provide these issues to Claude Code?

A) Provide all three issues in a single message, since the null handling fix interacts with the pagination logic.
B) Provide each issue in a separate sequential message, fixing and verifying each one before moving to the next.
C) Provide the logging issue first (since it is independent), then all remaining issues together.
D) Address only the most severe issue (the crash) and leave the others for a future session.

**Correct Answer: A.** The null handling fix changes how data is structured before it reaches the pagination logic, which means these two fixes interact. When issues interact, providing them together in a single message allows Claude Code to reason about their relationship and implement consistent fixes that account for the interaction. The logging inconsistency is independent, but the two interacting issues make a single-message approach correct here. Option C's partial grouping does not fully address the interaction between the null handling and pagination fixes.

---

### Task Statement 3.6: CI/CD Integration

Claude Code can be integrated into automated pipelines, but doing so requires specific configuration to prevent interactive hangs and produce machine-readable output.

**The -p Flag**

The `-p` (or `--print`) flag runs Claude Code in non-interactive mode. It processes the prompt, outputs the result to stdout, and exits without waiting for user input. Without this flag, a pipeline invocation of Claude Code will hang indefinitely, waiting for interactive confirmation that never comes in an automated environment. This is the single most critical configuration detail for CI/CD integration.

**Structured Output**

`--output-format json` combined with `--json-schema` produces structured, machine-parseable output from Claude Code. In a CI context, this enables automated posting of findings as inline pull request comments, routing findings by severity, and integration with downstream systems that expect structured data rather than prose.

**CLAUDE.md in CI**

The same CLAUDE.md files that configure Claude Code for interactive use also configure it in CI. When Claude Code is invoked by a pipeline, it reads the project-level CLAUDE.md and receives the project context: testing standards, fixture conventions, review criteria, available test utilities. This means your CI invocation of Claude Code does not require a long, duplicated system prompt — the project context is already in the CLAUDE.md that version control shares with the pipeline.

**Independent Review Instances**

A Claude Code session that generated code retains the reasoning context from that generation. When asked to review what it just wrote, it approaches the review with the same mental model it used to produce the code — making it less likely to question its own decisions, less likely to notice that an assumption was wrong, less likely to catch subtle issues that an outside perspective would surface immediately. An independent Claude Code instance, invoked without the generator's conversation history, approaches the review fresh. It is more effective at catching subtle issues precisely because it does not carry the generator's context.

**The Day of Black Sun**

The Day of Black Sun eclipse operated on a precise schedule, independent of any individual's readiness or preference. The invasion force executed its plan automatically when the eclipse arrived. There was no interactive confirmation. There was no pause to ask whether conditions were ideal. The plan ran when the trigger was met, completed its work, and reported results.

CI/CD is the same architecture. The pipeline runs when triggered — a commit, a pull request, a scheduled time. It cannot pause for interactive input. It completes its task and exits. The `-p` flag is the eclipse protocol: it tells Claude Code to operate on the schedule, without waiting for anyone to confirm readiness. Without it, the pipeline waits for a response that will never come. The eclipse ends, and the invasion has not begun.

---

**Practice Questions — Task Statement 3.6**

**Question 12.** Your CI/CD pipeline runs Claude Code with the command `claude "Review this pull request for security vulnerabilities"`. The pipeline job hangs indefinitely. What is the correct fix?

A) Add `CLAUDE_HEADLESS=true` as an environment variable before the command.
B) Add the `-p` flag: `claude -p "Review this pull request for security vulnerabilities"`.
C) Redirect stdin from `/dev/null` to prevent interactive input requests.
D) Add the `--ci` flag to enable continuous integration mode.

**Correct Answer: B.** The `-p` (or `--print`) flag is the documented mechanism for running Claude Code in non-interactive mode. It processes the prompt, outputs to stdout, and exits without waiting for user input. Options A, C, and D reference features that do not exist in Claude Code or address the problem through workarounds that do not properly integrate with Claude Code's operation.

---

**Question 13.** Your pipeline runs a Claude Code review session that generates code, and then in the same session asks Claude Code to review what it just generated. The reviews consistently miss subtle architectural issues. What architectural change would most improve review quality?

A) Add "review carefully and identify all subtle issues" to the review prompt.
B) Use a separate, independent Claude Code instance with no prior context from the generation session to conduct the review.
C) Extend the review prompt with the full code generation history so the reviewer has complete context.
D) Run the review three times in the same session and report only issues that appear in at least two runs.

**Correct Answer: B.** A model that generated code retains its reasoning context from generation, making it less likely to question assumptions it just made. An independent review instance — without that context — approaches the review fresh and is more effective at catching subtle issues. Option C compounds the problem by providing even more of the generation reasoning. Option A adds an instruction that cannot overcome the fundamental limitation of self-review.

---

### Domain 3 Summary

| Topic | Exam-Critical Detail |
|---|---|
| CLAUDE.md hierarchy | Three levels: user (`~/.claude/`), project (`.claude/` or root), directory (subdirectory) |
| User-level sharing | NOT shared via version control — new teammates must configure separately |
| @import syntax | References external files for modular CLAUDE.md organization |
| `.claude/rules/` | Topic-specific rule files as alternative to monolithic CLAUDE.md |
| `/memory` command | Verifies which memory files are loaded — first diagnostic for inconsistent behavior |
| Commands scope | `.claude/commands/` = project (version-controlled); `~/.claude/commands/` = personal |
| Skills | `.claude/skills/` with SKILL.md frontmatter: `context: fork`, `allowed-tools`, `argument-hint` |
| `context: fork` | Runs skill in isolated sub-agent; verbose output stays isolated, summary returns |
| Path-specific rules | `.claude/rules/` + YAML `paths` glob patterns; activates only for matching files |
| Glob patterns | `**/*.test.tsx` matches test files anywhere; directory CLAUDE.md is directory-bound |
| Plan mode | Complex tasks: large-scale, multi-valid-approach, architectural, multi-file |
| Direct execution | Well-scoped, single-file, unambiguous correction |
| `--add-dir` | Appends directories to accessible scope — does not replace |
| `-p` / `--print` | Non-interactive CI/CD mode — prevents pipeline hangs |
| Independent review | Separate instance without generator context; more effective than self-review |

*Iroh closes Domain 3:* The configuration is the formal cause. Get it right, and everything Claude does in your project flows from a sound foundation — every file it touches carries the right knowledge, every convention it applies was correctly placed. Get it wrong, and behaviors drift without explanation, instructions vanish into the wrong ring of the hierarchy, and teammates wonder why their session behaves nothing like yours. The Order of the White Lotus did not allow its wisdom to be lost because someone wrote it in the wrong scroll. Neither should you. Rest. Let the configuration settle. Domain 4 awaits — and it is the domain of the prompt itself.

---

## Domain 4: Prompt Engineering & Structured Output

*20% of scored content*

---

### Iroh Opens Domain 4

The prompt is the efficient cause of every model response. I want you to understand what this means before we attend to a single technical detail.

In my philosophical studies of the Four Causes, I came to understand the efficient cause as the agent — what initiates the transformation. In the billiard game, the cue is the efficient cause of the ball's motion. In the brewing of tea, the heat applied to the water is the efficient cause of the steeping. In my own transformation from the Dragon of the West to the man who tends the Jasmine Dragon — that story has many efficient causes, beginning with the death of my son. The efficient cause is what makes the thing happen.

The prompt is the efficient cause of what the model produces. Its character — its precision, its structure, its examples, its explicit criteria — determines whether the final cause (accurate output, reliable structure, consistent behavior) is achieved. A vague efficient cause produces diffuse effects. When I described lightning to Zuko in abstract terms, he could not replicate it. When I demonstrated the precise inner state required — the exact separation of yin and yang, the path of the energy through the body's center — he began to understand. The prompt engineer's craft is exactly the craft of the efficient cause: attending carefully to the character of the instruction so that the effect it initiates is the one you intend.

The figure/ground diagnostic for Domain 4: the prompt is figure — visible, in the foreground, what the model reads. The structural output schema is ground — the form that makes the output reliable, the structure beneath the surface that determines what can emerge. You cannot achieve reliable structured output through prompts alone. The schema is the ground. `tool_choice` forced selection is the mechanism that ensures the ground is activated, not merely suggested. A schema without forced selection is a ceremony that the celebrant may choose not to perform.

---

### Task Statement 4.1: Prompt Design with Explicit Criteria

Vague instructions produce vague results. "Check that comments are accurate" does not tell the model which comments warrant a finding, how severe a discrepancy must be to merit reporting, or what to do when a comment describes intent rather than current behavior. The model must fill in these gaps from its own judgment — and its judgment will be inconsistent across sessions, leading to the false positive rates and inconsistent findings that undermine developer trust.

**Explicit Criteria Over Vague Confidence Thresholds**

The exam tests a precise distinction: specific categorical criteria outperform confidence-based filtering. "Flag comments only when claimed behavior contradicts actual code behavior" is categorical — it defines a specific class of finding with clear boundaries. "Only report high-confidence findings" is confidence-based — it asks the model to filter by an internal confidence score that is not calibrated, not consistent, and does not tell the model which categories of finding are genuinely useful.

General hedging instructions such as "be conservative" or "use good judgment" have been shown not to improve precision compared to specific categorical criteria. They delegate the judgment to the model without providing the information the model needs to exercise that judgment well.

**False Positives and Trust**

High false positive rates do not merely represent wasted developer time. They destroy trust in the categories where the model is accurate. When developers cannot distinguish real findings from noise, they dismiss everything — including the findings that matter. The practical remedy is specific: define which issues to report (bugs that affect runtime behavior, security issues with specific evidence), which to skip (style preferences, local patterns without formal documentation), and what severity means (concrete code examples for each severity level). Temporarily disabling high false-positive categories while improving their prompts can restore trust in the categories that remain.

**Katara in the Crystal Catacombs**

In the Crystal Catacombs beneath Ba Sing Se — this was Book 2, the chapter before the fall of the city, before the series finale's events — Katara healed Aang after Azula's lightning struck him. She had carried spirit water from the North Pole for precisely this moment, that small vial preserved throughout the entire journey. She did not pour healing energy randomly. She assessed with precision: what is the nature of this wound? What resource is required? What does "healed" look like in this specific case, with this specific damage, with this particular resource that cannot be replenished?

Only then, with absolute clarity about what success required, did she use her last spirit water.

The prompt engineer's work is the same art. You do not instruct "heal this code" and hope the model recognizes what healing means. You define: what constitutes a real bug (criterion, with concrete examples), what constitutes a style preference (excluded category), what constitutes a security issue (criterion with specific evidence requirements). Katara's precision with her last drop of spirit water is the prompt engineer's precision with every token in the context window. You do not spend what cannot be replenished without knowing exactly what it is for.

---

**Practice Questions — Task Statement 4.1**

**Question 14.** Your CI code review pipeline produces a high false positive rate in the "comment accuracy" category: it flags 30% of comments across the codebase, most of which are style preferences or intent-describing comments that developers find unhelpful. Developers are beginning to dismiss all review output, including the security findings that matter. What is the most effective first step?

A) Add "be conservative and only flag high-confidence issues" to the review prompt.
B) Replace the vague "check that comments are accurate" instruction with the specific criterion "flag comments only when the claimed behavior directly contradicts what the code actually does at runtime."
C) Disable the comment accuracy review entirely and focus exclusively on security issues.
D) Increase the model's temperature setting to reduce overconfidence in borderline cases.

**Correct Answer: B.** Specific categorical criteria — defining exactly which findings warrant a flag — outperform confidence-based hedging. Option A ("be conservative") is precisely the type of instruction the exam identifies as ineffective compared to categorical criteria. Option C discards a useful category rather than improving it. Replacing the vague instruction with a precise criterion (claimed behavior contradicts actual runtime behavior) directly reduces false positives by defining a narrower, more meaningful class of finding.

---

**Question 15.** You want your code review prompt to classify findings by severity. Developers need to prioritize which findings to address first. Which approach most effectively achieves consistent severity classification?

A) Instruct the model to "assign severity based on impact and risk, using its best judgment for each finding."
B) Provide explicit severity levels with concrete code examples demonstrating what qualifies as each severity — including a critical example (data loss or security breach), a high example (runtime crash with recoverable state), and a low example (style deviation from convention).
C) Ask the model to assign a severity score from 1 to 10 and let teams determine their own threshold for action.
D) Instruct the model to flag all findings as the same severity and let developers triage manually.

**Correct Answer: B.** Explicit severity criteria with concrete code examples for each severity level achieve consistent classification. Option A delegates the judgment to the model without providing the information it needs for consistent calibration. Option C's numeric score is not anchored to defined criteria and will be inconsistent across sessions and findings.

---

### Task Statement 4.2: Few-Shot Prompting

Few-shot examples are the most effective technique for achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results. The principle is straightforward: you show, you do not merely tell.

**What Few-Shot Examples Achieve**

Two to four targeted examples for ambiguous scenarios — each one demonstrating the full reasoning for why a particular action was chosen over plausible alternatives — allow the model to generalize its judgment to novel patterns rather than matching only the pre-specified cases. This generalization is the key property. A few-shot example that demonstrates how to handle an inline citation allows the model to handle a footnote citation correctly, even though footnotes were not in the examples, because the underlying pattern — a claim requires a source, whether the source is inline or in the footnotes — has been demonstrated.

Few-shot examples are particularly effective for:

- Extraction tasks where document structure varies (the model must handle both inline citations and bibliography sections, narrative descriptions and structured tables).
- Ambiguous-case handling — where the task requires judgment about borderline inputs.
- Reducing hallucination by demonstrating how to handle missing information (showing the model returning null rather than fabricating a value when a field is absent from the source document).

---

**Practice Questions — Task Statement 4.2**

**Question 16.** Your structured data extraction prompt uses detailed instructions to describe how to handle citations. When source documents use inline citations, extraction works well. When documents use end-of-section bibliographies, the model frequently misses citations or returns null for the citation field. What is the most effective remedy?

A) Add another paragraph of prose instructions explaining the difference between inline citations and bibliography sections.
B) Add two to three few-shot examples demonstrating correct extraction from documents that use bibliography-style citations, showing the correct output format for each.
C) Create a separate extraction prompt specifically for documents with bibliography-style citations and use a classifier to route documents.
D) Set `tool_choice: "any"` to ensure the extraction tool is always called.

**Correct Answer: B.** Few-shot examples demonstrating correct extraction from varied document structures allow the model to generalize the extraction pattern to novel structural forms. Option A adds more prose to instructions that have already proven insufficient for this structural variation. Option C is over-engineered when examples addressing the specific variation are available.

---

### Task Statement 4.3: Structured Output via Tool Use

Tool use with JSON schemas is the most reliable approach for guaranteed schema-compliant structured output. It eliminates JSON syntax errors — malformed output, missing brackets, improperly escaped strings — entirely. When the model is required to populate a defined schema as a tool input, the structured output is produced by the tool call mechanism, not by text generation.

**tool_choice Configuration**

Three modes govern when and whether the model uses tools:

- `tool_choice: "auto"` — the model may call a tool or may return conversational text. Use this when tool use is optional.
- `tool_choice: "any"` — the model must call *some* tool but may choose which one. Use this when you need guaranteed structured output and multiple extraction schemas exist, with the document type unknown.
- Forced tool selection (`{"type": "tool", "name": "extract_metadata"}`) — the model must call a specific named tool. Use this when a particular extraction must run before subsequent steps.

**What Strict Schemas Eliminate — and What They Do Not**

Strict JSON schemas via tool use eliminate syntax errors. They do not prevent semantic errors: line items that do not sum to the stated total, values placed in the wrong fields, dates formatted correctly but referencing impossible calendar entries. Semantic validation requires explicit business logic — extracting both a `calculated_total` and a `stated_total` and flagging discrepancies, for example.

**Schema Design**

Fields that source documents may not contain should be marked nullable. A required field that the source document does not contain will cause the model to fabricate a value rather than return null — nullable fields are the mechanism that prevents this hallucination. Enum fields benefit from an "other" plus detail string pattern for categories that cannot be exhaustively specified in advance. This preserves precision for known categories while gracefully handling novel ones.

**The Dancing Dragon Ceremony**

When Aang and Zuko stood before the dragons Ran and Shaw and performed the Dancing Dragon, they did not interpret the ceremony loosely. Every movement, every position, every transition executed precisely as the ancient practitioners had handed it down. The ceremony's form was not decorative. The form *was* the mechanism by which the sacred was constituted. Deviation would not have produced a different version of the ceremony. Deviation would have broken what the ceremony creates.

JSON schema enforcement is the Dancing Dragon. The schema is not decorative structure laid over the output. The schema *is* the formal cause of the output — the organizing principle that makes the result reliable, machine-parseable, and trustworthy. `tool_choice` forced selection is the ritual entrance: the acknowledgment that you cannot begin without performing the designated ceremony. You cannot achieve the outcome of the Dancing Dragon by approximately performing it, or by substituting an improvised alternative, or by describing in prose what the movements should look like. The form must be executed precisely for what it creates to exist.

---

**Practice Questions — Task Statement 4.3**

**Question 17.** Your extraction pipeline processes invoices of unknown types. For each invoice, you have two possible extraction tools: `extract_standard_invoice` and `extract_purchase_order`. You need to guarantee that the model always calls one of these tools rather than returning conversational text describing the document. Which `tool_choice` setting achieves this?

A) `tool_choice: "auto"` — the model selects the appropriate tool or returns text as needed.
B) `tool_choice: "any"` — the model must call a tool but may choose which one is appropriate for the document type.
C) `tool_choice: {"type": "tool", "name": "extract_standard_invoice"}` — forces the standard invoice extraction regardless of document type.
D) Omitting `tool_choice` — the model will default to using tools when they are available.

**Correct Answer: B.** `tool_choice: "any"` guarantees the model calls *some* tool without specifying which one — appropriate when multiple extraction schemas exist and the document type is unknown. Option A allows the model to return text instead of calling a tool. Option C forces a specific tool regardless of document type, which is incorrect for unknown document types. Option D's default behavior is not guaranteed structured output.

---

**Question 18.** Your invoice extraction schema includes a `contract_number` field marked as required. For a large portion of invoices, no contract number exists in the document. You begin seeing extracted contract numbers that do not correspond to any contracts in your system. What schema change most directly prevents this behavior?

A) Add a validation step that checks extracted contract numbers against your system and rejects those that do not match.
B) Change the `contract_number` field from required to nullable (optional), so the model can return null when no contract number is present in the source document.
C) Add a few-shot example showing a document without a contract number being extracted with an empty string in the `contract_number` field.
D) Remove the `contract_number` field from the schema entirely and extract it through a separate follow-up request.

**Correct Answer: B.** Making the field nullable allows the model to return null when the information is absent from the source document, rather than fabricating a value to satisfy a required field constraint. This is the schema-design principle that prevents hallucination for fields that may legitimately be absent. Option A is a valid downstream defense but does not address the root cause — the model will still fabricate values and you will waste tokens on extraction and validation for values that could simply be null.

---

### Task Statement 4.4: Validation, Retry, and Feedback Loops

Retry-with-error-feedback is effective for structural and format errors. It is not effective when the required information is simply absent from the source document.

**The Distinction That the Exam Tests**

When a validation error occurs because the output was in the wrong format, a field was placed incorrectly, or a date was formatted inconsistently — a retry that appends the specific validation error to the prompt can guide the model to correct the issue. The information it needs to produce a correct extraction exists in the source document; the model simply applied it incorrectly.

When a validation error occurs because a field's value was expected but the source document simply does not contain that information — retrying will not produce the correct value. The model cannot extract what is not there. It will either produce the same failure, or, worse, begin fabricating a plausible-sounding value to satisfy the retry prompt. Identifying which class of error you are facing is the prerequisite to deciding whether to retry.

The `detected_pattern` field in structured findings supports systematic analysis of false positive patterns. When developers dismiss findings, tracking which code constructs triggered each dismissed finding allows you to identify categories with systematically elevated false positive rates and improve prompts for those categories specifically.

**Sokka's Intelligence Report**

When Sokka's reconnaissance encountered obstacles, he did not return to Aang with a generic "mission failed." That report is useless for recovery. He reported what he attempted, what he found, what he could not access, and what alternative approaches might work given the partial information he had gathered. The coordinator — Aang, in this case — received enough structured information to make an intelligent decision about next steps.

Retry-with-feedback works the same way. You do not retry by saying "try again." You retry by saying: here is the original document, here is the extraction you produced, here is the specific validation error, here is what a correct value should look like. That specific, structured feedback allows the model to understand exactly where its previous attempt diverged from what was needed and to correct it. The feedback that lacks specificity — "the extraction was incorrect, try again" — is as useless as "mission failed."

---

**Practice Questions — Task Statement 4.4**

**Question 19.** Your extraction pipeline validates invoice totals by checking whether line items sum to the stated total. When they do not match, you retry the extraction with the error appended to the prompt. After implementing this retry, you find that semantic mismatches (line items not summing to total) are frequently corrected on retry. But you also notice a category of failures where the `contract_number` field fails validation because no contract number exists in the invoice at all. Should you retry these failures?

A) Yes — retry all failures consistently; the model may find the contract number on re-reading the document more carefully.
B) No — retries are ineffective when the information is simply absent from the source document. Route these cases to a null/absent-field handling path rather than retry.
C) Yes — but add explicit instructions in the retry prompt to "look harder" for the contract number in the document.
D) Yes — but only retry once; if the second attempt fails, accept the failure and move on.

**Correct Answer: B.** Retries are effective for format and structural errors where the information exists in the source document but was applied incorrectly. When the required information is absent from the source document, retries are ineffective — the model cannot extract what is not there. Correctly identifying this failure class and routing it to an absent-field handling path (returning null or flagging for human review) is more effective than wasted retry cycles.

---

**Question 20.** To improve your code review pipeline's false positive rate, you add a `detected_pattern` field to each finding in the structured output. What is the purpose of this field, and how is it used?

A) It allows the model to indicate how confident it is in each finding, enabling confidence-based filtering.
B) It records which code construct or pattern triggered each finding, enabling systematic analysis of which patterns are generating dismissed findings and therefore indicating high false positive categories.
C) It provides a unique identifier for each finding to prevent duplicate reporting across review sessions.
D) It specifies the file path and line number where the finding was detected, enabling precise inline PR comment placement.

**Correct Answer: B.** The `detected_pattern` field records which code constructs trigger each finding. When developers dismiss findings, analyzing which patterns are consistently dismissed reveals categories with systematically high false positive rates. This enables targeted prompt improvement for those specific constructs rather than generic attempts to reduce overall false positives.

---

### Task Statement 4.5: Batch Processing

The Message Batches API offers 50% cost savings for workloads that can tolerate asynchronous processing. The exam tests four specific properties that must all be held together.

**All Four Properties — Required for Exam Precision**

First: 50% cost savings compared to synchronous API calls.

Second: up to a 24-hour processing window. Batch requests may complete sooner, but there is no guaranteed earlier completion time.

Third — this is the property most commonly missed on the exam: **no guaranteed latency SLA**. Batch processing has no commitment about when within the 24-hour window a specific request will complete. You cannot design a system that requires "batch results in approximately 4 hours" and rely on that timing. The only guarantee is the 24-hour maximum.

Fourth: **no multi-turn tool calling support within a single request**. A batch request cannot execute a tool mid-request and return the results to continue the conversation. Each batch item is a single request-response pair.

The `custom_id` field allows correlation between batch requests and responses. When processing large batches with some failures, `custom_id` is the mechanism that identifies which specific requests failed and need resubmission.

**Appropriate Workloads**

Batch processing is appropriate for non-blocking, latency-tolerant workloads: overnight technical debt reports, weekly audit runs, nightly test generation passes, large-scale document processing where results are needed by a specific future time but not immediately. It is not appropriate for blocking workflows: pre-merge checks where developers wait for results, real-time customer-facing interactions, any workflow where the next step cannot begin until Claude's response is in hand.

**Sozin's Simultaneous Strikes**

When Fire Lord Sozin launched his campaign at the start of the Hundred Year War, the attacks on the Air Nomads and the simultaneous strikes against the Earth Kingdom and Water Tribes were submitted together. All attacks dispatched at once. No real-time feedback between fronts — the eastern campaign could not wait for information from the northern campaign before proceeding. No coordination during execution — each front operated independently once launched. No guaranteed timing between them — some Air Temples fell first, others later, based on circumstances at each location, not on a synchronized clock. Results were collected when each front reported back, within the campaign's operational window.

This is the Message Batches API. You submit all requests at once. There is no real-time feedback between batch items — one request cannot use another's results mid-processing. There is no multi-turn tool calling within a single item. The results arrive when each item completes — within 24 hours, but with no guaranteed order or timing between them. And `custom_id` is the mechanism that tells you which front's report you are reading when results arrive.

The tactical commander who understood "all attacks happen independently, simultaneously, with no cross-communication during execution, and results arrive on their own schedule" won the campaign for which that approach was suited. The Message Batches architect who understands these same four properties answers the exam question correctly.

---

**Practice Questions — Task Statement 4.5**

**Question 21.** Your engineering manager proposes switching two CI/CD workflows to the Message Batches API for its 50% cost savings. Workflow A is a blocking pre-merge check: developers wait for results before merging. Workflow B is an overnight technical debt report: results are reviewed by the team the following morning. How should you evaluate this proposal?

A) Switch both workflows to batch processing; developers can poll for results using the `custom_id` field and merge once the batch completes.
B) Switch only Workflow B (overnight technical debt report) to batch processing. Keep Workflow A (pre-merge check) on synchronous calls. Batch processing has no guaranteed latency SLA, making it unsuitable for blocking workflows.
C) Switch both workflows to batch processing with a synchronous API fallback triggered if the batch does not complete within two hours.
D) Keep both workflows on synchronous calls; the 50% cost savings do not justify the architectural complexity of batch processing.

**Correct Answer: B.** The Message Batches API has a 24-hour processing window with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks where developers wait for results. Workflow B's overnight technical debt report is exactly the type of latency-tolerant, non-blocking workload for which batch processing is appropriate. Option A's polling approach does not solve the problem — "often faster" is not a latency guarantee suitable for a blocking workflow.

---

**Question 22.** Your batch processing job submits 500 documents for extraction. Upon completion, 47 documents show failures. Using the `custom_id` field, you identify two categories of failures: 23 documents exceeded the context limit (too large for a single request), and 24 documents failed with schema validation errors where required fields were missing from the source documents. How should you handle each category?

A) Resubmit all 47 failed documents unchanged; the batch system may process them successfully on a second attempt.
B) For the 23 context-limit failures, chunk the documents and resubmit the chunks as separate batch requests. For the 24 missing-field failures, route to a human review queue or null-field handling path — resubmission will not resolve absent information.
C) Resubmit only the 23 context-limit failures with no changes; accept the 24 validation failures as permanent data quality issues.
D) Combine all 47 failed documents into a single large batch and resubmit with a note to "try harder on schema validation."

**Correct Answer: B.** Context-limit failures can be resolved by chunking the oversized documents — the failure is mechanical, not informational, and resubmission with modified input will succeed. Validation failures caused by absent information in source documents cannot be resolved by retry — the information is not in the document, and resubmission will produce the same failure or cause fabrication. The correct path for absent-information failures is null-field handling or human review, not retry.

---

### Task Statement 4.6: Multi-Instance and Multi-Pass Review

The architectural principle behind multi-instance review is epistemological: a reviewer who generated the code is not the same reviewer as one who encounters it fresh.

**Self-Review Limitations**

When a Claude session generates code, it builds up a reasoning context: why certain decisions were made, what alternatives were considered and rejected, what assumptions underlie the implementation. When that same session is asked to review the code it just produced, it approaches the review through the lens of its own reasoning. It is unlikely to question assumptions that led to the code in the first place. Subtle issues — an incorrect assumption about a downstream dependency, a design choice that does not account for an edge case, a performance implication of a structural decision — are precisely the issues that a reviewer carrying the generator's context is least likely to catch.

An independent Claude instance, invoked in a separate session without the generator's conversation history, encounters the code as a reader. It does not know why certain choices were made. It questions them. It notices what is surprising. It is more effective at catching the class of subtle issues that familiarity occludes.

**Multi-Pass Review**

For large pull requests affecting many files, single-pass review produces inconsistent depth: detailed feedback on some files, superficial treatment of others, and sometimes contradictory findings where the same pattern is flagged in one file and approved in another because context has accumulated and attention has diluted. The remedy is splitting the review:

- Per-file passes for local analysis: each file receives focused, consistent attention.
- A separate integration pass: cross-file data flow analysis, interface consistency between modules, and systemic findings that require holding multiple files in attention simultaneously.

---

**Practice Questions — Task Statement 4.6**

**Question 23.** Your code generation pipeline uses a single Claude session to generate code and then review it. Reviews consistently miss subtle architectural issues. What is the most effective structural change?

A) Add "review with extreme care and identify all subtle issues" to the self-review prompt.
B) Extend the self-review prompt with the complete generation history so the reviewer has maximum context.
C) Invoke a second, independent Claude instance without the generator's conversation history to conduct the review.
D) Run the self-review three times and report only findings that appear in at least two of three runs.

**Correct Answer: C.** An independent reviewer without the generator's context is more effective at catching subtle issues precisely because it does not carry the reasoning assumptions of the generation step. Option A cannot overcome the fundamental limitation of self-review. Option B compounds the problem by providing more of the generation reasoning.

---

### Domain 4 Summary and Exam-Tell

| Topic | Exam-Critical Detail |
|---|---|
| Explicit criteria | Categorical criteria ("flag only when X") outperform confidence-based filtering ("be conservative") |
| False positives | High false positive rates destroy trust across all categories, including accurate ones |
| Few-shot examples | 2-4 targeted examples for ambiguous scenarios; enable generalization to novel patterns |
| tool_choice | "auto" may return text; "any" must call some tool; forced must call specific tool |
| Strict schemas | Eliminate syntax errors; do NOT prevent semantic errors (line item totals, wrong fields) |
| Nullable fields | Prevent fabrication when source document lacks information |
| Retry effectiveness | Effective for format/structure errors; ineffective when information is absent from source |
| Batch API: cost | 50% savings |
| Batch API: window | Up to 24 hours |
| Batch API: SLA | NO guaranteed latency SLA — exam-critical property |
| Batch API: tools | No multi-turn tool calling within a single request |
| custom_id | Correlates batch requests to responses; identifies which failed items need resubmission |
| Independent review | Separate session without generator context; more effective than self-review |
| Multi-pass review | Per-file local passes + separate integration pass for cross-file analysis |

*Iroh closes Domain 4:* The prompt is not a wish. It is an instruction of precise character, attended to with care, calibrated through demonstration, and structured with the same discipline that the Dancing Dragon demands. You do not approximate the ceremony and hope for the outcome. You execute the form, and the form produces the result. The master's approach is not more words — it is the right words, in the right structure, with examples that show rather than merely tell. We have one domain remaining. The ground itself awaits.

---

## Domain 5: Context Management & Reliability

*15% of scored content*

---

### Iroh Opens Domain 5

In my years of study — among the waterbenders, the earthbenders, the sages of the White Lotus — I returned again and again to one truth that underlies all the others: before form can emerge, there must be a substrate to receive it.

In the cosmology of the Four Nations, that primordial substrate is chi. Chi is not one element among the four; it is the prime matter from which all four elements differentiate. Chi has no form of its own. It receives all forms. The waterbender who shapes chi into ice and the earthbender who shapes it into moving stone are both working with the same primordial material, given different formal expressions. Without chi, there is nothing to bend. Without the substrate, there is no form.

In the cosmos of the Claude architect, the context window is chi. It is the primordial material of every response — the ground from which answers emerge. The context window has no form of its own. It receives all forms: tool results, conversation history, facts and figures, the accumulated trace of everything the session has encountered. What you put into the context window determines what can emerge from it. Manage the material well, and precise forms emerge. Allow the material to fill with noise and stale fragments, and the forms that emerge will be corrupted by their substrate.

The figure/ground diagnostic for Domain 5: the context window is the ground. Model responses are figures. Figures emerge from what the ground contains. If the ground is polluted — filled with forty-field tool results when five fields are relevant, crowded with verbose discovery output that has outlived its usefulness, missing the critical transactional facts that should anchor every subsequent response — the figures will be corrupted. The context manager's art is ensuring the ground contains exactly what is needed for correct figures to emerge.

---

### Task Statement 5.1: Long Interaction Context Preservation

As conversations extend, context degradation becomes the primary reliability risk. The exam tests specific mechanisms of degradation and specific remedies.

**Progressive Summarization Risks**

Summarizing conversation history to manage token budgets is necessary — but summarization compresses information, and compression has fidelity costs. The specific losses to watch for: numerical values (specific dollar amounts collapse to "a refund was discussed"), dates ("the customer mentioned a specific date" loses the date itself), and customer-stated expectations ("the customer wanted X, not Y" becomes "the customer had a complaint"). When these facts are lost, subsequent responses operate on imprecise ground and may contradict what was committed to earlier in the conversation.

The remedy is extracting transactional facts into a persistent "case facts" block that lives outside the summarized history and is included in each prompt fresh. Specific amounts, order numbers, dates, statuses — placed in a structured block that is not summarized away.

**The "Lost in the Middle" Effect**

Models process information at the beginning and end of long inputs reliably. Information in the middle of long inputs may be underweighted. When structuring aggregated inputs, place key findings summaries at the beginning and organize detailed results with explicit section headers. This is not a workaround for a model weakness — it is architecture that works with the model's actual attention characteristics.

**Tool Result Accumulation**

Tool results accumulate in context across iterations of an agentic loop. A customer lookup that returns forty fields — order history, preference settings, account tier, payment method, internal account notes — when only five fields are relevant to the current interaction, consumes tokens disproportionate to its usefulness. Trimming verbose tool outputs to only the relevant fields, before they accumulate in context, is the correct pattern. This is not lossy compression — it is appropriate selection of what the context window should carry.

**Toph Beifong's Perception — The Master Bisociation**

Toph Beifong does not see faces. She does not see colors, or light, or the visible surface of things. What she perceives is ground — the seismic information that flows through the earth, the vibrations beneath the surface that reveal the structural reality of her environment. Her blindness, which others perceived as limitation, was the efficient cause of her greatest achievement: discovering metalbending. Sighted earthbenders looked at the refined metal cage and saw no earth — the figure (the smooth processed metal surface) showed them nothing. Toph felt beneath the figure to the ground: the trace impurities of earth within the processed metal, present but invisible to sight, accessible to seismic perception. She was already operating at the level of ground.

The context manager's work is Toph's work. You do not manage the figures — the responses, the text, the visible surface of what the model produces. You manage what is beneath: the structural information in the context window that determines what responses are possible. When context fills with verbose tool results — forty-field customer records when five fields are relevant — the ground becomes cluttered. Imagine Toph's seismic sense overwhelmed by noise: competing signals drowning the information she needs. Her perception fails not from weakness but from substrate pollution.

Trim the tool results. Preserve the transactional essentials in a protected "case facts" block. Place key summaries where the model's attention reliably reaches them. Manage the ground. The figures will follow.

---

**Practice Questions — Task Statement 5.1**

**Question 24.** Your customer support agent handles multi-issue sessions. After progressive summarization of conversation history, the agent occasionally contradicts commitments made earlier: referencing "a refund amount" without the specific figure, or acting as if no specific date was promised when the customer stated one. What is the most effective architectural remedy?

A) Increase the context window by switching to a higher-tier model so the full history fits without summarization.
B) Extract transactional facts (specific amounts, order numbers, dates, customer-stated expectations) into a persistent "case facts" block included in each prompt outside the summarized history.
C) Instruct the model to "remember all specific numerical values and dates from the conversation" as a system prompt directive.
D) Disable progressive summarization and rely on the full conversation history for every response.

**Correct Answer: B.** Extracting transactional facts into a persistent structured block outside the summarized history protects the specific values that progressive summarization compresses or loses. This block is included fresh in each prompt, ensuring the model always has access to the specific figures that are critical for session continuity. Option A is expensive and does not address the fundamental issue — even large context windows require management for very long sessions. Option C adds a directive that cannot prevent the compression that occurs during summarization.

---

**Question 25.** Your agentic customer support loop uses a tool that retrieves full customer account records: 47 fields including order history, preference settings, payment methods, account tier, and internal notes. In a typical interaction, only 5-6 fields are relevant to the customer's issue. After 15-20 tool calls in a long session, you observe context degradation and inconsistent responses. What is the most direct architectural remedy?

A) Increase the maximum number of tool calls allowed per session to spread the context accumulation across more iterations.
B) Trim verbose tool outputs to only the relevant fields before they are appended to conversation history, keeping only the return-relevant fields from each lookup.
C) Use a separate context window for tool results, passing only summaries to the main conversation.
D) Replace the customer account lookup with a tool that returns only account metadata, making additional targeted calls for specific field categories as needed.

**Correct Answer: B.** Trimming tool outputs to relevant fields before they accumulate in context is the direct remedy for disproportionate token consumption. A 47-field record consumed in each iteration fills the context window with irrelevant information that degrades subsequent responses. Option D is a valid architectural refactoring but is more complex than trimming the outputs of the existing tool — the exam asks for the most direct remedy.

---

### Task Statement 5.2: Escalation and Ambiguity Resolution

Escalation decisions have clear right answers on the exam, organized around two principles: explicit triggers take priority, and confidence-based proxies are unreliable.

**Appropriate Escalation Triggers**

Three conditions warrant escalation: (1) the customer explicitly requests a human agent — this must be honored immediately, without attempting to resolve the issue first; (2) the policy is ambiguous or silent on the customer's specific situation, creating a gap that the agent cannot resolve without policy guidance; (3) the agent cannot make meaningful progress toward resolution after genuine attempts.

**What Does Not Trigger Escalation**

Negative sentiment does not reliably correlate with case complexity or with the customer's desire for human assistance. A frustrated customer may be easily satisfied by an autonomous resolution. A calm, patient customer may have a request that genuinely requires human judgment. Sentiment-based escalation routes incorrectly in both directions.

Self-reported model confidence scores are not reliable proxies for actual case complexity. The model may be highly confident in an incorrect resolution, or uncertain about a case that is actually straightforward.

**Honoring Explicit Requests**

When a customer explicitly requests a human agent, the correct response is to honor that request immediately — not to attempt investigation first, not to offer to resolve the issue autonomously before escalating, not to acknowledge frustration while making one more attempt. The request is explicit. Honor it.

**Multiple Customer Matches**

When a tool returns multiple customer records matching the provided identifier, the correct response is to request additional identifying information from the customer — not to use heuristics (most recent, closest name match, most likely) to select between records. The exam consistently distinguishes between "ask for clarification" and "make a reasonable inference."

---

**Practice Questions — Task Statement 5.2**

**Question 26.** A customer contacts your support agent and, after a brief exchange, says: "I'd rather just talk to a person about this." What should the agent do?

A) Acknowledge the request and attempt to resolve the issue autonomously first, then escalate only if unable to resolve it.
B) Acknowledge the frustration and offer to resolve the issue before transferring, to give the customer one more opportunity to accept autonomous resolution.
C) Honor the explicit request immediately and transfer the customer to a human agent without attempting further autonomous resolution.
D) Assess the case complexity — if the issue is straightforward, explain to the customer that the agent can handle it efficiently and offer to proceed.

**Correct Answer: C.** When a customer explicitly requests a human agent, that request must be honored immediately. Attempting autonomous resolution first, offering one more chance, or assessing whether the request is warranted are all distractors. The request is explicit. Honor it.

---

**Question 27.** Your agent's `get_customer` tool returns three records matching the customer's name: John Smith with account numbers 11847, 29341, and 47203. The customer has provided only their name. What is the correct agent behavior?

A) Select the account with the most recent activity, as the customer is most likely calling about their primary account.
B) Select the account that matches the customer's stated issue type most closely (e.g., billing issue → account with recent payment activity).
C) Request additional identifying information from the customer (account number, email address, or order number) to determine which record belongs to them.
D) Return an error to the customer stating that the account cannot be located and asking them to call back with their account number.

**Correct Answer: C.** Multiple customer matches require clarification through additional identifying information, not heuristic selection. Selecting based on "most recent activity" or "closest match to the issue type" introduces errors with financial consequences. Requesting the customer's account number, email address, or a recent order number disambiguates correctly without risk.

---

### Task Statement 5.3: Error Propagation in Multi-Agent Systems

Error propagation in multi-agent systems has two anti-patterns that the exam tests against each other.

**The Two Anti-Patterns**

The first anti-pattern is concealment: marking a failure as success, returning empty results where there was actually an error, or catching exceptions and returning generic "no results" responses. Concealment prevents recovery — the coordinator believes a search returned no results when in fact the search never completed, and so proceeds without information it should have, or without knowledge that an alternative approach exists.

The second anti-pattern is propagation without structure: allowing uncaught exceptions to bubble up and terminate the entire workflow, or returning generic error status messages ("search unavailable") that give the coordinator no information on which to base recovery decisions.

**The Correct Pattern**

Subagents implement local recovery for transient failures — retrying with exponential backoff, for example, before concluding the failure is unresolvable. When a failure cannot be resolved locally, the subagent propagates structured error context: the failure type (transient/timeout vs access/permission vs business rule), what was attempted (the specific query or operation), what partial results were obtained, and what alternative approaches might succeed from the coordinator's vantage.

Distinguishing access failures from valid empty results is critical. A search that times out is an access failure — the coordinator should consider whether to retry with a different approach. A search that completes and returns no matches is a valid empty result — the coordinator should proceed knowing that category of information is genuinely absent, not merely inaccessible.

**Sokka's Intelligence Report**

When Sokka's reconnaissance encountered a Fire Nation patrol and could not complete the eastern perimeter survey, he did not return with "mission failed." He reported: searched the eastern perimeter, encountered Fire Nation patrol at grid reference seven, retrieved partial layout of the western approach (attached), recommend northern route as alternative, patrol density suggests comet arrival timing has accelerated the schedule.

The coordinator — Aang — received structured information about what was attempted, what was found, what could not be accessed, what partial results existed, and what alternative approaches were available given the partial information. That is intelligence. "Mission failed" is noise.

Your multi-agent systems need Sokka's intelligence reports, not his absence notice. Failure type, what was attempted, partial results, alternatives — every unresolvable error propagated to the coordinator should carry these four elements.

---

**Practice Questions — Task Statement 5.3**

**Question 28.** Your web search subagent times out while searching for competitor pricing data. Which response most effectively enables intelligent coordinator recovery?

A) Return `{"status": "error", "message": "search unavailable"}` so the coordinator knows the search did not complete.
B) Catch the timeout exception and return `{"status": "success", "results": []}` to prevent the coordinator from receiving an error state.
C) Return structured error context: `{"failure_type": "timeout", "attempted_query": "competitor pricing Q1 2026", "partial_results": [3 results retrieved before timeout], "alternative_approaches": ["try narrower query scope", "check cached pricing database"]}`.
D) Allow the timeout exception to propagate uncaught to the top-level handler, terminating the research workflow.

**Correct Answer: C.** Structured error context — failure type, attempted query, partial results, alternative approaches — gives the coordinator the information it needs for intelligent recovery. Option A provides minimal information ("search unavailable" is not actionable). Option B suppresses the error by marking failure as success, preventing any recovery. Option D terminates the entire workflow unnecessarily.

---

**Question 29.** Your document analysis subagent searches a database for source materials. For one topic area, the database search completes successfully and returns no matching documents. For another topic area, the database connection times out before the search completes. How should the subagent represent these two outcomes in its response to the coordinator?

A) Return empty arrays for both topic areas — the coordinator will infer from downstream synthesis quality that some sources were missing.
B) Mark both as errors so the coordinator can evaluate whether to seek alternative sources for each.
C) Distinguish the two outcomes explicitly: the no-match result is a valid empty result (the database responded, no documents matched), while the timeout is an access failure (the database did not respond). Each should carry its appropriate status and context.
D) Return the no-match result as a success and suppress the timeout error to avoid complicating the coordinator's decision logic.

**Correct Answer: C.** The distinction between access failures and valid empty results is critical. A valid empty result tells the coordinator: we searched, and this information genuinely does not appear to exist in our sources. An access failure tells the coordinator: we could not complete the search, and a different approach (different timing, alternative source, retry) might succeed. Conflating them prevents the coordinator from making appropriate recovery decisions.

---

### Task Statement 5.4: Large Codebase Exploration

Extended codebase exploration sessions are subject to a specific degradation pattern: the model begins referencing "typical patterns" and "common structures" rather than the specific classes and implementations it examined earlier in the session. This is context degradation — the accumulated exploration output has filled the context window, displacing earlier specific findings.

**Scratchpad Files**

The remedy is maintaining scratchpad files that persist findings across context boundaries. When the exploration phase discovers that `RefundProcessor` inherits from `BaseTransactionHandler` and overrides three methods, that finding is written to a scratchpad file. When context is later compacted or a new subagent is spawned, the scratchpad file's contents provide the specific findings that would otherwise be lost to degradation.

**Subagent Delegation for Verbose Exploration**

Spawning subagents to investigate specific questions — "find all test files," "trace the refund flow dependencies," "identify all callers of this function" — isolates verbose discovery output in the subagent's context. The main coordination context receives the summary, not the exploration transcript. This preserves the main context for high-level decisions and prevents premature degradation.

**/compact**

The `/compact` command reduces context usage during extended exploration by compressing the conversation's accumulated content. It should be used before context fills completely — after context has degraded, the quality of the compacted summary will reflect the degraded state.

**Structured State Persistence**

For crash recovery in long-running exploration tasks, each agent exports its current state to a known location: which files have been examined, which findings have been confirmed, which questions remain open, what the current working hypotheses are. The coordinator loads a manifest on resume and injects the state into agent prompts. This allows the exploration to resume from a known point rather than restarting from the beginning.

**The Avatar State as Context Compaction**

The Aristotle paper's analysis of the Avatar State illuminates context compaction through a precise structural parallel.

In ordinary operation, Aang is figure and the Avatar Spirit is ground — present, informing, available but not dominant. The individual Aang acts as foreground; the accumulated wisdom of all past Avatars provides the background from which his identity draws meaning. In the Avatar State, this relationship inverts: the Avatar Spirit becomes figure, taking over the foreground, and individual Aang recedes into the ground — present (his body persists, his core values constrain what the Avatar State will do) but no longer dominant.

Context compaction is the same operation. The model's accumulated reasoning — its active figure, the verbose exploration transcript, the chain of inferences made during discovery — recedes into the background. What is preserved is the task-critical ground: the current state of the exploration, key decisions made, essential facts discovered. The individual context's "voice" compresses; the structural information it was constituted around is preserved.

Aang's mastery was entering the Avatar State consciously — with himself as figure and the Avatar Spirit as amplifying ground rather than as a usurping force that eclipsed him entirely. This is the mature synthesis: neither pole obliterating the other, but both held in balance. The master context manager compacts consciously: not waiting until degradation forces compression, but compacting while the context is still clear, knowing exactly what to preserve, what to compress, and what to discard. Done too early, you lose the figure that makes the ground meaningful. Done too late, the context collapses and the compacted summary reflects the degraded state.

**Appa and the Hard Constraint**

Appa carried six riders across continents. His carrying capacity was not a preference or a guideline — it was a hard physical constraint. When exceeded, flight became impossible. No amount of effort, intention, or urgency expanded what he could carry. The sky bison must rest; he cannot fly indefinitely, and his carrying capacity does not increase because the mission is urgent.

The context window is the same hard constraint. Token count, not effort, determines what fits. And compression — /compact, progressive summarization, scratchpad-based persistence — has fidelity costs. The compactor's pass is not free: the compressed representation carries less information than the original. Managing both the capacity constraint (what fits in the context window) and the compression cost (what is lost when it is compressed) is the dual art of context management. You cannot wish Appa into carrying more than he can. You plan within the constraint, and you rest him before he is exhausted.

---

**Practice Questions — Task Statement 5.4**

**Question 30.** During an extended codebase exploration session, you notice that Claude Code has begun describing "typical service patterns" and "common handler implementations" rather than referring to the specific classes and method signatures it analyzed an hour ago. What is the most likely cause, and what is the appropriate response?

A) The model has learned incorrect information about the codebase; restart the session and explore again from the beginning.
B) Context degradation — the accumulated exploration output has displaced earlier specific findings. Use /compact to reduce context, or spawn subagents for subsequent discovery phases while maintaining scratchpad files with key findings.
C) The model is making inferences to fill gaps in its exploration; provide more detailed reading instructions in the prompt.
D) The codebase is too large for Claude Code to handle; switch to a model with a larger context window.

**Correct Answer: B.** Context degradation produces exactly this symptom: the model begins referencing "typical patterns" rather than specific earlier findings. The remedies are /compact (to reduce context usage), scratchpad files (to persist key findings across context boundaries), and subagent delegation (to isolate verbose exploration in separate contexts). Option A discards all work done so far; Option D misidentifies the problem as a model capability issue rather than a context management issue.

---

**Question 31.** You are designing a large codebase analysis workflow that may run for several hours. You need the workflow to be resumable if interrupted. What design pattern enables crash recovery?

A) Log all tool calls to stdout so they can be replayed if the session crashes.
B) Have each agent export its current state (files examined, key findings, open questions, working hypotheses) to a structured manifest at a known location. On resume, the coordinator loads the manifest and injects the state into agent prompts.
C) Use fork_session to checkpoint the session state automatically and resume from the last fork point if interrupted.
D) Keep a single coordinator context running throughout and avoid spawning subagents that might fail independently.

**Correct Answer: B.** Structured state persistence through manifests is the correct pattern for crash recovery. Each agent exports its current state to a known location; on resume, the coordinator loads the manifest and injects the state into agent prompts, allowing exploration to continue from a known point. Option C describes a feature (automatic fork checkpointing) that does not function as described.

---

### Task Statement 5.5: Human Review Workflows

Aggregate accuracy metrics can conceal segment-level failures. 97% overall accuracy may mean 99.5% accuracy on standard invoices and 72% accuracy on handwritten receipts — numbers that are invisible in the aggregate but catastrophic when the handwritten receipt category is automated without review.

**Stratified Random Sampling**

Stratified random sampling measures error rates within segments — document types, field categories, confidence bands — rather than across the entire population. It detects novel error patterns that emerge in specific segments before they affect downstream processes at scale. Applied to high-confidence extractions specifically, it reveals whether the model's confidence is calibrated — whether extractions flagged as high-confidence are actually more accurate than lower-confidence ones.

**Field-Level Confidence Calibration**

Field-level confidence scores calibrated against labeled validation sets allow intelligent routing: extractions where certain fields have low model confidence, or where source documents are ambiguous or contradictory, go to human review. Extractions where all fields are high-confidence and well-calibrated proceed automatically. The calibration against labeled data is what makes the confidence scores operationally meaningful — without it, "high confidence" is an uncalibrated claim.

**The Firebending Masters**

The Fire Nation military, assessed in aggregate, performed with overwhelming power — winning battles consistently, demonstrating what appeared to be mastery at scale. Iroh could see what aggregate metrics concealed: their firebending was sourced from rage rather than from life-energy, a corrupted formal cause that performed well under ordinary conditions but was brittle under the dragons' true test. The ninety-seven battles won did not reveal the corruption at the source, because the aggregate metric was not sensitive to segment-level failure in the dimension that mattered most.

The White Lotus does not assess an army's power in aggregate. It asks: is this battalion's technique grounded in the true formal cause? Is this segment of the army operating from authentic firebending, or from a corrupted substitute that will fail precisely when most needed?

Aggregate accuracy metrics hide segment failures the same way. Your 97% overall accuracy is not the answer you need. The answer you need is: what is the accuracy on handwritten receipts? On invoices with non-standard formats? On documents where the contract number is present but in an unusual location? Stratified sampling asks the question that the aggregate answer was designed, perhaps unconsciously, to avoid answering.

---

**Practice Questions — Task Statement 5.5**

**Question 32.** Your document extraction system reports 97% overall accuracy across 50,000 documents. Based on this metric, your team proposes automating the high-confidence extraction tier entirely, routing only low-confidence extractions to human review. What is the most important validation step before implementing full automation?

A) Confirm that the 97% accuracy figure has been calculated on a sample of at least 1,000 documents.
B) Segment the accuracy analysis by document type and field, using stratified sampling to verify consistent performance across all segments before reducing human review for high-confidence extractions.
C) Run a pilot where 10% of documents are automated and review any errors manually before expanding.
D) Confirm that the model's high-confidence designation correlates with reduced error rates using the existing data.

**Correct Answer: B.** Stratified analysis by document type and field is the required validation before automation. 97% overall accuracy may conceal 72% accuracy on a specific document type or field category that becomes fully automated. Stratified sampling reveals these segment-level failures before they affect downstream systems. Option D is a necessary step but insufficient on its own — even well-calibrated confidence scores may conceal segment-level structural failures.

---

### Task Statement 5.6: Information Provenance and Synthesis

Source attribution, once lost, cannot be reconstructed from the synthesized output alone.

**The Core Problem**

When subagents summarize their findings and pass those summaries to a synthesis agent, the connection between specific claims and their sources is broken unless explicitly preserved. A synthesis agent that receives "studies show that X increases by 23%" cannot determine which study made this claim, when it was published, under what conditions, or whether a competing study found a different figure. The synthesis output will contain the claim without the provenance — and the downstream reader has no basis for evaluating the claim's reliability.

**Structured Claim-Source Mappings**

The remedy is requiring subagents to output structured claim-source mappings: each finding carries its claim, an evidence excerpt from the source, the source URL or document name, and — critically — the publication or data collection date. These mappings must be preserved through synthesis: the synthesis agent must not collapse multiple sourced claims into an unsourced summary.

**Handling Conflicting Data**

When two credible sources report different values for the same statistic — different market size estimates, different efficacy rates, different historical dates — the correct synthesis behavior is to annotate both values with their source attribution and present them as a conflict, not to arbitrarily select one. The coordinator, or the human reader, must decide how to reconcile credible sources in conflict. The synthesis agent that discards one value to present a clean narrative has removed the conflict from view without resolving it.

**Temporal Data**

Including publication and data collection dates in structured outputs prevents temporal differences from being misinterpreted as contradictions. A market size figure from 2019 and one from 2025 reporting different values are not in conflict — they reflect different moments in the same market's trajectory. Without dates, the synthesis agent may flag or suppress one as erroneous.

**Wan Shi Tong's Library**

Every scroll in the Great Library maintains its source attribution. Wan Shi Tong did not consolidate the knowledge of ten thousand scholars into an unsourced summary. He maintained provenance — who discovered this, under what conditions, when, as part of which tradition of inquiry. When two scrolls from the Library conflict on the same historical fact, Wan Shi Tong does not discard one arbitrarily to present a clean account. He preserves both, with their sources, and allows the reader to understand that this is a contested question with credible claims on multiple sides.

The synthesis agent must operate from the same principle. Conflicting values are not errors to be resolved by selection. They are information: information that two credible sources disagree, that the question may be more complex than the synthesized output would otherwise suggest, that the reader should know the source of each claim before deciding how to weight it. Preserve the conflict. Annotate both with their sources. Let the coordinator decide. Wan Shi Tong would accept no less.

---

**Practice Questions — Task Statement 5.6**

**Question 33.** Your multi-agent research system has three subagents that each summarize their findings before passing to the synthesis agent. The final report contains numerous statistics and claims, but no source attribution. Downstream stakeholders cannot verify any claims. What architectural change is most directly needed?

A) Instruct the synthesis agent to search for sources for each claim after the report is generated.
B) Require each subagent to output structured claim-source mappings (claim text, source URL or document name, evidence excerpt, publication date) that the synthesis agent preserves and merges rather than compressing into unsourced summaries.
C) Have the synthesis agent add disclaimers to all statistics: "source unknown, verify before use."
D) Require all subagents to cite sources in APA format within their prose summaries.

**Correct Answer: B.** Structured claim-source mappings that are preserved through synthesis are the architectural requirement for provenance maintenance. Option A attempts to reconstruct provenance after the fact, which is unreliable — the synthesis agent cannot accurately attribute claims it has already synthesized without the original source data. Option D's prose citations will be compressed or lost in the synthesis step without structural preservation.

---

**Question 34.** Your synthesis agent receives two conflicting market size estimates from credible sources: Source A (published January 2024) reports the market at $4.2 billion; Source B (published March 2026) reports the same market at $7.8 billion. How should the synthesis agent handle this conflict?

A) Average the two figures and report the market size as approximately $6 billion.
B) Select the more recent figure (Source B, March 2026) as the more authoritative estimate and discard the older one.
C) Annotate both values with their source attribution and publication dates, presenting them as temporally distinct measurements of a growing market rather than as a contradiction, and let the coordinator determine how to represent this in the final report.
D) Flag both values as unreliable and exclude the market size figure from the synthesis output.

**Correct Answer: C.** Two market size figures from different points in time are not a contradiction — they are a temporal sequence. The correct handling is to annotate both with source attribution and publication dates, presenting them as measurements at different points in the market's trajectory. This preserves the information value of both data points and lets the coordinator determine the appropriate framing. Option B discards information. Option A loses the source attribution and creates a figure that neither source reported.

---

### Domain 5 Summary and Exam-Tell

| Topic | Exam-Critical Detail |
|---|---|
| Progressive summarization | Compresses numerical values, dates, customer expectations — extract to "case facts" block |
| "Lost in the middle" | Reliable at beginning and end; place key summaries at the start of aggregated inputs |
| Tool result accumulation | Trim verbose outputs to relevant fields before accumulation in context |
| Escalation: explicit request | Honor immediately — do not attempt resolution first |
| Escalation: confidence scores | Unreliable proxy for case complexity |
| Escalation: sentiment | Unreliable proxy for escalation need |
| Multiple matches | Request additional identifiers — do not use heuristics |
| Error propagation: concealment | Anti-pattern — marks failure as success, prevents recovery |
| Error propagation: uncaught | Anti-pattern — terminates entire workflow unnecessarily |
| Structured error context | Failure type + attempted query + partial results + alternatives |
| Access failure vs empty result | Distinguish: timeout ≠ no results |
| Context degradation | "Typical patterns" instead of specific classes — scratchpad + /compact + subagents |
| Structured state persistence | Manifests for crash recovery; coordinator loads on resume |
| /compact | Reduces context during extended sessions; use before degradation sets in |
| Aggregate metrics | May mask segment failures — stratified sampling by document type and field |
| Field-level confidence | Calibrate against labeled validation sets before automating |
| Claim-source mappings | Must be structurally preserved through synthesis — not prose citations |
| Conflicting data | Annotate both with source attribution — do not arbitrarily select |
| Temporal data | Include publication/collection dates — temporal differences are not contradictions |

*Iroh closes Domain 5:* The context window is chi — the primordial substrate from which all responses emerge. You cannot pour water into a cup with a hole in the bottom. You cannot produce reliable figures from a corrupted or cluttered ground. Context management is not glamorous architecture. It is the infrastructure of the whole. The architect who masters it will find that everything else they have learned — the precise prompts, the structured schemas, the carefully configured CLAUDE.md hierarchy — performs as intended, because the ground beneath it is sound. The architect who neglects it will wonder why their beautiful structures fail at the worst moments. The answer is always in the substrate. Attend carefully to the ground, young architect. The figures will find their form.

---

### The Three-Domain Exam-Tell: A Final Word Before the Examination

You have now walked through Domains 3, 4, and 5. Before you close this scroll and take your rest, let me offer you three distillations — one for each domain — of the pattern that distinguishes correct answers from well-designed distractors.

For **Domain 3**: when a question asks where to put configuration, ask first what scope is needed. User-level is personal and not shared. Project-level is shared via version control. Directory-level is local to that path. Path-specific rules in `.claude/rules/` are for conventions that must follow files across directory boundaries. The distractor will place things at the wrong scope — either too personal (a shared convention in user-level files) or too broad (personal customizations in project-level files).

For **Domain 4**: when a question involves improving output quality, the distractor will offer vague hedging ("be conservative," "use good judgment") against specific categorical criteria. The vague hedge never wins. And when a question involves batch processing, ensure you are holding all four properties: 50% cost, 24-hour maximum, no latency SLA, no multi-turn tool calling. The distractor will propose using batch processing for a blocking workflow, or will offer to poll for "usually faster" completion as though that resolves the SLA problem.

For **Domain 5**: when a question involves errors in a multi-agent system, the two anti-patterns are suppression (marking failure as success) and unstructured propagation (generic error status or uncaught exception). The correct answer always involves structured error context with four elements: failure type, what was attempted, partial results, alternatives. And when a question involves human review, the distractor will propose acting on aggregate accuracy metrics. The correct answer stratifies by segment first.

The exam is not testing your memory. It is testing your judgment — your ability to recognize which principle applies to which situation. That judgment is what a certified architect carries.

Go forth. The Jasmine Dragon will be here when you return. May your path be clear and your balance true.

---

*End of Part 3 — Domains 3, 4, and 5*

*Claude Certified Architect: Foundations — ATLA CCA Study Guide 10X*
*Voice: Uncle Iroh, Grand Lotus of the Order of the White Lotus*
*Technical authority: Claude Certified Architect Exam Guide (Anthropic, PBC)*
*Philosophical framework: Aristotle's Four Primary Causes and Figure/Ground Theory*
