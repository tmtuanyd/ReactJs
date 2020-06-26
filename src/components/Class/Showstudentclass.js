import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export const Showstudentclass = () => {
    const dispatch = useDispatch()
    const showstudent = useSelector(state=>state.showstudentlist)
    const liststudent = useSelector(state=>state.classlistdetail)
    const [contentSearch,setContentSearch]=useState([])
    var hienthi = ()=>{
        if(liststudent!==null){
            var temp=[]
            liststudent.forEach((el)=>{
                if((el.c_name===showstudent.c_name)&&(el.a_mean==='student')){
                    temp.push(el)  
                }
            })
            temp.forEach((el)=>(el.fullname=el.fullname.toLowerCase()))
            temp=temp.filter((el)=>el.username.indexOf(contentSearch)!==-1||el.fullname.indexOf(contentSearch)!==-1)
            return temp.map((value,key)=>(
               
                <tr key={key}>
                        <td>{key+1}</td>
                        <td className='username'>{value.username}</td>
                        <td>{value.fullname}</td>
                        <td>{value.i_mean}</td>
                        <td>
                        <div className="btn-group">
                            <div className="btn-edit"><i className="far fa-edit" /></div>
                            <div className="btn-delete"><i className="far fa-trash-alt" /></div>
                        </div>
                        </td>
                    </tr>
                )
            )
        }
    }
    return (
                <div className="box_show">
                <i onClick={()=>dispatch({type:"OFF_STUDENT"})} className="fas fa-times close"></i>
                  <h3>Student in Class</h3>
                <div className="box-nav">
                    <div className="entries">
                    <span>Class name: <i>{showstudent.c_mean}</i></span>
                    <span>Teacher: <i>{showstudent.teacher}</i></span>
                    <span>Time: <i>{showstudent.thu + " "+ showstudent.starttime+"-"+showstudent.endtime}</i></span>
                    </div>
                    <div className="search-box">
                    <input onChange={(e)=>setContentSearch(e.target.value)} className="search-txt" type="text" placeholder="Type to search" />
                    <a onClick={(e)=>e.preventDefault()}href="/" className="search-btn">
                        <i className="fa fa-search" />
                    </a>
                    </div>
                </div>
                <table className="content-table">
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Username</th>
                        <th>Fullname</th>
                        <th>Institute</th>
                        <th>Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {hienthi()}
                    </tbody>
                </table>
                </div>

    )
}
