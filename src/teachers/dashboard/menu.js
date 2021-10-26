




import { Link  } from 'react-router-dom';

import "./header.css";
function Menu(props){
 
  const handle=()=>{
    if(props.hide){
     props.hide();
    }
   }
    return(
      <div class="list-group sidemenu">
         <Link  to="/dashboard" onClick={handle} className="list-group-item list-group-item-action" style={{padding:"12px",borderBottom:"1px solid silver",background:"inherit"}}><span>Dashboard</span></Link>
         <Link to="/settings" onClick={handle} className="list-group-item list-group-item-action" style={{padding:"12px",borderBottom:"1px solid silver",background:"inherit"}}><span>Settings</span></Link>
      </div>
      );
  }
  
  export default Menu;