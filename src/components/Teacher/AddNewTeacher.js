import React from 'react'

import { useSelector } from 'react-redux'
import { AddNewDetail } from './AddNewDetail'

export const AddNewTeacher = () => {
 
    const addNew = useSelector(state=>state.addNew)
    return (
        <div>
            {(addNew)?(<AddNewDetail/>):("")}
        </div>
    )
}
