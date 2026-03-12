import { r as reactExports, j as jsxRuntimeExports } from "./index-lVn_hGWr.js";
import { u as ue } from "./index-CMkDufv6.js";
import { G as GradientButton } from "./GradientButton-2eGpzbAP.js";
import { e as useGetAllTests, f as useCreateBooking } from "./ProfileSetupModal-BYStubB_.js";
import { C as Clock } from "./clock-fiwY_hPt.js";
import { C as CircleCheck } from "./circle-check-BzUR3sMR.js";
const TIME_SLOTS = [
  "7:00 AM – 8:00 AM",
  "8:00 AM – 9:00 AM",
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
  "4:00 PM – 5:00 PM"
];
function SlotSelectionPage({
  selectedTests,
  onNavigate
}) {
  const { data: allTests = [] } = useGetAllTests();
  const createBooking = useCreateBooking();
  const [selectedSlot, setSelectedSlot] = reactExports.useState(null);
  const chosenTests = allTests.filter((t) => selectedTests.includes(t.id));
  const totalPrice = chosenTests.reduce((sum, t) => sum + Number(t.price), 0);
  const handleBook = async () => {
    if (!selectedSlot) return;
    const id = `booking-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    try {
      await createBooking.mutateAsync({
        id,
        selectedTests: chosenTests,
        slot: selectedSlot
      });
      ue.success("Booking confirmed!");
      onNavigate("my-bookings");
    } catch (err) {
      ue.error((err == null ? void 0 : err.message) || "Failed to create booking");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("book-test"),
          className: "text-muted-foreground hover:text-foreground",
          children: "←"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-foreground", children: "Select Time Slot" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 border border-primary/20 rounded-xl p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-primary mb-1", children: [
        chosenTests.length,
        " test(s) selected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: chosenTests.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full",
          children: t.name
        },
        t.id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-bold text-primary mt-2", children: [
        "Total: ₹",
        totalPrice
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
        " Available Slots (Today)"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: TIME_SLOTS.map((slot) => {
        const isSelected = selectedSlot === slot;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setSelectedSlot(slot),
            className: `p-3 rounded-xl border-2 text-sm font-medium transition-all ${isSelected ? "border-primary bg-primary text-white" : "border-border bg-card text-foreground hover:border-primary/50"}`,
            children: [
              isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 inline mr-1" }),
              slot
            ]
          },
          slot
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GradientButton,
      {
        onClick: handleBook,
        loading: createBooking.isPending,
        disabled: !selectedSlot,
        className: "w-full",
        size: "lg",
        children: "Confirm Booking"
      }
    )
  ] });
}
export {
  SlotSelectionPage as default
};
