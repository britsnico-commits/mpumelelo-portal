
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function AssetsPage() {
  const [policy, setPolicy] = useState<any>(null)
  const [search, setSearch] = useState('')
  useEffect(()=>{
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('policies').select('*').eq('policy_number', pol).single().then(({data})=>setPolicy(data))
  },[])
  if (!policy) return <div className="p-4">Loading...</div>
  const vehicles = (policy.vehicles||[]).filter((v:any)=> JSON.stringify(v).toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-bold">Assets & Vehicles - Live Portal - Lots of Data</h1>
      <p className="text-xs text-gray-500">{policy.vehicles?.length||0} vehicles/assets insured under {policy.policy_number} - linked to policy via reg for roadside cover check</p>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reg, make, dept..." className="mt-3 w-full h-11 px-4 rounded-xl border bg-white" />
      <div className="mt-4 grid gap-2">
        {vehicles.map((v:any)=>(<div key={v.reg} className="p-4 bg-white rounded-2xl border"><div className="flex justify-between"><div className="font-bold text-sm">{v.reg}</div><span className="text-xs px-2 py-1 bg-teal-50 rounded-full">{v.dept||'Fleet'}</span></div><div className="text-xs text-gray-600">{v.make} {v.model} • VIN: {v.vin||'N/A'} • Engine: {v.engine||'N/A'}</div><div className="text-[10px] text-gray-400 mt-1">Linked to policy {policy.policy_number} - roadside auto-confirms cover</div></div>))}
      </div>
    </div>
  )
}
