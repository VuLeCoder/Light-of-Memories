import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';

// Run the actual pure TypeScript state machine without needing a browser/server.
const source = readFileSync(new URL('../src/content/earth-dialogue.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } });
const { dialogueReducer: reduce, earthDialogue: lines } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('elapsed typing time never changes the turn or finishes the story', () => {
  for (let index = 0; index < lines.length; index++) {
    let state = { index, visible: 0, finished: false };
    for (let i = 0; i < 1000; i++) state = reduce(state, 'tick');
    assert.deepEqual(state, { index, visible: lines[index].text.length, finished: false });
  }
});

test('first input reveals text; only a second input advances, including the final turn', () => {
  let state = { index: 0, visible: 0, finished: false };
  for (let index = 0; index < lines.length; index++) {
    state = reduce(state, 'advance');
    assert.deepEqual(state, { index, visible: lines[index].text.length, finished: false });
    state = reduce(state, 'advance');
    assert.equal(state.finished, index === lines.length - 1);
    if (!state.finished) assert.equal(state.index, index + 1);
  }
  assert.equal(reduce(state, 'advance'), state);
  assert.equal(reduce(state, 'tick'), state);
});

test('revealing without animation keeps the current speaker until confirmation', () => {
  let state = { index: 3, visible: 0, finished: false };
  state = reduce(state, 'reveal');
  assert.equal(lines[state.index].speaker, 'ba');
  assert.equal(state.index, 3);
  state = reduce(state, 'advance');
  assert.equal(state.index, 4);
  assert.equal(lines[state.index].speaker, 'ba');
});
