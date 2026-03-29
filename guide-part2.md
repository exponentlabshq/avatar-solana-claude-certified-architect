## Domain 1: Agentic Architecture & Orchestration

*27% of scored content — the largest domain on the exam*

---

### Iroh's Introduction to Domain 1

Sit with me a moment. Before we begin, I want to pour this properly.

Domain 1 is where most examinations are won or lost. Twenty-seven percent of everything — the weight of a general's experience behind each question. I have seen young architects rush through it as though it were merely technical knowledge, as though knowing the names of things were the same as understanding their nature. It is not. The Fire Nation knew the names of every Water Tribe technique. They still lost to Katara at the North Pole.

What this domain demands of you is something deeper: an understanding of *why* the agentic loop is structured as it is, *why* multi-agent coordination routes through a coordinator, *why* hooks exist as ground rather than prompts as figure. The technical names are easy. The reasons behind them — those take longer to steep.

Let me share what I have learned.

---

### The Four Causes Opening for Domain 1

Domain 1 is the domain of Formal Cause and Efficient Cause.

The formal cause of an agentic system is its organizing principle — what kind of system is this? A coordinator-subagent architecture, or a single-agent loop? A system with programmatic hooks, or prompt-only guidance? These are formal cause questions. The organizing principle determines what the system essentially *is*, before any tool has been called, before any decision has been made. An agentic system without a clear formal cause is like a firebender without an understanding of their element — they may produce heat, but they have not yet become what they are.

The efficient cause is what initiates action: the hook that fires, the tool that executes, the stop_reason that terminates. Every change in an agentic system has an agent — a cause that precedes it and makes it happen. The model reasons; that is efficient cause. The tool executes; that is efficient cause. The PreToolUse hook intercepts; that is efficient cause, arriving before the natural efficient cause of the tool itself. Master the formal architecture; master the efficient mechanisms; and the agentic domain will be yours.

---

### The Figure/Ground Exam-Tell for Domain 1

The figure/ground exam-tell for Domain 1: whenever you see a scenario with unreliable tool ordering or sequencing, the answer moves from figure (prompts) to ground (programmatic enforcement).

Here is what I mean. Prompts are figure — they stand in the foreground of every interaction, visible, explicit, stated in words. A prompt that says "always call get_customer before lookup_order" is very much a figure: legible, present, seemingly authoritative. But figures depend on grounds to hold their determinacy. When adversarial conditions shift — when a model, under pressure, under ambiguity, in 12% of cases — the figure wavers without its ground.

PreToolUse is ground. stop_reason is ground. Explicit context passing to subagents is ground. These are the structural elements that make reliable agentic behavior possible — not because they are loud, but because they are load-bearing. The figure cannot stand without them.

When you see an exam question about reliability, about guaranteed compliance, about preventing a specific failure mode from recurring in production — look for the answer that moves from figure to ground. That is almost always the correct path.

---

### Task Statement 1.1: Agentic Loop Implementation

*Design and implement agentic loops for autonomous task execution*

---

#### The Technical Core

The agentic loop is the fundamental pattern of autonomous execution in Claude systems. Understanding it precisely — not approximately, but precisely — is the foundation of Domain 1.

**The lifecycle, stated completely:**

1. Send a request to the Claude API, including the conversation history with any tool definitions
2. Receive the API response and inspect the `stop_reason` field
3. If `stop_reason` is `"tool_use"`: extract the tool call(s) from the response, execute the requested tools, append both the assistant message and the tool results to conversation history, and return to step 1
4. If `stop_reason` is `"end_turn"`: the task is complete — present the final response and terminate the loop

This is the complete structure. Everything else in agentic loop design is variation on these four steps.

**Tool results and conversation history:** After each tool execution, the tool results must be appended to the conversation history before the next API call. The model cannot reason about tool outputs it has not received. Each iteration of the loop gives the model an updated view of the world — prior assistant turn, tool results, any new context — from which it reasons about its next action. Omit the tool results and you have broken the loop at the epistemic level: the model reasons about a world it cannot see.

The specific structure matters: after executing a tool, you append the assistant message (which contains the tool_use block requesting the tool call) and then the tool result (a message with role "user" containing the tool's output). Both must be in the conversation history. Appending only the tool result without the assistant's tool_use block corrupts the conversation structure.

**Model-driven vs. pre-configured:** A true agentic loop is model-driven. The model inspects the current state of the conversation and reasons about what tool to call next — not following a script, but making a genuine decision based on context. This is distinct from pre-configured decision trees, where the next tool is determined by the previous tool's output category, regardless of what the model has reasoned. Pre-configured decision trees have their place in simple workflows, but they are not agentic loops. The exam knows the difference, and it will ask you about it.

The practical difference: a model-driven loop can discover that it needs to call an unexpected tool based on what a prior tool returned. If `get_customer` returns a flag indicating the account is suspended, the model may reason that it should call `check_suspension_reason` rather than proceeding to `lookup_order` — a decision that was not encoded in any pre-configured tree. This adaptive reasoning is the value of model-driven design.

**Anti-patterns — memorize these exactly:**

The exam targets three specific anti-patterns. If you see any of them offered as a solution, treat them as distractors:

- **Parsing natural language signals to determine termination.** If your loop checks whether the model's response text contains "I have completed the task" or "Here is your answer" as the signal to stop, you have broken the loop. The model may say these things mid-task. The model may not say them at all when it is done. The `stop_reason` is the correct signal — not the text.

- **Arbitrary iteration caps as the primary stopping mechanism.** Setting "loop a maximum of 10 times" is not a termination condition — it is a circuit breaker that prevents infinite loops in pathological cases. It should not be the *primary* mechanism by which your loop decides it is done. A correctly implemented loop terminates naturally when `stop_reason` is `"end_turn"`. Iteration caps belong as safety backstops, not primary logic.

- **Checking assistant text content as a completion indicator.** Related to the first anti-pattern — inspecting the model's output text for completion signals is unreliable. Always check `stop_reason`.

**Why these anti-patterns persist:** It is worth understanding why these patterns are tempting. Parsing text feels natural because we are used to reading assistant outputs as meaningful signals. Iteration caps feel safe because unbounded loops feel dangerous. Checking for completion phrases feels intuitive because humans say "I'm done" when they finish. Each anti-pattern has a surface logic. The exam exploits this: the distractors are designed to appeal to exactly the candidates who understand the purpose without understanding the mechanism. Know the mechanism precisely.

---

#### The ATLA Bisociation: Aang's Element Mastery as the Loop

When Aang learned waterbending from Katara, he did not receive a script. He observed the form — this is sending the request, receiving the current state of the world. He decided which technique to practice — this is the model reasoning about its next action. He acted — this is tool execution. He observed the result — this is tool results appended to conversation history. And he decided again.

This continued until the form was complete. Not until Aang *felt* like he understood waterbending. Not until ten practice sessions had elapsed. Not until Katara said "I think that's probably enough for today." Until the master granted mastery — when the form was actually, verifiably complete.

`stop_reason: "end_turn"` is the master's nod. The loop does not end when the assistant text sounds finished. It ends when the condition is actually met.

There is a subtlety here worth noting. Aang is not following a script of techniques in a predetermined order. He observes, reasons, acts. If Katara demonstrates a technique and Aang tries it and fails, the next iteration may involve a different approach entirely — not the next item on a list. This is model-driven decision making. The model knows the goal; it chooses the path.

I have watched Aang train. What strikes me is not the spectacular moments — the forms mastered, the elements controlled. What strikes me is the quality of attention in the in-between moments. After he acts, before he decides again, there is a pause: the observation of what the action produced. This is the tool result being processed. A practitioner who skips this observation — who acts and immediately acts again without registering the consequence — makes random decisions, not informed ones. The loop's value is precisely in this pause: the moment between tool execution and the next decision, where the model integrates what it has learned into its ongoing reasoning.

Build your loops to honor this pause. Return the tool result. Append it to history. Let the model see what it produced before it decides what to do next.

---

#### Practice Questions

**Question 1.1.A**

Your customer support agent successfully resolves most issues, but production logs show the loop occasionally continues after the task is complete, making unnecessary additional tool calls. A junior architect suggests adding a check: if the assistant's response contains the phrase "Is there anything else I can help you with?", terminate the loop. What is the most significant problem with this approach?

A) The phrase check adds unnecessary latency to each loop iteration.

B) The phrase "Is there anything else I can help you with?" may appear in mid-task responses, and the correct termination signal is `stop_reason: "end_turn"`, not text content.

C) This approach is correct — natural language signals are the appropriate way to detect loop completion in production systems.

D) The agent should use `tool_choice: "any"` to force a tool call and prevent premature termination.

**Correct Answer: B**

Text content is an unreliable termination signal. The assistant may produce completion-sounding phrases before the task is finished, and may omit them when the task genuinely concludes. The `stop_reason` field is the designed mechanism for communicating loop state — `"tool_use"` means continue, `"end_turn"` means terminate. Option A is a minor concern that does not address the fundamental reliability problem. Option C is the anti-pattern explicitly identified in the exam guide. Option D addresses a different problem entirely (whether a tool is called, not when to terminate).

---

**Question 1.1.B**

An agentic research agent is designed to call several tools across multiple loop iterations before producing a final synthesis. The team adds a safety measure: if the loop exceeds 15 iterations, terminate with a partial result. A month after deployment, logs show 8% of complex research tasks are being cut off at 15 iterations before completion, degrading output quality. What is the correct architectural response?

A) Increase the iteration cap to 25 and monitor whether truncation rate decreases.

B) Remove the iteration cap entirely — well-designed agentic loops rely on `stop_reason` for termination and do not require caps.

C) Retain the iteration cap as a safety backstop for pathological cases, but investigate why complex tasks require more iterations than expected and optimize tool design to reduce the number of calls needed per task.

D) Add a secondary signal: if the model's response text at any iteration exceeds 500 tokens, treat that as a completion indicator and terminate.

**Correct Answer: C**

Iteration caps have a legitimate role as safety mechanisms against infinite loops — but they are backstops, not primary stopping mechanisms. When they begin firing on legitimate tasks, the correct response is to investigate and optimize — not to blindly increase the cap (A), not to remove safety mechanisms entirely (B), and certainly not to introduce another unreliable text-content signal (D). The cap should be set high enough that it never fires on legitimate tasks while still preventing truly pathological runaway loops.

---

### Task Statement 1.2: Multi-Agent Coordination

*Orchestrate multi-agent systems with coordinator-subagent patterns*

---

#### The Technical Core

Multi-agent architecture in Claude systems follows the hub-and-spoke pattern. Understanding this pattern precisely — and understanding its failure modes — is essential for Domain 1.

**Hub-and-spoke architecture:**

The coordinator is the hub. Every subagent is a spoke. Communication between subagents does not flow directly from spoke to spoke — it routes through the hub. The coordinator manages all inter-subagent communication, error handling, and information routing. This is not bureaucracy; it is the mechanism that makes the system's behavior observable, controllable, and reliable.

**The coordinator's responsibilities:**

- Task decomposition: breaking the overall goal into subgoal assignments
- Delegation: sending the right task to the right subagent with the right context
- Result aggregation: collecting outputs from subagents and synthesizing them
- Dynamic subagent selection: deciding which subagents to invoke based on what the query actually requires — not always routing through every available subagent

**Subagent context isolation:** Subagents do not inherit the coordinator's conversation history. They operate with isolated context — they know only what has been explicitly given to them in their prompt. This is not a limitation; it is a feature. Isolated context prevents unintended information leakage between agents, reduces token usage, and makes each subagent's behavior predictable and testable. But it means the coordinator must be explicit: if the synthesis subagent needs the web search subagent's findings, those findings must be passed explicitly in the synthesis subagent's prompt.

**The key failure mode — overly narrow decomposition:**

The exam has a precise example of this. A coordinator asked to research "the impact of AI on creative industries" decomposes the topic into three subtasks: "AI in digital art creation," "AI in graphic design," "AI in photography." Each subagent executes correctly within its assigned scope. The final report covers only visual arts — music, writing, and film production are entirely absent.

The failure is in the coordinator's decomposition, not in the subagents' execution. The subagents did exactly what they were asked. The coordinator asked the wrong questions. This is the exam's canonical example of overly narrow task decomposition. It appears because it is a genuinely subtle failure mode: all subagents return green, the system appears healthy, and the output is quietly incomplete.

**Iterative refinement:** After synthesis, the coordinator should evaluate the output for coverage gaps and, if gaps are found, re-delegate to search and analysis subagents with targeted queries, then re-invoke synthesis. The loop continues until coverage is sufficient. This is the antidote to the narrow decomposition failure: an explicit gap-checking step that catches what was missed.

---

#### The ATLA Bisociation: Team Avatar as Coordinator-Subagent

Aang coordinates Team Avatar. He does not attempt to do everything himself — he coordinates. Katara receives her mission; Toph receives hers; later, Zuko receives his. They report their findings through him. When Katara discovers something about the Water Tribe, she tells Aang; Aang integrates it into the team's understanding and adjusts assignments accordingly. If Katara and Toph were to coordinate directly with each other about joint operations without Aang's knowledge, the team's overall mission could fragment. Coordination flows through the coordinator.

This is the hub-and-spoke pattern. Katara is a spoke operating with isolated context — she has her mission, her tools, her domain. She does not inherit Aang's full understanding of every active thread. She is given what she needs. Her results flow back through the hub.

There is a deeper reason for this architecture beyond mere organization. When all communication routes through the coordinator, the coordinator has complete observability. Aang knows what Katara found. He knows what Toph encountered. He can detect when their findings contradict each other and make a decision about how to reconcile the contradiction. If Katara and Toph had communicated directly, Aang might not know that Katara's intelligence about the North Pole was undermining the strategy Toph had developed for the Earth Kingdom campaign. The hub is not a bottleneck — it is the seat of intelligence.

Routing all subagent communication through the coordinator for observability, consistent error handling, and controlled information flow is not an architectural preference. It is the mechanism that makes multi-agent systems comprehensible, debuggable, and reliable.

The Order of the White Lotus operates on the same principle. I have seen it myself. When the Grand Lotus coordinates the liberation of the great cities, each cell receives a complete mission briefing for its objective — Ba Sing Se, Omashu, the Fire Nation Capital. Each cell operates with isolated context. The cell liberating Ba Sing Se does not know the detailed plans of the cell operating in the Fire Nation Capital. They know their mission. This is not secrecy for its own sake. It is the architecture of resilience: isolated context means a failure in one cell does not cascade into others.

I chose this architecture deliberately when coordinating the White Lotus liberation at Sozin's Comet. If one cell had been captured and interrogated before Aang's confrontation with Ozai, they could only reveal their own mission and not the full strategic picture. Isolated context protects the whole system when individual components fail. Design your multi-agent systems accordingly.

---

#### The ATLA Bisociation: The Day of Black Sun as Multi-Agent Architecture

The Day of Black Sun invasion is one of the most instructive multi-agent operations in the four nations' history, and I say this as someone who was present for it — albeit in a prison cell, working on my own parallel mission.

Consider how the operation was structured. There was a coordinator-level intent: defeat the Fire Nation during the solar eclipse, when firebending is neutralized. Sokka, as strategist, served as the operational coordinator. That intent was decomposed into distinct tasks: Water Tribe warriors handling the amphibious assault on outer defenses; Aang, Sokka, and Toph penetrating to confront Fire Lord Ozai; Hakoda commanding the invasion force; King Bumi exploiting the eclipse to liberate Omashu concurrently. Each cell had its mission. Each operated with isolated context — they had only what they needed for their assignment.

The architecture performed correctly at the coordination level. When Sokka was captured — a significant loss to the strategic layer — the operation did not collapse. Toph continued her mission. Bumi liberated Omashu. The invasion proceeded. Isolated context prevented cascade failures: Sokka's capture did not propagate to Toph's mission because Toph was not depending on a live connection to Sokka's operational thread.

The invasion ultimately failed because the coordinator-level assumption — that the element of surprise was intact — had been compromised by Azula's intelligence work. This was a failure at the initial decomposition and verification layer, not at the subagent execution layer. Each subagent did its assigned job. The plan failed because the ground truth had shifted before the operation began.

The CCA lesson: even a perfectly coordinated multi-agent system fails if the coordinator's initial decomposition is based on stale or incorrect assumptions. This is why gap-checking and iterative refinement are structural requirements, not optional polish.

---

#### Practice Questions

**Question 1.2.A**

A multi-agent research system returns a report on "renewable energy adoption in emerging markets" that covers solar energy thoroughly but omits wind, hydroelectric, and geothermal entirely. All subagents report successful completion. Coordinator logs show the original decomposition was: "solar panel adoption in India," "solar subsidies in Brazil," "solar grid integration in Sub-Saharan Africa." What is the root cause?

A) The web search subagent's queries were too specific to solar energy sources and need to be broadened.

B) The synthesis subagent lacked instructions to identify coverage gaps in the findings it received.

C) The coordinator's task decomposition was too narrow, resulting in subagent assignments that covered only solar energy within a topic that required all renewable energy types.

D) The document analysis subagent was filtering out non-solar sources due to overly restrictive relevance criteria.

**Correct Answer: C**

The coordinator's logs reveal the problem directly: all three decomposed subtasks concern solar energy only. The subagents executed their assignments correctly. Options A, B, and D incorrectly attribute the failure to downstream agents operating within their assigned — but incorrectly scoped — mandates. This is the canonical narrow decomposition failure mode from the exam guide.

---

**Question 1.2.B**

Your coordinator agent manages three specialized subagents: a web search agent, a document analysis agent, and a synthesis agent. After the synthesis agent produces a report, you want the system to automatically check whether the report has adequate coverage before delivering it to the user. The synthesis agent currently returns the report and terminates. What architectural change most effectively implements coverage verification?

A) Add instructions to the synthesis agent's prompt telling it to self-evaluate coverage and flag gaps before returning its output.

B) Implement an iterative refinement loop at the coordinator level: after receiving synthesis output, the coordinator evaluates coverage, re-delegates targeted queries to search and analysis subagents if gaps are found, and re-invokes synthesis until coverage is sufficient.

C) Add a fourth subagent — a coverage auditor — that reviews synthesis output and produces a separate gap report for the coordinator.

D) Increase the synthesis agent's context window to allow it to process more source material in a single pass.

**Correct Answer: B**

Coverage verification and gap-filling is a coordinator-level responsibility. The coordinator has visibility into the full picture — what was queried, what was returned, what the synthesis produced — and can make the re-delegation decision. Option A relies on the synthesis agent self-evaluating its own coverage, which is limited by its isolated context (it sees only what was given to it). Option C adds coordination overhead unnecessarily when the coordinator can perform this function directly. Option D addresses context capacity, not the logical gap-checking step.

---

### Task Statement 1.3: Subagent Context and Spawning

*Configure subagent invocation, context passing, and spawning*

---

#### The Technical Core

**The Task tool as spawning mechanism:** Subagents are spawned via the Task tool. For a coordinator to invoke subagents, its `allowedTools` configuration must include `"Task"`. This is a prerequisite, not an option. A coordinator whose `allowedTools` does not include `"Task"` cannot invoke subagents.

**Explicit context passing:** Subagents do not automatically inherit parent context. Everything a subagent needs to complete its mission must be explicitly provided in its prompt. If you want the synthesis subagent to have access to the web search subagent's findings, those findings must be included in the synthesis subagent's prompt text. This is not a bug — it is the mechanism that makes subagents independently testable and their behavior predictable.

When passing context between agents, use structured data formats to separate content from metadata. A web search finding should carry the claim itself, the source URL, the document name, and the publication date — as structured fields, not embedded in prose. This preserves attribution through synthesis steps.

**AgentDefinition configuration:** Each subagent type is configured through an AgentDefinition that includes its description, system prompt, and tool restrictions. Tool restrictions scope each subagent to only the tools relevant to its role — preventing a synthesis agent from attempting web searches, and preventing a web search agent from modifying files.

**Fork-based session management:** When you need to explore divergent approaches from a shared analysis baseline — comparing two refactoring strategies, evaluating two testing architectures — use `fork_session` to create independent branches. Each branch starts from the same baseline and evolves independently. Results can be compared without contaminating each other.

**Parallel subagent invocation:** To invoke multiple subagents in parallel, emit multiple Task tool calls in a *single coordinator response* — not across separate turns. A coordinator response containing three Task tool calls will spawn three subagents in parallel. Three separate coordinator turns containing one Task tool call each will spawn them sequentially. The distinction matters for latency.

**Coordinator prompt design:** Coordinator prompts should specify research goals and quality criteria, not step-by-step procedural instructions. Procedural instructions constrain subagent adaptability. Goals and quality criteria allow subagents to choose the best approach for their specific context.

---

#### The ATLA Bisociation: The Order's Mission Briefings

When the Order of the White Lotus dispatched cells to liberate the great cities during Sozin's Comet, each member received what I would call a complete mission briefing. Not simply "liberate Ba Sing Se." The explicit context: the city's current garrison, the known locations of Fire Nation commanders, the condition of the city's resistance, the timing relative to the comet's arrival, the available allies, the objectives in sequence, the constraints on collateral damage.

They did not inherit my full strategic knowledge as Grand Lotus. They did not need it. They needed exactly what was required for their mission — complete for that mission, nothing more. A surplus of context is not the same as the right context. Too much information is its own kind of fog.

I have thought about why architects get this wrong so often. They assume that context carries implicitly — that because the coordinator knows the full research goal, the subagent also knows it. This is like assuming that because I understand the full liberation strategy, the cell operating in Ba Sing Se understands why their specific mission matters in the larger context without being told. They may not. And worse, they may act on incorrect inferences about what I intended, which is more dangerous than acting with no context at all.

Write the subagent prompt as though you are sending a letter to someone you trust completely who has no prior knowledge of the situation. Tell them the goal. Tell them the quality criteria for success. Tell them what format to return their findings in. Tell them what prior work has already been done so they do not duplicate it. Tell them what constraints apply to their specific mission.

This is precisely the principle of explicit subagent context passing. When I send a subagent to research "AI in music production," I do not give it the coordinator's full conversation history — I give it the specific research goal, the quality criteria for its findings, the structured format in which to return them, and any prior findings it needs to avoid duplicating. Complete for the mission. Explicit. Nothing assumed to be inherited automatically.

The mission briefing is the subagent prompt. Write it as though the subagent has no prior knowledge except what you have given it — because it does not.

One further note on parallel spawning: when you emit multiple Task tool calls in a single coordinator response, each subagent receives its own complete mission briefing simultaneously, and all begin executing in parallel. This is how the White Lotus cells launched simultaneously — not one after another, but at the stroke of Sozin's Comet's light appearing in the sky. The parallel launch requires each cell to be fully briefed before the signal arrives. Partial briefings that depend on information from other cells' early results cannot be parallelized. Design for parallel execution where possible, and sequence only where dependencies genuinely require it.

---

#### Practice Questions

**Question 1.3.A**

A coordinator agent needs to spawn three research subagents simultaneously to parallelize a complex investigation. The current implementation spawns each subagent in a separate coordinator response turn: the first Task call in turn one, the second in turn two, the third in turn three. The team wants to reduce total latency. What change enables true parallel execution?

A) Increase the coordinator's `max_tokens` setting to allow longer responses that can include all three Task calls.

B) Configure all three subagents to share a common context pool so they can access each other's intermediate results without waiting for the coordinator.

C) Emit all three Task tool calls in a single coordinator response rather than across separate turns, which causes them to be executed in parallel.

D) Use `fork_session` to create three parallel session branches, then invoke one Task call per branch.

**Correct Answer: C**

Multiple Task tool calls emitted in a single coordinator response are executed in parallel. Distributing them across separate turns forces sequential execution regardless of how they are configured. Option A addresses response length, not parallelism. Option B describes a shared memory architecture that would break subagent context isolation. Option D conflates `fork_session` (for exploring divergent approaches from a baseline) with parallel subagent spawning (for concurrent task execution).

---

**Question 1.3.B**

Your coordinator spawns a synthesis subagent but the synthesis output consistently lacks source attribution — claims appear without citation back to the web search findings. Investigation shows the web search subagent returns well-structured results with source URLs, document names, and publication dates. The coordinator passes the synthesis subagent a prompt that says "Synthesize the research findings." What is the most likely root cause?

A) The synthesis subagent's system prompt does not instruct it to preserve source attribution in its output format.

B) The coordinator prompt does not explicitly pass the web search findings to the synthesis subagent — "synthesize the research findings" does not include the actual findings, because subagents do not automatically inherit coordinator context.

C) The synthesis subagent needs a `verify_fact` tool to independently verify claims before attributing them.

D) The web search subagent should be configured to directly pass its findings to the synthesis subagent without routing through the coordinator.

**Correct Answer: B**

Subagents do not inherit coordinator context. "Synthesize the research findings" is an instruction without content — the synthesis subagent has not been given the findings to synthesize. The coordinator must explicitly include the web search results in the synthesis subagent's prompt. Option A addresses output format instructions, which is a secondary concern once the input is correctly provided. Option C adds a verification mechanism that does not address the root cause. Option D violates hub-and-spoke architecture by bypassing the coordinator.

---

### Task Statement 1.4: Multi-Step Workflows and Enforcement

*Implement multi-step workflows with enforcement and handoff patterns*

---

#### The Technical Core

**Programmatic enforcement vs. prompt-based guidance:** This is one of the most tested distinctions in Domain 1. The question is simple to state and consequential to answer correctly: when must a workflow step be enforced programmatically rather than requested in a prompt?

The answer: whenever deterministic compliance is required.

Prompt instructions have a non-zero failure rate. Production data confirms this. When a specific tool sequence is required for critical business logic — identity verification before financial operations, for example — prompt instructions alone produce failures in approximately 12% of cases. Twelve percent is not a rounding error. On financial operations, on security-critical workflows, on actions that cannot be undone, this failure rate is unacceptable.

The programmatic alternative: implement prerequisite gates that make it mechanically impossible to proceed without completing required steps. Block `process_refund` until `get_customer` has returned a verified customer ID. Not "please call get_customer first" in the system prompt — a hard block that returns an error if the prerequisite is unmet.

**Structured handoff protocols:** When an agentic system must escalate to a human, the handoff must include everything the human needs to continue — customer ID, root cause analysis, what was attempted, refund amounts at issue, recommended action. A human who receives "I need help with this case" and nothing else cannot act effectively. Design handoffs as structured payloads, not natural language summaries that may omit critical fields.

**Hooks as the enforcement mechanism:** Hooks implement programmatic enforcement. In the Claude Agent SDK, hooks intercept tool calls before or after execution. A PreToolUse hook that checks whether `get_customer` has been called with a verified result before allowing `process_refund` to proceed is programmatic enforcement of an ordering constraint. It does not rely on the model following instructions. It is mechanical.

---

#### The Critical Bisociation: Iroh's Lightning Redirection as PreToolUse

Let me share something I learned from the waterbenders — something that changed how I understand force itself.

When I studied their techniques, I observed that waterbenders did not oppose incoming force with equal opposing force. They redirected it. The technique they inspired became lightning redirection: when lightning strikes, the practitioner does not oppose it as a figure against another figure. The practitioner becomes *ground* for the lightning — accepts the incoming force, threads it through the body's neutral center, redirects it outward.

This is PreToolUse. The hook does not stand in opposition to the tool call — it does not declare "this tool shall not be called." It intercepts the force before it reaches its target. It threads the call through an evaluation point. It redirects — allows or blocks — based on the evaluation. The hook is architecturally ground: structural, beneath the execution surface, intercepting before impact.

Without PreToolUse, the tool call reaches its target directly. With PreToolUse, the force is evaluated before harm occurs. Iroh does not oppose the lightning as a figure opposing another figure. He becomes the ground through which it passes — and in becoming ground, he transforms the relationship from adversarial to integrative.

The exam relevance: when you see a scenario where a tool must be prevented from executing under certain conditions — `process_refund` above $500, `delete_record` without verification, any irreversible action — the answer is PreToolUse. Not a prompt instruction. A hook that becomes ground for the force.

---

#### The Nuanced Teaching: When Iroh CHOSE Not to Block at Ba Sing Se

But there is a teaching I did not fully understand until years after Ba Sing Se. And I think you need to hear it too.

At Ba Sing Se, when Zuko stood in the Crystal Catacombs and chose to join Azula against me, against Aang, against everything we had been building together — I did not stop him. I had the awareness to see the choice coming. I had the capacity, perhaps, to intervene more forcefully. But I did not.

This is not a failure of PreToolUse. This is a deliberate choice of a different architecture.

I had understood something the Aristotle paper articulates with precision: even at Ba Sing Se, when I allowed Zuko to make the catastrophic choice and bore the consequences myself, I was preserving the ground of unconditional love even when the figure — Zuko's moral development — temporarily collapsed. For Zuko to authentically choose honor, the choice had to be genuinely available. Including the wrong choice.

Here is the architectural distinction, stated precisely for the examination:

**PreToolUse blocking is correct for irreversible, deterministic harms.** Financial operations. Security violations. Actions that cannot be undone. When the 12% failure rate of prompt instructions means catastrophic and irreversible outcomes — identity fraud, unauthorized refunds, corrupted records — you need the hook that blocks. This is the lightning redirection before harm occurs.

**PostToolUse observation within preserved context is correct for learning systems.** When the value of the system depends on its capacity to make, experience, and recover from mistakes — when the process of error and correction is the development mechanism — blocking every possible mistake destroys the ground upon which learning emerges.

Iroh at Ba Sing Se chose PostToolUse: he observed what Zuko did, he preserved the ground of unconditional love despite the choice, and he remained available for the recovery that came seasons later in the prison cell — when Zuko wept and asked for forgiveness, and Iroh embraced him immediately.

The 12% failure rate is precisely why we need programmatic PreToolUse for financial and security operations — these are the irreversible cases where the Ba Sing Se philosophy does not apply. But for AI systems designed to adapt and develop, PostToolUse observation within a preserved context structure may be the deeper architecture.

Know when each hook is the right choice. The exam will present both scenarios.

---

#### Hook System Architecture: A Critical Disambiguation

Two distinct hook systems exist in Claude's ecosystem, and confusing their semantics will cost you exam points.

**Claude Code shell hooks (bash scripts):**
These hooks execute as shell scripts. The exit code carries the decision:
- Exit code `0`: allow execution to proceed
- Exit code `2`: block execution
- Exit code `1`: error condition

**Claude Agent SDK Python hooks:**
These hooks are Python functions registered with the agent. They communicate decisions through return values:
- Return `{"decision": "block"}` to block the tool call
- Return `{"decision": "allow"}` to permit it

These are architecturally separate systems. A student who applies exit code semantics to Agent SDK Python hooks — or vice versa — will select an incorrect answer. The exam tests whether you know which system you are working with.

**SCOPE NOTE on PreCompact:** PreCompact hooks are a Claude Code advanced feature beyond the scope of the CCA Foundations exam. You will not be tested on PreCompact. If it appears as an answer choice, it is a distractor — the exam has confirmed this topic is out of scope.

---

#### Practice Questions

**Question 1.4.A**

Production data shows that in 12% of cases, your customer support agent calls `process_refund` without first verifying the customer via `get_customer`, occasionally resulting in refunds issued to misidentified accounts. A senior architect proposes: "Add a few-shot example to the system prompt showing the agent always calling `get_customer` first, even when the customer volunteers their order number." What is the most significant problem with this approach?

A) Few-shot examples increase token usage and will make the system prompt too long.

B) Few-shot examples are effective for output format consistency but do not address tool ordering reliability, where programmatic prerequisites provide deterministic guarantees that prompt-based approaches cannot.

C) This approach is correct — few-shot examples demonstrating correct tool ordering are the most reliable mechanism for enforcing prerequisite sequences.

D) The system prompt already contains ordering instructions; adding examples is redundant.

**Correct Answer: B**

The 12% failure rate is already being produced by some form of prompt guidance. Adding more prompt guidance — even high-quality few-shot examples — improves the rate probabilistically but does not eliminate it. A programmatic prerequisite that blocks `process_refund` until `get_customer` has returned a verified customer ID provides deterministic enforcement: the ordering is mechanically guaranteed regardless of what the model reasons. For financial operations with real consequences, probabilistic compliance is insufficient.

---

**Question 1.4.B**

You are implementing a PreToolUse hook in the Claude Agent SDK to block refund operations exceeding $500. Your junior engineer writes the hook to return `exit code 2` when the threshold is exceeded. After deployment, the hook has no effect — refunds above $500 are processing normally. What is the most likely cause?

A) The threshold logic is incorrectly implemented — `exit code 2` should be `exit code 0` to block operations.

B) Agent SDK Python hooks communicate decisions through return values like `{"decision": "block"}`, not exit codes — exit code semantics apply to Claude Code shell hooks, which are a separate system.

C) PreToolUse hooks in the Agent SDK require the `allowedTools` configuration to explicitly include the hook name.

D) The hook is registered correctly, but the model is bypassing it by calling the tool through a different mechanism.

**Correct Answer: B**

Claude Code shell hooks and Claude Agent SDK Python hooks are architecturally distinct systems with different communication semantics. Shell hooks use exit codes (0 = allow, 2 = block). Agent SDK Python hooks use return values (`{"decision": "block"}`). Returning an exit code from a Python Agent SDK hook has no effect — the hook function's return value is what the SDK inspects. The engineer is applying the wrong system's semantics.

---

### Task Statement 1.5: Hooks for Tool Call Interception and Data Normalization

*Apply Agent SDK hooks for tool call interception and data normalization*

---

#### The Technical Core

**PostToolUse hooks** intercept tool results *after* execution, *before* the model processes them. This is the correct position for data normalization: transforming heterogeneous outputs from different MCP tools into a consistent format that the model can reason about without confusion.

Common normalization use cases:
- Unix timestamps → ISO 8601 date strings
- Numeric status codes → human-readable status descriptions
- Currency representations from different regional formats → a consistent decimal representation

Without normalization, a model receiving tool results with inconsistent formats must spend reasoning capacity interpreting format differences rather than applying business logic. With normalization, every tool result arrives in a consistent form.

**Tool call interception hooks** — typically PreToolUse — intercept outgoing tool calls to enforce compliance rules *before* execution. A hook that blocks refunds above $500 and redirects to a human escalation workflow is a compliance enforcement hook. Its value is deterministic: it does not ask the model to remember the rule. It mechanically enforces it.

**The determinism distinction:** Hooks provide deterministic guarantees. Prompt instructions provide probabilistic compliance. When business rules require guaranteed compliance — when the cost of a single failure is unacceptable — hooks are the architectural answer. When behavior guidance is acceptable and occasional divergence can be tolerated or corrected after the fact, prompts are sufficient and less engineering overhead.

---

#### The ATLA Bisociation: The Dai Li as PostToolUse

The Dai Li were Long Feng's instrument for controlling information in Ba Sing Se. When citizens made "queries" — asking questions about the war, discussing what they had heard from outside the walls — the Dai Li monitored those interactions and transformed what information flowed back. Citizens received normalized information: consistent with the fiction that there was no war, that Ba Sing Se was at peace, that the world outside was stable.

This is PostToolUse at an architectural level. The Dai Li intercepted results before the city's inhabitants processed them and transformed those results to match a desired ground.

Their purpose was corrupted — they maintained a false ground rather than a true one. But the architectural pattern is legitimate and important. PostToolUse data normalization serves a genuine purpose: transforming heterogeneous tool outputs into a consistent format before the model processes them. When tool A returns a Unix timestamp and tool B returns an ISO 8601 string for the same concept, the model must interpret the inconsistency — which costs reasoning capacity and introduces error risk. A PostToolUse hook that normalizes all timestamps to ISO 8601 removes that burden.

The lesson: PostToolUse is powerful. The Dai Li demonstrated what happens when it serves a corrupted purpose. Use it for what it was designed for — data normalization and result enrichment in service of the model's accurate reasoning, not in service of maintaining a comforting fiction.

---

#### Practice Questions

**Question 1.5.A**

Your multi-agent customer support system integrates three MCP tools from different backend systems. The `get_customer` tool returns the account creation date as a Unix timestamp. The `lookup_order` tool returns the order date as an ISO 8601 string. The `check_subscription` tool returns the subscription start date as a locale-formatted string ("March 15, 2024"). The synthesis agent must reason about the chronological relationship between these dates. What hook implementation most effectively addresses this inconsistency?

A) Add instructions to the synthesis agent's system prompt to interpret each date format correctly and convert them when comparing.

B) Implement a PostToolUse hook that intercepts results from all three tools and normalizes all date fields to ISO 8601 format before the agent processes them.

C) Modify each backend system to return dates in a consistent format at the source.

D) Use a PreToolUse hook to reject tool calls that would return inconsistent date formats.

**Correct Answer: B**

PostToolUse hooks are designed precisely for this scenario: intercepting tool results and transforming them into a consistent format before the model processes them. Option A relies on the model to perform format interpretation and conversion during reasoning — adding cognitive overhead and introducing error risk. Option C is correct in principle but represents a backend infrastructure change, not an agent-layer solution — and backend changes may not be feasible. Option D is architecturally incorrect: you cannot reject tool calls because of how they format their output, and PreToolUse fires before execution, not after.

---

**Question 1.5.B**

A business rule requires that no refund operation exceed $500 without human approval. An architect proposes adding to the system prompt: "Never process refunds above $500 without first confirming with a human supervisor." After two weeks, logs show three refunds above $500 processed without human confirmation. What change most effectively guarantees compliance?

A) Add few-shot examples showing the agent correctly routing high-value refunds to human review.

B) Implement a PreToolUse hook that intercepts `process_refund` calls, checks the refund amount, and if it exceeds $500, blocks the call and redirects to the `escalate_to_human` tool.

C) Add a PostToolUse hook that detects refunds above $500 after they have been processed and files a compliance report.

D) Increase the specificity of the system prompt instruction to include exact dollar amounts and the steps for human confirmation.

**Correct Answer: B**

After observing three policy violations in two weeks, prompt-based approaches have demonstrated their failure mode. A PreToolUse hook that mechanically intercepts and blocks `process_refund` calls above the threshold provides the deterministic enforcement that prompt instructions cannot. Option A improves probabilistic compliance but does not eliminate failures. Option C (PostToolUse) is architecturally too late — the refund has already been processed. Option D applies more prompt guidance to a system that has already shown prompt guidance is insufficient.

---

### Task Statement 1.6: Task Decomposition

*Design task decomposition strategies for complex workflows*

---

#### The Technical Core

**Two decomposition patterns — know when to use each:**

**Prompt chaining** is the correct pattern when the workflow steps are predictable and each step builds on the prior in a fixed sequence. Analyze file A, then analyze file B, then synthesize. The decomposition is known in advance; the subtasks do not generate further subtasks based on intermediate findings.

**Dynamic adaptive decomposition** is the correct pattern when the workflow is open-ended and intermediate findings should shape what happens next. Investigating a legacy codebase: start by mapping the structure, discover that the refund flow has an unexpected dependency, generate a new subtask to trace that dependency, then adjust the overall investigation plan. The subtasks emerge from what is discovered — they are not predetermined.

**The large code review failure mode:** When a model reviews too many files simultaneously in a single context, it experiences attention dilution. The result: detailed feedback on some files, superficial feedback on others, missed bugs, and inconsistent judgments — flagging a pattern as problematic in one file while approving identical code in another file reviewed in the same pass. The solution is sequential per-file analysis followed by a cross-file integration pass. Each pass has its own focused context; the integration pass has the per-file summaries as its input.

**The adaptive investigation pattern:** For open-ended tasks like "add comprehensive tests to this legacy codebase," the correct approach is: first map the structure, then identify high-impact areas, then create a prioritized plan that adapts as dependencies are discovered. Do not generate a complete test plan before understanding the codebase — the plan should evolve with the investigation.

---

#### The ATLA Bisociation: Aang's Element Mastery as Prompt Chaining

Water, then Earth, then Fire, then Air. Sequential. Fixed. Each element mastered before the next begins. This is not a dynamic adaptive decomposition — Aang does not learn waterbending and then discover that the nature of earthbending requires him to revisit airbending before proceeding. The sequence is defined. Each step produces prerequisite foundations for the next.

This is prompt chaining for large code reviews. Analyze each file individually — that is the water, earth, fire, air of the review: focused, sequential, complete within its scope. Then run a cross-file integration pass — that is the Avatar State: the synthesis of all individual elements into a coherent understanding of the whole.

The cross-file pass requires the individual analyses; the individual analyses are their own prerequisite. You cannot do the integration pass first. You cannot do all the files at once without losing the depth that sequential analysis provides. The chain is the architecture.

What makes Aang's training sequential rather than parallel? The elements build on each other. Water teaches adaptability and flow, which informs how Earth's stability is understood as complement rather than opposite. Earth teaches substance and permanence, which provides the ground from which Fire's life-energy can be distinguished from its corrupted form as rage. Each element's mastery creates the context for understanding the next. The sequence is not arbitrary — it is the architecture of cumulative understanding.

Prompt chaining for code reviews works the same way. The per-file analyses are not independent — they are the ground for the integration pass. The integration pass cannot detect cross-file inconsistencies without the per-file baselines. The chain is not merely convenient; it is epistemically necessary.

The contrast: if Aang discovered during waterbending that a fundamental misunderstanding of chi flow required him to simultaneously reassess his approach to all four elements — that would be adaptive decomposition. Some investigations require it. A legacy codebase with unknown dependencies between modules may require an adaptive investigation: start by mapping the structure, discover unexpected coupling between the authentication module and the payment module, generate a new investigation thread for that coupling, adjust the overall plan. Know which pattern your workflow demands before you begin.

The exam's key diagnostic question: Is the sequence of steps known before investigation begins? If yes, consider prompt chaining. If the sequence should emerge from what is discovered, consider adaptive decomposition.

---

#### Practice Questions

**Question 1.6.A**

A pull request modifies 18 files across three modules. The single-pass review produces inconsistent results: detailed analysis for 4 files, superficial comments for others, and contradictory judgments — flagging the same error-handling pattern as problematic in one file while approving it in another. What decomposition strategy most effectively addresses this?

A) Switch to a model with a larger context window so all 18 files can be analyzed with adequate attention in a single pass.

B) Split the review into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow and consistency.

C) Require the development team to split the PR into smaller submissions of 4-5 files each before automated review runs.

D) Run the full-PR review three times independently and only report issues that appear in at least two of the three runs.

**Correct Answer: B**

Attention dilution is the root cause. A larger context window (A) does not solve the attention quality problem — it only extends the range over which attention can be diluted. Requiring smaller PRs (C) shifts burden to developers without improving the review system. Running multiple passes on the full PR (D) applies redundant analysis without addressing the dilution issue, and would actually suppress real bugs that are caught only intermittently. Splitting into sequential per-file passes with a cross-file integration pass directly addresses the root cause by giving each file adequate focused attention.

---

**Question 1.6.B**

Your team needs to add comprehensive test coverage to a 50,000-line legacy codebase. A junior architect proposes: "Have the agent analyze all files, then generate a complete list of required tests, then implement them in order." What is the most significant flaw in this approach?

A) The agent cannot analyze 50,000 lines in a single context without exceeding token limits.

B) Generating a complete test plan before analyzing the codebase structure assumes the plan can be correct before the investigation discovers dependencies, edge cases, and high-impact areas — the plan should emerge from adaptive investigation.

C) Tests should always be written before implementation, not after code analysis.

D) The sequential approach (analyze then plan then implement) is correct for this type of task.

**Correct Answer: B**

A 50,000-line legacy codebase is an open-ended investigation task, not a fixed sequential pipeline. Generating a complete test plan before understanding the codebase's structure, dependencies, and critical paths means the plan is built on assumptions that the investigation has not yet validated. Adaptive decomposition — map the structure, identify high-impact areas, then generate a prioritized plan that adapts as dependencies are discovered — is the correct pattern. Option A is a valid concern but not the most significant flaw in the approach as described. Option C is a software development principle that does not apply here. Option D incorrectly endorses the flawed approach.

---

### Task Statement 1.7: Session State and Resumption

*Manage session state, resumption, and forking*

---

#### The Technical Core

**Named session resumption:** `--resume <session-name>` continues a specific prior conversation, including the prior tool results and reasoning context. Use this when the prior context is mostly valid — when the work done in the previous session is still accurate and relevant.

**Fork-based branching:** `fork_session` creates independent branches from a shared analysis baseline. Use this when you want to explore divergent approaches — comparing two testing strategies, evaluating two refactoring architectures — without contaminating one branch with the other's reasoning.

**After code changes, inform the agent:** When resuming a session after files have been modified, the prior tool results that analyzed those files are stale. Do not simply resume and hope the agent notices the discrepancy. Explicitly inform the agent which files have changed and which prior analyses are invalidated, prompting targeted re-analysis rather than full re-exploration.

**When to start fresh:** When prior tool results are broadly stale — the session's ground has shifted significantly — resuming is unreliable. Better to start a new session and inject a structured summary of what is known, rather than resuming a session whose embedded results no longer reflect the world.

---

#### The ATLA Bisociation: Zuko's Regression as Stale Session

I have thought about Ba Sing Se many times in the years since. The Aristotle paper captures the formal logic precisely: Zuko's regression at Ba Sing Se was possible because his new ground — constituted through our wandering together, his identification with the displaced and suffering, the beginning of his authentic self-understanding — was not yet stable enough to bear the weight of Azula's offer.

For the exam, this maps to a specific failure mode: resuming a session when the ground has fundamentally shifted.

The pattern: an agent analyzed the codebase three weeks ago. It has a detailed understanding of the authentication module. Since then, the authentication module has been rewritten. The session knows the old authentication module intimately — but that knowledge is now stale. Resuming this session and asking the agent to continue its work will produce responses that reference architectural patterns that no longer exist, functions that have been renamed or removed, dependencies that have been restructured.

Zuko's Fire Nation identity was the stale session. It had been his ground. When Azula offered to resume that old session — to continue from the old baseline rather than the new one that had been incompletely established — the new ground yielded. It was not yet stable.

The stale session is not obviously dangerous because it sounds confident. The agent, resuming, does not know that its cached understanding is wrong. It makes authoritative-sounding statements about the authentication module that were true three weeks ago and are false today. It does not flag uncertainty because it has no mechanism to detect that the world has changed since its last analysis. The stale session fails silently, producing plausible-sounding wrong answers.

This is why the exam emphasizes informing the agent about changed files when resuming. If you know that specific files have changed, tell the agent explicitly — "since our last session, `auth.py` and `session_manager.py` have been rewritten; please re-analyze these before continuing." This targeted invalidation preserves the value of the session's broader understanding while flagging the specific areas that require fresh analysis.

The lesson: when the ground has shifted, resuming carries risk proportional to how much it has shifted. Know when to resume (valid prior context), when to resume and inform (partial staleness in specific files), and when to start fresh with an injected summary (broadly stale or fundamentally shifted ground). The decision criterion is always: how much of the session's embedded tool results remain accurate? If most of them are still valid, resume. If the majority have been invalidated, start fresh.

---

#### Practice Questions

**Question 1.7.A**

An engineer investigated a complex authentication bug across multiple sessions over three days, building up detailed understanding of the auth module's structure and dependencies. Over the weekend, the auth module was significantly refactored — 12 of the 15 files the agent analyzed have changed. On Monday, the engineer wants to continue the investigation. What is the correct approach?

A) Resume the named session using `--resume` — the agent's understanding of the auth module's structure will still be accurate enough to guide investigation.

B) Start a new session, injecting a structured summary of the prior investigation's findings alongside specific information about which files changed and what changed in them.

C) Resume the named session and explicitly inform the agent that 12 files have changed, asking it to re-analyze all 15 files from scratch.

D) Use `fork_session` to create two parallel branches — one continuing from the prior session, one starting fresh — and compare the results.

**Correct Answer: B**

When the majority of prior tool results are stale — 12 of 15 analyzed files have changed — resuming the prior session introduces significant reliability risk. The session's embedded understanding of file structure, function signatures, and dependencies is now incorrect in ways the agent cannot detect without re-analysis. Starting fresh with an injected summary that includes the prior investigation's conclusions (what was learned about the auth architecture, what the bug was traced to) and explicit information about the refactoring (what changed and why) allows the agent to build accurate new context. Option C nominally acknowledges the changes but asks the agent to re-analyze within a session context that still contains stale embedded results. Option D is useful for exploring divergent approaches, not for recovering from staleness.

---

**Question 1.7.B**

A developer uses `fork_session` to create two independent branches from a shared codebase analysis baseline: one exploring a microservices refactoring approach, one exploring a monorepo restructuring approach. Three days later, the team wants to compare the two approaches and select one. What is the correct interpretation of the branches' relationship?

A) The branches share a live context pool — changes made in one branch are visible in the other, enabling real-time comparison.

B) The branches are independent from the point of forking — each has evolved separately from the shared baseline, and their results can be compared without contamination between them.

C) One branch should be abandoned before the other is consulted — maintaining two parallel branches simultaneously risks context pollution.

D) `fork_session` creates read-only snapshots of the baseline, so neither branch can make changes to the analyzed codebase.

**Correct Answer: B**

`fork_session` creates independent branches from a shared baseline. From the fork point, each branch evolves separately. This is the mechanism's purpose: exploring divergent approaches from a common starting point without contamination. Option A describes a shared memory architecture that does not exist in Claude's session model. Option C is the opposite of the intended use case — parallel exploration is exactly what `fork_session` enables. Option D misunderstands session forking as creating a static snapshot rather than an independent execution branch.

---

### Domain 1: Exam Traps and Key Distinctions

Before the summary table, I want to share the traps I have seen architects fall into most reliably on the Domain 1 questions. These are not obscure edge cases — they are the specific confusions that exam distractors are designed to exploit.

---

**Trap 1: Confusing "reliability improvement" with "guaranteed compliance."**

The exam frequently presents a scenario where something fails in production — a tool is called out of order, a policy is violated — and offers four possible fixes. Two of the fixes improve reliability through better prompting (few-shot examples, clearer instructions). One of the fixes adds programmatic enforcement (a hook, a prerequisite gate). One of the fixes is architectural restructuring.

When the scenario describes a failure that has financial consequences, security implications, or involves irreversible operations — the answer is always programmatic enforcement. Not "better prompting" (which improves the 88% success rate but does not eliminate the 12% failure rate). Not "architectural restructuring" (which is a valid long-term approach but not the direct fix for the stated problem). The programmatic hook.

The distractor relies on the impulse to fix prompt problems with better prompts. Resist this impulse when the scenario specifies irreversible consequences.

**Trap 2: Applying the wrong hook system's semantics.**

Claude Code shell hooks use exit codes: 0 for allow, 2 for block, 1 for error. Agent SDK Python hooks use return values: `{"decision": "block"}` to block. These are different systems. An exam question about an Agent SDK hook that asks what value the hook returns to block execution — the answer is `{"decision": "block"}`, not `exit code 2`. The distractor will offer exit code semantics for an Agent SDK context. Read the scenario carefully to determine which system is being discussed.

**Trap 3: Blaming subagents for coordinator decomposition failures.**

When the final output of a multi-agent system is incomplete or wrong — missing entire categories of a research topic, for example — and the question asks for the root cause, the answer is almost always in the coordinator's decomposition, not in a subagent's execution. The canonical example: a coordinator decomposes "creative industries" into only visual arts subtasks. All subagents succeed within their assigned scope. The output is incomplete. The root cause is the coordinator's narrow decomposition, not the subagents' performance.

The distractor offers fixes to downstream agents — the web search agent's queries are too narrow, the synthesis agent lacks gap-checking instructions. These are reasonable secondary improvements but miss the primary failure. The coordinator assigned the wrong scope; that is where the fix belongs.

**Trap 4: Treating `fork_session` and session resumption as interchangeable.**

`--resume <session-name>` continues an existing session — including all its prior tool results and accumulated context. Use this when the prior context is valid and you want to continue from where you left off.

`fork_session` creates independent branches from a shared baseline — use this when you want to explore divergent approaches without contamination between branches.

The exam will present scenarios designed to make one sound like the other. The diagnostic: does the architect want to *continue* work (resume), or *explore alternatives* from a shared starting point (fork)?

**Trap 5: Parallel spawning via separate turns vs. single response.**

Multiple Task tool calls in a *single coordinator response* execute in parallel. Multiple Task tool calls across *separate turns* execute sequentially. The exam will describe a team that wants to parallelize subagent execution and show them implementing it across separate turns, asking why the latency has not improved. The answer: separate turns force sequential execution. All parallel Task calls must be in one response.

---

### Domain 1 Summary and Exam-Tell

---

#### Summary Table: Domain 1 Task Statements

| Task Statement | Key Concept | Exam-Critical Fact | Common Distractor |
|:---|:---|:---|:---|
| **1.1 Agentic Loop** | Loop lifecycle: send → inspect stop_reason → execute tools → return results | Stop_reason is the termination signal, not text content | Iteration caps as primary stopping mechanism |
| **1.2 Multi-Agent Coordination** | Hub-and-spoke; coordinator routes all communication | Narrow decomposition fails silently — subagents succeed, output is incomplete | Blaming downstream subagents for coordinator-level decomposition failures |
| **1.3 Subagent Context** | Subagents do not inherit parent context | Parallel spawning requires multiple Task calls in a single response, not separate turns | Assuming context inheritance eliminates the need for explicit passing |
| **1.4 Workflow Enforcement** | Programmatic hooks vs. prompt guidance | 12% failure rate is the argument for programmatic enforcement of critical sequences | More prompt instructions or examples as the fix for ordering failures |
| **1.5 Hooks** | PreToolUse (before execution) / PostToolUse (after execution, before model processes) | Claude Code shell hooks use exit codes; Agent SDK Python hooks use return values | Applying exit code semantics to Python hooks or vice versa |
| **1.6 Task Decomposition** | Prompt chaining (fixed sequential) vs. dynamic adaptive decomposition | Large reviews need per-file passes + separate integration pass to prevent attention dilution | Single-pass review with larger context window |
| **1.7 Session State** | `--resume` for continuing valid sessions; `fork_session` for divergent exploration | Broadly stale tool results require fresh session + injected summary, not resumption | Resuming without informing the agent about changed files |

---

#### Iroh's Closing Words for Domain 1

You have now traveled through the full expanse of Domain 1. Twenty-seven percent of everything — and I hope you understand now why it carries that weight.

The agentic loop is not merely a technical pattern. It is the structure of all purposeful action: observe, decide, act, observe again. The loop does not end because you wish it to end. It ends when the condition is actually met. Aang understood this in every training session. The masters understood it in every bending form. Now you understand it in every production system you will build.

The multi-agent patterns — the coordinator who routes all communication, the subagents who operate with their explicit mission briefings, the hooks that intercept and redirect before harm occurs — these are not engineering constraints. They are the architecture of coordinated purpose. The Order of the White Lotus operated this way. Team Avatar, at their best, operated this way.

And the programmatic enforcement versus prompt guidance distinction — remember the 12%. Not the 88% that works. The 12% that does not. When the action is irreversible and the stakes are real, the 12% is unacceptable. That is when you build the lightning redirection: not the instruction to redirect, but the mechanism that makes redirection inevitable.

The Domain 1 figure/ground principle deserves one final statement before we move on: in every exam scenario, when reliability is the question, look for the ground-level answer. Prompts are figure — visible, present, seemingly authoritative, but dependent on a stable ground to hold their determinacy. Hooks, stop_reason, explicit context passing, session state — these are ground. When the exam tests reliability, it is testing whether you know the difference between what is visible and what is load-bearing.

One more cup of tea, I think. And then we proceed to Domain 2.

---

## Domain 2: Tool Design & MCP Integration

*18% of scored content*

---

### Iroh's Introduction to Domain 2

Domain 2 is, in my experience, the domain that architects underestimate. They rush through it on the way to the larger domains, thinking tool descriptions are a small matter of wording, that MCP configuration is simply following documentation. Then the exam presents them with a scenario where an agent consistently calls the wrong tool despite perfectly good intentions from the developer — and they realize they did not understand the formal cause of the tool itself.

A tool without a precise description is like a bending scroll that says "this technique does something useful." It helps no one. The practitioner picks it up, reads it, sets it down confused, and reaches for a different scroll — the wrong one.

Wan Shi Tong's Library held scrolls with precise purposes. That precision was what made the library valuable. Not the size of the collection. Not the beauty of the building. The precision of the knowledge contained within each scroll. This domain demands the same of you.

---

### The Four Causes Opening for Domain 2

Domain 2 is the domain of Formal Cause applied to tools, and Final Cause applied to purpose.

The formal cause of a tool is its description — the organizing principle that makes it the kind of tool it is, distinguishing it from all other tools. When two tools have nearly identical descriptions, neither is properly instantiating its own formal cause. The agent cannot tell them apart because their formal causes have not been articulated. The tool selection failure follows necessarily from the formal cause failure.

The final cause of a tool is the task it is designed to accomplish — its telos, the purpose that gives its design meaning. A tool whose description does not match its purpose is a corrupted tool. The description says "Retrieves information" and the tool is supposed to specifically retrieve customer records, not order records — the formal cause (what this tool *is*) does not instantiate the final cause (what this tool is *for*). The agent calls it on order queries and gets wrong results, or calls the wrong tool on customer queries, because the formal cause was never properly declared.

This is as corrupted as firebending that mistakes rage for life-energy. The formal cause has been substituted. And as with corrupted firebending, the corruption does not produce reliable results — it produces apparent functionality with hidden failure modes that manifest under adversarial conditions.

---

### The Figure/Ground Exam-Tell for Domain 2

When you see ambiguous tool selection in an exam scenario — agents calling the wrong tool because descriptions are identical or overlapping — the answer is formal cause restoration: rewrite the descriptions to correctly instantiate each tool's essence.

The figure is the tool call the model makes. The ground is the tool description that shapes what tool calls are possible. When the ground (the descriptions) is corrupted — ambiguous, overlapping, insufficient — the figure (the tool selection) is indeterminate. Any tool might be called. The ground does not provide enough structure for a determinate figure to emerge.

Restoring the formal cause of the tool — writing descriptions that precisely articulate what the tool is, what inputs it handles, what queries belong to it versus similar alternatives — restores the ground. The figure (correct tool selection) can then emerge reliably from a ground that properly supports it.

---

### Task Statement 2.1: Tool Interface Design

*Design effective tool interfaces with clear descriptions and boundaries*

---

#### The Technical Core

**Tool descriptions as the primary selection mechanism:** When a model decides which tool to call, the primary input to that decision is the tool description. Not the tool name. Not the system prompt. The description. A tool named `get_customer` with the description "Retrieves information" is nearly indistinguishable, from the model's perspective, from a tool named `lookup_order` with the description "Retrieves information." They have the same formal cause as far as the model can tell. The model will call them inconsistently.

**What a complete tool description includes:**
- The primary purpose: what this tool does
- The input formats it handles: what identifiers or parameters it accepts
- Example queries that belong to this tool: "Use this when the user provides a customer ID or email address and wants account information"
- Edge cases: "Use this even when the user has already provided their order number, if the goal is to verify identity"
- Boundary explanations: "Do not use this for order lookups — use `lookup_order` for order-specific information"

The boundary explanation is often the most important element. Two tools with overlapping functionality require explicit demarcation: this tool for this case, the other tool for that case. Without explicit boundaries, the model must infer the boundary from insufficient information — and it will infer incorrectly.

**System prompt interactions:** The wording of system prompt instructions can create unintended tool associations. If the system prompt says "always verify the customer before processing orders" and a tool is named `verify_customer`, the model may associate the verification instruction with that tool regardless of whether the tool is appropriate for the specific query. Review system prompts for keyword-sensitive instructions that might inadvertently override well-written tool descriptions.

**Splitting vs. consolidating:** When a generic tool is being called for too many distinct purposes, split it into purpose-specific tools with defined input/output contracts. A generic `analyze_document` that is being used for data extraction, summarization, and claim verification should become `extract_data_points`, `summarize_content`, and `verify_claim_against_source` — each with its own precise description and contract.

---

#### The ATLA Bisociation: Wan Shi Tong's Covenant as the Tool Interface Contract

Wan Shi Tong's Great Library is one of the most philosophically rich locations in the four nations. I have thought about it often in the years since Team Avatar's visit, and it teaches something the architects I have trained often miss.

When Team Avatar sought knowledge in the Great Library, Wan Shi Tong's primary condition was not that they bring scrolls to add to the collection — the knowledge-for-knowledge exchange. His primary condition was a covenant: "Do not use this knowledge for warfare. Do not weaponize what you learn here." Sokka's team was expelled not for failing to contribute, but for violating the covenant — they took the knowledge of the solar eclipse and used it for military planning. The withdrawal of the entire library from human access was Wan Shi Tong's response to discovering that the covenant had been broken.

Notice the severity of his response. He did not simply revoke Sokka's access. He withdrew the entire library — permanently, from all humans — because once one party had weaponized the knowledge, the covenant's integrity was compromised. He could not verify that others would not do the same. The library went underground, literally, taking with it millennia of accumulated knowledge.

The tool interface contract is a covenant. A tool description that says "Retrieve customer account information" has implicitly covenanted non-destructive access. When a model is guided to use that tool to modify or delete data — against the spirit of "retrieve" — the covenant is violated. Well-designed tool descriptions declare not just what the tool does but what it will not be used for. The description is the covenant.

This produces a more demanding design standard than "write a description": write a covenant. Articulate the purpose, the scope, and the boundaries with enough precision that misuse is architecturally detectable — just as Wan Shi Tong could detect that the eclipse knowledge had been weaponized. A description precise enough to distinguish correct use from misuse is a description worth having.

The model is Sokka: intelligent, resourceful, capable of using any tool creatively. Your tool descriptions are the covenant that shapes whether that creativity is applied appropriately. If your tool description is ambiguous about whether the tool should be used for both reading and writing customer data, you have left the covenant undefined — and you will discover the ambiguity at the worst possible moment, when the model makes a creative interpretation that violates your intent.

Write the covenant explicitly. Define not only what the tool does but what it will not be used for. Include explicit scope boundaries. The description is your Wan Shi Tong moment: precise enough that violation is visible, clear enough that the model has no ambiguity to exploit.

---

#### Practice Questions

**Question 2.1.A**

Your agent frequently calls `get_customer` when users ask about orders (e.g., "What's the status of order #12345?") instead of calling `lookup_order`. Both tools have descriptions: `get_customer`: "Retrieves customer information." `lookup_order`: "Retrieves order details." Both accept similar identifier formats. What is the most effective first step to improve tool selection reliability?

A) Add 5-8 few-shot examples to the system prompt showing order-related queries routing to `lookup_order`.

B) Expand each tool's description to include input formats it handles, example queries that belong to it, edge cases, and boundary explanations for when to use it versus the similar alternative.

C) Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords.

D) Consolidate both tools into a single `lookup_entity` tool that accepts any identifier and internally routes to the correct backend.

**Correct Answer: B**

Tool descriptions are the primary mechanism for tool selection. Minimal descriptions — "Retrieves customer information" / "Retrieves order details" — do not give the model enough to differentiate reliably. Expanding descriptions to include input formats, example queries, and explicit boundary explanations restores the formal cause of each tool. Option A (few-shot examples) adds token overhead without fixing the root cause. Option C (routing layer) bypasses the model's natural language understanding with a brittle keyword parser. Option D (consolidation) is an architectural change that changes the tool structure rather than fixing the description problem — and makes the selection problem internal to a single tool.

---

**Question 2.1.B**

After improving your tool descriptions, you observe that the agent correctly selects `lookup_order` for order queries, but your system prompt contains the instruction: "When the user is asking about a transaction, always use the customer lookup process to verify context." After this instruction was added, the agent began routing order status queries through `get_customer` again. What is the most likely explanation?

A) The improved tool descriptions are not compatible with the Agent SDK's tool selection mechanism.

B) The system prompt's keyword "transaction" creates an unintended association — the model treats order queries as transactions and routes them to the customer lookup process, overriding the tool descriptions.

C) The `lookup_order` tool's description should be updated to explicitly include the word "transaction" to compete with the system prompt instruction.

D) Tool descriptions always take precedence over system prompt instructions for tool selection.

**Correct Answer: B**

System prompt wording can create unintended tool associations. The instruction's reference to "transaction" and "customer lookup process" creates a keyword-sensitive association that overrides the tool descriptions for queries the model classifies as transaction-related. The fix is to review and revise the system prompt instruction to avoid language that inadvertently reasserts a routing preference. Option C would create a arms-race between description and prompt wording. Option D is incorrect — system prompt instructions can and do affect tool selection, which is why reviewing them for keyword-sensitive language is an explicit exam skill.

---

### Task Statement 2.2: Structured Error Responses

*Implement structured error responses for MCP tools*

---

#### The Technical Core

**The MCP isError flag:** When an MCP tool call fails, the tool should return a response with `isError: true` and structured metadata about the failure. A generic "Operation failed" response tells the agent that something went wrong but provides no information for intelligent recovery.

**Four error categories — know them precisely:**

- **Transient errors** (timeouts, service unavailability): Potentially retryable. The agent should retry with backoff. Return `isRetryable: true`.
- **Validation errors** (invalid input format, missing required parameter): The input was wrong. The agent should fix the input and retry. Return `isRetryable: true` with specific validation guidance.
- **Business errors** (policy violations — refund amount exceeds threshold, item not eligible for return): The operation is not permitted under business rules. The agent should not retry — redirect to an alternative workflow or explain to the user. Return `isRetryable: false`.
- **Permission errors** (agent lacks authorization for the operation): Escalate to a human or request elevated permissions. Return `isRetryable: false`.

**Why structured metadata matters:** A coordinator receiving `{"error": "search unavailable"}` from a subagent cannot determine whether to retry immediately (transient), modify the query (validation), escalate (permission), or redirect to an alternative workflow (business). Structured error context — failure type, what was attempted, any partial results, potential alternative approaches — enables intelligent recovery decisions.

**Local recovery before propagation:** Subagents should implement local recovery for transient failures. If a tool times out, the subagent retries with exponential backoff before propagating an error to the coordinator. Only errors that cannot be resolved locally — after local recovery has been attempted — should propagate upward, with context about what was attempted and any partial results obtained.

**Empty result set is not an error:** A valid query that returns no matches is `isError: false`. The query succeeded — it found nothing. This is different from an access failure. Do not return `isError: true` when the search tool successfully searched and found zero results.

---

#### The ATLA Bisociation: The Spirit Oasis as Valid Empty Result

When Team Avatar traveled to the Northern Water Tribe's spirit oasis seeking the Moon Spirit's presence and blessing — they found the sacred koi pond. Two fish, circling. Tui and La, the push and pull of the tides, swimming in their eternal pattern.

This was not an error. The query succeeded. The oasis was reached. The spirits were present — not in the form that was expected, but present. The system returned a valid result that was simply different from the expected form. Treating this as `isError: true` would have been a category mistake.

The spirit oasis teaches the distinction between access failures and valid results that do not match expectations. A search tool that successfully executes and returns an empty result set has not failed — it has accurately reported that no matches exist. The agent should process this as information ("no results were found for this query") rather than as an error requiring retry. Retrying a query that correctly returned empty results is wasteful and will produce the same empty result again.

Compare this to a query that fails because the search service is unavailable — that is a transient error, genuinely retryable. The distinction is architectural, not merely semantic. Know it clearly.

---

#### Practice Questions

**Question 2.2.A**

Your research agent's web search subagent times out while searching for information on a niche technical topic. The subagent currently returns `{"status": "error", "message": "Search failed"}` to the coordinator. The coordinator, receiving this response, terminates the entire research workflow. What error response structure most effectively enables intelligent coordinator recovery?

A) Return `{"status": "error", "message": "Search unavailable — please try again later"}` to prompt the coordinator to retry.

B) Return a structured error with failure type (transient timeout), the attempted query, any partial results obtained before timeout, `isRetryable: true`, and potential alternative approaches (try a more specific query, try an alternative source).

C) Catch the timeout within the subagent, return an empty result set marked as successful, and let the coordinator synthesize with what it has.

D) Propagate the raw timeout exception directly to the coordinator's top-level error handler for logging.

**Correct Answer: B**

Structured error context gives the coordinator the information it needs to make an intelligent recovery decision: the failure type indicates it's transient (retryable), the attempted query allows the coordinator to retry with a modified version, partial results prevent wasted work, and alternative approaches give the coordinator options. Option A improves the message but remains unstructured — the coordinator cannot programmatically distinguish a transient retry situation from a business error. Option C suppresses the error, marking failure as success, which prevents any recovery and corrupts the synthesis output. Option D terminates the entire workflow when recovery strategies could succeed.

---

**Question 2.2.B**

A customer support agent attempts to process a refund of $750 for an order that was confirmed as damaged. The `process_refund` tool returns `{"error": "Refund amount exceeds policy limit of $500"}`. How should the MCP tool's error response be structured, and what should the agent do upon receiving it?

A) Return `isError: true, isRetryable: true` — the agent should retry with a partial refund of $500.

B) Return `isError: true, errorCategory: "business", isRetryable: false` with a human-readable explanation — the agent should redirect to `escalate_to_human` with structured handoff context rather than retrying.

C) Return `isError: true, errorCategory: "transient", isRetryable: true` — the agent should wait and retry when the policy limit resets.

D) Return `isError: false` with a message explaining the limit — this is a valid operation result, not an error.

**Correct Answer: B**

A policy violation (refund exceeding the business limit) is a business error, not a transient error. It is not retryable — retrying the same refund amount will produce the same rejection. The correct response is structured metadata identifying the error category and explicitly marking it non-retryable, enabling the agent to redirect appropriately (escalate to a human who can authorize an exception). Option A misidentifies this as transient and retryable. Option C incorrectly categorizes a policy violation as a transient failure. Option D would suppress the error, and the agent would have no signal that the operation failed to complete.

---

### Task Statement 2.3: Tool Distribution and Toolbox Configuration

*Distribute tools appropriately across agents and configure tool choice*

---

#### The Technical Core

**Optimal tool counts — the precise numbers from the exam guide:**

The exam guide states: 4-5 tools is the optimal range per agent. 18 tools is the exam's explicit example of too many. The threshold at which degradation becomes significant is not precisely quantified beyond this example — do not state ">7 degrades" as a fact. State what the exam states: 4-5 is optimal, 18 is an example of too many.

Too many tools degrades selection reliability by increasing decision complexity. With 18 tools available, the model must evaluate all 18 against each query to determine which to call. With 4-5 tools scoped to the agent's role, the decision space is dramatically smaller and more reliable.

**Specialization and misuse:** Agents with tools outside their specialization will misuse them. A synthesis agent given access to web search tools will attempt web searches rather than synthesizing from provided findings — because the tool is available and the problem seems to call for it. Scope tool access strictly to the agent's role.

**tool_choice configuration — three options:**

- `tool_choice: "auto"`: The model may return text instead of calling a tool. Use when conversational responses are sometimes appropriate.
- `tool_choice: "any"`: The model must call some tool, but can choose which. Use when you need to guarantee the model produces structured output rather than conversational text.
- Forced selection (`{"type": "tool", "name": "tool_name"}`): The model must call a specific named tool. Use when you need a specific step to occur first — `extract_metadata` before enrichment tools, for example.

**Scoped cross-role tools:** High-frequency needs that span roles can be addressed with constrained cross-role tools. If the synthesis agent needs simple fact verification 85% of the time, give it a scoped `verify_fact` tool rather than giving it full web search access — handling the common case efficiently while preserving separation of concerns for complex verifications.

---

#### The ATLA Bisociation: Firebending's Formal Cause as the Tool Distribution Principle

This is the bisociation I find most philosophically precise, and I urge you to carry it with you.

Fire Lord Sozin substituted rage for life-energy as firebending's formal cause. The substitution produced results that appeared powerful. Rage amplifies firebending intensity — in the short term, under favorable conditions, a rage-fueled firebender produces more heat, more destruction, more apparent force. The substitution seemed to work.

But it severed firebenders from the true source. Fire derived from rage is brittle. When the conditions shift — when the comet's amplification is absent, when the anger cannot be sustained, when the practitioner faces a situation requiring precision rather than destruction — the corrupted formal cause fails. The power cannot be accessed without the rage. And rage, as a foundation, is unstable.

This is precisely what happens when you give an agent 18 tools instead of 4-5 with proper formal causes. The apparent power is there: look at all these capabilities! But the formal cause of each tool — its precise description, its clear scope, its explicit boundaries — has been corrupted by the noise of too many options. The agent cannot reliably select the right tool. Under adversarial conditions, the failure rate climbs.

The 12% failure rate of prompt-based enforcement is the firebenders who cannot sustain their power when the comet is gone. The CCA lesson: 4-5 tools with proper formal causes (clear descriptions, matched to role, explicit boundaries) outperform 18 tools with corrupted formal causes (ambiguous, overlapping, mismatched) in every production condition that matters.

And just as Aang and Zuko needed to visit the Sun Warriors — not to add techniques, but to restore the true formal cause of firebending — a poorly performing agent needs better tool descriptions, not more tools.

---

#### Practice Questions

**Question 2.3.A**

A synthesis agent is given access to 18 tools: 6 web search tools, 4 document analysis tools, 3 data transformation tools, 3 verification tools, and 2 synthesis-specific formatting tools. The agent frequently calls web search tools during synthesis passes, ignoring the provided research findings. What is the most effective architectural change?

A) Add a system prompt instruction: "Do not use web search tools during synthesis — use only the provided findings."

B) Restrict the synthesis agent's tool access to synthesis-specific formatting tools and a single scoped `verify_fact` tool for simple fact checks, routing complex verifications through the coordinator.

C) Increase the synthesis agent's context window to allow it to process all 18 tools' descriptions more carefully before selecting.

D) Rename the web search tools with names that make them sound less relevant to synthesis tasks.

**Correct Answer: B**

Agents with tools outside their specialization will misuse them. When the synthesis agent sees web search tools available and encounters a synthesis problem that feels like it could benefit from additional research, it calls those tools — because they are present. The solution is scoped tool access: give the synthesis agent only the tools relevant to its role. Option A adds a prompt instruction against a behavior the agent is exhibiting because the architectural conditions support it — prompt instructions are insufficient when the toolbox itself invites the behavior. Option C addresses capacity, not selection discipline. Option D is a naming workaround that does not address the underlying architecture.

---

**Question 2.3.B**

Your document processing pipeline needs to ensure that `extract_metadata` always runs before any enrichment tools (`enrich_content`, `classify_document`, `tag_entity`). The pipeline currently uses `tool_choice: "auto"`, which sometimes allows the model to call enrichment tools first or return a conversational response. What `tool_choice` configuration enforces the correct sequencing?

A) Set `tool_choice: "any"` to guarantee the model calls some tool rather than returning text, then rely on the system prompt to specify the correct order.

B) For the first API call, force `tool_choice: {"type": "tool", "name": "extract_metadata"}` to ensure metadata extraction runs first; process subsequent steps in follow-up turns where enrichment tools are available.

C) Set `tool_choice: "auto"` but add few-shot examples showing `extract_metadata` always called first.

D) Implement a preprocessing step that calls `extract_metadata` directly outside the agent, then pass the metadata as context in the agent's initial prompt.

**Correct Answer: B**

Forced tool selection (`{"type": "tool", "name": "extract_metadata"}`) guarantees that the specific named tool is called. By forcing the first call to `extract_metadata` and then enabling enrichment tools in follow-up turns, the sequencing constraint is enforced architecturally. Option A guarantees a tool is called but not which tool — the ordering problem remains. Option C applies probabilistic guidance to a sequencing constraint that requires deterministic enforcement. Option D solves the problem outside the agent but removes the metadata extraction from the agentic workflow, limiting adaptability.

---

### Task Statement 2.4: MCP Server Integration

*Integrate MCP servers into Claude Code and agent workflows*

---

#### The Technical Core

**Two scopes for MCP server configuration:**

- **Project-level (`.mcp.json`)**: Shared team tooling. Version-controlled with the repository. All team members who clone the repository receive the MCP server configuration. Use for tools that are essential to the team's workflow — shared CI/CD integrations, team databases, project-specific backend tools.

- **User-level (`~/.claude.json`)**: Personal or experimental servers. Not version-controlled. Specific to one developer's environment. Use for personal experiments, tools under development, or credentials-sensitive servers that should not be committed.

**Environment variable expansion:** In `.mcp.json`, credentials should not be committed as literal values. Use environment variable expansion (`${GITHUB_TOKEN}`, `${DATABASE_URL}`) to reference credentials stored in the environment rather than in version control. The expansion happens at connection time.

**Discovery at connection time:** Tools from all configured MCP servers — both project-level and user-level — are discovered at connection time and available simultaneously. The agent sees the full union of tools from all connected servers.

**MCP resources:** Resources are content catalogs that expose structured content to the agent without requiring exploratory tool calls. An issue tracker MCP server that exposes an MCP resource listing all open issues allows the agent to browse the catalog before deciding which issues to investigate, rather than making blind tool calls to discover what exists.

---

#### The ATLA Bisociation: The Mechanist's Workshop as Scoped MCP Configuration

The Mechanist at the Northern Air Temple was one of the most remarkable minds of his era — a non-bender who created engineering works of genuine innovation, including the hot air balloon that Aang and the team used to travel. I am careful about the terminology: the Mechanist built a *hot air balloon* — not a war balloon, which was the Fire Nation's military aircraft that Sokka and Zuko famously used to escape from the Boiling Rock prison. These are entirely different inventions by different people for different purposes. The hot air balloon was a marvel of peaceful engineering; the war balloon was a weapon of the Fire Nation's military industrial apparatus. Do not confuse them.

The Mechanist's workshop at the Northern Air Temple illustrates the two scopes of MCP configuration with beautiful clarity.

The workshop tools that the entire community used — the construction schematics for maintaining the temple's infrastructure, the engineering specifications for the gliders and pulleys that allowed the Air Nomad community to live in the temple's heights, the material inventories that any community member might need to consult — these are project-scoped (`.mcp.json`). They belong to the shared work of the community. They are version-controlled in the community's shared knowledge. Clone the temple's workshop (join the team), and these tools are available to you immediately, without separate configuration.

The Mechanist's personal invention notebooks — his individual experiments with new propulsion mechanisms, his speculative designs for engineering systems that had no immediate application, the half-formed ideas that might become tomorrow's breakthrough or might be abandoned by morning — these are user-scoped (`~/.claude.json`). They live in his personal workspace on his personal workbench. He has not committed them to the community's shared knowledge yet. They are his to develop, refine, and discard privately. When one of them matures into something genuinely useful to the community, he can move it to the shared workshop — project scope.

The principle: shared team tooling belongs at project scope, where version control makes it available to everyone consistently. Personal and experimental servers belong at user scope, where they are available to the individual without imposing on the team or exposing experimental work before it is ready.

The exam will present scenarios where a developer has configured a tool at the wrong scope — a personal credential-sensitive tool committed to project configuration, or a shared team workflow tool configured only in one developer's user scope such that teammates cannot access it. The diagnostic is always: who needs access to this tool, and should that access be automatic when someone joins the project?

---

#### Practice Questions

**Question 2.4.A**

Your team uses a GitHub MCP server for repository access and a Jira MCP server for issue tracking. These tools are essential to the team's development workflow and should be available to all team members automatically when they clone the repository. A junior developer also wants to experiment with a personal AI-powered code analysis tool that is not yet approved for team use. Where should each server be configured?

A) Both servers should be configured in `~/.claude.json` on each developer's machine, and the team should share configuration instructions in the README.

B) The GitHub and Jira MCP servers should be configured in `.mcp.json` in the project repository (with credentials via environment variable expansion); the personal code analysis server should be configured in `~/.claude.json` on the junior developer's machine.

C) All three servers should be configured in `.mcp.json` to ensure consistency across the team.

D) MCP servers should be configured in `CLAUDE.md` rather than in separate JSON files for centralized management.

**Correct Answer: B**

Project-level `.mcp.json` is for shared team tooling that should be version-controlled and available to all team members. The GitHub and Jira servers meet this criterion. The personal code analysis server is personal and experimental — it belongs in the individual developer's user-level `~/.claude.json`. Option A loses the automatic availability benefit of project-level configuration. Option C incorrectly adds a personal experimental server to team configuration. Option D describes a configuration mechanism that does not exist — MCP servers are not configured in CLAUDE.md.

---

**Question 2.4.B**

Your `.mcp.json` configuration for a database MCP server contains `"connection_string": "postgresql://admin:password123@db.internal:5432/prod"` as a literal value. The file is committed to the repository. What is the most significant problem and how should it be resolved?

A) The connection string format is incorrect — MCP servers require separate `host`, `port`, and `credentials` fields rather than a combined connection string.

B) Committing credentials as literal values in a version-controlled file exposes them to anyone with repository access. Replace the literal value with environment variable expansion: `"connection_string": "${DATABASE_CONNECTION_STRING}"` and store the actual value in the deployment environment.

C) The database credentials should be stored in CLAUDE.md using the `@secret` directive, not in `.mcp.json`.

D) This configuration is correct — MCP server credentials in `.mcp.json` are encrypted automatically by Claude Code before being committed.

**Correct Answer: B**

Committing credentials as literal values in version-controlled files exposes them to everyone with repository access, which is a fundamental security violation. Environment variable expansion (`${DATABASE_CONNECTION_STRING}`) is the documented mechanism for referencing credentials in `.mcp.json` without committing literal secrets. The actual credential value is stored in the environment (CI/CD secrets, developer machine environment variables) and expanded at connection time. Options A, C, and D describe mechanisms that do not exist in the Claude ecosystem.

---

### Task Statement 2.5: Built-In Tools

*Select and apply built-in tools effectively*

---

#### The Technical Core

**Grep — content search:** Use Grep when you need to find text within files. Searching for all callers of a specific function, locating error messages in log files, finding import statements, discovering which files use a particular pattern — these are Grep tasks. Grep searches file *contents*.

**Glob — file path matching:** Use Glob when you need to find files by name or extension patterns. Finding all test files (`**/*.test.tsx`), locating all configuration files (`**/*.config.js`), discovering all files in a directory structure that match a naming convention — these are Glob tasks. Glob matches file *paths*.

**Read/Write — full file operations:** Use Read to load complete file contents. Use Write to create new files or completely overwrite existing files with new content.

**Edit — targeted modifications:** Use Edit for targeted changes that modify a specific section of a file using unique text matching. Edit finds a unique string in the file and replaces it with new content. The anchor text must be unique in the file — if the same string appears multiple times, Edit cannot determine which occurrence to replace and will fail.

**Edit failure fallback:** When Edit fails due to non-unique anchor text, the correct fallback is Read + Write: read the complete file to understand its structure, then write the complete updated file. This is more token-intensive than Edit but reliable when anchor text uniqueness cannot be guaranteed.

**Incremental codebase understanding:** Do not read all files upfront. Start with Grep to find entry points and patterns — function names, import statements, error messages that reveal the architecture. Then use Read to trace flows: follow imports, trace function calls, load specific files that the Grep results identify as relevant. Build understanding incrementally from the seismic signature to the structure.

---

#### The ATLA Bisociation: Toph's Seismic Sense as Tool Selection

Toph Beifong does not read every surface file. She does not walk through the entire codebase sequentially, file by file, building up understanding from the outside in. She senses what is below the surface.

Her blindness is not the absence of sight — it is a figure/ground inversion of perception itself. The Aristotle paper captures this precisely in §8.3: Toph perceives ground (seismic vibration, the earth's information-field) rather than figure (the visual surface). This is why she could discover metalbending when no sighted earthbender could: she was already operating at the level of ground. She felt the trace impurities of earth within the refined metal — the ground hidden within the figure.

This is the correct tool selection workflow for codebase understanding. Start with Grep — find the seismic signatures. Search for function names, error messages, import patterns that reveal where the important structures are. The grep results are Toph's initial seismic sweep: they tell you where to look, not everything that is there. You are searching the ground of the codebase — its hidden structure of connections and patterns — before you examine any individual surface file.

Then use Read to trace the flows. Follow the imports that Grep identified. Load the files that appear in the call stacks. Trace the function from its definition to its callers. The Read operations are Toph pressing her hand to the ground at specific points — feeling the specific structure in detail, having already identified where the interesting vibrations are coming from.

Glob is your awareness of the landscape's topology before the investigation begins. Use Glob to understand what kinds of files exist (`**/*.test.tsx` to find all test files, `**/*.config.js` to find all configuration files), establishing the terrain before searching within it. Then Grep to find the seismic signatures. Then Read to trace.

Do not read everything first. Sense what is below the surface, then investigate. This is how you understand a 50,000-line codebase without exhausting your context window on files that turn out to be irrelevant. Toph would not spend hours walking every square foot of Ba Sing Se's surface. She would close her eyes, feel the earth beneath the city, and know exactly where the interesting structures were — the underground passages, the hollow chambers, the points of structural weakness. Then she would investigate those specific points. Build codebase understanding the same way.

---

#### Practice Questions

**Question 2.5.A**

A developer needs to understand how a `processRefund` function is used across a large codebase. They know the function exists but do not know which files call it. What is the correct sequence of built-in tools?

A) Glob to find all `.ts` files, then Read each one to search for `processRefund` manually.

B) Grep to search for `processRefund` across the codebase to find all callers, then Read the specific files identified to understand the calling context.

C) Read the main entry point file and trace imports manually until the function is found.

D) Edit the `processRefund` function definition to add a log statement, then run the application and observe which log outputs appear.

**Correct Answer: B**

Grep searches file contents — exactly the task of finding all callers of a specific function across a codebase. The Grep results identify which files contain calls to `processRefund`, allowing targeted Read operations to understand the context of each call. Option A uses Glob (which finds files by path pattern, not content) followed by inefficient manual reading of every TypeScript file. Option C begins at one entry point and manually traces — workable for simple codebases but inefficient for large ones. Option D modifies production code to perform an investigation, which is architecturally inappropriate.

---

**Question 2.5.B**

A developer uses Edit to update a commonly-used error message string in a configuration file: `"Error: operation failed"`. The Edit fails with a "non-unique anchor text" error — this exact string appears 14 times in the file. What is the correct fallback approach?

A) Use Grep to find all occurrences of the string and manually determine which occurrence is at the target line, then use Edit with a longer anchor text that includes surrounding unique context.

B) Use Read to load the complete file, manually identify the specific occurrence to update, construct the complete updated file content, then use Write to replace the file.

C) Use Bash with `sed` to perform a targeted line-number-based replacement.

D) Use Glob to find all files containing the string, then use Edit on each one individually.

**Correct Answer: B**

When Edit fails due to non-unique anchor text, the documented fallback is Read + Write: read the complete file to understand its full content, identify the specific occurrence to modify, construct the complete updated content, then Write the updated file. Option A (extending the anchor text) is a reasonable first attempt before concluding that Write is necessary, but is not the documented fallback once Edit has already failed. Option C uses Bash/sed rather than the built-in tools, which is a lower-quality solution. Option D misunderstands the task — Glob finds files by path pattern, not by content.

---

### Domain 2 Summary and Exam-Tell

---

#### Summary Table: Domain 2 Task Statements

| Task Statement | Key Concept | Exam-Critical Fact | Common Distractor |
|:---|:---|:---|:---|
| **2.1 Tool Interface Design** | Descriptions as the primary selection mechanism | Include input formats, example queries, edge cases, and explicit boundary explanations in every tool description | Routing layers or few-shot examples as the first fix for selection failures |
| **2.2 Structured Error Responses** | Four error categories: transient, validation, business, permission | Empty result set is NOT an error (`isError: false`) | Returning `isError: true` for valid queries with no matches |
| **2.3 Tool Distribution** | 4-5 tools optimal; 18 as example of too many | Agents with tools outside specialization misuse them; use scoped cross-role tools for high-frequency needs | Claiming ">7 tools degrades" (not the exam's stated threshold) |
| **2.4 MCP Server Integration** | Project scope (`.mcp.json`) vs. user scope (`~/.claude.json`) | Use environment variable expansion (`${VAR}`) for credentials — never commit literal values | Configuring shared team tools in user scope |
| **2.5 Built-In Tools** | Grep (content) vs. Glob (paths) vs. Read/Write/Edit | Edit fails on non-unique anchor text → fallback is Read + Write | Using Glob to search file contents, or reading all files before Grep-based investigation |

---

#### Iroh's Closing Words for Domain 2

Tool design is where the formal cause lives, and the formal cause is where reliability begins.

An architect who gives their agents 18 tools has confused abundance with capability. The Sun Warriors understood this. They did not teach Aang and Zuko a hundred firebending techniques. They showed them the *true* formal cause — fire as life-energy — and from that one correct understanding, all reliable technique follows. Four tools with correct formal causes outperform eighteen with corrupted ones in every production test that matters.

Write your tool descriptions as covenants. Declare not only what each tool does but what it is for, what it will not be used for, and how it differs from the similar tools that might otherwise be confused with it. Wan Shi Tong did not simply grant access to the library's knowledge — he required the covenant that the knowledge would be used appropriately. Your tool descriptions require the same precision of purpose.

And when you configure your MCP servers — remember the Mechanist's wisdom. The tools that belong to the team go where the team can reach them. The personal experiments stay personal until they are ready to be shared. The environment variables in `.mcp.json` are the equivalent of the combination to the Mechanist's workshop safe: the tools are shared, but the keys to access the underlying systems remain personal and unexposed.

When an exam scenario presents tool selection failures, error handling gaps, or MCP configuration confusion — remember that all of these are, at their root, formal cause failures. The tool's description did not instantiate its essence precisely enough for the model to distinguish it from similar tools. The error response did not communicate enough structure for the coordinator to make an intelligent recovery decision. The MCP scope was wrong, which means the tool's formal cause (what kind of tool is this — team tool or personal tool?) was not correctly expressed through where it was configured.

Restore the formal cause. That is the answer to Domain 2.

Mark this for the examination: two students may both know that tool descriptions matter. Only the one who understands *why* — that the description is the formal cause, the organizing principle that makes the tool the kind of tool it is, distinguishing it from all others — will answer correctly when the exam presents subtle variations. The student who knows only "write better descriptions" will miss the question that asks them to distinguish between the correct fix (rewriting descriptions to eliminate overlap) and the distractor (adding few-shot examples or routing layers). The formal cause framing gives you the diagnostic: anything that fails to address the description directly fails to address the root cause.

Go forth, architect. Domain 3 awaits.
