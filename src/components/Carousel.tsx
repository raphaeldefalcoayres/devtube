'use client'

import { CarouselProps, Category, Video } from '@/@types'
import { ThumbVideo } from '@/components/ThumbVideo'
import { buildCategories } from '@/utils/buildCategories'
import { Suspense, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import Loading from './Spinner'
import Spinner from './Spinner'

const Carousel = ({ data, title }: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [thumbsVideosData, setThumbsVideosData] = useState<Category[]>([])

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    const categories = buildCategories(data)
    setThumbsVideosData(categories)
    setHasNextPage(currentPage < categories.length - 1)
    setHasPreviousPage(currentPage > 0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="mb-4 font-semibold text-xl uppercase">{title}</h2>
        <div>
          <button className="disabled:opacity-50" disabled={!hasPreviousPage} onClick={handlePreviousPage}>
            <FaChevronLeft className="w-6 h-6" />
          </button>
          <button className="disabled:opacity-50" disabled={!hasNextPage} onClick={handleNextPage}>
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="flex w-full flex-wrap gap-4 h-80 relative">
        <div className='absolute w-full h-full flex items-center justify-center'><Spinner /></div>
        {thumbsVideosData[currentPage]?.videos.map((video: Video) => (
          <ThumbVideo className="w-[calc(100%-15px)] md:w-[calc(50%-15px)] lg:w-[calc(33%-15px)] 3xl:w-[calc(25%-15px)] 4xl:w-[calc(16.7%-15px)]" key={video.videoId} video={video} />
        ))}
      </div>
    </div>
  )
}

export { Carousel }
