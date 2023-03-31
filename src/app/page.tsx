import { Video, VideoList } from '@/@types'
import { HomePage } from './HomePage'

const categoryOrder = ['html', 'css', 'javascript', 'typescript', 'react.js', 'next.js', 'react native', 'node.js']

async function getData({ searchParams }: { searchParams: { search: string } }): Promise<VideoList> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos?page=1&_limit=1001${searchParams.search ? `&title=${searchParams.search}` : ''}`)
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}


export default async function PageHome({ searchParams }: { searchParams: { search: string } }) {
  const videosList = await getData({ searchParams })
  // let sortedVideos: Video[] | undefined

  // if(videosList.data){
  //   sortedVideos = videosList.data.sort((a: { category: string }, b: { category: string }) => {
  //     const aCategoryIndex = categoryOrder.indexOf(a.category)
  //     const bCategoryIndex = categoryOrder.indexOf(b.category)
  //     return aCategoryIndex - bCategoryIndex
  //   })
  // }

  // console.log('sortedVideos', sortedVideos)
  // console.log('teste', { ...videosList , data:sortedVideos!})

  console.log('videoList', videosList)

  return <h1>{JSON.stringify(`${process.env.NEXT_PUBLIC_API_URL}/videos?page=1&_limit=1001${searchParams.search ? `&title=${searchParams.search}` : ''}`)} {JSON.stringify(videosList, null, 2)}</h1>
}
