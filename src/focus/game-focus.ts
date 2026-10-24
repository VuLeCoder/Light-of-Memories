/** Choose a usable control, never a hidden, disabled or inert scene. */
export function focusGame(stage: HTMLElement | null) {
  if (!stage) return;
  const selectors = [
    '.dialogue .dialogue-next',
    '.story-canvas .game-host',
    '[data-tai-primary]',
    '[data-banh-primary]',
    '.journey-view h2[tabindex]',
    'button, input, select, [tabindex="0"]',
  ];
  for (const selector of selectors) {
    for (const target of stage.querySelectorAll<HTMLElement>(selector)) {
      if (target.closest('[hidden], [inert]') || target.matches(':disabled') || !target.getClientRects().length || getComputedStyle(target).visibility === 'hidden') continue;
      target.focus({ preventScroll: true });
      if (document.activeElement === target) return;
    }
  }
  stage.focus({ preventScroll: true });
}
