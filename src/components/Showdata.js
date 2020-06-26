import React from 'react'
import Menu from './Menu'
import Header from './Header'
import Tabledata from './Tabledata'
import { useParams, NavLink } from 'react-router-dom'
import { AddNewTeacher } from './Teacher/AddNewTeacher'
import { useDispatch } from 'react-redux'
import Tabledataclass from './Class/Tabledataclass'


export default function Student() {
    let {id} = useParams()
    const dispatch = useDispatch()
    const addnew = ()=>{
        if(id==='teacher'||id==='student')(dispatch({type:"ADD_NEW"}))
        if(id==='class'){
            dispatch({type:"ADD_NEW_CLASS"})
            dispatch({type:"OFF_STUDENT"})
        }
    }
    const offnew = ()=>{
        dispatch({type:"OFF_NEW"})
        dispatch({type:"OFF_NEW_CLASS"})
    }
    return (
        <div>
            <Menu/>
                <Header/>
                <section className="tab-nav">
                <div className="container">
                    <ul className="list">
                        <li><NavLink onClick={()=>offnew()} activeClassName="click-style" exact to ={"/home/"+id}>{id}</NavLink></li>
                        <li><NavLink onClick={()=>addnew()} activeClassName="click-style" to={"/home/"+id+"/add"}>Add new {id}</NavLink></li>
                        {(id!=='class')?(<li><NavLink activeClassName="click-style" to={"/home/"+id+"/edit"}>Add Class for {id}</NavLink></li>):("")}
                    </ul>
                </div>
                    {(id==='class')?<Tabledataclass/>:<Tabledata/>}
                    <AddNewTeacher/>
                 </section>
        </div>
    )
}
