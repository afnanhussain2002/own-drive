import Image from 'next/image'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='flex min-h-screen'>
   <div className='hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5'>
    <div className='flex max-h-[800px] max-w-[430px] flex-col space-y-12 justify-center'>
        <Image
        src='/assets/icons/logo-full.svg'
        alt='logo'
        width={224}
        height={82}
        className='h-auto'
        />
        <div className='space-y-5 text-white'>

            <h1 className='h1'>Manage your files the best way</h1>
            <p className='body-1'>This is a place where you can manage all your documents </p>

        </div>
        <Image
        src='/assets/images/files.png'
        alt='files'
        width={342}
        height={342}
        className='transition-all hover:rotate-2 hover:scale-105'
        />
    </div>
   </div>
   {children}
    </section>
  )
}

export default Layout