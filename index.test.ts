import { expect, test } from "bun:test";
import { Welford } from ".";

test("constructor", () => {
	let w = new Welford();
	expect(w.mean).toBe(0);
	expect(w.count).toBe(0);
	expect(w.m2).toBe(0);
});

test("constructor, nondefault", () => {
	let w = new Welford(2, 1, 3);
	expect(w.mean).toBe(1);
	expect(w.count).toBe(2);
	expect(w.m2).toBe(3);
});

test("range", () => {
	let w = new Welford();
	for (let i = 0; i <= 100; i++) {
		w = w.update(i);
	}
	let {mean, sd, sem} = w.finalize();
	expect(mean).toBe(50.0);
	expect(sd).toBe(29.154759474226502);
	expect(sem).toBe(2.90100699484824);
});
