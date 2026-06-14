#!/usr/bin/env node
/**
 * dice_roller.js — Cryptographically secure dice roller for dungeon-master.
 *
 * Usage:
 *   node dice_roller.js <notation> [--advantage | --disadvantage]
 *
 * Notation:
 *   d20          — single d20
 *   2d6          — two d6, summed
 *   3d8+4        — three d8 + 4
 *   d100         — percentile (d10 for tens, d10 for ones, 00 = 100)
 *   d%           — alias for d100
 *   4d6kh3       — roll 4d6, keep highest 3 (stat generation)
 *   4d6kl3       — roll 4d6, keep lowest 3
 *
 * Output (JSON to stdout):
 *   {
 *     "notation": "2d6",
 *     "rolls": [3, 5],
 *     "modifier": 0,
 *     "total": 8,
 *     "advantage": false,
 *     "disadvantage": false
 *   }
 *
 * Exit codes:
 *   0 — success
 *   1 — invalid notation
 *   2 — Node.js too old (needs crypto.randomInt, Node >= 14.10)
 */

"use strict";

const crypto = require("crypto");

// --- CSPRNG roll -----------------------------------------------------------
function rollDie(sides) {
  // crypto.randomInt(min, max) — min inclusive, max exclusive
  return crypto.randomInt(1, sides + 1);
}

// --- Notation parser --------------------------------------------------------
// Matches: [count]d<sides>[kh|kl<keep>][+|-<modifier>]
const NOTATION_RE = /^(\d*)d(\d+|%)(?:k([hl])(\d+))?(?:([+-])(\d+))?$/i;

function parse(notation) {
  const m = notation.match(NOTATION_RE);
  if (!m) return null;

  let count = parseInt(m[1], 10) || 1;
  let sides = m[2].toLowerCase() === "%" ? 100 : parseInt(m[2], 10);
  let keepDir = m[3] ? m[3].toLowerCase() : null;
  let keep = m[4] ? parseInt(m[4], 10) : null;
  let modSign = m[5] || null;
  let modVal = m[6] ? parseInt(m[6], 10) : 0;

  if (count < 1 || count > 100) return null;
  if (sides < 2 || sides > 1000) return null;
  if (keep !== null && (keep < 1 || keep > count)) return null;

  return { count, sides, keepDir, keep, modifier: modSign === "-" ? -modVal : modVal };
}

// --- Main -------------------------------------------------------------------
function main() {
  const args = process.argv.slice(2);
  let notation = null;
  let advantage = false;
  let disadvantage = false;

  for (const arg of args) {
    if (arg === "--advantage" || arg === "-a") advantage = true;
    else if (arg === "--disadvantage" || arg === "-d") disadvantage = true;
    else if (!notation) notation = arg;
  }

  if (!notation) {
    process.stderr.write("Usage: node dice_roller.js <notation> [--advantage|--disadvantage]\n");
    process.exit(1);
  }

  if (advantage && disadvantage) {
    process.stderr.write("Cannot specify both --advantage and --disadvantage\n");
    process.exit(1);
  }

  const parsed = parse(notation);
  if (!parsed) {
    process.stderr.write(`Invalid dice notation: "${notation}"\n`);
    process.exit(1);
  }

  // Special case: d100 / d% — needs two d10s, not one d100
  if (parsed.sides === 100 && parsed.count === 1) {
    const tens = rollDie(10) - 1; // 0-9
    const ones = rollDie(10);      // 1-10, but we want 0-9
    const onesMapped = ones === 10 ? 0 : ones;
    let total = tens * 10 + onesMapped;
    if (total === 0) total = 100;
    const result = {
      notation: notation,
      rolls: parsed.count > 1 ? [total] : total,
      modifier: parsed.modifier,
      total: total + parsed.modifier,
      advantage: false,
      disadvantage: false,
    };
    process.stdout.write(JSON.stringify(result) + "\n");
    return;
  }

  // Roll the dice
  let rolls = [];
  for (let i = 0; i < parsed.count; i++) {
    rolls.push(rollDie(parsed.sides));
  }

  // Apply keep highest / keep lowest
  if (parsed.keepDir) {
    const sorted = [...rolls].sort((a, b) => a - b);
    if (parsed.keepDir === "h") {
      rolls = sorted.slice(sorted.length - parsed.keep);
    } else {
      rolls = sorted.slice(0, parsed.keep);
    }
  }

  // Handle advantage/disadvantage
  let advRolls = null;
  if (advantage || disadvantage) {
    // For adv/dis, we roll the same dice again and take best/worst
    advRolls = [];
    for (let i = 0; i < parsed.count; i++) {
      advRolls.push(rollDie(parsed.sides));
    }
    const origSum = rolls.reduce((a, b) => a + b, 0);
    const advSum = advRolls.reduce((a, b) => a + b, 0);
    if (advantage && advSum > origSum) rolls = advRolls;
    if (disadvantage && advSum < origSum) rolls = advRolls;
  }

  const sum = rolls.reduce((a, b) => a + b, 0);
  const result = {
    notation: notation,
    rolls: rolls,
    modifier: parsed.modifier,
    total: sum + parsed.modifier,
    advantage: advantage,
    disadvantage: disadvantage,
  };

  process.stdout.write(JSON.stringify(result) + "\n");
}

// Check Node version for crypto.randomInt
const [major, minor] = process.versions.node.split(".").map(Number);
if (major < 14 || (major === 14 && minor < 10)) {
  process.stderr.write("dice_roller.js requires Node.js >= 14.10 (uses crypto.randomInt)\n");
  process.exit(2);
}

main();
