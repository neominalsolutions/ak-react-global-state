import { configureStore } from '@reduxjs/toolkit';
import { CounterReducer } from './slices/counter.slice';

// counterState state erişim ismi
// CounterReducer state güncelleyecek olan function

const store = configureStore({
	reducer: {
		counterState: CounterReducer, // state erişimi yaptığımız state bilgilerini güncellediğimiz functionlara biz reducer.
	},
});

console.log('store', store);

store.subscribe(() => {
	console.log('store listener');
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
