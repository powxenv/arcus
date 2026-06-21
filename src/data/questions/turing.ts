import type { QuestionSet } from "./types";

// MMA: 8 NFC (5-pt unipolar) + 8 FI (5-pt unipolar) + 5 CRT (behavioral) +
// 10 heuristics (A/B choice). Items verbatim from 02-modes-of-mind-assessment.md §8
// and the MMA build (research/mma-debug.html).
// NFC and FI are unipolar engagement scales; all items are engagement-positive.
export const turing: QuestionSet = {
  assessmentKey: "turing",
  title: "The Modes of Mind Assessment",
  shortName: "Turing",
  duration: "~7 min",
  summary:
    "How much you enjoy effortful thinking (Need for Cognition) and how much you trust your gut (Faith in Intuition), plus a behavioral check of how you actually decide.",
  constructs: [
    { key: "need_for_cognition", label: "Need for Cognition", role: "scale" },
    { key: "faith_in_intuition", label: "Faith in Intuition", role: "scale" },
    { key: "override", label: "Cognitive Override", role: "scale" },
    { key: "strategy", label: "Decision Strategy", role: "scale" },
  ],
  questions: [
    // NFC (Cacioppo & Petty 1982)
    uni("N1.1", "need_for_cognition", "I enjoy thinking hard about problems, even when I don't have to."),
    uni("N1.2", "need_for_cognition", "I prefer complex problems over simple ones."),
    uni("N1.3", "need_for_cognition", "Thinking is something I do for pleasure, not just when I have to."),
    uni("N1.4", "need_for_cognition", "I find it satisfying to work through a difficult idea."),
    uni("N1.5", "need_for_cognition", "I would rather figure something out myself than be told the answer."),
    uni("N1.6", "need_for_cognition", "I enjoy intellectual challenges."),
    uni("N1.7", "need_for_cognition", "I like to understand the reasoning behind things, not just the conclusion."),
    uni("N1.8", "need_for_cognition", "Thinking deeply about something is its own reward for me."),
    // FI (Epstein et al. 1996 REI)
    uni("I2.1", "faith_in_intuition", "I trust my initial impressions of people."),
    uni("I2.2", "faith_in_intuition", "I often make decisions based on gut feeling."),
    uni("I2.3", "faith_in_intuition", "I rely on my intuition to guide me."),
    uni("I2.4", "faith_in_intuition", "I believe in listening to my feelings."),
    uni("I2.5", "faith_in_intuition", "When something feels right, I trust it even before I can explain why."),
    uni("I2.6", "faith_in_intuition", "I'm good at sensing things without being able to put them into words."),
    uni("I2.7", "faith_in_intuition", "My first instinct is usually worth following."),
    uni("I2.8", "faith_in_intuition", "I trust the part of me that just knows, without needing reasons."),
    // CRT (Frederick 2005) — two-choice: pick the answer that requires
    // overriding the intuitive response vs. the intuitive-but-wrong one.
    { id: "CRT1", type: "crt", construct: "override", prompt: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?", correctAnswer: "5 cents", intuitiveAnswer: "10 cents" },
    { id: "CRT2", type: "crt", construct: "override", prompt: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?", correctAnswer: "5 minutes", intuitiveAnswer: "100 minutes" },
    { id: "CRT3", type: "crt", construct: "override", prompt: "In a lake, there is a patch of lily pads. Every day, the patch doubles in size. If it takes 48 days for the patch to cover the entire lake, how long would it take to cover half the lake?", correctAnswer: "47 days", intuitiveAnswer: "24 days" },
    { id: "CRT4", type: "crt", construct: "override", prompt: "If you're running a race and you pass the person in 2nd place, what place are you in now?", correctAnswer: "2nd place", intuitiveAnswer: "1st place" },
    { id: "CRT5", type: "crt", construct: "override", prompt: "A farmer has 17 sheep. All but 9 die. How many are left?", correctAnswer: "9", intuitiveAnswer: "8" },
    // Heuristics battery (Gigerenzer/Luan grounded) — optionA is the one-strong-reason attractor
    heur("H1", "strategy", "Two job offers. Offer A: 20% higher salary, but longer commute, smaller team, less growth. Offer B: lower salary, but short commute, larger team, more growth.", "Offer A", "Offer B"),
    heur("H2", "strategy", "Two apartments. Apartment A: best location, but smaller, noisier, older. Apartment B: further away, but spacious, quiet, modern.", "Apartment A", "Apartment B"),
    heur("H3", "strategy", "Two phones. Phone A: best camera by far, but shorter battery, heavier, pricier. Phone B: decent camera, but long battery, lightweight, cheaper.", "Phone A", "Phone B"),
    heur("H4", "strategy", "Two restaurants. Restaurant A: highest-rated, but far, expensive, long wait. Restaurant B: decent rating, but nearby, affordable, no wait.", "Restaurant A", "Restaurant B"),
    heur("H5", "strategy", "Two vacation spots. Spot A: most beautiful, but expensive, long flight, crowded. Spot B: pleasant, but affordable, short drive, uncrowded.", "Spot A", "Spot B"),
    heur("H6", "strategy", "Two courses. Course A: best professor, but hard grading, early schedule, more work. Course B: decent professor, but easy grading, flexible schedule, less work.", "Course A", "Course B"),
    heur("H7", "strategy", "Two laptops. Laptop A: fastest processor, but heavy, short battery, expensive. Laptop B: adequate processor, but lightweight, long battery, affordable.", "Laptop A", "Laptop B"),
    heur("H8", "strategy", "Two cities to move to. City A: best career opportunities, but high cost, far from family, cold climate. City B: decent opportunities, but affordable, near family, mild climate.", "City A", "City B"),
    heur("H9", "strategy", "Two cars. Car A: best safety rating, but expensive, large, fuel-hungry. Car B: adequate safety, but affordable, compact, fuel-efficient.", "Car A", "Car B"),
    heur("H10", "strategy", "Two streaming services. Service A: best original content, but pricier, ads, fewer movies. Service B: decent originals, but cheaper, ad-free, huge movie library.", "Service A", "Service B"),
  ],
};

function uni(id: string, construct: string, statement: string) {
  return { id, type: "unipolar" as const, scale: 5 as const, construct, statement };
}

function heur(id: string, construct: string, scenario: string, optionA: string, optionB: string) {
  return { id, type: "heuristic" as const, construct, scenario, optionA, optionB };
}
