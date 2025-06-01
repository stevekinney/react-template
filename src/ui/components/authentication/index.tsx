import { useAuth } from '@ui/context/auth-context';
import { CurrentUser } from './current-user';
import { Login } from './login';

export const Authentication = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (user === null) {
    return <Login />;
  }

  return <CurrentUser />;
};
