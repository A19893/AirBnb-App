import React from 'react'
import { Range } from 'react-date-range';
import Calendar from '../Inputs/Calendar';
import Button from '../Button/Button';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
    dateRange: {
        startDate: Date;
        endDate: Date;
        key: string;
    }
}
const ListingReservation:React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    disabled,
    dateRange,
    onChangeDate,
    onSubmit,
    disabledDates
}) => {
  return (
    <div className='bg-white rounded-xl border-[1px] border-neutral-500 overflow-hidden'>
      <div className='flex flex-row items-center gap-1 p-4'>
        <div className='text-2xl font-semibold'>
            $ {price}
        </div>
        <div className='font-light text-neutral-500'>
           night
        </div>
      </div>
      <hr/>
      <Calendar 
       value= {dateRange}
       disabledDates= {disabledDates}
       onChange = {(value: any) => onChangeDate(value.selection)}
      />
      <hr/>
      <div className='p-4'>
         <Button
           disabled={disabled}
           label ="Reserve"
           onClick={onSubmit}
         />
      </div>
      <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
        $ {totalPrice}
      </div>
    </div>
  )
}

export default ListingReservation
