import React, { ReactNode } from 'react'

function Layout({children}: {children: ReactNode}) {
  return (
    <div className="p-4  md:p-10">{children}</div>
  )
}

export default Layout