import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

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