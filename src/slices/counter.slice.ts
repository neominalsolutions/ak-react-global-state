import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

// sadece değeri 1 arıtacak bir action tanımı var
type CounterState = number;

// 1. yazım şekli
const increment: CaseReducer<CounterState, PayloadAction<number>> = (
	state,
	action
) => state + action.payload; // tek satırlık yazım şekli

const decrement: CaseReducer<CounterState, PayloadAction<number>> = (
	state,
	action
) => {
	state -= action.payload;
	return state;
}; // çok satırlı yazımda return etmemiz lazım

// 2 => state =>2

const counterSlice = createSlice({
	name: 'Counter', // Prefix => Farklı stateler için ön takı verilerek birbirlerinden ayrılırlar
	initialState: 0, // sayaç değerimiz 0 default
	reducers: { // action reducer bağladığımız kısım.
		increment,
		decrement,
		reset: (state: CounterState) => {
			// 2. yazım şekli
			state = 0;
			return state;
		},
	},
});

// componentlerde action dispatch etmek için dışarı çıkardık
export const incrementAction = counterSlice.actions.increment;
export const resetAction = counterSlice.actions.reset;
export const decrementAction = counterSlice.actions.decrement;
// store ile reducer bağlanmalıdır. store bağlantısı için export ettik.
export const CounterReducer = counterSlice.reducer;
