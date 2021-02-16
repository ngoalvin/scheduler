import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment (props) {

  const { interview, time, id } = props;

  const isInterview = interview ? <Show student={interview.student} interviewer={interview.interviewer.name} /> : <Empty />;

  console.log(props.interview, "HERE");
  return (
    <article className="appointment">
      <Header time={time}/>
      {isInterview}
    </article>
  )
}