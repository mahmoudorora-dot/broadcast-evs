import { Monitor, Tv, Airplay, Presentation, Camera, Cable, Radio, Video, AudioLines, Cpu } from "lucide-react";

const skills = [
  { label: "EVS XT / VIA Replay Systems", icon: Monitor },
  { label: "vMix", icon: Tv },
  { label: "Resolume Arena", icon: Airplay },
  { label: "Teleprompter Systems", icon: Presentation },
  { label: "OB Camera Setup", icon: Camera },
  { label: "Signal Routing & Cabling", icon: Cable },
  { label: "Live Broadcast Production", icon: Radio },
  { label: "Wirecast Live Streaming", icon: Video },
  { label: "Video & Audio Signal Management", icon: AudioLines },
  { label: "PowerPoint Broadcast", icon: Cpu },
];

const SkillsTicker = () => {
  return (
    <div className="relative w-full overflow-hidden bg-card/80 border-y border-border py-4 backdrop-blur-sm">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...skills, ...skills].map((skill, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 mx-6 flex-shrink-0"
          >
            <skill.icon size={16} className="text-primary" />
            <span className="text-xs font-display font-semibold tracking-wide text-silver uppercase">
              {skill.label}
            </span>
            <span className="text-muted-foreground/40 ml-4">◆</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsTicker;
