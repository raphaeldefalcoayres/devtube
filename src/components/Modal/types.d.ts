import { ReactNode } from 'react'

export interface IPropsComponent {
  title: string
  buttonText: string
  children: ReactNode
  buttonAction: () => void
}
