import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useState } from "react";
import type { DeliveryMethod } from "../../types/models";

interface DeliveryMethodSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (method: DeliveryMethod) => void;
  isDemoMode?: boolean;
}

const DELIVERY_OPTIONS: Array<{
  value: DeliveryMethod;
  label: string;
  description: string;
}> = [
  {
    value: "WHATSAPP",
    label: "WhatsApp",
    description: "Send report via WhatsApp message",
  },
  {
    value: "PHYSICAL",
    label: "Physical Delivery",
    description: "Hand-deliver the printed report",
  },
  { value: "EMAIL", label: "Email", description: "Send report via email" },
  {
    value: "HOSPITAL_PICKUP",
    label: "Hospital Pickup",
    description: "Patient collects from hospital",
  },
];

export default function DeliveryMethodSelectionDialog({
  open,
  onOpenChange,
  onConfirm,
  isDemoMode = false,
}: DeliveryMethodSelectionDialogProps) {
  const [selected, setSelected] = useState<DeliveryMethod>("WHATSAPP");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Select Delivery Method</DialogTitle>
          <DialogDescription>
            Choose how the report will be delivered to the patient.
            {isDemoMode && (
              <span className="block mt-1 text-amber-600 text-xs font-medium">
                Demo mode — no actual delivery will occur.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <RadioGroup
          value={selected}
          onValueChange={(v) => setSelected(v as DeliveryMethod)}
          className="gap-3 py-2"
        >
          {DELIVERY_OPTIONS.map((opt) => (
            <div key={opt.value} className="flex items-start gap-3">
              <RadioGroupItem
                value={opt.value}
                id={`delivery-${opt.value}`}
                className="mt-0.5"
              />
              <Label
                htmlFor={`delivery-${opt.value}`}
                className="cursor-pointer"
              >
                <span className="font-medium text-sm">{opt.label}</span>
                <span className="block text-xs text-muted-foreground">
                  {opt.description}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(selected)}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
