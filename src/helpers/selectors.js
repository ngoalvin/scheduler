export function getAppointmentsForDay({ days, appointments }, day) {
  const filteredDay = days.find((filterDay) => filterDay.name === day);
  return filteredDay
    ? filteredDay.appointments.map((id) => appointments[id])
    : [];
}

export function getInterview( {interviewers}, interview) {
  if (!interview) {
    return null;
  }
  const id = interview.interviewer; 
  return {...interview, interviewer: interviewers[id]}
}

export function getInterviewersForDay ({days, interviewers }, day) {
  const filteredDay = days.find((filterDay) => filterDay.name === day);
  return filteredDay
    ? filteredDay.interviewers.map((id) => interviewers[id])
    : [];
}