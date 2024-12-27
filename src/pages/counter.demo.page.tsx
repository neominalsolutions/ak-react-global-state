import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
	decrementAction,
	incrementAction,
	resetAction,
} from '../slices/counter.slice';

function CounterDemoPage() {
	// state erişim yapmamızı sağlar hook
	const state = useSelector((store: RootState) => store.counterState);

	// state güncellememizi sağlayan hook
	const dispatch = useDispatch();

	const onDecrement = (e: any) => {
		dispatch(decrementAction(Number(e.target.value)));
	};

	return (
		<>
			<label>Azaltılacak olan değer</label>
			<input onChange={onDecrement} placeholder="değer giriniz" />

			{/* state 5'er 5'er artır */}
			<button
				onClick={() => {
					// dispatch ile birlikte güncellenecek action çağırısı yaptık
					dispatch(incrementAction(5));
				}}
			>
				(+)
			</button>
			<button onClick={() => dispatch(resetAction())}>Reset</button>
			{/* state resetler */}
			<p>Sayac: {state}</p>
		</>
	);
}

export default CounterDemoPage;
