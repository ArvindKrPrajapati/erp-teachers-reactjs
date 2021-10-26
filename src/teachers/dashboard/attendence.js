




import { Link , useParams} from 'react-router-dom';
import {useState,useEffect} from 'react';       
 
 const months=["January","February","March","April","May","June","July","August","September","October","November","December"];

function Attendence({myClass}){
  const [dates,setDates]=useState([]);    
  const {id}=useParams();
  const [isLoading,setIsLoading]=useState(false);
  
  const date=new Date()
  var m=("0"+(date.getMonth()+1)).slice(-2);
  let y=date.getFullYear();
  
  const [tarikh,setTarikh]=useState({m,y})
   
    const data=()=>{
      return myClass.find((o)=>o.id==id);
     }

   var tryToFetch=0;
  const fetchDates=()=>{
    tryToFetch=tryToFetch+1;
    setIsLoading(true);
      //const url="http://localhost:8080/api/v1/attendence-date.php";
      const url="/api/v1/attendence-date.php";
       fetch(url,{
         method:"POST",
         headers:{
           'content-type':'application/json'
         },
         body:JSON.stringify({month:tarikh.m,year:tarikh.y,id})
       })
       .then(res=>res.json())
       .then((data)=>{
        // alert(JSON.stringify(data))
          setDates(data);
          setIsLoading(false);
       })
       .catch((err)=>{
         setIsLoading(false);
         if(tryToFetch<3){
           fetchDates();
         }else{
          alert("server is not responding");
         }
       });
       
     }
     
 
      useEffect(()=>{
        fetchDates();
      },[tarikh]);
      
      const next=()=>{
        if(Number(tarikh.m)<12){
         let mm=("0"+(Number(tarikh.m)+1)).slice(-2);
         setTarikh({m:mm,y:tarikh.y});
        }else{
          setTarikh({m:"01",y:tarikh.y+1});
        }
        
      }
      
      const current=()=>{
        setTarikh({m,y});
      }
      
      const prev=()=>{
        if(Number(tarikh.m)>1){
         let mm=("0"+(Number(tarikh.m)-1)).slice(-2);
         setTarikh({m:mm,y:tarikh.y});
        }else{
          setTarikh({m:"12",y:tarikh.y-1});
        }
      }
    return(
      <main className="mb-5">
      <article className="row pt-3 pb-3 border-bottom">
        <span className="d-block mb-2" style={{fontSize:"1.6rem"}}>{data() && data().subject}</span>
        <div className="col-12 col-md-6 d-flex align-items-center">
        <span style={{fontSize:"1.1rem"}}> Total class Taken this month ( {dates.length} )</span>
        </div>
        <div className="col-12 col-md-6 d-md-flex align-items-center justify-content-end">
         <Link to={`/dashboard/${id}/attendence/take`} className="btn btn-outline-primary d-block mt-3 mt-md-0" >+ Take Attendence</Link>
        </div>
      </article>
      <article className="row pt-3">
       <div className="col">
        <strong style={{fontSize:"1.2rem"}}>{months[Number(tarikh.m-1)]} {tarikh.y}</strong><br/>
        <small>view attendence</small>
       </div>
      </article>
      <article className="row pt-2 pb-3">
       <div style={{display:isLoading ? "block" : "none"}}>loading....</div>
      {
        dates.map((d)=>{
          return(
          <div className="col-2 col-md-1 p-2">
          <Link to={`/dashboard/${id}/attendence/show/${d.date}`} className="btn btn-outline-light text-success">
            {d.date.split("-")[2]}
          </Link>
          </div>
          )
        })
      }
     
      </article>
      <article className="row">
       <div className="col">
         <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item"><button onClick={prev} className="page-link">previous</button></li>
            <li className="page-item active"><button onClick={current} className="page-link">current</button></li>
            <li className="page-item"><button onClick={next} className="page-link">next</button></li>
          </ul>
        </nav>
       </div>
      </article>
      </main>
      );
  }
  
  
  export default Attendence;