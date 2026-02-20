## 2026-02-14 - [Morphing Dialog Accessibility Pattern]
**Learning:** Components using `motion.div` with `role="button"` are not automatically focusable. They require `tabIndex={0}` and a custom `onKeyDown` handler (Enter/Space) to be fully accessible.
**Action:** Always add `tabIndex={0}` and ensure both click and keyboard activations trigger the intended action in custom trigger components.

## 2026-02-15 - [Hover States and Keyboard Accessibility]
**Learning:** Hiding utility buttons with `opacity-0` for a cleaner UI is a common pattern, but it breaks keyboard accessibility if they don't become visible on focus.
**Action:** Always pair `opacity-0` or `group-hover:opacity-100` with `focus-visible:opacity-100` for interactive elements to ensure they are discoverable by keyboard users.

## 2026-02-16 - [Descriptive Link Text and Button Labels]
**Learning:** Generic link text like "here" is detrimental to accessibility and SEO. Screen reader users often navigate by lists of links/buttons, and "here" provides no context.
**Action:** Always use descriptive text for links and buttons (e.g., "block my calendar" instead of "here"). If the visible text must be short, use `aria-label` to provide full context.

## 2026-02-20 - [Enhancing Keyboard Discoverability of Animations]
**Learning:** Delightful micro-interactions like hover-reveal background highlights or color restores are often missed by keyboard users if tied only to pointer events.
**Action:** Always sync keyboard focus states (`onFocus`, `onBlur`) with hover states to ensure accessibility users experience the same visual cues and "delight" as mouse users.

## 2026-02-20 - [Screen Reader Feedback for Dynamic Label Transitions]
**Learning:** Transitions between labels (e.g., "Copy" to "Copied") are visually clear but silent to screen readers unless specifically marked.
**Action:** Use `aria-live="polite"` on elements that undergo text-morphing or label changes to ensure the state transition is announced to assistive technologies.
