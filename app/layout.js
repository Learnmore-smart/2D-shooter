import './globals.css'

export const metadata = {
  title: '2D Shooter Game',
  description: 'A local multiplayer 2D shooting game',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}