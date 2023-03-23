import { Video } from '@/@types'
import { useVideo } from '@/contexts/video'
import { formatDuration, getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'
import Image from 'next/image'
import Link from 'next/link'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

interface ThumbVideoProps {
  video: Video
  className?: string
}

const ThumbVideo = ({ video, className = '' }: ThumbVideoProps) => {
  const { updateVotes } = useVideo()
  return (
    <div className={`flex flex-col w-[calc(33%-15px)] ${className}`}>
      <Link href={`/${video.videoId}`} className="w-full h-48 overflow-hidden rounded-xl relative">
        <Image fill={true} className="object-cover" src={video.thumbnail} alt="thumb" />
        <div className="absolute z-10 right-2 bottom-2 bg-black/70 rounded-lg text-xs p-1">
          {formatDuration(video.duration)}
        </div>
      </Link>
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
  )
}

export { ThumbVideo }
