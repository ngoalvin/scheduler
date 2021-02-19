import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => setState({...state, day});

  const findDayIndex = function(days) {
    for (let i = 0; i < days.length; i++) {
      if (days[i].name === state.day) {
        return i;
      }
    }
  }
  const copyDayArr = (days) => {
    const arr = [];
    for (let day of days) {
      const copy = {...day}
      arr.push(copy);
    }
    return arr;
  }

  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const index = findDayIndex(state.days)
    const newDayArr = copyDayArr(state.days)
    newDayArr[index].spots -= 1;

    return axios.put(`api/appointments/${id}`, {interview})
    .then(() => {
      setState({
        ...state,
        appointments,
        days:newDayArr
      });
    })
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

    const index = findDayIndex(state.days)
    const newDayArr = copyDayArr(state.days)
    newDayArr[index].spots += 1;

    return axios.delete(`api/appointments/${id}`).then(() => { setState({
      ...state,
      appointments,
      days:newDayArr
    })
  })
  }

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



  return { state, setDay, bookInterview, cancelInterview }

}