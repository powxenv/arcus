import decor1 from "../assets/decoration-1.svg";
import decor2 from "../assets/decoration-2.svg";
import decor3 from "../assets/decoration-3.svg";
import decor4 from "../assets/decoration-4.svg";

export type AssessmentData = {
  key: string;
  name: string;
  shortName: string;
  icon: string;
  domain: string;
  tagline: string;
  duration: string;
  questionCount: string;
  question: string;
  overview: string;
  whyItMatters: string;
  theme: string;
  constructs: { name: string; description: string }[];
  theory: { name: string; use: string }[];
  howItWorks: string[];
  scoring: string[];
  resultTypes: { name: string; emoji: string; description: string }[];
  interpretation: string;
  interpretationTips: string[];
  next: { key: string; name: string; icon: string }[];
};

export const ASSESSMENTS: Record<string, AssessmentData> = {
  solstice: {
    key: "solstice",
    name: "The Solstice Cycle Assessment",
    shortName: "Solstice",
    icon: decor1,
    domain: "Affect & Energy",
    tagline: "The arc of your energy",
    duration: "~10 min",
    questionCount: "36 questions",
    question: "How do you burn, and which direction is your energy turning?",
    overview:
      "Solstice maps your energy as a cycle with a peak and a turning point — not a fixed level. It measures how activated you feel, whether your energy moves toward or away from the world, and which direction the cycle is heading.",
    whyItMatters:
      "Your energy level shapes how you socialize, how you make decisions, and how you recover from stress. Solstice shows you the direction your energy is heading. Are you building toward a peak, or settling into a period of rest? That direction shapes how you plan your near future.",
    theme:
      "A solstice is the moment a cycle reverses. Summer solstice: the longest day, after which the light recedes. Winter solstice: the longest night, after which the light returns. Your energy follows the same pattern. Solstice maps where you are on that cycle and which way it's moving.",
    constructs: [
      { name: "Solar Height", description: "How bright or quiet your energy runs by default. Alert and ready, or calm and still." },
      { name: "Tidal Direction", description: "Whether your energy moves outward toward people and action, or inward toward reflection and depth." },
      { name: "Trajectory", description: "The felt direction right now — gathering momentum, settling toward rest, or holding steady." },
    ],
    theory: [
      { name: "Russell (1980) — Circumplex Model of Affect", use: "Emotions organize on a circle defined by activation and valence. Grounds the wheel structure." },
      { name: "Carver & White (1994) — BIS/BAS Scales", use: "Approach and withdrawal are separate systems, not two ends of one line. Grounds Tidal Direction." },
      { name: "Schimmack & Reisenzein (2002) — Energetic Arousal", use: "Energetic arousal is its own activation type, distinct from general arousal. Grounds Solar Height." },
      { name: "Zuckerman (2007) — Sensation Seeking", use: "Stimulation appetite is a stable individual difference. Grounds the stimulation facet of Solar Height." },
      { name: "Carver & Scheier — Self-Regulation Theory", use: "People perceive whether they're moving toward or away from their goals. Grounds trajectory." },
    ],
    howItWorks: [
      "32 questions place you on two continuous scales using a 7-point bipolar format — each question presents two opposing statements and you pick where you fall between them.",
      "4 additional questions ask about the felt direction of your energy right now, using the same format.",
      "Two axis scores emerge: Solar Height (your activation level) and Tidal Direction (outward vs. inward).",
      "Your position on the wheel picks a season. A direction label — gathering, settling, or steady — sits alongside it.",
    ],
    scoring: [
      "Each axis score is 0–100 with 50 as the midpoint. Being at 51 doesn't make you a different person than being at 49.",
      "Your seasonal type comes from the combination: bright + outward = Summer, bright + inward = Autumn, quiet + inward = Winter, quiet + outward = Spring.",
      "Trajectory is computed separately from four directional items and added as a modifier.",
    ],
    resultTypes: [
      { name: "Summer", emoji: "☀️", description: "Energy runs bright and reaches outward. Abundant, generative." },
      { name: "Autumn", emoji: "🍂", description: "Energy runs bright but turns inward. Consolidating, selective." },
      { name: "Winter", emoji: "❄️", description: "Energy runs quiet and turns inward. Deep, rooted, renewing." },
      { name: "Spring", emoji: "🌱", description: "Energy runs quiet but reaches outward. Tender, emerging." },
    ],
    interpretation:
      "Your result gives you two things: where your energy sits right now, and which direction it's heading. Summer means bright and outward-moving. If the direction is gathering, you're still climbing. If it's settling, you can feel the turn. Neither direction is better — gathering gives you momentum, settling gives you space to consolidate.",
    interpretationTips: [
      "Trajectory is about this moment, not a permanent trait. It shifts with circumstances.",
      "Gathering is a good time for new challenges. Settling is a good time to rest and integrate.",
      "Retake the test after a few months and your position may shift. Arcs move.",
    ],
    next: [
      { key: "turing", name: "Turing", icon: decor2 },
      { key: "pride", name: "Pride", icon: decor3 },
      { key: "passage", name: "Passage", icon: decor4 },
    ],
  },
  turing: {
    key: "turing",
    name: "The Modes of Mind Assessment",
    shortName: "Turing",
    icon: decor2,
    domain: "Cognition & Thinking",
    tagline: "The arc of your mind",
    duration: "~9 min",
    questionCount: "31 questions",
    question: "Does what you say about your mind match what your choices show?",
    overview:
      "Turing measures how you think: how much you enjoy reasoning, how much you trust your intuition, and how what you say about yourself compares to how you actually make decisions.",
    whyItMatters:
      "How you process information shapes every decision. There's often a gap between what you say about your thinking and what your choices reveal. You might describe yourself as careful and deliberate, but your decisions show you follow snap judgments. Or you might dismiss yourself as impulsive, but your choices show you weigh factors carefully. That gap is what Turing measures.",
    theme:
      "Alan Turing asked whether you can tell what a mind is by looking at what it does. Turing applies the same logic. You describe how you think, then you make choices, and the test compares the two.",
    constructs: [
      { name: "Need for Cognition", description: "How much you enjoy hard thinking. Not intelligence — more like whether thinking feels satisfying or draining." },
      { name: "Faith in Intuition", description: "How much you trust your gut, your first impressions, and your felt sense of things." },
      { name: "Decision Strategy", description: "When you face a choice, do you lean on one strong reason, weigh many factors, or shift between the two?" },
    ],
    theory: [
      { name: "Cacioppo & Petty (1982) — Need for Cognition Scale", use: "NFC is a single dimension: it measures enjoyment of thinking, not speed or ability." },
      { name: "Epstein et al. (1996) — Rational-Experiential Inventory", use: "NFC and Faith in Intuition are independent — you can be high in both, low in both, or anywhere." },
      { name: "Frederick (2005) — Cognitive Reflection Test", use: "Measures whether you check your first instinct before trusting it. Behavioral, not self-report." },
      { name: "Gigerenzer & Gaissmaier (2011) — Heuristic Decision Making", use: "People have stable preferences for how they make choices. Grounds the decision-strategy measure." },
    ],
    howItWorks: [
      "8 statements about how much you enjoy thinking, rated on a 5-point agree–disagree scale.",
      "8 statements about how much you trust your intuition, same format.",
      "5 problems that test whether you override your first instinct.",
      "10 decision scenarios where you pick between two options. These reveal your decision strategy and whether it matches what you said about yourself.",
    ],
    scoring: [
      "Need for Cognition and Faith in Intuition are scored independently. A high score on one doesn't imply a low score on the other.",
      "The combination selects one of four modes. If both sit close to the midpoint, you land on The Generalist.",
      "Your decision strategy and the gap between your stated and observed style are reported alongside your mode.",
    ],
    resultTypes: [
      { name: "The Integrator", emoji: "🧬", description: "Engages both reasoning and intuition. Trusts both." },
      { name: "The Logician", emoji: "🔬", description: "Thinks deliberately. Distrusts gut. Reasoning leads." },
      { name: "The Reader", emoji: "🎯", description: "Reads fast and by feel. Patterns and intuition lead." },
      { name: "The Operator", emoji: "⚙️", description: "Acts over reflection. Neither mode dominates." },
    ],
    interpretation:
      "Your mode describes how you engage with thinking and intuition. They're independent — being high in both isn't better than being low in both. Each mode works well in some contexts and less well in others.",
    interpretationTips: [
      "Need for Cognition measures enjoyment, not intelligence.",
      "If what you said about your thinking differs from what your choices show, that gap is worth noticing.",
      "Your mode can shift with context. You might be a Logician at work and a Reader in social settings.",
    ],
    next: [
      { key: "solstice", name: "Solstice", icon: decor1 },
      { key: "pride", name: "Pride", icon: decor3 },
      { key: "passage", name: "Passage", icon: decor4 },
    ],
  },
  pride: {
    key: "pride",
    name: "The Spectrum of Self Assessment",
    shortName: "Pride",
    icon: decor3,
    domain: "Identity & Self",
    tagline: "The arc of your self",
    duration: "~10 min",
    questionCount: "36 questions",
    question: "How well do you know yourself, and how honestly do you show it?",
    overview:
      "Pride measures your relationship with your identity: how clearly you know yourself, how closely what you show matches who you are inside, and whether your identity feels settled or still forming.",
    whyItMatters:
      "Your sense of self affects how you make decisions, connect with others, and navigate change. Clear self-knowledge tends to bring faster, more confident decisions. Authentic self-expression tends to build deeper relationships. A settled identity tends to feel more grounded when life shifts.",
    theme:
      "Pride is the courage to be who you are openly. The quiet confidence that comes from knowing yourself and choosing to show that self honestly. The assessment measures four parts of that: knowing, showing, claiming, and being seen.",
    constructs: [
      { name: "Identity Clarity", description: "How clearly and confidently you know your own values, attributes, and preferences — separate from whether you like what you see." },
      { name: "Self-Alignment", description: "How closely what you show matches who you are inside. Same person in public and private, or different sides in different rooms." },
      { name: "Commitment", description: "Whether your identity feels claimed — 'this is who I am' — or still forming." },
    ],
    theory: [
      { name: "Campbell et al. (1996) — Self-Concept Clarity Scale", use: "Core anchor for Identity Clarity. A single, stable dimension distinct from self-esteem." },
      { name: "Kernis & Goldman (2006) — Multicomponent Authenticity", use: "Four-component model: awareness, unbiased processing, behavior, relational openness." },
      { name: "Wood et al. (2008) — Authenticity Scale", use: "Three factors: authentic living, self-alienation, accepting external influence." },
      { name: "Marcia (1966) — Identity Statuses", use: "The commitment-vs-exploration dimension. Whether identity is claimed or still being worked out." },
      { name: "Vazire (2010) — Self-Other Knowledge Asymmetry", use: "Others sometimes see us more clearly than we see ourselves. Grounds the visibility concept." },
    ],
    howItWorks: [
      "32 questions place you on two continuous scales using a 7-point bipolar format — two opposing statements per item.",
      "4 additional questions ask whether your identity feels claimed or still forming, same format.",
      "Three scores: Identity Clarity and Self-Alignment (each 0–100), plus a Commitment label (committed, exploring, or open).",
      "Your position on the clarity-alignment plane picks one of four modes. Commitment sits alongside as a modifier.",
    ],
    scoring: [
      "Clarity and Self-Alignment are scored from their underlying dimensions and placed on the plane.",
      "The combination selects your mode: clear + aligned = Beacon, clear + adaptive = Prism, exploring + aligned = Ember, exploring + adaptive = Aurora.",
      "Commitment is reported alongside: committed, exploring, or open.",
    ],
    resultTypes: [
      { name: "The Beacon", emoji: "🔦", description: "Knows and shows. Little gap between the inner and outer self." },
      { name: "The Prism", emoji: "🔮", description: "Knows clearly but presents differently depending on context." },
      { name: "The Ember", emoji: "🔥", description: "Still forming, but what shows is genuine." },
      { name: "The Aurora", emoji: "💠", description: "Fluid inside and out. Self shifts with context." },
    ],
    interpretation:
      "Your mode describes the relationship between knowing yourself and showing yourself. A Beacon isn't a higher rank than an Aurora — each represents a different way of navigating the space between inner and outer.",
    interpretationTips: [
      "Commitment says something about trajectory, not quality. 'Exploring' is not worse than 'committed.'",
      "High Clarity with low Authenticity means you might know yourself well but hold back from showing it.",
      "Identity shifts over time. Retake this after a major transition and the picture may look different.",
    ],
    next: [
      { key: "solstice", name: "Solstice", icon: decor1 },
      { key: "turing", name: "Turing", icon: decor2 },
      { key: "passage", name: "Passage", icon: decor4 },
    ],
  },
  passage: {
    key: "passage",
    name: "The Passage of Time Assessment",
    shortName: "Passage",
    icon: decor4,
    domain: "Time & Temporality",
    tagline: "The arc of your time",
    duration: "~8 min",
    questionCount: "28 questions",
    question: "Where does your attention sit, and how do you feel about time passing?",
    overview:
      "Passage measures which parts of time you live in — past, present, and future — each scored independently. It also asks how you relate to time itself: as a resource you spend, a weight you carry, a gift you receive, or a mystery you dwell in.",
    whyItMatters:
      "How you relate to time shapes your priorities, your decisions, and your sense of meaning. People rooted in the past draw identity from memory. People living in the present experience life vividly. People oriented toward the future plan and build. None is better than the others. Understanding your pattern helps you see why you make the choices you do.",
    theme:
      "Time is the medium every life moves through. You can't opt out. Passage doesn't ask how much time you have. It asks how you inhabit the time you're in. Which parts of time do you light up? And how does time itself feel to you?",
    constructs: [
      { name: "Past Engagement", description: "How warmly you connect with your roots, memories, and the people who shaped you." },
      { name: "Present Engagement", description: "How fully you engage with what's happening now. Not about seeking pleasure — about genuine presence." },
      { name: "Future Engagement", description: "How strongly goals, dreams, and possibility pull you forward. Positive anticipation, not anxiety." },
      { name: "Temporal Stance", description: "Your relationship to time itself: a resource to spend, a weight to carry, a gift to receive, or a mystery to dwell in." },
    ],
    theory: [
      { name: "Zimbardo & Boyd (1999) — Time Perspective Inventory", use: "Five distinct factors in how people relate to past, present, and future." },
      { name: "Sircova et al. (2014) — 24-Country Validation", use: "The five-factor structure holds across 24 countries and 12,200 people." },
      { name: "Vowinckel et al. (2015) — Present-Eudaimonic Scale", use: "A validated positive-present factor that measures meaningful presence in the moment." },
      { name: "Carstensen (2021) — Socioemotional Selectivity Theory", use: "How you perceive your time horizons shapes your motivation. Grounds the stance layer." },
    ],
    howItWorks: [
      "24 statements about your relationship with the past, present, and future, rated on a 5-point agree–disagree scale.",
      "4 questions about your stance toward time itself, each asking you to pick between four perspectives.",
      "Three independent scores: Past, Present, and Future engagement, each 0–100.",
      "The pattern of which zones engage (past, present, future, alone or together) determines one of eight temporal types. A stance label sits alongside.",
    ],
    scoring: [
      "Each zone is scored independently. Engaging one doesn't reduce another.",
      "A zone is engaged at a score of 60 or above. Your type comes from which combination of zones clears that threshold.",
      "If you sit close to the line on any zone, the label is a soft fit and the scores tell the truer story.",
    ],
    resultTypes: [
      { name: "The Keeper", emoji: "📜", description: "Anchored in roots and memory. The past is alive." },
      { name: "The Witness", emoji: "⏳", description: "Lives in the now. The present is rich and enough." },
      { name: "The Wayfinder", emoji: "🧭", description: "Pulled toward what's ahead. The future is the compass." },
      { name: "The Hearth", emoji: "🕯️", description: "Roots and presence together. Memory warms the living moment." },
      { name: "The Bridge", emoji: "🌉", description: "Spans from roots to horizons. Past and future in dialogue." },
      { name: "The Flow", emoji: "🌊", description: "Present and future as one motion. Moving forward, fully here." },
      { name: "Balanced", emoji: "⚖️", description: "Past, present, and future all engaged. Range across time." },
      { name: "The Wanderer", emoji: "🍃", description: "No single zone dominates. Moves through time lightly." },
    ],
    interpretation:
      "Your type tells you where your attention lives across time. Your stance tells you how you carry it. Together they describe how you experience time, not just how you spend it.",
    interpretationTips: [
      "Your temporal profile can shift with life stage. A major transition may change which zones you engage.",
      "If your stance is 'weight,' reflect on what feels heavy. If it's 'resource,' notice whether you're treating time as something to spend or invest.",
      "Balanced isn't the goal. Many deeply fulfilled people are strongly oriented toward a single zone.",
    ],
    next: [
      { key: "solstice", name: "Solstice", icon: decor1 },
      { key: "turing", name: "Turing", icon: decor2 },
      { key: "pride", name: "Pride", icon: decor3 },
    ],
  },
};

export const ASSESSMENT_KEYS = Object.keys(ASSESSMENTS);
