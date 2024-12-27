import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type HeaderProps = {
	children?: React.ReactNode;
};

function Header({ children }: HeaderProps) {
	return (
		<div
			style={{
				margin: 0,
				position: 'relative',
				top: 0,
				padding: '1rem',
				background: 'yellow',
				color: 'white',
				minHeight: '10vh',
				minWidth: '100vw',
			}}
		>
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/"
			>
				Home
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/contextapi"
			>
				Context API
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/redux"
			>
				Redux
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/redux-thunk"
			>
				Redux Thunk
			</NavLink>{' '}
			<NavLink
				className={({ isActive }) => (isActive ? 'active-link' : '')}
				to="/swr"
			>
				Swr
			</NavLink>{' '}
			{children && <p>{children}</p>}
		</div>
	);
}

export default Header;
