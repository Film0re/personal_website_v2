import { Effect, pipe } from "effect";

export default cachedEventHandler(
  async (event): Promise<BirdsResponse> => {
    const config = useRuntimeConfig(event);
    const query = getQuery(event);

    // back=0 means today, back=1 means yesterday, max 29 days ago
    const back = Math.min(Math.max(Number(query.back) || 0, 0), 29);

    // eBird's `back` param means "include last N days" — we need back+1 to include our target day
    const eBirdBack = back + 1;

    const target = new Date();
    target.setDate(target.getDate() - back);

    // Use London time — eBird obsDt is in the location's local timezone
    const dateStr = target.toLocaleDateString("en-CA", { timeZone: "America/Chicago" });

    const locationId = "L1006498";

    const program = pipe(
      Effect.tryPromise({
        try: () =>
          $fetch<EBirdObservation[]>(`https://api.ebird.org/v2/data/obs/${locationId}/recent`, {
            headers: { "X-eBirdApiToken": config.ebirdApiKey },
            query: { back: eBirdBack, includeProvisional: true },
          }),
        catch: (e) => new Error(`eBird fetch failed: ${e}`),
      }),
      Effect.map((data) =>
        data
          .filter((obs) => obs.obsDt.startsWith(dateStr))
          .toSorted((a, b) => (b.howMany ?? 0) - (a.howMany ?? 0)),
      ),
      Effect.map((sightings) => ({
        date: dateStr,
        location: locationId,
        count: sightings.length,
        sightings,
      })),
    );

    return Effect.runPromise(program);
  },
  {
    maxAge: 60 * 2,
    name: "lochness-birds",
    getKey: (event) => {
      const query = getQuery(event);
      const back = Math.min(Math.max(Number(query.back) || 0, 0), 29);
      const dateStr = new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" });
      return `birds-${dateStr}-back${back}`;
    },
  },
);
