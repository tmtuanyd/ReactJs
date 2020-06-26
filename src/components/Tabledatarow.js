import React from 'react'
import { useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux'


export default function Tabledatarow(props) {
  let{id} = useParams()
  const dispatch = useDispatch()
    return (
        <tr>
            <td className={(id==='class')?'classtable':""}>{(id==='teacher'||id==='student')?props.username:props.institute}</td>
            {(id==='class')?<td>{props.idclass}</td>:console.log('st')}
            <td>{(id==='teacher'||id==='student')?props.name:props.classlist}</td>
            <td>{(id==='teacher'||id==='student')?props.authority:props.time}</td>
            <td>{(id==='teacher'||id==='student')?props.institute:props.teacher}</td>
            <td>{(id==='teacher'||id==='student')?props.classlist:<div onClick={()=>dispatch({type:"SHOW_STUDENT",show:props.value})}>{props.student}</div>}</td>
            <td>
              <div className="btn-group">
                <div className="btn-edit"><i className="far fa-edit"/></div>
                <div className="btn-delete"><i className="far fa-trash-alt" /></div>
              </div>
            </td>
          </tr>
          
    )
}
