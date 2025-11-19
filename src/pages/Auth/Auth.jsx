import React from 'react'
import {Link,useNavigate,useLocation} from 'react-router-dom'
import classes from "./Auth.module.css"
import {useState,useContext} from 'react'
import {auth} from "../../../src/utility/firebase"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import {DataContext} from "../../DataProvider/DataProvider"
import {ClipLoader} from 'react-spinners'

function Auth() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [{user},dispatch]=useContext(DataContext)
  const [error,setError]=useState("")
  const [loading,setLoading]=useState({
    signIn:false,
    signUp:false
  })
  const navigate=useNavigate()
  const navStateData=useLocation()

  const authHandler=async (e)=>{

    e.preventDefault()
    if (e.target.name=='signin') {
      setLoading({...loading,signIn:true})

      signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        dispatch({
         type:"SET_USER",
          user:userInfo.user
        })
        setLoading({...loading,signIn:false})
        navigate(navStateData?.state?.redirect || "/")
      })
      .catch((err)=>{
        setError(err.message)
        setLoading({...loading,signIn:false
        })
      })
      
    } 
    else {
      setLoading({...loading,signUp:true
        })
      createUserWithEmailAndPassword(auth,email,password).then((userInfo)=>{
        
        dispatch({
          type:"SET_USER",
          user:userInfo.user
        })
         setLoading({...loading,signUp:false
        })
         navigate(navStateData?.state?.redirect || "/")

      })
     
      .catch((err)=>{
       setError(err.message)
       setLoading({...loading,signUp:false
        })
      })
     
      
    }
    
  
  }
  
  return (
    <section className={classes.login}>
      <Link to="/">
      <img src="https://static.vecteezy.com/system/resources/previews/014/018/563/non_2x/amazon-logo-on-transparent-background-free-vector.jpg" alt="amazon-logo" />
      </Link>
      {/* sign in section */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {
          navStateData?.state?.msg&&(
            <small style={{
              padding:"5px",
              textAlign:"center",
              color:"red",
              fontWeight:"bold"
            }}>
              {navStateData?.state?.msg}

            </small>
          )
        }

        <form action="">
          <div>
          <label htmlFor="email">Email</label>
          <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">PassWord</label>
          <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>

          </div>
          <button className={classes.login_signInButton}type='submit' name= 'signin' onClick={authHandler} >{
            loading.signIn?<ClipLoader color="#000" size={15}/>:(

              "Sign in"
            )
            }</button>



        </form>
        {/* agreement */}

         <p>
        By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
        Sale. Please see our Privacy Notice, our Cookies Notice and our
        Interest-Based Ads Notice.
      </p>
      {/* create account btn */}
      <button className={classes.login_registerButton}type='button' name='signup' onClick={authHandler}>
        {
            loading.signUp?<ClipLoader color="#000" size={15}/>:(

              " Create your Amazon Account"
            )
            }
       </button>
      {error&&  <small style={{paddingTop:"5px",color:"red"}}>{error}</small>}


      </div>



    </section>
  )
}

export default Auth