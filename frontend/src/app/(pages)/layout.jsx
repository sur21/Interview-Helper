import NavBar from '@/components/NavBar'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <NavBar/>
      {children}
    </div>
  )
}

export default layout
