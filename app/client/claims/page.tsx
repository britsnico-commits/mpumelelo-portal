
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClaimsList() {
  const [claims, setClaims] = useState<any[]>([])
  useEffect(()=>{
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('claims').select('*').eq('policy_number', pol).then(({data})=>setClaims(data||[]))
  },[])
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="font-bold">My Claims - Basic Status View</h1>
      <div className="mt-4 space-y-3">
        {claims.map(c=>{
          const missing = (c.documents||[]).filter((d:any)=>!d.confirmed)
          return (<div key={c.id} className="p-4 bg-white rounded-2xl border"><div className="flex justify-between"><div className="font-bold text-sm">{c.claim_type_label}</div><span className="text-xs px-2 py-1 bg-gray-100 rounded-full">{c.limited_status}</span></div><div className="text-xs mt-1">{c.description}</div><div className="text-xs text-gray-500 mt-1">SAPS: {c.saps_case} • Location: {c.location}</div>{missing.length>0 && <div className="mt-2 p-2 bg-orange-50 rounded-xl text-xs text-orange-700">⚠️ Missing documents: {missing.map((d:any)=>d.label).join(', ')} - Please upload</div>}{c.client_notes?.length>0 && <div className="mt-2 text-xs">Latest update from broker: {c.client_notes[c.client_notes.length-1].text}</div>}</div>)
        })}
      </div>
    </div>
  )
}
