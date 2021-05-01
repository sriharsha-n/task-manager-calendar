import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import Button from '@material-ui/core/Button';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditSharpIcon from '@material-ui/icons/Edit';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp';
import axios from "./axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    left:'20%',
    position:'relative',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '50%',
    flexShrink: 0,
  },
  secondaryHeading: {
    flexBasis:'40%',
    textAlign:"left",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function Tasks(props) {
  
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const tasks = props.tasks;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDelete = (id) => {
    axios.delete("/api/task/"+id+"/")
    .then((res) => {
      console.log(res);
      props.refreshData();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <div className={classes.root}>
      {tasks.map((task,index) => {
      return (
        <>
        <Accordion expanded={expanded === task.id} onChange={handleChange(task.id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={task.id+"bh-content"}
          id={task.id+"bh-header"}
        >
          <Typography className={classes.heading}>{task.name}</Typography>
          <Typography className={classes.secondaryHeading}>{task.status}</Typography>
           <EditSharpIcon color="primary" onClick={() => props.handleEdit(task.name,task.status,task.description,task.id)} /> 
            <DeleteSharpIcon color="secondary" onClick={() => handleDelete(task.id)} />
        </AccordionSummary >
        <AccordionDetails>
          <Typography>
            {task.description}
          </Typography>
        </AccordionDetails>
      </Accordion>
      </>
  )
      })}
    </div>
  );
}

export default Tasks;
