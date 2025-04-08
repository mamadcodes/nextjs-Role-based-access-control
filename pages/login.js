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
    // console.log(email, password)
    try {
      const response = await axios.post('/api/login', {
        email,
        password,
      });

      // Save the token in localStorage
      // localStorage.setItem('token', response.data.token);
      alert('Login successful!');

      router.push('/');
    } catch (err) {
      console.log(err)
      setError(err.response?.data?.error || 'Invalid email or password.');
    }
  };

  const googleAuth = () => {
    const baseURL = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: "openid email profile",
      prompt: "select_account",
    });

    window.location.href = `${baseURL}?${params.toString()}`;
  };
  return (
    <div className='grid grid-cols-5 bg-white min-h-screen'>
      <div className='col-span-5 md:col-span-3 lg:col-span-2 bg-gray-50'>
      <div className='mx-12 md:mx-24 mt-12'>
      <div className='text-gray-800 text-base font-sans font-light my-8'>@mamad.codes</div>
      <div className='text-gray-700 text-3xl font-sans font-semibold my-12 pt-16 '>Login to your Account</div>
      <div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-2">
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
          <div className='pt-4'>
            <button
                type="submit"
                className="w-full bg-green-800 text-white px-3 py-4 rounded-full my-4 hover:bg-green-600"
              >
              Login
            </button>
          </div>
          <div className="text-gray-500 px-8 relative text-center overflow-hidden before:content-[''] before:inline-block before:align-middle before:h-px before:bg-gray-400 before:w-1/2 before:relative before:right-2 before:ml-[-50%] after:content-[''] after:inline-block after:align-middle after:h-px after:bg-gray-400 after:w-1/2 after:relative after:left-2 after:mr-[-50%]">
            Or
          </div> 
          </form>

        <div className='grid grid-flow-col pt-2'>
          <button
              // type="submit"
              onClick={googleAuth}
              className="w-full bg-white text-gray border-[1px] border-gray-400 px-3 py-4 rounded-full my-4 hover:bg-green-600"
            >
            <div className='grid grid-cols-4'>
                <Image
                  src='/google.png'
                  alt="google logo"
                  width={25}
                  height={25}
                  className='mx-6'
                />  
                <div className='col-span-3'>Login with Google</div>
            </div>
          </button>
        </div>
      </div>
    </div>
      </div>
      <div className='hidden md:block col-span-2 md:col-span-2 lg:col-span-3 relative w-full h-full overflow-hidden rounded-l-3xl'>
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
