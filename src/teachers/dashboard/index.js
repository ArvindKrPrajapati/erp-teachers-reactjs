


import { Switch , Route ,Redirect } from 'react-router-dom';

 import Menu from './menu';
 import Dashboard from './dashboard';
 import StudentsList from '../myclass';
 import Header from './header';
 import {auth} from '../../auth.route';

  function Index(){
   // alert(auth())
    if(auth()){
    return (
      <div className="container-fluid h-100">
      <div className="row h-100">
       <div className="col-2 d-none d-md-block h-100 p-0 bg-primary" style={{position:"fixed",overflow:"hidden"}}>
         <Menu/>
       </div>
       <div className="col-md-10 h-100 p-0 offset-md-2">
         <Header/>
         <section className="container">
           <Switch>
            <Route path="/dashboard/:id/students">
              <StudentsList/>
            </Route>
            <Route  path="/dashboard">
              <Dashboard/>
            </Route>
           </Switch>
         </section>
       </div>
      </div>
      </div> 
     );
    }else{
      return(
      <Redirect to="/"/>
      );
    }
  }
  
  export default Index;