import { Schema } from "effect";
import { ParticipantPipeline } from "./pipeline";

export const decodeParticipants = (raw: unknown) =>
  Schema.decodeUnknown(Schema.Array(ParticipantPipeline))(raw);
