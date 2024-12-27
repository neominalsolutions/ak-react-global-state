// asenkron olarak ürünlerin listesinin çekilip ürünler state aktarılmasını redux thunk ile yapacağımız slice

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

interface Product {
	name: string;
	id: number;
	listprice: number;
}

export interface ProductState {
	data: Product[]; // promise fullfilled state durumu
	loading: boolean; // promise pending state durumu
	error: any | null; // promise rejected olursaki durum
}

// server state => client state çevirmek
export const fetchProductsAction = createAsyncThunk('Products', async () => {
	// axios ile apidan verinin çekilme işlemi
	try {
		const data = (
			await axios.get(
				'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
			)
		).data.value;

		// format mapping
		const response = data.map((item: any) => {
			return {
				name: item.ProductName,
				id: item.ProductID,
				listprice: item.UnitPrice,
			};
		});

		return response; // payload
	} catch (error: any) {
		return error; // payload
	}
});

const initState: ProductState = { data: [], loading: false, error: null };

const ProductSlice = createSlice({
	name: 'Products',
	initialState: initState,
	reducers: {}, // normal senkron olan reducer

	extraReducers(builder) {
		builder.addCase(fetchProductsAction.pending, (state: ProductState) => {
			console.log('pending');
			state.loading = true;
			return state;
		});
		builder.addCase(
			fetchProductsAction.fulfilled, // Promise resolved
			(state: ProductState, action: PayloadAction<any[]>) => {
				console.log('fulfilled');
				state.loading = false;
				state.data = action.payload; // success response
				return state;
			}
		);
		builder.addCase(
			fetchProductsAction.rejected, // Promise resolved
			(state: ProductState, action: PayloadAction<any>) => {
				console.log('rejected');
				state.loading = false;
				state.data = [];
				state.error = action.payload; // error response
				return state;
			}
		);
	},
	// asenkron işlemler için kullandığımız reducer
});

export const ProductReducer = ProductSlice.reducer;
