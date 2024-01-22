import React, { ReactNode } from 'react'

type FormWrapperProps = {
  title: string
  children: ReactNode
}

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <>
      <div className="max-grid create-event-form">
        <div className='flex flex-col items-center'>
          <h2 className='text-center'>
            {title}
          </h2>
          <div className='grid gap-3 p-3 justify-start'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
