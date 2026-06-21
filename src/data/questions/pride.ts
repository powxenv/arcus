import type { QuestionSet } from "./types";

// SSA: 32 position items (A1×8, A2×8, B1×8, B2×8) + 4 commitment items (C×4).
// 7-point bipolar two-anchor format. poleA is always the construct-high pole
// (Clear for Axis A, Self-Aligned for Axis B, committed for commitment).
// Items verbatim from 03-spectrum-of-self-assessment.md §8 and the SSA build sim.
// Informant visibility path is a build feature and is deferred.
export const pride: QuestionSet = {
  assessmentKey: "pride",
  title: "The Spectrum of Self Assessment",
  shortName: "Pride",
  duration: "~8 min",
  summary:
    "How clearly you know yourself (Identity Clarity) and how honestly you show it (Self-Alignment), plus whether your identity feels claimed or still forming.",
  constructs: [
    { key: "A1", label: "Self-Knowledge", role: "facet", parent: "A" },
    { key: "A2", label: "Self-Consistency", role: "facet", parent: "A" },
    { key: "B1", label: "Authentic Living", role: "facet", parent: "B" },
    { key: "B2", label: "Relational Authenticity", role: "facet", parent: "B" },
    { key: "A", label: "Identity Clarity", role: "axis" },
    { key: "B", label: "Self-Alignment", role: "axis" },
    { key: "C", label: "Commitment", role: "commitment" },
  ],
  questions: [
    // A1: Self-Knowledge
    bipolar("A1.1", "A1", "When someone asks you to describe what you're like, you…", "Can give a clear and confident answer.", "Struggle to find the right words. You're still figuring it out."),
    bipolar("A1.2", "A1", "Your sense of what matters to you in life is…", "Something you've thought about a lot and know well.", "Something you haven't fully sorted out yet."),
    bipolar("A1.3", "A1", "When you need to make a decision that reflects your values…", "You know what those values are and what they call for.", "You're not always sure what you actually believe."),
    bipolar("A1.4", "A1", "When you think about who you are as a person…", "You have a clear sense of who you are.", "It's still unclear to you."),
    bipolar("A1.5", "A1", "When people ask what interests or activities truly engage you…", "You can name them without hesitation.", "You're still figuring out what you're drawn to."),
    bipolar("A1.6", "A1", "How well do you know your own strengths and weaknesses?", "You have a pretty clear picture.", "You're still discovering them."),
    bipolar("A1.7", "A1", "When you think about where your life is headed…", "You have a clear sense of direction.", "It raises more questions than answers. You're still finding your way."),
    bipolar("A1.8", "A1", "Your sense of who you are is best described as…", "Well-defined. You know yourself.", "In progress. You're still becoming."),
    // A2: Self-Consistency
    bipolar("A2.1", "A2", "How you see yourself…", "Is pretty stable from day to day.", "Changes depending on what's happening."),
    bipolar("A2.2", "A2", "Different parts of your personality…", "Feel like they belong together.", "Don't always feel like they fit into one person."),
    bipolar("A2.3", "A2", "Looking back at who you were a few years ago…", "You still see the same core person.", "You almost feel like a different person."),
    bipolar("A2.4", "A2", "When someone challenges how you see yourself…", "Your view of yourself stays solid. You know what you think.", "You start to question whether you really know yourself."),
    bipolar("A2.5", "A2", "Your opinions about yourself…", "Tend to stay consistent over time.", "Change more often than you'd expect."),
    bipolar("A2.6", "A2", "Your best self and your worst self…", "Feel like different versions of the same person.", "Almost feel like two different people."),
    bipolar("A2.7", "A2", "Between how you see yourself and how others describe you…", "There's a pretty close match.", "There's often a gap."),
    bipolar("A2.8", "A2", "Your sense of who you really are…", "Is clear and doesn't waver much.", "Can shift depending on your mood or situation."),
    // B1: Authentic Living
    bipolar("B1.1", "B1", "In most social situations, you…", "Act the same way you feel inside.", "Adjust your behavior to fit what the situation seems to call for."),
    bipolar("B1.2", "B1", "The person people see in public is…", "The same as who you are in private.", "A version of you, not the whole picture."),
    bipolar("B1.3", "B1", "When your gut and the situation don't match…", "You stay true to what matters to you.", "You adapt to what the situation requires."),
    bipolar("B1.4", "B1", "Doing what you believe means going against the crowd…", "Feels right. You'd rather stand by what you believe.", "Is a real tension. Belonging matters too."),
    bipolar("B1.5", "B1", "Across the different groups in your life (work, friends, family)…", "You're fundamentally the same person with all of them.", "Different sides of you show up in each one."),
    bipolar("B1.6", "B1", "How you act on the outside…", "Accurately reflects what you're feeling on the inside.", "Is often different from what you're actually feeling."),
    bipolar("B1.7", "B1", "Doing what others expect of you…", "Is something you do rarely. You prefer to follow your own path.", "Is something you do often. It keeps things smooth."),
    bipolar("B1.8", "B1", "Being yourself, even when it's not the easy choice…", "Comes naturally to you.", "Takes effort. There's a cost to standing out."),
    // B2: Relational Authenticity
    bipolar("B2.1", "B2", "In close relationships, you tend to…", "Share your real thoughts and feelings openly.", "Hold some things back to avoid conflict or judgment."),
    bipolar("B2.2", "B2", "When friends describe you to someone new, they'd say…", "What you see is what you get.", "There's more to you than most people see."),
    bipolar("B2.3", "B2", "Being completely honest about how you feel with the people closest to you…", "Comes naturally to you.", "Feels risky. You're selective about what you share."),
    bipolar("B2.4", "B2", "In arguments with people you're close to, you…", "Express what you truly think, even if it might upset them.", "Tend to say what will keep the peace."),
    bipolar("B2.5", "B2", "Over time in your closest relationships…", "People see more of who you really are. You gradually open up.", "You tend to show yourself the same way from the start."),
    bipolar("B2.6", "B2", "When someone gets close to you, do you…", "Let them in and show your real self.", "Keep some distance. It's safer that way."),
    bipolar("B2.7", "B2", "When a close relationship reaches a new level of depth…", "You lean into it. Deeper honesty is part of closeness.", "You move carefully. There are some things you keep to yourself."),
    bipolar("B2.8", "B2", "In your closest relationships, you'd rather…", "Be fully known, even if it's messy.", "Keep certain parts of yourself private."),
    // Commitment (Marcia 1966) — bipolar, poleA = committed
    bipolar("C1", "C", "When it comes to who you are, you…", "Know it, and you've claimed it.", "Are still figuring it out."),
    bipolar("C2", "C", "Your sense of identity is…", "Settled. You've arrived.", "Open. You're still becoming."),
    bipolar("C3", "C", "When someone asks who you really are, you…", "Can answer without hesitation.", "Hesitate."),
    bipolar("C4", "C", "Your identity feels…", "Fully committed.", "Not yet committed."),
  ],
};

function bipolar(id: string, construct: string, stem: string, poleA: string, poleB: string) {
  return { id, type: "bipolar" as const, scale: 7 as const, construct, stem, poleA, poleB };
}
