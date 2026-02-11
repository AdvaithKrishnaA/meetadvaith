## 2025-05-14 - [Morphing Dialog Accessibility Pattern]
**Learning:** Components using `motion.div` with `role="button"` are not automatically focusable. They require `tabIndex={0}` and a custom `onKeyDown` handler (Enter/Space) to be fully accessible.
**Action:** Always add `tabIndex={0}` and ensure both click and keyboard activations trigger the intended action in custom trigger components.
