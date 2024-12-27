import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Her bir ürüne ait özellikler
export interface ProductLine {
	id: number;
	name: string;
	listprice: number;
}

// Favori Ürünler State
export interface FavoriteProductState {
	items: ProductLine[];
}

const initState: FavoriteProductState = { items: [] };


// ürünler listesinden favori listesine ürün eklememiz lazım
const addItem: CaseReducer<FavoriteProductState, PayloadAction<ProductLine>> = (
	state,
	action
) => {
	const item = state.items.find((x) => x.id == action.payload.id);

	if (!item) {
		state.items.push(action.payload);
	}

	return state;
};

// favori listesinden ürün çıkarma // FavoriteProductState üzerinden çıkarma
const removeItem: CaseReducer<
	FavoriteProductState,
	PayloadAction<{ id: number }>
> = (state, action) => {
	const items = state.items.filter((x) => x.id !== action.payload.id);

	state.items = items;

	return state;
};

const favoriteProductSlice = createSlice({
	name: 'FavoriteProducts',
	initialState: initState,
	reducers: {
		addItem,
		removeItem,
	},
});

export const addItemAction = favoriteProductSlice.actions.addItem;
export const removeItemAction = favoriteProductSlice.actions.removeItem;

export const favoriProductsReducer = favoriteProductSlice.reducer;
