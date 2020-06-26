import React, { useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

export const Login = () => {
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [authority,setAuthority]=useState('')
  const dispatch = useDispatch()
  var clickLogin = (e)=>{
    e.preventDefault();
    axios.post('/loginacc', {login_type:authority, username:username, password:password })
    .then(function (response) {
     if(response.data==="Ban da nhap sai mk"){alert('Dang nhap khong thanh cong')}
      else {
          if(response.data.a_mean==='admin'){sessionStorage.setItem('username',response.data.fullname)}
          else alert('Ban can dang nhap bang admin')
      }
    dispatch({type:"LOG"})
  })
  .catch(function (error) {
      console.log(error)
  }) 
  }
    return (
        <div className="body-login">
          <form onSubmit={clickLogin} className="login-form">
            <div className="input-group">
              <h1>Login</h1>
              <h3>Login as</h3>
          <div className="select">
            <select onChange={(e)=>setAuthority(e.target.value)} name="login_type" defaultValue={'DEFAULT'}>
              <option value="DEFAULT" disabled>--Choose an option--</option>
              <option value="admin">Admin</option>
              <option value="teacher(dean)">Teacher(Dean)</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
              <div className="txtb">
                <input onChange={(e)=>setUsername(e.target.value)} type="text" />
                <span data-placehoder="Username" className={(username!=='')?"danglogin":""}/>
              </div>
              <div className="txtb">
                <input onChange={(e)=>setPassword(e.target.value)} type="password" />
                <span data-placehoder="Password" className={(password!=='')?"danglogin":""}/>
              </div>
              <input type="submit" className="logbtn" defaultValue="Login" />
              <div className="bottom-text">
                <a  href="/home">Forgot Password?</a>
              </div>
            </div>
          </form>
        </div>
    )
}
