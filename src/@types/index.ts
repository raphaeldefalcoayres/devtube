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
  dislikeCount: any
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

export interface CarouselProps {
  data: Video[]
  title: string
}
