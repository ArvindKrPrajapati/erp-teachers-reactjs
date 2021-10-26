





  function Csv({presentStudent, percentage,date,subject}){
   
   const convert=(e)=>{
     e.target.disabled=true;
     let csvString ="data:text/csv;charset=utf-8,"+ [
       [
         "Roll no",
         "Name"
       ],
        ...presentStudent.map(item =>[
            item.roll,
            item.name
         ])
   ,["present="+presentStudent.length,"present(%)="+percentage]].map(e => e.join(",")) 
   .join("\n");
  
     var encodedUri = encodeURI(csvString);
     var link = document.createElement("a");
     link.setAttribute("href", encodedUri);
     link.setAttribute("download", subject+"-"+date+".csv");
     e.target.disabled=false;
    link.click(); 
   }
   
    return(
     <div className="pb-5" >
      <button className="btn btn-secondary" onClick={convert}>export as csv</button>
     </div>
      );
  }
  
  export default Csv;