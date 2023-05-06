import { ClientOnly } from './components/ClientOnly'
import { RegisterModal } from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Nunito } from "next/font/google"
import ToasterProvider from './providers/ToasterProvider'
import { LoginModal } from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { User } from '@prisma/client'
import { SafeUser } from './types'

const font = Nunito({
  subsets: ["latin"]
})


export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser: User | null = await getCurrentUser();
   const safeUser = currentUser && { ...currentUser, createdAt: currentUser?.createdAt.toISOString(), updatedAt: currentUser?.updatedAt.toISOString(), emailVerified: currentUser?.emailVerified?.toISOString() || null } as SafeUser;
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />  
          <Navbar currentUser={safeUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
