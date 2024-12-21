// Loading.tsx
import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-16 border-b">
        <Skeleton className="h-full" />
      </div>
      
      <div className="max-w-7xl mx-auto py-4 px-4">
        <Skeleton className="h-10 w-40" />
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2">
            <Skeleton className="aspect-square rounded-lg" />
          </div>

          <div className="lg:w-1/2 space-y-6">
            <div>
              <Skeleton className="h-10 w-2/3" />
              <div className="flex items-center gap-4 mt-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>

            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-24 w-full" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-20" />
              <div className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 w-12" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>

            <Skeleton className="h-48 w-full" />
          </div>
        </div>
      </main>
    </div>
  )
}