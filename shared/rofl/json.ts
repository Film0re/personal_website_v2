import { Effect } from "effect";
import { JsonError } from "./errors.js";
export const parseJson = (raw: string) =>
  Effect.try({
    try: () => JSON.parse(raw) as unknown,
    catch: (cause) => new JsonError({ cause }),
  });
