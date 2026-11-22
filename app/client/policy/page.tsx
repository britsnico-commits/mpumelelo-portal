
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function PolicyPage() {
  const [policy, setPolicy] = useState<any>(null)
  const [claims, setClaims] = useState<any[]>([])

  useEffect(()=>{
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('policies').select('*').eq('policy_number', pol).single().then(({data})=>setPolicy(data))
    supabase.from('claims').select('*').eq('policy_number', pol).then(({data})=>setClaims(data||[]))
  },[])

  if (!policy) return <div className="p-4">Loading policy...</div>

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="font-bold">My Policy - Open with Policy Number + Password</h1>
      <div className="mt-3 bg-white p-4 rounded-2xl border">
        <div className="font-bold">{policy.entity_name}</div>
        <div className="text-xs">Policy: {policy.policy_number} • Type: {policy.entity_type} • Contact: {policy.contact_person}</div>
        <div className="mt-2 text-xs">Municipal Manager: {policy.municipal_manager?.name} • Council Res: {policy.council_resolution_ref}</div>
        <div className="mt-2 text-xs">MFMA: {policy.mfma_tag}</div>
      </div>

      <div className="mt-4 bg-white p-4 rounded-2xl border">
        <div className="font-bold text-sm">Policy Documents - Open with password</div>
        <div className="mt-2 space-y-2">
          {(policy.documents||[]).map((d:any)=>(<div key={d.id} className="flex justify-between items-center p-3 border rounded-xl text-sm"><div>{d.label} • {d.type?.toUpperCase()}</div><button className="h-8 px-3 bg-[#0F2B3C] text-white rounded-full text-xs">Open</button></div>))}
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded-2xl border">
        <div className="font-bold text-sm">Active Claims - Basic Status + Missing Docs</div>
        <div className="mt-2 space-y-2">
          {claims.map(c=>{
            const missing = (c.documents||[]).filter((d:any)=>!d.confirmed)
            return (<div key={c.id} className="p-3 border rounded-xl"><div className="flex justify-between"><div className="text-sm font-bold">{c.claim_type_label}</div><span className="text-xs px-2 py-1 bg-teal-50 rounded-full">{c.limited_status}</span></div><div className="text-xs mt-1">Status: {c.limited_status} - Broker update: {c.client_notes?.slice(-1)[0]?.text||'Under review'}</div>{missing.length>0 && <div className="mt-1 text-xs text-orange-600">Missing: {missing.map((d:any)=>d.label).join(', ')}</div>}</div>)
          })}
        </div>
      </div>
    </div>
  )
}
