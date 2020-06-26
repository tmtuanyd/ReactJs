import React from 'react'
import { Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';

export default function Header() {
  const dispatch = useDispatch()
  const logout = () => {
    sessionStorage.removeItem('username')
    return dispatch({type:'LOG'})
  };
    return (
        <section className="content-banner">
  <div className="container">
    <nav>
      <label>School name</label>
      <label className="menu-bar">
        <i className="fas fa-bars" />
      </label>
      <ul>
        <li><Link onClick={()=>logout()} to="/" className="btn btn-logout">Logout</Link></li>
      </ul>
    </nav>
  </div>
</section>

    )
}
