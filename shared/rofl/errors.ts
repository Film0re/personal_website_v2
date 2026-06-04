import { Data } from "effect";
import type { ParseError } from "effect/Cron";

/**
 * File read failure (bad path, permission, etc)
 */
export class FileError extends Data.TaggedError(
  "FileError",
)<{ cause: unknown }> {}

/**
 * Raw metadata extraction failed (binary parsing issue)
 */
export class MetadataError extends Data.TaggedError(
  "MetadataError",
)<{ cause: unknown }> {}

/**
 * JSON parse failure
 */
export class JsonError extends Data.TaggedError(
  "JsonError",
)<{ cause: unknown }> {}

/**
 * Schema validation failure (Effect Schema)
 */
export class SchemaError extends Data.TaggedError(
  "SchemaError",
)<{ cause: unknown }> {}

export type ReplayError =
  | FileError
  | MetadataError
  | JsonError
  | SchemaError
  | ParseError

