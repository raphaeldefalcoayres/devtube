'use client'

import { User, Video } from '@/@types'
// import { publicIp } from 'public-ip'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type UserContextType = {
  user: User
  setUser: (user: User) => void
  addVideo: (video: Video, vote: 'positive' | 'negative') => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

type UserProviderProps = {
  children: ReactNode
}

function UserProvider({ children }: UserProviderProps) {
  const userStorage = typeof window !== 'undefined' ? localStorage.user : undefined
  const userStorageJSON = userStorage ? JSON.parse(userStorage) : null
  const [user, setUser] = useState<User>(userStorageJSON)

  function addVideo(video: Video, vote: 'positive' | 'negative') {
    setUser((prevUser: User) => {
      const videoIndex = prevUser.videos.findIndex((prevVideo) => prevVideo.videoId === video.videoId)
      const updatedVideos = [...prevUser.videos]
      if (videoIndex === -1) {
        updatedVideos.push({ videoId: video.videoId, category: video.category, duration: video.duration, vote })
      } else {
        const existingVote = updatedVideos[videoIndex].vote
        if (existingVote !== vote) {
          updatedVideos[videoIndex] = { ...updatedVideos[videoIndex], vote }
        }
      }
      localStorage.setItem('user', JSON.stringify({ ...prevUser, videos: updatedVideos }))
      return { ...prevUser, videos: updatedVideos }
    })
  }

  const value = { user, setUser, addVideo }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser deve ser usado dentro de um UserProvider')
  }
  return context
}

export { UserProvider, useUser }
