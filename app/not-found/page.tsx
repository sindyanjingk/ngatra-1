import React from 'react'

type Props = {}

const NotfoundPage = (props: Props) => {
  return (
    <div className="bg-gradient-to-tr from-blue-200 to-violet-500 flex items-center justify-center h-screen w-screen">
        <div className="text-3x text-white">Oops! the pages you are looking for is not found</div>
    </div>
  )
}

export default NotfoundPage