import React from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";



export default function Appointment (props) {
  
  const { interview, time, id, interviewers } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";  

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition("CREATE");
  }
  console.log(interviewers, "HERE")
  // const isInterview = mode === SHOW ? 
  // <Show student={interview.student} interviewer={interview.interviewer.name} /> : 
  // <Empty onAdd={onAdd} />;

  return (
    <article className="appointment">
      <Header time={time}/>
      {/* {isInterview} */}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
    </article>
  )
}