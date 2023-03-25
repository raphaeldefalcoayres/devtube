'use client'

import { User, Video } from '@/@types'
import { Carousel } from '@/components/Carousel'
import { LevelDetail } from '@/components/LevelDetail'
import MyModal from '@/components/Modal'
import { useUser } from '@/contexts/user'
import { useVideo } from '@/contexts/video'
import { calculateLevel, levels } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { TbHexagonFilled } from 'react-icons/tb'

export default function PageHome() {
  const [showModal, setShowModal] = useState(false)
  const [githubInput, setGithubInput] = useState('')
  const { videos } = useVideo()
  const { user, setUser } = useUser()

  console.log(user)
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

  let totalDuration = 0
  const durationByCategory: Record<string, number> = {}

  user?.videos?.forEach((video) => {
    // somar a duração de cada vídeo
    totalDuration += video.duration

    // contagem de soma da duração por categoria
    const category = video.category
    if (durationByCategory[category]) {
      durationByCategory[category] += video.duration
    } else {
      durationByCategory[category] = video.duration
    }
  })

  // console.log(`Total de duração geral: ${totalDuration}`)
  // console.log(`Total de duração por categoria:`, durationByCategory)

  const nextLevel = levels[calculateLevel(totalDuration)].threshold + 1

  async function handleLogin() {
    try {
      const response = await fetch(`https://api.github.com/users/${githubInput}`, {
        headers: {
          Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}`,
        },
      })

      if (response.ok) {
        const data = await response.json()

        const user: User = {
          name: data.name,
          email: data.email,
          thumb: data.avatar_url,
          videos: [],
        }

        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
      } else {
        console.error('Failed to fetch GitHub user information.')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const uniqueCategories: any = []

  // Percorre todos os vídeos do usuário e adiciona a categoria no Set de categorias únicas
  user?.videos?.forEach((video) => {
    if (!uniqueCategories.includes(video.category)) uniqueCategories.push(video.category)
  })

  return (
    <>
      {showModal && (
        <MyModal title="Logue com github" buttonText="Entrar" buttonAction={handleLogin}>
          <input
            type="text"
            className="w-full bg-[#020305] px-4 py-2 pr-4 rounded-xl"
            placeholder="Seu username do github"
            onChange={(e) => setGithubInput(e.target.value)}
          />
        </MyModal>
      )}
      <div className="flex h-full">
        <div className="flex w-full md:w-[calc(100%-256px)] flex-col">
          {Object.keys(videosByCategory).map((category) => (
            <Carousel key={category} data={videosByCategory[category]} title={category} />
          ))}
        </div>
        <div className="hidden fixed right-0 w-64 h-[calc(100vh-100px)] md:flex flex-col items-center justify-start p-6 rounded-xl bg-[#070913]">
          {user?.videos && (
            <>
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image fill src={user.thumb!} alt="foto de perfil" />
              </div>
              <strong className="mt-2">{user.name}</strong>
              <div className="flex items-center gap-2 mt-3">
                <div className="font-semibold text-gray-400">Level</div>
                <div className="relative w-20 h-20">
                  <TbHexagonFilled className=" text-gray-800 w-20 h-20" />
                  <TbHexagonFilled className=" text-gray-800/30 w-24 h-24 rotate-45 absolute -top-2 -left-2" />
                  <TbHexagonFilled className=" text-gray-800/30 w-24 h-24 rotate-12 absolute -top-2 -left-2" />
                  <div className="absolute text-2xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-semibold">
                    {calculateLevel(totalDuration)}
                  </div>
                </div>
              </div>
              <div className="flex flex-col mt-3 w-full">
                <LevelDetail label="Videos assistidas" start={user.videos.length} end={videos.length} />
                <LevelDetail
                  label="Horas assistidas"
                  extra="horas"
                  start={Number(totalDuration.toFixed(2))}
                  end={Number(nextLevel.toFixed(2))}
                />
                {Object.entries(durationByCategory).map(([category, duration]) => {
                  const start = duration
                  const end = totalDuration
                  return (
                    <LevelDetail
                      key={category}
                      label={category}
                      start={Number(start.toFixed(2))}
                      end={Number(end.toFixed(2))}
                      extra="horas"
                    />
                  )
                })}
              </div>
              <h3 className="mt-3">Categorias assistidas</h3>
              <div className="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <Link href={`?search=Já assisti`} className="bg-blue-900 rounded-xl py-1 px-2 text-xs">
                  Já assisti
                </Link>
                {uniqueCategories.map((category: string) => (
                  <Link
                    href={`?search=${category}`}
                    className="bg-blue-900 rounded-xl py-1 px-2 text-xs"
                    key={category}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </>
          )}

          {!user?.videos && (
            <div className="flex flex-col items-center justify-center my-auto">
              <h3 className="text-lg text-center">Faça login pra acompanhar sua evolução 🚀</h3>
              <button className="bg-blue-500 rounded-xl px-4 py-1 text-white mt-3" onClick={() => setShowModal(true)}>
                Entrar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
