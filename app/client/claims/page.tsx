'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClaimsList() {
  const [claims, setClaims] = useState<any[]>([])
  const [uploading, setUploading] = useState<string|null>(null)

  useEffect(()=>{
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('claims').select('*').eq('policy_number', pol).order('created_at',{ascending:false}).then(({data})=>setClaims(data||[]))
  },[])

  const uploadMissingDoc = async (claimId: string, docId: string, docLabel: string, file: File) => {
    setUploading(`${claimId}-${docId}`)
    const fileName = `${claimId}/${Date.now()}-${file.name.replace(/\s+/g,'-')}`
    const { error } = await supabase.storage.from('claim-docs').upload(fileName, file)
    if (error) { alert('Upload failed: ' + error.message + ' - Make sure bucket claim-docs exists and is public'); setUploading(null); return }
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

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <a href="/client/home" className="text-xs text-[#0E7A7B] underline mb-2 inline-block">← Back to Home</a>
      <h1 className="font-bold text-lg">My Claims - Tap Missing to Upload</h1>
      <p className="text-xs text-gray-500">Tap Upload button next to missing doc to upload gallery or PDF</p>
      <div className="mt-4 space-y-4">
        {claims.map(c=>{
          const missing = (c.documents||[]).filter((d:any)=>!d.confirmed)
          const confirmed = (c.documents||[]).filter((d:any)=>d.confirmed)
          return (
            <div key={c.id} className="p-4 bg-white rounded-2xl border shadow-sm">
              <div className="flex justify-between items-start">
                <div><div className="font-bold text-sm">{c.claim_type_label}</div><div className="text-xs text-gray-500">{c.policy_number} • {c.saps_case} • {new Date(c.created_at).toLocaleDateString()}</div></div>
                <span className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full">{c.limited_status}</span>
              </div>
              <div className="text-xs mt-2">{c.description}</div>
              {c.location && <div className="text-xs text-gray-500 mt-1">📍 {c.location}</div>}
              {missing.length>0 && (
                <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-xs font-bold text-orange-800">⚠️ Missing documents - Tap Upload:</div>
                  <div className="mt-2 space-y-2">
                    {missing.map((d:any)=>(
                      <div key={d.id} className="flex justify-between items-center bg-white p-2 rounded-xl border">
                        <div className="flex-1"><div className="text-xs font-medium">{d.label}</div><div className="text-[10px] text-gray-500">{d.hint||''}</div>{uploading===`${c.id}-${d.id}` && <div className="text-[10px] text-blue-600">Uploading...</div>}</div>
                        <label className="ml-2 h-8 px-3 bg-[#0E7A7B] text-white rounded-full text-xs flex items-center cursor-pointer">
                          {uploading===`${c.id}-${d.id}` ? '...' : 'Upload'}
                          <input type="file" accept="image/*,application/pdf,.pdf" className="hidden" onChange={e=>{if(e.target.files?.[0]) uploadMissingDoc(c.id, d.id, d.label, e.target.files[0])}} />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {confirmed.length>0 && <div className="mt-2 p-2 bg-green-50 rounded-xl"><div className="text-xs font-bold text-green-800">✓ Uploaded:</div><div className="text-xs text-green-700">{confirmed.map((d:any)=>d.label).join(' • ')}</div></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
