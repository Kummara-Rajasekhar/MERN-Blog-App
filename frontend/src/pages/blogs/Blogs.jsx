import React, { useState } from 'react'
import SearchBlog from './SearchBlog'
const Blogs = () => {

    const [search,setsearch]=useState('')
    const [category,setcategory]=useState('')
    const [query,setquery]=useState({search:"",category:""
    })
    const handleSeacrhChange=(e)=>{
        setsearch(e.target.value)
    }
    const handleSearch=()=>setquery({search,category})
  return (
    <div className='mt-16 container mx-auto'>
         <SearchBlog
         search={search}
         handleSeacrhChange={handleSeacrhChange}
         handleSearch={handleSearch}
         />
        <div>Blog Card</div>
      
    </div>
  )
}

export default Blogs
