



    import Tesseract from 'tesseract.js';
    import { useState ,useRef  } from "react";
  
    
    function Ocr({date,id,fetchStudent}){
       const [pro,setPro]=useState(0);
      const [proText,setProText]=useState(null);
       
       
      const read=async (file)=>{
        const data=await Tesseract.recognize(file,'eng+enm+equ',{
          logger:({status,progress})=>{
            if (!progress || !status || status !== 'recognizing text') {
             return null;
             }
             setPro((progress*100).toFixed(2))
             setProText("extracting attendence");
          }
        });
           setProText("saving attendence....");
           
           var roll=[];
          for(let key in (data.data.lines)){
           let s=(data.data.lines[key].text).split(" ")[2];
            if(s){
              roll.push(s.slice(4,7))
             }
            }
           
           saveAttendence(roll);
           
         }
      
      const saveAttendence=(roll)=>{
      // const url="http://localhost:8080/api/v1/save-attendence.php"
       const url="/api/v1/save-attendence.php"
      
        fetch(url,{
           method:"POST",
           headers:{
             'content-type':'application/json'
           },
           body:JSON.stringify({id,roll,date})
         })
         .then((res)=>res.json())
         .then((data)=>{
           if(data.status){
             setProText(null);
             setPro(0);
            fetchStudent();
             //alert(JSON.stringify(data))
           }else{
             alert("failed");
           }
         })
         .catch((err)=>{
           alert("server is not responding")
          });
      }
      
      const handleChange=(e)=>{
        setProText("initializing Tesseract...");
        const file =e.target.files[0];
        read(file)
      }
   return(
      <div>
      <div className="w-100 h-100  align-items-center justify-content-center" style={{position:"fixed",zIndex:"1000", top:"0px",left:"0px", background:"rgba(0,0,0,0.3)", display:proText ? "flex": "none"}}>
       <article className="bg-white rounded p-5">
        <div className="text-center">
         <span className="display-5">{pro}</span> <span>%</span>
        </div>
        {proText}
       </article>
      </div>
      <hr/>
      <label for="file" className="form-label">Use screenshot</label>
       <input type="file"   accept="image/png, image/jpg ,image/jpeg" className="form-control" onChange={handleChange} />
      <hr/>
      </div>
      );
  }
  
  export default Ocr;