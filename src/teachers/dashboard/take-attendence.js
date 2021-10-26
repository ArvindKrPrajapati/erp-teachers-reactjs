







 import {useState,useEffect} from 'react';       
 import { useParams } from 'react-router-dom';
 
 import Csv from './csv';
 
function TakeAttendence({date,myClass}){
  
const [studentlist,setStudentlist]=useState([]);    
const [presentStudent,setPresentStudent]=useState([]);    
const [isLoading , setIsLoading]=useState(false);
 

const user=JSON.parse(localStorage.getItem("user"));
const {id}=useParams();

    const data=()=>{
      return  myClass.find(o=>o.id==id);
     }
    
     
   
  
    var tryToFetch=0;
    const fetchStudent=()=>{
      const branch_id=data().branch_id;
      tryToFetch=tryToFetch+1;
      setIsLoading(true);
      //const url="http://localhost:8080/api/v1/attendence.php";
      const url="/api/v1/attendence.php";
       fetch(url,{
         method:"POST",
         headers:{
           'content-type':'application/json'
         },
         body:JSON.stringify({date,id,branch_id})
       })
       .then(res=>res.json())
       .then((data)=>{
         setIsLoading(false);
         setStudentlist(data);
        // alert(branch_id)
       })
       .catch((err)=>{
         if(tryToFetch<3){
          fetchStudent();
        }else{
         alert("server is not responding");
        }
       });
       
     }
     
      useEffect(()=>{
       if(data()){
         fetchStudent();
       }
      },[myClass.length]);
      
      useEffect(()=>{
       const presentCount= studentlist.filter(item => item.present === true); 
       setPresentStudent(presentCount);
      },[studentlist]);
      
     const present=(e,roll,index)=>{
       const data={
         date,roll,id
       }
        e.target.disabled=true;
         if(studentlist[index].present){
         //delete from db
         data.method="d";
         inOrDel(e,data);
         setStudentlist((prev)=>{
           prev[index]={...prev[index], present:false};
           return [...prev];
         })
        }else{
          data.method="i";
          inOrDel(e,data);
         setStudentlist((prev)=>{
           prev[index]={...prev[index], present:true};
           return [...prev];
         })
       }
     }
    
     const inOrDel=(e,data)=>{
       //const url="http://localhost:8080/api/v1/take-attendence.php"
       const url="/api/v1/take-attendence.php"
        fetch(url,{
           method:"POST",
           headers:{
             'content-type':'application/json'
           },
           body:JSON.stringify(data)
         })
         .then((res)=>res.json())
         .then((data)=>{
           if(data.status){
             e.target.disabled=false ;
             
           }else{
             alert("failed");
           }
         })
         .catch((err)=>{
           e.target.disabled=false;
         });
     }
     
    
     
     
     if(isLoading){
       return(
         <div className="mt-3">loading.....</div>
         );
     }else{
    return(
      <main className="mb-4">
      <article className="row pt-3 pb-3">
       <div className="col">
       <span style={{fontSize:"1.3rem"}}>{data() && data().subject}</span><br/>
        <strong style={{fontSize:"1.2rem"}}>Date : </strong><span>{`${date.split("-")[2]}/${date.split("-")[1]}/${date.split("-")[0]}`}</span>
       </div>
      </article>
      <article className="row pb-3">
       <div className="col table-responsive">
         <table class="table">
          <thead>
            <tr>
              <th scope="col" width="80px">Roll No</th>
              <th scope="col" width="120px">Mark As</th>
              <th scope="col">Name</th>
           </tr>
          </thead>
          <tbody>
          {
          
          studentlist.map((s,i)=>{
           return (
             <tr>
               <th scope="row">{s.roll}</th>
               <td><button  className={(s.present) ? "btn btn-outline-danger" :"btn btn-outline-success"} onClick={(e)=>present(e,s.roll,i)}>
               {(s.present) ? "Absent" : "present"}
               </button></td>
               <td>{s.name}</td>
             </tr>)
            })
          }
          </tbody>
         </table>
       </div>
      </article>
      <div className="p-2 mt-3 mb-3">
       No. of Students Present : {presentStudent.length}<br/>
       Total No. of Students: {studentlist.length} <br/>
       Attendence Percentage :<strong style={{fontSize:"1.2rem"}}> {((presentStudent.length/studentlist.length)*100).toFixed(2)} %</strong>
      </div>
      <Csv presentStudent={presentStudent} percentage={((presentStudent.length/studentlist.length)*100).toFixed(2)} date={date} subject={data() && data().subject}/>
      
      </main>
      );
     }
  }
  
  
  export default TakeAttendence;