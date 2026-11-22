
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const { claimId, fullId, type, clientEmail, policyNumber, missingDocs, entityName } = await req.json()
  const resend = new Resend(process.env.RESEND_API_KEY)
  const from = process.env.RESEND_FROM || 'Mpumelelo Services <claims@mpumeleloservices.co.za>'

  const isMissing = type==='missing'

  const subject = isMissing
    ? `[Action Required] Missing Documents - Claim ${claimId} - ${policyNumber} - Mpumelelo Services`
    : `[Follow-Up] Claim Update Requested - ${claimId} - ${policyNumber} - Mpumelelo Services`

  const htmlMissing = `
    <div style="font-family:Inter,Arial,sans-serif; max-width:600px">
      <div style="background:#0E7A7B; color:white; padding:16px; border-radius:12px 12px 0 0"><b>Mpumelelo Services</b> - Success in isiZulu • Since 2006 • 100% Black Owned</div>
      <div style="padding:20px; border:1px solid #eee; border-top:0; border-radius:0 0 12px 12px">
        <p>Dear ${entityName||'Client'},</p>
        <p>We are missing the following documents for your claim <b>${claimId}</b> (Policy ${policyNumber}):</p>
        <ul>${(missingDocs||[]).map((d:string)=>`<li>${d}</li>`).join('')}</ul>
        <p><b>Please upload via the Mpumelelo Client Portal:</b> Login with your Policy Number + Password → My Claims → Upload Missing Docs (Gallery or PDF)</p>
        <p>Source: SA Insurance Standard - FAIS Compliant</p>
        <p>Municipal clients: Please ensure Municipal Manager authorization and Council Resolution ref attached if applicable (MFMA Sec 110).</p>
        <p>Regards,<br/>Mpumelelo Services Brokerage<br/>50 Constantia Blvd, Roodepoort<br/>082 539 6224 • www.mpumeleloservices.co.za</p>
      </div>
    </div>
  `

  const htmlUpdate = `
    <div style="font-family:Inter,Arial,sans-serif; max-width:600px">
      <div style="background:#0F2B3C; color:white; padding:16px; border-radius:12px 12px 0 0"><b>Mpumelelo Services</b> - Claim Follow-Up</div>
      <div style="padding:20px; border:1px solid #eee; border-top:0; border-radius:0 0 12px 12px">
        <p>Dear ${entityName||'Client'},</p>
        <p>We have chased an update for your claim <b>${claimId}</b> (Policy ${policyNumber}) with the insurer.</p>
        <p>Current status per insurer: Under Review. We will notify you once feedback is received via portal.</p>
        <p>You can view basic status update in your portal: Active Claims → ${claimId}</p>
        <p>Regards,<br/>Mpumelelo Services<br/>082 539 6224</p>
      </div>
    </div>
  `

  try {
    await resend.emails.send({ from, to: clientEmail, subject, html: isMissing ? htmlMissing : htmlUpdate })
    return NextResponse.json({ ok: true })
  } catch (e:any) {
    return NextResponse.json({ ok:false, error: e.message }, { status: 500 })
  }
}
