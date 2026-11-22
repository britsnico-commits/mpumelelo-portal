export default function PrivacyPage() {
  return (
    <div className="p-4 max-w-lg mx-auto bg-white min-h-screen">
      <a href="/" className="text-xs text-[#0E7A7B] underline">← Back to Home</a>
      <h1 className="font-bold text-xl mt-2">POPIA Privacy Policy</h1>
      <p className="text-xs text-gray-500">Mpumelelo Services (Pty) Ltd • Since 2006 • 100% Black Owned</p>
      
      <div className="mt-4 space-y-4 text-sm leading-relaxed">
        <p><b>Demo Notice:</b> This portal is currently in DEMO mode with mock data (Tshwane Municipality POL-MUN-4401, etc). No real client data is stored yet.</p>
        
        <h2 className="font-bold mt-4">1. Information We Collect</h2>
        <p className="text-xs">Policy numbers, entity names (municipalities & private clients), vehicle registrations, claim details, SAPS/CAS numbers, photos/PDFs of damage, location data for roadside assistance, contact details. Stored securely in Supabase EU Frankfurt region.</p>
        
        <h2 className="font-bold">2. Purpose</h2>
        <p className="text-xs">To process insurance claims, verify cover via vehicle registration linked to policy number, provide roadside assistance with location services, notify broker of new claims, and communicate missing documents via one-push chase email.</p>
        
        <h2 className="font-bold">3. Lawful Basis</h2>
        <p className="text-xs">Contract (broker-client agreement), Legitimate Interest (claims processing), Consent (gallery/PDF upload, location for roadside).</p>
        
        <h2 className="font-bold">4. Your Rights (POPIA Section 23-25)</h2>
        <p className="text-xs">You have the right to access, correct, delete, object, and lodge complaint with Information Regulator. Contact: 50 Constantia Blvd, Roodepoort, 082 539 6224.</p>
        
        <h2 className="font-bold">5. Retention</h2>
        <p className="text-xs">Claims retained for 5 years per SA Insurance Standard and FAIS requirements. Demo data deleted before live.</p>
        
        <h2 className="font-bold">6. Security</h2>
        <p className="text-xs">Policy number login + password, storage buckets claim-docs, policy-docs, roadside-photos with RLS policies. Demo uses Allow All - will be replaced with secure policies before live.</p>
        
        <h2 className="font-bold">7. No Insurer Branding</h2>
        <p className="text-xs">We are a broker, not insurer. We refer to "insurer/underwriter" only, no insurer brand names shown.</p>
        
        <div className="mt-6 p-3 bg-teal-50 rounded-xl text-xs">
          <b>Contact for POPIA requests:</b><br/>Mpumelelo Services, 50 Constantia Blvd, Roodepoort<br/>Tel: 082 539 6224<br/>Data stored: Supabase EU Frankfurt
        </div>
      </div>
    </div>
  )
}
