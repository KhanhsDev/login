export const dynamic = 'force-dynamic';
// yêu cầu next luôn phải render động từ server cho mỗi yêu cầu
async function getData() {
    const data = [
        { id: 1, title: 'First SSR Post', description: 'This is the first SSR post description.' },
        { id: 2, title: 'Second SSR Post', description: 'This is the second SSR post description.' }
    ];

    return data;
}

export default async function SSRPage() {
    const items = await getData();

    return (
        <div>
            <h1>Server-Side Rendering (SSR)</h1>
            {items.map((item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}
