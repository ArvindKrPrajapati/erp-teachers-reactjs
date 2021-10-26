



  import { useHistory , Redirect ,Link} from "react-router-dom";
  import {auth} from '../../auth.route';
  
  
  
  const department=["Computer science","Electronics and comm (ECE)","Mechanical","Civil","Electrical (EEE)"];
 
  function TeacherLogin(){
    const history=useHistory();
    if(!auth()){
     const handleSubmit=(e)=>{
      e.preventDefault();
      alert("s")
     }
    
  
return(
      <div className="container-fluid h-100 bg-light">
       <section className="row h-100">
        <article className="col-12  col-md-6 d-flex align-items-center justify-content-center">
         <nav className="p-5 pb-0 pb-md-5">
          <div className="p-md-3">
           <p className="display-4">ERP for collage </p>
           <p style={{fontSize:"1.1rem"}}>Manage your students Attendence Record and assignment on a single click</p>
           <Link className="btn btn-outline-primary mb-2" to="/">Login instead</Link>
          </div>
         </nav>
        </article>
        <article className=" col-12 col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleSubmit}>
             <div className="shadow p-5 bg-white">
              <h4>Teacher's Signup</h4><br/>
              <div className="alert alert-danger p-2 text-center" style={{display:"none"}} id="alert"></div>
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" id="name" />
             
              <label htmlFor="mobile" className="form-label">Mobile</label>
              <input type="number" className="form-control" name="mobile" id="mobile" />
             
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" name="password" id="password" />
               
             <label htmlFor="sem" className="form-label">Department</label>
             <select className="form-select" id="sem">
            {
              department.map((d,i)=>{
                return(
                 <option value={i+1}>{d}</option>
                )
              })
            }
           
             </select>
             <div className="form-check mt-3">
              <input className="form-check-input" type="checkbox" id="hod"/>
              <label className="form-check-label" for="hod">
                Are you a HOD ?
              </label>
            </div>

              <button  className="btn btn-primary mt-3 w-100">Signup</button>
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
  
  
