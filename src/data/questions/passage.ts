import type { QuestionSet } from "./types";

// PTA: 24 factor items (P×8, R×8, F×8). 5-point unipolar agree-disagree, plus
// 4 stance forced-pick items (resource/weight/gift/mystery). Items verbatim from
// 04-passage-of-time-assessment.md §8 and the PTA build sim. All factor items are
// engagement-positive (Past-Positive, Present-eudaimonic, Future). The negative
// halves (Past-Negative, Present-Fatalistic, Future-Negative) are excluded by the
// binding affirming scope limit and are NOT measured.
export const passage: QuestionSet = {
  assessmentKey: "passage",
  title: "The Passage of Time Assessment",
  shortName: "Passage",
  duration: "~6 min",
  summary:
    "Which temporal zones you engage with. Past, Present, Future, each scored independently. And your stance toward time itself passing.",
  constructs: [
    { key: "past", label: "Past-Positive", role: "factor" },
    { key: "present", label: "Present-Eudaimonic", role: "factor" },
    { key: "future", label: "Future", role: "factor" },
    { key: "stance", label: "Temporal Stance", role: "stance" },
  ],
  questions: [
    // Factor 1: Past-Positive
    uni("P1.1", "past", "I feel a real connection to where I come from."),
    uni("P1.2", "past", "Memories of meaningful moments from my past bring me warmth."),
    uni("P1.3", "past", "The traditions and rituals I grew up with still carry meaning for me."),
    uni("P1.4", "past", "I feel gratitude when I think about the people and places that shaped me."),
    uni("P1.5", "past", "Looking back at how I became who I am, I see a thread worth honoring."),
    uni("P1.6", "past", "I enjoy revisiting memories from earlier in my life."),
    uni("P1.7", "past", "The stories, music, or art from my past still feel like part of who I am."),
    uni("P1.8", "past", "My roots are a real and living part of my identity."),
    // Factor 2: Present-eudaimonic
    uni("PR2.1", "present", "I feel genuinely engaged with whatever I'm doing right now."),
    uni("PR2.2", "present", "The present moment feels rich and full to me."),
    uni("PR2.3", "present", "I find meaning in ordinary, everyday experiences."),
    uni("PR2.4", "present", "I'm able to be fully present with the people I'm with."),
    uni("PR2.5", "present", "When I'm doing something, I tend to lose myself in it."),
    uni("PR2.6", "present", "I notice and appreciate small things as they happen."),
    uni("PR2.7", "present", "I feel alive in the moment, not just waiting for what's next."),
    uni("PR2.8", "present", "Being fully here, now, comes naturally to me."),
    // Factor 3: Future
    uni("F3.1", "future", "I feel pulled toward the years ahead of me."),
    uni("F3.2", "future", "Having goals to work toward is important to how I live."),
    uni("F3.3", "future", "Imagining who I could become feels vivid and motivating."),
    uni("F3.4", "future", "When I make choices, I think about where they'll lead."),
    uni("F3.5", "future", "Hopes and dreams for the future shape how I live day to day."),
    uni("F3.6", "future", "The sense that good things may lie ahead excites me."),
    uni("F3.7", "future", "A good deal of my energy goes into what's coming."),
    uni("F3.8", "future", "The future feels alive and full of possibility for me."),
    // Stance (Carstensen grounded). uforced single pick
    {
      id: "S1",
      type: "stance",
      construct: "stance",
      prompt: "When you think about time itself passing, which feels closest to how you relate to it?",
      options: [
        { label: "Time is something to be used well.", value: "resource" },
        { label: "Time is something I carry.", value: "weight" },
        { label: "Time is something I receive.", value: "gift" },
        { label: "Time is something I dwell in.", value: "mystery" },
      ],
    },
    {
      id: "S2",
      type: "stance",
      construct: "stance",
      prompt: "If you had to name what time most feels like to you, you'd say it is…",
      options: [
        { label: "A resource I'm spending.", value: "resource" },
        { label: "A weight I'm bearing.", value: "weight" },
        { label: "A gift I'm given.", value: "gift" },
        { label: "A mystery I'm inside.", value: "mystery" },
      ],
    },
    {
      id: "S3",
      type: "stance",
      construct: "stance",
      prompt: "The passage of time, for you, is mostly…",
      options: [
        { label: "Something to put to use.", value: "resource" },
        { label: "Something that weighs on you.", value: "weight" },
        { label: "Something to be grateful for.", value: "gift" },
        { label: "Something to sit with.", value: "mystery" },
      ],
    },
    {
      id: "S4",
      type: "stance",
      construct: "stance",
      prompt: "Which line lands truest for you?",
      options: [
        { label: "I spend my time.", value: "resource" },
        { label: "I carry my time.", value: "weight" },
        { label: "I receive my time.", value: "gift" },
        { label: "I dwell in my time.", value: "mystery" },
      ],
    },
  ],
};

function uni(id: string, construct: string, statement: string) {
  return { id, type: "unipolar" as const, scale: 5 as const, construct, statement };
}
