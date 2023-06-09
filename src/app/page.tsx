import { Video, VideoList } from '@/@types'
import { HomePage } from './HomePage'

const categoryOrder = ['html', 'css', 'javascript', 'typescript', 'react.js', 'next.js', 'react native', 'node.js']

export default async function PageHome() {
  const videosList: VideoList = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos?page=1&_limit=1001`).then((data) => data.json())
  let sortedVideos: Video[] | undefined

  if(videosList.data){
    sortedVideos = videosList.data.sort((a: { category: string }, b: { category: string }) => {
      const aCategoryIndex = categoryOrder.indexOf(a.category)
      const bCategoryIndex = categoryOrder.indexOf(b.category)
      return aCategoryIndex - bCategoryIndex
    })
  }

  return <HomePage videosList={{ ...videosList , data:sortedVideos!}} />
}
