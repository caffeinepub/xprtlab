import { j as jsxRuntimeExports, r as reactExports, T as TestError } from "./index-lVn_hGWr.js";
import { B as Badge } from "./badge-Bh2MLGly.js";
import { B as Button } from "./button-CiKsIGuP.js";
import { I as Input } from "./input-CIfQ8nBJ.js";
import { S as Skeleton } from "./skeleton-D6BQTi4n.js";
import { u as useForm, S as Switch } from "./index.esm-BXB8QuQ7.js";
import { d as createLucideIcon, c as cn, $ as useAddTest, X, L as LoaderCircle, a0 as useDisableTest, a1 as useUpdateTest, I as Dialog, J as DialogContent, K as DialogHeader, M as DialogTitle, N as DialogDescription, O as DialogFooter, e as useGetAllTests, a2 as useBulkAddTests, a3 as useSetTestStatus } from "./ProfileSetupModal-BYStubB_.js";
import { u as ue } from "./index-CMkDufv6.js";
import { m as addDemoTestMaster, n as updateDemoTestMaster } from "./demoData-B0MQ4MOM.js";
import { C as CircleAlert } from "./circle-alert-Byqvf5bL.js";
import { T as TriangleAlert } from "./triangle-alert-DHn0HLZP.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CzbPOvyV.js";
import { L as Label } from "./label-a7i21b1Q.js";
import { c as computeProfitPerTest, g as getProfitStatusColor } from "./profitUtils-CU3rQSve.js";
import { P as PageHeroHeader } from "./PageHeroHeader-iVDMtqNX.js";
import { T as TestTube } from "./StaffApp-GSTH_5VV.js";
import { U as Upload } from "./upload-B2Qu1HhZ.js";
import { P as Plus } from "./plus-BegRxyQ4.js";
import { S as Search } from "./search-DSrwGjs-.js";
import { C as ChevronLeft } from "./chevron-left-DWTy3RXA.js";
import { C as ChevronRight } from "./chevron-right-B18SUE64.js";
import "./index-BVenjb96.js";
import "./index-C8SF2zjx.js";
import "./user-D8SUbWXo.js";
import "./clock-fiwY_hPt.js";
import "./building-2-CzOXe9xM.js";
import "./map-pin-D6z2p51m.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.9 4.9 14.2 14.2", key: "1m5liu" }]
];
const Ban = createLucideIcon("ban", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function AddTestModal({ open, onClose }) {
  const addTest = useAddTest();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      sampleType: "",
      mrp: 0,
      labCost: 0,
      doctorCommission: 0,
      isActive: true
    }
  });
  const isActive = watch("isActive");
  const watchedMrp = watch("mrp");
  const watchedLabCost = watch("labCost");
  const watchedDoctorCommission = watch("doctorCommission");
  const commissionAmt = (watchedMrp ?? 0) * ((watchedDoctorCommission ?? 0) / 100);
  const profitPerTest = (watchedMrp ?? 0) - (watchedLabCost ?? 0) - commissionAmt;
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;
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
      const result = await addTest.mutateAsync({
        name: values.name.trim(),
        code: values.code.trim().toUpperCase(),
        sampleType: values.sampleType.trim(),
        price: BigInt(Math.round(values.mrp)),
        isActive: values.isActive
      });
      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists."
          });
          return;
        }
        ue.error("Failed to add test. Please try again.");
        return;
      }
      const code = values.code.trim().toUpperCase();
      addDemoTestMaster({
        id: code,
        testName: values.name.trim(),
        testCode: code,
        mrp: values.mrp,
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        sampleType: values.sampleType.trim(),
        isActive: values.isActive
      });
      ue.success(`Test "${values.name}" added successfully`);
      reset();
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to add test: ${msg}`);
    }
  };
  const handleClose = () => {
    if (addTest.isPending) return;
    reset();
    onClose();
  };
  if (!open) return null;
  const hasGeneralError = addTest.isError;
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
            "aria-labelledby": "add-test-title",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 bg-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "add-test-title",
                      className: "text-lg font-bold text-gray-900 tracking-tight",
                      children: "Add New Test"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Fill in the details below to add a new test to the master list." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClose,
                    disabled: addTest.isPending,
                    className: "ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50",
                    "aria-label": "Close",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  id: "add-test-form",
                  onSubmit: handleSubmit(onSubmit),
                  className: "flex-1 overflow-y-auto px-6 py-5 space-y-5",
                  style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
                  children: [
                    hasGeneralError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-red-500 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-red-700 font-medium", children: "Failed to add test. Please check your inputs and try again." })
                    ] }),
                    showLossWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800 font-medium", children: [
                        "Warning: This test will generate negative profit. (MRP ₹",
                        watchedMrp,
                        " − Lab Cost ₹",
                        watchedLabCost ?? 0,
                        " − Commission ₹",
                        Math.round(commissionAmt),
                        " = ₹",
                        Math.round(profitPerTest),
                        ")"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-name",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Test Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-name",
                          placeholder: "e.g. Complete Blood Count",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.name ? "border-red-400" : "border-gray-200"}`,
                          ...register("name", { required: "Test name is required" })
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.name.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-code",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Test Code ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-code",
                          placeholder: "e.g. CBC",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 uppercase ${errors.code ? "border-red-400" : "border-gray-200"}`,
                          ...register("code", {
                            required: "Test code is required",
                            pattern: {
                              value: /^[A-Za-z0-9_-]+$/,
                              message: "Only letters, numbers, hyphens and underscores allowed"
                            }
                          })
                        }
                      ),
                      errors.code && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.code.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-sampleType",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "Sample Type ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-sampleType",
                          placeholder: "e.g. Blood, Urine, Serum",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.sampleType ? "border-red-400" : "border-gray-200"}`,
                          ...register("sampleType", {
                            required: "Sample type is required"
                          })
                        }
                      ),
                      errors.sampleType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.sampleType.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "add-mrp",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: [
                            "MRP (₹) ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-mrp",
                          type: "number",
                          min: 0,
                          step: 1,
                          placeholder: "e.g. 500",
                          className: `w-full rounded-xl border-2 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors.mrp ? "border-red-400" : "border-gray-200"}`,
                          ...register("mrp", {
                            required: "MRP is required",
                            min: { value: 0, message: "MRP must be 0 or more" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.mrp && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.mrp.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "add-labCost",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Lab Cost (₹)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-labCost",
                          type: "number",
                          min: 0,
                          step: 1,
                          placeholder: "e.g. 40",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("labCost", {
                            min: { value: 0, message: "Lab cost must be 0 or more" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.labCost && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.labCost.message
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "add-doctorCommission",
                          className: "block text-xs font-semibold text-gray-700 uppercase tracking-wide",
                          children: "Doctor Commission (%)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "add-doctorCommission",
                          type: "number",
                          min: 0,
                          max: 100,
                          step: 0.01,
                          placeholder: "e.g. 50",
                          className: "w-full rounded-xl border-2 border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
                          ...register("doctorCommission", {
                            min: { value: 0, message: "Commission must be 0 or more" },
                            max: { value: 100, message: "Commission cannot exceed 100%" },
                            valueAsNumber: true
                          })
                        }
                      ),
                      errors.doctorCommission && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-500 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3" }),
                        errors.doctorCommission.message
                      ] })
                    ] }),
                    (watchedMrp ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-gray-50 border border-gray-200 px-4 py-2.5 text-xs flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-gray-500", children: [
                        "Commission: ₹",
                        Math.round(commissionAmt)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "|" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: profitPerTest >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
                          children: [
                            "Profit per Test: ₹",
                            Math.round(profitPerTest)
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border-2 border-gray-200 px-4 py-3 bg-gray-50", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-gray-700 uppercase tracking-wide", children: "Status" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: isActive ? "Test is Active" : "Test is Inactive" })
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
                    disabled: addTest.isPending,
                    className: "flex-1 h-10 rounded-xl border-2 border-gray-300 bg-transparent text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                    "data-ocid": "add-test.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "submit",
                    form: "add-test-form",
                    disabled: addTest.isPending,
                    className: "flex-[2] flex items-center justify-center gap-2 h-10 rounded-xl font-bold text-sm text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed disabled:hover:scale-100",
                    style: {
                      background: addTest.isPending ? void 0 : "linear-gradient(to right, #0D47A1, #26C6DA)",
                      backgroundColor: addTest.isPending ? "#9ca3af" : void 0
                    },
                    "data-ocid": "add-test.submit_button",
                    children: [
                      addTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
                      "Add Test"
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
function DisableTestConfirmDialog({
  open,
  test,
  onClose
}) {
  const disableTest = useDisableTest();
  const handleConfirm = async () => {
    if (!test) return;
    try {
      await disableTest.mutateAsync(test.code);
      ue.success(`Test "${test.name}" has been disabled`);
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to disable test: ${msg}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AlertDialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) onClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Disable Test" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
            "Are you sure you want to disable",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: test == null ? void 0 : test.name }),
            "?",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "The test will be marked as",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Inactive" }),
            " and will not be permanently deleted. You can re-enable it later by editing the test."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { disabled: disableTest.isPending, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AlertDialogAction,
            {
              onClick: handleConfirm,
              disabled: disableTest.isPending,
              className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
              children: [
                disableTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                "Disable Test"
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function EditTestModal({
  open,
  test,
  onClose
}) {
  const updateTest = useUpdateTest();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      sampleType: "",
      mrp: 0,
      labCost: 0,
      doctorCommission: 0,
      isActive: true
    }
  });
  const isActive = watch("isActive");
  const watchedMrp = watch("mrp");
  const watchedLabCost = watch("labCost");
  const watchedDoctorCommission = watch("doctorCommission");
  const commissionAmt = (watchedMrp ?? 0) * ((watchedDoctorCommission ?? 0) / 100);
  const profitPerTest = computeProfitPerTest(
    watchedMrp ?? 0,
    watchedLabCost ?? 0,
    watchedDoctorCommission ?? 0
  );
  const showLossWarning = profitPerTest < 0 && (watchedMrp ?? 0) > 0;
  reactExports.useEffect(() => {
    if (test) {
      reset({
        name: test.name,
        code: test.code,
        sampleType: test.sampleType,
        mrp: Number(test.price),
        labCost: test.labCost ?? 0,
        doctorCommission: test.doctorCommission ?? 0,
        isActive: test.isActive
      });
    }
  }, [test, reset]);
  const onSubmit = async (values) => {
    if (!test) return;
    try {
      const result = await updateTest.mutateAsync({
        code: test.code,
        input: {
          name: values.name.trim(),
          code: values.code.trim().toUpperCase(),
          sampleType: values.sampleType.trim(),
          price: BigInt(Math.round(values.mrp)),
          isActive: values.isActive
        }
      });
      if (result.__kind__ === "err") {
        if (result.err === TestError.duplicateCode) {
          setError("code", {
            type: "manual",
            message: "Test code already exists."
          });
          return;
        }
        ue.error("Failed to update test. Please try again.");
        return;
      }
      updateDemoTestMaster(test.code, {
        labCost: values.labCost ?? 0,
        doctorCommissionPct: values.doctorCommission ?? 0,
        mrp: values.mrp
      });
      ue.success(`Test "${values.name}" updated successfully`);
      onClose();
    } catch (err) {
      const msg = (err == null ? void 0 : err.message) ?? String(err);
      ue.error(`Failed to update test: ${msg}`);
    }
  };
  const handleClose = () => {
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Dialog,
    {
      open,
      onOpenChange: (o) => {
        if (!o) handleClose();
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        DialogContent,
        {
          className: "sm:max-w-md p-0 gap-0 flex flex-col overflow-hidden",
          style: { maxHeight: "90vh" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "flex-shrink-0 px-6 pt-6 pb-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Test" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Update the details for this test. You may also change the Test Code." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex-1 overflow-y-auto px-6 py-5 space-y-4",
                style: { overflowY: "auto", WebkitOverflowScrolling: "touch" },
                children: [
                  showLossWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-amber-600 mt-0.5 shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-amber-800 font-medium", children: [
                      "Warning: This test will generate negative profit. (MRP ₹",
                      watchedMrp,
                      " − Lab Cost ₹",
                      watchedLabCost ?? 0,
                      " − Commission ₹",
                      Math.round(commissionAmt),
                      " = ₹",
                      Math.round(profitPerTest),
                      ")"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      id: "edit-test-form",
                      onSubmit: handleSubmit(onSubmit),
                      className: "space-y-4",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-name", children: [
                            "Test Name ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-name",
                              placeholder: "e.g. Complete Blood Count",
                              ...register("name", { required: "Test name is required" })
                            }
                          ),
                          errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.name.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-code", children: [
                            "Test Code ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-code",
                              placeholder: "e.g. CBC",
                              className: "uppercase",
                              ...register("code", {
                                required: "Test code is required",
                                pattern: {
                                  value: /^[A-Za-z0-9_-]+$/,
                                  message: "Only letters, numbers, hyphens and underscores allowed"
                                }
                              })
                            }
                          ),
                          errors.code && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.code.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-sampleType", children: [
                            "Sample Type ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-sampleType",
                              placeholder: "e.g. Blood, Urine, Serum",
                              ...register("sampleType", {
                                required: "Sample type is required"
                              })
                            }
                          ),
                          errors.sampleType && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.sampleType.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-mrp", children: [
                            "MRP (₹) ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-mrp",
                              type: "number",
                              min: 0,
                              step: 1,
                              placeholder: "e.g. 500",
                              ...register("mrp", {
                                required: "MRP is required",
                                min: { value: 0, message: "MRP must be 0 or more" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.mrp && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.mrp.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-labCost", children: "Lab Cost (₹)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-labCost",
                              type: "number",
                              min: 0,
                              step: 1,
                              placeholder: "e.g. 40",
                              ...register("labCost", {
                                min: { value: 0, message: "Lab cost must be 0 or more" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.labCost && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.labCost.message })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-doctorCommission", children: "Doctor Commission (%)" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "edit-doctorCommission",
                              type: "number",
                              min: 0,
                              max: 100,
                              step: 0.01,
                              placeholder: "e.g. 50",
                              ...register("doctorCommission", {
                                min: { value: 0, message: "Commission must be 0 or more" },
                                max: { value: 100, message: "Commission cannot exceed 100%" },
                                valueAsNumber: true
                              })
                            }
                          ),
                          errors.doctorCommission && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: errors.doctorCommission.message })
                        ] }),
                        (watchedMrp ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/50 border border-border px-4 py-2.5 text-xs flex items-center gap-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                            "Commission: ₹",
                            Math.round(commissionAmt)
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "|" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "span",
                            {
                              className: profitPerTest >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold",
                              children: [
                                "Profit per Test: ₹",
                                Math.round(profitPerTest)
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-lg border border-border p-3", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: "Status" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isActive ? "Test is Active" : "Test is Inactive" })
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
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "flex-shrink-0 px-6 py-4 border-t border-border bg-background", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  onClick: handleClose,
                  disabled: updateTest.isPending,
                  "data-ocid": "edit-test.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  form: "edit-test-form",
                  disabled: updateTest.isPending,
                  "data-ocid": "edit-test.submit_button",
                  children: [
                    updateTest.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
                    "Save Changes"
                  ]
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
const PAGE_SIZE = 20;
function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return { rows: [], parseErrors: 0 };
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase().replace(/['"]/g, ""));
  const colIndex = (names) => {
    for (const name of names) {
      const idx = headers.indexOf(name);
      if (idx !== -1) return idx;
    }
    return -1;
  };
  const nameIdx = colIndex(["testname", "test name", "name"]);
  const codeIdx = colIndex(["testcode", "test code", "code"]);
  const sampleIdx = colIndex(["sampletype", "sample type", "sample"]);
  const mrpIdx = colIndex(["mrp", "price"]);
  const rows = [];
  let parseErrors = 0;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const cells = line.split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
    const testName = nameIdx !== -1 ? (cells[nameIdx] ?? "").trim() : "";
    const testCode = codeIdx !== -1 ? (cells[codeIdx] ?? "").trim().toUpperCase() : "";
    const sampleType = sampleIdx !== -1 ? (cells[sampleIdx] ?? "").trim() : "";
    const mrpRaw = mrpIdx !== -1 ? (cells[mrpIdx] ?? "").trim() : "";
    const mrp = Number.parseFloat(mrpRaw);
    if (!testName || !testCode || !sampleType || !mrpRaw || Number.isNaN(mrp) || mrp < 0) {
      parseErrors++;
      continue;
    }
    rows.push({ testName, testCode, sampleType, mrp });
  }
  return { rows, parseErrors };
}
function ProfitDot({ color }) {
  const cls = color === "green" ? "bg-green-500" : color === "yellow" ? "bg-yellow-500" : "bg-red-500";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-block w-2 h-2 rounded-full flex-shrink-0 ${cls}`,
      title: color === "green" ? "Profitable (>30%)" : color === "yellow" ? "Low profit (10–30%)" : "Loss / <10%"
    }
  );
}
function TestStatusBadge({ isActive }) {
  if (isActive) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
      "Active"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-gray-400" }),
    "Inactive"
  ] });
}
function TestManagementPage({ role }) {
  const isSuperAdmin = role === "superAdmin";
  const { data: tests = [], isLoading, isError } = useGetAllTests();
  const bulkAddMutation = useBulkAddTests();
  const setTestStatusMutation = useSetTestStatus();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [currentPage, setCurrentPage] = reactExports.useState(1);
  const [isUploading, setIsUploading] = reactExports.useState(false);
  const [togglingIds, setTogglingIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [addModalOpen, setAddModalOpen] = reactExports.useState(false);
  const [editModalOpen, setEditModalOpen] = reactExports.useState(false);
  const [selectedTest, setSelectedTest] = reactExports.useState(null);
  const [disableDialogOpen, setDisableDialogOpen] = reactExports.useState(false);
  const [testToDisable, setTestToDisable] = reactExports.useState(null);
  const csvInputRef = reactExports.useRef(null);
  const filteredTests = reactExports.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return tests;
    return tests.filter(
      (t) => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)
    );
  }, [tests, searchQuery]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const totalPages = Math.max(1, Math.ceil(filteredTests.length / PAGE_SIZE));
  const paginatedTests = filteredTests.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const handleEditClick = (test) => {
    setSelectedTest(test);
    setEditModalOpen(true);
  };
  const handleDisableClick = (test) => {
    setTestToDisable(test);
    setDisableDialogOpen(true);
  };
  const handleToggleStatus = async (test, newIsActive) => {
    const testId = test.id;
    setTogglingIds((prev) => new Set(prev).add(testId));
    try {
      const result = await setTestStatusMutation.mutateAsync({
        testId,
        isActive: newIsActive
      });
      if (result.__kind__ === "err") {
        ue.error("Failed to update test status.");
      } else {
        ue.success(
          `Test "${test.name}" marked as ${newIsActive ? "Active" : "Inactive"}.`
        );
      }
    } catch (err) {
      ue.error(
        `Failed to update test status: ${(err == null ? void 0 : err.message) ?? String(err)}`
      );
    } finally {
      setTogglingIds((prev) => {
        const next = new Set(prev);
        next.delete(testId);
        return next;
      });
    }
  };
  const formatMRP = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };
  const handleCSVUploadClick = () => {
    if (csvInputRef.current) {
      csvInputRef.current.value = "";
      csvInputRef.current.click();
    }
  };
  const handleCSVFileChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      var _a2;
      const content = (_a2 = event.target) == null ? void 0 : _a2.result;
      if (!content) {
        ue.error("Could not read the CSV file.");
        return;
      }
      const { rows: parsedRows, parseErrors } = parseCSV(content);
      const existingCodes = new Set(tests.map((t) => t.code.toUpperCase()));
      let skippedDuplicates = 0;
      const validInputs = [];
      for (const row of parsedRows) {
        if (existingCodes.has(row.testCode.toUpperCase())) {
          skippedDuplicates++;
          continue;
        }
        validInputs.push({
          name: row.testName,
          code: row.testCode,
          sampleType: row.sampleType,
          price: BigInt(Math.round(row.mrp)),
          isActive: true
        });
      }
      const totalSkipped = parseErrors + skippedDuplicates;
      if (validInputs.length === 0) {
        ue.warning("0 tests added successfully.");
        if (totalSkipped > 0) {
          ue.error(`${totalSkipped} rows skipped due to errors.`);
        }
        return;
      }
      setIsUploading(true);
      try {
        const added = await bulkAddMutation.mutateAsync(validInputs);
        ue.success(
          `${added.length} test${added.length !== 1 ? "s" : ""} added successfully.`
        );
        if (totalSkipped > 0) {
          ue.warning(
            `${totalSkipped} row${totalSkipped !== 1 ? "s" : ""} skipped (duplicates or invalid data).`
          );
        }
      } catch (err) {
        ue.error(`Upload failed: ${(err == null ? void 0 : err.message) ?? String(err)}`);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeroHeader,
      {
        title: "Test Management",
        description: "Manage diagnostic tests, pricing, and availability",
        actionLabel: "Add Test",
        onAction: () => setAddModalOpen(true)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TestTube, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold text-foreground", children: "Test Management" })
      ] }),
      isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleCSVUploadClick,
            disabled: isUploading,
            children: [
              isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-1.5 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mr-1.5 h-4 w-4" }),
              "Upload CSV"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", onClick: () => setAddModalOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-1.5 h-4 w-4" }),
          "Add Test"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: csvInputRef,
        type: "file",
        accept: ".csv,text/csv",
        className: "hidden",
        onChange: handleCSVFileChange
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          placeholder: "Search by name or code…",
          value: searchQuery,
          onChange: handleSearchChange,
          className: "pl-9"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Test Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Code" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Sample Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "MRP" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Lab Cost" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Commission %" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold", children: "Status" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-center", children: "Active" }),
        isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "font-semibold text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: isLoading ? Array.from({ length: 5 }, (_, i) => `skel-row-${i}`).map(
        (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-10 mx-auto" }) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 ml-auto" }) })
        ] }, key)
      ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: isSuperAdmin ? 9 : 5,
          className: "text-center text-destructive py-8",
          children: "Failed to load tests. Please try again."
        }
      ) }) : paginatedTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TableCell,
        {
          colSpan: isSuperAdmin ? 9 : 5,
          className: "text-center text-muted-foreground py-8",
          children: searchQuery ? "No tests match your search." : "No tests found. Add your first test."
        }
      ) }) : paginatedTests.map((test) => {
        const isToggling = togglingIds.has(test.id);
        const labCost = test.labCost ?? 0;
        const commissionPct = test.doctorCommission ?? 0;
        const mrpNum = Number(test.price);
        const profit = computeProfitPerTest(
          mrpNum,
          labCost,
          commissionPct
        );
        const profitColor = getProfitStatusColor(mrpNum, profit);
        const isLoss = profit < 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: `hover:bg-muted/30 transition-colors ${isLoss ? "bg-red-50" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: isSuperAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ProfitDot, { color: profitColor }),
                test.name
              ] }) : test.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "font-mono text-xs", children: test.code }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: test.sampleType }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: formatMRP(test.price) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                "₹",
                labCost
              ] }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-muted-foreground", children: [
                commissionPct,
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TestStatusBadge, { isActive: test.isActive }) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: isToggling ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: test.isActive,
                  onCheckedChange: (checked) => handleToggleStatus(test, checked),
                  "aria-label": `Toggle ${test.name} ${test.isActive ? "inactive" : "active"}`,
                  className: "data-[state=checked]:bg-emerald-500"
                }
              ) }) }),
              isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8",
                    onClick: () => handleEditClick(test),
                    title: "Edit test",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3.5 w-3.5" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "ghost",
                    size: "icon",
                    className: "h-8 w-8 text-destructive hover:text-destructive",
                    onClick: () => handleDisableClick(test),
                    title: "Disable test",
                    disabled: !test.isActive,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3.5 w-3.5" })
                  }
                )
              ] }) })
            ]
          },
          test.id
        );
      }) })
    ] }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Showing ",
        (currentPage - 1) * PAGE_SIZE + 1,
        "–",
        Math.min(currentPage * PAGE_SIZE, filteredTests.length),
        " of",
        " ",
        filteredTests.length
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
            disabled: currentPage === 1,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2", children: [
          currentPage,
          " / ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "icon",
            className: "h-8 w-8",
            onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
            disabled: currentPage === totalPages,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddTestModal,
      {
        open: addModalOpen,
        onClose: () => setAddModalOpen(false)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditTestModal,
      {
        open: editModalOpen,
        test: selectedTest,
        onClose: () => {
          setEditModalOpen(false);
          setSelectedTest(null);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DisableTestConfirmDialog,
      {
        open: disableDialogOpen,
        test: testToDisable,
        onClose: () => {
          setDisableDialogOpen(false);
          setTestToDisable(null);
        }
      }
    )
  ] });
}
export {
  TestManagementPage as default
};
