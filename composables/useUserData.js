// composables/useUserData.js

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
      MediaListCollection(userName: $userName, type: ANIME, status: CURRENT) {
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
    return { user: data.User, currentAnime: data.MediaListCollection.lists };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
