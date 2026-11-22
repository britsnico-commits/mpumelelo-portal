export default function FaisPage() {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white min-h-screen">
      <a href="/" className="text-xs text-[#0E7A7B] underline">← Back to Home</a>
      <h1 className="font-bold text-xl mt-2">FAIS Disclosure</h1>
      <p className="text-xs text-gray-500">Financial Advisory and Intermediary Services Act 37 of 2002</p>
      
      <div className="mt-4 space-y-4 text-sm">
        <div className="p-3 bg-gray-50 rounded-xl">
          <div className="font-bold">Mpumelelo Services (Pty) Ltd</div>
          <div className="text-xs">FSP No: [INSERT YOUR FSP NUMBER]<br/>50 Constantia Blvd, Roodepoort<br/>082 539 6224<br/>Since 2006 • 100% Black Owned</div>
        </div>
        
        <h2 className="font-bold">1. We Are a Broker, Not Insurer</h2>
        <p className="text-xs">We act as intermediary between client (municipality/private) and insurer/underwriter. We do not underwrite risk. All references to insurer use term "insurer/underwriter" only, no brand names.</p>
        
        <h2 className="font-bold">2. License</h2>
        <p className="text-xs">Authorized Financial Services Provider. Licensed to advise and intermediary services for short-term insurance: Motor, Property, Liability, Municipal assets. FAIS Fit & Proper compliant.</p>
        
        <h2 className="font-bold">3. Fees & Commission</h2>
        <p className="text-xs">We receive commission from insurer/underwriter as per SA Insurance Standard. No direct fees charged to client for claim logging via this portal (demo free). Municipal clients: MFMA, council resolution, municipal manager approval required - captured in policy record.</p>
        
        <h2 className="font-bold">4. Claims Process</h2>
        <p className="text-xs">Log claim via app → Upload evidence (gallery/PDF) → Broker verifies vehicle reg linked to policy → Insurer notified → Broker updates limited status (Documents Outstanding, In Assessment, Closed) visible to client. Broker can chase missing docs via one-push email.</p>
        
        <h2 className="font-bold">5. Complaints</h2>
        <p className="text-xs">Complaints: 082 539 6224. If unresolved, contact FAIS Ombud: 012 762 5000, info@faisombud.co.za. Demo complaints not applicable.</p>
        
        <h2 className="font-bold">6. Demo Disclaimer</h2>
        <p className="text-xs">Current portal is DEMO with fake documents, fake CAS 412/11/2026, fake vehicles HM 45/46/47 GP GP. Not to be used for real claims until live RLS and real policies imported.</p>
      </div>
    </div>
  )
}
