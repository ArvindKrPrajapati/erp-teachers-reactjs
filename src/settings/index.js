




import {auth} from '../auth.route';
import { Redirect } from 'react-router-dom';

  function Settings(){
    if(auth()){
     const id=JSON.parse(localStorage.getItem("user")).id;
    
     const handleSubmit=(e)=>{
       e.preventDefault();
       const oldP=e.target[0].value;
       const newP=e.target[1].value;
     //  alert(JSON.stringify(e.target[3]))
      if(oldP && newP){
        e.target[2].disabled=true;
       // const url="http://localhost:8080/api/v1/settings/change-password.php";
        const url="/api/v1/settings/change-password.php";
       fetch(url,{
         method:"POST",
         headers:{
           'content-type':'application/json'
         },
         body:JSON.stringify({oldP,newP,id})
       })
       .then(res=>res.json())
       .then((data)=>{
            e.target[2].disabled=false;
         if(data.status){
            e.target[0].value="";
            e.target[1].value="";
            document.getElementById("alertBox").style.display="block";
          }else{
            alert("old password is wrong");
          }
       })
       .catch((err)=>{
         e.target[2].disabled=false;
          alert(err);
       }); 
      }else{
        alert("both fields are required");
      }
     }
    
    return(
      <>
      <nav className="p-3 text-light sticky-top bg-primary">Settings</nav>
      <main className="container">
       <section className="row">
         <article className="col p-4">
         <p className="display-6">Change Password</p>
         <form onSubmit={handleSubmit}>
          <label htmlFor="old" className="form-label">Old Password</label>
          <input type="password" name="old" id="old" className="form-control"/>
         
          <label htmlFor="new" className="form-label">New Password</label>
          <input type="password" name="new" id="new" className="form-control"/>
        
         <button className="btn btn-primary mt-3 w-100" type="submit">Change Password</button>
        
        <div className="alert alert-success p-2 mt-2" style={{display:"none"}} id="alertBox">Password changed</div>
        
         </form>
         </article>
       </section>
      </main>
      </>
      );
    }else{
      return(
      <Redirect to="/"/>
      );
    }
  }
  
  export default Settings;