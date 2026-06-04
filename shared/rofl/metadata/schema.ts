import { Schema } from "effect";

export const MetadataSchema = Schema.Struct({
  gameLength: Schema.Number,
  lastGameChunkId: Schema.Number,
  lastKeyFrameId: Schema.Number,
  statsJson: Schema.String,
});

