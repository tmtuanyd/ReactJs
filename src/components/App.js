import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import {connect} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom';
import {Dieuhuongurl} from './Router/Dieuhuongurl';


const getProductData=()=>(axios.get('/getdata').then((res)=>(res.data)))
const getListInstitute=()=>(axios.get('/getlistvien').then((res)=>(res.data)))
const getListClass=()=>(axios.get('/getclasslist').then((res)=>(res.data)))
const getListClassDetail=()=>(axios.get('/getdetailclasslist').then((res)=>(res.data)))
const getListTime=()=>(axios.get('/gettime').then((res)=>(res.data)))



class App extends Component {
  
  componentDidMount(){
      if(this.props.data===null){
        getProductData().then((res)=>{
          this.props.getdata(res)
        })
      }
      if(this.props.listvien===null){
        getListInstitute().then((res)=>{
          this.props.getlistvien(res)
        })
      }
      if(this.props.classlist===null){
        getListClass().then((res)=>{
          this.props.getlistclass(res)
        })
      }
      if(this.props.classlistdetail===null){
        getListClassDetail().then((res)=>{
          this.props.getlistclassdetail(res)
        })
      }
      if(this.props.gettime===null){
        getListTime().then((res)=>{
          this.props.getlisttime(res)
        })
      }
    }
  render() {
    
    return (
      <Router>
         <Dieuhuongurl/>
      </Router>
    );
  }
}
const mapStateToProps = (state,ownProps)=>{
  return{
    data:state.data,
    listvien:state.listvien,
    classlist:state.classlist,
    classlistdetail:state.classlistdetail,
    gettime:state.gettime
  }
}  
const mapDispatchToProps = (dispatch,ownProps)=>{
  return {
    getdata: (data)=>{dispatch({type:"GET_DATA",data})},
    getlistvien: (listvien)=>{dispatch({type:"GET_LIST",listvien})},
    getlistclass: (classlist)=>{dispatch({type:"GET_CLASS_LIST",classlist})},
    getlistclassdetail: (classlistdetail)=>{dispatch({type:"GET_CLASS_LIST_DETAIL",classlistdetail})},
    getlisttime: (time)=>{dispatch({type:"GET_TIME",time})}
  }
}

export default connect (mapStateToProps,mapDispatchToProps)(App)


