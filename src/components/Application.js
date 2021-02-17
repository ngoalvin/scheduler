import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id:3,
    time:"3pm",
    interview: {
      student: "Alvin Ngo",
      interviewer: {
        id:2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];

export default function Application(props) {

  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const setDay = day => setState({...state, day});

  const setDays = (days) => {
    setState(prev => ({...prev, days}))
  }

  useEffect( () => {
    axios.get('/api/days').then(res => {
      setDays(res.data)
    })
  }, [])

  const appointmentsRenderer = appointments.map(appointment => {
    return (
      <Appointment
      key = {appointment.id}
      {...appointment}
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
      <DayList
      days={state.days}
      day={state.day}
      setDay={setDay}
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
    />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointmentsRenderer}
      </section>
    </main>
  );
}
