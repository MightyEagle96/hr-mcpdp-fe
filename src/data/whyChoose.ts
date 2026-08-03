import { Award, BadgeCheck, BookOpen, Laptop } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface IWhyChoose {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const whyChoose: IWhyChoose[] = [
  {
    icon: BookOpen,
    title: "Accredited Learning",
    description:
      "Access professionally curated courses approved by HRORBN to support your Mandatory Continuing Professional Development.",
  },

  {
    icon: Award,
    title: "Earn CPD Points",
    description:
      "Complete approved learning activities and accumulate CPD points required for continuous professional development.",
  },

  {
    icon: Laptop,
    title: "Learn Anytime",
    description:
      "Study at your own pace from your laptop, tablet or mobile phone wherever you are.",
  },

  {
    icon: BadgeCheck,
    title: "Verifiable Certificates",
    description:
      "Receive secure digital certificates that can be verified online after successfully completing your courses.",
  },
];
