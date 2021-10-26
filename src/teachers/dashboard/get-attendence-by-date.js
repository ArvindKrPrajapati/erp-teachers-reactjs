


import TakeAttendence from './take-attendence';
import {useParams} from 'react-router-dom';

  function GetAttendenceByDate({myClass}){
   const {date} =useParams();
   
   
    return(
      <>
       <TakeAttendence date={date} myClass={myClass}/>
     </>
      );
  }
  
  export default GetAttendenceByDate;