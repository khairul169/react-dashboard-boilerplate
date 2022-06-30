/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  IoGridOutline, IoHomeOutline, IoFolderOutline, IoAddCircleOutline,
  IoStorefrontOutline, IoReorderTwoOutline, IoChevronBack,
} from 'react-icons/io5';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export const HeaderAction = ({ icon: Icon, child, onClick }) => (
  <a
    href="#"
    className="w-16 h-full flex items-center justify-center"
    onClick={(e) => {
      e.preventDefault();
      onClick && onClick();
    }}
  >
    {child || <Icon className="text-xl" />}
  </a>
);

export const AppHeader = ({
  title, icon, goBack = null, trailing = null, fixed = true, shadow = false,
}) => {
  const navigate = useNavigate();

  const onGoBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(goBack, { replace: true });
    }
  };

  return (
    <>
      <div style={{ background: '#f6f5fa', zIndex: 50 }} className={`h-16 w-full flex items-center ${fixed ? 'fixed' : ''} ${shadow ? 'shadow-md' : ''}`}>
        <HeaderAction
          icon={goBack ? IoChevronBack : (icon || IoGridOutline)}
          onClick={goBack ? onGoBack : null}
        />
        <h2 className="flex-1 font-medium text-lg text-center">{title}</h2>
        {trailing || <div className="w-16" />}
      </div>
      {fixed && <div className="h-16" />}
    </>
  );
};

const NavbarItem = ({ to, icon: Icon, alt = false }) => {
  const { pathname } = useLocation();
  const isActive = pathname === to;

  let iconColor = 'text-white';

  if (!alt) {
    iconColor = isActive ? 'text-indigo-800' : 'text-gray-500';
  }

  return (
    <NavLink to={to || '/'} className="flex-1 flex items-center justify-center relative">
      <div
        style={alt ? { position: 'absolute', top: -16 } : null}
        className={alt ? 'bg-primary-500 p-4 rounded-xl' : null}
      >
        <Icon className={`text-xl ${iconColor}`} />
      </div>
    </NavLink>
  );
};

const Navbar = () => (
  <nav className="fixed bottom-0 w-full bg-white h-16 flex">
    <NavbarItem to="/" icon={IoHomeOutline} />
    <NavbarItem to="/history" icon={IoFolderOutline} />
    <NavbarItem to="/create" icon={IoAddCircleOutline} alt />
    <NavbarItem to="/stores" icon={IoStorefrontOutline} />
    <NavbarItem to="/account" icon={IoReorderTwoOutline} />
  </nav>
);

const SalesLayout = ({
  children, header = null, navigation = false,
}) => (
  <div style={{ background: '#f6f5fa', minHeight: '100vh' }} className={navigation ? 'pb-16' : ''}>
    {header}
    <div className="p-6 pt-0">
      {children}
    </div>
    {navigation && <Navbar />}
  </div>
);

export default SalesLayout;
