import { useState } from 'react';
import { Authentication } from './components/authentication';
import { Button } from './components/button';

function Application() {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch('/api/protected');
    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
    } else {
      setMessage('Error: ' + data.error);
    }
  };

  return (
    <main className="space-y-8 my-8 mx-auto max-w-2xl px-4 md:px-0">
      <Authentication />
      <div className="p-4 bg-slate-100 rounded-lg shadow-md">
        <Button onClick={handleClick}>Check the Protected API</Button>
        {message && (
          <div className="bg-slate-200 flex-col md:flex-row p-4 mt-4 rounded-lg flex items-center justify-between gap-4">
            <p>{message}</p>
            <Button variant="secondary" onClick={() => setMessage(null)}>
              Clear
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Application;
