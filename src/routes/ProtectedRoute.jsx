import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ProtectedRoute({ children }) {

  const [session, setSession] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

  
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) setSession(session);
    });

  
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) setSession(session);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);


  if (session === undefined) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        Loading...
      </div>
    );
  }


  if (!session) {
    return <Navigate to="/login" replace />;
  }


  return children;
}