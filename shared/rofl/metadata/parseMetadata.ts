import { Effect, Schema } from "effect";

import { MetadataSchema } from "./schema.js";
import {
  MetadataError,
  SchemaError,
} from "../errors.js";

export const parseMetadata = (
  bytes: Uint8Array,
) =>
  Effect.try({
    try: () => {
      const view = new DataView(
        bytes.buffer,
        bytes.byteOffset,
        bytes.byteLength,
      );

      const len = view.getUint32(
        bytes.length - 4,
        true,
      );

      const start = bytes.length - len - 4;

      const json = new TextDecoder().decode(
        bytes.subarray(
          start,
          bytes.length - 4,
        ),
      );

      return JSON.parse(json);
    },

    catch: (cause) =>
      new MetadataError({ cause }),
  }).pipe(
    Effect.flatMap((raw) =>
      Schema.decodeUnknown(
        MetadataSchema,
      )(raw).pipe(
        Effect.mapError(
          (cause) =>
            new SchemaError({ cause }),
        ),
      ),
    ),
  );
