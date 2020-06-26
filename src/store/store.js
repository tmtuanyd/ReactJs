var redux = require('redux')
const loadFromLocalStorage=()=> {
    const initialAcc = sessionStorage.getItem('username')
    return (initialAcc===null)? '' : initialAcc
}
const initialState ={
    data:null,
    dataType:"",
    login:loadFromLocalStorage(),
    addNew:false,
    addNewClass:false,
    listvien:null,
    classlist:null,
    classlistdetail:null,
    showstudent:false,
    showstudentlist:"",
    gettime:null
}
const allReducer = (state=initialState,action)=>{
    switch(action.type){
        case "GET_DATA":
            return {...state,data:action.data}
        case "GET_LIST":
            return {...state,listvien:action.listvien}
        case "GET_CLASS_LIST":
            return {...state,classlist:action.classlist}
        case "GET_CLASS_LIST_DETAIL":
            return {...state,classlistdetail:action.classlistdetail}
        case "GET_TYPE":
            return {...state,dataType:action.datatype}
        case "LOG":
            return {...state,login:loadFromLocalStorage()}
        case "ADD_NEW":
            return {...state,addNew:true}
        case "OFF_NEW":
            return {...state,addNew:false}
        case "ADD_NEW_CLASS":
            return {...state,addNewClass:true}
        case "OFF_NEW_CLASS":
            return {...state,addNewClass:false}
        case "SHOW_STUDENT":
            return {...state,showstudent:true,showstudentlist:action.show}
        case "OFF_STUDENT":
            return {...state,showstudent:false}
        case "GET_TIME":
            return {...state,gettime:action.time}
        default:
            return state
    }
}
var store = redux.createStore(allReducer);
store.subscribe(()=> {
    console.log(JSON.stringify(store.getState().classlist))
})
export default store