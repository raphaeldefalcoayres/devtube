'use client'

import { Video } from '@/@types'
import { calculateRelevance } from '@/utils'
import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from './user'

interface VideoContextData {
  videos: Video[]
  updateVotes: (
    videoId: string,
    positiveVotes: number,
    negativeVotes: number
  ) => void
  setVideos: (videos: Video[]) => void
  searchVideos: (search: string) => void
}

export const VideoContext = createContext({} as VideoContextData)

export const useVideo = () => useContext(VideoContext)

const VideoProvider = ({ children }: { children: React.ReactNode }) => {
  const context =
    typeof window !== 'undefined' ? localStorage.context : undefined
  const contextJSON = context ? JSON.parse(context) : null
  const [videos, setVideos] = useState<Video[]>(contextJSON || [])
  const [bkpVideos, setBkpVideos] = useState<Video[]>(contextJSON || [])
  const { user } = useUser()

  useEffect(() => {
    if (videos.length <= 0) {
      console.log(process.env.NEXT_PUBLIC_API_URL)
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos?page=1&_limit=1001`)
        .then((data) => data.json())
        .then((data) => {
          setVideos(data)
          setBkpVideos(data)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateVotes = (
    videoId: string,
    positiveVotes: number,
    negativeVotes: number
  ) => {
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

      localStorage.setItem('context', JSON.stringify(updatedVideos))
      return updatedVideos
    })
  }

  const searchVideos = (search: string) => {
    const filteredVideos = bkpVideos.filter((video: Video) => {
      // Verifica se o título, descrição ou tags do vídeo contêm a string de busca
      const isMatch =
        video.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        video.description.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        video.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )

      // Verifica se o usuário já assistiu a esse vídeo
      const isWatched = user?.videos?.some((watchedVideo) => {
        return watchedVideo.videoId === video.videoId
      })

      // Retorna true apenas se o vídeo não foi assistido e satisfaz a condição de busca
      return search === 'Já assisti' ? isWatched : isMatch
    })

    setVideos(filteredVideos)
  }

  return (
    <VideoContext.Provider
      value={{ videos, setVideos, searchVideos, updateVotes }}
    >
      {children}
    </VideoContext.Provider>
  )
}

export { VideoProvider }
