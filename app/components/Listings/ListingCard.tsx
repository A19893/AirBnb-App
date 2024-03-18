"use client"

import useCountries from "@/app/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client"
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from 'date-fns'
import Image from "next/image";
import HeartButton from "../HeartButton";
interface ListingProps {
    data: Listing;
    reservation?: Reservation;
    currentUser: User |  null;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    onAction? : (id: string) => void;
}
const ListingCard:React.FC<ListingProps> = ({
    data,
    reservation,
    actionId = "",
    actionLabel,
    onAction,
    disabled,
    currentUser,

}) => {
    const router = useRouter();
    const { getByValue } = useCountries();

    const location = getByValue(data.locationValue);

    const handeledCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>)=>{
      e.stopPropagation();

      if(disabled) return;
      onAction?.(actionId);
    },[onAction, actionId, disabled])

    const price = useMemo(()=> {
      if(reservation){
        return reservation.totalPrice
      }

      return data.price;
    }, [reservation, data.price])

    const reservationDate = useMemo(()=>{
      if(!reservation) return null;

      const start = new Date(reservation.startDate);
      const end = new Date(reservation.endDate);

      return `${format(start,'PP')} - ${format(end,'PP')}`
    },[reservation])

  return (
    <div className="col-span-1 cursor-pointer group" onClick={()=> router.push(`/listings/${data.id}`)}>
      <div className="flex flex-col gap-2 w-full">
         <div className="aspect-square w-full relative overflow-hidden rounded-xl">
           <Image fill alt="Image" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition"/>
           <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser}/>
           </div>
         </div>
         <div className="font-semibold text-lg">{location?.region}, {location?.label}</div>
      </div>
    </div>
  )
}

export default ListingCard