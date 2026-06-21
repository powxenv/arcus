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
    duration: "~8 min",
    questionCount: "10 questions",
    question: "How do you burn, and which direction is your energy turning?",
    overview:
      "Solstice measures your affective energy: how activated you feel, whether that energy moves toward or away from the world, and which direction your energy cycle is heading. It treats your energy as a cycle with a peak and a turning point, not a fixed level you're stuck at.",
    whyItMatters:
      "Your energy level shapes everything: how you socialize, how you make decisions, how you recover from stress. Most tests tell you whether you're 'high energy' or 'low energy' and leave it there. Solstice goes further by showing you the direction your energy is heading. Are you building toward a peak, or settling into a period of rest? That direction affects how you should plan your near future.",
    theme:
      "The solstice is the moment a cycle reverses. Summer solstice: the longest day, after which the light begins to recede. Winter solstice: the longest night, after which the light begins to return. Your energy follows the same pattern. It rises, peaks, and turns. Solstice maps where you are on that cycle and which way the cycle is moving.",
    constructs: [
      { name: "Solar Height", description: "Your baseline activation level: how bright or dim your energy runs on average. High activation means alert, engaged, and ready. Low activation means calm, interior, and still." },
      { name: "Tidal Direction", description: "Your motivational orientation: whether your energy naturally moves outward toward people, action, and engagement, or inward toward reflection, conservation, and depth." },
      { name: "Trajectory", description: "The felt direction of your energy right now: are you gathering momentum (waxing) or settling toward rest (waning)? This is what makes Solstice different from a static energy test." },
    ],
    theory: [
      { name: "Russell (1980) - Circumplex Model of Affect", use: "Core geometric anchor. Emotions organize on a circle defined by activation and valence. Solstice uses the activation axis." },
      { name: "Carver & White (1994) - BIS/BAS Scales", use: "Approach and withdrawal as orthogonal motivational systems. Grounds the Tidal Direction axis." },
      { name: "Schimmack & Reisenzein (2002) - Energetic Arousal", use: "Demonstrates that energetic arousal is a distinct activation type, not just a mix of valence and general arousal." },
      { name: "Zuckerman (2007) - Sensation Seeking", use: "Stimulation appetite as a facet of activation. Informs the Solar Height construct." },
      { name: "Carver & Scheier - Self-Regulation Theory", use: "People naturally perceive their rate of progress toward or away from goals. Grounds the trajectory component." },
    ],
    howItWorks: [
      "You answer 8 questions about your typical energy and motivation using a 7-point scale between two statements.",
      "Then you answer 2 questions about the direction you feel your energy is heading right now.",
      "Your responses produce two scores: Solar Height (0-100) and Tidal Direction (0-100), plus a trajectory label (waxing, waning, or steady).",
      "Your Solar Height and Tidal Direction scores place you in one of four seasonal positions.",
    ],
    scoring: [
      "Each score is scaled 0-100, where 50 is the midpoint. No one is 'high' or 'low' in an absolute sense; you're somewhere on a continuum.",
      "Your seasonal type (Summer, Autumn, Winter, or Spring) comes from the combination of your two axis scores.",
      "Your trajectory (waxing or waning) is computed separately and added as a direction modifier to your type.",
    ],
    resultTypes: [
      { name: "Summer", emoji: "☀️", description: "High activation, energy moving outward. Abundant, radiant, generative." },
      { name: "Autumn", emoji: "🍂", description: "High activation, energy moving inward. Luminous but consolidating, gathering for release." },
      { name: "Winter", emoji: "❄️", description: "Low activation, energy moving inward. Deep and still, rooted, renewing." },
      { name: "Spring", emoji: "🌱", description: "Low activation, energy moving outward. Tender, persistent, reaching toward the light." },
    ],
    interpretation:
      "Your result tells you two things: where your energy sits right now, and which direction it's heading. A Summer result means your energy is high and outward-moving. If it's also waxing, you're still climbing toward your peak. If it's waning, you can feel the turn beginning. Neither direction is better. Waxing means momentum to use. Waning means it's time to consolidate before the next cycle.",
    interpretationTips: [
      "Your trajectory is about the present moment, not a permanent trait. It can shift with life circumstances.",
      "If you're waxing, this might be a good time to take on new challenges. If you're waning, it might be time to rest and integrate.",
      "Retaking the test after a few months may show a different position. That's expected. Arcs move.",
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
    duration: "~7 min",
    questionCount: "8 questions",
    question: "Does what you say about your mind match what your choices show?",
    overview:
      "Turing measures how you think: how much you enjoy effortful reasoning, how much you trust your intuition, and how those self-described preferences compare to how you actually make decisions. It's built on the insight that rational and intuitive thinking are two independent dimensions, not opposite ends of one scale.",
    whyItMatters:
      "The way you process information affects every decision you make. But there's often a gap between how you describe your thinking and how you actually think. You might say you're a careful deliberator, but your choices reveal you rely on snap judgments. Or you might say you trust your gut, but your decisions show you carefully weigh every factor. That gap is the most interesting thing Turing reveals.",
    theme:
      "Alan Turing's famous question: can you tell what a mind is by looking at what it does? The Imitation Game infers a hidden mind from its observable outputs. Turing applies the same principle. You state how you think, then you make actual choices, and the test compares the two.",
    constructs: [
      { name: "Need for Cognition", description: "How much you genuinely enjoy thinking hard. Not how smart you are, but how much you find effortful thinking satisfying rather than draining. Some people think for pleasure; others think only when they have to." },
      { name: "Faith in Intuition", description: "How much you trust your gut feelings, first impressions, and felt sense of situations. Some people lead with intuition and check it with reasoning; others do the reverse." },
      { name: "Decision-Style Preference", description: "When facing a choice, do you prefer to decide based on one strong reason, or weigh many factors together? This captures your default approach to decisions under uncertainty." },
    ],
    theory: [
      { name: "Cacioppo & Petty (1982) - Need for Cognition Scale", use: "Core anchor. NFC is unidimensional: it measures enjoyment of thinking, not ability or speed." },
      { name: "Epstein et al. (1996) - Rational-Experiential Inventory", use: "Key finding: NFC and Faith in Intuition are orthogonal (r=.08). You can be high in both, low in both, or anywhere in between. They are not opposites." },
      { name: "Frederick (2005) - Cognitive Reflection Test", use: "Behavioral override measurement. Shows whether you tend to check your first instinct or trust it." },
      { name: "Gigerenzer & Gaissmaier (2011) - Heuristic Decision Making", use: "Individual differences in heuristic use. People have stable preferences for how they make choices." },
    ],
    howItWorks: [
      "You answer 4 questions about how much you enjoy thinking, using a 5-point agree-disagree scale.",
      "You answer 4 questions about how much you trust your intuition, using the same scale.",
      "Your responses produce two independent scores: Need for Cognition (0-100) and Faith in Intuition (0-100).",
      "The combination of high/low on each dimension places you in one of four cognitive modes.",
    ],
    scoring: [
      "NFC and FI are scored independently. A high score on one does not mean a low score on the other.",
      "Each dimension uses a threshold of 60 to determine 'high' vs 'low' engagement.",
      "Your mode is determined by the combination: high-high, high-low, low-high, or low-low.",
    ],
    resultTypes: [
      { name: "The Integrator", emoji: "🧬", description: "High NFC + High FI. Engages both reasoning and intuition richly. Trusts both." },
      { name: "The Logician", emoji: "🔬", description: "High NFC + Low FI. Thinks deliberately, distrusts gut. Reasoning is the native mode." },
      { name: "The Reader", emoji: "🎯", description: "Low NFC + High FI. Pattern-fluent and intuitive. Reads situations fast, by feel." },
      { name: "The Operator", emoji: "⚙️", description: "Low NFC + Low FI. Acts over reflection. Neither mode dominates." },
    ],
    interpretation:
      "Your result describes your cognitive engagement profile: how much you enjoy thinking and how much you trust your gut. The key insight is that these are independent. Being an Integrator (high in both) is not 'better' than being an Operator (low in both). Each mode has strengths and contexts where it works well.",
    interpretationTips: [
      "Your thinking style is not your intelligence. NFC measures enjoyment, not ability.",
      "If your stated preferences differ from your actual decision style, that gap is worth noticing. It may mean you undervalue (or overvalue) how you actually think.",
      "Your mode can shift with context. You might be a Logician at work and a Reader in social situations.",
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
    duration: "~8 min",
    questionCount: "10 questions",
    question: "How well do you know yourself, and how honestly do you show it?",
    overview:
      "Pride measures your relationship with your own identity across three dimensions: how clearly you know yourself, how authentically you express that self to the world, and whether you've claimed your identity with confidence. It explores the gap between who you are inside and who you present outward.",
    whyItMatters:
      "Your sense of self affects how you make decisions, how you connect with others, and how you navigate change. People who know themselves clearly tend to make faster, more confident decisions. People who express themselves authentically tend to have deeper relationships. And people who have claimed their identity, rather than still exploring it, tend to feel more grounded when life shifts.",
    theme:
      "Pride, in its healthiest form, is the courage to be who you are openly. Not arrogance or ego, but the quiet confidence that comes from knowing yourself and choosing to show that self honestly. The assessment measures the four parts of that courage: knowing, showing, claiming, and being seen.",
    constructs: [
      { name: "Identity Clarity", description: "How clearly and confidently you know your own attributes, values, and preferences. Not whether your self-image is positive or negative, but whether it's stable and well-defined." },
      { name: "Self-Alignment", description: "How closely your outward behavior matches your inner self. Do you act the same in private and in public, or do you adapt your presentation to fit the situation?" },
      { name: "Commitment", description: "Whether your identity feels claimed and settled ('this is who I am') or provisional and exploring ('I'm still figuring it out'). This is a trajectory measure, not a quality judgment." },
    ],
    theory: [
      { name: "Campbell et al. (1996) - Self-Concept Clarity Scale", use: "Core anchor for Identity Clarity. SCC is unidimensional and distinct from self-esteem." },
      { name: "Kernis & Goldman (2006) - Multicomponent Authenticity", use: "Four-component model: awareness, behavior, relational openness, unbiased processing." },
      { name: "Wood et al. (2008) - Authenticity Scale", use: "Three-factor validated instrument: self-alienation, authentic living, accepting external influence." },
      { name: "Marcia (1966) - Identity Statuses", use: "Commitment vs exploration dimension. Whether identity is claimed or provisional." },
      { name: "Vazire (2010) - Self-Other Knowledge Asymmetry", use: "Others sometimes see us more accurately than we see ourselves. Grounds the visibility concept." },
    ],
    howItWorks: [
      "You answer 6 questions about how clearly you know yourself and how consistently you express that self, using a 7-point scale.",
      "You answer 2 questions about how authentic you are in social situations and close relationships.",
      "You answer 2 questions about whether you've claimed your identity or are still exploring it.",
      "Your responses produce three scores: Clarity, Authenticity, and Commitment, each scaled 0-100.",
    ],
    scoring: [
      "Clarity and Authenticity scores place you in one of four identity modes.",
      "Your Commitment score is reported alongside as a direction modifier: committed, exploring, or open.",
      "Commitment and Clarity may share variance. A high Clarity score doesn't guarantee a high Commitment score.",
    ],
    resultTypes: [
      { name: "The Beacon", emoji: "🔦", description: "Clear identity, high authenticity. Knows yourself and shows yourself with little gap." },
      { name: "The Prism", emoji: "🔮", description: "Clear identity, adaptive presentation. Knows yourself but refracts depending on the situation." },
      { name: "The Ember", emoji: "🔥", description: "Exploring identity, high authenticity. Still figuring yourself out, but what you show is genuine." },
      { name: "The Aurora", emoji: "💠", description: "Exploring identity, adaptive presentation. Self shifts with context. Fluid and always in motion." },
    ],
    interpretation:
      "Your result describes the relationship between your inner self-knowledge and your outward self-expression. The four modes are not a hierarchy. A Beacon is not 'better' than an Aurora. Each represents a different way of navigating the tension between knowing yourself and showing yourself.",
    interpretationTips: [
      "Your Commitment label tells you about trajectory, not quality. 'Exploring' is not worse than 'committed'. It means your identity is still forming.",
      "If you score high on Clarity but low on Authenticity, you may know yourself well but hold back from expressing it. That gap is worth reflecting on.",
      "Identity shifts over time, especially during major life transitions. Retaking this test after a significant change may show a different result.",
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
    duration: "~6 min",
    questionCount: "9 questions",
    question: "Where does your attention sit, and how do you feel about time passing?",
    overview:
      "Passage measures which temporal zones you engage with: the past, the present, and the future. Each is scored independently, because engaging with one doesn't mean you can't engage with another. It also measures your stance toward time itself: do you experience it as a resource, a weight, a gift, or a mystery?",
    whyItMatters:
      "How you relate to time shapes your priorities, your decisions, and your sense of meaning. People strongly rooted in the past draw identity and grounding from memory. People fully in the present tend to experience life more vividly. Future-oriented people tend to plan and build. None of these is inherently better. But understanding your pattern helps you see why you make the choices you do.",
    theme:
      "Time is the one medium every life moves through. You can't opt out of it. The Passage assessment doesn't ask how much time you have. It asks how you inhabit the time you're in. Which rooms do you light up: the past, the present, the future? And how do you feel about the fact that time keeps moving?",
    constructs: [
      { name: "Past Engagement", description: "How warmly and meaningfully you connect with where you've been: your roots, your memories, the people and experiences that shaped you." },
      { name: "Present Engagement", description: "How fully and actively you engage with the current moment. Not hedonism or impulsivity, but genuine presence and finding meaning in the ordinary." },
      { name: "Future Engagement", description: "How strongly you're pulled toward what's ahead: goals, dreams, and the person you're becoming. Not anxiety about the future, but positive anticipation." },
      { name: "Temporal Stance", description: "Your relationship to time itself. Do you see it as a resource to be used, a weight to be carried, a gift to be received, or a mystery to be dwelt in?" },
    ],
    theory: [
      { name: "Zimbardo & Boyd (1999) - Time Perspective Inventory", use: "Five-factor structure of time perspective. Validated across 24 countries with 12,200 participants." },
      { name: "Sircova et al. (2014) - 24-Country Validation", use: "Confirms the five-factor structure holds cross-culturally. Arcus uses three affirming factors independently." },
      { name: "Vowinckel et al. (2015) - Present-Eudaimonic Scale", use: "Validated positive-present factor that ZTPI lacks. Grounds the Present Engagement construct." },
      { name: "Carstensen (2021) - Socioemotional Selectivity Theory", use: "Perceived time horizons reshape motivation. Grounds the Temporal Stance component." },
    ],
    howItWorks: [
      "You answer 8 statements about your relationship with the past, present, and future, using a 5-point agree-disagree scale.",
      "You answer 1 question about your stance toward time itself, choosing between four perspectives.",
      "Your responses produce three independent scores: Past, Present, and Future engagement, each scaled 0-100.",
      "The pattern of which scores cross the engagement threshold (60) determines your temporal type.",
    ],
    scoring: [
      "Each temporal zone is scored independently. Being high in one does not reduce your score in another.",
      "A zone is considered 'engaged' if its score is 60 or above.",
      "Your type is determined by which combination of zones are engaged: any single zone, any pair, all three, or none.",
    ],
    resultTypes: [
      { name: "The Keeper", emoji: "📜", description: "Past engaged. Draws meaning and grounding from roots and memory." },
      { name: "The Witness", emoji: "⏳", description: "Present engaged. Lives where past and future resolve into now." },
      { name: "The Wayfinder", emoji: "🧭", description: "Future engaged. Not waiting for life; walking to meet it." },
      { name: "The Hearth", emoji: "🕯️", description: "Past + Present. Carries roots into the living moment." },
      { name: "The Bridge", emoji: "🌉", description: "Past + Future. Spans from roots to horizons." },
      { name: "The Flow", emoji: "🌊", description: "Present + Future. Moves forward, fully present." },
      { name: "Balanced", emoji: "⚖️", description: "All three zones engaged. Past, present, and future in proportion." },
      { name: "The Wanderer", emoji: "🍃", description: "No single zone dominant. Moves through time lightly, unbound." },
    ],
    interpretation:
      "Your result shows which temporal zones you naturally inhabit and how you feel about time itself. The type tells you where your attention lives. Your stance tells you how you carry it. Together, they describe not just how you spend your time, but how you experience it.",
    interpretationTips: [
      "Your temporal profile can shift with life stage and circumstances. A major transition may change which zones you engage with.",
      "If your stance is 'weight,' it may be worth reflecting on what feels heavy about time. If it's 'resource,' notice whether you're treating time as something to spend or something to invest.",
      "Balanced is not inherently the goal. Many deeply fulfilled people are strongly oriented toward a single zone.",
    ],
    next: [
      { key: "solstice", name: "Solstice", icon: decor1 },
      { key: "turing", name: "Turing", icon: decor2 },
      { key: "pride", name: "Pride", icon: decor3 },
    ],
  },
};

export const ASSESSMENT_KEYS = Object.keys(ASSESSMENTS);
