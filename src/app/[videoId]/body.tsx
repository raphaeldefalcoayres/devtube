'use client'

import { Video } from '@/@types'
import { ThumbVideo } from '@/components/ThumbVideo'
import { useUser } from '@/contexts/user'
import { useVideo } from '@/contexts/video'
import { getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import ReactPlayer from 'react-player'

const Body = ({ video, relatedVideos }: { video: Video; relatedVideos: Video[] }) => {
  console.log(video)
  const [showMore, setShowMore] = useState(false)
  const { updateVotes } = useVideo()
  const { user } = useUser()
  const isWatch = user?.videos?.some((userVideo) => userVideo.videoId === video.videoId)

  return (
    <div className="flex">
      <div className="w-[70vw]">
        <div className="w-full h-[39.5vw] rounded-xl overflow-hidden">
          {isWatch && <div className="absolute z-10 left-2 top-2 bg-black/70 rounded-lg text-xs p-1">JÁ ASSISTI</div>}
          <ReactPlayer width={'100%'} height={'100%'} url={`https://www.youtube.com/watch?v=${video.videoId}`} />
        </div>
        <div className="flex w-full p-4 flex-col">
          <h2 className="text-xl font-semibold">{video.title}</h2>
          <div className="flex pt-3 pb-2">
            <div className="relative overflow-hidden w-[48px] h-[44px] rounded-full border-2 border-gray-700">
              <Image fill={true} src={video.channelLogo} alt="channel thumb" />
            </div>
            <div className="w-fit px-2">
              <div className="opacity-40 leading-5 mt-1">
                {video.channelTitle} <br />
                <small>
                  {formatViewCount(video.viewCount)} Visualizações. {getElapsedTime(video.publishTime)}
                </small>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start -mt-3">
              <button
                onClick={() => updateVotes(video.videoId, video.votes.positiveVotes + 1, video.votes.negativeVotes)}
                className="text-[#2D3668] hover:text-[#4f5a99]"
              >
                <FaChevronUp className="w-6 h-6" />
              </button>
              <strong className="font-semibold text-sm" title="Relevancia">
                {video.votes.relevance}
              </strong>
              <button
                onClick={() => updateVotes(video.videoId, video.votes.positiveVotes, video.votes.negativeVotes + 1)}
                className="text-[#682D2D] hover:text-[#aa5959]"
              >
                <FaChevronDown className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className={`${!showMore ? 'line-clamp-3' : ''} leading-6`}>{video.description}</div>
          <button className="text-left font-semibold" onClick={() => setShowMore(!showMore)}>
            Ver {!showMore ? 'mais' : 'menos'}
          </button>
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
