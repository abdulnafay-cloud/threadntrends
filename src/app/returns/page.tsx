import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage eyebrow="Customer care" title="Exchange & returns." intro="We want the fit to feel right. These terms keep the process clear and fair." sections={[
  { title: "7-day request window", body: "Request a return or exchange within 7 calendar days of delivery. Include your order reference and the reason for the request." },
  { title: "Item condition", body: "Items must be unworn, unwashed, unaltered and returned with original tags and packaging. Used or damaged items cannot be accepted." },
  { title: "Non-returnable items", body: "For hygiene and final-sale reasons, jewellery, opened accessories and items marked final sale are not returnable unless defective." },
  { title: "Shipping and refunds", body: "Return shipping is normally paid by the customer. If we sent an incorrect or defective item, we cover reasonable return delivery. Approved refunds are processed after inspection." },
]}/>; }
