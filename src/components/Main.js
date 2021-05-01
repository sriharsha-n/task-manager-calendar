import Calendar from './Calendar'
import { Router,Route,Switch, Redirect } from 'react-router-dom'
import Login  from './login'
import history from './history'
import { ReactSession } from 'react-client-session';

function Main() {
  ReactSession.setStoreType("localStorage");

  return (
    <Router history={history}>
        <Switch>
            <Route exact path="/"  > 
                {ReactSession.get("name") ? <Redirect to="/tasks" />: <Login /> }
            </Route>
            <Route path="/tasks" component={Calendar} />
        </Switch>
    </Router>
  );
}

export default Main;
