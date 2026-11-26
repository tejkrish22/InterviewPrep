# Personal & Behavioural Notes: Cosmoserve Space, Robotics Software Engineer

Rule: **honest, specific, short.** Use **STAR** (Situation → Task → Action → Result). Aim for 60–90 seconds per answer. Fill in every `[ ]` before 11:30.

---

## 1. "Tell me about yourself" (about 75 seconds, rehearse out loud 3 times)

> "I'm Teja, a software engineer with about 3 years at Caterpillar, working on the simulation platform our autonomy teams use to test machines like wheel loaders and track loaders before they go to the field.
>
> I started as an intern, building simulation scenarios on CARLA and Unreal Engine. As an associate engineer, I worked on the core of the platform in C++ and Python: machine models, collision physics, coordinate-system fixes, non-flat road networks, and a bridge architecture so the same simulator could run in software-in-the-loop and hardware-in-the-loop modes with different physics backends. I worked closely with the HIL bench team on that.
>
> In my current role I've been more of a generalist on tooling. The project I'm proudest of is a scenario authoring tool I proposed and built in Blender. It made scenario creation about 5x faster, and we used it to generate thousands of scenarios for VLA model training. I also built synthetic camera-data generation and a weather-simulation proof of concept. I won two internal hackathons, most recently with a camera-based assistant wired into the simulator in a SIL loop.
>
> I graduated in Electronics and Computer Science from Amrita, ranked third. Now I want to move from simulating robots to building the software that runs real ones. This role, owning the ROS 2 stack for a physical robotics lab, is exactly that."

---

## 2. "Why are you leaving Caterpillar?"

> "I've learned a lot at Caterpillar, especially about simulation, SIL/HIL and working across teams. But my work has been around the robot rather than on it: simulation and tooling. I want to own the software that drives real hardware: drivers, control interfaces, experiment pipelines. And my current role has become broad and generalist; I want to go deep in robotics software."

**Never:** criticise your manager, team or company, or make the answer about money.

---

## 3. "Why Cosmoserve / why space?"

> "Three reasons. First, the role itself: owning a full ROS 2 stack for a lab, from hardware integration to experiment automation, is the end-to-end ownership I'm looking for. Second, it builds directly on what I've done: SIL/HIL modes, repeatable parameterised scenarios, and integrating other teams' models are exactly what I did at Caterpillar, just for a different domain. Third, space proximity operations is a frontier problem, and helping build a lab like this early is rare. [Add one specific thing from their website: a mission, product or announcement.]"

---

## 4. "What's your biggest weakness / gap?"

> "I haven't shipped production ROS 2 yet. I've used ROS 1 and RViz, and I've built the same patterns on CARLA and Unreal: swappable backends for SIL and HIL, trajectory execution, experiment configuration and replay. So the concepts map well, and I've been actively ramping up on the ROS 2 specifics like QoS, lifecycle nodes and ros2_control. My second gap is deep robotics maths. On my scenario tool, the control approach came from subject-matter experts, and I implemented and validated it. I'm strengthening the theory: kinematics, Jacobians, dynamics."

Why this works: it's honest, it shows self-awareness, and it shows you're already doing something about it.

---

## 5. STAR stories (have these 6 ready; one story can answer several questions)

### Story A: Scenario Authoring Tool (initiative, ownership, impact)
**Answers:** "proudest project", "something you initiated", "end-to-end ownership", "a time you improved a process"
- **S:** Autonomy scenarios were hand-written YAML. That was slow and error-prone, and it didn't scale to the thousands of scenarios needed for VLA training.
- **T:** Nobody asked for a tool. I saw the bottleneck and proposed one.
- **A:** I built a Blender add-on: visual placement of actors and sensors, click-to-place trajectories, and bucket keyframing. I integrated our C++ motion models through Python bindings so the exported commands were executable by the machine. The control approach came from SMEs; I implemented it with Copilot and validated it by replaying the commands through the model. The design was extensible (one handler per machine type, protobuf-driven UI) and the logic was unit-tested.
- **R:** Scenario creation was about **5x faster**, and it scaled to **thousands of scenarios** for VLA training. [Add the number of users or teams, if you know it.]

### Story B: Weather simulation (technical judgement, pushing back, leadership)
**Answers:** "a time you disagreed", "a technical decision you made", "a time you led"
- **S:** We needed weather (dust, rain, snow) for environmental testing of the autonomy software. One proposal was an ML-based approach to reverse-engineer the weather effects.
- **T:** I led the design and had to pick an approach.
- **A:** I evaluated the ML approach and pushed back: it was computationally expensive and hard to control. I proposed a proof of concept with Unreal Engine's Niagara particles instead, with configurable particle properties and effects that are visible to LiDAR. I presented the trade-offs with data rather than opinion. [What data did you show: frame time, cost, effort?]
- **R:** The proof of concept laid the foundation for environmental-impact testing of the autonomy software. [Was it adopted? By whom?]
- **Lesson:** "Choose the simplest approach that meets the requirement, and disagree with evidence."

### Story C: SIL/HIL bridge (cross-functional work, architecture)
**Answers:** "working with other teams", "designing for change", "hardware experience"
- **S:** We needed to run the simulator both purely in software and with real controller hardware on HIL benches, with more than one physics engine.
- **T:** Build a bridge that didn't need a rewrite for each new mode or backend.
- **A:** I designed a modular bridge with one interface and pluggable physics backends, and integrated a high-fidelity physics engine in co-simulation. I worked with the HIL bench team on closed-loop hardware validation.
- **R:** Maintenance effort dropped by about **40%**. **This is the same idea as ros2_control's hardware plugins.**

### Story D: Synthetic data generation (customer focus)
**Answers:** "a time you helped another team", "understanding user needs"
- **S:** The perception team depended heavily on real-world field data, which is expensive and slow to collect.
- **A:** I added day/night time simulation and built reusable scenarios that extract annotated camera frames and convert them into ML-ready dataset formats.
- **R:** Their dependency on real field data dropped by about **50%**.

### Story E: Hackathon wins (learning fast, delivering under time pressure)
**Answers:** "learning something new quickly", "working under pressure", "teamwork"
- **SPARK AI 2026, 1st of 44 teams:** a monocular depth-estimation perception stack wired into the simulator in a SIL loop, guiding bucket positioning for autonomous loading, with about **65% productivity improvement**. [What was your role on the team? What did you learn fastest?]
- **Tech-AA-Thon 2023, 1st of 24:** re-architected a legacy C++ telemetry replay tool into a Python application with dashboards and on-the-fly plotting. **This links to the ros2 bag replay and analysis in the JD.**

### Story F: A hard bug (debugging)
**Answers:** "hardest bug", "a time something went wrong"
Pick one **you actually debugged**:
- Coordinate-system fixes in the simulation platform [which frames disagreed, how you found it, how you verified it]
- Heading drift in chained behaviors, fixed by reading heading from the model's quaternion instead of adding up small turn steps
- Command-duration truncation causing slow drift across long trajectories

STAR shape for bugs: **symptom → how I isolated it (logs, plots, minimal repro) → root cause → fix → how I prevented it happening again (a test).**

### Story G: A failure / mistake (have one ready; honesty wins)
> [Pick a real one, e.g. an estimate that slipped, a feature users didn't adopt, a bug that reached users.] "What happened → what I did to fix it → what I changed afterwards."

---

## 6. Other common questions (short answers)

| Question | Answer direction |
|---|---|
| **"How do you use AI tools?"** | "Heavily, for speed. I own the design and the review. Generated code goes through tests and verification before anyone uses it. I'm careful with anything safety-critical: I make sure I understand it before I ship it." |
| **"How do you handle unclear requirements?"** | Talk to the users (scenario authors, the perception team), build a small proof of concept, get feedback, iterate. The scenario tool and weather proof of concept are examples. |
| **"How do you prioritise?"** | Impact vs effort, unblocking others first, and agreeing priorities with stakeholders rather than guessing. |
| **"Working with controls / MBD engineers?"** | "That's how I worked with SMEs and the modelling team: they own the algorithm or model, I own clean interfaces, integration, testing and tooling around it." **The JD describes exactly this.** |
| **"How do you ensure quality?"** | Unit tests for pure logic, separating logic from frameworks (no Blender dependency in the core), verification by replay, code review, CI. |
| **"Safety in a lab?"** | A hardware e-stop independent of software, a software supervisor (limits, watchdogs), fail-safe on deactivate, test in SIL before hardware. |
| **"Where do you see yourself in 3–5 years?"** | A robotics software engineer who owns major parts of a real robot stack and mentors others, here, as the lab grows. |
| **"Are you OK with on-site work in Hyderabad?"** | [Decide: yes / with conditions / relocation timeline.] |

---

## 7. Practical answers (decide now, don't improvise)

- **Notice period:** [ ] days. Can it be bought out or negotiated? [ ]
- **Current CTC:** [ ]. Give it if asked; be factual.
- **Expected CTC:** [give a range]. Say: "I'm looking for [range], but I'm flexible for the right role and growth." If you're unsure, ask them their budget first: "What's the range for this role?"
- **Relocation:** [Chennai → Hyderabad: yes / timeline]
- **Other offers:** [only mention it if true]

---

## 8. Questions to ask them (pick 2–3; asking none is a red flag)

1. "What robots and hardware are in the lab today: manipulators, motion platforms, which buses (EtherCAT, CAN)?"
2. "How much of the ROS 2 stack exists today, and what would I build first in the first 3 months?"
3. "How are experiments run now, and what's the biggest software pain point for the research team?"
4. "How do the Controls and MBD engineers hand over their models and controllers? Is there a defined interface?"
5. "What does success look like for this role after 6 months?"
6. "How big is the software team, and who would I work with day to day?"

---

## 9. On the day

- **Opening:** smile, a short greeting, and have your 75-second intro ready.
- **When you don't know:** "I haven't worked with that directly. My understanding is X, and here's how I'd find out or verify it." **Never bluff.**
- **On a coding question:** clarify the requirements, say your approach out loud, then code it, then test with examples and edge cases.
- **On a design question:** requirements, then the components, then the interfaces, then failure modes and safety, then testing. Use the lab design in ROS2_Crash_Course section 13.
- **Keep the main ideas from your docs on one sheet**, not the full docs.
- **Closing:** "Thank you. I'm genuinely excited about this. Building the software for a physical robotics lab is exactly the next step I want."
- **Logistics:** [Online: test the link, camera and mic at 11:45; charger; quiet room; water.] [In person: address, travel time, ID, printed CV.]
