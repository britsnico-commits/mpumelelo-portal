
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const tabs = [{href:'/client/home', label:'Home', icon:'🏠'},{href:'/client/claims', label:'Claims', icon:'📋'},{href:'/client/log-claim', label:'Log Claim', icon:'➕'},{href:'/client/assets', label:'Assets', icon:'🚗'},{href:'/client/roadside', label:'Roadside', icon:'🆘'},{href:'/client/policy', label:'Policy', icon:'📄'}]
  return (<div className="pb-20"><div className="h-14 bg-white border-b flex items-center px-4 justify-between sticky top-0 z-10"><div className="font-bold">Mpumelelo Services</div><div className="text-xs text-gray-500">Client Portal</div></div>{children}<div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-2 z-20">{tabs.map(t=>(<Link key={t.href} href={t.href} className={`flex flex-col items-center text-[11px] ${path===t.href?'text-[#0E7A7B] font-bold':'text-gray-400'}`}><span className="text-lg">{t.icon}</span>{t.label}</Link>))}</div></div>)
}
