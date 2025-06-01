import { useState } from 'react';
import { Authentication } from './components/authentication';
import { Button } from './components/button';
import { ErrorBoundary } from './components/error-boundary';
import { AuthProvider } from './context/auth-context';
import { api, APIError } from './api/client';

function Application() {
  const [message, setMessage] = useState<string | null>(null);

  const handleClick = async () => {
    try {
      const response = await api.protected();
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      if (error instanceof APIError) {
        setMessage(`Error (${error.status}): ${error.message}`);
      } else {
        setMessage('An unexpected error occurred');
      }
    }
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
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
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default Application;
