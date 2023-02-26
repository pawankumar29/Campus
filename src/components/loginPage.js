import style from "../style/style.module.css"
import React from 'react'

function loginPage() {
  return (
    <div className={style.parent}>
    <div className={style.container}>
      
      <div className={style.logo}>SIGN IN</div>

     <div className={style.inputField}>

     <label>Email</label>
     <br></br>
     <input type="text"></input>
     <br></br>
     <label>Password</label>
     <br></br>
     <input type="text"></input>
     <br></br>
     </div>
     <div className={style.link}>Forgot Password</div>
     <div className='button'>Submit</div>

    </div>




    </div>
  )
}

export default loginPage