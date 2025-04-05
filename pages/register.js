import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import "../app/globals.css"
import Image from 'next/image';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/register', {
        username,
        email,
        password,
      });
      alert('Registration successful! You can now log in.');
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-6 rounded shadow-md w-96">
    //     <h1 className="text-2xl font-bold mb-4">Register</h1>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     <form onSubmit={handleRegister} className="space-y-4">
    //       <div>
    //         <label className="block text-gray-700">Username</label>
    //         <input
    //           type="text"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           className="w-full px-3 py-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-gray-700">Email</label>
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           className="w-full px-3 py-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <div>
    //         <label className="block text-gray-700">Password</label>
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full px-3 py-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
    //       >
    //         Register
    //       </button>
    //     </form>
    //     <p className="mt-4 text-gray-600">
    //       Already have an account?{' '}
    //       <a href="/login" className="text-blue-500 hover:underline">
    //         Log in
    //       </a>
    //     </p>
    //   </div>
    // </div>
    <div className='grid grid-cols-5 bg-white min-h-screen'>
      <div className='col-span-2 bg-gray-50'>
        <div className='mx-24 mt-12'>
        <div className='text-gray-800 text-base font-sans font-light my-8'>@mamad.codes</div>
        <div className='text-gray-700 text-3xl font-sans font-semibold my-12 '>Create Account</div>
          <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-extralight font-serif py-2 px-1">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border rounded-full text-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-extralight font-serif py-2 px-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-full text-gray-600"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-extralight font-serif py-2 px-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-full text-gray-600"
                  required
                />
              </div>
              <div className='pt-8'>
                <button
                    type="submit"
                    className="w-full bg-green-800 text-white px-3 py-4 rounded-full my-4 hover:bg-green-600"
                  >
                  Register
                </button>
              </div>
              <div className='border-b-2'></div>
              <div className='text-gray-500 text-center font-thin pt-4'>Have an Account? <Link href={"/login"} className='text-green-800 underline'>Login</Link></div>
            </form>
          </div>
        </div>
      </div>
      <div className='col-span-3 relative w-full h-full overflow-hidden rounded-l-3xl'>
        <Image
          src='/img.jpg'
          alt="Example Image"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </div>
  );
}
