
import React from "react";
import Style from "../../style/page-1.module.css"
const Page=()=>{

  
    return (
      <>
      
      <div className={Style.parent}>
      <div className={Style.container1}>
        <div className={Style.c1}>HIRE ME</div>
        <ul>
          <li>  DashBoard</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>
          <li>Home</li>  
        </ul>

      
      </div>
      <div className={Style.container2}>
        <div className={Style.header}></div>
        <div className={Style.common}></div>
        <div className={Style.div1}> 

        </div>
        <div className={Style.common}></div>
        <div className={Style.div2}>
          <table >
            <tr>
              <td>Name</td>
              <td>Age</td>
              <td>home</td>
              <td>Name</td>
              <td>Age</td>
              <td>home</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
      
      </>


    )



}

export default Page;
