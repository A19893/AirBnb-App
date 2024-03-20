"use client"

import { Reservation, User } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import Heading from '../components/Heading'
import Container from '../components/container/Container'
import { useRouter } from 'next/navigation'

interface TripsClientProps  {
reservations: Reservation[],
currentUser: User
}
const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string)=>{
      
    }, [])
  return (
    <Container> 
        <Heading
          title='Trips'
          subtitle="Where you've been and where you're going"
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          
        </div>
    </Container>
  )
}

export default TripsClient