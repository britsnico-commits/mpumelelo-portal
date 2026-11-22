'use client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const logout = () => {
    localStorage.removeItem('policy')
    localStorage.removeItem('entity')
    router.push('/')
  }

  const nav = [
    { href: '/client/home', label: 'Home', icon: '🏠' },
    { href: '/client/claims', label: 'Claims', icon: '📋' },
    { href: '/client/log-claim', label: 'Log Claim', icon: '➕', fab: true },
    { href: '/client/assets', label: 'Assets', icon: '🚗' },
    { href: '/client/roadside', label: 'Roadside', icon: '🆘' },
    { href: '/client/policy', label: 'Policy', icon: '📄' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Logout */}
      <div className="sticky top-0 z-10 bg-white border-b px-4 py-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-6 w-auto" />
          <span className="text-xs font-bold">Mpumelelo</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gray-500">{typeof window !== 'undefined' ? localStorage.getItem('policy') : ''}</span>
          <button onClick={logout} className="h-7 px-3 bg-gray-900 text-white rounded-full text-xs">Logout</button>
        </div>
      </div>

      {children}

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-20">
        {nav.map(item => {
          const active = pathname === item.href
          if (item.fab) {
            return (
              <Link key={item.href} href={item.href} className="w-12 h-12 bg-[#0E7A7B] text-white rounded-full flex items-center justify-center -mt-6 shadow-lg text-xl">
                {item.icon}
              </Link>
            )
          }
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center text-[10px] ${active ? 'text-[#0E7A7B] font-bold' : 'text-gray-400'}`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
