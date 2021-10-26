


 import { Link } from 'react-router-dom';


function Semester({myClass}){
  
  const handleClick=()=>{
    const el=document.getElementById("details");
    el.open=false;
   }
    return (
       <article className="row">
         <div className="col pt-2 pb-3">
           <label htmlFor="sem" className="form-label">My Classes</label>
           <details  id="details">
            <summary className="text-dark btn dropdown-toggle  w-100  flex-start border rounded" style={{padding:"8px"}}>Select One</summary>
            <ul className="list-unstyled">
             {
               myClass.map((o)=>{
                 return(
                  <li><Link to={`/dashboard/${o.id}`} className="dropdown-item p-2 border-bottom" onClick={handleClick}>{o.sem+"th sem- "+o.subject}</Link></li>
                 )
               })
             }
            </ul>
           </details>
         </div>
       </article>
      );
  }
  
  export default Semester;
  
