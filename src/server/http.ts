// Shared HTTP helpers for the REST API.
//
// Every server route handler stays thin and consistent by routing through
// here: one JSON-parse path, one error envelope, one ok envelope. Domain
// validation still lives with each service (results-service / ai-analysis) —
// this module is only about the HTTP wire shape.

export type Json = Record<string, unknown> | unknown[];

/** Parse a request body as JSON. Never throws — failures become a 400 envelope. */
export async function parseJsonBody(
  request: Request,
): Promise<{ ok: true; data: Json } | { ok: false; error: string }> {
  try {
    const data = (await request.json()) as Json;
    return { ok: true, data };
  } catch {
    return { ok: false, error: "Invalid JSON body" };
  }
}

/** Consistent error envelope: `{ "error": <message> }` with the given status. */
export function errorResponse(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

/** Consistent success envelope with an explicit status (default 200). */
export function okResponse(data: unknown, status = 200): Response {
  return Response.json(data, { status });
}

/**
 * Run a service call that may throw a validation Error. On throw, map it to a
 * 400 error envelope with the message intact. Keeps handlers free of repeated
 * try/catch boilerplate.
 */
export async function withValidation<T>(
  fn: () => T | Promise<T>,
): Promise<T | Response> {
  try {
    return await fn();
  } catch (err) {
    return errorResponse(
      err instanceof Error ? err.message : "Invalid payload",
      400,
    );
  }
}
