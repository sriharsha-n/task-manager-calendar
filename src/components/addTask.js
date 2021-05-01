import { TextareaAutosize, Button,TextField,InputLabel,Select,MenuItem,FormControl,makeStyles } from '@material-ui/core';
import {useState} from "react"
import axios from './axios';
import Toast from './toast';
import { SnackbarProvider, useSnackbar } from 'notistack';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function AddTask({props}) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar('I love snacks.');
  };

  const handleClickVariant = (variant) => () => {
  };


  const [task, setTask] = useState(props.task);
  const [status, setStatus] = useState(props.status);
  const [description, setDescription] = useState(props.description);
  const [edit, setEdit] = useState(props.edit);
  const [taskid, setTaskid] = useState(props.taskid);
  const [backendError, setBackendError] = useState("");
  const classes = useStyles();
  

  const handleSubmit = () => {
    const variant='success';
    const variantdanger='danger'
    setBackendError("");
    if(edit){
      axios.put("/api/task/"+taskid+"/",{
          name: task,
          description: description,
          status: status,
          date: props.date
        })
        .then((res) => {
          console.log(res);
          enqueueSnackbar('Updated Successfully!', { variant});
          props.refreshData();
        })
        .catch((err) => {
          enqueueSnackbar('Some Error Occured!', { variantdanger });
          setBackendError(err.response.data.message);
        })
        setEdit(false);
    }
    else{
        axios.post("/api/new-task/",{
            name: task,
            description: description,
            status: status,
            date: props.date
          })
          .then((res) => {
            console.log(res);
            enqueueSnackbar('Inserted Successfully!', { variant});
            props.refreshData();
          })
          .catch((err) => {
            enqueueSnackbar('Some Error Occured!', { variantdanger });
            console.log(err);
            // alert(err.response.data.message);
            setBackendError(err.response.data.message);
          })
      }
      setTask("");
      setStatus("");
      setDescription("");
  }

    return (
      <>
        {/* <Toast /> */}
        <FormControl className={classes.formControl}>
            <TextField id="standard-basic"
                label="Standard"
                // helperText={UsernameError}
                // error={UsernameError}
                label="Task Name"
                value={task}
                onChange={(e) => setTask(capitalizeFirstLetter(e.target.value))}
            />
              <InputLabel id="demo-simple-select-label" style={{marginTop:"50px"}} label="Age">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <MenuItem value={"ToDo"}>To Do</MenuItem>
                <MenuItem value={"InProgress"}>In Progress</MenuItem>
                <MenuItem value={"Done"}>Done</MenuItem>
              </Select>
              <TextareaAutosize aria-label="minimum height" style={{margin:"25px 0px 25px 0px"}} value={description} onChange={(e) => setDescription(e.target.value)} rowsMin={4} placeholder="Description" />
              <p style={{color:"red"}}>{backendError}</p>
              <Button color="primary" onClick={() => handleSubmit()} value="submit" variant="contained" >{edit ? "Update" :"Add Task"}</Button>
          </FormControl>
      </>
    );
  }
  

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// export default AddTask;
 
export default function IntegrationNotistack(props) {
  return (
    <SnackbarProvider maxSnack={3}>
      <AddTask props={props} />
    </SnackbarProvider>
  );
}