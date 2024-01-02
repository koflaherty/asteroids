import { Bonus } from './ui/bonuses/types.ts'

export const TOTAL_BONUSES = 7;

export const BONUSES: Record<string, Bonus> = {
  EMAIL: {
    title: 'EMAIL',
    icon: 'email',
    description: 'kevin@oflaherty.tech',
    url: 'mailto:kevin@oflaherty.tech',
  },
  RESUME: {
    title: 'RESUME',
    icon: 'link',
    description: 'flowcv.com/resume',
    url: 'https://flowcv.com/resume/t9rsmrd9s9',
  },
  GITHUB: {
    title: 'GITHUB',
    icon: 'link',
    description: 'github.com/koflaherty',
    url: 'https://github.com/koflaherty',
  },
  SPOOL: {
    title: "SIDE PROJECT",
    icon: 'link',
    description: 'usespool.com',
    url: 'https://usespool.com/',
  },
  AR_PERSONAS_VIDEO: {
    title: "PROJECT VIDEO",
    icon: 'link',
    description: "AR PERSONAS",
    url: "https://drive.google.com/file/d/12Caq2WqqrnzzfLjfOUx0rPon1QBKuwB8/view?usp=sharing",
  },
  TRANSITION_CHECK_VIDEO: {
    title: "PROJECT VIDEO",
    icon: 'link',
    description: "TRANSITION CHECK",
    url: "https://drive.google.com/file/d/1FTF3L1LKR2SwdlTCZjSZL6f48bPfztqw/view",
  },
  PROTOTYPE_VIDEO: {
    title: "PROJECT VIDEO",
    icon: 'link',
    description: "Splurge Control",
    url: "https://drive.google.com/file/d/1UoqMc1f9wbXYVlceLM3WC0vDJ04e-3Ky/view?usp=sharing",
  }
}

export const ASTEROID_CONTENT = {
  NAME: "KEVIN OFLAHERTY",
  EMAIL: "EMAIL",
  GITHUB: "GITHUB",
  RESUME: "RESUME",
  SPOOL: "SIDE PROJECT",
  AR: "AUGMENTED REALITY",
  AR_8TH_WALL: "8TH WALL",
  AR_THREE_JS: "THREE.JS",
  AR_UNITY: "UNITY",
  AR_UNITY_PERSONAS: "AR PERSONAS",
  AGILE: "AGILE",
  AGILE_SCRUM: "SCRUM",
  AGILE_KANBAN: "KANBAN",
  PROTOTYPING: "PROTOTYPING",
  PROTOTYPING_SAMPLE: "Splurge Control",
  WEB_APPS: "WEB APPS",
  WEB_APPS_TRANSITION_CHECK: "TRANSITION CHECK",
}