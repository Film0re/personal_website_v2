export async function useUserData(userName) {
  const query = `
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

  const variables = { userName };

  try {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }

    const { data } = await response.json();
    const user = data.User;
    const currentAnime = data.MediaListCollection.lists;

    // Create a map of media ID to score for quick lookup
    const mediaScoreMap = {};
    currentAnime.forEach(list => {
      list.entries.forEach(entry => {
        mediaScoreMap[entry.media.id] = entry.score;
      });
    });

    // Add score to favorite anime nodes
    user.favourites.anime.edges = user.favourites.anime.edges.map(edge => {
      const anime = edge.node;
      const score = mediaScoreMap[anime.id] || null;
      return {
        ...edge,
        node: {
          ...anime,
          score
        }
      };
    });

    // Process favorite anime
    const favoriteAnime = user.favourites.anime.edges.map(edge => edge.node);

    // Process currently watching anime
    const currentlyWatchingList = currentAnime.find(list => list.name === 'Watching');
    const currentlyWatching = currentlyWatchingList ? currentlyWatchingList.entries.map(entry => ({
      ...entry.media,
      score: entry.score,
      progress: entry.progress,
    })) : [];

    return { user, favoriteAnime, currentlyWatching };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return {
      user: null,
      favoriteAnime: [],
      currentlyWatching: [],
    }
  }
}
