import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import classes from "./Lowerheader.module.css"





function LowerHeader() {
  return (
    <div className={classes.lower_container}>
    <ul>
      <li>
        <AiOutlineMenu />
        
        <p>All</p>
      </li>
      <li>Today's Deals</li>
      <li>Primary Video</li>
      <li>Registry</li>
      <li>Customer Service</li>
      <li>Gift Cards</li>
      <li>Sells</li>
      
    </ul>
    
    
    </div>
  )
}

export default LowerHeader