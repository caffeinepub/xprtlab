# Specification

## Summary
**Goal:** Redesign the bottom navigation bar into a floating, frosted-glass container with a gradient active tab pill and smooth animations, while preserving all existing role-based routing.

**Planned changes:**
- Refactor `BottomNavigation.tsx`, `StaffAppLayout.tsx`, and `PatientAppLayout.tsx` to render the bottom nav as a fixed floating container with 16–20px horizontal margin, 12–16px bottom margin, and `borderRadius: 24`
- Apply safe area inset support on both iOS and Android so the nav respects notches and gesture bars
- Ensure page content does not scroll behind or overlap the floating nav
- Add a frosted-glass background using BlurView (intensity 60–80, tint: `light`) with a fallback of `rgba(255,255,255,0.9)`
- Add a subtle 1px semi-transparent white border and a soft drop shadow (`shadowOpacity: 0.08`, `shadowRadius: 12`, `elevation: 10`)
- Style the active tab with a gradient pill background (`#0D47A1` → `#26C6DA`), white icon, and scale animation (1.05–1.1)
- Render inactive tab icons in `#94A3B8`
- Add smooth animated transitions when switching between tabs
- Preserve all existing role-based nav item visibility logic (`roleNavConfig`) and routing behaviour

**User-visible outcome:** The bottom navigation floats above page content with rounded corners, a frosted-glass blur effect, a glowing gradient pill on the active tab, and smooth animations when switching tabs — while all role-specific routes continue to work as before.
