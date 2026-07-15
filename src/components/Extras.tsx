// "use client";
// import { useEffect, useRef, useState } from "react";
// import { Syne } from "next/font/google";
// import FloatingIcons from "./FloatingIcons";
// import { SparkleIcon, RocketIcon, BookIcon } from "./icons/Icons";

// const syne = Syne({ subsets: ["latin"], weight: ["700", "800"] });

// // Icons stored as component functions, not JSX literals, to avoid serialization issues
// const TrophyIcon = () => (
//   <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//     <circle cx="12" cy="8" r="6" />
//     <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
//   </svg>
// );

// const CarIcon = () => (
//   <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 2L2 7l10 5 10-5-10-5z" />
//     <path d="M2 17l10 5 10-5" />
//     <path d="M2 12l10 5 10-5" />
//   </svg>
// );

// const GuitarIcon = () => (
//   <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
//     <path d="M9 18V5l12-2v13" />
//     <circle cx="6" cy="18" r="3" />
//     <circle cx="18" cy="16" r="3" />
//   </svg>
// );

// type ExtraItem = {
//   Icon: () => JSX.Element;
//   accent: string;
//   accentBg: string;
//   title: string;
//   sub: string;
//   desc: string;
// };

// const extras: ExtraItem[] = [
//   {
//     Icon: TrophyIcon,
//     accent: "#FF6B35",
//     accentBg: "#FFF2ED",
//     title: "Best Social Project",
//     sub: "IISc Bengaluru · IEEE WIE Hackathon",
//     desc: "Won Best Social Project among 40+ teams at the IISc Bengaluru Social Hackathon League for Nutricate — an OCR-powered allergen detection app recognised for its impact on food safety and accessibility.",
//   },
//   {
//     Icon: CarIcon,
//     accent: "#4361EE",
//     accentBg: "#EEF1FF",
//     title: "Formula Student — Velocita Racing",
//     sub: "Aerodynamics Engineer · M.S. Ramaiah",
//     desc: "Designed and modelled aerodynamic components (diffusers, wings, air inlets) in 3D CAD, ran CFD simulations to analyse wind patterns, and fabricated the finalised parts for competition.",
//   },
//   {
//     Icon: GuitarIcon,
//     accent: "#7B2FBE",
//     accentBg: "#F3EAFF",
//     title: "Classical Guitar · ABRSM",
//     sub: "Associated Board of the Royal Schools of Music",
//     desc: "Completed ABRSM graded examinations in classical guitar. Music has been a constant outside of tech — the discipline of practising scales translates surprisingly well to debugging at 2am.",
//   },
// ];

// const bgIcons = [
//   { Icon: SparkleIcon, top: "10%", left: "5%",  size: 24, color: "#FF6B35", delay: 0.3, duration: 8 },
//   { Icon: RocketIcon,  top: "55%", left: "93%", size: 26, color: "#4361EE", delay: 1.1, duration: 7 },
//   { Icon: BookIcon,    top: "85%", left: "8%",  size: 22, color: "#7B2FBE", delay: 2,   duration: 9 },
// ];

// export default function Extras() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [revealed, setRevealed] = useState(false);
//   const [openIdx, setOpenIdx] = useState<number | null>(null);

//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((e) => {
//           if (e.isIntersecting) { setRevealed(true); obs.disconnect(); }
//         });
//       },
//       { threshold: 0.15 }
//     );
//     const el = sectionRef.current;
//     if (!el) return;
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative py-20 w-full overflow-hidden">
//       <FloatingIcons icons={bgIcons} />

//       <div className="relative z-10 max-w-4xl mx-auto px-7">
//         <div className={`animate-item fade-up ${revealed ? "visible" : ""} flex items-center gap-4 mb-12`}>
//           <span className="text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#FFF2ED] text-[#FF6B35]">
//             Outside the keyboard
//           </span>
//           <h2 className={`${syne.className} text-3xl font-bold text-[#0F0E0C]`}>
//             A bit more
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {extras.map((item, i) => {
//             const isOpen = openIdx === i;
//             return (
//               <button
//                 key={item.title}
//                 type="button"
//                 onClick={() => setOpenIdx(isOpen ? null : i)}
//                 className={`animate-item fade-up ${revealed ? "visible" : ""} text-left rounded-2xl border-2 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer`}
//                 style={{
//                   transitionDelay: `${i * 0.1}s`,
//                   borderColor: isOpen ? item.accent : "#E8E4DC",
//                   boxShadow: isOpen ? `0 0 0 3px ${item.accent}22` : undefined,
//                 }}
//                 aria-expanded={isOpen}
//               >
//                 <div className="p-5">
//                   <div
//                     className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
//                     style={{ background: item.accentBg, color: item.accent }}
//                   >
//                     <item.Icon />
//                   </div>
//                   <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: item.accent }}>
//                     {item.sub}
//                   </p>
//                   <h3 className={`${syne.className} text-base font-bold text-[#0F0E0C] leading-snug`}>
//                     {item.title}
//                   </h3>
//                 </div>

//                 <div
//                   className="grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
//                   style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
//                 >
//                   <div className="overflow-hidden">
//                     <p
//                       className="text-sm text-[#5A5650] leading-relaxed px-5 pb-5 pt-1 border-t"
//                       style={{ borderColor: item.accent + "33" }}
//                     >
//                       {item.desc}
//                     </p>
//                   </div>
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <style jsx>{`
//         .animate-item { opacity: 0; transition: opacity 0.6s ease, transform 0.6s ease; }
//         .fade-up { transform: translateY(24px); }
//         .animate-item.visible { opacity: 1; transform: translateY(0); }
//       `}</style>
//     </section>
//   );
// }