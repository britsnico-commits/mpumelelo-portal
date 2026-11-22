
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: NextRequest) {
  const { policyNumber, vehicleReg, contactNumber, assistanceType, lat, lng, notes } = await req.json()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  const { data: pol } = await supabase.from('policies').select('vehicles').eq('policy_number', policyNumber).single()
  const found = (pol?.vehicles||[]).some((v:any)=>v.reg.toLowerCase()===vehicleReg.toLowerCase())
  if (!found) return NextResponse.json({ ok:false, message: 'Vehicle not linked to policy - no cover', coverConfirmed:false }, { status: 400 })
  const { data, error } = await supabase.from('roadside_requests').insert({ policy_number: policyNumber, vehicle_reg: vehicleReg, contact_number: contactNumber, assistance_type: assistanceType, notes, lat, lng, cover_confirmed:true }).select().single()
  if (error) return NextResponse.json({ ok:false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok:true, coverConfirmed:true, ref: `RA-${data.id.slice(0,8).toUpperCase()}`, request: data })
}
