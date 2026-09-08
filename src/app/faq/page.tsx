import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage eyebrow="Help centre" title="Questions, answered." intro="The useful details before, during and after your order." sections={[
  { title: "How do I place an order?", body: "Choose a size and colour, add the piece to your bag, then complete the Cash on Delivery checkout. You will receive an order reference to track it." },
  { title: "Can I change or cancel an order?", body: "Contact us as soon as possible with your order reference. We can usually help before an order has been dispatched." },
  { title: "How do sizes fit?", body: "Every product lists available sizes. Use our Size Guide for measurements; if you are between sizes, choose the larger size for a relaxed fit." },
  { title: "What payment do you accept?", body: "The current checkout supports Cash on Delivery across serviceable locations in Pakistan." },
  { title: "How do returns work?", body: "Eligible unworn items can be requested for exchange or return within 7 days of delivery. See the Exchange & Returns page for the full conditions." },
]}/>; }
