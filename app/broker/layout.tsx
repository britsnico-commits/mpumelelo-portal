
export default function BrokerLayout({ children }: { children: React.ReactNode }) {
  return (<div><div className="h-14 bg-white border-b flex items-center px-4 justify-between sticky top-0 z-10"><div className="font-bold">Mpumelelo - Broker</div><div className="text-xs text-gray-500">50 Constantia Blvd • 082 539 6224</div></div>{children}</div>)
}
