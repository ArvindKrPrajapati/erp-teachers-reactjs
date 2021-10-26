



import { Link , useParams } from 'react-router-dom';


function Card({myClass}){
   const {id}=useParams();
   
   const data=()=>{
    return myClass.find((o)=>o.id==id);
   }
   
   
   return(
     <article className="row pt-3 pb-3">
      <div>
       <span style={{fontSize:"1.3rem"}}>{data() && data().subject}</span><br/>
       <span>{data() && data().sem}th Semester</span><br/><br/>
      </div>
       <Link className="text-dark text-decoration-none p-0" to={`/dashboard/${id}/attendence`}>
        <div className="col-md-4 card p-0 " style={{borderRadius:"10px"}}>
          <img alt="attendence" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg-0X3ngyE8HLVdo6Qs1NrS9HnL2PZ7phDlw&usqp=CAU" style={{borderRadius:"10px 10px 0px 0px"}}/>
            <div className="card-body">
              <span className="card-title" style={{fontSize:"1.3rem"}}>Attendence</span><br/>
               <small> 
                view or add {data() && data().subject} attendence
               </small>
            </div>
          </div>
         </Link>
        </article>
      );
  }
  
  export default Card;