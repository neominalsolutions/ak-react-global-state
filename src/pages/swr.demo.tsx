import axios from 'axios';
import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';

function SwrDemoPage() {
	const [limit, setLimit] = useState<number>(5);

	const fetcher: Fetcher<any[], string> = async (key: string) => {
		console.log('key', key);
		return (await axios.get(key)).data.value;
	};

	// useEffect gibi çalışıp component doma ilk başılırken veriyi load edicek.
	const { data, isLoading, error } = useSWR(
		`https://services.odata.org/northwind/northwind.svc/Products?$format=json&$top=${limit}`,
		fetcher,
		{ errorRetryCount: 3, refreshInterval: 1000 * 60, revalidateOnFocus: true }
	);

	if (isLoading) return <>Loading...</>;

	if (error) return <>Veri çekerken hata meydana geldi</>;

	if (data) {
		return (
			<>
				<label>Limit</label>
				<input
					value={limit}
					type="number"
					onChange={(e: any) => {
						setLimit(Number(e.target.value));
					}}
				/>
				<hr></hr>
				{data.map((item: any) => {
					return <div key={item.id}>{item.ProductName}</div>;
				})}
			</>
		);
	}

	return <></>;
}

export default SwrDemoPage;
