import { SampleStatus, DeliveryMethod } from '../types/models';

export function getSampleStatusColor(status: SampleStatus): string {
  switch (status) {
    case 'SAMPLE_COLLECTED':
      return 'bg-gray-100 text-gray-700 border-gray-200';
    case 'DISPATCHED':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'RECEIVED_AT_LAB':
      return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'PROCESSING':
      return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'REPORT_READY':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'REPORT_DELIVERED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

export function getStatusDescription(status: SampleStatus): string {
  switch (status) {
    case 'SAMPLE_COLLECTED':
      return 'Sample has been collected from the patient';
    case 'DISPATCHED':
      return 'Sample dispatched to the laboratory';
    case 'RECEIVED_AT_LAB':
      return 'Sample received at the laboratory';
    case 'PROCESSING':
      return 'Sample is being processed in the lab';
    case 'REPORT_READY':
      return 'Report is ready for delivery';
    case 'REPORT_DELIVERED':
      return 'Report has been delivered to the patient';
    default:
      return 'Status unknown';
  }
}

export function getDeliveryMethodLabel(method: DeliveryMethod): string {
  switch (method) {
    case 'WHATSAPP':
      return 'WhatsApp';
    case 'PHYSICAL':
      return 'Physical Delivery';
    case 'EMAIL':
      return 'Email';
    case 'HOSPITAL_PICKUP':
      return 'Hospital Pickup';
    default:
      return method;
  }
}
