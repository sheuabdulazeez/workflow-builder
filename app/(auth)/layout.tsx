import React, { ReactNode } from 'react'

function AuthLayout({children}: React.PropsWithChildren) {
  return (
    <div className='flex items-center justify-center h-screen'>
        {children}
    </div>
  )
}

export default AuthLayout