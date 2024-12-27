import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer';
import Header from '../components/header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchProductsAction, ProductState } from '../slices/products.slice';

// sayfa reflesh olana kadar bu koda girilmiyor.

function Layout() {
	const productState: ProductState = useSelector(
		(rootState: RootState) => rootState.productState
	);

	const dispatch = useDispatch<any>();

	useEffect(() => {
		// server state ait function çağır client state load et

		dispatch(fetchProductsAction());

		// setInterval(() => {
		// 	dispatch(fetchProductsAction());
		// }, 3000);

		console.log('productState', productState.data);
	}, []);

	return (
		<>
			{/* Headers */}
			<Header>
				{/* <App /> */}
				<p>Slogan</p>
				{/* children */}
			</Header>

			{/* Main Content */}
			<main style={{ padding: 5 }}>
				<Outlet />
				{/* aoutlet gelen componentler route dosyasında rotalanan componentler */}
			</main>

			<Footer />
			{/* Footers */}
		</>
	);
}

export default Layout;
