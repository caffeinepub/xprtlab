import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Edit2,
  Filter,
  FlaskConical,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import DeliveryMethodSelectionDialog from "../../components/shared/DeliveryMethodSelectionDialog";
import SampleActionControls from "../../components/shared/SampleActionControls";
import SampleWorkflowTimeline from "../../components/shared/SampleWorkflowTimeline";
import WhatsAppShareConfirmDialog from "../../components/shared/WhatsAppShareConfirmDialog";
import { useInternetIdentity } from "../../hooks/useInternetIdentity";
import {
  useConfirmWhatsAppDelivery,
  useGetAllHospitalSamples,
  useMarkAsDispatched,
  useMarkSampleDelivered,
  useUpdateHospitalSampleBilling,
} from "../../hooks/useQueries";
import type { DeliveryMethod, SampleStatus } from "../../types/models";
import { getSampleStatusColor } from "../../utils/deliveryHelpers";

const DELIVERY_FILTER_OPTIONS: Array<{ value: string; label: string }> = [
  { value: "all", label: "All" },
  { value: "WHATSAPP", label: "WhatsApp" },
  { value: "PHYSICAL", label: "Physical" },
  { value: "EMAIL", label: "Email" },
  { value: "HOSPITAL_PICKUP", label: "Hospital Pickup" },
  { value: "pending", label: "Pending Delivery" },
];

interface BillingEditState {
  sampleId: string;
  discountAmount: number;
  amountReceived: number;
  paymentMode: string;
  totalMrp: number;
  maxAllowedDiscount: number;
}

export default function AdminHospitalSamplesPage() {
  const { identity } = useInternetIdentity();
  const userId = identity?.getPrincipal().toString() ?? "";

  const { data: samples = [], isLoading } = useGetAllHospitalSamples();
  const updateBilling = useUpdateHospitalSampleBilling();
  const markDispatched = useMarkAsDispatched();
  const markDelivered = useMarkSampleDelivered();
  const confirmWhatsApp = useConfirmWhatsAppDelivery();

  const [search, setSearch] = useState("");
  const [deliveryFilter, setDeliveryFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [billingEdit, setBillingEdit] = useState<BillingEditState | null>(null);
  const [_deliveryDialogSampleId, _setDeliveryDialogSampleId] = useState<
    string | null
  >(null);
  const [_whatsAppDialogSampleId, _setWhatsAppDialogSampleId] = useState<
    string | null
  >(null);

  const filteredSamples = samples.filter((s: any) => {
    const matchesSearch =
      !search ||
      s.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search);

    const matchesDelivery =
      deliveryFilter === "all" ||
      (deliveryFilter === "pending" && !s.deliveryMethod) ||
      s.deliveryMethod === deliveryFilter;

    return matchesSearch && matchesDelivery;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleMarkDispatched = async (sampleId: string) => {
    try {
      await markDispatched.mutateAsync(sampleId);
      toast.success("Sample marked as dispatched");
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  const handleMarkDelivered = async (
    sampleId: string,
    method: DeliveryMethod,
    deliveredByRole: string,
    deliveredById: string,
  ) => {
    try {
      await markDelivered.mutateAsync({
        sampleId,
        deliveryMethod: method,
        deliveredByRole,
        deliveredById,
        action: "deliver",
      });
      toast.success("Report marked as delivered");
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  const handleConfirmWhatsApp = async (sampleId: string) => {
    try {
      await confirmWhatsApp.mutateAsync(sampleId);
      toast.success("WhatsApp delivery confirmed");
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  const handleBillingSave = async () => {
    if (!billingEdit) return;
    try {
      await updateBilling.mutateAsync({
        sampleId: billingEdit.sampleId,
        newDiscountAmount: billingEdit.discountAmount,
        newAmountReceived: billingEdit.amountReceived,
        paymentMode: billingEdit.paymentMode,
      });
      toast.success("Billing updated");
      setBillingEdit(null);
    } catch (err: any) {
      toast.error(`Failed: ${err?.message ?? err}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-background">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">
            Hospital Samples
          </h1>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-9"
            placeholder="Search by patient name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Delivery filter chips */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto border-b border-border bg-background">
        {DELIVERY_FILTER_OPTIONS.map((opt) => (
          <button
            type="button"
            key={opt.value}
            onClick={() => setDeliveryFilter(opt.value)}
            className={[
              "shrink-0 text-xs px-3 py-1 rounded-full border transition-colors",
              deliveryFilter === opt.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-primary/40",
            ].join(" ")}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Sample list */}
      <div className="flex-1 overflow-auto px-4 py-3 space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : filteredSamples.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FlaskConical className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">
              No samples found
            </p>
          </div>
        ) : (
          filteredSamples.map((sample: any) => {
            const sampleId = sample.id ?? sample.patientName;
            const isExpanded = expandedId === sampleId;
            const status: SampleStatus = sample.status ?? "SAMPLE_COLLECTED";

            return (
              <div
                key={sampleId}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between p-3 text-left"
                  onClick={() => toggleExpand(sampleId)}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {sample.patientName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {sample.phone} · ₹
                      {Number(sample.finalAmount).toLocaleString("en-IN")} ·{" "}
                      {sample.paymentMode}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getSampleStatusColor(status)}`}
                    >
                      {status.replace(/_/g, " ")}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-border px-3 py-3 space-y-3">
                    {/* Billing summary */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">MRP</p>
                        <p className="text-sm font-semibold">
                          ₹{Number(sample.totalMrp).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">
                          Discount
                        </p>
                        <p className="text-sm font-semibold">
                          ₹
                          {Number(sample.discountAmount).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-2 text-center">
                        <p className="text-xs text-muted-foreground">Final</p>
                        <p className="text-sm font-semibold">
                          ₹{Number(sample.finalAmount).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Tests */}
                    {sample.tests?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">
                          Tests
                        </p>
                        <div className="space-y-1">
                          {sample.tests.map((t: any, i: number) => (
                            <div
                              key={t.testName ?? i}
                              className="flex justify-between text-xs"
                            >
                              <span>{t.testName}</span>
                              <span className="text-muted-foreground">
                                ₹{Number(t.price).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Edit billing button */}
                    {!sample.billingLocked && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={() =>
                          setBillingEdit({
                            sampleId,
                            discountAmount: Number(sample.discountAmount),
                            amountReceived: Number(sample.amountReceived),
                            paymentMode: sample.paymentMode,
                            totalMrp: Number(sample.totalMrp),
                            maxAllowedDiscount: Number(
                              sample.maxAllowedDiscount,
                            ),
                          })
                        }
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        Edit Billing
                      </Button>
                    )}

                    {/* Action controls */}
                    <SampleActionControls
                      sampleId={sampleId}
                      status={status}
                      reportUrl={sample.reportUrl}
                      userRole="labAdmin"
                      userId={userId}
                      phlebotomistId={sample.phlebotomistId}
                      onMarkDispatched={handleMarkDispatched}
                      onMarkDelivered={handleMarkDelivered}
                      onConfirmWhatsApp={handleConfirmWhatsApp}
                    />

                    {/* Timeline */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">
                        Status Timeline
                      </p>
                      <SampleWorkflowTimeline currentStatus={status} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Billing Edit Dialog */}
      <Dialog
        open={!!billingEdit}
        onOpenChange={(o) => {
          if (!o) setBillingEdit(null);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Billing</DialogTitle>
            <DialogDescription>
              Update discount and payment details for this sample.
            </DialogDescription>
          </DialogHeader>
          {billingEdit && (
            <div className="space-y-3 py-2">
              <div className="space-y-1">
                <Label>Discount Amount (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  max={billingEdit.maxAllowedDiscount}
                  value={billingEdit.discountAmount}
                  onChange={(e) =>
                    setBillingEdit((prev) =>
                      prev
                        ? { ...prev, discountAmount: Number(e.target.value) }
                        : prev,
                    )
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Max allowed: ₹
                  {billingEdit.maxAllowedDiscount.toLocaleString("en-IN")}
                </p>
              </div>
              <div className="space-y-1">
                <Label>Amount Received (₹)</Label>
                <Input
                  type="number"
                  min={0}
                  value={billingEdit.amountReceived}
                  onChange={(e) =>
                    setBillingEdit((prev) =>
                      prev
                        ? { ...prev, amountReceived: Number(e.target.value) }
                        : prev,
                    )
                  }
                />
              </div>
              <div className="space-y-1">
                <Label>Payment Mode</Label>
                <select
                  className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background"
                  value={billingEdit.paymentMode}
                  onChange={(e) =>
                    setBillingEdit((prev) =>
                      prev ? { ...prev, paymentMode: e.target.value } : prev,
                    )
                  }
                >
                  <option value="CASH">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="CREDIT">Credit</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setBillingEdit(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleBillingSave}
              disabled={updateBilling.isPending}
            >
              {updateBilling.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
