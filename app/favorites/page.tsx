import React from 'react'
import ClientOnly from '../components/ClientOnly';
import EmptyState from '../components/EmptyState';

import getCurrentUser from '../actions/getCurrentUser';
import FavoriteClient from './FavoriteClient';
import { getFavoriteListings } from '../actions/getFavoriteListings';

const Favorites = async () => {
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

    const favorites = await getFavoriteListings()

    if(favorites.length === 0) {
        return (
        <ClientOnly>
          <EmptyState
          title='No favorites found'
          subtitle='Looks like you have no favorites'
          />
        </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient
             listings={favorites}
             currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default Favorites