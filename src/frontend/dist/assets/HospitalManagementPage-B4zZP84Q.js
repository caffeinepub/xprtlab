import { r as reactExports, j as jsxRuntimeExports } from "./index-BcSF07MB.js";
import { B as Badge } from "./badge-D6H4sPB8.js";
import { B as Button } from "./button-wOnNUJ71.js";
import { I as Input } from "./input-BiZ8Warn.js";
import { S as Skeleton } from "./skeleton-j2Ru2Hzr.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, P as Pencil, B as Ban } from "./table-Chy094JW.js";
import { u as ue } from "./index-BPXqeWHC.js";
import { P as PageHeroHeader } from "./PageHeroHeader-CPzgo-wN.js";
import { n as useHospitals, al as useAddHospital, am as useUpdateHospital, an as useDisableHospital } from "./ProfileSetupModal-DZhF98LT.js";
import { B as Building2 } from "./building-2-2WTSU1FY.js";
import { S as Search } from "./search-DHbyPuXy.js";
import { R as RefreshCw } from "./refresh-cw-C-Eluhow.js";
import { M as MapPin } from "./map-pin-Ddp8nwPv.js";
import { P as Phone } from "./user-BR4Wwed5.js";
import "./index-hKQIW38e.js";
import "./plus-Be-trJXM.js";
const emptyForm = () => ({
  name: "",
  city: "",
  address: "",
  area: "",
  contactNumber: ""
});
function HospitalManagementPage({
  role = "superAdmin",
  onNavigate: _onNavigate
}) {
  const isSuperAdmin = role === "superAdmin";
  const [search, setSearch] = reactExports.useState("");
  const [showModal, setShowModal] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm());
  const [formError, setFormError] = reactExports.useState("");
  const {
    data: hospitals = [],
    isLoading,
    refetch
  } = useHospitals(search || void 0);
  const addHospital = useAddHospital();
  const updateHospital = useUpdateHospital();
  const disableHospital = useDisableHospital();
  const openAdd = () => {
    setForm(emptyForm());
    setEditingId(null);
    setFormError("");
    setShowModal(true);
  };
  const openEdit = (h) => {
    setForm({
      name: h.name,
      city: h.city,
      address: h.address,
      area: h.area,
      contactNumber: h.contactNumber
    });
    setEditingId(h.id);
    setFormError("");
    setShowModal(true);
  };
  const handleSave = async () => {
    if (!form.name.trim()) {
      setFormError("Hospital name is required.");
      return;
    }
    if (!form.city.trim()) {
      setFormError("City is required.");
      return;
    }
    setFormError("");
    try {
      if (editingId) {
        await updateHospital.mutateAsync({
          id: editingId,
          name: form.name,
          city: form.city,
          address: form.address,
          area: form.area,
          contactNumber: form.contactNumber
        });
        ue.success("Hospital updated successfully");
      } else {
        await addHospital.mutateAsync({
          name: form.name,
          city: form.city,
          address: form.address,
          area: form.area,
          contactNumber: form.contactNumber
        });
        ue.success("Hospital added successfully");
      }
      setShowModal(false);
    } catch (err) {
      setFormError((err == null ? void 0 : err.message) ?? "Failed to save hospital.");
    }
  };
  const handleDisable = async (h) => {
    if (!window.confirm(
      `Disable "${h.name}"? This will prevent new samples from being assigned.`
    ))
      return;
    try {
      await disableHospital.mutateAsync(h.id);
      ue.success(`${h.name} disabled.`);
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) ?? "Failed to disable hospital.");
    }
  };
  const isBusy = addHospital.isPending || updateHospital.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-[90px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "🏥 Hospital Management",
        description: "Manage hospitals, assignments, and phlebotomist coverage",
        actionLabel: isSuperAdmin ? "+ Add Hospital" : void 0,
        onAction: isSuperAdmin ? openAdd : void 0
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-4 py-4 mb-4",
        style: {
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-5 h-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-white", style: { fontSize: "20px" }, children: "🏥 Hospital Management" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/70", style: { fontSize: "12px" }, children: "Super Admin Control" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Search hospitals...",
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-9",
              "data-ocid": "hospitals.search_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            onClick: () => refetch(),
            disabled: isLoading,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}`
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border overflow-hidden shadow-card bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Hospital Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Status" }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }, (_, i) => `skel-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) })
        ] }, k)) : hospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          TableCell,
          {
            colSpan: isSuperAdmin ? 5 : 4,
            className: "text-center text-muted-foreground py-10",
            "data-ocid": "hospitals.empty_state",
            children: search ? "No hospitals match your search." : "No hospitals found. Add your first hospital."
          }
        ) }) : hospitals.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "hover:bg-muted/30 transition-colors",
            "data-ocid": `hospitals.table.item.${idx + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4 text-blue-600" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: h.name })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3.5 h-3.5" }),
                h.city,
                h.area ? `, ${h.area}` : ""
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: h.contactNumber ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-muted-foreground text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                h.contactNumber
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: h.isActive ? "default" : "secondary",
                  className: h.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "",
                  children: h.isActive ? "Active" : "Inactive"
                }
              ) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => openEdit(h),
                    title: "Edit hospital",
                    "data-ocid": `hospitals.table.edit_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive hover:text-destructive",
                    onClick: () => handleDisable(h),
                    title: "Disable hospital",
                    disabled: !h.isActive || disableHospital.isPending,
                    "data-ocid": `hospitals.table.delete_button.${idx + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }) })
            ]
          },
          h.id
        )) })
      ] }) })
    ] }),
    showModal && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "absolute inset-0 bg-black/40 cursor-default",
          onClick: () => setShowModal(false),
          "aria-label": "Close modal"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 flex flex-col",
          style: { maxHeight: "90vh" },
          "data-ocid": "hospitals.modal.dialog",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-bold text-gray-900", children: editingId ? "Edit Hospital" : "Add New Hospital" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowModal(false),
                  className: "w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-400",
                  "data-ocid": "hospitals.modal.close_button",
                  children: "✕"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-y-auto flex-1 px-6 py-4 space-y-4", children: [
              formError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3",
                  "data-ocid": "hospitals.modal.error_state",
                  children: formError
                }
              ),
              [
                {
                  label: "Hospital Name *",
                  key: "name",
                  placeholder: "e.g. City Care Hospital"
                },
                {
                  label: "City *",
                  key: "city",
                  placeholder: "e.g. Hyderabad"
                },
                {
                  label: "Area / Zone",
                  key: "area",
                  placeholder: "e.g. Banjara Hills"
                },
                {
                  label: "Address",
                  key: "address",
                  placeholder: "Full address"
                },
                {
                  label: "Contact Number",
                  key: "contactNumber",
                  placeholder: "e.g. 9800000000"
                }
              ].map(({ label, key, placeholder }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: `hosp-field-${key}`,
                    className: "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1",
                    children: label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: `hosp-field-${key}`,
                    type: "text",
                    value: form[key],
                    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
                    placeholder,
                    className: "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all",
                    "data-ocid": "hospitals.modal.input"
                  }
                )
              ] }, key))
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setShowModal(false),
                  className: "px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors",
                  "data-ocid": "hospitals.modal.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: handleSave,
                  disabled: isBusy,
                  className: "px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-60",
                  style: {
                    background: "linear-gradient(135deg,#2563EB,#1976D2)"
                  },
                  "data-ocid": "hospitals.modal.submit_button",
                  children: isBusy ? "Saving..." : editingId ? "Save Changes" : "Add Hospital"
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  HospitalManagementPage as default
};
