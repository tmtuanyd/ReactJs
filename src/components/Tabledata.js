import React, { useState } from 'react'
import Tabledatarow from './Tabledatarow'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Pagination from './Pagination'

export default function Tabledata() {
  const data = useSelector(state=>state.data)
  const [currentPage,setCurrentPage]=useState(1);
  const [postPerPage,setPostsPerPage]=useState(5);
  //get current post
  const indexOfLastPost = currentPage*postPerPage;
  const indexOfFirstPost = indexOfLastPost-postPerPage;
  const paginate = (pageNumber)=>setCurrentPage(pageNumber)
  //get serarch
  const [contentSearch,setContentSearch]=useState([])
  let {id} = useParams()
  var hienthi=()=>{
    let temp=''
    if(data!==null){
       temp=data.filter((el)=>el.a_mean.indexOf(id)!==-1)
       temp.forEach((el)=>(el.fullname=el.fullname.toLowerCase()))
       temp=temp.filter((el)=>el.fullname.indexOf(contentSearch)!==-1||el.username.indexOf(contentSearch)!==-1)
       temp.forEach((el)=>{if(el.c_mean===null)(el.c_mean='Not Register')})
      //  console.log(temp)
       const currentPost = temp.slice(indexOfFirstPost,indexOfLastPost);
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
          <input onChange={(e)=>setContentSearch(e.target.value)} className="search-txt" type="text" placeholder="Search by name or username" />
          <a onClick={(e)=>e.preventDefault()} href="/" className="search-btn">
            <i className="fa fa-search" />
          </a>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>User name</th>
            <th>Name</th>
            <th>Authority</th>
            <th>Institute</th>
            <th>Class</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
            {
              currentPost.map((value,key)=>(
                <Tabledatarow key={key} value={value} username={value.username} name={value.fullname} authority={value.a_mean} institute={value.i_mean} classlist={value.c_mean}/>
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
          </div>
        </div>
    )
}
