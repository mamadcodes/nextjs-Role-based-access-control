import { useEffect, useState } from 'react';

const UserPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/user')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  if (message) return <h1>{message}</h1>;
  return <div><h1>Loading...</h1></div>;
};

export default UserPage;
