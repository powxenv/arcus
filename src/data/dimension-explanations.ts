// Plain-language meaning for each dimension shown on the results page.
// No construct names, citations, or technical roles — just what a high or low
// score tends to look like in someone's life.

export type DimensionExplanation = {
  key: string;
  // One short line: what this dimension is about, in plain words.
  plain: string;
  high: string;
  low: string;
};

export const DIMENSION_EXPLANATIONS: Record<string, DimensionExplanation[]> = {
  solstice: [
    {
      key: "A",
      plain: "How bright or quiet your energy runs by default.",
      high: "High — alert, ready, running hot.",
      low: "Low — calm, still, running cool.",
    },
    {
      key: "B",
      plain: "Whether your energy moves outward toward people and action, or inward toward reflection.",
      high: "High — you reach outward.",
      low: "Low — you turn inward.",
    },
    {
      key: "A1",
      plain: "Your everyday energy set-point — how charged you feel day to day.",
      high: "High — full charge, quick into action.",
      low: "Low — deeply still, eases into things.",
    },
    {
      key: "A2",
      plain: "How much intensity, novelty, and stimulation you like.",
      high: "High — you want it busy, fast, and varied.",
      low: "Low — you prefer gentle, slow, and steady.",
    },
    {
      key: "B1",
      plain: "Whether you move toward people or toward your own world.",
      high: "High — you seek people out.",
      low: "Low — you let connection come to you.",
    },
    {
      key: "B2",
      plain: "Whether you lead and initiate, or respond and adapt.",
      high: "High — you decide and move.",
      low: "Low — you let things unfold.",
    },
  ],
  pride: [
    {
      key: "A",
      plain: "How clearly and confidently you know who you are.",
      high: "High — stable, confident self-knowledge.",
      low: "Low — still figuring it out.",
    },
    {
      key: "B",
      plain: "How closely what you show matches who you are inside.",
      high: "High — what people see is what's there.",
      low: "Low — you adapt to the situation.",
    },
    {
      key: "A1",
      plain: "How well you know your own values, interests, and qualities.",
      high: "High — you can describe yourself clearly.",
      low: "Low — you're still discovering what you're drawn to.",
    },
    {
      key: "A2",
      plain: "How stable your sense of self is across time and situations.",
      high: "High — you feel like the same person day to day.",
      low: "Low — it shifts with mood or context.",
    },
    {
      key: "B1",
      plain: "Whether you act the same in public as you do in private.",
      high: "High — consistent across rooms.",
      low: "Low — different sides show in different places.",
    },
    {
      key: "B2",
      plain: "How open and genuine you are in your closest relationships.",
      high: "High — you let people in.",
      low: "Low — you hold things back.",
    },
    {
      key: "C",
      plain: "Whether your identity feels claimed or still forming.",
      high: "High — 'this is who I am.'",
      low: "Low — 'I'm still becoming.'",
    },
  ],
  turing: [
    {
      key: "need_for_cognition",
      plain: "How much you genuinely enjoy hard thinking.",
      high: "High — thinking is its own reward.",
      low: "Low — thinking is a tool, not a pleasure.",
    },
    {
      key: "faith_in_intuition",
      plain: "How much you trust your gut and first instincts.",
      high: "High — you trust it and follow it.",
      low: "Low — you'd rather have reasons.",
    },
    {
      key: "override",
      plain: "Whether you tend to check a first instinct before trusting it.",
      high: "High — you pause and reconsider.",
      low: "Low — you go with the first answer.",
    },
  ],
  passage: [
    {
      key: "past",
      plain: "How warmly you connect with where you've come from.",
      high: "High — roots and memory matter to you.",
      low: "Low — your attention is elsewhere.",
    },
    {
      key: "present",
      plain: "How fully you engage with what's happening right now.",
      high: "High — you're genuinely here.",
      low: "Low — you move through it more than live in it.",
    },
    {
      key: "future",
      plain: "How strongly you're pulled toward what's ahead.",
      high: "High — goals shape your days.",
      low: "Low — the future isn't your compass.",
    },
  ],
};
