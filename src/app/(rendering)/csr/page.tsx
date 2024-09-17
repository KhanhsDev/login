'use client';

import { useState, useEffect } from 'react';

export default function CSRPage() {
    const [items, setItems] = useState([{}]);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = [
                    { id: 1, title: 'First CSR Post', description: 'This is the first CSR post description.' },
                    { id: 2, title: 'Second CSR Post', description: 'This is the second CSR post description.' },
                ];
                console.log("Fetched Data: ", data);  //
                if (isMounted && Array.isArray(data)) {
                    setItems(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError('Failed to fetch data');
                }
                console.error(err);
            }
        };
        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Client-Side Rendering (CSR)</h1>
            {items.length > 0 ? (
                items.map((item) => (
                    <div key={item.id}>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
