import React from 'react'
import { Addnewclassdetail } from '../Class/Addnewclassdetail'
import { useSelector } from 'react-redux'

export const Addnewclass = () => {
    const addnew = useSelector(state=>state.addNewClass)
    return (
        <div>
            {(addnew)?<Addnewclassdetail/>:""}
        </div>
    )
}
