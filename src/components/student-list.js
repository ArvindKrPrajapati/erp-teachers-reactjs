   
  
  
  
  import {useState,useEffect} from 'react';       
  import Semester from '../teachers/dashboard/semester';
  
    function StudentList(){
      const [studentlist,setStudentlist]=useState([]);    
      
    const fetchStudent=()=>{
      const url="http://localhost:8080/erp/student-list.php";
       fetch(url)
       .then(res=>res.json())
       .then((data)=>{
         setStudentlist(data);
       })
       .catch((err)=>{
         alert(err);
       });
       
     }
     
      useEffect(()=>{
        fetchStudent();
      },[]);
      
    return(
      <h1>hello</h1>
      );
    }
    
    export default StudentList;