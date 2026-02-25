# Specification

## Summary
**Goal:** Apply UI corrections, operational control hardening, and backend enhancements to the XprtLab Phlebotomist Portal.

**Planned changes:**
- Remove all "Built with ❤️ using caffeine.ai" branding text from every layout
- Add the XprtLab logo to the header in StaffAppLayout and PatientAppLayout; reduce header height for better mobile usability
- Improve global spacing, font weights (semibold/bold labels and headings), and contrast for a professional medical look
- Add a "Today Summary" section on the Attendance screen showing Total Samples Collected, Cash Collected, UPI Collected, and Pending Amount derived from the current day's records
- Rename "End Shift" button to "End Shift & Submit Summary" with a confirmation popup warning that entries cannot be edited after submission
- Block starting a new shift if an active shift exists, showing an informative message to the phlebotomist
- Add a manual Refresh button and "Last Updated" timestamp to the Task Queue page, enable auto-refresh every 15 seconds, and update the empty state message
- Make the Hospital field on the Hospital Sample form a read-only dropdown populated from admin-assigned hospitals only (no frontend cap on count)
- Add 10-digit numeric inline validation to the patient mobile number field on the Hospital Sample form
- Display MRP and Offer Price when a test is selected; auto-calculate and lock the Final Amount field with a lock icon indicator
- Restrict Payment Mode to "Cash Collected", "UPI Received", and "Hospital Credit"; auto-fill Amount Received for Cash/UPI modes and lock it; set zero for Hospital Credit
- Add a pre-submission confirmation dialog on the Hospital Sample form showing patient name, test, final amount, and payment mode
- Redesign the Home Collection Queue task cards to show Patient Name, Address, Contact Number, Assigned Tests, Payable Amount, and action buttons: Call, Start Visit, Mark as Collected, Mark as Not Available
- Add Assigned Hospitals List, Support/Call Admin button, App Version display, and Logout confirmation popup to the phlebotomist Profile page
- Ensure Today Summary is always visible above the End Shift button when a shift is active; button is only enabled after the summary loads
- Extend backend to store phlebotomist-to-hospital assignments, expose `getAssignedHospitals()` and `getDailySummary()` queries, and support admin management of hospital assignments

**User-visible outcome:** Phlebotomists see a polished, branded interface with stricter operational controls — locked price fields, validated inputs, shift guards, auto-refreshing task queue, and clear daily summaries — while the backend enforces hospital assignments and daily aggregations.
