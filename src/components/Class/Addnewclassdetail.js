import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Axios from 'axios'

export const Addnewclassdetail = () => {
    const listvien = useSelector(state=>state.listvien)
    const gettime = useSelector(state=>state.gettime)
    const classlist = useSelector(state=>state.classlist)
    const dispatch = useDispatch()
    const [institute,setInstitute]= useState('')
    const [idclass,setidclass]= useState('')
    const [classname,setClassname]= useState('')
    const [day,setDay]= useState('')
    const [starttime,setStarttime]= useState('')
    const [endtime,setEndtime]= useState('')
    const addNew = (e)=>{
        e.preventDefault()
        var tempdata=[]
        if(institute===''||idclass===''||classname===''||day===''||starttime===''||endtime===''){
            alert('Bạn phải điền hết các mục *')
        }
        else if(starttime>=endtime){
            alert('Thời gian lớp học không hợp lý')
        }
        else if(classlist!==null){
            tempdata=classlist
            if(classlist.filter((el)=>el.c_name===idclass).length>0){
                alert("ID CLASS da ton tai")
            }
            else {
                Axios.post('/addnewclass', {institute:institute,idclass:idclass,classname:classname,day:day,starttime:starttime,endtime:endtime})
                    .then(function (response){
                        console.log(response)
                        dispatch({type:"OFF_NEW_CLASS"})
                        var item ={}
                        item.i_mean=institute
                        item.c_name=idclass
                        item.c_mean=classname
                        item.thu=day
                        item.starttime=starttime
                        item.endtime=endtime
                        tempdata.push(item)
                        dispatch({type:"GET_CLASS_LIST",classlist:tempdata})
                    })
                    .catch(function (error) {
                        console.log(error)
                     }) 
            }
        }
        
    }
    return (
        <div className="container">
        <div className="addNewTeacher">
            <div className="box_add_new">
                <form onSubmit={(e)=>addNew(e)}  action={'/home/class'}>
                <div className="content">
                    <div className="grid-content">
                    <h2 className="name">Institute <span>*</span></h2>
                    <select onChange={(e)=>setInstitute(e.target.value)} name="institute" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Institute--</option>
                        {(listvien!==null)?(listvien.map((el,key)=><option key={key} value={el.i_mean}>{el.i_mean}</option>)):""}
                    </select>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">ID Class <span>*</span></h2>
                    <div className="group-input">
                         <i className="fas fa-passport"></i>
                        <input onChange={(e)=>setidclass(e.target.value.toLowerCase())} type="text" className="text-content" placeholder="Set ID class: A1, A2, ..." name="idclass" />
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Class name <span>*</span></h2>
                    <div className="group-input">
                        <i className="fas fa-book-open"></i>
                        <input onChange={(e)=>setClassname(e.target.value)} type="text" className="text-content" placeholder="Set class name" name="classname" />
                    </div>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Day <span>*</span></h2>
                    <select onChange={(e)=>setDay(e.target.value)} name="day" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Day--</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">Start time <span>*</span></h2>
                    <select onChange={(e)=>setStarttime(e.target.value)} name="starttime" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose Start Time--</option>
                        {(gettime!==null)?(gettime.map((el,key)=><option key={key} value={el.hour}>{el.hour}</option>)):""}
                    </select>
                    </div>
                    <div className="grid-content">
                    <h2 className="name">End time <span>*</span></h2>
                    <select onChange={(e)=>setEndtime(e.target.value)} name="endtime" className="text-content" defaultValue={'DEFAULT'}>
                        <option value="DEFAULT" disabled>--Choose End Time--</option>
                        {(gettime!==null)?(gettime.map((el,key)=><option key={key} value={el.hour}>{el.hour}</option>)):""}
                    </select>
                    </div>
                </div>
                <div className="btn-group">
                    <NavLink onClick={()=>dispatch({type:"OFF_NEW_CLASS"})} className="btn-a btn-cancel" to={'/home/class'}>Cancel</NavLink>
                    <button className="btn-a btn-submit"  type="submit">Add New</button>
                </div>
                </form>
            </div>
        </div>
        </div>
    )
}
