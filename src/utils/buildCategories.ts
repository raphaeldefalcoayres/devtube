import { Category, Video } from '@/@types'

let ITEMS_PER_PAGE: number

if (typeof window !== 'undefined') {
  if (window.innerWidth > 1920) {
    ITEMS_PER_PAGE = 6 // 2 XL size
  } else if (window.innerWidth === 1920) {
    ITEMS_PER_PAGE = 4 // XL size
  } else {
    ITEMS_PER_PAGE = 3 // MD size (default)
  }
}

export const buildCategories = (videos: Video[]): Category[] => {
  const categoriesMap: Record<string, Video[]> = {}
  const categories: Category[] = []

  videos.forEach((video) => {
    const categoryName = video.category || 'Outros'

    if (!categoriesMap[categoryName]) {
      categoriesMap[categoryName] = []
    }

    categoriesMap[categoryName].push(video)
  })

  for (const categoryName in categoriesMap) {
    const videos = categoriesMap[categoryName]
    const pageCount = Math.ceil(videos.length / ITEMS_PER_PAGE)

    for (let i = 0; i < pageCount; i++) {
      const startIndex = i * ITEMS_PER_PAGE
      const endIndex = startIndex + ITEMS_PER_PAGE
      const slicedVideos = videos.slice(startIndex, endIndex)

      categories.push({
        name: categoryName,
        videos: slicedVideos,
      })
    }
  }

  return categories
}
export const formatViewCount = (viewCount: number): string => {
  if (viewCount < 1000) {
    return viewCount.toString()
  }

  if (viewCount < 1000000) {
    const thousands = Math.floor(viewCount / 1000)
    const rest = viewCount % 1000

    return `${thousands}${rest ? `.${Math.floor(rest / 100)}k` : 'k'}`
  }

  const millions = Math.floor(viewCount / 1000000)

  return `${millions}${millions < 100 ? `.${Math.floor((viewCount % 1000000) / 100000)}M` : 'M'}`
}
