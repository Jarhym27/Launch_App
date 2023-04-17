import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LspLaunchPads from "./03_lsp_launch_pads";
import LspLaunchVehicles from "./02_lsp_launch_vehicles"
import RequestList from "./05_lsp_requests_list";
import "./000_calendar.css"
import axios from "axios"

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});



// const events = [
//     {
//         title: "NaSA Launch",
//         pad: 4,
//         allDay: true,
//         start: new Date(2023, 4, 15),
//         end: new Date(2023, 4, 15),
//     },
//     {
//         title: "SpaceX Launch",
//         pad: 12,
//         start: new Date(2023, 6, 7),
//         end: new Date(2023, 6, 10),
//     },
//     {
//         title: "Blue Origin Launch",
//         pad: 5,
//         start: new Date(2023, 6, 20),
//         end: new Date(2023, 6, 23),
//     },
//     {
//         title: "Blue Origin Launch",
//         pad: 8,
//         start: new Date(2023, 6, 20),
//         end: new Date(2023, 6, 23),
//     },
// ];
function LspCalendar() {
    const [newEvent, setNewEvent] = useState({ title: "", vehicle: "", pad: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);
    useEffect(() => {
        getEvents();
        const interval = setInterval(getEvents, 87000)
        return () => clearInterval(interval)
        // fetch('http://localhost:8080/join/launch_requests')
        //     .then(res => res.json())
        //     .then(data => setAllEvents(data))
    }, [])

    const getEvents = () => {
        axios.get('http://localhost:8080/join/launch_requests')
        .then((res) => {
            setAllEvents(res.data);
        })
    }
  
    function handleAddEvent() {
        for (let i = 0; i < allEvents.length; i++) {
            const d1 = new Date(allEvents[i].start);
            const d2 = new Date(newEvent.start);
            const d3 = new Date(allEvents[i].end);
            const d4 = new Date(newEvent.end);
            if (
                ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
                    (d4 <= d3))
            ) {
                alert("It's booked");
                break;
            }
        }
        setAllEvents([...allEvents, newEvent]);
    }
const eventInfo = ({ allEvents}) =>{
    return(
        <div>
            <div>{allEvents.request_status}</div>
            <div>{allEvents.launch_date}</div>
        </div>
    )
}

    return (
        <div >
            <React.Fragment ><LspLaunchVehicles />
                <LspLaunchPads />
            </React.Fragment>

            <h1>Calendar</h1>
            <h2>Add New Event</h2>
            <div className="App">
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px", border: "solid 1px", bordercolor: "black" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker type="text" placeholderText="Start Date" style={{ marginRight: "10px", border: "solid 1px", bordercolor: "black" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker type="text" placeholderText="End Date" style={{ border: "solid 1px", bordercolor: "black" }} selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>


            <Calendar selectable={true} localizer={localizer} events={allEvents} eventContent={eventInfo} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}
export default LspCalendar;