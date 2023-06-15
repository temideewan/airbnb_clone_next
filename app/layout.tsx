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
import RentModal from './components/modals/RentModal'
import SearchModal from './components/modals/SearchModal'

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
  const currentUser: SafeUser | null = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />  
          <RentModal />
          <SearchModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">
        {children}
        </div>
      </body>
    </html>
  )
}
