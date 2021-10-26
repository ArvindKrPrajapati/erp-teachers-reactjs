


 import { Route } from 'react-router-dom';
 import {useState,useEffect} from 'react';       

 import Semester from './semester';
 import Teacher from './teacher';
 import Card from './card';
 import Attendence from './attendence';
 import TakeAttendence from './take-attendence';
 import GetAttendenceByDate from './get-attendence-by-date';
 import MyClass from '../myclass';
 
 import './style.css';
 
 
 function Dashboard(){
   const d=new Date();
   const year=d.getFullYear();
   const month=("0"+(d.getMonth()+1)).slice(-2);
   const day=("0" + d.getDate()).slice(-2);
   const date=`${year}-${month}-${day}`;
    
     const [myClass,setMyClass]=useState([]);
     const teacher_id=JSON.parse(localStorage.getItem("user")).id;
     
     var tryToFetch=0;
    const fetchClass=()=>{
      tryToFetch=tryToFetch+1;
      //const url="http://localhost:8080/api/v1/get-teaching.php"
       const url="/api/v1/get-teaching.php"
        fetch(url,{
         method:"POST",
         headers:{
           'content-type':'application/json'
         },
        body:JSON.stringify({teacher_id})
       })
      .then((res)=>res.json())
      .then((data)=>{
         setMyClass(data.data)
      })
      .catch((err)=>{
        if(tryToFetch<3){
          fetchClass();
        }else{
         alert("server is not responding");
        }
      })
     }
     
   useEffect(()=>{
       fetchClass();
     },[]);
     
   
   return(
     <>
      <Semester myClass={myClass}/>
      <Teacher/>
      <Route exact path="/dashboard/">
       <MyClass myClass={myClass}/>
      </Route>
      <Route exact path="/dashboard/:id">
       <Card myClass={myClass}/>
      </Route>
      <Route exact path="/dashboard/:id/attendence/take">
       <TakeAttendence date={date} myClass={myClass}/>
      </Route>
      <Route exact path="/dashboard/:id/attendence">
       <Attendence myClass={myClass}/>
      </Route>
      <Route exact path="/dashboard/:id/attendence/show/:date">
       <GetAttendenceByDate myClass={myClass}/>
      </Route>
     </>
     );
 }
 
 
 /*
 function Dashboard(){
   const d=new Date();
   const year=d.getFullYear();
   const month=("0"+(d.getMonth()+1)).slice(-2);
   const day=("0" + d.getDate()).slice(-2);
   const date=`${year}-${month}-${day}`;

   return(
     <>
      <Semester/>
      <Teacher/>
      <Route exact path="/dashboard/">
       <Card/>
      </Route>
      <Route exact path="/dashboard/attendence/take">
       <TakeAttendence date={date}/>
      </Route>
      <Route exact path="/dashboard/attendence">
       <Attendence/>
      </Route>
      <Route exact path="/dashboard/attendence/show/:date">
       <GetAttendenceByDate/>
      </Route>
     </>
     );
 }
 */
 
 export default Dashboard;
 
 
