import { useCurrentUser } from '@ui/hooks/use-current-user';
import { CurrentUser } from './current-user';
import { Login } from './login';

export const Authentication = () => {
  const { user } = useCurrentUser();

  if (user === null) {
    return <Login />;
  }

  return <CurrentUser />;
};
