export const USER_QUERY = gql`
  query GetUserInfo($userName: String!) {
    User(name: $userName) {
      id
      name
      about(asHtml: true)
      avatar {
        large
        medium
      }
      bannerImage
      isFollowing
      isFollower
      isBlocked
      bans
      options {
        titleLanguage
        displayAdultContent
      }
      mediaListOptions {
        scoreFormat
        rowOrder
      }
      favourites {
        anime {
          edges {
            node {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                medium
              }
            }
          }
        }
      }
      statistics {
        anime {
          count
          meanScore
          standardDeviation
          minutesWatched
          episodesWatched
        }
      }
      unreadNotificationCount
      siteUrl
      donatorTier
      donatorBadge
      moderatorRoles
      createdAt
      updatedAt
      previousNames {
        name
        updatedAt
      }
    }
    MediaListCollection(userName: $userName, type: ANIME) {
      lists {
        name
        entries {
          score
          progress
          media {
            id
            episodes
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
            }
          }
        }
      }
    }
  }
`;

export function processUserData(data: any) {
  const user = data.User;
  const lists = data.MediaListCollection.lists;

  // Score lookup map
  const scoreMap: Record<number, number> = {};
  lists.forEach((list: any) => {
    list.entries.forEach((entry: any) => {
      scoreMap[entry.media.id] = entry.score;
    });
  });

  const favoriteAnime = user.favourites.anime.edges.map((edge: any) => ({
    ...edge.node,
    score: scoreMap[edge.node.id] ?? null,
  }));

  const watchingList = lists.find((l: any) => l.name === "Watching");
  const currentlyWatching = watchingList
    ? watchingList.entries.map((entry: any) => ({
        ...entry.media,
        score: entry.score,
        progress: entry.progress,
      }))
    : [];

  return { user, favoriteAnime, currentlyWatching };
}

export const HIGH_SCORE_QUERY = gql`
  query GetHighScoredAnime($userName: String!) {
    MediaListCollection(userName: $userName, type: ANIME) {
      lists {
        entries {
          score
          progress
          media {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            bannerImage
            description(asHtml: false)
            genres
            episodes
            meanScore
            siteUrl
          }
        }
      }
    }
  }
`;
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}


function getUTCDateString(offset) {
  const d = new Date()
  d.setUTCDate(d.getUTCDate() + offset)
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
}

export function pickRandomHighScoredAnime(data: any, dayOffset = -2) {
  const dateStr = getUTCDateString(dayOffset)

  return useState(`featured-anime-${dateStr}`, () => {
    if (!data) return null
    const entries = data.MediaListCollection.lists
      .flatMap((list: any) => list.entries)
      .filter((entry: any) => entry.score >= 8 && entry.media.coverImage?.large)
      .map((entry: any) => ({ ...entry.media, score: entry.score }))
    if (!entries.length) return null
    const seed = dateStr.replace(/-/g, '')
    const index = Math.floor(seededRandom(Number(seed)) * entries.length)
    return entries[index]
  })
}

