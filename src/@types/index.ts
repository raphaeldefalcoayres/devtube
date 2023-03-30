export interface Category {
  name: string
  videos: Video[]
}

export interface Video {
  channelTitle: string
  channelLogo: string
  publishTime: string
  videoId: string
  title: string
  description: string
  thumbnail: string
  duration: number
  viewCount: number
  likeCount: number
  dislikeCount: number
  votes: {
    positiveVotes: number
    negativeVotes: number
    relevance: number
  }
  tags: string[]
  topics: Topics
  category: string
}

export interface Topics {
  '2023': string[]
  curso: string[]
}

export type UserVideo = {
  videoId: string
  category: string
  duration: number
  vote: string
}

export type User = {
  name?: string
  email?: string
  thumb?: string
  videos: UserVideo[]
}
