import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';

const ListItem = ({ to, title, subtitle }) => (
  <NavLink to={to || '/'} className="flex bg-white rounded-md px-5 py-4 mt-3 shadow-sm border border-slate-200 gap-3">
    <div className="flex-1">
      <p className="font-medium text-sm">{title}</p>
      <p className="text-xs text-gray-500 flex">{subtitle}</p>
    </div>
    <IoChevronForward className="self-center" />
  </NavLink>
);

export default ListItem;
