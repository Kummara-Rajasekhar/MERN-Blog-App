import React from 'react'

const SearchBlog = ({search,handleSearchChange,handelSearch}) => {
    const handlekeyPress=(event)=>{
        if(event.key==='Enter'){
            handelSearch()
        }
    }
  return (
    <div className='w-full flex'>
      <input value={search} onChange={handleSearchChange} onKeyPress={handlekeyPress} type="text" placeholder='Hotels with Rooftop Pool Near .....' className='py-2 px-4 mr-5 w-full bg-[#f7f8f9] focus:online-none focus:border' />
      <button className='bg-[#1E73BE] px-4 py-2 text-white'> Search</button>
    </div>
  )
}

export default SearchBlog
