// Anonymous assessment results, stored for future analysis, auditing, and
// result sharing via shareable links. No personally identifying information is
// stored; results are keyed by an unguessable share token.
//
// Design notes:
// - `share_token` is the public share URL key (cryptographically random). It is
//   the only identifier ever exposed to clients. The integer id is internal.
// - `answers` stores the per-question raw responses as JSON. Storing the raw
//   answers (not just the derived scores) supports future re-analysis if the
//   scoring model is revised.
// - `result` stores the full derived result snapshot (type, scores, geometry,
//   notes) so a shared link renders deterministically even if scoring changes.
// - `assessment_key` is denormalized for indexing/filtering by assessment.
// - Timestamps support auditing and cleanup. `completed_at` is null until the
//   assessment is finished; only completed results are shareable.

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const results = sqliteTable("results", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  // 32-char URL-safe random token. The public share key.
  shareToken: text("share_token").notNull().unique(),
  // Which assessment: solstice | turing | pride | passage.
  assessmentKey: text("assessment_key").notNull(),
  // Result type label, denormalized for fast listing/filtering.
  resultType: text("result_type").notNull(),
  // Raw per-question answers as JSON: { [questionId]: number | string }.
  answers: text("answers").notNull(),
  // Full derived result snapshot as JSON (AssessmentResult minus transient fields).
  result: text("result").notNull(),
  // Optional, user-supplied, never required. Supports a friendlier share page.
  nickname: text("nickname"),
  createdAt: integer("created_at").notNull(),
  completedAt: integer("completed_at"),
});

export type ResultRow = typeof results.$inferSelect;
export type NewResultRow = typeof results.$inferInsert;
