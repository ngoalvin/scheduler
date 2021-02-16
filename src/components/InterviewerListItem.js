import React from "react";
import "components/InterviewerListItem.scss"
const classNames = require('classnames');

export default function InterviewerListItem(props) {
  const { name, avatar, setInterviewer } = props;

  const buttonClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  return (
    <li className={buttonClass} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && name}
    </li>
  );
}