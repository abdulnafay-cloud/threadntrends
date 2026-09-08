import InfoPage from "@/components/InfoPage";
export default function Page() { return <InfoPage eyebrow="Legal / Updated September 2026" title="Privacy policy." intro="This policy explains the information Thread n Trends uses to operate the store." sections={[
  { title: "Information we collect", body: "We collect account details, checkout and delivery information, support messages, newsletter preferences and limited technical analytics when configured." },
  { title: "How we use it", body: "We use data to fulfil orders, provide support, secure accounts, improve the store and send marketing only where you have subscribed." },
  { title: "Storage and sharing", body: "Store records are held in our database. We share only what is needed with service providers such as delivery, email, analytics and hosting partners. We do not sell personal data." },
  { title: "Your choices", body: "You may ask to access, correct or delete eligible personal information, or unsubscribe from marketing. Contact us using the address on our Contact page." },
]}/>; }
