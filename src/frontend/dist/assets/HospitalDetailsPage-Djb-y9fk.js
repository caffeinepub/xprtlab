import { r as reactExports, j as jsxRuntimeExports, P as Principal, R as React } from "./index-77iKE7z5.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-D0ku9KB2.js";
import { B as Badge } from "./badge-Ria_zxvE.js";
import { B as Button } from "./button-DrsLRlpx.js";
import { I as Input } from "./input-BUljrT4O.js";
import { u as ue } from "./index-DnGMpjq-.js";
import { d as createLucideIcon, y as useActor, ao as useHospitalById, ap as useGetPhlebotomistsByHospital, aq as useAssignPhlebotomistToHospital, n as useRemovePhlebotomistFromHospital, L as LoaderCircle, X } from "./ProfileSetupModal-BB_monh5.js";
import { B as Building2 } from "./building-2-63YCEJlt.js";
import { M as MapPin } from "./map-pin-BZNwjx3t.js";
import { P as Phone } from "./user-EeFrjssy.js";
import { U as Users } from "./users-rtMoCxo9.js";
import { P as Plus } from "./plus-B03gg-WC.js";
import { S as Search } from "./search-Bq-Fk22W.js";
import { U as UserCheck } from "./user-check-gYk-k0DZ.js";
import "./index-fFFU_iCT.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
function HospitalDetailsPage({
  hospitalId,
  role,
  onNavigate
}) {
  const isSuperAdmin = role === "superAdmin";
  const { actor } = useActor();
  const { data: hospital, isLoading: hospitalLoading } = useHospitalById(hospitalId);
  const {
    data: assignedPrincipals = [],
    isLoading: assignedLoading,
    refetch: refetchAssigned
  } = useGetPhlebotomistsByHospital(hospitalId);
  const assignMutation = useAssignPhlebotomistToHospital();
  const removeMutation = useRemovePhlebotomistFromHospital();
  const [allPhlebotomists, setAllPhlebotomists] = reactExports.useState([]);
  const [phlebotomistsLoading, setPhlebotomistsLoading] = reactExports.useState(false);
  const [showAssignPanel, setShowAssignPanel] = reactExports.useState(false);
  const [assignSearch, setAssignSearch] = reactExports.useState("");
  const [selectedToAssign, setSelectedToAssign] = reactExports.useState([]);
  const [removeTarget, setRemoveTarget] = reactExports.useState(null);
  const [removalReason, setRemovalReason] = reactExports.useState("");
  const assignedSet = reactExports.useMemo(
    () => new Set(assignedPrincipals.map((p) => p.toString())),
    [assignedPrincipals]
  );
  const loadAllPhlebotomists = async () => {
    var _a;
    if (!actor) return;
    setPhlebotomistsLoading(true);
    try {
      const result = await ((_a = actor.getAllPhlebotomists) == null ? void 0 : _a.call(actor));
      if (result && Array.isArray(result)) {
        setAllPhlebotomists(result);
      }
    } catch {
    } finally {
      setPhlebotomistsLoading(false);
    }
  };
  const handleOpenAssignPanel = () => {
    setShowAssignPanel(true);
    setSelectedToAssign([]);
    setAssignSearch("");
    loadAllPhlebotomists();
  };
  const filteredPhlebotomists = reactExports.useMemo(() => {
    const term = assignSearch.toLowerCase();
    return allPhlebotomists.filter((p) => {
      const name = p.profile.name.toLowerCase();
      const area = (p.profile.area ?? "").toLowerCase();
      return !assignedSet.has(p.principal) && (name.includes(term) || area.includes(term) || p.principal.toLowerCase().includes(term));
    });
  }, [allPhlebotomists, assignSearch, assignedSet]);
  const handleSaveAssignments = async () => {
    if (selectedToAssign.length === 0) {
      ue.error("Please select at least one phlebotomist.");
      return;
    }
    let successCount = 0;
    for (const principalStr of selectedToAssign) {
      try {
        await assignMutation.mutateAsync({
          hospitalId,
          phlebotomist: Principal.fromText(principalStr)
        });
        successCount++;
      } catch (err) {
        ue.error(`Failed to assign ${principalStr}: ${(err == null ? void 0 : err.message) ?? err}`);
      }
    }
    if (successCount > 0) {
      ue.success(`${successCount} phlebotomist(s) assigned successfully.`);
      refetchAssigned();
    }
    setShowAssignPanel(false);
    setSelectedToAssign([]);
  };
  const handleRemoveConfirm = async () => {
    if (!removeTarget) return;
    try {
      await removeMutation.mutateAsync({
        hospitalId,
        phlebotomist: Principal.fromText(removeTarget),
        removalReason: removalReason.trim() || "Removed by admin"
      });
      ue.success("Phlebotomist removed from hospital.");
      refetchAssigned();
    } catch (err) {
      ue.error(`Failed to remove: ${(err == null ? void 0 : err.message) ?? err}`);
    } finally {
      setRemoveTarget(null);
      setRemovalReason("");
    }
  };
  if (hospitalLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-full py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }) });
  }
  if (!hospital) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full py-20 text-center px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-12 w-12 text-muted-foreground/40 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Hospital not found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "mt-4",
          onClick: () => onNavigate == null ? void 0 : onNavigate("hospital-management"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-2" }),
            " Back to Hospitals"
          ]
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-3 border-b border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "h-8 w-8",
          onClick: () => onNavigate == null ? void 0 : onNavigate("hospital-management"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-base font-bold text-foreground truncate", children: hospital.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: hospital.isActive ? "default" : "secondary",
            className: hospital.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200",
            children: hospital.isActive ? "Active" : "Inactive"
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-auto px-4 py-4 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-border shadow-sm p-4 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }),
          " Hospital Details"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
          hospital.city && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              " ",
              hospital.city
            ] })
          ] }),
          hospital.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Area / Zone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: hospital.area })
          ] }),
          hospital.contactNumber && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-3 w-3" }),
              " ",
              hospital.contactNumber
            ] })
          ] }),
          hospital.address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: hospital.address })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-xl border border-border shadow-sm p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-sm font-bold text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-primary" }),
            " Assigned Phlebotomists",
            assignedPrincipals.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
              "(",
              assignedPrincipals.length,
              ")"
            ] })
          ] }),
          isSuperAdmin && !showAssignPanel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              onClick: handleOpenAssignPanel,
              className: "gap-1.5 text-xs h-7",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
                " Assign"
              ]
            }
          )
        ] }),
        showAssignPanel && isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-lg p-3 space-y-3 bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "pl-8 h-8 text-xs",
                placeholder: "Search phlebotomists...",
                value: assignSearch,
                onChange: (e) => setAssignSearch(e.target.value)
              }
            )
          ] }),
          phlebotomistsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) }) : filteredPhlebotomists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-3", children: allPhlebotomists.length === 0 ? "No phlebotomists available." : "All phlebotomists are already assigned or no matches found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: filteredPhlebotomists.map((p) => {
            const isSelected = selectedToAssign.includes(p.principal);
            const sameArea = hospital.area && p.profile.area && hospital.area.toLowerCase() === (p.profile.area ?? "").toLowerCase();
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setSelectedToAssign(
                  (prev) => isSelected ? prev.filter((x) => x !== p.principal) : [...prev, p.principal]
                ),
                className: [
                  "w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between gap-2",
                  isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: p.profile.name }),
                    p.profile.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Zone: ",
                      p.profile.area
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-shrink-0", children: [
                    sameArea && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
                      " Same area"
                    ] }),
                    isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4 text-primary" })
                  ] })
                ]
              },
              p.principal
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: handleSaveAssignments,
                disabled: selectedToAssign.length === 0 || assignMutation.isPending,
                className: "flex-1 text-xs h-8",
                children: [
                  assignMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3 w-3 mr-1.5 animate-spin" }),
                  "Assign (",
                  selectedToAssign.length,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => {
                  setShowAssignPanel(false);
                  setSelectedToAssign([]);
                },
                className: "text-xs h-8",
                children: "Cancel"
              }
            )
          ] })
        ] }),
        assignedLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-10 bg-muted rounded-lg animate-pulse"
          },
          i
        )) }) : assignedPrincipals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-4", children: "No phlebotomists assigned to this hospital yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: assignedPrincipals.map((principal) => {
          const principalStr = principal.toString();
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            AssignedPhlebotomistRow,
            {
              principalStr,
              hospitalArea: hospital.area,
              isSuperAdmin,
              onRemove: () => setRemoveTarget(principalStr)
            },
            principalStr
          );
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!removeTarget,
        onOpenChange: (open) => {
          if (!open) {
            setRemoveTarget(null);
            setRemovalReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Phlebotomist" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              "Are you sure you want to remove this phlebotomist from",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: hospital.name }),
              "? The assignment history will be preserved."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: "Reason for removal (optional)",
              value: removalReason,
              onChange: (e) => setRemovalReason(e.target.value),
              className: "text-sm"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleRemoveConfirm,
                className: "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
                disabled: removeMutation.isPending,
                children: removeMutation.isPending ? "Removing..." : "Remove"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function AssignedPhlebotomistRow({
  principalStr,
  hospitalArea,
  isSuperAdmin,
  onRemove
}) {
  const { actor } = useActor();
  const [profile, setProfile] = reactExports.useState(null);
  React.useEffect(() => {
    if (!actor) return;
    actor.getUserProfile(Principal.fromText(principalStr)).then((p) => {
      if (p) setProfile(p);
    }).catch(() => {
    });
  }, [actor, principalStr]);
  const sameArea = hospitalArea && (profile == null ? void 0 : profile.area) && hospitalArea.toLowerCase() === (profile.area ?? "").toLowerCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 p-2.5 bg-muted/30 rounded-lg border border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground truncate", children: (profile == null ? void 0 : profile.name) ?? `${principalStr.slice(0, 16)}...` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        (profile == null ? void 0 : profile.area) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Zone: ",
          profile.area
        ] }),
        sameArea && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-amber-600 flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" }),
          " Same area"
        ] })
      ] })
    ] }),
    isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "ghost",
        size: "icon",
        className: "h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0",
        onClick: onRemove,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
      }
    )
  ] });
}
export {
  HospitalDetailsPage as default
};
