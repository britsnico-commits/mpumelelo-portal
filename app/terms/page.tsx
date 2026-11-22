export default function TermsPage() {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white min-h-screen">
      <a href="/" className="text-xs text-[#0E7A7B] underline">← Back to Home</a>
      <h1 className="font-bold text-xl mt-2">Terms of Use - Demo</h1>
      
      <div className="mt-4 space-y-4 text-sm">
        <p className="text-xs bg-orange-50 border border-orange-200 p-3 rounded-xl"><b>⚠️ DEMO MODE:</b> This is not live. Data shown (Tshwane Municipality, Mogale City, POL-MUN-4401) is mock. Do not upload real ID numbers. Upload function works but stores in demo buckets.</p>
        
        <h2 className="font-bold">1. Access</h2>
        <p className="text-xs">Login via policy number + password 1234 (demo). In live, will be OTP or secure auth. Policy number is security - keep confidential.</p>
        
        <h2 className="font-bold">2. Client Responsibilities</h2>
        <p className="text-xs">Provide accurate SAPS AR/CAS, location, description. Upload only relevant docs: NaTIS, license disc, third party docs, damage photos (gallery/PDF accept image/*, application/pdf). Municipality clients must ensure council resolution and municipal manager details valid per MFMA.</p>
        
        <h2 className="font-bold">3. Broker Responsibilities</h2>
        <p className="text-xs">Verify vehicle registration linked to policy number, confirm cover, notify insurer, update limited status, chase missing docs via Resend email, close claims. Broker sees all docs, client sees limited status.</p>
        
        <h2 className="font-bold">4. Roadside Assistance</h2>
        <p className="text-xs">Mock button with location services. Auto-confirms cover based on backend vehicle registration. Not insurer direct - notifies broker who contacts insurer. Demo location not used for real dispatch.</p>
        
        <h2 className="font-bold">5. Prohibited</h2>
        <p className="text-xs">Do not upload: ID books, bank cards, pornographic content. Do not share policy numbers. Demo: Do not use real vehicle accident data.</p>
        
        <h2 className="font-bold">6. Liability</h2>
        <p className="text-xs">Demo provided as-is. No liability for loss. In live, subject to insurer/underwriter terms and SA Insurance Standard.</p>
        
        <div className="text-[10px] text-gray-400 mt-6">Mpumelelo Services • 50 Constantia Blvd, Roodepoort • 082 539 6224 • Since 2006 • 100% Black Owned</div>
      </div>
    </div>
  )
}
