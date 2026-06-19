import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growvia — AI-Powered Career OS for Students',
  description: "India's first AI-powered Career Operating System for students",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
