'use client'

import { Video } from '@/@types'
import { useVideo } from '@/contexts/video'
import { Body } from './body'

export default function Page({ params }: { params: { videoId: string } }) {
  const { videos } = useVideo()
  const video = videos.find((videoFind: Video) => videoFind.videoId === params.videoId)
  const relatedVideos = videos.filter(
    (videoFind: Video) => videoFind.videoId !== params.videoId && videoFind.category === video?.category
  )

  return <Body video={video!} relatedVideos={relatedVideos.splice(1, 4)} />
}
