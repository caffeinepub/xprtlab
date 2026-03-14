# XprtLab

## Current State
The Phlebotomist panel has multiple screens: AttendancePage, TaskQueuePage, HomeCollectionQueuePage, MyHospitalSamplesPage, AddHospitalSamplePage. The BottomNavigation is already mostly styled (solid white, shadow, active highlight, scale). However:
- AttendancePage has a plain white header with no gradient, old summary card labels ("Total Samples" etc.), and no hero section
- HomeCollectionQueuePage header is plain white, no gradient
- MyHospitalSamplesPage has no gradient header and no PageHeroHeader
- AddHospitalSamplePage has no search fields for hospitals or tests
- Button gradients in phlebotomist screens use `from-blue-600 to-cyan-500` instead of the app theme `#0D47A1 → #26A69A`
- Status badge colors are inconsistent across pages
- BottomNavigation could benefit from slightly enhanced shadow and transition

## Requested Changes (Diff)

### Add
- Gradient hero header to AttendancePage (linear-gradient 135deg, #0D47A1, #26A69A) with white text, title "Start Attendance", subtitle "Mark your attendance to begin today's collections", subtle medical SVG cross pattern at low opacity
- Hospital search field in AddHospitalSamplePage above the hospital list
- Test search field in AddHospitalSamplePage above the test list
- PageHeroHeader to MyHospitalSamplesPage

### Modify
- AttendancePage: rename section "Today's Summary" → "Today's Collections"; update card labels: Samples→"Samples Collected", Cash→"Cash Collected", UPI→"UPI Collected", Pending→"Payment Pending"; fix any duplicate rendering of the summary section
- All phlebotomist pages: standardize button gradients to `linear-gradient(135deg, #0D47A1, #26A69A)` (not blue-600 to cyan-500)
- Status badges across all phlebotomist pages: Assigned→grey, En Route→blue, Collected→teal, Processing→orange, Delivered→green
- MyHospitalSamplesPage: patient name bold, hospital/test list smaller below, pending amount in red, stronger card shadows
- HomeCollectionQueuePage: add gradient header matching TaskQueuePage style, clearer primary/secondary button distinction (primary=gradient, secondary=outline)
- AddHospitalSamplePage billing section: clearly show Total MRP / Discount / Final Amount (bold) / Amount Received / Pending (red); CASH/UPI toggle as rounded gradient-active pills
- BottomNavigation: add slightly stronger top shadow `0 -8px 32px rgba(13,71,161,0.12)`, ensure smooth 200ms transition on all tab switches

### Remove
- Nothing to remove

## Implementation Plan
1. Update `AttendancePage.tsx` — gradient hero header, renamed section + card labels, fix duplicate summary
2. Update `HomeCollectionQueuePage.tsx` — gradient page header card, primary/secondary button polish
3. Update `MyHospitalSamplesPage.tsx` — PageHeroHeader, bold patient names, stronger shadows, red pending, gradient header
4. Update `AddHospitalSamplePage.tsx` — hospital search field, test search field, billing layout improvements, gradient buttons, CASH/UPI toggle polish
5. Update `TaskQueuePage.tsx` — align status badge colors to spec
6. Update `BottomNavigation.tsx` — slightly stronger top shadow, 200ms smooth transitions
7. All phlebotomist page buttons: standardize to `#0D47A1 → #26A69A` gradient (not blue-600/cyan-500)
