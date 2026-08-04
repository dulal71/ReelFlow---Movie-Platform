interface SectionHeaderProps {
  title: string
  onViewAll?: () => void
}

function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          {title}
        </h2>
        <div className="mt-3 h-[3px] w-16 rounded-full bg-red-600" />
      </div>

      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-widest px-5 py-2.5 rounded-md transition-colors cursor-pointer"
        >
          VIEW ALL
        </button>
      )}
    </div>
  )
}

export default SectionHeader
