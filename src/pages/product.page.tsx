import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
	addItemAction,
	removeItemAction,
} from '../slices/favorite.products.slice';
import { fetchProductsAction } from '../slices/products.slice';

// senkron data
const FavoriteProductsList = () => {
	const favoriProducts = useSelector(
		(rootState: RootState) => rootState.favoriteProductsState
	);

	const dispatch = useDispatch<any>();
	return (
		<>
			{' '}
			<h1>Favori Ürünler</h1>
			{favoriProducts.items.map((item) => {
				return (
					<div>
						<p>Favori Ürün: {item.name}</p>
						<button onClick={() => dispatch(removeItemAction({ id: item.id }))}>
							Listeden Çıkar
						</button>
					</div>
				);
			})}
			<div>Favori Ürün Sayısı: {favoriProducts.items.length}</div>
		</>
	);
};

// async data
const ProductList = () => {
	const productState = useSelector(
		(rootState: RootState) => rootState.productState
	);
	const dispatch = useDispatch<any>();

	if (productState.loading) return <>Veri Yükleniyor</>;

	if (productState.error != null)
		return <>Veri yüklenirken hata meydana geldi</>;

	if (productState.data.length > 0)
		return (
			<div>
				<h1>Ürün Listesi</h1>
				{productState.data.map((item: any) => {
					return (
						<div key={item.id}>
							{item.name} / {item.listprice}
							<button onClick={() => dispatch(addItemAction(item))}>
								Ekle
							</button>
						</div>
					);
				})}
				<div>
					<button onClick={() => dispatch(fetchProductsAction())}>
						refresh
					</button>
				</div>
			</div>
		);

	return <></>;
};

function ProductPage() {
	return (
		<>
			<ProductList />
			<hr></hr>
			<FavoriteProductsList />
		</>
	);
}

export default ProductPage;
