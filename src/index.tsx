// React uygulamayı boostrapt edeceğimiz kod burada olacak.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Layout from './layouts/layout';

// import App from './components/App';
import AuthGuard from './guards/auth.guard';
import './style.css';
import ContextAPIDemo from './pages/context.api.demo';
import { CartProvider } from './contexts/cart.context';
import { Provider } from 'react-redux';
import CounterDemoPage from './pages/counter.demo.page';
import { store } from './store';
import ProductPage from './pages/product.page';

// uygulamanın çalıştığı root element
const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
	{
		path: '',
		Component: Layout,
		children: [
			{
				path: '',
				element: <>Home Page</>,
			},
			{
				path: 'contextapi',
				Component: ContextAPIDemo,
			},
			{
				path: 'redux',
				Component: CounterDemoPage,
			},
			{
				path: 'redux-thunk',
				Component: ProductPage,
			},
		],
	},
	{
		path: '*',
		element: <>404 Sayfa Bulunamadı</>,
	},
]);

// root.render hangi component load olacağını
root.render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);

// Not: Provider'ların hangi durumlarda ne kadarlık bir bölge için geçerli olacağına biz karar veririz. Uygulama geneline ilgi state değerlerinin yansıması için

/*
    
    <CartProvider>
		{' '}
		<RouterProvider router={router} />
	</CartProvider>

*/
