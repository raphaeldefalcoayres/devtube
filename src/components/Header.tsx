import Link from 'next/link'
import { FaSearch, FaYoutube } from 'react-icons/fa'

const Header = () => {
  return (
    <div className="flex items-center justify-between py-3 px-6 bg-[#070913]">
      <Link href={'/'} className="flex gap-2 items-center">
        <FaYoutube className="w-10 h-10 text-[#394894]" /> <strong className="text-xl">DEVTUBE</strong>
      </Link>
      <div className="flex relative w-[30%]">
        <input type="text" className="w-full bg-[#020305] px-4 py-2 pr-4 rounded-xl" placeholder="Busque aqui..." />
        <FaSearch className="w-5 h-5 absolute right-3 top-3" />
      </div>
      <div>Entrar</div>
    </div>
  )
}

export { Header }
