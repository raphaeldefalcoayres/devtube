'use client'

import { Video } from '@/@types'
import { calculateRelevance } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'

interface VideoContextData {
  videos: Video[]
  updateVotes: (videoId: string, positiveVotes: number, negativeVotes: number) => void
  setVideos: (videos: Video[]) => void
}

export const VideoContext = createContext<VideoContextData>({
  videos: [],
  updateVotes: () => {},
  setVideos: () => {},
})

export const useVideo = () => useContext(VideoContext)

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const context = localStorage.getItem('context')
  const contextJSON = context ? JSON.parse(context) : null
  const [videos, setVideos] = useState<Video[]>(contextJSON || [])

  console.log('videos', videos)

  useEffect(() => {
    if (videos.length <= 0) {
      fetch('http://localhost:3333/videos?page=1&_limit=1001')
        .then((data) => data.json())
        .then((data) => setVideos(data))
    }
  }, [])

  const updateVotes = (videoId: string, positiveVotes: number, negativeVotes: number) => {
    setVideos((prevVideos) => {
      const updatedVideos = prevVideos.map((video) => {
        if (video.videoId === videoId) {
          console.log('positiveVotes', positiveVotes)
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
      console.log('aki')
      localStorage.setItem('context', JSON.stringify(updatedVideos))
      return updatedVideos
    })
  }

  return <VideoContext.Provider value={{ videos, setVideos, updateVotes }}>{children}</VideoContext.Provider>
}

export default VideoProvider
