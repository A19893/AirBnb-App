import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface IParams {
  propertyId?: string;
}


export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
    if (!title || !description || !imageSrc || !category || !roomCount || !bathroomCount || !guestCount || !location || !price) {
        return new Response(
            null, {
            status: 500,
            statusText: "Please fill all the fields!",
        });
    
    }
 const listing = await prisma.listing.create({
    data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id
    }
 });

 return NextResponse.json(listing)
}

export async function DELETE (request:Request, { params }: {params: IParams}){
  const currentUser = await getCurrentUser();

  if(!currentUser) {
      return NextResponse.error();
  }
  
  const { propertyId } = params;
  
  if(!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID')
  }

  const property  = await prisma.listing.deleteMany({
    where: {
      id: propertyId,
      userId: currentUser.id
    }
  })

  return NextResponse.json(property)
}
