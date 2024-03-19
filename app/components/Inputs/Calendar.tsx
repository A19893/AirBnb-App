import React from 'react'
import { DateRange, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CaldenarProps {
    value: Range;
    disabledDates: Date[];
    onChange: (value: any) => void;
}
const Calendar:React.FC<CaldenarProps> = ({
    value,
    disabledDates,
    onChange
}) => {
  return (
    <DateRange rangeColors={['#262626']} ranges={[value]} date={new Date()} onChange={onChange} direction='vertical' showDateDisplay={false} disabledDates={disabledDates}/>
  )
}

export default Calendar
