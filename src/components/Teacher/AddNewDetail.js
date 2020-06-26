import React, { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'



export const AddNewDetail = () => {
    let {id} = useParams()
    const dispatch = useDispatch()
    const listvien = useSelector(state=>state.listvien)
    const data = useSelector(state=>state.data)
    const [firstname,setFirstname]= useState('')
    const [username,setUsername]= useState('')
    const [password,setPassword]= useState('')
    const [fullname,setFullname]= useState('')
    const [institute,setInstitute]= useState('')
    const [authority,setAuthority]= useState('')
    const addNew = (e)=>{
        e.preventDefault()
        var tempdata=[]
        if(username===''||password===''||fullname===''||institute===''||authority===''||firstname===''){
            console.log(username+password+fullname+institute+authority+firstname)
            alert('Bạn phải điền hết các mục *')
        }
        else if(data!==null){
            tempdata = data
            if(data.filter(el=>el.username===username).length>0){
                alert('Username đã tồn tại')
            }
            else {
                if(data.filter(el=>el.a_mean==='teacher(dean)'&&el.i_mean===institute&&authority==='teacher(dean)').length>0){
                    alert('Mỗi viện chỉ có 1 viện trưởng, xin xem lại')
                }
                else{
                    Axios.post('/addnew', {username:username, password:password,firstname:firstname, fullname:fullname,institute:institute,authority:authority})
                    .then(function (response) {
                        console.log(response.data)
                        dispatch({type:"OFF_NEW"})
                        var item ={}
                        item.username=username
                        item.fullname=fullname
                        item.i_mean=institute
                        item.a_mean=authority
                        item.c_mean=null
                        item.first_name=firstname
                        tempdata.push(item)
                        dispatch({type:"GET_DATA",data:tempdata})
                     })
                    .catch(function (error) {
                        console.log(error)
                     }) 
                } 
            }
        }
    }
    return (
        <div className="container">
        <div className="addNewTeacher">
            <div className="box_add_new">
                <form onSubmit={(e)=>addNew(e)} action={'/home/'+id}>
                <div className="content">
                    <div className="grid-content">
                    <h2 className="name">First name <span>*</span></h2>
                    <div className="group-input">
                        <i className="fas fa-address-book"></i>
                        <input onChange={(e)=>setFirstname(e.target.value)} type="text" className="text-content" placeholder="First name" name="firstname" />
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Full Name <span>*</span></h2>
                    <div className="group-input">
                        <i className="fas fa-user" />
                        <input onChange={(e)=>setFullname(e.target.value)} type="text" className="text-content" placeholder="Full name" name="fullname" />
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Username <span>*</span></h2>
                    <div className="group-input">
                        <i className="fas fa-at" />
                        <input  onChange={(e)=>setUsername(e.target.value)} type="text" className="text-content" placeholder="Username" name="username" />  
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Password <span>*</span></h2>
                    <div className="group-input">
                        <i className="fas fa-lock" />
                        <input  onChange={(e)=>setPassword(e.target.value)} type="text" className="text-content" placeholder="Password" name="password" /> 
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Phone</h2>
                    <div className="group-input">
                        <i className="fas fa-phone" />
                        <input type="text" className="text-content" placeholder="Phone number" />
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Gender</h2>
                    <select name="gender" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose gender--</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Institute <span>*</span></h2>
                    <select  onChange={(e)=>setInstitute(e.target.value)} name="institute" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Institute--</option>
                        {(listvien!==null)?(listvien.map((value,key)=><option key={key} value={value.i_mean}>{value.i_mean}</option>)):(console.log(listvien))}
                    </select>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Permission <span>*</span></h2>
                    {(id==="teacher")?
                    (<select  onChange={(e)=>setAuthority(e.target.value)} name="authority" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Permission--</option>
                        <option value="teacher(dean)">Teacher(Dean)</option>
                        <option value="teacher">Teacher</option>
                    </select>):
                    (<select onChange={(e)=>setAuthority(e.target.value)} name="authority" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Permission--</option>
                        <option value="student">Student</option>
                    </select>)
                    }
                    </div>
                </div>
                <div className="btn-group">
                    <NavLink onClick={()=>dispatch({type:"OFF_NEW"})} className="btn-a btn-cancel" to={'/home/'+id}>Cancel</NavLink>
                    <button  className="btn-a btn-submit"  type="submit">Add New</button>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}
