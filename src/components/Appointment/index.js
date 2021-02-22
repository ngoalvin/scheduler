import React, { useEffect } from "react"
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "./Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


export default function Appointment (props) {
  
  const { interview, time, id, interviewers, bookInterview, cancelInterview } = props;
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING ="SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";  
  const ERROR_SAVING = "ERROR_SAVING"
  const ERROR_DELETE = "ERROR_DELETE"


  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );


  const onAdd = () => {
    transition("CREATE");
  }

  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition("SAVING")
    bookInterview(id, interview)
    .then(() => transition(SHOW))
    .catch((e) => {
      transition(ERROR_SAVING, true)
    })
  }

  const confirmDelete = function() {
    transition(CONFIRM);
  }

  const onConfirm = function() {
    transition(DELETING)
    cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch((e) => {
      transition(ERROR_DELETE, true)
    })
  }

  const onEdit = function() {
    transition(EDIT);
  }

  useEffect(() => {
    if (mode === EMPTY && interview) {
      transition(SHOW);
    } else if (mode === SHOW && !interview) {
      transition(EMPTY);
    }
  }, [interview, transition, mode])

  return (
    <article className="appointment">
      <Header time={time}/>

      {
      mode === EMPTY && 
      <Empty onAdd={onAdd} />
      }

      {
      mode === SHOW && interview && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer.name}
          onDelete={confirmDelete}
          onEdit={onEdit}
        />
      )}

      {
      mode === CREATE && 
      <Form interviewers={interviewers} 
      onCancel={back} 
      onSave={save} />
      }

      {
      mode === SAVING && 
      <Status message="Saving" />
      }

      {
      mode === DELETING && 
      <Status message="Deleting" />
      }

      {
      mode === CONFIRM && 
      <Confirm onConfirm={onConfirm} 
      onCancel={back} />
      }

      {
      mode === EDIT && 
      <Form name={interview.student} 
      interviewers={interviewers} 
      interviewer={interview.interviewer.id} 
      onSave={save} 
      onCancel={back} />
      }

      {
      mode === ERROR_SAVING && 
      <Error message="Could not save." 
      onClose={back}/>
      }

      {
      mode === ERROR_DELETE && 
      <Error message="Could not delete appointment." 
      onClose={back} />
      }

    </article>
  )
}