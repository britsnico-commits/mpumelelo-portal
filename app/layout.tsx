import './globals.css'

export const metadata = {
  title: 'Mpumelelo Services - Insurance Portal',
  description: 'Broker & Client Portal - Roadside, Claims, Policy - Since 2006',
  manifest: '/manifest.json',
  themeColor: '#0E7A7B'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0E7A7B" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body className="bg-[#F8FAFB] text-[#0F2B3C]">
        <div className="h-14 bg-white border-b flex items-center px-4 gap-3 sticky top-0 z-30">
          <img src="/logo.png" alt="Mpumelelo Services" className="h-8 w-auto" />
          <div className="font-bold text-[#0F2B3C] text-sm">Mpumelelo Services</div>
          <div className="ml-auto text-[10px] text-gray-400">Since 2006</div>
        </div>
        {children}
        <script dangerouslySetInnerHTML={{__html: `if('serviceWorker' in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js')})}`}} />
      </body>
    </html>
  )
}
