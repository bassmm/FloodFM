export interface EmergencyContact {
  title: string;
  emergency?: string;
  phone?: string;
  website?: string;
}

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    title: "National Disaster Management Authority (NDMA)",
    emergency: "1700",
    website: "ndma.gov.pk",
  },
  {
    title: "Sindh Provincial DMA (PDMA)",
    emergency: "0300-2220202",
    website: "pdma.gos.pk",
  },
  {
    title: "Punjab Provincial DMA (PDMA)",
    emergency: "0300-9999999",
    website: "pdma.punjab.gov.pk",
  },
  {
    title: "Pakistan Meteorological Department",
    website: "pmd.gov.pk",
    phone: "051-9212000",
  },
];
