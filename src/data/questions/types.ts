// Question type model matching the research specs exactly.
//
// - SCA & SSA position: 7-point bipolar between two anchor statements (no reverse
//   keying; poleA is always the construct-high pole).
// - SCA trajectory & SSA commitment: same 7-point bipolar format, separate constructs.
// - MMA NFC/FI & PTA factors: 5-point unipolar agree-disagree statements (all
//   engagement-positive, no reverse keying).
// - MMA CRT: behavioral problem with a numeric correct answer (override rate).
// - MMA heuristics: multi-attribute A/B choice classified into decision strategy.
// - PTA stance: forced single-pick among four stances.

export type ConstructId = string;

export type BipolarQuestion = {
  id: string;
  type: "bipolar";
  scale: 7;
  construct: ConstructId;
  stem?: string;
  poleA: string; // construct-high pole (Bright / Outward / Clear / Self-Aligned / waxing / committed)
  poleB: string; // construct-low pole
};

export type UnipolarQuestion = {
  id: string;
  type: "unipolar";
  scale: 5;
  construct: ConstructId;
  statement: string;
};

export type CrtQuestion = {
  id: string;
  type: "crt";
  construct: ConstructId;
  prompt: string;
  correctAnswer: string; // the answer that requires overriding intuition
  intuitiveAnswer: string; // the intuitive-but-wrong answer
};

export type HeuristicQuestion = {
  id: string;
  type: "heuristic";
  construct: ConstructId;
  scenario: string;
  optionA: string; // the one-strong-reason option (take-the-best attractor)
  optionB: string; // the many-good-reasons option (tallying attractor)
};

export type StanceOption = { label: string; value: string };

export type StanceQuestion = {
  id: string;
  type: "stance";
  construct: ConstructId;
  prompt: string;
  options: StanceOption[];
};

export type Question =
  | BipolarQuestion
  | UnipolarQuestion
  | CrtQuestion
  | HeuristicQuestion
  | StanceQuestion;

export type ConstructMeta = {
  key: ConstructId;
  label: string;
  role: "facet" | "axis" | "scale" | "factor" | "trajectory" | "commitment" | "stance";
  parent?: ConstructId; // facet -> axis
};

export type QuestionSet = {
  assessmentKey: string;
  title: string;
  shortName: string;
  duration: string;
  summary: string;
  constructs: ConstructMeta[];
  questions: Question[];
};
