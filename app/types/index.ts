import { Listing, Reservation, User } from "@prisma/client";


export type SafeUser = Omit<
User,
"createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeReservation = {
    id: string,
    userId: string,
    listingId: string,
    startDate: Date,
    endDate: Date,
    totalPrice: number,
    createdAt: Date,
    listing: SafeListing
}

export type SafeListing = {
  id: string,
  title: string,
  description: string,
  imageSrc: string,
  createdAt: Date,
  category: string,
  roomCount: number,
  bathroomCount: number,
  guestCount: number,
  locationValue: string,
  userId: string,
  price: number
}