import { Effect } from "effect";
import { Schema } from "effect";

import { parseMetadata } from "../metadata/parseMetadata.js";
import { decodeParticipants } from "../participant/decode.js";
import { parseJson } from "../json.js";
import { ParticipantSchema } from "../participant/schema.js";

export const ReplaySchema = Schema.Struct({
  gameLength: Schema.Number,
  lastGameChunkId: Schema.Number,
  lastKeyFrameId: Schema.Number,
  participants: Schema.Array(ParticipantSchema),
});

export type Replay = typeof ReplaySchema.Type;

export const parseReplay = (bytes: Uint8Array) =>
  Effect.gen(function* () {
    const metadata = yield* parseMetadata(bytes);
    const statsRaw = yield* parseJson(metadata.statsJson);
    const participants = yield* decodeParticipants(statsRaw);

    return {
      gameLength: Math.round(metadata.gameLength / 1000),
      lastGameChunkId: metadata.lastGameChunkId,
      lastKeyFrameId: metadata.lastKeyFrameId,
      participants,
    } satisfies Replay;
  });
