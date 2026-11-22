
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ClientHome() {
  const [policy, setPolicy] = useState<any>(null)
  const [claims, setClaims] = useState<any[]>([])

  useEffect(()=>{
    const pol = localStorage.getItem('policy') || 'POL-MUN-4401'
    supabase.from('policies').select('*').eq('policy_number', pol).single().then(({data})=>setPolicy(data))
    supabase.from('claims').select('*').eq('policy_number', pol).then(({data})=>setClaims(data||[]))
  },[])

  if (!policy) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4">
      <div className="bg-white p-4 rounded-2xl border">
        <div className="font-bold">{policy.entity_name}</div>
        <div className="text-xs text-gray-500">{policy.entity_type} • {policy.policy_number} • {policy.contact_person}</div>
        <div className="mt-2 text-xs">Municipal Manager: {policy.municipal_manager?.name} • Council Res: {policy.council_resolution_ref} • {policy.mfma_tag}</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Link href="/client/log-claim" className="h-20 bg-[#0E7A7B] text-white rounded-2xl flex flex-col items-center justify-center"><span className="text-2xl">➕</span><span className="text-sm font-bold">Log a Claim</span></Link>
        <Link href="/client/roadside" className="h-20 bg-red-600 text-white rounded-2xl flex flex-col items-center justify-center"><span className="text-2xl">🆘</span><span className="text-sm font-bold">Roadside 24/7</span></Link>
      </div>
      <div className="bg-white p-4 rounded-2xl border">
        <div className="font-bold text-sm">Active Claims - Basic Status + Missing Docs</div>
        <div className="mt-2 space-y-2">
          {claims.map(c=>{
            const missing = (c.documents||[]).filter((d:any)=>!d.confirmed)
            return (<div key={c.id} className="p-3 border rounded-xl"><div className="flex justify-between"><div className="text-sm font-bold">{c.claim_type_label}</div><span className="text-xs px-2 py-1 bg-teal-50 rounded-full">{c.limited_status}</span></div><div className="text-xs text-gray-500">{c.description?.slice(0,80)}...</div>{missing.length>0 && <div className="mt-1 text-xs text-orange-600">Missing docs: {missing.map((d:any)=>d.label).join(', ')}</div>}</div>)
          })}
        </div>
      </div>
    </div>
  )
}
