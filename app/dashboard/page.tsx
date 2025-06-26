import { Suspense } from 'react'
import DashboardPage from './dashboardContent' // the file you posted

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-xl text-gray-600 font-medium">Loading amazing venues...</p>
          </div>
        </div>
      }
    >
      <DashboardPage />
    </Suspense>
  )
}

