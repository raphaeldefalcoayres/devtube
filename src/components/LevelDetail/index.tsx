import { IPropsComponent } from './types'

export const LevelDetail = ({ label, start, end, extra }: IPropsComponent) => {
  const percentage = (start * 100) / end

  return (
    <div className="flex flex-col mb-2">
      <div className="flex items-center justify-between">
        <strong className="text-xs">{label}</strong>
        <span className="text-xs flex items-center gap-1">
          {start}/{end}
          {extra && <small>{extra}</small>}
        </span>
      </div>
      <div className="flex w-full mt-2 bg-gray-800 rounded-xl">
        <div
          className={`flex w-[${Math.round(
            percentage
          )}%] rounded-xl h-2 bg-blue-900`}
        ></div>
      </div>
    </div>
  )
}
