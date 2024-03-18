import { User } from '@prisma/client';
import axios from 'axios'
import useLoginModal from './useLoginModal';
import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface IUseFavorite {
    listingId: string;
    currentUser?: User | null;
}

const useFavorite = ({listingId, currentUser}: IUseFavorite) => {
 const router = useRouter();
 const loginModal = useLoginModal();

 const hasFavoriteId = useMemo(() => {
  const list = currentUser?.favouriteIds || [];
   
  return list.includes(listingId)
 },[currentUser, listingId]);

 const toggleFavorite = useCallback(async (e:React.MouseEvent<HTMLDivElement>)=>{
  e.stopPropagation();

  if(!currentUser) {
    return loginModal.onOpen();
  }

  try{
    let request;

    if(hasFavoriteId){
     request = () => axios.delete(`/api/favorites/${listingId}`);
    }
    else{
        request = () => axios.post(`/api/favorites/${listingId}`);
    }
    await request();
    router.refresh();
    toast.success('Success')
  }
  catch(error){
   toast.error('Something went wrong.')
  }
 }, [
    currentUser,
    hasFavoriteId,
    listingId,
    loginModal,
    router
 ])

 return {
    hasFavoriteId,
    toggleFavorite
 }
}

export default useFavorite;