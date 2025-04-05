import Link from 'next/link';


export default function Home() {
  return (
    <>
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">index page</h2>
        <h1 className="text-xl font-bold">
          <Link href="/login">Login</Link>
        </h1>
        <h1 className="text-xl font-bold">
          <Link href="/register">Register</Link>
        </h1>
        <h1 className="text-xl font-bold">
          <Link href="/dashboard/user">user dashboard</Link>
        </h1>
        <h1 className="text-xl font-bold">
          <Link href="/dashboard/admin">admin dashboard</Link>
        </h1>
      </div>
    </>
  );
}
