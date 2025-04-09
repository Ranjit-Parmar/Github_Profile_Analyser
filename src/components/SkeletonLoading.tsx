import { Skeleton } from "./ui/skeleton"


const SkeletonLoading = () => {
  return (
    <div className="flex flex-col space-y-3">
    <Skeleton className="h-[125px] w-full bg-gray-300 rounded-xl" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full bg-gray-300" />
      <Skeleton className="h-4 w-full bg-gray-300" />
    </div>
  </div>
  )
}

export default SkeletonLoading