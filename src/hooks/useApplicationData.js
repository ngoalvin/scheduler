import { useEffect, useReducer } from "react";
import axios from "axios";

const updateDays = function (id, appointments, state) {
  const days = state.days.map((day) => {
    if (day.appointments.includes(id)) {
      return {...day, spots: day.appointments.filter((appointmentId) => {
       return (appointments[appointmentId].interview === null)
      }).length }
    } else {
      return day;
    }
  })
  return days
}

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value }
    case SET_INTERVIEW: {
      const interview = action.value.interview ? {...action.value.interview} : null;

      const appointment = {
        ...state.appointments[action.value.id],
        interview
      };
      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };
      const days = updateDays(action.value.id, appointments, state)
      return {...state, appointments, days}
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const setDay = day => dispatch({ type: SET_DAY, value: day })


  const bookInterview = function(id, interview) {

    return axios.put(`api/appointments/${id}`, {interview})
    .then(() => {
      dispatch({
        type: SET_INTERVIEW,
        value: {
          id,
          interview
        }
      });
    })
  }


  const cancelInterview = function(id) {

    return axios.delete(`api/appointments/${id}`).then(() => { 
      dispatch({
        type: SET_INTERVIEW,
        value: {
          id
        }
      })
    })
  }

  useEffect( () => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then(all => {

      dispatch({type: SET_APPLICATION_DATA, 
        value: {
          days:[...all[0].data],
          appointments: {...all[1].data},
          interviewers:all[2].data
      }})
    })
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL)

    webSocket.onopen = function() {
      webSocket.send("ping")
    }

    webSocket.onmessage = function(event) {
      const interviewData = JSON.parse(event.data)
      if (interviewData.type === SET_INTERVIEW) {
        dispatch({
          type: SET_INTERVIEW,
          value: {
            id : interviewData.id,
            interview : interviewData.interview
          }
        })
      }
    }
  }, [])



  return { state, setDay, bookInterview, cancelInterview }

}