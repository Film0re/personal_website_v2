import { Schema } from "effect";

export const PingsSchema = Schema.Struct({
  allIn: Schema.Number,
  assistMe: Schema.Number,
  basic: Schema.Number,
  command: Schema.Number,
  danger: Schema.Number,
  enemyMissing: Schema.Number,
  enemyVision: Schema.Number,
  getBack: Schema.Number,
  hold: Schema.Number,
  needVision: Schema.Number,
  onMyWay: Schema.Number,
  ping: Schema.Number,
  push: Schema.Number,
  retreat: Schema.Number,
  visionCleared: Schema.Number,
});

export const ParticipantSchema = Schema.Struct({
  riotId: Schema.String,
  tagLine: Schema.String,
  puuid: Schema.String,
  champion: Schema.String,
  kills: Schema.Number,
  deaths: Schema.Number,
  assists: Schema.Number,
  goldEarned: Schema.Number,
  cs: Schema.Number,
  level: Schema.Number,
  team: Schema.Number,
  lane: Schema.String,
  damageToChampions: Schema.Number,
  visionScore: Schema.Number,
  won: Schema.Boolean,
  pings: PingsSchema,
});

export type Pings = typeof PingsSchema.Type;
export type Participant = typeof ParticipantSchema.Type;
