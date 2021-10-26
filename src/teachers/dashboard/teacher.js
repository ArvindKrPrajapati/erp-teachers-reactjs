



import { useEffect , useState } from 'react';
import { useHistory } from 'react-router-dom';

function Teacher(){
   const [teacherData , setTeacherData]=useState({});
   
   const history=useHistory();
   
   useEffect(()=>{
     const teacher=localStorage.getItem("user");
     setTeacherData(JSON.parse(teacher));
   },[]);
   
   const logout=()=>{
     localStorage.clear();
     history.push("/");
   }
   
    return(
       <article className="row pt-2 pb-3 border-bottom">
         <div className="col-8 d-flex align-items-center">
           <nav>
             <span className="display-6">{teacherData ? teacherData.name : "undefined"}</span><br/>
             <small>{teacherData ? teacherData.branch : "undefined"}</small>
           </nav>
         </div>
         <div className="col-4 d-flex align-items-center justify-content-end">
          <button className="btn btn-danger" onClick={logout}>logout</button>
         </div>
       </article>
      );
  }
  
  export default Teacher;