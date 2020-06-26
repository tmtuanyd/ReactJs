import React from 'react'
import {Link, NavLink} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';

export default function Menu() {
    const login = useSelector(state=>state.login)
    const dispatch = useDispatch()
    var classclick = ()=>{
        dispatch({type:"OFF_NEW_CLASS"})
        dispatch({type:"OFF_NEW"})
    }
    const logout = () => {
        sessionStorage.removeItem('username')
        return dispatch({type:'LOG'})
        };
        return (
            <header>
            <div className="slide-menu">
                <Link to="/" className="admin">
                <i className="fab fa-adn" />
                <span>Admin</span>
                </Link>
                <center>
                <img src={require('./images/t1.jpg')} alt="" />
                <h2>{login}</h2>
                </center>
                <NavLink activeClassName="active-style" exact to="/home" className="list"><i className="fa fa-user" /><span>Home</span></NavLink>
                <NavLink onClick={()=>dispatch({type:"OFF_NEW"})} activeClassName="active-style" to="/home/teacher" className="list"><i className="fa fa-chalkboard-teacher" /><span>Teacher</span></NavLink>
                <NavLink onClick={()=>dispatch({type:"OFF_NEW"})} activeClassName="active-style" to="/home/student" className="list"><i className="fa fa-user-graduate" /><span>Student</span></NavLink>
                <NavLink onClick={()=>classclick()} activeClassName="active-style" to="/home/class" className="list"><i className="fab fa-leanpub" /><span>Class</span></NavLink>
                <NavLink activeClassName="active-style" to="/home/institute" className="list"><i className="fa fa-atlas" /><span>Institute</span></NavLink>
                <NavLink activeClassName="active-style" to="/home/setting" className="list"><i className="fa fa-cog" /><span>Setting</span></NavLink>
                <Link onClick={()=>logout()} to="/" className="log-out list"><i className="fa fa-sign-out-alt" /><span>Logout</span></Link>
            </div>
        </header>
        )
    }


