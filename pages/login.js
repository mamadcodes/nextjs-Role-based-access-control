import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import "../app/globals.css"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email, password)
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);
      alert('Login successful!');

      router.push('/');
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || 'Invalid email or password.');
    }
  };

  return (
    <div className='grid grid-cols-5 bg-white min-h-screen'>
      <div className='col-span-2 bg-gray-50'>
      <div className='mx-24 mt-12'>
      <div className='text-gray-800 text-base font-sans font-light my-8'>@mamad.codes</div>
      <div className='text-gray-700 text-3xl font-sans font-semibold my-12 pt-16 '>Login to your Account</div>
      <div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
              Login
            </button>
          </div>
          <div className='border-b-2'></div>
          <div className='text-gray-500 text-center font-thin pt-4'>Don't have an Account? <Link href={"/register"} className='text-green-800 underline'>Register</Link></div>
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
