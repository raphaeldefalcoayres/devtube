import { Video } from '@/@types'
import { Body } from './body'

export default async function Page({ params }: { params: { videoId: string } }) {
  const { video, relatedVideos }: { video: Video, relatedVideos: Video[] } = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/videos/${params.videoId}`, { next: { revalidate: 60 * 60 * 24 }  }).then((data) => data.json())

  return <Body video={video} relatedVideos={relatedVideos} />
}
