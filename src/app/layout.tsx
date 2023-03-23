import { Header } from '@/components/Header'
import VideoProvider from '@/contexts/video'
import '@/styles/global.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body>
        <VideoProvider>
          <Header />
          <main className="p-6">{children}</main>
        </VideoProvider>
      </body>
    </html>
  )
}
