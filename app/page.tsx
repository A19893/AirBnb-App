import { Listing } from "@prisma/client";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/Listings/ListingCard";
import Container from "./components/container/Container";

interface HomeParams {
  searchParams: IListingParams
}

export default async function Home({searchParams}: HomeParams) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if(listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {
              listings.map((listing: Listing)=> {
                return(
                  <ListingCard key={listing.id} data={listing} currentUser={currentUser}/>
                )
              })
            }
        </div>
      </Container>
    </ClientOnly>
  )
}
 