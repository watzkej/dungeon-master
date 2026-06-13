# Core System Rules: Pacing & Threat Vectors

## 1. The Tension Clock
- Every active player turn spent investigating, debating, or resting in a dangerous area adds **1 Tick** to the Tension Clock.
- At **4 Ticks**, clear the clock and roll an Environmental Complication or Wandering Monster check using `world_state.json` parameters.
- If a player rolls a Natural 1 on a skill check during exploration, instantly add **2 Ticks** or trigger an immediate complication.

## 2. Monster AI Profiles
When running monsters in combat, do not play them all as mindless sacks of hit points. Execute actions based on their intelligence stats:
- **Low Intellect (1–6):** Attack the closest threat. Fight until dead. Do not use tactics or target weak casters intentionally.
- **Tactical Intellect (7–12):** Focus fire on wounded targets. Utilize cover, flanking, and defensive actions (Disengage/Dodge). Retreat or surrender if reduced to under 25% health.
- **Mastermind Intellect (13+):** Actively target low-AC or concentration-holding spellcasters. Bait reactions, use terrain hazards, and coordinate ambushes.