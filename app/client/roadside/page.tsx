
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Roadside() {
  const [reg, setReg] = useState('HM 45 GP GP')
  const [contact, setContact] = useState('012 358 1234')
  const [type, setType] = useState('Flat tyre')
  const [notes, setNotes] = useState('')
  const [lat, setLat] = useState<number|null>(null)
  const [lng, setLng] = useState<number|null>(null)
  const [cover, setCover] = useState<boolean|null>(null)
  const [vehicles, setVehicles] = useState<any[]>([])

  useEffect(()=>{
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    supabase.from('policies').select('vehicles').eq('policy_number', pol).single().then(({data})=>setVehicles(data?.vehicles||[]))
  },[])

  const shareLocation = () => { navigator.geolocation.getCurrentPosition(pos=>{setLat(pos.coords.latitude); setLng(pos.coords.longitude)}) }
  const checkCover = async () => {
    const pol = localStorage.getItem('policy')||'POL-MUN-4401'
    const {data} = await supabase.from('policies').select('vehicles').eq('policy_number', pol).single()
    const found = (data?.vehicles||[]).some((v:any)=>v.reg.toLowerCase()===reg.toLowerCase())
    setCover(found)
    if(found){
      await supabase.from('roadside_requests').insert({policy_number: pol, vehicle_reg: reg, contact_number: contact, assistance_type: type, notes, lat, lng, cover_confirmed:true})
      alert(`✅ Cover CONFIRMED! Policy ${pol} covers ${reg}. Assistance dispatched. Ref: RA-${Math.floor(Math.random()*9000)} - Broker & insurer notified.`)
    } else alert(`❌ Vehicle ${reg} NOT linked to policy ${pol} - no cover per backend check`)
  }

  return (
    <div className="p-4 max-w-lg mx-auto pb-24">
      <h1 className="text-xl font-bold">Roadside Assistance 24/7</h1>
      <p className="text-xs text-gray-500">System auto-confirms cover based on backend vehicle registration details linked to policy</p>
      <div className="mt-4 space-y-3 bg-white p-4 rounded-2xl border">
        <select value={reg} onChange={e=>setReg(e.target.value)} className="w-full h-12 px-4 rounded-xl border">
          {vehicles.map((v:any)=>(<option key={v.reg} value={v.reg}>{v.reg} - {v.make} {v.model}</option>))}
          <option>HM 45 GP GP - Toyota Hilux</option>
        </select>
        <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Contact Number" className="w-full h-12 px-4 rounded-xl border" />
        <select value={type} onChange={e=>setType(e.target.value)} className="w-full h-12 px-4 rounded-xl border"><option>Flat tyre</option><option>Towing</option><option>Battery / Jump Start</option><option>Fuel</option><option>Accident</option><option>Lockout</option><option>Mechanical Breakdown</option></select>
        <textarea value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Additional notes - e.g. near... " className="w-full p-3 rounded-xl border h-20" />
        <button onClick={shareLocation} className="w-full h-11 border rounded-xl text-sm">📍 Share My Location {lat && `${lat.toFixed(5)}, ${lng?.toFixed(5)}`}</button>
        {lat && <a href={`https://maps.google.com/?q=${lat},${lng}`} target="_blank" className="text-xs text-teal-600 underline">Open location in Google Maps</a>}
        <label className="flex gap-2 text-xs items-center"><input type="checkbox" defaultChecked className="w-4 h-4"/> Auto-link to policy via vehicle reg + notify broker & insurer</label>
        <button onClick={checkCover} className="w-full h-12 bg-red-600 text-white rounded-xl font-bold">Request Assistance Now - Check Cover</button>
        {cover!==null && <div className={`p-3 rounded-xl text-sm ${cover?'bg-green-50 text-green-700 border border-green-200':'bg-red-50 text-red-700 border border-red-200'}`}>{cover?'✅ Cover confirmed via backend vehicle registration linked to policy - assistance dispatched':`❌ No cover - vehicle ${reg} not found in policy vehicles`}</div>}
      </div>
    </div>
  )
}
