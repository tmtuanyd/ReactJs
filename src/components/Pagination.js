import React from 'react'

export default function Pagination(props) {
    const pageNumber = [];
    for (let i=1;i<=Math.ceil(props.totalPosts/props.postPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <section className="page">
            <ul>
                {pageNumber.map(number=>(
                    <li key={number}>
                        <div onClick={()=>props.paginate(number)} className={(props.currentPage===number)?"active":""}>
                            {number}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}
