import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Clock,
  FlaskConical,
  MapPin,
  Minus,
  Navigation,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { TestOutput } from "../../backend";
import { useGetAllTests } from "../../hooks/useQueries";
import { useCreateHomeCollectionRequest } from "../../hooks/useQueries";

interface HomeCollectionPageProps {
  onNavigate?: (page: string) => void;
}

const TIME_SLOTS = [
  "7:00 AM - 8:00 AM",
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

export default function HomeCollectionPage({
  onNavigate,
}: HomeCollectionPageProps) {
  const { data: tests = [], isLoading } = useGetAllTests();
  const createRequest = useCreateHomeCollectionRequest();

  const [address, setAddress] = useState("");
  const [selectedTests, setSelectedTests] = useState<TestOutput[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [search, setSearch] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [_step, _setStep] = useState<"address" | "tests" | "slot" | "confirm">(
    "address",
  );

  const activeTests = tests.filter((t) => t.isActive);
  const filteredTests = activeTests.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.code.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleTest = (test: TestOutput) => {
    setSelectedTests((prev) =>
      prev.find((t) => t.id === test.id)
        ? prev.filter((t) => t.id !== test.id)
        : [...prev, test],
    );
  };

  const isSelected = (test: TestOutput) =>
    selectedTests.some((t) => t.id === test.id);

  const totalPrice = selectedTests.reduce((sum, t) => sum + Number(t.price), 0);

  const handleGPS = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude);
        setLng(pos.coords.longitude);
        setAddress(
          `GPS: ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`,
        );
        setGpsLoading(false);
      },
      () => {
        toast.error("Could not get GPS location");
        setGpsLoading(false);
      },
    );
  };

  const handleSubmit = async () => {
    if (!address.trim() || selectedTests.length === 0 || !selectedSlot) {
      toast.error("Please fill in all required fields");
      return;
    }
    try {
      await createRequest.mutateAsync({
        address,
        latitude: lat ?? undefined,
        longitude: lng ?? undefined,
        tests: selectedTests.map((t) => ({
          id: t.id,
          name: t.name,
          testCode: t.code,
          price: Number(t.price),
        })),
        slot: selectedSlot,
      });
      toast.success("Home collection request submitted!");
      onNavigate?.("my-home-collections");
    } catch (err: any) {
      toast.error(`Failed to submit: ${err?.message ?? err}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">
            Home Collection
          </h1>
        </div>
        <p className="text-xs text-muted-foreground">
          Book a phlebotomist to collect samples at home
        </p>
      </div>

      <div className="flex-1 overflow-auto px-4 py-4 space-y-5">
        {/* Address */}
        <div className="space-y-2">
          <label
            htmlFor="home-collection-address"
            className="text-sm font-medium text-foreground"
          >
            Collection Address *
          </label>
          <Textarea
            id="home-collection-address"
            placeholder="Enter your full address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
          />
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleGPS}
            disabled={gpsLoading}
          >
            <Navigation className="h-3.5 w-3.5" />
            {gpsLoading ? "Getting location..." : "Use GPS Location"}
          </Button>
        </div>

        {/* Test Selection */}
        <div className="space-y-2">
          <label
            htmlFor="home-collection-tests"
            className="text-sm font-medium text-foreground"
          >
            Select Tests *
          </label>
          <div className="relative">
            <Input
              placeholder="Search tests..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-3"
            />
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {isLoading ? (
              <p className="text-xs text-muted-foreground py-2">
                Loading tests...
              </p>
            ) : filteredTests.length === 0 ? (
              <p className="text-xs text-muted-foreground py-2">
                No tests found
              </p>
            ) : (
              filteredTests.map((test) => {
                const selected = isSelected(test);
                return (
                  <div
                    key={test.id}
                    onClick={() => toggleTest(test)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") && toggleTest(test)
                    }
                    tabIndex={0}
                    // biome-ignore lint/a11y/useSemanticElements: complex children require div
                    role="option"
                    aria-selected={selected}
                    className={[
                      "flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-all",
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40",
                    ].join(" ")}
                  >
                    <div>
                      <p className="text-xs font-medium text-foreground">
                        {test.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {test.sampleType}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold">
                        ₹{Number(test.price).toLocaleString("en-IN")}
                      </span>
                      <div
                        className={[
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          selected
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted",
                        ].join(" ")}
                      >
                        {selected ? (
                          <Minus className="h-3 w-3" />
                        ) : (
                          <Plus className="h-3 w-3" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {selectedTests.length > 0 && (
            <p className="text-xs text-primary font-medium">
              {selectedTests.length} test{selectedTests.length > 1 ? "s" : ""}{" "}
              selected — ₹{totalPrice.toLocaleString("en-IN")}
            </p>
          )}
        </div>

        {/* Time Slot */}
        <div className="space-y-2">
          <label
            htmlFor="home-collection-slot"
            className="text-sm font-medium text-foreground flex items-center gap-1.5"
          >
            <Clock className="h-4 w-4" />
            Preferred Time Slot *
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                type="button"
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={[
                  "text-xs p-2 rounded-lg border text-left transition-all",
                  selectedSlot === slot
                    ? "border-primary bg-primary/5 text-primary font-medium"
                    : "border-border text-muted-foreground hover:border-primary/40",
                ].join(" ")}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="px-4 py-3 border-t border-border bg-background">
        <Button
          className="w-full gap-2"
          onClick={handleSubmit}
          disabled={
            !address.trim() ||
            selectedTests.length === 0 ||
            !selectedSlot ||
            createRequest.isPending
          }
        >
          {createRequest.isPending ? (
            "Submitting..."
          ) : (
            <>
              Submit Request
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
