import { useState } from 'react';
import { Button } from '@ui/components/button';
import { Input } from '@ui/components/input';
import { TabSelect } from '@ui/components/tabs';
import { useToggle } from '@ui/hooks/use-toggle';
import { supabase } from '@ui/utilities/supabase';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [mode, modes, setMode] = useToggle(['Log In', 'Sign Up'], 'Log In');

  return (
    <form
      className="space-y-6 bg-slate-100 rounded-lg shadow-md p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        const fn = mode === 'Log In' ? 'signInWithPassword' : 'signUp';
        const credentials = { email, password };
        const { error } = await supabase.auth[fn](credentials);
        if (error) {
          setError(error.message);
        } else {
          setEmail('');
          setPassword('');
          setError(null);
        }
      }}
    >
      <TabSelect options={modes} selected={mode} set={setMode} />

      <Input
        label="Email"
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="Password"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <Button className="w-full" type="submit" variant="primary">
        {mode}
      </Button>
    </form>
  );
};
