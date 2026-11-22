
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function BrokerDashboard() {
  const [claims, setClaims] = useState<any[]>([])
  const [policies, setPolicies] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(()=>{
    supabase.from('claims').select('*').order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
    supabase.from('policies').select('*').then(({data})=>setPolicies(data||[]))
  },[])

  const chase = async (claim:any, type:'missing'|'update') => {
    const missing = claim.documents?.filter((d:any)=>!d.confirmed).map((d:any)=>d.label) || []
    await fetch('/api/chase',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({claimId: claim.id.slice(0,8), fullId: claim.id, type, clientEmail: policies.find(p=>p.policy_number===claim.policy_number)?.contact_email || 'lerato.nkosi@tshwane.gov.za', policyNumber: claim.policy_number, missingDocs: missing, entityName: policies.find(p=>p.policy_number===claim.policy_number)?.entity_name })})
    alert(`Chase email sent: ${type} for ${claim.policy_number}`)
  }

  const filtered = claims.filter(c=>{
    const matchesSearch = JSON.stringify(c).toLowerCase().includes(search.toLowerCase()) || (policies.find(p=>p.policy_number===c.policy_number)?.entity_name||'').toLowerCase().includes(search.toLowerCase())
    const pol = policies.find(p=>p.policy_number===c.policy_number)
    const matchesFilter = filter==='All' || pol?.entity_type===filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-4 max-w-6xl mx-auto pb-24">
      <h1 className="text-2xl font-bold">Broker Dashboard</h1>
      <p className="text-sm text-gray-500">View all docs, claim details, add clients, update, notes, close, one-push chase emails</p>
      <div className="mt-4 flex gap-2 overflow-x-auto">
        {['All','Municipality','Business','Private'].map(f=>(<button key={f} onClick={()=>setFilter(f)} className={`h-9 px-4 rounded-full border whitespace-nowrap text-sm ${filter===f?'bg-[#0F2B3C] text-white':'bg-white'}`}>{f}</button>))}
      </div>
      <div className="mt-4 flex gap-2"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search client, company, municipality, policy, reg, CAS..." className="flex-1 h-11 px-4 rounded-xl border bg-white"/><Link href="/broker/clients" className="h-11 px-4 bg-[#0E7A7B] text-white rounded-xl flex items-center text-sm">Add Client</Link></div>
      <div className="mt-2 text-xs text-gray-500">{filtered.length} claims • {policies.length} policies • {policies.reduce((a:any,p:any)=>a+(p.vehicles?.length||0),0)} vehicles/assets - live portal with lots of data</div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filtered.map(claim=>{
          const pol = policies.find(p=>p.policy_number===claim.policy_number)
          return (
            <div key={claim.id} className="p-4 rounded-2xl border bg-white shadow-sm">
              <div className="flex justify-between items-start"><div><div className="font-bold text-sm">{pol?.entity_name} <span className="text-xs text-gray-400">({pol?.entity_type})</span></div><div className="text-xs">{claim.policy_number} • {claim.claim_type_label} • {claim.saps_case||''}</div></div><span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full">{claim.status}</span></div>
              <div className="mt-2 text-sm line-clamp-2">{claim.description}</div>
              <div className="mt-2 text-xs text-gray-500">Vehicles linked: {pol?.vehicles?.map((v:any)=>v.reg).join(', ')}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/broker/claims/${claim.id}`} className="h-9 px-3 bg-[#0F2B3C] text-white rounded-full text-xs flex items-center">View Docs & Details</Link>
                <button onClick={()=>chase(claim,'missing')} className="h-9 px-3 bg-orange-600 text-white rounded-full text-xs">📧 Chase Missing Docs</button>
                <button onClick={()=>chase(claim,'update')} className="h-9 px-3 bg-gray-800 text-white rounded-full text-xs">📧 Chase Update</button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
