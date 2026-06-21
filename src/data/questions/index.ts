export type {
  BipolarQuestion,
  ConstructMeta,
  CrtQuestion,
  HeuristicQuestion,
  Question,
  QuestionSet,
  StanceOption,
  StanceQuestion,
  UnipolarQuestion,
} from "./types";

import { solstice } from "./solstice";
import { turing } from "./turing";
import { pride } from "./pride";
import { passage } from "./passage";
import type { QuestionSet } from "./types";

export const QUESTION_SETS: Record<string, QuestionSet> = {
  solstice,
  turing,
  pride,
  passage,
};

export function getQuestionSet(key: string): QuestionSet | undefined {
  return QUESTION_SETS[key];
}

export const ASSESSMENT_KEYS = Object.keys(QUESTION_SETS);
