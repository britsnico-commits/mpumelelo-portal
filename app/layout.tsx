import './globals.css'
export const metadata = { title: 'Mpumelelo Services - Insurance Portal', description: 'Broker & Client Portal - 100% Black Owned Since 2006' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFB] text-[#0F2B3C]">
        <div className="h-14 bg-white border-b flex items-center px-4 gap-3 sticky top-0 z-30">
          <img src="/logo.png" alt="Mpumelelo Services" className="h-8 w-auto" />
          <div className="font-bold text-[#0F2B3C] text-sm">Mpumelelo Services</div>
          <div className="ml-auto text-[10px] text-gray-400">Since 2006 • 100% Black Owned</div>
        </div>
        {children}
      </body>
    </html>
  )
}
