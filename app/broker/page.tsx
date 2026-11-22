'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BrokerPage() {
  const [claims, setClaims] = useState<any[]>([])
  const [policies, setPolicies] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(()=>{
    supabase.from('claims').select('*').order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
    supabase.from('policies').select('*').then(({data})=>setPolicies(data||[]))
  },[])

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('claims').update({limited_status: status}).eq('id', id)
    alert(`Status updated to ${status}`)
    supabase.from('claims').select('*').order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
  }

  const chaseEmail = async (claim: any) => {
    const missing = (claim.documents||[]).filter((d:any)=>!d.confirmed).map((d:any)=>d.label).join(', ')
    const res = await fetch('/api/chase', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        policy: claim.policy_number,
        claimId: claim.id,
        email: claim.contact_email || 'client@municipality.gov.za',
        missing,
        type: claim.claim_type_label
      })
    })
    if (res.ok) alert(`✓ Chase email sent to ${claim.policy_number} for: ${missing || 'update'}`)
    else alert('Chase failed - check RESEND_API_KEY in Vercel')
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="font-bold text-xl">Broker Dashboard - All Claims</h1>
      <p className="text-xs text-gray-500">{claims.length} claims • {policies.length} policies • Mpumelelo Services Since 2006</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="lg:col-span-1 space-y-2">
          {claims.map(c=>{
            const missing = (c.documents||[]).filter((d:any)=>!d.confirmed).length
            const confirmed = (c.documents||[]).filter((d:any)=>d.confirmed).length
            return (
              <div key={c.id} onClick={()=>setSelected(c)} className={`p-3 border rounded-xl cursor-pointer ${selected?.id===c.id ? 'bg-teal-50 border-teal-500' : 'bg-white'}`}>
                <div className="flex justify-between"><span className="font-bold text-sm">{c.policy_number}</span><span className="text-xs px-2 py-1 bg-orange-100 rounded-full">{missing} missing</span></div>
                <div className="text-xs">{c.claim_type_label} • {c.saps_case}</div>
                <div className="text-[10px] text-gray-500">{c.description?.slice(0,60)}...</div>
                <div className="text-[10px] mt-1">✓ {confirmed} uploaded • ⚠️ {missing} missing • {c.limited_status}</div>
              </div>
            )
          })}
        </div>
        
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-white p-4 rounded-2xl border">
              <div className="flex justify-between">
                <div><div className="font-bold">{selected.claim_type_label}</div><div className="text-xs text-gray-500">{selected.policy_number} • {selected.saps_case} • {new Date(selected.created_at).toLocaleString()}</div></div>
                <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full h-fit">{selected.limited_status}</span>
              </div>
              <div className="text-sm mt-3">{selected.description}</div>
              {selected.location && <div className="text-xs mt-1">📍 {selected.location}</div>}
              
              <div className="mt-4">
                <div className="font-bold text-sm">Documents - Broker View</div>
                <div className="mt-2 space-y-2">
                  {(selected.documents||[]).map((d:any)=>(
                    <div key={d.id} className="flex justify-between items-center p-2 border rounded-xl text-xs">
                      <span>{d.label} {d.confirmed ? '✓' : '⚠️'}</span>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 rounded-full text-[10px] ${d.confirmed ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{d.confirmed ? 'Confirmed' : 'Missing'}</span>
                        {d.url && <a href={d.url} target="_blank" className="text-blue-600 underline">View</a>}
                      </div>
                    </div>
                  ))}
                </div>
                {(selected.uploaded_files||[]).length>0 && (
                  <div className="mt-3">
                    <div className="text-xs font-bold">Uploaded Files from Client:</div>
                    <div className="space-y-1 mt-1">
                      {selected.uploaded_files.map((f:any,i:number)=>(
                        <div key={i} className="text-xs flex justify-between p-2 bg-gray-50 rounded-lg"><span>{f.label} - {f.name}</span><a href={f.url} target="_blank" className="text-blue-600 underline">Open</a></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={()=>updateStatus(selected.id, 'In Assessment')} className="h-10 bg-gray-900 text-white rounded-xl text-xs">Set In Assessment</button>
                <button onClick={()=>updateStatus(selected.id, 'Documents Outstanding')} className="h-10 bg-orange-600 text-white rounded-xl text-xs">Docs Outstanding</button>
                <button onClick={()=>chaseEmail(selected)} className="h-10 bg-[#0E7A7B] text-white rounded-xl text-xs col-span-2">📧 One-Push Chase Email (Missing Docs)</button>
                <button onClick={()=>updateStatus(selected.id, 'Closed')} className="h-10 border rounded-xl text-xs">Close Claim</button>
                <button onClick={()=>{setSelected(null)}} className="h-10 border rounded-xl text-xs">Deselect</button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border text-center text-sm text-gray-500">Select a claim on left to view all docs, uploaded files, and chase email</div>
          )}

          <div className="mt-4 bg-white p-4 rounded-2xl border">
            <div className="font-bold text-sm">Policies - Clients Include Municipalities</div>
            <div className="mt-2 space-y-1 max-h-60 overflow-auto">
              {policies.map(p=>(
                <div key={p.policy_number} className="text-xs flex justify-between p-2 border-b"><span>{p.entity_name} • {p.policy_number}</span><span className="text-gray-500">{p.entity_type} • {p.vehicles?.length||0} vehicles</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
