// types/steam.ts
export interface SteamProfile {
  steamid: string
  communityvisibilitystate: number
  profilestate: number
  personaname: string
  commentpermission: number
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  lastlogoff: number
  personastate: number
  realname?: string
  primaryclanid?: string
  timecreated?: number
  personastateflags?: number
  loccountrycode?: string
  locstatecode?: string
  loccityid?: number
}

export interface CSStat {
  name: string
  value: number
}

export interface CSStats {
  steamID: string
  gameName: string
  stats: CSStat[]
  achievements?: any[]
}

export interface RecentGame {
  appid: number
  name: string
  playtime_2weeks: number
  playtime_forever: number
  img_icon_url: string
  img_logo_url: string
}

export interface RecentGames {
  total_count: number
  games: RecentGame[]
}
