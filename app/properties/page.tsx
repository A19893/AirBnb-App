import React from 'react'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import PropertyClient from './PropertyClient';
import getListings from '../actions/getListings';

const Properties = async () => {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
    return (
     <ClientOnly>
        <EmptyState
          title='Unauthorized'
          subtitle='Please login'
        />
     </ClientOnly>
    )
    }

    const listings = await getListings({userId: currentUser.id})

    if(listings.length === 0) {
        return (
        <ClientOnly>
          <EmptyState
          title='No Properties found'
          subtitle='Looks like you have no properties yet'
          />
        </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertyClient
              properties={listings}
              currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Properties