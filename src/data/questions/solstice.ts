import type { QuestionSet } from "./types";

// SCA: 32 position items (A1×8, A2×8, B1×8, B2×8) + 4 trajectory items (TA×2, TB×2).
// 7-point bipolar two-anchor format. poleA is always the construct-high pole
// (Bright for Axis A, Outward for Axis B, waxing for trajectory). Items taken
// verbatim from 01-solstice-cycle-assessment.md §8 and §7.3, and the build sim.
// No reverse keying: the bipolar format is its own acquiescence control.
export const solstice: QuestionSet = {
  assessmentKey: "solstice",
  title: "The Solstice Cycle Assessment",
  shortName: "Solstice",
  duration: "~8 min",
  summary:
    "Where your energy sits on its cycle right now (Solar Height and Tidal Direction), and the direction that cycle is heading.",
  constructs: [
    { key: "A1", label: "Baseline Arousal", role: "facet", parent: "A" },
    { key: "A2", label: "Stimulation Appetite", role: "facet", parent: "A" },
    { key: "B1", label: "Social Approach", role: "facet", parent: "B" },
    { key: "B2", label: "Agency", role: "facet", parent: "B" },
    { key: "A", label: "Solar Height", role: "axis" },
    { key: "B", label: "Tidal Direction", role: "axis" },
    { key: "TA", label: "Activation Trajectory", role: "trajectory", parent: "A" },
    { key: "TB", label: "Approach Trajectory", role: "trajectory", parent: "B" },
  ],
  questions: [
    // Facet A1: Baseline Arousal
    bipolar("A1.1", "A1", "When you wake, you're…", "Already at full charge.", "Still coming online, quietly."),
    bipolar("A1.2", "A1", "When nothing demands your attention, your mind…", "Stays active.", "Settles into quiet."),
    bipolar("A1.3", "A1", "Inside you, there's…", "A steady current running.", "A stillness."),
    bipolar("A1.4", "A1", "Your default state is closer to…", "Readiness.", "Rest."),
    bipolar("A1.5", "A1", "Moving from stillness into action, you…", "Shift quickly.", "Ease into it."),
    bipolar("A1.6", "A1", "Your body at rest is…", "Primed.", "Deeply still."),
    bipolar("A1.7", "A1", "At the end of a full day, you're…", "Still humming.", "Winding down."),
    bipolar("A1.8", "A1", "Compared to most people, you run…", "Hotter.", "Cooler."),
    // Facet A2: Stimulation Appetite
    bipolar("A2.1", "A2", "The sensory intensity you prefer is…", "Intense.", "Gentle."),
    bipolar("A2.2", "A2", "You prefer your environment…", "Busy and full.", "Sparse and open."),
    bipolar("A2.3", "A2", "The pace you prefer is…", "Fast.", "Slow."),
    bipolar("A2.4", "A2", "How much information and input you want coming at you is…", "A lot.", "A little."),
    bipolar("A2.5", "A2", "Your free time, you prefer…", "Packed with things to do.", "Open and unscheduled."),
    bipolar("A2.6", "A2", "When nothing much is happening, you feel…", "Restless. You want more.", "Content. The quiet is fine."),
    bipolar("A2.7", "A2", "You prefer things…", "Changing and varied.", "Steady and uniform."),
    bipolar("A2.8", "A2", "Compared to most people, you run on…", "More stimulation.", "Less stimulation."),
    // Facet B1: Social Approach
    bipolar("B1.1", "B1", "When something's on your mind, you want to…", "Talk it out with someone.", "Sit with it alone."),
    bipolar("B1.2", "B1", "Meeting new people is something you…", "Move toward.", "Let come to you."),
    bipolar("B1.3", "B1", "In a group, you move toward…", "The center.", "The edges."),
    bipolar("B1.4", "B1", "In your close relationships, you tend to…", "Reach out first.", "Wait to be reached out to."),
    bipolar("B1.5", "B1", "Most of your days involve…", "Lots of people time.", "Lots of solo time."),
    bipolar("B1.6", "B1", "Your default orientation is toward…", "People.", "Your own world."),
    bipolar("B1.7", "B1", "Your primary energy source is…", "Other people.", "Solitude."),
    bipolar("B1.8", "B1", "Connection with others is something you…", "Actively pursue.", "Let find you."),
    // Facet B2: Agency
    bipolar("B2.1", "B2", "When a decision is yours, you…", "Make it and move.", "Sit with it before acting."),
    bipolar("B2.2", "B2", "In groups, you tend to…", "Step forward and lead.", "Support whoever steps forward."),
    bipolar("B2.3", "B2", "You want to ___ how things turn out.", "Shape.", "Let unfold."),
    bipolar("B2.4", "B2", "When views differ, you…", "Try to bring others to yours.", "Try to take in others'."),
    bipolar("B2.5", "B2", "You prefer to…", "Hold the reins.", "Adapt to what arrives."),
    bipolar("B2.6", "B2", "If something needs doing, you…", "Do it.", "Let it find the right person."),
    bipolar("B2.7", "B2", "You mostly…", "Set your own course.", "Respond to what's asked of you."),
    bipolar("B2.8", "B2", "When something's yours to go after, you…", "Go after it.", "Let it come to you."),
    // Trajectory (v0.23): 7-point bipolar, poleA = waxing, poleB = waning
    bipolar("TA1", "TA", "Thinking about your energy right now, you feel you are…", "Gathering toward more.", "Settling toward less."),
    bipolar("TA2", "TA", "The pace of your inner life right now feels…", "Accelerating.", "Decelerating."),
    bipolar("TB1", "TB", "In your current season, you feel yourself…", "Opening outward toward the world.", "Drawing inward."),
    bipolar("TB2", "TB", "Compared to a few months ago, your engagement with life feels…", "More proactive.", "More receptive."),
  ],
};

function bipolar(
  id: string,
  construct: string,
  stem: string,
  poleA: string,
  poleB: string,
) {
  return { id, type: "bipolar" as const, scale: 7 as const, construct, stem, poleA, poleB };
}
