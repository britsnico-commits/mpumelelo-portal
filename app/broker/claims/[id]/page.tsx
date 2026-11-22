
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClaimDetail({ params }: { params: { id: string } }) {
  const [claim, setClaim] = useState<any>(null)
  const [policy, setPolicy] = useState<any>(null)
  const [note, setNote] = useState('')
  const [noteType, setNoteType] = useState<'internal'|'client'>('internal')

  useEffect(()=>{
    supabase.from('claims').select('*').eq('id', params.id).single().then(({data})=>{setClaim(data); if(data) supabase.from('policies').select('*').eq('policy_number', data.policy_number).single().then(({data:p})=>setPolicy(p))})
  },[])

  const updateStatus = async (status:string) => {
    await supabase.from('claims').update({status, limited_status: status==='Closed'?'Closed':'Under Review', updated_at: new Date().toISOString()}).eq('id', params.id)
    alert(`Status updated to ${status}`); location.reload()
  }
  const addNote = async () => {
    const field = noteType==='internal' ? 'internal_notes' : 'client_notes'
    const existing = claim[field]||[]
    const newNotes = [...existing, {by:'Broker Admin', at: new Date().toISOString(), text: note, type: noteType}]
    await supabase.from('claims').update({[field]: newNotes}).eq('id', params.id)
    setNote(''); alert('Note added'); location.reload()
  }

  if (!claim) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <h1 className="text-xl font-bold">{claim.policy_number} - {claim.claim_type_label}</h1>
      <div className="text-xs text-gray-500">Entity: {policy?.entity_name} • Municipality: {policy?.municipal_manager?.name} • Council Res: {policy?.council_resolution_ref} • MFMA: {policy?.mfma_tag}</div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border">
          <div className="font-bold text-sm">Claim Details</div>
          <div className="mt-2 text-sm space-y-1"><div>Incident: {new Date(claim.incident_date).toLocaleString()}</div><div>Location: {claim.location} {claim.lat && <a href={`https://maps.google.com/?q=${claim.lat},${claim.lng}`} className="text-teal-600 underline">Map</a>}</div><div>SAPS: {claim.saps_case}</div><div>Description: {claim.description}</div><div>Third Party: {JSON.stringify(claim.third_party)}</div><div>Assessor: {claim.assessor||'Not assigned'}</div></div>
          <div className="mt-3 flex gap-2"><select onChange={e=>updateStatus(e.target.value)} className="h-9 px-3 border rounded-full text-xs"><option>Update Status</option><option>Submitted</option><option>Under Review</option><option>Awaiting Documents</option><option>With Assessor</option><option>Approved</option><option>Outcome Ready</option><option>Closed</option></select><button onClick={()=>updateStatus('Closed')} className="h-9 px-3 bg-red-600 text-white rounded-full text-xs">Close Claim</button></div>
        </div>
        <div className="bg-white p-4 rounded-2xl border">
          <div className="font-bold text-sm">All Documents - Broker sees all</div>
          <div className="mt-2 space-y-2">
            {(claim.documents||[]).map((d:any)=>(<div key={d.id} className="flex justify-between items-center p-2 border rounded-xl text-sm"><div>{d.label} {d.required && <span className="text-red-500">*</span>} {d.hint && <span className="text-xs text-gray-400">- {d.hint}</span>}</div><span className={`text-xs px-2 py-1 rounded-full ${d.confirmed?'bg-green-100 text-green-700':'bg-orange-100 text-orange-700'}`}>{d.confirmed?'Confirmed':'Missing'}</span></div>))}
            <div className="text-xs">Uploaded files: {(claim.uploaded_files||[]).map((f:any)=>f.name).join(', ')}</div>
          </div>
          <div className="mt-4"><div className="font-bold text-sm">Vehicles linked to policy for roadside cover check</div><div className="text-xs">{policy?.vehicles?.map((v:any)=>`${v.reg} - ${v.make} ${v.model} (${v.dept||''})`).join(', ')}</div></div>
        </div>
      </div>

      <div className="mt-4 bg-white p-4 rounded-2xl border">
        <div className="font-bold text-sm">Notes - Internal (broker only) vs Client-visible</div>
        <div className="mt-2 space-y-2"><div className="text-xs font-bold">Internal Notes:</div>{(claim.internal_notes||[]).map((n:any,i:number)=>(<div key={i} className="text-xs p-2 bg-gray-50 rounded-xl">{n.at} - {n.by}: {n.text}</div>))}<div className="text-xs font-bold mt-2">Client Notes (visible to client):</div>{(claim.client_notes||[]).map((n:any,i:number)=>(<div key={i} className="text-xs p-2 bg-teal-50 rounded-xl">{n.at} - {n.by}: {n.text}</div>))}</div>
        <div className="mt-3 flex gap-2"><select value={noteType} onChange={e=>setNoteType(e.target.value as any)} className="h-9 px-2 border rounded-full text-xs"><option value="internal">Internal (broker only)</option><option value="client">Client-visible</option></select><input value={note} onChange={e=>setNote(e.target.value)} placeholder="Make a note..." className="flex-1 h-9 px-3 border rounded-full text-sm"/><button onClick={addNote} className="h-9 px-4 bg-[#0F2B3C] text-white rounded-full text-xs">Add Note</button></div>
      </div>
    </div>
  )
}
