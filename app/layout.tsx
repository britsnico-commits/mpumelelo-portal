import './globals.css'

export const metadata = {
  title: 'Mpumelelo Services',
  description: 'Insurance Broker Portal',
  manifest: '/manifest.json',
  themeColor: '#0E7A7B'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0E7A7B" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
      </head>
      <body>
        {children}
        <script dangerouslySetInnerHTML={{__html: `
          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').catch(()=>{})
          }
        `}} />
      </body>
    </html>
  )
}
