import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

// sadece değeri 1 arıtacak bir action tanımı var
type State = number;

// export const increment: CaseReducer<State, PayloadAction<number>> = (
// 	state,
// 	action
// ) => state + action.payload;

// 2 => state =>2

const counterSlice = createSlice({
	name: 'Counter', // Prefix => Farklı stateler için ön takı verilerek birbirlerinden ayrılırlar
	initialState: 0, // sayaç değerimiz 0 default
	reducers: {
		increment: (state: State, action: PayloadAction<number>) => {
			state += action.payload;
			return state;
		},
	},
});

// componentlerde action dispatch etmek için dışarı çıkardık
export const { increment } = counterSlice.actions;
// store ile reducer bağlanmalıdır. store bağlantısı için export ettik.
export const CounterReducer = counterSlice.reducer;
