## 2025-05-14 - [Morphing Dialog Accessibility Pattern]
**Learning:** Components using `motion.div` with `role="button"` are not automatically focusable. They require `tabIndex={0}` and a custom `onKeyDown` handler (Enter/Space) to be fully accessible.
**Action:** Always add `tabIndex={0}` and ensure both click and keyboard activations trigger the intended action in custom trigger components.

## 2025-05-14 - [Hover States and Keyboard Accessibility]
**Learning:** Hiding utility buttons with `opacity-0` for a cleaner UI is a common pattern, but it breaks keyboard accessibility if they don't become visible on focus.
**Action:** Always pair `opacity-0` or `group-hover:opacity-100` with `focus-visible:opacity-100` for interactive elements to ensure they are discoverable by keyboard users.
