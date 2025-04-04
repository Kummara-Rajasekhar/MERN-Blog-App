import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IoMenuSharp } from "react-icons/ios"
import { IoClose } from 'react-icons/io5'
const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Contact Us", path: "/contact-us" }
]
const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  return (
    <header className='bg-white py-6 border'>
      <nav className='container mx-auto flex justify-between px-5'>
        <a href="/">Logo
          <img src="/logo.png" alt="" className='h-12' />
        </a>
        <ul className='sm:flex hidden items-center gap-8'>
          {
            navLists.map((item, i) => (
              <li>
                <NavLink className={({ isActive }) => isActive ? "active" : ""} to={`${item.path}`}>{item.name}</NavLink>
              </li>
            ))
          }
          <li>
            <NavLink to='/login'>Login</NavLink>
          </li>
        </ul>
        <div className='flex items-center sm:hidden'>
          <button className='flex item-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500'>
            {
              isMenuOpen ?
                <IoClose className='size-6' />
                :
                <IoMenuSharp className='size-6' />
            }
          </button>
        </div>
      </nav>

      {
        isMenuOpen &&
        (
          <ul className='fixed top-[100px] left-0 w-full h-auto pb-8 border-b bg-white shadow-sm z-50'>
            {
              navLists.map((item, i) => (
                <li className='mt-5 px-4'>
                  <NavLink onClick={()=>setIsMenuOpen(false)} className={({ isActive }) => isActive ? "active" : ""} to={`${item.path}`}>{item.name}</NavLink>
                </li>
              ))
            }
            <li className='px-4 mt-5'>
              <NavLink to='/login'>Login</NavLink>
            </li>
          </ul>
        )
      }
    </header>
  )
}

export default Navbar
