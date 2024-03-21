"use client"

import { Reservation, User } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import Heading from '../components/Heading'
import Container from '../components/container/Container'
import { useRouter } from 'next/navigation'
import axios from "axios"
import toast from 'react-hot-toast'
import ListingCard from '../components/Listings/ListingCard'
import { SafeReservation } from '../types'
export
interface TripsClientProps  {
reservations: SafeReservation[],
currentUser: User
}
const TripsClient:React.FC<TripsClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");

    const onCancel = useCallback((id: string)=>{
      setDeletingId(id);

      axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation Canceled');
        router.refresh();
      })
      .catch((error: any)=>{
        toast.error(error?.response?.data?.error);
      })
      .finally(()=>{
        setDeletingId('');
      })
    }, [router])
  return (
    <Container> 
        <Heading
          title='Trips'
          subtitle="Where you've been and where you're going"
        />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {reservations.map((reservation)=>(
            <ListingCard
              key={reservation.id}
              reservation={reservation}
              actionId={reservation.id}
              data={reservation.listing}
              currentUser={currentUser}
              onAction={onCancel}
              disabled = {deletingId === reservation.id}
              actionLabel='Cancel Reservation'
            />
          ))}
        </div>
    </Container>
  )
}

export default TripsClient