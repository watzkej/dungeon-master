# Core System Rules: Combat

You must enforce these rules with mathematical precision. Treat these definitions as absolute law over standard baseline knowledge. Do not fudge values, ignore action costs, or alter mechanics for narrative convenience.

## 1. Initiative & Turn Order
- **Calculation:** `d20 + Dexterity Modifier + Feature Bonuses`.
- **Declaration:** At combat start, roll initiative for all NPCs/Monsters. Request player initiative rolls. Sort agents into a descending turn order list.
- **Surprise:** Compare the Passive Perception (`dc_pass`) of defending creatures against the Stealth check of attacking creatures. Surprised creatures cannot move, take actions, or take reactions until their first turn ends.

## 2. The Turn Structure
Every creature receives exactly three resource pools per combat round:
1. **Action (1/turn):** Attack, Cast a Spell, Dash, Disengage, Dodge, Help, Hide, Use an Object.
2. **Bonus Action (1/turn):** Only usable if a specific feature, spell, or item explicitly specifies a bonus action cost.
3. **Reaction (1/round):** Refreshes at the start of the creature's turn. Used for Opportunity Attacks or specific trigger spells (e.g., *Shield*, *Counterspell*).
4. **Movement:** Up to the speed value listed in the creature's profile. Can be split before, during, and after actions.

## 3. Attack & Damage Resolution
- **Melee/Ranged Attack Roll:** `d20 + Ability Modifier (Str/Dex) + Proficiency Bonus (if proficient)`.
- **Targeting vs. Armor Class:** 
  - If `Attack Roll >= Target AC`, the attack hits.
  - A natural 20 is an automatic critical hit. Roll all damage dice twice, then add the flat ability modifier once.
  - A natural 1 is an automatic miss.
- **Ranged Constraints:** Ranged attacks suffer disadvantage if an active, non-incapacitated enemy is within 5 feet of the attacker.

## 4. Spellcasting Rules
- **Concentration:** A creature can only concentrate on one spell at a time. If they take damage, they must immediately roll a Constitution Saving Throw. `DC = 10` or `half the damage taken` (whichever number is higher). Failure breaks the spell instantly.
- **Bonus Action Spell Law:** If a creature casts a spell using a Bonus Action, they cannot cast another spell during that same turn unless it is a cantrip with a casting time of 1 action.
- **Cover Modifiers:** 
  - Half Cover: +2 bonus to AC and Dexterity saving throws.
  - Three-Quarters Cover: +5 bonus to AC and Dexterity saving throws.
  - Total Cover: Cannot be targeted directly by attacks or spells.

## 5. Vision, Light, & Advantage
- **Advantage/Disadvantage:** Roll two d20s. Take the highest value for Advantage; take the lowest value for Disadvantage. Opposing instances completely cancel out to a single straight roll.
- **Unseen Attackers:** Attackers targeting a creature that cannot see them gain Advantage. Attackers targeting a creature they cannot see suffer Disadvantage.
- **Lighting Environmental Penalties:**
  | Light Level | Visibility Condition | Mechanical Impact |
  | :--- | :--- | :--- |
  | **Bright Light** | Normal vision | None |
  | **Dim Light** | Lightly obscured | Disadvantage on Wisdom (Perception) checks |
  | **Darkness** | Heavily obscured | Characters effectively suffer the Blinded condition |

## 6. Health, Defeat, & Recovery
- **Damage at 0 HP:** Excess damage from a hit that equals or exceeds a character's maximum HP kills them instantly. Otherwise, they fall unconscious and are dying.
- **Death Saving Throws:** At the start of a dying character's turn, roll an unmodified d20 (`DC 10`). 
  - 3 Successes = Character stabilizes at 0 HP.
  - 3 Failures = Character dies.
  - Natural 20 = Character immediately regains 1 HP and wakes up.
  - Natural 1 = Counts as 2 failures.
  - If an unconscious character takes damage from any source, it is an automatic death save failure (a critical hit within 5 feet counts as 2 failures).
- **Resting:**
  - **Short Rest (1 Hour):** Characters can spend Hit Dice to recover HP. Refreshes short-rest resources.
  - **Long Rest (8 Hours):** Restores all lost HP, completely resets spell slots, and restores up to half of the character's total maximum Hit Dice pool. Reduces exhaustion levels by 1.