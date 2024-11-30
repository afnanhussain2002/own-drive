import Image from 'next/image'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='flex min-h-screen'>
   <div className='bg-brand p-10'>
    <div>
        <Image
        src='/favicon.ico'
        alt='logo'
        width={16}
        height={16}
        className='h-auto'
        />
        <div className='space-y-5 text-white'>

            <h1 className='h1'>Manage your files the best way</h1>
            <p className='body-1'>This is a place where you can manage all your documents </p>

        </div>
    </div>
   </div>
   {children}
    </section>
  )
}

export default Layout