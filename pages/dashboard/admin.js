import { useEffect, useState } from 'react';

const AdminPage = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  return <div>{message ? <h1>{message}</h1> : <h1>Loading...</h1>}</div>;
};

export default AdminPage;
