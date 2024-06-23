'use client'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'

import { usePathname } from 'next/navigation'
import Buttons from '../common/button/Butons'

/**
 * PrimaryNav component represents the main navigation bar for the application.
 * It includes navigation links, action buttons, and a responsive menu for smaller screens.
 */
const PrimaryNav: React.FC = () => {
  // Navigation items for the main nav bar
  const items: { name: string, link: string }[] = [
    { name: 'Blog', link: '/blog' },
    { name: 'Partners', link: '/partners' },
    { name: 'Help', link: '/help' },
    { name: 'Profile', link: '/profile' },
    { name: 'Distribution', link: '/distribution' }
  ]

  // Menu items for the responsive nav menu
  const menuItems: { title: string, items: { name: string, link: string }[] }[] = [
    { title: 'Pages', items: [{ name: 'Blog', link: '/blog' }, { name: 'Help', link: '/help' }, { name: 'Partners', link: '/partners' }] },
    { title: 'Dashboard', items: [{ name: 'Distribution', link: '/distribution' }] },
    { title: 'Settings', items: [{ name: 'Profile', link: '/profile' }, { name: 'Change Password', link: '/change-password' }, { name: 'Delete Account', link: '/delete-account' }, { name: 'Log Out', link: '/logout' }] }
  ]

  // State to manage the open/close state of the responsive menu
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  // Get the current pathname to highlight the active link
  const pathname = usePathname()

  return (
    <ul className='fixed top-0 inset-x-0 px-6 py-4 flex flex-row justify-between items-center border-b border-primary-900-5 text-primary-900 z-10 bg-white'>
      <li><h2><span className='text-primary-400'>Summit</span>Share</h2></li>
      <li className='sm:block hidden md:hidden lg:block'>
        <ul className='flex flex-row gap-[32px] text-p1-m text-primary-100'>
          {items.map((item, index) => (
            <li key={index} className={`hover:text-primary-600 hover:underline underline-offset-[10px] cursor-pointer   ${pathname === item.link && 'text-primary-600 underline underline-offset-[10px]'}`}>
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </li>
      <li className='sm:block hidden md:hidden lg:block'>
        <ul className='flex flex-row gap-4'>
          <li><Buttons type='primary' size='small'>Connect</Buttons></li>
          <li><Buttons type='secondary' size='small'>Log in</Buttons></li>
        </ul>
      </li>
      <li onClick={() => setOpenMenu(!openMenu)} className='lg:hidden'><Bars3Icon className='w-4' /></li>
      <nav className={`fixed inset-y-0 left-0 md:w-[40%] w-[70%] bg-white z-50 transform ${openMenu ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='border-b border-primary-900-5 py-4'>
          <div className='px-6 flex flex-row justify-between text-primary-900'>
            <h2 className='text-primary-400'>Menu</h2>
            <XMarkIcon onClick={() => setOpenMenu(!openMenu)} className='w-4 cursor-pointer' />
          </div>
        </div>
        <ul className='px-6 py-4 space-y-4'>
          {menuItems.map((menu, index) => (
            <li
              key={index}
              className={`space-y-4 py-4 ${index !== menuItems.length - 1 ? 'border-b border-primary-900-5' : ''}`}
            >
              <h4 className='font-normal text-primary-100'>{menu.title}</h4>
              <ul className='space-y-1'>
                {menu.items.map((subItem, subIndex) => (
                  <li
                    key={subIndex}
                    className={`text-[20px] text-primary-700 font-normal ${pathname === subItem.link && 'text-primary-400'}`}
                  >
                    <a href={subItem.link}>{subItem.name}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          <Buttons type='primary' size='large'>Connect My wallet</Buttons>
        </ul>
      </nav>
    </ul>
  )
}

export default PrimaryNav
