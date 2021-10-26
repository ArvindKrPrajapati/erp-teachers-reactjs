



  import { useHistory , Redirect } from "react-router-dom";
  import { useState} from "react";
  import {auth} from '../../auth.route';
  
  function TeacherLogin(){
    const history=useHistory();
    const [isLoading,setIsLoading]=useState(false);
    
    if(!auth()){
    const handleSubmit=(e)=>{
      e.preventDefault();
      const email=e.target[0].value;
      const password=e.target[1].value;
      const alertBox=  document.getElementById("alert");
      alertBox.style.display="none";
      
    
      if(email && password){
        setIsLoading(true);
       // const url="http://localhost:8080/api/v1/login.php";
        const url="/api/v1/login.php";
      
      fetch(url,{
        method:"POST",
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({email, password})
      })
       .then(res=>res.json())
       .then((data)=>{
         setIsLoading(false);
          if(data.success){
          // alert(JSON.stringify(data))
           localStorage.setItem("user",JSON.stringify(data));
            history.push("/dashboard");
          } else{
           alertBox.style.display="block";
           alertBox.innerHTML="wrong credentials";
          }
       })
       .catch((err)=>{
         setIsLoading(false);
         alertBox.style.display="block";
          alertBox.innerHTML="server is not responding";
       });
      }else{
        alertBox.style.display="block";
        alertBox.innerHTML="*All fields are required";
      }
    }
    
    return(
      <div className="container-fluid h-100 bg-light">
       <section className="row h-100">
        <article className="col-12  col-md-6 d-flex align-items-center justify-content-center">
         <nav className="p-5 pb-0 pb-md-5">
          <div className="p-md-3">
           <p className="display-4">ERP for Teachers </p>
           <p style={{fontSize:"1.1rem"}}>Manage your students Attendence Record and assignment on a single click</p>
         </div>
         </nav>
        </article>
        <article className=" col-12 col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
             <div className="shadow p-5 bg-white">
              <h4>Teacher's Login</h4><br/>
              <div className="alert alert-danger p-2 text-center" style={{display:"none"}} id="alert"></div>
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" name="email" id="email" />
             
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="password" />
             
              <button disabled={isLoading} className="btn btn-primary mt-3 w-100">
              login 
              <span style={{display:"inline-block",  marginLeft: isLoading ? "10px" : "0px" ,visibility: isLoading ? "visible"  : "hidden"}} className="spinner-border spinner-border-sm"></span>
              </button>
             </div>
          </form>
        </article>
       </section>
      </div>
      );
    }else{
      return(
        <Redirect to="/dashboard"/>
        );
    }
  }
  
  export default TeacherLogin;
  
  
  
  