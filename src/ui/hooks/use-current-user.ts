import { useEffect, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@ui/utilities/supabase';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
        setSession(session);
        document.cookie = `token=${session.access_token}; path=/; max-age=31536000; secure; SameSite=Lax`;
      } else {
        setUser(null);
        setSession(null);
        document.cookie = 'token=; path=/; max-age=0; secure; SameSite=Lax';
      }
    });
  }, [setUser]);

  return { user, session };
};
