import assert from "node:assert/strict"
import { test } from "node:test"
import { heroAriaLabel, parseHeroTitle } from "./heroTitle.ts"

test("parseHeroTitle splits lines and tags text/chip/break tokens", () => {
  const lines = parseHeroTitle("Creative [1] developer|\nbased in [2] Brazil")

  assert.equal(lines.length, 2)
  assert.deepEqual(lines[0], [
    { type: "text", value: "Creative " },
    { type: "chip", index: 1 },
    { type: "text", value: " developer" },
    { type: "break" },
  ])
  assert.deepEqual(lines[1], [
    { type: "text", value: "based in " },
    { type: "chip", index: 2 },
    { type: "text", value: " Brazil" },
  ])
})

test("parseHeroTitle handles a line with only a marker", () => {
  const lines = parseHeroTitle("[3]")
  assert.deepEqual(lines, [[{ type: "chip", index: 3 }]])
})

test("heroAriaLabel strips markers and collapses whitespace", () => {
  assert.equal(heroAriaLabel("Creative [1] developer|\nbased in [2]  Brazil"), "Creative developer based in Brazil")
})
