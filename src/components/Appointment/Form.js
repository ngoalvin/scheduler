import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const { onSave, interviewers, onCancel } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset =  () => {
    setName('');
    setInterviewer('');
  }

  const cancel = () => {
    reset();
    onCancel();
  }

  const onSubmit = (event) => {
    event.preventDefault();
    // if (!name || !interviewer) {
    //   const errorMessage = !name ? "Student name cannot be blank." : "You must select an interviewer.";
    //   setError(errorMessage)
    //   return;
    // }
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    onSave(name, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form onSubmit={onSubmit} autoComplete="off">
        <input
          onChange={ (event)=> setName(event.target.value)}
          className="appointment__create-input text--semi-bold"
          name="name"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          data-testid="student-name-input"
        />
      </form>
      <section className="appointment__validation">{error}</section>
      <InterviewerList interviewers={interviewers} value={interviewer} onChange={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button onClick={cancel} danger>Cancel</Button>
        <Button onClick={onSubmit} confirm>Save</Button>
      </section>
    </section>
  </main> 
  )
}