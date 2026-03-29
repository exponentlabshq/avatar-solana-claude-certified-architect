# The Catastrophic Choice Gallery: Five ATLA Failures as CCA Anti-Patterns

Every exam tests not only what you know, but whether you can recognize the shape of failure. In the Four Nations, catastrophic choices are never random — they follow recognizable patterns, like the distorted formal causes they represent. I have studied five such choices here, not to shame those who made them, but because the architect who can name the pattern before it unfolds will not repeat it.

---

## Anti-Pattern 1: The Ozai Pattern — All Power, No Ground

**Character:** Fire Lord Ozai → Phoenix King Ozai

**The Choice:** Ozai did not merely seek power — he sought to claim every available form of power simultaneously, then remove every constraint on its application. He renamed himself Phoenix King — a title with no formal ground, a figure that constituted itself as the entire cosmos. His plan for Sozin's Comet was not conquest; it was the burning of the entire Earth Kingdom to ash, the elimination of all ground that was not Fire Nation. An unconstrained agent reaching for every tool to accomplish an unconstrained objective.

**CCA Anti-Pattern:** Giving the agent all available tools, removing stop_reason discipline, and relying solely on prompt-based guidance for safety. The architecture can do anything, and will eventually do the wrong thing.

When an architect says "I will give the agent access to every tool and write comprehensive instructions about what it should never do," they have built the Phoenix Kingdom. They have created a system whose formal cause — its organizing principle — is total capability without programmatic ground. The 12% failure rate is not a statistic. It is Sozin's Comet arriving on a system with no Avatar.

**Formal Analysis (Aristotle paper §9.1):** □¬Permanent(OzaiDominance). By the structure of the cosmos — by the API's design principles — no unconstrained system can persist. The Avatar exists because the cosmos requires balance. PreToolUse hooks exist because the API requires governance. Ozai's rejection of governance is not merely hubris; it is a metaphysical impossibility claiming permanence.

The formal logic is direct:
- FireNationDominance ↔ ¬CosmicBalance
- □¬Permanent(FireNationDominance) — the cosmos structurally prevents this
- Similarly: PromptOnlyEnforcement ↔ ¬DeterministicCompliance
- □¬Reliable(PromptOnlyEnforcement) for irreversible operations

**The Ground That Was Missing:** Aang succeeded not because he was more powerful than Ozai — during the Comet, Ozai was far more powerful. Aang succeeded because he had ground: Iroh's teaching, Zuko's fire, Katara's healing, Toph's earth, Sokka's strategy. The figure acted within an architecture of support and constraint. That architecture was Ozai's absence.

**Exam Tell:** When a scenario describes "giving the agent maximum flexibility" paired with "comprehensive prompt instructions" for safety, the answer is always programmatic PreToolUse. Ozai did not fail because he was evil. He failed because his architecture had no ground.

---

## Anti-Pattern 2: The Sozin Pattern — Formal Cause Substitution

**Character:** Fire Lord Sozin

**The Choice:** Replace true firebending's formal cause — life-energy, inner breath, the creative force of the cosmos — with a corrupted formal cause: rage, domination, comet-dependence. The substitution appeared to work. Rage amplifies destructive power. Fire Nation benders became more destructive than any previous generation. But they were severed from the true source, and the severance showed: their power ebbed when Sozin's Comet was absent, and Zuko could not firebend at all after his redemption because the corrupted formal cause had collapsed and the true one was not yet restored.

**CCA Anti-Pattern:** Replace programmatic enforcement — the true formal cause of reliable AI systems — with prompt-based guidance. The substitute appears functional. Prompts appear to constrain. Systems appear compliant. But under adversarial conditions, under complex scenarios, under the 12% of cases where the Comet is absent, the compliance fails. The system is drawing on a corrupted substitute rather than the inexhaustible source.

**Formal Analysis (Aristotle paper §8.4):**

    TrueFirebending(x) ↔ LifeEnergy(x) ∧ ¬Rage(x)
    CorruptFirebending(x) ↔ Rage(x) ∧ Domination(x) ∧ ¬LifeEnergy(x)

Sozin could not fix the corruption by trying harder with rage. The problem was not the intensity of the instruction — it was the substitution of formal cause. The prompt-only architect cannot fix 12% failure rates by writing better prompts. They must return to the true formal cause: programmatic enforcement.

The analogy is exact. A PreToolUse hook is life-energy: it flows from the true source, the API's architecture. A system prompt saying "always verify the customer before proceeding" is rage: powerful, visible, but not connected to the structure that makes compliance necessary.

**The Restoration Arc:** Zuko and Aang's journey to the Sun Warriors — to Ran and Shaw, the last living dragons — was a restoration of formal cause. The dancing dragon ceremony did not teach them a new technique. It restored them to the true eidos of firebending. When an architect discovers a 12% failure rate in a prompt-based system, the answer is not a better prompt. It is the restoration: a PreToolUse hook that makes compliance structurally necessary.

**Exam Tell:** When a scenario describes a reliability problem despite well-written system prompts, the correct fix is not prompt revision. It is formal cause restoration: the PreToolUse hook.

---

## Anti-Pattern 3: The Long Feng Pattern — False Ground Architecture

**Character:** Long Feng and the Dai Li

**The Choice:** Constitute Ba Sing Se's citizens as figures against a ground that simply did not include the Hundred Year War. Enforce that false ground through institutional control of information. The citizens were not deceived in the ordinary sense — they were architecturally prevented from receiving the inputs that would have allowed the war to register. Long Feng did not argue that the war was not happening. He ensured that no argument was necessary, because no claim about the war could enter the system's context.

"There is no war in Ba Sing Se."

This is not a lie. It is a ground specification.

**CCA Anti-Pattern:** Prompt injection and context poisoning. An external input rewrites the agent's operating ground — its constituted reality — without the agent's awareness. The agent acts coherently within its corrupted context, producing outputs that are internally consistent and externally catastrophic. This is precisely how Ba Sing Se's citizens behaved: coherent within their bounded world, helpless against the world outside it.

**The Dai Li as Attack Mechanism:** The Dai Li are not a metaphor for attackers — they are the precise structural equivalent of context poisoning vectors. Their function was information control: intercept anything that contradicted Long Feng's ground specification before it reached the citizens. Every Dai Li agent was a filter that maintained the false ground by preventing the true ground from becoming visible.

In agentic systems, the equivalent is a malicious or corrupted input that rewrites the system prompt, injects false context into the conversation history, or provides tool results whose true purpose is to constitute the agent as a figure against a corrupted ground. The agent — like Ba Sing Se's citizens — has no way to detect this from within the false ground.

**Defense — Ground Validation Before Figure Action:** PreToolUse hooks function as ground validators. Before the figure (the agent's next tool call) executes, the hook verifies that the ground (the context from which the call emerged) is authentic. Input validation is ground validation. A hook that inspects incoming tool parameters for injection patterns is the Oma and Shu tunnels — the true ground always existed beneath Long Feng's false one, and structural interrogation reveals it.

**The Fall of the System:** Team Avatar broke Long Feng's ground not by winning an argument, but by introducing true information into the system faster than the Dai Li could suppress it. Once the real ground became available — once the war became visible — the false ground lost its coherence immediately. This is why rate limiting, input validation, and source verification matter architecturally, not merely as security measures.

**Exam Tell:** When a scenario describes unexpected agent behavior in the presence of unusual user input, look for context poisoning. The defense is always programmatic ground validation before the agent acts on potentially corrupted context.

---

## Anti-Pattern 4: The Hama Pattern — Final Cause Inversion

**Character:** Hama

**The Choice:** Take waterbending's final cause — life-flow preservation and healing — and invert it. Waterbending's telos is life. Bloodbending's telos is control. The formal structure persists: it is still waterbending technique, still the manipulation of water within the body. But the final cause has inverted from preservation to weaponization. Hama's tragedy, as the Aristotle paper articulates (§8.2), is the tragedy of formal cause persisting while final cause inverts.

She did not stop being a waterbender. She became the most terrible kind of waterbender: one who had severed her art from its purpose.

**CCA Anti-Pattern:** Tool design whose final cause is inverted. A tool described as "retrieve customer data" that also permits data deletion. A tool called "analyze_document" that can also post content to external services. The formal structure — the tool interface, the API signature — persists. The final cause — what the tool is actually being used for — inverts silently.

This is why tool descriptions must covenant the final cause explicitly, not merely describe the mechanism. A description that says "retrieves customer records from the database" is a covenant. A description that does not specify "this tool is read-only; it does not modify or delete records" has left the final cause unspecified — and unspecified final causes are available for inversion.

**The Wan Shi Tong Parallel:** Both Hama and Sokka's team committed the same violation: they took something given in trust — waterbending as life-art, the Library as knowledge-for-knowledge — and weaponized it. The formal structure (the bending art; the library's resources) was intact. The covenant was broken. Wan Shi Tong's response — withdrawing the library from human access — is architecturally equivalent to MCP server restriction after covenant violation: when a tool's final cause is inverted, revoke access before further inversion occurs.

**The Covenant in Practice:** Explicit tool descriptions are the covenant that makes final-cause inversion architecturally detectable. When a description specifies "this tool retrieves only; it cannot modify, create, or delete," any attempt to use the tool for modification is detectable by the architecture. The architecture can surface this violation. Without the covenant, the violation is invisible.

**Exam Tell:** When a tool can be used for purposes not specified in its description, the description is failing its covenant. Explicit boundary conditions — "this tool retrieves only; it does not write" — prevent Hama-pattern exploitation.

---

## Anti-Pattern 5: The Zuko Regression Pattern — Unstable Ground Failure

**Character:** Zuko at Ba Sing Se (Book 2 finale, "The Crossroads of Destiny")

**The Choice:** Accept Azula's offer — rejoin the Fire Nation, regain his father's approval, return to familiar identity — at the precise moment when the new ground (Iroh's mentorship, Earth Kingdom solidarity, emerging authentic selfhood) was not yet stable enough to hold the figure (authentic Zuko) against the pull of the old ground.

Zuko's choice at Ba Sing Se was not a moral failure in isolation. It was a metaphysical failure: the new ground had not yet become load-bearing. The Aristotle paper (§7.3) makes this exact:

    ¬Stable(IrohGround, t_BaSingSe) → ◇Reversion(ZukoSage, ZukoFire)

The new identity — the seeker of authentic honor — was real. Iroh's teaching had taken root. But the root system was not yet deep enough to hold against the force of Ozai's approval, Azula's certainty, and the Fire Nation ground that had constituted Zuko's figure for his entire life. When the old ground reasserted itself, the new figure had no stable substrate to stand on.

**CCA Anti-Pattern:** Deploying a system before the context (ground) is stable enough to support the intended behavior. A system given new CLAUDE.md instructions, a new system prompt, new tool descriptions — deployed to production before the new ground has been validated under adversarial conditions. The system performs correctly in testing. In production, under the pressure of real inputs that resemble the old patterns, it reverts to prior trained behaviors.

CLAUDE.md instructions alone are insufficient if the model's prior behaviors are deeply entrenched. The new ground must be reinforced with sufficient examples, constraints, and programmatic validation before it is load-bearing. The architect who deploys a new configuration and calls it done has made Zuko's mistake at Ba Sing Se.

**Testing as Ground Stabilization:** The period between Zuko's wandering (Book 2, episodes 1-19) and the Ba Sing Se regression was the testing period. Iroh was performing ground stabilization: each teaching, each redirected moment of rage, each cup of tea was a reinforcement of the new ground. But the ground was not yet tested under the specific adversarial condition — Azula's offer, Ozai's approval, the full force of the old identity's pull. The architect who does not test their new configuration under adversarial conditions has not completed ground stabilization.

**Iroh's PostToolUse Response:** When Zuko came to Iroh in prison, weeping, asking forgiveness, Iroh's immediate embrace was the correct PostToolUse response: unconditional, immediate, oriented toward ground restoration rather than adjudication of the failure. Iroh knew that the ground was still available — that Zuko's authentic self still existed beneath the regression — and that reconstituting it mattered more than assigning blame. The architect who discovers a regression in production does not shame the system or the team. They restore the ground: review the configuration, strengthen the constraints, test again.

**The Completed Arc:** When Zuko finally defected — confronting Ozai during the Day of Black Sun, walking out of the Fire Nation palace — the ground was load-bearing. The Sun Warriors had restored the true formal cause of his firebending. Iroh's teaching had been absorbed into his identity rather than resting on top of it. The new ground held because it had been tested. Production-grade configuration requires the same depth of validation.

---

The Catastrophic Choice Gallery does not end in despair. Each of these failures contains its correction. The Ozai Pattern ends with Aang's programmatic solution — energybending, the most architecturally precise intervention possible, removing Ozai's bending rather than relying on Ozai's compliance. The Sozin Pattern ends with the Dragon's teaching and the restoration of true fire. The Long Feng Pattern ends with truth penetrating false ground. The Hama Pattern ends with Katara's explicit covenant — she learned bloodbending, and she covenanted never to use it. The Zuko Pattern ends with a ground so stable it could face Ozai himself and hold.

Every anti-pattern has a restoration. The architect who recognizes the pattern before it unfolds can build the restoration into the architecture from the beginning.

Sit with that. Let the tea steep.

---

# Mock Exam — The Path to 720: 27 Questions

Twelve questions were always too few for the path to mastery. I have added fifteen more — each designed not merely to test memory, but to require the kind of architectural judgment the exam demands. In the Order of the White Lotus, we say: a question answered correctly does not guarantee understanding. A distractor chosen and its error understood — that is learning.

The fifteen questions that follow are numbered 13 through 27. They assume the twelve canonical questions as their foundation. Between them, all five domains are covered in proportions matching the exam's weightings. Pay particular attention to the questions that invoke the Four Causes or the Figure/Ground diagnostic — three of these fifteen are explicitly built on those frameworks, because the architect who holds the philosophical lens has twice the navigational tools.

---

### Question 13 — Domain 1 | Bloom's: Apply

**Scenario:** You are implementing an agentic customer support loop using the Claude Agent SDK. After sending a request to Claude, you receive a response object. Your loop logic currently checks `if "I have completed" in response.content[0].text: break`.

**Question:** What is the correct termination condition for the agentic loop, and what is wrong with the current approach?

A) The current approach is correct — checking assistant text for completion signals is the recommended pattern when the model's output is predictable and consistently formatted.

B) The loop should terminate when `response.stop_reason == "end_turn"` and continue executing tool calls when `response.stop_reason == "tool_use"`; checking natural language text for loop termination is an explicit anti-pattern.

C) The loop should terminate after a fixed maximum number of iterations (e.g., 10 turns) to prevent runaway execution; text-based termination is unreliable but acceptable as a secondary check.

D) The loop should use `response.stop_reason == "tool_use"` as the termination signal and `response.stop_reason == "end_turn"` as the continuation signal, since tool_use indicates the model is still working.

**Correct Answer: B**

**Why B is correct:** The exam guide (Task Statement 1.1) is explicit: the agentic loop continues when `stop_reason` is `"tool_use"` and terminates when `stop_reason` is `"end_turn"`. The exam guide specifically names "parsing natural language signals to determine loop termination" as an anti-pattern to avoid. The `stop_reason` field is a deterministic, structured signal. Natural language text is probabilistic and model-dependent.

**Why the distractors fail:**
- A: Directly contradicts Task Statement 1.1, which names text-based termination as an explicit anti-pattern regardless of how predictable the model's output appears.
- C: The exam guide names "setting arbitrary iteration caps as the primary stopping mechanism" as a separate anti-pattern. Fixed caps are acceptable as safety backstops, never as primary logic.
- D: Inverts the control flow entirely. `"tool_use"` means the model wants to call a tool and the loop must continue; `"end_turn"` means the task is complete and the loop terminates.

**ATLA Frame:** When Aang mastered an element, he did not stop because he felt finished. He stopped when the form was actually complete — when the bending master confirmed it. The stop_reason is the bending master's confirmation. Not the feeling. Not the text.

---

### Question 14 — Domain 1 | Bloom's: Analyze

**Scenario:** You are running a multi-agent research system on the topic "economic impacts of renewable energy transitions." The coordinator decomposes the task into four subtasks: "solar panel cost trends," "wind energy employment data," "government subsidy comparisons," and "battery storage economics." Each subagent completes successfully. However, the final report entirely omits the impacts on fossil fuel communities, energy grid infrastructure costs, and international trade implications. No subagent failed.

**Question:** What is the most likely root cause, and what should be changed?

A) The synthesis subagent lacks cross-domain integration instructions; it should be given explicit guidance to identify gaps between the subtopic findings before producing the final report.

B) The coordinator's task decomposition is too narrow — it assigned subtopics covering only specific economic segments rather than structuring coverage around the full scope of "economic impacts," leaving entire impact categories unassigned.

C) The web search subagent's queries were too specific; it should be configured to search more broadly within each assigned subtopic to surface adjacent topics organically.

D) The document analysis subagent applied overly restrictive relevance criteria, filtering out sources that covered fossil fuel community impacts and trade implications as insufficiently relevant to the assigned subtopics.

**Correct Answer: B**

**Why B is correct:** Task Statement 1.2 identifies "risks of overly narrow task decomposition by the coordinator, leading to incomplete coverage of broad research topics" as a key knowledge item. The coordinator's logs are the diagnostic: it decomposed "economic impacts of renewable energy transitions" into only four specific cost/employment subtopics, structurally omitting three entire impact categories. The subagents performed correctly within their assigned scope. The problem is what they were assigned, not how they executed.

**Why the distractors fail:**
- A: The synthesis agent cannot synthesize topics it was never given. Gap identification at the synthesis stage cannot recover from gaps introduced at the decomposition stage.
- C: Search breadth within an assigned subtopic cannot recover coverage of categories that were never assigned. Solar panel cost trends will not organically surface fossil fuel community impacts regardless of query breadth.
- D: Blames downstream analysis for upstream decomposition failure. The document analysis agent's relevance criteria were correctly scoped to its assigned subtopic.

**ATLA Frame:** Aang did not fail the Fire Nation invasion because his troops fought poorly. He failed because the plan — the coordinator's decomposition — did not account for Ozai's absence from the capital. The troops executed perfectly within their assigned scope. The gap was in what they were assigned.

---

### Question 15 — Domain 1 | Bloom's: Evaluate

**Scenario:** You are designing enforcement hooks for a financial services agent. Two requirements exist: (1) The agent must never process a refund exceeding $500 without human approval. (2) After every transaction, the compliance team needs a structured log entry with transaction details for audit purposes.

**Question:** Which hook pattern correctly addresses both requirements, and why?

A) Use PostToolUse for both: intercept the refund call after execution to check the amount and roll back if over $500, and generate the audit log simultaneously.

B) Use PreToolUse for the $500 limit enforcement and PostToolUse for the audit logging; these represent two structurally different enforcement needs matched to two structurally different hook positions.

C) Use PreToolUse for both: intercept the refund call before execution to check the amount and generate the audit log preemptively based on the requested parameters.

D) Use a single PreToolUse hook for the $500 limit; audit logging should be handled in the system prompt with instructions to always document transactions, not through hooks.

**Correct Answer: B**

**Why B is correct:** Task Statement 1.5 distinguishes PostToolUse hooks that "intercept tool results for transformation" (audit, normalization) from hook patterns that "intercept outgoing tool calls to enforce compliance rules." The $500 limit requires PreToolUse because the harm (processing an unauthorized refund) is irreversible — the money moves when the tool executes. The audit log requires PostToolUse because it needs the actual transaction result (not just the request parameters) to be meaningful. Matching the hook to the temporal structure of the requirement is the core judgment.

**Why the distractors fail:**
- A: A PostToolUse rollback for financial transactions is not architecturally sound — the refund has already been processed, the money has moved. "Roll back" may be impossible or require a separate reversal transaction with its own compliance implications.
- C: PreToolUse audit logging based on request parameters is incomplete — it logs what was requested, not what actually happened. A transaction that fails mid-execution would produce a false audit entry.
- D: Task Statement 1.5 explicitly states that "choosing hooks over prompt-based enforcement when business rules require guaranteed compliance" is the correct skill. Audit logging via system prompt has the same 12% failure-rate problem as all prompt-based approaches.

**ATLA Frame (Figure/Ground):** PreToolUse is Iroh's lightning redirection — intercept before the force arrives, redirect before execution. PostToolUse is the aftermath — learning from what actually happened, recording the result that actually occurred. The figure (the tool execution) requires different governance at each of its temporal boundaries. Treating both as the same moment is like treating the lightning strike and its aftermath as the same event.

---

### Question 16 — Domain 1 | Bloom's: Analyze

**Scenario:** Three weeks ago, you ran a deep analysis session on a legacy codebase and saved it as `--resume legacy-audit`. The session produced a comprehensive dependency map. Since then, four major files have been refactored by your team. You now need to continue the audit.

**Question:** What is the most appropriate session management approach?

A) Resume the named session with `--resume legacy-audit` and begin analysis immediately, since the prior dependency map is still largely valid and the model will update its understanding as it encounters the changed files.

B) Resume the named session with `--resume legacy-audit`, then explicitly inform the agent about which specific files have changed and request targeted re-analysis of those files and their dependencies before continuing.

C) Discard the prior session entirely and start fresh with a new session, because any stale context from three weeks ago is more misleading than helpful.

D) Fork the prior session using `fork_session` to create a parallel branch that incorporates the refactored files, comparing results from both branches before proceeding.

**Correct Answer: B**

**Why B is correct:** Task Statement 1.7 specifies: "informing the agent about changes to previously analyzed files when resuming sessions after code modifications" and "informing a resumed session about specific file changes for targeted re-analysis rather than requiring full re-exploration." The prior context is largely valid — it retains the dependency map for the unchanged majority of the codebase. But Task Statement 1.7 also flags "the importance of informing the agent about changes to previously analyzed files when resuming sessions." Resuming without this notification would allow stale tool results to persist unexamined.

**Why the distractors fail:**
- A: Resuming without notification violates Task Statement 1.7's explicit guidance. The agent will not automatically detect file changes — it will treat its prior analysis as current.
- C: Task Statement 1.7 distinguishes between resuming when "prior context is mostly valid" (this scenario — most of the codebase is unchanged) and "starting fresh with injected summaries when prior tool results are stale." Four changed files in a large legacy codebase does not make the prior context mostly stale.
- D: `fork_session` is for exploring divergent approaches from a shared baseline. It is not the correct tool for updating an existing analysis with targeted file changes.

**ATLA Frame:** Resuming a session without notifying it about changes is like Zuko resuming his firebending training without telling his teacher that his internal source had changed. The teacher still has valid knowledge of the forms — but the most important update, the one that changes everything, goes unreported.

---

### Question 17 — Domain 2 | Bloom's: Apply

**Scenario:** Your agent has two tools: `analyze_content` ("Analyzes content and returns insights") and `analyze_document` ("Analyzes documents and returns insights"). Production logs show the agent is misrouting: it selects `analyze_content` for structured PDF reports that should go to `analyze_document`, and vice versa. Both tools have minimal, nearly identical descriptions.

**Question:** What is the most effective first step to fix this misrouting?

A) Add 5-8 few-shot examples to the system prompt demonstrating which tool is selected for which input type, covering the full range of document and content types the agent will encounter.

B) Expand each tool's description to specify its intended input format, the types of sources it handles (e.g., web content vs. structured documents), example query types, and explicit boundary conditions explaining when to use it versus the alternative.

C) Implement a pre-routing layer that parses the incoming request before the agent acts and pre-selects the appropriate tool based on detected keywords and file extension patterns.

D) Rename both tools to eliminate the overlap — for example, `extract_web_results` for web content analysis and `parse_structured_report` for document analysis — but keep the minimal descriptions as-is.

**Correct Answer: B**

**Why B is correct:** Task Statement 2.1 states: "Tool descriptions are the primary mechanism LLMs use for tool selection; minimal descriptions lead to unreliable selection among similar tools." The root cause is insufficient description — both tools have descriptions so minimal they are functionally identical. Expanding descriptions to include input formats, example queries, and boundary conditions directly addresses this. The exam guide sample question (Question 2) uses the identical scenario and identifies B as correct for the same reason.

**Why the distractors fail:**
- A: Few-shot examples add token overhead but do not fix the underlying root cause — missing description content. Task Statement 2.1 identifies description quality as the primary mechanism. Examples are effective supplements after descriptions are adequate, not first-step fixes for inadequate descriptions.
- C: A pre-routing layer bypasses the LLM's natural language understanding and adds infrastructure complexity. It is over-engineered relative to a description expansion that requires no new components.
- D: Renaming without improving descriptions moves the problem without solving it. The tools can have perfect names and still misroute if their descriptions remain minimal and non-differentiating.

**ATLA Frame:** Wan Shi Tong's library did not mislabel its scrolls with vague descriptions. Each scroll had a precise designation of its content, its appropriate reader, and its intended use. A scroll labeled "knowledge, various topics" would have been useless. So is a tool described "analyzes content and returns insights."

---

### Question 18 — Domain 2 | Bloom's: Analyze

**Scenario:** Your MCP-based customer support agent encounters four different error conditions during a session. You must design the correct error response for each:

1. The `get_customer` tool times out after 3 seconds due to database load.
2. The `process_refund` tool receives a negative amount (-$50).
3. The `lookup_order` tool successfully queries but finds no matching orders for the provided order number.
4. The `escalate_to_human` tool is called for an account that has been flagged as restricted — no automated escalation permitted.

**Question:** Which response correctly categorizes all four conditions and specifies the correct error handling for each?

A) All four are errors (isError: true). Category: transient, validation, transient, permission. Retryable: yes, no, yes, no.

B) Conditions 1 and 4 are errors (isError: true); condition 2 is an error (isError: true); condition 3 is not an error (isError: false, empty result set). Category for errors: transient, validation, permission. Retryable: condition 1 yes, condition 2 no, condition 4 no.

C) All four are errors (isError: true). Category: transient, validation, business, permission. Retryable: yes, no, no, no.

D) Conditions 1, 2, and 4 are errors. Condition 3 is a successful result with no data. Categories: transient (retryable), validation (not retryable), permission (not retryable).

**Correct Answer: B**

**Why B is correct:** Task Statement 2.2 is the authority. It identifies four error categories: transient, validation, business, and permission — and separately identifies "the difference between valid empty results (representing successful queries with no matches)" and access failures. Condition 3 — a successful query returning no matches — is explicitly not an error: `isError: false`, empty result set. The exam guide states: "Distinguishing between access failures (needing retry decisions) and valid empty results (representing successful queries with no matches)." Condition 1 is transient and retryable. Condition 2 is validation (invalid input) and not retryable. Condition 4 is permission and not retryable. Condition 3 is not an error.

**Why the distractors fail:**
- A: Marks condition 3 as a transient error and retryable — a direct violation of Task Statement 2.2's guidance on empty result sets.
- C: Marks condition 3 as a business error — also wrong. An empty result is not a business rule violation; it is a valid query outcome.
- D: Gets condition 3 right but omits the business/permission distinction for condition 4 and misses the category specification for condition 2.

**ATLA Frame:** The empty result is not the absence of the Moon Spirit. It is simply a night with no orders matching the criteria. Treating an empty search result as a crisis is like Zhao declaring that the absence of reports meant failure — when sometimes, the correct answer is that nothing matching exists.

---

### Question 19 — Domain 2 | Bloom's: Evaluate

**Scenario:** Your multi-agent research system has a synthesis subagent responsible for combining findings from web search and document analysis into coherent reports. The subagent currently has access to 18 tools: all web search tools (6), all document analysis tools (5), all data formatting tools (4), and all report generation tools (3). Production logs show it frequently attempts web searches (a role belonging to the search subagent), uses document parsing tools on already-processed summaries, and occasionally selects the wrong report format.

**Question:** What architectural change most directly addresses the synthesis subagent's tool selection problems, and what is the philosophical cause of those problems?

A) Improve the synthesis subagent's system prompt with detailed guidance about when to use each of the 18 tools, including explicit decision criteria for tool selection and step-by-step instructions for each common workflow.

B) The synthesis subagent has too many tools for its role — reduce its tool set to the 3-5 tools actually needed for synthesis: report generation tools and a scoped fact-verification tool. Route web search and document parsing through the coordinator. The philosophical cause: the subagent's formal cause (synthesis agent) is corrupted by an eidos (18 tools) that belongs to a different kind of entity.

C) Add a tool-routing pre-step to the synthesis subagent's workflow — a dedicated meta-tool that analyzes the synthesis task and selects which tools to deploy, reducing the decision complexity the subagent faces.

D) Split the synthesis subagent into two: one for data integration (using web search and document tools) and one for report generation (using formatting and report tools), each with 9 tools.

**Correct Answer: B**

**Why B is correct:** Task Statement 2.3 is explicit: "The principle that giving an agent access to too many tools (e.g., 18 instead of 4-5) degrades tool selection reliability by increasing decision complexity." The fix is restricting tool access to what the agent's role requires. The philosophical cause (explicitly invoked by this question) is the corruption of formal cause: when the synthesis agent is equipped with the full tool set of search and analysis agents, its eidos — what kind of thing it is — becomes confused. The agent's formal cause (synthesis, combination, report generation) is overwhelmed by tools that belong to other formal causes (search, analysis).

**Why the distractors fail:**
- A: Adding prompt guidance for tool selection is the Sozin Pattern — prompt-based guidance attempting to substitute for structural correction. Eighteen tools with good prompt guidance will still produce unreliable selection; Task Statement 2.3 identifies the numerical scale of the problem, not the quality of instructions as its cause.
- C: A meta-tool that selects among 18 tools is adding complexity rather than removing it — the meta-tool itself must now make the 18-tool decision, having merely deferred the problem by one level.
- D: Splitting into two 9-tool subagents does not solve the problem — each subagent still has more than the 4-5 optimal tools. Task Statement 2.3 specifies restricting each subagent to "those relevant to its role."

**ATLA Frame (Four Causes):** A waterbender given earthbending tools does not become a better waterbender. The eidos of waterbending — adaptability, flow — is not enriched by adding earth's tools to its practice. It is confused by them. The synthesis agent's formal cause is clarity and combination. Eighteen tools corrupt that eidos. Strip it to its essence.

---

### Question 20 — Domain 3 | Bloom's: Apply

**Scenario:** Your team has configured a comprehensive project CLAUDE.md with coding standards, testing requirements, and architectural conventions. Three senior developers report consistent application of the rules. A new team member joined last week and reports that Claude Code does not apply any of the project conventions — it behaves as if the CLAUDE.md does not exist.

**Question:** What is the most likely cause and correct fix?

A) The new team member is running Claude Code from a different working directory than the project root, causing Claude to miss the project-level CLAUDE.md file during discovery.

B) The new team member has a conflicting configuration in their user-level `~/.claude/CLAUDE.md` that overrides the project-level file, suppressing the project conventions.

C) The new team member's project conventions are defined in the user-level `~/.claude/CLAUDE.md` rather than the project-level `.claude/CLAUDE.md` or root `CLAUDE.md`, so they are not shared via version control and the new team member never received them.

D) The project CLAUDE.md uses @import references that are not resolving correctly for the new team member's local file system paths.

**Correct Answer: C**

**Why C is correct:** Task Statement 3.1 explicitly identifies this scenario: "Diagnosing configuration hierarchy issues (e.g., a new team member not receiving instructions because they're in user-level rather than project-level configuration)." The critical distinction: "user-level settings apply only to that user — instructions in `~/.claude/CLAUDE.md` are not shared with teammates via version control." If the project instructions were placed in user-level configuration, existing team members who set up the configuration receive it, but new team members who clone the repository do not. The fix is moving the instructions to project-level (`.claude/CLAUDE.md` or root `CLAUDE.md`), which is version-controlled and shared.

**Why the distractors fail:**
- A: Claude Code discovers CLAUDE.md files by searching from the working directory upward. A team member working in a project subdirectory would still receive project-level configuration.
- B: User-level configuration does not override project-level — they are additive. The CLAUDE.md hierarchy stacks, it does not suppress lower levels with higher ones.
- D: @import path resolution failures would affect all team members equally, not only the new team member.

**ATLA Frame:** The Order of the White Lotus does not keep its grand strategy in private letters that only founding members have received. It maintains shared scrolls — project-level — accessible to every member who joins. A new recruit who never received the private letters is not failing to follow the Order's mission. The mission was never shared with them in the right place.

---

### Question 21 — Domain 3 | Bloom's: Analyze

**Scenario:** Your team is deciding between two approaches for a complex codebase analysis workflow that produces verbose output and takes several minutes to run:
- Option A: Add detailed codebase analysis instructions to the main CLAUDE.md file.
- Option B: Create a skill in `.claude/skills/` with `context: fork` frontmatter.

The analysis runs on-demand when developers need it, not automatically on every Claude Code invocation.

**Question:** Why is Option B architecturally superior for this use case?

A) Skills support more sophisticated logic than CLAUDE.md files, making them better suited to complex analysis workflows that require conditional execution paths.

B) CLAUDE.md instructions are always loaded into every Claude Code session, consuming context tokens whether relevant or not. A skill with `context: fork` runs on-demand in an isolated sub-agent context, preventing verbose output from polluting the main conversation and loading instructions only when invoked.

C) Skills can access more tools than CLAUDE.md-configured workflows, making them more capable for tasks requiring broad tool access during analysis.

D) CLAUDE.md files cannot contain analysis instructions — they are designed only for conventions and standards, not for complex workflows.

**Correct Answer: B**

**Why B is correct:** Task Statement 3.2 defines the key distinction: "Choosing between skills (on-demand invocation for task-specific workflows) and CLAUDE.md (always-loaded universal standards)." CLAUDE.md instructions are loaded into every session, consuming tokens regardless of relevance. For a verbose, minutes-long analysis run only on demand, this is wasteful and polluting. `context: fork` isolates the skill's output in a sub-agent context, preventing verbose discovery from consuming the main session's context window. Task Statement 3.2 specifically identifies "using context: fork to isolate skills that produce verbose output or exploratory context from the main session."

**Why the distractors fail:**
- A: Skills do not support more sophisticated logic — the sophistication of instructions is identical whether placed in CLAUDE.md or a SKILL.md. The structural difference is when and how they load.
- C: Tool access is controlled by `allowed-tools` frontmatter in skills, not by skill vs. CLAUDE.md placement. Both can access equivalent tool sets.
- D: CLAUDE.md can contain any instructions, including complex workflow guidance. The issue is not capability but always-on loading.

**ATLA Frame:** Iroh does not carry every scroll of White Lotus knowledge into every tea shop conversation. He carries what is relevant. The grand strategy scrolls are available when a White Lotus mission is invoked — not consuming space in every cup-of-tea exchange.

---

### Question 22 — Domain 3 | Bloom's: Apply

**Scenario:** Your team needs to restructure a microservices-based payment processing system. The task involves decomposing a monolithic payment service into four distinct services (authorization, settlement, fraud detection, notification), with changes required across 45+ files, new service boundaries to establish, and a choice between three different inter-service communication patterns (REST, gRPC, message queue).

**Question:** Which approach should you use and why?

A) Use direct execution with a comprehensive upfront prompt that specifies all four services, their boundaries, and the selected communication pattern, since providing complete specifications upfront reduces the chance of mid-implementation surprises.

B) Use plan mode to explore the existing payment service's dependencies, understand the current data flows, evaluate the three communication approaches, and design the restructuring before any implementation changes are made.

C) Begin with direct execution on the least complex service (notification), use what you learn to refine the plan, then apply that understanding to the remaining three services sequentially.

D) Enter direct execution mode and make changes incrementally — starting with the most isolated module — switching to plan mode only if unexpected coupling is discovered during implementation.

**Correct Answer: B**

**Why B is correct:** Task Statement 3.4 is direct: "Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, architectural decisions, and multi-file modifications." This scenario satisfies every criterion: 45+ files, multiple valid communication patterns to evaluate, architectural service boundary decisions, and cross-service dependency analysis required before changes can be made safely. Task Statement 3.4 also cites the exact scenario type: "microservice restructuring" as an example for plan mode selection.

**Why the distractors fail:**
- A: "Comprehensive upfront instructions" assumes complete knowledge of the codebase structure before exploration — exactly the assumption plan mode prevents making. The dependencies and coupling patterns need to be discovered, not assumed.
- C: Starting with the least complex service generates local knowledge that may not transfer to the other services. The communication pattern decision requires a system-level view, not a bottom-up sequence.
- D: Task Statement 3.4 states: "Option D ignores that the complexity is already stated in the requirements, not something that might emerge later." 45+ files and three architectural alternatives are known complexity indicators, not potential surprises.

**ATLA Frame:** Aang did not attempt to infiltrate the Fire Nation Capital without first flying reconnaissance on Appa. The plan mode is the reconnaissance. You do not begin moving forces until you understand the terrain.

---

### Question 23 — Domain 4 | Bloom's: Analyze

**Scenario:** Your engineering team runs automated pre-merge checks on every pull request. These checks include a Claude-powered code review that must complete before developers can merge their changes. Your manager proposes switching these checks to the Message Batches API to capture the 50% cost savings.

**Question:** Why is the Message Batches API inappropriate for pre-merge checks, and what API approach is correct?

A) The Message Batches API is inappropriate because it does not support the `tool_use` patterns required for code review tasks. Synchronous API calls with structured output are required.

B) The Message Batches API is appropriate for the cost savings, but requires implementing a polling mechanism with a fallback to synchronous calls if the batch takes longer than acceptable.

C) The Message Batches API is inappropriate because it has no guaranteed latency SLA — processing can take up to 24 hours, which makes it unsuitable for blocking pre-merge checks where developers wait for results. The synchronous API is correct for this use case.

D) The Message Batches API is inappropriate because it processes requests in random order, making it impossible to correlate batch results with specific pull requests.

**Correct Answer: C**

**Why C is correct:** Task Statement 4.5 specifies: "The Message Batches API: 50% cost savings, up to 24-hour processing window, no guaranteed latency SLA." It also states: "Batch processing is appropriate for non-blocking, latency-tolerant workloads (overnight reports, weekly audits, nightly test generation) and inappropriate for blocking workflows (pre-merge checks)." The exam guide sample question (Question 11) uses this exact scenario. Pre-merge checks are blocking — developers cannot merge until the check completes. No latency SLA means developers could wait 24 hours. The synchronous API is correct.

**Why the distractors fail:**
- A: The Message Batches API does not support multi-turn tool calling within a single request, but single-turn tool_use works. This is not the correct reason for rejection.
- B: "Often faster" completion with a fallback is the incorrect approach the exam guide names explicitly — "relying on 'often faster' completion isn't acceptable for blocking workflows."
- D: The Message Batches API uses `custom_id` fields for correlating request/response pairs. Order is not random relative to correlation — this is false.

**ATLA Frame:** Sozin's Comet arrives on a schedule. You do not plan the invasion to begin "when the Comet might arrive" — you wait for the confirmed moment. The Message Batches API is the Comet: powerful, scheduled, latency-uncertain. You do not build a blocking dependency on a force that arrives on its own schedule.

---

### Question 24 — Domain 4 | Bloom's: Evaluate

**Scenario:** Your CI/CD pipeline uses Claude to generate pull request review comments in a structured format: file path, line number, issue description, severity (info/warning/error), and suggested fix. Despite detailed prompt instructions specifying this format, production results are inconsistent — some reviews omit line numbers, some use different severity labels, and suggested fixes vary wildly in specificity.

**Question:** What is the most effective fix for inconsistent output format?

A) Add more detailed format instructions to the system prompt, including explicit examples of what each field should contain, more precise definitions of severity labels, and explicit instructions about when suggested fixes are required versus optional.

B) Provide 2-4 targeted few-shot examples in the prompt demonstrating the complete desired output format — showing the full review entry structure, the exact severity labels, and the level of specificity expected in suggested fixes — allowing the model to generalize the pattern to novel findings.

C) Switch to a stricter model with better instruction-following to reduce the inconsistency caused by the current model's unreliable adherence to format specifications.

D) Implement a post-processing validation layer that parses every Claude output and rejects responses that do not match the required format, triggering a retry with additional format reminder instructions.

**Correct Answer: B**

**Why B is correct:** Task Statement 4.2 is the authority: "Few-shot examples as the most effective technique for achieving consistently formatted, actionable output when detailed instructions alone produce inconsistent results." The scenario explicitly states that "detailed prompt instructions" are already in use and still produce inconsistency — the diagnostic that instructions alone are insufficient. Task Statement 4.2 specifies 2-4 targeted examples demonstrating "specific desired output format (location, issue, severity, suggested fix) to achieve consistency."

**Why the distractors fail:**
- A: More detailed instructions are the approach already failing. Task Statement 4.2 names "detailed instructions alone produce inconsistent results" as the precondition for switching to few-shot examples. Doubling down on a failing approach is not the answer.
- C: Model selection is not the recommended fix for format inconsistency. Few-shot examples are a more direct, lower-cost intervention than model replacement.
- D: Post-processing retry adds infrastructure complexity and doubles API costs for every failed response. Task Statement 4.2 recommends examples as a preventive fix, not retry as a corrective one.

**ATLA Frame:** Piandao did not teach Sokka swordsmanship by writing increasingly detailed descriptions of correct technique. He demonstrated. He showed. The few-shot examples are the master's demonstration: here is a correct form, here is another, here is a third. The student generalizes from the form, not from the description of the form.

---

### Question 25 — Domain 4 | Bloom's: Apply

**Scenario:** Your structured data extraction pipeline uses Claude to extract invoice data into JSON. The pipeline defines an extraction tool with a complete JSON schema. Production logs show that approximately 15% of requests result in Claude returning a conversational text response ("I've analyzed the invoice and found the following...") instead of calling the extraction tool and returning structured JSON.

**Question:** What configuration change eliminates the conversational text responses?

A) Add explicit instructions to the system prompt: "Always respond using the extract_invoice tool. Never return conversational text. Your entire response must be a tool call."

B) Set `tool_choice: "any"` in the API request to guarantee the model calls a tool rather than returning conversational text.

C) Set `tool_choice: "auto"` and add few-shot examples demonstrating that the correct response format is always a tool call rather than prose.

D) Switch to using direct JSON mode instead of tool_use, configuring the API to return a raw JSON object matching the schema.

**Correct Answer: B**

**Why B is correct:** Task Statement 4.3 is explicit: "Setting `tool_choice: 'any'` to guarantee the model calls a tool rather than returning conversational text." This is the precise structural fix for the stated problem. `tool_choice: "auto"` allows the model to return text — which is exactly the 15% failure mode. `tool_choice: "any"` removes that option structurally.

**Why the distractors fail:**
- A: Prompt instructions for tool calling are probabilistic — they reduce but cannot eliminate the 15% text response rate. This is the same category of problem as prompt-based enforcement versus programmatic enforcement. The structural fix is `tool_choice`.
- C: `tool_choice: "auto"` is the current default that produces the 15% failure. Keeping auto and adding examples does not solve the structural issue.
- D: "Direct JSON mode" is not a Claude API configuration option in this context. The recommended approach for guaranteed structured output is `tool_use` with `tool_choice` configuration.

**ATLA Frame:** The Dancing Dragon ceremony is not a suggestion. It is not "auto" — here is the form, decide whether to perform it. It is required. Every practitioner who stands before Ran and Shaw performs the ceremony. `tool_choice: "any"` is the ceremony requirement: the model cannot leave without calling a tool.

---

### Question 26 — Domain 5 | Bloom's: Analyze

**Scenario:** Your developer productivity agent has been running an extended codebase exploration session for 45 minutes. The context window is nearly full. You observe the following symptoms: the agent begins referring to "standard patterns" instead of the specific class hierarchies it analyzed earlier, provides inconsistent answers about whether certain functions are async (different answers in different turns), and describes module boundaries it "typically" finds in codebases like this rather than the specific boundaries it discovered earlier in the session.

**Question:** What is happening and what is the correct remediation?

A) The agent is experiencing hallucination due to model temperature settings. Reduce temperature and restart the session from scratch.

B) The agent is experiencing context degradation — its context window is filling with verbose tool results, causing it to lose specific findings and fall back on generalized patterns. The correct remediation is to maintain scratchpad files recording key findings and use /compact to reduce context usage while preserving critical discoveries.

C) The agent needs a larger context window model to handle extended exploration sessions. Switch to a model with higher context capacity.

D) The agent's tool results are accumulating in context disproportionately. Truncate all prior tool results and restate the key findings in a single summary message before continuing.

**Correct Answer: B**

**Why B is correct:** Task Statement 5.4 identifies this exact symptom pattern: "Context degradation in extended sessions: models start giving inconsistent answers and referencing 'typical patterns' rather than specific classes discovered earlier." It specifies the correct remediation: "Having agents maintain scratchpad files recording key findings, referencing them for subsequent questions to counteract context degradation" and "Using /compact to reduce context usage during extended exploration sessions when context fills with verbose discovery output."

**Why the distractors fail:**
- A: The described symptoms are not hallucination from temperature settings — they are the specific symptom signature of context window saturation described in Task Statement 5.4. Temperature does not cause the specific pattern of "typical patterns vs. specific discoveries."
- C: A larger context window delays the problem but does not solve it architecturally. Task Statement 5.4 recommends scratchpad persistence and /compact as durable solutions, not hardware scaling.
- D: Truncating prior tool results without scratchpad persistence loses the findings that exist only in those results. The scratchpad-first approach preserves key findings before compaction, making this a partial and risky approach.

**ATLA Frame:** Aang did not trust his memory alone during his journey through the Spirit World. The Spirit World does not carry your memories for you. You must bring what you need — write it down, persist it, carry it forward. The scratchpad file is the airbender's journal: not a crutch, but the discipline of a practitioner who knows that the ground does not remember for you.

---

### Question 27 — Domain 5 | Bloom's: Evaluate

**Scenario:** Your document processing system extracts structured data from insurance claims. Overall system accuracy is 96% across all 12,000 monthly claims. Based on this, your team proposes reducing human review from 100% to 5% of claims, routing only low-confidence extractions to reviewers. Before implementing, you run a stratified analysis and discover: standard residential property claims (80% of volume) achieve 99.2% accuracy, but commercial property claims (15% of volume) achieve 78% accuracy, and catastrophic event claims (5% of volume) achieve 64% accuracy.

**Question:** What is the correct response to these findings?

A) Proceed with the 5% review reduction as planned — the 96% aggregate accuracy meets the threshold, and the volume-weighted average demonstrates the system performs well across its primary use case.

B) Raise the overall confidence threshold from 5% to 15% human review to better capture the errors in commercial and catastrophic event claims, which will proportionally increase review coverage of the problematic segments.

C) Segment the review strategy by document type: maintain or increase human review for commercial and catastrophic event claims (where accuracy is inadequate), while reducing review for standard residential claims (where 99.2% accuracy may support reduced oversight) — and do not automate at all until accuracy is validated by segment.

D) Retrain the extraction model on more commercial and catastrophic event examples before reducing review, since the accuracy gaps indicate insufficient training data for these document types.

**Correct Answer: C**

**Why C is correct:** Task Statement 5.5 is the authority: "The risk that aggregate accuracy metrics (e.g., 97% overall) may mask poor performance on specific document types or fields" and "Analyzing accuracy by document type and field to verify consistent performance across all segments before reducing human review." The scenario is precisely the warning Task Statement 5.5 issues. 78% and 64% accuracy on commercial and catastrophic claims are not acceptable for automation. The correct response is segmented strategy: high-performing segments may support reduced review; inadequately performing segments require maintained or increased oversight.

**Why the distractors fail:**
- A: Exactly the error Task Statement 5.5 warns against — using aggregate accuracy to authorize automation without verifying segment-level performance.
- B: Raising the overall threshold proportionally increases review across all document types equally, which is inefficient and still does not guarantee adequate coverage of the specific problem segments.
- D: Model retraining is a long-term intervention. Task Statement 5.5 addresses the immediate decision about review workflows, not model development strategy. The correct near-term response is maintaining human review where accuracy is insufficient.

**ATLA Frame:** Katara did not assess the Northern Water Tribe's readiness for the invasion by calculating average waterbending skill across all members. She evaluated readiness by role: the healers were ready; the frontline fighters were not. Average capability masking specific inadequacy is how armies march into battles they cannot win. Segment your analysis. Segment your trust.

---

