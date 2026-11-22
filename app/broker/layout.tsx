'use client'
import { useRouter } from 'next/navigation'
export default function BrokerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const logout = () => { localStorage.clear(); router.push('/') }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white px-4 py-2 flex justify-between items-center">
        <span className="text-sm font-bold">Broker Admin</span>
        <button onClick={logout} className="h-7 px-3 bg-white text-black rounded-full text-xs">Logout</button>
      </div>
      {children}
    </div>
  )
}
