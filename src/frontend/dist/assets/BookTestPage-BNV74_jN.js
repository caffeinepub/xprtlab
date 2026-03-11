import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { B as Button } from "./button-D9D3G5gq.js";
import { I as Input } from "./input-CfURtLSo.js";
import { d as createLucideIcon, e as useGetAllTests } from "./ProfileSetupModal-DNPvAtBR.js";
import { S as Search } from "./search-CTGOQP-G.js";
import { M as Minus } from "./minus-D8Z2AAlw.js";
import { P as Plus } from "./plus-DjGyZCN7.js";
import { A as ArrowRight } from "./arrow-right-BWCIa61-.js";
import "./index-C0_AjoBL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode);
function BookTestPage({ onNavigate }) {
  const { data: tests = [], isLoading } = useGetAllTests();
  const [search, setSearch] = reactExports.useState("");
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const filteredTests = tests.filter(
    (t) => t.isActive && (t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase()))
  );
  const toggleTest = (test) => {
    setSelectedTests(
      (prev) => prev.find((t) => t.id === test.id) ? prev.filter((t) => t.id !== test.id) : [...prev, test]
    );
  };
  const isSelected = (test) => selectedTests.some((t) => t.id === test.id);
  const totalPrice = selectedTests.reduce((sum, t) => sum + Number(t.price), 0);
  const handleProceed = () => {
    if (selectedTests.length === 0) return;
    onNavigate == null ? void 0 : onNavigate("slot-selection", { selectedTests });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground mb-3", children: "Book a Test" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            className: "pl-9",
            placeholder: "Search tests...",
            value: search,
            onChange: (e) => setSearch(e.target.value)
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-auto px-4 py-3 space-y-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : filteredTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-10 w-10 text-muted-foreground mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "No tests found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Try a different search term." })
    ] }) : filteredTests.map((test) => {
      const selected = isSelected(test);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => toggleTest(test),
          onKeyDown: (e) => (e.key === "Enter" || e.key === " ") && toggleTest(test),
          tabIndex: 0,
          role: "option",
          "aria-selected": selected,
          className: [
            "flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all duration-200",
            selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 mr-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: test.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground", children: test.code }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: test.sampleType })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
                "₹",
                Number(test.price).toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: [
                    "w-7 h-7 rounded-full flex items-center justify-center transition-colors",
                    selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  ].join(" "),
                  children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                }
              )
            ] })
          ]
        },
        test.id
      );
    }) }),
    selectedTests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
            selectedTests.length,
            " test",
            selectedTests.length > 1 ? "s" : "",
            " ",
            "selected"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-foreground", children: [
          "₹",
          totalPrice.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "w-full gap-2", onClick: handleProceed, children: [
        "Proceed to Slot Selection",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] })
  ] });
}
export {
  BookTestPage as default
};
