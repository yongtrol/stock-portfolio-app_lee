import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink
        
      >

      </NavLink>
      <NavLink 
        to="/" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        📋 자산 관리 테이블
      </NavLink>
      <NavLink 
        to="/chart" 
        className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
      >
        📈 자산 비중
      </NavLink>
    </nav>
  );
}