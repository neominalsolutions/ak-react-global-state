import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './slices/counter.slice';
import { favoriProductsReducer } from './slices/favorite.products.slice';
import { ProductReducer } from './slices/products.slice';

// counterState state erişim ismi
// CounterReducer state güncelleyecek olan function

export const store = configureStore({
	reducer: {
		counterState: CounterReducer, // state erişimi yaptığımız state bilgilerini güncellediğimiz functionlara biz reducer.
		favoriteProductsState: favoriProductsReducer,
		productState: ProductReducer,
	},
});

console.log('store', store);

store.subscribe(() => {
	console.log('store listener');
});

export type RootState = ReturnType<typeof store.getState>;
