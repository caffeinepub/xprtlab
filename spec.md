# Specification

## Summary
**Goal:** Complete the phlebotomist assignment and area-matching backend logic, and wire up the hospital management and phlebotomist assignment UI flows end-to-end.

**Planned changes:**
- Implement `assignPhlebotomistToHospital` and `removePhlebotomistFromHospital` backend functions with role validation, persistence, and upgrade survival via stable storage
- Add a `getAssignedHospitals` query that returns hospitals linked to the calling phlebotomist's principal, filtered by matching area/city
- Update `AddHospitalSamplePage` and `HomeCollectionQueuePage` to use `getAssignedHospitals` instead of fetching all hospitals
- Validate the `HospitalManagementPage` add, edit, disable, and search flows with optimistic UI updates and error toasts
- Wire the `HospitalDetailsPage` assign/remove phlebotomist UI to the backend functions, including confirmation dialogs and success/error toasts, with list refresh after changes

**User-visible outcome:** Super admins can assign and remove phlebotomists from hospitals with proper feedback; phlebotomists only see hospitals relevant to their area; the hospital management list correctly reflects add, edit, disable, and search operations in real time.
