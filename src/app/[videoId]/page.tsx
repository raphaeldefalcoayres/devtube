'use client'

import { Video } from '@/@types'
import { useVideo } from '@/contexts/video'
import { Body } from './body'

export default function Page({ params }: { params: { videoId: string } }) {
  //   const video = await fetch(`http://localhost:3333/videos?videoId=${params.videoId}`).then((data) => data.json())
  //   const relatedVideos = await fetch(`http://localhost:3333/videos?category=${video[0].category}&_limit=5`).then(
  //     (data) => data.json()
  //   )

  const { videos } = useVideo()

  const video = videos.find((videoFind: Video) => videoFind.videoId === params.videoId)
  const relatedVideos = videos.filter(
    (videoFind: Video) => videoFind.videoId !== params.videoId && videoFind.category === video?.category
  )
  console.log(videos)
  console.log(video)
  console.log(relatedVideos)
  return <Body video={video!} relatedVideos={relatedVideos.splice(1, 4)} />
}
