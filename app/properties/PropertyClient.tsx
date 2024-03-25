"use client"

import { Listing, User } from '@prisma/client';
import React, { useCallback, useState } from 'react';
import Heading from '../components/Heading';
import Container from '../components/container/Container';
import ListingCard from '../components/Listings/ListingCard';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
interface PropertyClientProps {
    properties: Listing[],
    currentUser: User
}
const PropertyClient:React.FC<PropertyClientProps> = ({
  properties,
  currentUser
}) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");
  
  const onCancel = useCallback((id: string)=>{
    setDeletingId(id);

    axios.delete(`/api/listings/${id}`)
    .then(() => {
      toast.success('Listing Deleted');
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
         title='Properties'
         subtitle='List of properties you have'
        />
         <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {properties.map((property)=>(
           <ListingCard
           key={property.id}
           actionId={property.id}
           data={property}
           currentUser={currentUser}
           onAction={onCancel}
           disabled = {deletingId === property.id}
           actionLabel='Delete Property'
         />
          ))}
        </div> 
    </Container>
  )
}


export default PropertyClient
