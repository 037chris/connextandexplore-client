import React, { ReactNode } from 'react'

type FormWrapperProps = {
    title: string
    children: ReactNode
}

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-center pt-12'>
        {title}
      </h2>
    <div className='grid gap-3 p-12 justify-start'>
      {children}
    </div>
  </div>

  )
}
