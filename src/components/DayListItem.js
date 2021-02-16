import React from "react";
import "components/DayListItem.scss"
const classNames = require('classnames');

export default function DayListItem(props) {
  const buttonClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full" : !props.spots
  })

  const formatSpots = function (spots) {
    if (!spots) {
      return `no spots remaining`
    } else if (spots === 1) {
      return `1 spot remaining`
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li className={buttonClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
