// pages/index.js
import Link from 'next/link';

function HomePage() {
  return (
      <div>
        <h1>Menu</h1>
        <ul>
          <li>
            <Link href="/login">Go to Login form</Link>
          </li>
          <li>
            <Link href="/ssg">Static Generation (SSG)</Link>
          </li>
          <li>
            <Link href="/ssr">Server-Side Rendering (SSR)</Link>
          </li>
          <li>
            <Link href="/csr">Client-Side Rendering (CSR)</Link>
          </li>
        </ul>
      </div>
  );
}

export default HomePage;
