'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ClientHome() {
  const [policy, setPolicy] = useState<any>(null)
  const [claims, setClaims] = useState<any[]>([])
  const [uploading, setUploading] = useState<string|null>(null)

  useEffect(()=>{
    const pol = localStorage.getItem('policy') || 'POL-MUN-4401'
    supabase.from('policies').select('*').eq('policy_number', pol).single().then(({data})=>setPolicy(data))
    supabase.from('claims').select('*').eq('policy_number', pol).order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
  },[])

  const uploadMissingDoc = async (claimId: string, docId: string, docLabel: string, file: File) => {
    setUploading(`${claimId}-${docId}`)
    const fileName = `${claimId}/${Date.now()}-${file.name.replace(/\s+/g,'-')}`
    const { error } = await supabase.storage.from('claim-docs').upload(fileName, file)
    if (error) { alert('Upload failed: ' + error.message + ' - Check bucket claim-docs exists and is public'); setUploading(null); return }
    
    const { data: urlData } = supabase.storage.from('claim-docs').getPublicUrl(fileName)
    const claim = claims.find(c=>c.id===claimId)
    const updatedDocs = (claim.documents||[]).map((d:any)=> d.id===docId ? {...d, confirmed:true, url: urlData.publicUrl} : d)
    const updatedFiles = [...(claim.uploaded_files||[]), {label: docLabel, name: file.name, url: urlData.publicUrl, docId}]
    
    const { error: updateError } = await supabase.from('claims').update({documents: updatedDocs, uploaded_files: updatedFiles}).eq('id', claimId)
    if (updateError) alert('Update failed: ' + updateError.message)
    else {
      alert(`✓ ${docLabel} uploaded! Broker notified.`)
      const pol = localStorage.getItem('policy')||'POL-MUN-4401'
      supabase.from('claims').select('*').eq('policy_number', pol).order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
    }
    setUploading(null)
  }

  if (!policy) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4 max-w-lg mx-auto space-y-4 pb-24">
      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Mpumelelo" className="h-8 w-auto" />
          <div>
            <div className="font-bold text-sm">{policy.entity_name}</div>
            <div className="text-xs text-gray-500">{policy.entity_type} • {policy.policy_number} • {policy.contact_person}</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-600">Municipal Manager: {policy.municipal_manager?.name||'N/A'} • Council Res: {policy.council_resolution_ref||'N/A'} • {policy.mfma_tag||''}</div>
        <div className="mt-1 text-xs">Vehicles: {policy.vehicles?.length||0} - {policy.vehicles?.map((v:any)=>v.reg).join(', ')}</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link href="/client/log-claim" className="h-20 bg-[#0E7A7B] text-white rounded-2xl flex flex-col items-center justify-center shadow-sm">
          <span className="text-2xl">➕</span><span className="text-sm font-bold">Log a Claim</span><span className="text-[10px]">Gallery / PDF</span>
        </Link>
        <Link href="/client/roadside" className="h-20 bg-red-600 text-white rounded-2xl flex flex-col items-center justify-center shadow-sm">
          <span className="text-2xl">🆘</span><span className="text-sm font-bold">Roadside 24/7</span><span className="text-[10px]">Auto cover check</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <div className="flex justify-between items-center">
          <div className="font-bold text-sm">Active Claims - Tap Missing to Upload</div>
          <Link href="/client/claims" className="text-xs text-[#0E7A7B] underline">View All</Link>
        </div>
        
        <div className="mt-3 space-y-3">
          {claims.map(c=>{
            const missing = (c.documents||[]).filter((d:any)=>!d.confirmed)
            const confirmed = (c.documents||[]).filter((d:any)=>d.confirmed)
            return (
              <div key={c.id} className="p-3 border rounded-xl">
                <div className="flex justify-between">
                  <div className="text-sm font-bold">{c.claim_type_label}</div>
                  <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full">{c.limited_status}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{c.description?.slice(0,100)}...</div>
                
                {missing.length>0 && (
                  <div className="mt-2 p-2 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="text-xs font-bold text-orange-800">⚠️ Missing: Tap to upload</div>
                    <div className="mt-1 space-y-1">
                      {missing.map((d:any)=>(
                        <div key={d.id} className="flex justify-between items-center bg-white p-2 rounded-lg border text-xs">
                          <span className="font-medium">{d.label}</span>
                          <label className="h-7 px-2 bg-[#0E7A7B] text-white rounded-full flex items-center cursor-pointer text-[11px]">
                            {uploading===`${c.id}-${d.id}` ? '...' : 'Upload'}
                            <input type="file" accept="image/*,application/pdf,.pdf" className="hidden" onChange={e=>{
                              if(e.target.files?.[0]) uploadMissingDoc(c.id, d.id, d.label, e.target.files[0])
                            }} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {confirmed.length>0 && <div className="mt-1 text-xs text-green-600">✓ Uploaded: {confirmed.map((d:any)=>d.label).join(' • ')}</div>}
                {c.client_notes?.length>0 && <div className="mt-1 text-xs p-2 bg-teal-50 rounded-lg"><b>Broker update:</b> {c.client_notes[c.client_notes.length-1].text}</div>}
              </div>
            )
          })}
          {claims.length===0 && <div className="text-xs text-gray-500 text-center py-4">No claims yet - Tap + Log a Claim above</div>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Link href="/client/assets" className="p-3 bg-white rounded-2xl border text-center"><div className="text-lg">🚗</div><div className="text-xs font-bold">{policy.vehicles?.length||0} Vehicles</div><div className="text-[10px] text-gray-400">Assets</div></Link>
        <Link href="/client/policy" className="p-3 bg-white rounded-2xl border text-center"><div className="text-lg">📄</div><div className="text-xs font-bold">Policy</div><div className="text-[10px] text-gray-400">{policy.policy_number}</div></Link>
        <Link href="/client/claims" className="p-3 bg-white rounded-2xl border text-center"><div className="text-lg">📋</div><div className="text-xs font-bold">{claims.length} Claims</div><div className="text-[10px] text-gray-400">Status</div></Link>
      </div>
    </div>
  )
}
