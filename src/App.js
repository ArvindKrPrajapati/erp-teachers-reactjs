



import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';

import Dashboard from './teachers/dashboard'
import TeacherLogin from './teachers/login';
import TeacherSignup from './teachers/signup';
import Settings from './settings';



  function App() {
return (
      <main className="h-100">
      <Router>
       <Switch>
         <Route exact path="/">
           <TeacherLogin/>
         </Route>
         <Route exact path="/signup">
           <TeacherSignup/>
         </Route>
         <Route  path="/dashboard">
           <Dashboard/>
         </Route>
         <Route  path="/settings">
           <Settings/>
         </Route>
       </Switch>
      </Router>
      <br/>
      </main>
  );
}



export default App;


