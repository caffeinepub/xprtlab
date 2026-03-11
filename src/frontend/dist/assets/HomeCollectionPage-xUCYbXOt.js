import { r as reactExports, j as jsxRuntimeExports } from "./index-D697BR3C.js";
import { B as Button } from "./button-D9D3G5gq.js";
import { I as Input } from "./input-CfURtLSo.js";
import { T as Textarea } from "./textarea-C-REpM5-.js";
import { u as ue } from "./index-C87A94J1.js";
import { e as useGetAllTests, i as useCreateHomeCollectionRequest } from "./ProfileSetupModal-DNPvAtBR.js";
import { M as MapPin } from "./map-pin-DEb5FcpZ.js";
import { N as Navigation } from "./navigation-dX9Jh2TN.js";
import { M as Minus } from "./minus-D8Z2AAlw.js";
import { P as Plus } from "./plus-DjGyZCN7.js";
import { C as Clock } from "./clock-BGIpFsM8.js";
import { A as ArrowRight } from "./arrow-right-BWCIa61-.js";
import "./index-C0_AjoBL.js";
const TIME_SLOTS = [
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];
function HomeCollectionPage({
  onNavigate
}) {
  const { data: tests = [], isLoading } = useGetAllTests();
  const createRequest = useCreateHomeCollectionRequest();
  const [address, setAddress] = reactExports.useState("");
  const [selectedTests, setSelectedTests] = reactExports.useState([]);
  const [selectedSlot, setSelectedSlot] = reactExports.useState("");
  const [search, setSearch] = reactExports.useState("");
  const [gpsLoading, setGpsLoading] = reactExports.useState(false);
  const [lat, setLat] = reactExports.useState(null);
  const [lng, setLng] = reactExports.useState(null);
  const [_step, _setStep] = reactExports.useState(
    "address"
  );
  const activeTests = tests.filter((t) => t.isActive);
  const filteredTests = activeTests.filter(
    (t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.code.toLowerCase().includes(search.toLowerCase())
  );
  const toggleTest = (test) => {
    setSelectedTests(
      (prev) => prev.find((t) => t.id === test.id) ? prev.filter((t) => t.id !== test.id) : [...prev, test]
    );
  };
  const isSelected = (test) => selectedTests.some((t) => t.id === test.id);
  const totalPrice = selectedTests.reduce((sum, t) => sum + Number(t.price), 0);
  const handleGPS = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setAddress(
          `GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`
        );
        setGpsLoading(false);
      },
      () => {
        ue.error("Could not get GPS location");
        setGpsLoading(false);
      }
    );
  };
  const handleSubmit = async () => {
    if (!address.trim() || selectedTests.length === 0 || !selectedSlot) {
      ue.error("Please fill in all required fields");
      return;
    }
    try {
      await createRequest.mutateAsync({
        address,
        latitude: lat ?? void 0,
        longitude: lng ?? void 0,
        tests: selectedTests.map((t) => ({
          id: t.id,
          name: t.name,
          testCode: t.code,
          price: Number(t.price)
        })),
        slot: selectedSlot
      });
      ue.success("Home collection request submitted!");
      onNavigate == null ? void 0 : onNavigate("my-home-collections");
    } catch (err) {
      ue.error(`Failed to submit: ${(err == null ? void 0 : err.message) ?? err}`);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-border bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground", children: "Home Collection" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Book a phlebotomist to collect samples at home" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-auto px-4 py-4 space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "home-collection-address",
            className: "text-sm font-medium text-foreground",
            children: "Collection Address *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "home-collection-address",
            placeholder: "Enter your full address...",
            value: address,
            onChange: (e) => setAddress(e.target.value),
            rows: 3
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            className: "gap-2",
            onClick: handleGPS,
            disabled: gpsLoading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { className: "h-3.5 w-3.5" }),
              gpsLoading ? "Getting location..." : "Use GPS Location"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: "home-collection-tests",
            className: "text-sm font-medium text-foreground",
            children: "Select Tests *"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Search tests...",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            className: "pl-3"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-48 overflow-y-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "Loading tests..." }) : filteredTests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-2", children: "No tests found" }) : filteredTests.map((test) => {
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
                "flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all",
                selected ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
              ].join(" "),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: test.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: test.sampleType })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold", children: [
                    "₹",
                    Number(test.price).toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: [
                        "w-6 h-6 rounded-full flex items-center justify-center",
                        selected ? "bg-primary text-primary-foreground" : "bg-muted"
                      ].join(" "),
                      children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" })
                    }
                  )
                ] })
              ]
            },
            test.id
          );
        }) }),
        selectedTests.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-primary font-medium", children: [
          selectedTests.length,
          " test",
          selectedTests.length > 1 ? "s" : "",
          " ",
          "selected — ₹",
          totalPrice.toLocaleString("en-IN")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "home-collection-slot",
            className: "text-sm font-medium text-foreground flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              "Preferred Time Slot *"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: TIME_SLOTS.map((slot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSelectedSlot(slot),
            className: [
              "text-xs p-2 rounded-lg border text-left transition-all",
              selectedSlot === slot ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-muted-foreground hover:border-primary/40"
            ].join(" "),
            children: slot
          },
          slot
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-t border-border bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        className: "w-full gap-2",
        onClick: handleSubmit,
        disabled: !address.trim() || selectedTests.length === 0 || !selectedSlot || createRequest.isPending,
        children: createRequest.isPending ? "Submitting..." : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Submit Request",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      }
    ) })
  ] });
}
export {
  HomeCollectionPage as default
};
