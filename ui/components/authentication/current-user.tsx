import { useCurrentUser } from '@ui/hooks/use-current-user';
import { supabase } from '@ui/utilities/supabase';
import { Button } from '../button';

export const CurrentUser = () => {
  const { user } = useCurrentUser();

  return (
    <div className="flex justify-between items-center p-4">
      <p className="font-semibold">{user?.email}</p>
      <Button variant="secondary" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </Button>
    </div>
  );
};
