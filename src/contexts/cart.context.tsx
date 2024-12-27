// Not: Context ve Provider yapılarının tanımı
// Senaryo: E-Ticaret sitelerindeki sepet yapısını simüle edelim

import React, { createContext, useState } from 'react';

export interface CartItem {
	id: number;
	name: string;
	quantity: number;
	listprice: number;
}

export interface Cart {
	items: CartItem[]; // septteki ürünler
	total: number; // sepet tutar
}

// Action tanımlarını yapıcaz
// Sepete ürün ekleme,  Sepetten ürün çıkarma, Ürün adet güncelleme
// her bir yapılan aksiyon sonucu sepet toplam tutar değişmelidir.

export type UpdateQuantity = {
	id: number;
	quantity: number;
};

// Cart ile ilgili diğer componentlerinin erişeceği verilere ait arayüz
export type CartContextType = {
	cart: Cart; // güncel sepet state
	addToCart: (payload: CartItem) => void; // bu methodlarda state güncelleme yapılsın bundan dolayı return etmiyor
	removeFromCart: (payload: number) => void;

	updateQuantity: (payload: UpdateQuantity) => void;
};

// İlgi state ile ilgili yönetim Context API da Provider nesnesine verilmiştir.
// Ortak kullanılacak olan veri ise Context üzerinde tutulmaktadır.
// Provider Context üzerindeki verinin hangi componentler üzerinden erişleceği ile de ilgilenir.

export const CartContext = createContext<CartContextType | null>(null);

type CartProps = {
	children: React.ReactNode;
};

// toplam sepet tutarını hesapladık
const calcTotal = (cart: Cart) => {
	let _total = 0;

	cart.items.forEach((item) => {
		_total += item.quantity * item.listprice;
	});

	return _total;
};

export const CartProvider = ({ children }: CartProps) => {
	const cartinit = { items: [], total: 0 }; // initial value
	const [cart, setCart] = useState<Cart>(cartinit);

	const addToCart = (payload: CartItem) => {
		// state güncelleme
		// aynı id sahip bir ürün varsa adet arttır.
		// yoksa eklet

		// sepette hiç kayıt yoksa
		if (cart.items.length == 0) {
			cart.items = [...cart.items, payload];
		} else {
			const items = cart.items.map((item) => {
				if (item.id == payload.id) {
					item.quantity = item.quantity + 1;
				} else {
					// burada yeni bir ekleme yaptı.
					cart.items = [...cart.items, payload];
				}

				return { ...item };
			});

			cart.items = [...items];
		}

		cart.total = calcTotal(cart);

		setCart({ ...cart });
	};

	const removeFromCart = (payload: number) => {
		// state güncelleme

		const items = cart.items.filter((x) => x.id != payload);
		cart.items = [...items];
		cart.total = calcTotal(cart);

		setCart({ ...cart });
	};

	const updateQuantity = (payload: UpdateQuantity) => {
		// state güncelleme
		const items = cart.items.map((item) => {
			if (item.id == payload.id) {
				item.quantity = payload.quantity;
			}

			return { ...item };
		});

		cart.items = [...items]; // cart Items nesnesi güncellendi
		cart.total = calcTotal(cart);

		setCart({ ...cart });
	};

	const values = { cart, addToCart, removeFromCart, updateQuantity };
	// Not: value tanımı sayesinde CartContext.Provider üzerinden erişilecek olan değerler dışarıya export edilir.

	return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};
