import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { increment } from '../slices/counter.slice';

function CounterDemoPage() {
	// state erişim yapmamızı sağlar hook
	const state = useSelector((store: RootState) => store.counterState);

	// state güncellememizi sağlayan hook
	const dispatch = useDispatch();

	return (
		<>
			<button
				onClick={() => {
					// dispatch ile birlikte güncellenecek action çağırısı yaptık
					dispatch(increment(5));
				}}
			>
				(+)
			</button>
			<p>Sayac: {state}</p>
		</>
	);
}

export default CounterDemoPage;
