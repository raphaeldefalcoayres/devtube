import Link from 'next/link'
import Image from 'next/image'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { tagsDefine } from '@/constants'
import { useUser, useVideo } from '@/contexts'
import { formatDuration, getElapsedTime } from '@/utils'
import { formatViewCount } from '@/utils/buildCategories'

import { IPropsComponent } from './types'

const ThumbVideo = ({ video, className = '' }: IPropsComponent) => {
  const { updateVotes, searchVideos } = useVideo()
  const { addVideo, user } = useUser()

  let tagsSelected: string[] = []

  video.tags.forEach((tag) => {
    if (tagsDefine.includes(tag.toLowerCase())) {
      tagsSelected.push(tag.toUpperCase())
    }
  })

  if (tagsSelected.length === 0)
    tagsSelected = Object.values(video.topics).flatMap((value) => value)

  const isWatch = user?.videos?.some(
    (userVideo) => userVideo.videoId === video.videoId
  )

  return (
    <div className={`flex flex-col ${className}`}>
      <Link
        href={`/${video.videoId}`}
        className="w-full h-52 overflow-hidden rounded-xl relative"
      >
        <Image
          fill={true}
          className="object-cover"
          src={video.thumbnail}
          alt="thumb"
        />
        <div className="absolute z-10 right-2 bottom-2 bg-black/70 rounded-lg text-xs p-1">
          {formatDuration(video.duration)}
        </div>
        {isWatch && (
          <div className="absolute z-10 left-2 top-2 bg-black/70 rounded-lg text-xs p-1">
            JÁ ASSISTI
          </div>
        )}
        <div
          className="absolute bottom-2 left-2 flex gap-2"
          title={tagsSelected.join(', ')}
        >
          {tagsSelected.splice(1, 4).map((tag) => {
            return (
              <Link
                href={`/?search=${tag}`}
                onClick={() => searchVideos(tag)}
                key={tag}
                className="bg-[#020305]/70 rounded-xl py-1 px-2 text-xs"
              >
                {tag.toUpperCase()}
              </Link>
            )
          })}
        </div>
      </Link>
      <div className="flex py-3">
        <div className="relative overflow-hidden w-[48px] h-[48px] rounded-full border-2 border-gray-700">
          <Image fill={true} src={video.channelLogo} alt="channel thumb" />
        </div>
        <div className="w-[82%] pl-2 pr-2">
          <Link
            href={`/${video.videoId}`}
            className="line-clamp-2 leading-5"
            title={video.title}
          >
            {video.title}
          </Link>
          <div className="opacity-40 leading-5 mt-1">
            {video.channelTitle} <br />
            <small>
              {formatViewCount(video.viewCount)} Visualizações.{' '}
              {getElapsedTime(video.publishTime)}
            </small>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start">
          <button
            onClick={() => {
              updateVotes(
                video.videoId,
                video.votes.positiveVotes + 1,
                video.votes.negativeVotes
              )
              addVideo(video, 'positive')
            }}
            className="text-[#2D3668] hover:text-[#4f5a99]"
            disabled={isWatch}
          >
            <FaChevronUp className="w-6 h-6" />
          </button>
          <strong className="font-semibold text-sm" title="Relevancia">
            {video.votes.relevance}
          </strong>
          <button
            onClick={() => {
              updateVotes(
                video.videoId,
                video.votes.positiveVotes,
                video.votes.negativeVotes + 1
              )
              addVideo(video, 'negative')
            }}
            className="text-[#682D2D] hover:text-[#aa5959]"
            disabled={isWatch}
          >
            <FaChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export { ThumbVideo }
