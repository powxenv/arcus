import {
  getEncryptedItem,
  removeStoredItem,
  setEncryptedItem,
} from "./crypto-storage";

const PROGRESS_KEY = "arcus:progress";

export type AssessmentProgress = {
  assessmentKey: string;
  answers: Record<string, number | string>;
  currentIndex: number;
  total: number;
  startedAt: number;
  updatedAt: number;
};

export async function loadProgress(): Promise<AssessmentProgress | null> {
  return getEncryptedItem<AssessmentProgress>(PROGRESS_KEY);
}

export async function saveProgress(progress: AssessmentProgress): Promise<void> {
  await setEncryptedItem(PROGRESS_KEY, { ...progress, updatedAt: Date.now() });
}

export function clearProgress(): void {
  removeStoredItem(PROGRESS_KEY);
}

export function isProgressComplete(progress: AssessmentProgress): boolean {
  return progress.currentIndex >= progress.total;
}
