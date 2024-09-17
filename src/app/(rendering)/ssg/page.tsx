
async function getData() {
    const data = [
        { id: 1, title: 'First SSG Post', description: 'This is the first SSG post description.' },
        { id: 2, title: 'Second SSG Post', description: 'This is the second SSG post description.' },
    ];

    return data;
}

export default async function SSGPage() {
    const items = await getData();

    return (
        <div>
            <h1>Static Generation (SSG)</h1>
            {items.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}
