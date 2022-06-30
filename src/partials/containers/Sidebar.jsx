import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  IoHomeOutline,
  IoPeopleCircleOutline,
  IoLogInOutline,
} from 'react-icons/io5';
import logo from '../../images/logo2.png';

const NavItems = () => (
  <ul className="mt-3">
    <Nav path="/" name="Dashboard" icon={IoHomeOutline} />
    <Nav path="/customers" name="Customers" icon={IoPeopleCircleOutline} />
    <Nav path="/users" name="Akses" icon={IoLogInOutline} />
  </ul>
);

const Nav = ({ path, name, icon: Icon }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <li
      className={`last:mb-0 mx-4 my-3 rounded-lg hover:bg-primary-500 transition duration-150 ${
        pathname === path ? 'bg-primary-500 shadow' : 'bg-transparent hover:shadow'
      }`}
    >
      <NavLink
        end
        to={path}
        className={`block px-5 py-3 hover:text-white truncate ${
          pathname === path ? 'text-white' : 'text-slate-600'
        }`}
      >
        <div className="flex items-center">
          <span className="w-6">{Icon && <Icon size={22} />}</span>
          <span className="font-medium text-sm ml-3 lg:sidebar-expanded:opacity-100 duration-200">
            {name}
          </span>
        </div>
      </NavLink>
    </li>
  );
};

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  // const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const storedSidebarExpanded = false;
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen
        || sidebar.current.contains(target)
        || trigger.current.contains(target)
      ) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    // localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="relative z-50">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform
         h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 
         py-4 transition-all duration-200 ease-in-out bg-white border-r border-slate-200 shadow-lg ${
           sidebarOpen ? 'translate-x-0' : '-translate-x-64'
         }`}
      >
        <div className="flex justify-between pr-3 sm:px-2">
          <button
            type="button"
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400 ml-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          {/* <NavLink end to="/" className="block w-full flex justify-center">
            <img src={logo} className="h-40" />
          </NavLink> */}
        </div>

        {/* Links */}
        <div className="space-y-8 mt-2 lg:mt-16">
          {/* Pages group */}
          <NavItems />
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
