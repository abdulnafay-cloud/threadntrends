export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#f2f0ea_0%,#f8f6f0_48%,#eeebe2_100%)]" />
      <div className="ambient-glow ambient-glow-lime absolute -right-[12vw] -top-[18vw] h-[52vw] w-[52vw] min-h-[430px] min-w-[430px] rounded-full" />
      <div className="ambient-glow ambient-glow-coral absolute -bottom-[20vw] -left-[16vw] h-[48vw] w-[48vw] min-h-[390px] min-w-[390px] rounded-full" />
      <div className="absolute inset-0 opacity-[0.32] bg-[linear-gradient(rgba(17,17,15,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,15,0.055)_1px,transparent_1px)] bg-[72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
      <div className="absolute bottom-0 left-[7vw] top-0 w-px bg-[#11110f]/[0.055]" />
      <div className="absolute bottom-0 right-[7vw] top-0 w-px bg-[#11110f]/[0.055]" />
      <div className="ambient-grain absolute inset-0 opacity-[0.055]" />
    </div>
  );
}
