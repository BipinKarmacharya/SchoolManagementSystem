import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Meeting",
      start: new Date(),
      end: new Date(),
    },
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      const startTime = window.prompt("Enter start time (HH:mm AM/PM)");
      const endTime = window.prompt("Enter end time (HH:mm AM/PM)");

      if (startTime && endTime) {
        const startDate = moment(start).set({
          hour: moment(startTime, "hh:mm A").hour(),
          minute: moment(startTime, "hh:mm A").minute(),
        }).toDate();

        const endDate = moment(end).set({
          hour: moment(endTime, "hh:mm A").hour(),
          minute: moment(endTime, "hh:mm A").minute(),
        }).toDate();

        setEvents([
          ...events,
          {
            start: startDate,
            end: endDate,
            title,
          },
        ]);
      }
    }
  };

  const handleDelete = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
  };

  return (
    <div className="calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelect}
        style={{
          height: 350,
          // width: 700,
          backgroundColor: "#f0f0f0",
          padding: 20,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      />
      <div className="events-box">
        <h3>Upcoming Events</h3>
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <strong>{event.title}</strong> -{" "}
              {moment(event.start).format('MMMM Do YYYY, h:mm a')} to{" "}
              {moment(event.end).format('h:mm a')}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyCalendar;