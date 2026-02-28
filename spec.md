# Specification

## Summary
**Goal:** Add a Hospital Management module (Phase 1) to XpertLab, covering hospital CRUD, phlebotomist-hospital assignment management, and related UI updates in the Staff App.

**Planned changes:**

**Backend:**
- Add a `Hospital` data model (id, name, city, address, area/zone, contactNumber, isActive, createdAt) persisted in stable storage.
- Expose endpoints: `addHospital`, `updateHospital`, `disableHospital` (soft-disable only), `getHospitals` (paginated + search), `getHospitalById`.
- Add a `HospitalPhlebotomistAssignment` model (hospitalId, phlebotomistPrincipal, isActive) in stable storage.
- Expose assignment endpoints: `assignPhlebotomistToHospital`, `removePhlebotomistFromHospital`, `getPhlebotomistsByHospital`, `getHospitalsByPhlebotomist`. Removals use a soft-inactive flag, never deletion.
- Add an optional `area/zone` field to the phlebotomist `UserProfile` model.
- In `addHospitalSample`, validate that the selected hospital is active before accepting the submission.

**Frontend:**
- Add a "Hospital Management" page under Super Admin navigation listing hospitals with name, city, area, contact, status badge, edit/disable actions, search bar, and pagination (20/page).
- Add "Add Hospital" modal/form with all fields and validation.
- Add "Edit Hospital" modal pre-populated with existing data.
- Add a Hospital Details page with an "Assigned Phlebotomists" section; Super Admin can assign phlebotomists via a searchable multi-select dropdown with area-match suggestion labels.
- Add an "Assigned Hospitals" section to the Phlebotomist Profile page — editable by Super Admin, read-only for phlebotomist and Lab Admin roles.
- Filter the hospital dropdown on AddHospitalSamplePage to show only active hospitals assigned to the current phlebotomist.
- Add React Query hooks in `useQueries.ts` for all new hospital and assignment endpoints.

**User-visible outcome:** Super Admins can create, edit, disable, and search hospitals, assign phlebotomists to hospitals with area-match suggestions, and manage assignments from both the Hospital Details page and the Phlebotomist Profile page. Phlebotomists and Lab Admins can view assigned hospitals in read-only mode. Phlebotomists adding samples only see their active assigned hospitals.
