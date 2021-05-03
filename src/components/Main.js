import Calendar from './Calendar'
import { Router,Route,Switch, Redirect } from 'react-router-dom'
import Login  from './login'
import history from './history'
import { ReactSession } from 'react-client-session';
import {useState} from 'react';
import axios from './axios';

function Main() {
  ReactSession.setStoreType("localStorage");
  const [isLogged, setIsLogged] = useState(false);

  const checkLogin = async() => {
    alert('hi');
    await axios.get('/api/is-logged-in/')
      .then(response => {
        var res=response.data;
        alert(res['message']);
        setIsLogged(res['message']);
      })
    .catch((err) => {
      console.log(err);
    });
  }

  checkLogin();

  return (
    <Router history={history}>
        <Switch>
            <Route exact path="/"  > 
                {isLogged ? <Redirect to="/tasks" />: <Login /> }
            </Route>
            <Route path="/tasks" component={Calendar} >
              {isLogged ? <Calendar /> : <Redirect to="/" /> }
            </Route>
        </Switch>
    </Router>
  );
}

export default Main;
