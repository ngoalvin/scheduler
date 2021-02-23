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

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer (state, action) {
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