import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props){
  const { days, setDay } = props;
  const dayRenderer = days.map(day => 
  <DayListItem
  key = {day.id}
  name = {day.name}
  spots = {day.spots}
  selected = {day.name === props.day}
  setDay = {setDay}
  />)

  return(
    <ul>
      {dayRenderer}
    </ul>
  )
}
