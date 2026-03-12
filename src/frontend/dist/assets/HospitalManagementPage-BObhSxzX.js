import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CzbPOvyV.js";
import { B as Badge } from "./badge-Bh2MLGly.js";
import { B as Button } from "./button-CiKsIGuP.js";
import { I as Input } from "./input-CIfQ8nBJ.js";
import { u as ue } from "./index-CMkDufv6.js";
import { u as useForm, S as Switch } from "./index.esm-BXB8QuQ7.js";
import { d as createLucideIcon, al as useAddHospital, X, L as LoaderCircle, am as useUpdateHospital, I as Dialog, J as DialogContent, K as DialogHeader, M as DialogTitle, N as DialogDescription, O as DialogFooter, m as useHospitals, an as useDisableHospital } from "./ProfileSetupModal-BYStubB_.js";
import { C as CircleAlert } from "./circle-alert-Byqvf5bL.js";
import { L as Label } from "./label-a7i21b1Q.js";
import { T as Textarea } from "./textarea-C1JLlhmI.js";
import { P as PageHeroHeader } from "./PageHeroHeader-iVDMtqNX.js";
import { B as Building2 } from "./building-2-CzOXe9xM.js";
import { P as Plus } from "./plus-BegRxyQ4.js";
import { S as Search } from "./search-DSrwGjs-.js";
import { C as ChevronLeft } from "./chevron-left-DWTy3RXA.js";
import { C as ChevronRight } from "./chevron-right-B18SUE64.js";
import { M as MapPin } from "./map-pin-D6z2p51m.js";
import { P as Phone } from "./user-D8SUbWXo.js";
import { E as Eye } from "./eye-kuaOPOm_.js";
import { P as Pen } from "./pen-CT6cHVKr.js";
import "./index-BVenjb96.js";
import "./index-C8SF2zjx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18.36 6.64A9 9 0 0 1 20.77 15", key: "dxknvb" }],
  ["path", { d: "M6.16 6.16a9 9 0 1 0 12.68 12.68", key: "1x7qb5" }],
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const PowerOff = createLucideIcon("power-off", __iconNode);
function AddHospitalModal({
  open,
  onOpenChange
}) {
  const addHospital = useAddHospital();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      city: "",
      address: "",
      area: "",
      contactNumber: "",
      isActive: true
    }
  });
  const isActive = watch("isActive");
  reactExports.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const onSubmit = async (values) => {
    try {
      await addHospital.mutateAsync({
        name: values.name.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        area: values.area.trim(),
        contactNumber: values.contactNumber.trim()
      });
      ue.success(`Hospital "${values.name}" added successfully.`);
      reset();
      onOpenChange(false);
    } catch (err) {
      ue.error(`Failed to add hospital: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  const handleClose = () => {
    if (addHospital.isPending) return;
    reset();
    onOpenChange(false);
  };
  if (!open) return null;
  const hasGeneralError = addHospital.isError;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      style: { animation: "modalBackdropIn 200ms ease-in-out forwards" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-black/50",
            onClick: handleClose,
            onKeyDown: (e) => e.key === "Escape" && handleClose(),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            open: true,
            className: "relative w-full max-w-md bg-white rounded-2xl border-0 flex flex-col",
            style: {
              boxShadow: "0 8px 40px rgba(0,0,0,0.18), 0 2px 12px rgba(13,71,161,0.10)",
              animation: "modalPanelIn 200ms ease-in-out forwards",
              maxHeight: "90vh",
              overflow: "hidden"
            },
            "aria-labelledby": "add-hospital-title",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "add-hospital-title",
                      className: "text-lg font-bold text-gray-900 tracking-tight",
                      children: "Add Hospital"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Fill in the details to add a new hospital." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: addHospital.isPending,
                    className: "ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  id: "add-hospital-form",
                  onSubmit: handleSubmit(onSubmit),
                  className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
                  style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
                  children: [
                    hasGeneralError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-red-500 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 font-medium", children: "Failed to add hospital. Please check your inputs and try again." })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "hosp-name",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Hospital Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "hosp-name",
                          placeholder: "e.g. City General Hospital",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.name ? "border-red-400" : "border-gray-200"}`,
                          ...register("name", { required: "Hospital name is required" })
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.name.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "hosp-city",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "City"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "hosp-city",
                          placeholder: "e.g. Mumbai",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("city")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "hosp-address",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Address"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "hosp-address",
                          placeholder: "Full address...",
                          rows: 2,
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none",
                          ...register("address")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "hosp-area",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Area / Zone"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "hosp-area",
                          placeholder: "e.g. North Zone",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("area")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "hosp-contact",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Contact Number"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "hosp-contact",
                          type: "tel",
                          placeholder: "e.g. +91 98765 43210",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("contactNumber")
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-700 uppercase tracking-wide", children: "Status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: isActive ? "Hospital is Active" : "Hospital is Inactive" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Switch,
                        {
                          checked: isActive,
                          onCheckedChange: (val) => setValue("isActive", val)
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: addHospital.isPending,
                    className: "flex-1 h-10 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-ocid": "add-hospital.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    form: "add-hospital-form",
                    disabled: addHospital.isPending,
                    className: "flex-[2] flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100",
                    style: {
                      background: addHospital.isPending ? void 0 : "linear-gradient(to right, #0D47A1, #26C6DA)",
                      backgroundColor: addHospital.isPending ? "#9ca3af" : void 0
                    },
                    "data-ocid": "add-hospital.submit_button",
                    children: [
                      addHospital.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Add Hospital"
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function EditHospitalModal({
  open,
  onOpenChange,
  hospital
}) {
  const updateHospital = useUpdateHospital();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: hospital.name,
      city: hospital.city,
      address: hospital.address,
      area: hospital.area,
      contactNumber: hospital.contactNumber,
      isActive: hospital.isActive
    }
  });
  reactExports.useEffect(() => {
    reset({
      name: hospital.name,
      city: hospital.city,
      address: hospital.address,
      area: hospital.area,
      contactNumber: hospital.contactNumber,
      isActive: hospital.isActive
    });
  }, [hospital, reset]);
  const isActive = watch("isActive");
  const onSubmit = async (values) => {
    try {
      await updateHospital.mutateAsync({
        id: hospital.id,
        name: values.name.trim(),
        city: values.city.trim(),
        address: values.address.trim(),
        area: values.area.trim(),
        contactNumber: values.contactNumber.trim()
      });
      ue.success(`Hospital "${values.name}" updated successfully.`);
      onOpenChange(false);
    } catch (err) {
      ue.error(`Failed to update hospital: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  const handleClose = () => {
    if (updateHospital.isPending) return;
    onOpenChange(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md p-0 gap-0 flex flex-col overflow-hidden",
      style: { maxHeight: "90vh" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "flex-shrink-0 px-6 pt-6 pb-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Hospital" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the hospital details below." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex-1 overflow-y-auto px-6 py-5",
            style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                id: "edit-hospital-form",
                onSubmit: handleSubmit(onSubmit),
                className: "space-y-4",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-name", children: [
                      "Hospital Name ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "edit-name",
                        placeholder: "e.g. City General Hospital",
                        ...register("name", { required: "Hospital name is required" })
                      }
                    ),
                    errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name.message })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-city", children: "City" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "edit-city",
                        placeholder: "e.g. Mumbai",
                        ...register("city")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-address", children: "Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        id: "edit-address",
                        placeholder: "Full address...",
                        rows: 2,
                        ...register("address")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-area", children: "Area / Zone" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "edit-area",
                        placeholder: "e.g. North Zone",
                        ...register("area")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-contactNumber", children: "Contact Number" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "edit-contactNumber",
                        type: "tel",
                        placeholder: "e.g. +91 98765 43210",
                        ...register("contactNumber")
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 bg-muted/40 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Status" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isActive ? "Hospital is Active" : "Hospital is Inactive" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: isActive,
                        onCheckedChange: (val) => setValue("isActive", val)
                      }
                    )
                  ] })
                ]
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-shrink-0 px-6 py-4 border-t border-border bg-background", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: handleClose,
              disabled: updateHospital.isPending,
              "data-ocid": "edit-hospital.cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              form: "edit-hospital-form",
              disabled: updateHospital.isPending,
              "data-ocid": "edit-hospital.submit_button",
              children: [
                updateHospital.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 mr-2 animate-spin" }),
                "Save Changes"
              ]
            }
          )
        ] })
      ]
    }
  ) });
}
const PAGE_SIZE = 20;
function HospitalManagementPage({
  role,
  onNavigate
}) {
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [editHospital, setEditHospital] = reactExports.useState(null);
  const [disableTarget, setDisableTarget] = reactExports.useState(null);
  const { data: hospitals = [], isLoading } = useHospitals(searchTerm);
  const disableMutation = useDisableHospital();
  const isSuperAdmin = role === "superAdmin";
  const totalPages = Math.max(1, Math.ceil(hospitals.length / PAGE_SIZE));
  const paginated = reactExports.useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return hospitals.slice(start, start + PAGE_SIZE);
  }, [hospitals, page]);
  const handleDisableConfirm = async () => {
    if (!disableTarget) return;
    try {
      await disableMutation.mutateAsync(disableTarget.id);
      ue.success(`Hospital "${disableTarget.name}" has been disabled.`);
    } catch (err) {
      ue.error(`Failed to disable hospital: ${(err == null ? void 0 : err.message) ?? err}`);
    } finally {
      setDisableTarget(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Hospital Management",
        description: "Manage hospitals and phlebotomist assignments",
        actionLabel: "Add Hospital",
        onAction: () => setShowAddModal(true)
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-5 w-5 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground", children: "Hospital Management" })
        ] }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: () => setShowAddModal(true),
            className: "gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
              "Add Hospital"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search by name, city, or area...",
            value: searchTerm,
            onChange: (e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto px-4 py-4 space-y-3", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 bg-muted rounded-xl animate-pulse" }, i)) }) : hospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 text-muted-foreground/40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "No hospitals added yet." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: isSuperAdmin ? 'Click "Add Hospital" to get started.' : "Contact your Super Admin to add hospitals." })
    ] }) : paginated.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-10 w-10 text-muted-foreground/40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "No results found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try a different search term." })
    ] }) : paginated.map((hospital) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HospitalCard,
      {
        hospital,
        isSuperAdmin,
        onEdit: () => setEditHospital(hospital),
        onDisable: () => setDisableTarget(hospital),
        onViewDetails: () => onNavigate == null ? void 0 : onNavigate("hospital-details", { hospitalId: hospital.id })
      },
      hospital.id
    )) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border flex items-center justify-between bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "Page ",
        page,
        " of ",
        totalPages,
        " · ",
        hospitals.length,
        " hospitals"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: page === 1,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: page === totalPages,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AddHospitalModal, { open: showAddModal, onOpenChange: setShowAddModal }),
    editHospital && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditHospitalModal,
      {
        open: !!editHospital,
        onOpenChange: (open) => {
          if (!open) setEditHospital(null);
        },
        hospital: editHospital
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!disableTarget,
        onOpenChange: (open) => {
          if (!open) setDisableTarget(null);
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Disable Hospital" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to disable",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: disableTarget == null ? void 0 : disableTarget.name }),
              "? The hospital will be marked inactive. Phlebotomists will not be able to add new samples for it. This action can be reversed by editing the hospital."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDisableConfirm,
                className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                disabled: disableMutation.isPending,
                children: disableMutation.isPending ? "Disabling..." : "Disable"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function HospitalCard({
  hospital,
  isSuperAdmin,
  onEdit,
  onDisable,
  onViewDetails
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-border shadow-sm p-4 space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground truncate", children: hospital.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: hospital.isActive ? "default" : "secondary",
            className: hospital.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200",
            children: hospital.isActive ? "Active" : "Inactive"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-3 gap-y-0.5 mt-1", children: [
        hospital.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
          " ",
          hospital.city
        ] }),
        hospital.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Zone: ",
          hospital.area
        ] }),
        hospital.contactNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
          " ",
          hospital.contactNumber
        ] })
      ] }),
      hospital.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: hospital.address })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: onViewDetails,
          className: "gap-1.5 text-xs h-7",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3 w-3" }),
            " Details"
          ]
        }
      ),
      isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onEdit,
            className: "gap-1.5 text-xs h-7",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "h-3 w-3" }),
              " Edit"
            ]
          }
        ),
        hospital.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: onDisable,
            className: "gap-1.5 text-xs h-7 text-destructive border-destructive/30 hover:bg-destructive/5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PowerOff, { className: "h-3 w-3" }),
              " Disable"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  HospitalManagementPage as default
};
