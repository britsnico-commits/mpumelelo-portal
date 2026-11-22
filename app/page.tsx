
'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [policy, setPolicy] = useState('POL-MUN-4401')
  const [password, setPassword] = useState('1234')
  const [role, setRole] = useState<'client'|'broker'>('client')

  const login = async () => {
    if (role==='broker') { window.location.href='/broker/dashboard'; return }
    const { data } = await supabase.from('policies').select('*').eq('policy_number', policy).single()
    if (data) { localStorage.setItem('policy', policy); window.location.href='/client/home' }
    else alert('Policy not found - try POL-MUN-4401 (Tshwane) or use Broker login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] p-6 shadow-lg border">
        <div className="flex items-center gap-3 mb-2"><div className="w-10 h-10 rounded-full bg-[#0E7A7B] text-white flex items-center justify-center font-bold">M</div><div><div className="font-bold text-[#0F2B3C]">Mpumelelo Services</div><div className="text-xs text-gray-500">Success in isiZulu • Since 2006 • 100% Black Owned</div></div></div>
        <h1 className="text-xl font-bold mt-6">Welcome to Portal</h1>
        <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>setRole('client')} className={`h-11 rounded-xl border ${role==='client'?'bg-[#0F2B3C] text-white':''}`}>Client</button><button onClick={()=>setRole('broker')} className={`h-11 rounded-xl border ${role==='broker'?'bg-[#0F2B3C] text-white':''}`}>Broker Admin</button></div>
        {role==='client' ? (<><input value={policy} onChange={e=>setPolicy(e.target.value)} placeholder="Policy Number - e.g. POL-MUN-4401" className="mt-4 w-full h-12 px-4 rounded-xl border"/><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password - ID last 4" type="password" className="mt-3 w-full h-12 px-4 rounded-xl border"/><button onClick={login} className="mt-4 w-full h-12 bg-[#0E7A7B] text-white rounded-xl font-bold">Login as Client</button><div className="mt-4 p-3 bg-teal-50 rounded-xl text-xs">Demo: Tshwane Municipality POL-MUN-4401 / password 1234 • Blue Crane POL-BIZ-7723</div></>) : (<><div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs">Broker sees all clients, all docs, claim details, can add clients, update, notes, close, chase email button</div><button onClick={login} className="mt-4 w-full h-12 bg-[#0F2B3C] text-white rounded-xl font-bold">Login as Broker</button></>)}
      </div>
    </div>
  )
}
