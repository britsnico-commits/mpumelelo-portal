
import './globals.css'
export const metadata = { title: 'Mpumelelo Services - Insurance Portal', description: 'Broker & Client Portal - 100% Black Owned Since 2006' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className="bg-[#F8FAFB] text-[#0F2B3C]">{children}</body></html>)
}
