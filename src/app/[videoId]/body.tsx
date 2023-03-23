'use client'

import { Video } from '@/@types'
import { ThumbVideo } from '@/components/ThumbVideo'
import { useVideo } from '@/contexts/video'
import { getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'

const Body = ({ video, relatedVideos }: { video: Video; relatedVideos: Video[] }) => {
  console.log(video)

  const { updateVotes } = useVideo()

  return (
    <div className="flex">
      <div className="w-[70vw]">
        <div className="w-full h-[39.5vw] rounded-xl overflow-hidden">
          <ReactPlayer width={'100%'} height={'100%'} url={`https://www.youtube.com/watch?v=${video.videoId}`} />
        </div>
        <div className="flex w-full p-4 flex-col">
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <div className="flex py-3">
            <div className="relative overflow-hidden w-[48px] h-[44px] rounded-full border-2 border-gray-700">
              <Image fill={true} src={video.channelLogo} alt="channel thumb" />
            </div>
            <div className="w-[82%] pl-2 pr-2">
              <Link href={`/${video.videoId}`} className="line-clamp-2 leading-5" title={video.title}>
                {video.title}
              </Link>
              <div className="opacity-40 leading-5 mt-1">
                {video.channelTitle} <br />
                <small>
                  {formatViewCount(video.viewCount)} Visualizações. {getElapsedTime(video.publishTime)}
                </small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start">
              <button
                onClick={() => updateVotes(video.videoId, video.votes.positiveVotes + 1, video.votes.negativeVotes)}
                className="text-[#2D3668] hover:text-[#4f5a99]"
              >
                <FaChevronUp />
              </button>
              <strong className="font-semibold text-sm" title="Relevancia">
                {video.votes.relevance}
              </strong>
              <button
                onClick={() => updateVotes(video.videoId, video.votes.positiveVotes, video.votes.negativeVotes + 1)}
                className="text-[#682D2D] hover:text-[#aa5959]"
              >
                <FaChevronDown />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col pl-4">
        {relatedVideos.map((relatedVideo: Video) => (
          <ThumbVideo className="w-full" key={relatedVideo.videoId} video={relatedVideo} />
        ))}
      </div>
    </div>
  )
}

export { Body }
