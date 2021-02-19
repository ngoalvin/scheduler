import React, {useState} from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const { onSave, interviewers, onCancel } = props;

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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
    if (name && interviewer) {
      onSave(name, interviewer);
    } else {
      cancel();
    }
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
          /*
            This must be a controlled component
          */
        />
      </form>
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