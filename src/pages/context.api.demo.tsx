import React, { useContext } from 'react';
import {
	CartContext,
	CartContextType,
	CartProvider,
} from '../contexts/cart.context';

// Toplam Sepet Tutar
export function Child1() {
	const context = useContext(CartContext) as CartContextType;

	return (
		<>
			<div>
				{context.cart.items.map((item) => {
					return <div key={item.id}>{item.name}</div>;
				})}
			</div>
			<div>Toplam Tutar: {context.cart.total}</div>
		</>
	);
}

// Ürün Adet
export function Child2() {
	const context = useContext(CartContext) as CartContextType;

	return <>Ürün Adet {context.cart.items.length}</>;
}

export function Parent() {
	// actionlara vedya state useContext üzerinden erişim sağlıyoruz.
	const context = useContext(CartContext) as CartContextType;

	// actions
	const addItem = () => {
		context.addToCart({ id: 1, name: 'test', listprice: 10, quantity: 3 });
	};

	const removeItem = () => {
		context.removeFromCart(1);
	};

	return (
		<>
			<h1>Parent</h1>

			<button onClick={addItem}>(+)</button>
			<button onClick={removeItem}>(-)</button>

			<hr></hr>
			<Child1 />
			<hr></hr>
			<Child2 />
		</>
	);
}

// Not: aşağıdaki tanımlamada sadace bu sayfalarda CartProvider kullanılacağı düşünülerek yapıldı. Bu durumda gereksiz render ortadan kalktı fakat CartProvider daki bilgiler sayfalar arası geçişte sıfırlanacak.
function ContextAPIDemo() {
	return (
		<>
			<CartProvider>
				<Parent />
			</CartProvider>
		</>
	);
}

export default ContextAPIDemo;
