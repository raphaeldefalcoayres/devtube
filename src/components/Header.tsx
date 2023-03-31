'use client'

import { useUser } from '@/contexts/user'
import { useVideo } from '@/contexts/video'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaSearch, FaYoutube } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'

const Header = () => {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [search, setSearch] = useState(searchQuery || '')
  const [searchInput, setSearchInput] = useState(searchQuery || '')
  const router = useRouter()
  const pathname = usePathname()
  const { videos } = useVideo()
  const { user, setUser } = useUser()
  const [totalVideos, setTotalVideos] = useState(0)

  useEffect(() => {
    router.push(pathname + '?search=' + search)
    setTotalVideos(videos.total)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, videos])

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery)
      setSearchInput(searchQuery)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery])

  function handleFilter() {
    setSearch(searchInput)
  }

  function handleFilterKeyDown(event: any) {
    if (event.keyCode === 13) {
      setSearch(searchInput)
    }
  }

  function handleLogout() {
    localStorage.removeItem('user')
    setUser({ videos: [] })
  }

  return (
    <div className="fixed w-full flex flex-col z-40">
      <div className="w-full text-xs font-thin text-white bg-blue-900 py-1 text-center">
        Este é um site <b>beta</b> com alguns dados de vídeos youtube de 2020 a 2023 de categorias como HTML, CSS, Javascript,
        Typescript e outros.
      </div>
      <div className="w-full flex items-center justify-between py-3 px-6 bg-[#070913]">
        <Link href={'/'} className="flex gap-2 items-center">
          <FaYoutube className="w-10 h-10 text-[#394894]" /> <strong className="text-xl md:flex hidden">DEVTUBE</strong>
        </Link>
        <div className="flex relative md:w-[30%] items-center gap-2">
          <div className="flex items-center gap-1 md:w-32 bg-blue-900 h-fit rounded-xl px-2 md:px-4 py-1 text-xs md:text-base">
            <div>{totalVideos}</div>
            <small>videos</small>
          </div>
    
          <input
            type="text"
            value={searchInput}
            className="w-full bg-[#020305] px-4 py-1 md:py-2 pr-4 rounded-xl"
            placeholder="Busque aqui..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleFilterKeyDown}
          />
          <button
            title="clique para buscar"
            className="absolute right-0 top-0 bg-blue-900 hover:bg-blue-800 px-2 md:px-4 h-full rounded-t-xl rounded-b-xl"
            onClick={handleFilter}
          >
            <FaSearch className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
        <div className="flex gap-3">
          {user?.name && (
            <>
              <div className="relative rounded-full w-10 h-10 overflow-hidden">
                <Image fill src={user.thumb!} alt="foto de perfil no header" />
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1">
                <FiLogOut /> Sair
              </button>
            </>
          )}
          {/* {!user.name && <button>Entrar</button>} */}
        </div>
      </div>
    </div>
  )
}

export { Header }
