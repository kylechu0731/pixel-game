import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { SessionProvider } from "next-auth/react";
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/toast/toaster';

const inter = localFont({ 
  src: "../lib/font/PixelifySans.ttf"
})

export const metadata: Metadata = {
  title: 'Pixel Game',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-black select-none cursor-default")}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
