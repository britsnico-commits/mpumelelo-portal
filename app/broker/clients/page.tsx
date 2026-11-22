
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ClientsPage() {
  const [policies, setPolicies] = useState<any[]>([])
  const [form, setForm] = useState<any>({entity_type:'Municipality', entity_name:'', contact_person:'', contact_email:'', policy_number:'', council_resolution_ref:'', mfma_tag:'MFMA Sec 110 Compliant', vehicles:''})

  useEffect(()=>{supabase.from('policies').select('*').then(({data})=>setPolicies(data||[]))},[])

  const add = async () => {
    const vehicles = form.vehicles.split(',').map((r:string)=>({reg:r.trim(), make:'', model:''})).filter((v:any)=>v.reg)
    const { error } = await supabase.from('policies').insert({policy_number: form.policy_number, entity_type: form.entity_type, entity_name: form.entity_name, contact_person: form.contact_person, contact_email: form.contact_email, council_resolution_ref: form.council_resolution_ref, mfma_tag: form.mfma_tag, vehicles})
    if (!error) { alert('Client added'); location.reload() } else alert(error.message)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold">Clients & Policies - Add Client Details</h1>
      <div className="mt-4 grid gap-3 bg-white p-4 rounded-2xl border">
        <select value={form.entity_type} onChange={e=>setForm({...form, entity_type:e.target.value})} className="h-11 px-4 rounded-xl border"><option>Private</option><option>Business</option><option>Municipality</option></select>
        <input value={form.entity_name} onChange={e=>setForm({...form, entity_name:e.target.value})} placeholder="Company / Municipality Name - e.g. City of Tshwane Metropolitan Municipality" className="h-11 px-4 rounded-xl border"/>
        <input value={form.contact_person} onChange={e=>setForm({...form, contact_person:e.target.value})} placeholder="Contact Person / Municipal Manager" className="h-11 px-4 rounded-xl border"/>
        <input value={form.contact_email} onChange={e=>setForm({...form, contact_email:e.target.value})} placeholder="Contact Email" className="h-11 px-4 rounded-xl border"/>
        <input value={form.policy_number} onChange={e=>setForm({...form, policy_number:e.target.value})} placeholder="Policy Number - POL-MUN-..." className="h-11 px-4 rounded-xl border"/>
        <input value={form.council_resolution_ref} onChange={e=>setForm({...form, council_resolution_ref:e.target.value})} placeholder="Council Resolution Ref - CM-2026/..." className="h-11 px-4 rounded-xl border"/>
        <input value={form.mfma_tag} onChange={e=>setForm({...form, mfma_tag:e.target.value})} placeholder="MFMA Tag" className="h-11 px-4 rounded-xl border"/>
        <input value={form.vehicles} onChange={e=>setForm({...form, vehicles:e.target.value})} placeholder="Vehicles Regs comma separated - HM 45 GP GP, HM 46 GP GP - linked to policy for roadside cover check" className="h-11 px-4 rounded-xl border"/>
        <button onClick={add} className="h-11 bg-[#0E7A7B] text-white rounded-xl font-bold">Add Client / Policy</button>
      </div>
      <div className="mt-6 grid gap-3">
        {policies.map(p=>(<div key={p.id} className="p-4 bg-white rounded-2xl border"><div className="font-bold">{p.entity_name} <span className="text-xs text-gray-400">{p.entity_type} • {p.policy_number}</span></div><div className="text-xs">{p.contact_person} • {p.contact_email} • Vehicles: {p.vehicles?.length||0} - {p.vehicles?.map((v:any)=>v.reg).join(', ')}</div></div>))}
      </div>
    </div>
  )
}
