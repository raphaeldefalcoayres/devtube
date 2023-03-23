'use client'

import { Video } from '@/@types'
import { Carousel } from '@/components/Carousel'
import { useVideo } from '@/contexts/video'

export default function PageHome() {
  const { videos } = useVideo()

  console.log(videos)

  // Define a lista de categorias na ordem desejada
  const categoryOrder = ['HTML', 'CSS', 'Javascript', 'Typescript', 'React.js', 'Next.js', 'React Native', 'Node.js']

  // Ordena os vídeos por categoria na ordem definida
  const sortedVideos = videos.sort((a: { category: string }, b: { category: string }) => {
    const aCategoryIndex = categoryOrder.indexOf(a.category)
    const bCategoryIndex = categoryOrder.indexOf(b.category)
    return aCategoryIndex - bCategoryIndex
  })

  // Agrupar vídeos por categoria
  const videosByCategory = sortedVideos.reduce((acc: { [x: string]: any[] }, video: Video) => {
    const category = video.category || 'Outros'
    const durationMinutes = Math.floor(video.duration)
    if (durationMinutes > 1) {
      // adiciona a verificação de duração
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(video)
    }
    return acc
  }, {} as Record<string, Video[]>)

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        {Object.keys(videosByCategory).map((category) => (
          <Carousel key={category} data={videosByCategory[category]} title={category} />
        ))}
      </div>
      <div className="w-64 h-full rounded-xl bg-[#070913]"></div>
    </div>
  )
}
