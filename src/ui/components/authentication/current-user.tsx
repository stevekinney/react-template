import { useAuth } from '@ui/context/auth-context';
import { Button } from '../button';

export const CurrentUser = () => {
  const { user, logout, isLoading } = useAuth();

  return (
    <div className="flex justify-between items-center p-4">
      <p className="font-semibold">{user?.email}</p>
      <Button disabled={isLoading} variant="secondary" onClick={logout}>
        {isLoading ? 'Signing out...' : 'Sign Out'}
      </Button>
    </div>
  );
};
