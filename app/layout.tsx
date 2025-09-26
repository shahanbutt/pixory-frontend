import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'studioprintique',
  description: 'Create lasting keepsakes of your cherished moments with PrintiQue photobooks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="baloo2-font">{children}</body>
    </html>
  )
}
