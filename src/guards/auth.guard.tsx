import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
};

function AuthGuard({ children }: Props) {
	// apidan ilgili rotaya yetki var mı kontrolü de yapılabilir yada üretilen jwt değerinin expire edilip edilmediğine de bakılabilir.
	console.log('guard', children);
	const location = useLocation();
	console.log('location', location);

	const token = localStorage.getItem('x-token');

	if (token) {
		const decoded = jwtDecode(token) as any;
		console.log('email', decoded['Email']);
		console.log('decoded', decoded);

		// Not: 1970 date unix date format ile şuanki tarihe çevrildi.
		const decodedDate = moment.unix(decoded.exp);
		const now = moment();

		console.log('now', now);
		console.log('decodedDate', decodedDate);

		if (decodedDate > now) {
			return <>{children}</>;
		} else {
			return <Navigate to="/login"></Navigate>;
		}
	} else {
		return <Navigate to="/login"></Navigate>;
	}
}

export default AuthGuard;
