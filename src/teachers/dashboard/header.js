


import Menu from './menu';
import {useState} from 'react';
import "./header.css";

function Header(){
  const [menu,setMenu]=useState(false);
  
    const showMenu=()=>{
      setMenu(true);
    }
    const hideMenu=()=>{
      setMenu(false);
    }
    return(
        <nav id="nav" className=" p-3 sticky-top  border-bottom">
         <button onClick={showMenu} className="btn d-md-none" style={{position:"absolute",right:"15px",top:"10px"}} id="toggle">
          <span></span>
          <span></span>
          <span></span>
         </button>
         <strong style={{fontSize:"1.1rem"}}>My ERP | Teacher</strong>
         <div id="bg" style={{display:menu ? "block" : "none"}} onClick={hideMenu}></div>
          <div id="menu" style={{transform: menu ? "translateX(0px)" : "translateX(-100%)"}}>
            <Menu hide={hideMenu} />
          </div>
        </nav>
      );
  }
  
  
  export default Header;