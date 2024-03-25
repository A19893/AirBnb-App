import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';


export async function getFavoriteListings(){
   try {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return [];
    }
     const favorites = await prisma.listing.findMany({
        where: {
            id: {
                in: [...(currentUser.favouriteIds || [])]
            }
        }
     })
      
     return favorites;
   }
   catch(error: any){
    console.log(error);
    throw new Error(error);
   } 
}