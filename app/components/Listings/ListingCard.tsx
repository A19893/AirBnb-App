"use client"

interface ListingProps {
    data: any,
}
const ListingCard:React.FC<ListingProps> = ({data}) => {
  return (
    <div>{data.title}</div>
  )
}

export default ListingCard