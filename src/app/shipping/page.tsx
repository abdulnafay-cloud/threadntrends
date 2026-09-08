import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage eyebrow="Delivery" title="Shipping information." intro="Simple delivery guidance for orders across Pakistan." sections={[
  { title: "Processing", body: "Orders are normally prepared within 1–2 business days. During a new drop or public holiday, processing can take a little longer." },
  { title: "Estimated delivery", body: "Major cities: approximately 2–4 business days after dispatch. Other serviceable areas: approximately 3–7 business days." },
  { title: "Delivery charges", body: "Standard delivery is currently free. Any future exception will be shown clearly in your order summary before checkout." },
  { title: "Delivery checks", body: "Keep your phone available; the courier may call before delivery. Verify the parcel label before accepting it and contact us promptly about visible damage." },
]}/>; }
