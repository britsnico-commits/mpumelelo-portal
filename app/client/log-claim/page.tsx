
'use client'
import { useState } from 'react'
import { CLAIM_TYPES } from '@/lib/claimTypes'
import { supabase } from '@/lib/supabase'

export default function LogClaim() {
  const [type, setType] = useState<any>(null)
  const [step, setStep] = useState(1)
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState<number|null>(null)
  const [lng, setLng] = useState<number|null>(null)
  const [desc, setDesc] = useState('')
  const [saps, setSaps] = useState('')
  const [reg, setReg] = useState('HM 45 GP GP')
  const [files, setFiles] = useState<{label:string, name:string}[]>([])
  const [vehicles, setVehicles] = useState<any[]>([])

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(pos=>{setLat(pos.coords.latitude); setLng(pos.coords.longitude); setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`)})
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('policies').select('vehicles').eq('policy_number', pol).single().then(({data})=>setVehicles(data?.vehicles||[]))
  }

  const submit = async () => {
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    const docs = type.docs.map((d:any)=>({id:d.id, label:d.label, required:d.required, confirmed: files.some(f=>f.label===d.label), hint:d.hint}))
    await supabase.from('claims').insert({policy_number: pol, claim_type: type.id, claim_type_label: type.label, status:'Submitted', limited_status:'Submitted', incident_date: new Date().toISOString(), location, lat, lng, description: desc, saps_case: saps, documents: docs, uploaded_files: files, third_party:{vehicle_reg: reg}})
    alert('Claim logged! Documents checklist saved. Broker notified. You will see status in Active Claims.')
    setStep(3)
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-xl font-bold">Log a Claim - What docs to upload</h1>
      <p className="text-xs text-gray-500">System tells you what documents required per claim type, upload from gallery or PDF</p>
      {step===1 && (
        <div className="mt-4 grid gap-3">
          {CLAIM_TYPES.map((t:any)=>(
            <button key={t.id} onClick={()=>{setType(t); setStep(2); useMyLocation()}} className="p-4 rounded-2xl border text-left bg-white hover:border-[#0E7A7B]">
              <div className="font-bold text-sm">{t.label}</div>
              <div className="text-xs text-gray-500 mt-1">Required: {t.docs.filter((d:any)=>d.required).map((d:any)=>d.label).join(' • ')}</div>
              <div className="text-[10px] text-gray-400 mt-1">Source: SA Insurance Standard - no insurer names</div>
            </button>
          ))}
        </div>
      )}
      {step===2 && type && (
        <div className="mt-4 space-y-4">
          <div className="p-3 bg-teal-50 rounded-xl text-sm font-bold">Selected: {type.label} • {type.docs.length} docs required</div>
          <input type="date" defaultValue={new Date().toISOString().slice(0,10)} className="w-full h-12 px-4 rounded-xl border bg-white" />
          <select value={reg} onChange={e=>setReg(e.target.value)} className="w-full h-12 px-4 rounded-xl border bg-white">
            <option value="">Select Vehicle Reg (links to policy for cover check)</option>
            {vehicles.map((v:any)=>(<option key={v.reg} value={v.reg}>{v.reg} - {v.make} {v.model}</option>))}
            <option>HM 45 GP GP - Toyota Hilux</option>
          </select>
          <div className="flex gap-2">
            <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Incident Location" className="flex-1 h-12 px-4 rounded-xl border bg-white" />
            <button onClick={useMyLocation} className="h-12 px-3 bg-[#0E7A7B] text-white rounded-xl text-xs whitespace-nowrap">📍 Use My Location</button>
          </div>
          {lat && <div className="text-xs text-gray-500">GPS: {lat.toFixed(5)}, {lng?.toFixed(5)} • <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" className="underline text-teal-600">Open Maps</a></div>}
          <input value={saps} onChange={e=>setSaps(e.target.value)} placeholder="SAPS Case / AR Number (if applicable)" className="w-full h-12 px-4 rounded-xl border bg-white" />
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Describe what happened - detailed narrative required" className="w-full p-4 rounded-xl border h-28 bg-white" />
          <div className="space-y-2">
            <div className="font-bold text-sm">Upload Documents - Gallery or PDF</div>
            {type.docs.map((doc:any)=>(
              <div key={doc.id} className="p-3 rounded-xl border bg-white flex justify-between items-center">
                <div className="flex-1"><div className="text-sm font-medium">{doc.label} {doc.required && <span className="text-red-500">*</span>}</div><div className="text-xs text-gray-500">{doc.hint} • Source: {doc.source}</div>{files.find(f=>f.label===doc.label) && <div className="text-xs text-green-600">✓ {files.find(f=>f.label===doc.label)?.name}</div>}</div>
                <label className="ml-2 h-9 px-3 bg-[#0F2B3C] text-white rounded-full text-xs flex items-center cursor-pointer">
                  Upload
                  <input type="file" accept="image/*,application/pdf,.pdf" className="hidden" onChange={e=>{
                    if(e.target.files?.[0]) setFiles([...files.filter(f=>f.label!==doc.label), {label: doc.label, name: e.target.files[0].name}])
                  }} />
                </label>
              </div>
            ))}
          </div>
          <button onClick={submit} className="w-full h-12 bg-[#0E7A7B] text-white rounded-xl font-bold">Review & Submit Claim</button>
        </div>
      )}
      {step===3 && <div className="mt-6 p-6 bg-green-50 rounded-2xl border border-green-200 text-center"><div className="text-3xl">✅</div><div className="font-bold mt-2">Claim Submitted</div><div className="text-sm text-gray-600">Reference: CLAIM-{Math.floor(Math.random()*90000)} • Broker notified • Insurer will be notified via vehicle reg linkage</div><div className="text-xs mt-2">Check Active Claims for status + missing docs</div></div>}
    </div>
  )
}
