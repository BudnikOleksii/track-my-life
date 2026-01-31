import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Track My Life',
  description: 'Application for tracking life events',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
