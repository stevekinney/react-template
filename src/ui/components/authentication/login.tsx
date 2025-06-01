import { useState } from 'react';
import { Button } from '@ui/components/button';
import { Input } from '@ui/components/input';
import { TabSelect } from '@ui/components/tabs';
import { useToggle } from '@ui/hooks/use-toggle';
import { useAuth } from '@ui/context/auth-context';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, modes, setMode] = useToggle(['Log In', 'Sign Up'], 'Log In');
  const { login, signup, isLoading } = useAuth();

  return (
    <form
      className="space-y-6 bg-slate-100 rounded-lg shadow-md p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        try {
          if (mode === 'Log In') {
            await login(email, password);
          } else {
            await signup(email, password);
          }
          setEmail('');
          setPassword('');
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      }}
    >
      <TabSelect options={modes} selected={mode} set={setMode} />

      <Input
        required
        label="Email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        label="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Button
        className="w-full"
        disabled={isLoading}
        type="submit"
        variant="primary"
      >
        {isLoading ? 'Loading...' : mode}
      </Button>
    </form>
  );
};
