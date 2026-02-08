import { LandingHeader } from "./LandingHeader";
import { LandingHero } from "./LandingHero";

export const LandingPage = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-slate-100 via-[#e8f2ff] to-[#d5e7fb] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] h-[620px] w-[1220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-[140px]" />
        <div className="absolute bottom-[-140px] left-[-120px] h-[320px] w-[420px] rounded-full bg-[#9ec7ff]/35 blur-3xl" />
        <div className="absolute bottom-[-180px] right-[-80px] h-[360px] w-[420px] rounded-full bg-[#8cb9ff]/35 blur-3xl" />
      </div>
      <LandingHeader />
      <LandingHero />
    </div>
  );
};
