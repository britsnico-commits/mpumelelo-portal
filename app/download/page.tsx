'use client'
import { useEffect, useState } from 'react'

export default function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)

  useEffect(()=>{
    const handler = (e:any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  },[])

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const choice = await deferredPrompt.userChoice
      if (choice.outcome === 'accepted') setCanInstall(false)
      setDeferredPrompt(null)
    } else {
      alert('On iPhone: Tap Share button (square with arrow) → Add to Home Screen\nOn Android: Tap 3 dots top right → Install App / Add to Home Screen')
    }
  }

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="w-full max-w-sm mt-10">
        <div className="flex flex-col items-center">
          <img src="/logo.png" alt="logo" className="h-16 w-auto" />
          <h1 className="font-bold text-xl mt-4">Mpumelelo Services</h1>
          <p className="text-xs text-gray-500">Since 2006 • 100% Black Owned • Insurance Broker Portal</p>
        </div>

        <div className="mt-8 bg-gray-900 text-white rounded-2xl p-6 text-center">
          <div className="text-4xl">📲</div>
          <div className="font-bold mt-2">Download App</div>
          <div className="text-xs opacity-80 mt-1">Tap button below to install on your phone - Works like a real app, no Play Store needed</div>
          <button onClick={installApp} className="mt-4 w-full h-14 bg-[#0E7A7B] rounded-xl font-bold text-lg">
            {canInstall ? '⬇️ Install Mpumelelo App Now' : '⬇️ Download / Install App'}
          </button>
          <div className="text-[10px] mt-2 opacity-60">If button doesn't install, follow steps below</div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
            <div className="font-bold text-sm">For Android (Samsung, etc):</div>
            <div className="text-xs mt-1">1. Tap <b>3 dots ⋮</b> top right of Chrome<br/>2. Tap <b>Install app</b> or <b>Add to Home Screen</b><br/>3. Tap <b>Install</b> → App appears on home screen like 【entity-WhatsApp¦canonical_name=WhatsApp】</div>
            <div className="mt-2 text-xs">Or tap the big green button above</div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="font-bold text-sm">For iPhone:</div>
            <div className="text-xs mt-1">1. Open in <b>Safari</b> (not Chrome)<br/>2. Tap <b>Share button</b> (square with arrow up)<br/>3. Scroll down → <b>Add to Home Screen</b><br/>4. Tap <b>Add</b> → App on home screen</div>
          </div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="font-bold text-sm">Direct Link to Share:</div>
            <div className="text-xs mt-1 p-2 bg-gray-100 rounded-lg break-all">https://mpumelelo-portal.vercel.app/download</div>
            <div className="text-xs mt-2">Send this link on 【entity-WhatsApp¦canonical_name=WhatsApp】 to clients: "Click link → Download App → Login with your Policy Number"</div>
            <a href="https://mpumelelo-portal.vercel.app" className="mt-3 block text-center h-10 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold">Go to Login →</a>
          </div>
          <div className="text-[10px] text-gray-400 text-center mt-4">50 Constantia Blvd, Roodepoort • 082 539 6224<br/>Your data is protected under POPIA • No insurer names shown, only "insurer/underwriter"</div>
        </div>
      </div>
    </div>
  )
}
