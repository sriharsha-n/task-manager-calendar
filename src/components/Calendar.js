import React, {useState, useEffect} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { Row, Col } from 'reactstrap'
import AddTask  from "./addTask"
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
// import history from './history';
import axios from "./axios";
import Tasks from "./task"


function Calendar(){
  const calendarComponentRef = React.createRef();
    const [calendarEvents, setcalendarEvents] = useState([
        { title: "Event Now", start: new Date()},
        { title: "Event Now", start: new Date() }
    ])
    const [dateTasks, setDateTasks] = useState([]);
    let date=new Date();
    date=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(date.getDate());
    const [selectedDate, setselectedDate] = useState(date);
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [edit, setEdit] = useState(false);
    const [taskid, setTaskid] = useState("")
      
      const  gotoPast = () => {
        let calendarApi = this.calendarComponentRef.current.getApi();
        calendarApi.gotoDate("2000-01-01");
      };

      const bgcolors = {
        "ToDo":"red",
        "InProgress":"blue",
        "Done":"green"
      }

      const fetchEvents = async() =>
      await axios.get('/api/tasks/')
      .then(response => {
        var events=response.data;
        events = events.map(function(obj) {
          obj['title'] = obj['name']; 
          obj['start'] = obj['date'];
          obj['backgroundColor']=bgcolors[obj['status']];
          delete obj['name'];
          delete obj['date'];
          return obj;
      });
        setcalendarEvents(events);
      })
      .catch((err) => {
        console.log(err);
      })
      

      const fetchDateTasks = () => {
       axios.get('/api/tasks/'+selectedDate+"/")
      .then(response => {
        var events=response.data;
        setDateTasks(events);
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const fetchDateEvents = (date) => {
      axios.get('/api/tasks/'+date+"/")
     .then(response => {
       var events=response.data;
       setDateTasks(events);
     })
     .catch((err) => {
       console.log(err);
     })
   }
      

      useEffect(() => {
        fetchEvents();
        fetchDateTasks();
      }, []);

      const refreshData = () => {
          fetchEvents();
          fetchDateTasks();
      }

      const handleEdit = (name,status,description,taskid) => {
        setEdit(false);
        setTask(name);
        setStatus(status);
        setDescription(description);
        setTaskid(taskid);
        setTimeout(() => setEdit(true),1000);
      }

     const handleDateClick = arg => {
        setselectedDate(arg.dateStr);
        setTimeout(() => fetchDateEvents(arg.dateStr), 1000);
      };

    return (
      <Row>
        <Col md={6} style={{borderRight: '2px solid blue'}}>
          <div className="demo-app-calendar">
            <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title"
              }}
              plugins={[dayGridPlugin, interactionPlugin]}
              ref={calendarComponentRef}
              events={calendarEvents}
              dateClick={handleDateClick}
            />
          </div>
        </Col>
        <Col md={6}>
              <h2 style={{textAlign: 'right'}}>Date: {selectedDate} </h2>
              <h3>Tasks </h3>
              <Tasks tasks={dateTasks} handleEdit={handleEdit} refreshData={refreshData} />
            {edit &&  <AddTask date={selectedDate} task={task} taskid={taskid} refreshData={refreshData} status={status} description={description} edit={edit} /> }
            {!edit &&  <AddTask date={selectedDate} edit={edit} refreshData={refreshData} /> }
        </Col>
      </Row>
    );


}

export default Calendar