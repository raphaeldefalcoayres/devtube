'use client'

import { Video, VideoList } from '@/@types'
import { calculateRelevance } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'

interface VideoContextData {
  videos: VideoList
  updateVotes: (videoId: string, positiveVotes: number, negativeVotes: number) => void
  setVideos: (videoList: VideoList) => void
}

export const VideoContext = createContext<VideoContextData>({
  videos: { data: [], total: 0, limit:0 , skip: 0, currentPage: 0, totalPages: 0 },
  updateVotes: () => {},
  setVideos: () => {},
})

export const useVideo = () => useContext(VideoContext)


const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const context = typeof window !== 'undefined' ? localStorage.context : undefined
  const contextJSON = context ? JSON.parse(context) : null
  const [videos, setVideos] = useState<VideoList>(contextJSON || {})

  const updateVotes = (videoId: string, positiveVotes: number, negativeVotes: number) => {
    setVideos((prevVideos: any) => {
      const updatedVideos = prevVideos.data.map((video: Video) => {
        if (video.videoId === videoId) {
          return {
            ...video,
            votes: {
              positiveVotes: positiveVotes,
              negativeVotes: negativeVotes,
              relevance: calculateRelevance(positiveVotes, negativeVotes),
            },
          }
        }
        return video
      })

      localStorage.setItem('context', JSON.stringify(updatedVideos))
      return updatedVideos
    })
  }

  return (
    <VideoContext.Provider value={{ videos, setVideos, updateVotes }}>{children}</VideoContext.Provider>
  )
}

export default VideoProvider
