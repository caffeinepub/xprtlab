import { a as useInternetIdentity, b as useQueryClient, r as reactExports, P as Principal, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-CzbPOvyV.js";
import { B as Badge } from "./badge-Bh2MLGly.js";
import { B as Button } from "./button-CiKsIGuP.js";
import { I as Input } from "./input-CIfQ8nBJ.js";
import { u as ue } from "./index-CMkDufv6.js";
import { d as createLucideIcon, u as useGetCallerUserProfile, k as useGetAssignedHospitals, l as useGetHospitalsByPhlebotomist, m as useHospitals, n as useRemovePhlebotomistFromHospital, X } from "./ProfileSetupModal-BYStubB_.js";
import { U as User, S as Shield, P as Phone } from "./user-D8SUbWXo.js";
import { B as Building2 } from "./building-2-CzOXe9xM.js";
import { C as ChevronRight } from "./chevron-right-B18SUE64.js";
import "./index-BVenjb96.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
];
const Info = createLucideIcon("info", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
const APP_VERSION = "v1.0.0";
const ADMIN_PHONE = "+919876543210";
function ProfilePage({
  onNavigate: _onNavigate,
  viewingPrincipal,
  viewingRole,
  currentUserRole
}) {
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const [showLogoutDialog, setShowLogoutDialog] = reactExports.useState(false);
  const [removeHospitalTarget, setRemoveHospitalTarget] = reactExports.useState(null);
  const [removalReason, setRemovalReason] = reactExports.useState("");
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const {
    data: assignedHospitalsLegacy = [],
    isLoading: hospitalsLegacyLoading
  } = useGetAssignedHospitals();
  const isAuthenticated = !!identity;
  const principalId = identity == null ? void 0 : identity.getPrincipal().toString();
  const effectiveRole = viewingRole ?? (userProfile == null ? void 0 : userProfile.appRole) ?? "";
  const isPhlebotomistView = effectiveRole === "phlebotomist";
  const isSuperAdminViewer = currentUserRole === "superAdmin";
  const phlebotomistPrincipal = viewingPrincipal ? Principal.fromText(viewingPrincipal) : principalId ? Principal.fromText(principalId) : null;
  const { data: assignedHospitalIds = [], isLoading: hospitalIdsLoading } = useGetHospitalsByPhlebotomist(
    isPhlebotomistView ? phlebotomistPrincipal : null
  );
  const { data: allHospitals = [], isLoading: allHospitalsLoading } = useHospitals();
  const removeMutation = useRemovePhlebotomistFromHospital();
  const assignedHospitals = allHospitals.filter(
    (h) => assignedHospitalIds.includes(h.id)
  );
  const hospitalsLoading = isPhlebotomistView ? hospitalIdsLoading || allHospitalsLoading : hospitalsLegacyLoading;
  const handleLogoutConfirm = async () => {
    await clear();
    queryClient.clear();
    setShowLogoutDialog(false);
  };
  const handleRemoveHospital = async () => {
    if (!removeHospitalTarget || !phlebotomistPrincipal) return;
    try {
      await removeMutation.mutateAsync({
        hospitalId: removeHospitalTarget,
        phlebotomist: phlebotomistPrincipal,
        removalReason: removalReason.trim() || "Removed by admin"
      });
      ue.success("Hospital removed from phlebotomist profile.");
    } catch (err) {
      ue.error(`Failed to remove: ${(err == null ? void 0 : err.message) ?? err}`);
    } finally {
      setRemoveHospitalTarget(null);
      setRemovalReason("");
    }
  };
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "phlebotomist":
        return "bg-blue-100 text-blue-700";
      case "labAdmin":
        return "bg-purple-100 text-purple-700";
      case "superAdmin":
        return "bg-red-100 text-red-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4 max-w-lg mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-7 w-7 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: profileLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-32 bg-muted rounded animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 bg-muted rounded animate-pulse" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base text-foreground truncate", children: (userProfile == null ? void 0 : userProfile.name) || "User" }),
        (userProfile == null ? void 0 : userProfile.appRole) && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-xs font-semibold px-2 py-0.5 rounded-full ${getRoleBadgeColor(String(userProfile.appRole))}`,
            children: String(userProfile.appRole).charAt(0).toUpperCase() + String(userProfile.appRole).slice(1)
          }
        ),
        (userProfile == null ? void 0 : userProfile.phone) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: userProfile.phone }),
        (userProfile == null ? void 0 : userProfile.area) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Zone: ",
          userProfile.area
        ] })
      ] }) })
    ] }),
    principalId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: "Principal ID" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono break-all", children: principalId })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold text-foreground", children: "Assigned Hospitals" })
      ] }) }),
      hospitalsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-muted rounded-xl animate-pulse" }, i)) }) : isPhlebotomistView ? assignedHospitals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hospitals assigned yet. Contact admin." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: assignedHospitals.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-start justify-between gap-2 p-3 bg-muted/40 rounded-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: h.name }),
                h.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.city }),
                h.area && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Zone: ",
                  h.area
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: h.isActive ? "default" : "secondary",
                    className: `text-xs mt-0.5 ${h.isActive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-gray-100 text-gray-500 border-gray-200"}`,
                    children: h.isActive ? "Active" : "Inactive"
                  }
                )
              ] })
            ] }),
            isSuperAdminViewer && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "icon",
                className: "h-7 w-7 text-destructive hover:bg-destructive/10 flex-shrink-0",
                onClick: () => setRemoveHospitalTarget(h.id),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ]
        },
        h.id
      )) }) : (
        // Legacy assigned hospitals (non-phlebotomist roles)
        assignedHospitalsLegacy.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No hospitals assigned yet. Contact admin." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: assignedHospitalsLegacy.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-3 p-3 bg-muted/40 rounded-xl",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4 text-primary/60 mt-0.5 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: h.name }),
                h.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.address })
              ] })
            ]
          },
          h.id
        )) })
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-bold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
        " Support"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `tel:${ADMIN_PHONE}`,
          className: "flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-green-600" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-green-700", children: "Call Admin" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-green-600", children: ADMIN_PHONE })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-green-600" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border border-border shadow-sm p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "App Version" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full", children: APP_VERSION })
    ] }) }),
    isAuthenticated && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setShowLogoutDialog(true),
        className: "w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-destructive/30 text-destructive hover:bg-destructive/5 transition-colors font-semibold text-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          "Logout"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: showLogoutDialog, onOpenChange: setShowLogoutDialog, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Confirm Logout" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Are you sure you want to log out? You will need to sign in again to access your account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AlertDialogAction,
          {
            onClick: handleLogoutConfirm,
            className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            children: "Logout"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!removeHospitalTarget,
        onOpenChange: (open) => {
          if (!open) {
            setRemoveHospitalTarget(null);
            setRemovalReason("");
          }
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Remove Hospital Assignment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "This will remove the phlebotomist from this hospital. Please provide a reason." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-1 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                onClick: handleRemoveHospital,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                children: "Remove"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
export {
  ProfilePage as default
};
