export interface HubItem {
  city: string;
  role: string;
  title: string;
  tag: string;
  address: string;
  focus: string;
}

export interface SiteConfig {
  name: string;
  legalName: string;
  email: string;
  phone: string;
  phoneRaw: string;
  whatsapp: {
    number: string;
    displayNumber: string;
    defaultMessage: string;
  };
  operatingHours: {
    display: string;
    note: string;
  };
  social: {
    linkedin: string;
    instagram: string;
    x: string;
  };
  gstin: string;
  hubs: HubItem[];
}

export const siteConfig: SiteConfig = {
  name: "Ethixweb",
  legalName: "Ethixweb Technologies Pvt. Ltd.",
  email: "hello@ethixweb.com",
  phone: "+91 98765 43210",
  phoneRaw: "+919876543210",
  whatsapp: {
    number: "919876543210",
    displayNumber: "+91 98765 43210",
    defaultMessage:
      "Hi Ethixweb, I would like to discuss a project scope for my business (Web / AI / SEO / Ads / CRM).",
  },
  operatingHours: {
    display: "09:30 AM – 08:00 PM, Mon–Sat",
    note: "Sunday: emergency monitoring only.",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/ethixweb/home/",
    instagram: "https://www.instagram.com/ethix.web/",
    x: "https://x.com/ETHIXWEB",
  },
  // Set real GSTIN here or via NEXT_PUBLIC_GSTIN. If empty string, GSTIN is not rendered on the card.
  gstin: process.env.NEXT_PUBLIC_GSTIN || "",
  hubs: [
    {
      city: "Bengaluru",
      role: "Primary technical hub",
      title: "Bengaluru · Primary technical hub",
      tag: "Core engineering",
      address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India",
      focus: "AI research, full-stack architecture and sprint delivery",
    },
    {
      city: "Delhi NCR",
      role: "Operations satellite",
      title: "Delhi NCR · Operations satellite",
      tag: "Client strategy",
      address: "Cyber City, DLF Phase 2, Gurugram, Haryana 122002, India",
      focus: "Enterprise growth, performance marketing and B2B invoicing",
    },
    {
      city: "Mumbai",
      role: "Commercial presence",
      title: "Mumbai · Commercial presence",
      tag: "B2B relations",
      address: "Bandra Kurla Complex (BKC), Mumbai, Maharashtra 400051, India",
      focus: "D2C brand partnerships and retail integrations",
    },
  ],
};

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = customMessage || siteConfig.whatsapp.defaultMessage;
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(msg)}`;
}
