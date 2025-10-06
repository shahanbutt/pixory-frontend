import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Studio Printique',
  description: 'Create lasting keepsakes of your cherished moments with Studio Printique photobooks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white font-inter text-brand-charcoal antialiased">
        {children}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <Script
          dangerouslySetInnerHTML={{
            __html: 'window.FontAwesomeConfig = { autoReplaceSvg: "nest"};'
          }}
        />
        <style dangerouslySetInnerHTML={{
          __html: '::-webkit-scrollbar { display: none; }'
        }} />
      </body>
    </html>
  )
}
