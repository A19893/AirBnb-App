"use client"

import Container from '@/app/components/container/Container'
import { categories } from '@/app/components/navbar/Categories'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ListingHead from '../../components/Listings/ListingHead'
import ListingInfo from '../../components/Listings/ListingInfo'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import axios from 'axios';
import toast from 'react-hot-toast'
import ListingReservation from '@/app/components/Listings/ListingReservation'
import {Range} from 'react-date-range'
const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    listing: Listing & {
        user: User
    },
    currentUser?: User | null,
    reservations?: Reservation[],

}
const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations = []
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const disabledDates = useMemo(()=>{
      let dates: Date[] = [];

      reservations.forEach((reservation) => {
        const range = eachDayOfInterval({
            start: new Date(reservation.startDate),
            end: new Date(reservation.endDate)
        })
        dates = [...dates, ...range]
      });

      return dates;
    }, [reservations])
    const [loading, setLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);

    const onCreateReservation = useCallback(()=>{
      if(!currentUser) return loginModal.onOpen();
      setLoading(true);

      axios.post(`/api/reservations`, {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initialDateRange);
        // Redirect to /trips
        router.refresh()
      })
      .catch((error)=>{
        toast.error("Something went wrong")
      })
      .finally(()=>{
        setLoading(false);
      })
    },[totalPrice, dateRange, listing?.id, router,currentUser, loginModal]);

    useEffect(()=>{
        if(dateRange.startDate !== dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            )
            if(dayCount*listing.price !== listing.price){
                setTotalPrice(dayCount * listing.price)
            }
            else{
                setTotalPrice(listing.price)
            }
        }
    },[dateRange, listing.price])
    const category = useMemo(()=>{
        return categories.find((item)=> item.label==listing.category);
    },[listing.category])
  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
               <ListingHead
                title={listing.title}
                imageSrc={listing.imageSrc}
                locationValue = {listing.locationValue}
                id={listing.id}
                currentUser = {currentUser}
               />
               <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                <ListingInfo
                 user={listing.user}
                 category = {category}
                 description = {listing.description}
                 roomCount ={listing.roomCount}
                 guestCount={listing.guestCount}
                 bathroomCount = {listing.bathroomCount}
                 locationValue = {listing.locationValue}
                />
                <div className='order-first mb-10 md:order-last md:col-span-3'>
                    <ListingReservation
                      price= {listing.price}
                      totalPrice = {totalPrice}
                      onChangeDate = {(value: any)=> setDateRange(value)}
                      dateRange = {dateRange}
                      onSubmit = {onCreateReservation}
                      disabled ={loading}
                      disabledDates = {disabledDates}
                    />
                </div>
               </div>
            </div>
        </div>
    </Container>
  )
}

export default ListingClient
