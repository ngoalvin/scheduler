import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList"
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors";
import { resolvePlugin } from "@babel/core";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.put(`api/appointments/${id}`, {interview})
    .catch(e => console.log(e))
  }
  const cancelInterview = function(id) {
    const appointment = { 
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
    return axios.delete(`api/appointments/${id}`)
  }

  const interviewersList = getInterviewersForDay(state, state.day);
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key = {appointment.id}
      {...appointment}
      interview = {interview}
      interviewers = {interviewersList}
      bookInterview = {bookInterview}
      cancelInterview = {cancelInterview}
      />
      )
    })
    

    
  const setDay = day => setState({...state, day});

  useEffect( () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {
      setState(prev => (
      {...prev, days:[...all[0].data], 
      appointments:{...all[1].data}, interviewers:all[2].data}))
      console.log(all[2].data)
    })
  }, [])

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
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
