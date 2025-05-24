import { useState } from 'react';

function Application() {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch('/api/check');
    const data = await response.json();
    if (response.ok) {
      setMessage(data.message);
    } else {
      setMessage('Error: ' + data.message);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-4 bg-slate-100 mt-8 rounded-lg shadow-md">
      <button
        onClick={handleClick}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 text-white active:outline-blue-200 active:outline-2 active:outline-offset-2"
      >
        Check the API
      </button>
      {message && (
        <div className="bg-slate-200 p-4 mt-4 rounded-lg flex items-center justify-between">
          <p>{message}</p>
          <button
            onClick={() => setMessage(null)}
            className="bg-red-300 px-2 py-1 text-sm rounded hover:bg-red-400 mt-2"
          >
            Clear Message
          </button>
        </div>
      )}
    </div>
  );
}

export default Application;
