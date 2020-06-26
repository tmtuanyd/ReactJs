import React, { useState } from 'react'
import Tabledatarow from '../Tabledatarow'
import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
import Pagination from '../Pagination'
import { Showstudentclass } from './Showstudentclass'
import { Addnewclass } from '../Teacher/Addnewclass'

export default function Tabledataclass() {
  const classlist = useSelector(state=>state.classlist)
  const datadetail = useSelector(state=>state.classlistdetail)
  const showstudent = useSelector(state=>state.showstudent)
  const [currentPage,setCurrentPage]=useState(1);
  const [postPerPage,setPostsPerPage]=useState(5);
  //get current post
  const indexOfLastPost = currentPage*postPerPage;
  const indexOfFirstPost = indexOfLastPost-postPerPage;
  const paginate = (pageNumber)=>setCurrentPage(pageNumber)
  //get serarch
  const [contentSearch,setContentSearch]=useState([])
  var hienthi=()=>{
   
    let temp=''
    if(classlist!==null){
       temp=classlist
       console.log(datadetail)
       temp.forEach((el)=>(el.c_mean=el.c_mean.toLowerCase()))
       temp=temp.filter((el)=>el.c_mean.indexOf(contentSearch)!==-1||el.i_mean.indexOf(contentSearch)!==-1)
        if(datadetail!==null){
          for(var i=0;i<temp.length;i++){
          temp[i].teacher='not yet'
          temp[i].student=0
            for(var j=0;j<datadetail.length;j++){
              if((temp[i].c_name===datadetail[j].c_name)&&(temp[i].c_mean===datadetail[j].c_mean&&(temp[i].starttime===datadetail[j].starttime)&&(temp[i].endtime===datadetail[j].endtime))){
                // console.log(datadetail[j])
                if((datadetail[j].a_mean==='teacher')||(datadetail[j].a_mean==='teacher(dean)')){
                  temp[i].teacher=datadetail[j].fullname
                }
                if(datadetail[j].a_mean==='student'){ 
                  temp[i].student+=1
                }
              }
            }
          }
          //  temp = [...new Set(temp)]
         }
       const currentPost = temp.slice(indexOfFirstPost,indexOfLastPost);
      //  console.log(currentPost)
      return (
        <div className="box">
        <div className="box-nav">
        <div className="entries">
          <span>Show</span>

          <select onChange={(e)=>setPostsPerPage(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <span>entries</span>
        </div>
        <div className="search-box">
          <input onChange={(e)=>setContentSearch(e.target.value)} className="search-txt" type="text" placeholder="Search by class or institute" />
          <a onClick={(e)=>e.preventDefault()} href="/" className="search-btn">
            <i className="fa fa-search" />
          </a>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Institue</th>
            <th>ID class</th>
            <th>Class name</th>
            <th>Time</th>
            <th>Teacher</th>
            <th>Students</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
            { 
              currentPost.map((value,key)=>(
                <Tabledatarow 
                key={key} 
                value={value} 
                idclass={value.c_name}
                teacher={value.teacher} 
                student={value.student} 
                institute={value.i_mean} 
                classlist={value.c_mean} 
                time={value.thu+ " : " + value.starttime+" - "+value.endtime}/>
              ))
            }
        </tbody>
      </table>
      <Pagination postPerPage={postPerPage} totalPosts={temp.length} paginate={paginate} currentPage={currentPage}/>
    </div>
      )
    }
  }
    return (
        <div className="table-data-show">
          <div className="container">
            {hienthi()}
            {(showstudent)?<Showstudentclass/>:""}
            <Addnewclass/>
          </div>
        </div>
    )
}
