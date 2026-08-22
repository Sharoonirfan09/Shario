"use client";

import { onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider, type User } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "@/lib/firebase";

/**
 * Google sign-in only restricts *who has a Google account* — anyone could
 * sign in without this. The actual gate is this allowlist, read from
 * `NEXT_PUBLIC_ADMIN_EMAILS` (comma-separated) at build time.
 */
const ALLOWED_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

function isAllowed(user: User | null) {
  return !!user?.email && ALLOWED_EMAILS.includes(user.email.toLowerCase());
}

export function AdminGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setLoading(false);
  }), []);

  async function handleSignIn() {
    setError(null);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch {
      setError("Sign-in failed. Please try again.");
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-porcelain text-carbon-60">Loading…</div>;
  }

  if (!isAllowed(user)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-porcelain px-6 text-center text-carbon">
        <p className="text-sm text-carbon-60">
          {user ? `${user.email} is not authorized for admin access.` : "Sign in to continue."}
        </p>
        {user && (
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-carbon-60 underline underline-offset-4"
          >
            Sign out and try a different account
          </button>
        )}
        {!user && (
          <button
            onClick={handleSignIn}
            className="border border-carbon px-6 py-2 text-sm hover:bg-mist"
          >
            Sign in with Google
          </button>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain text-carbon">
      <header className="flex items-center justify-between border-b border-rule px-6 py-4">
        <span className="text-sm text-carbon-60">{user!.email}</span>
        <button
          onClick={() => signOut(auth)}
          className="text-sm text-carbon-60 underline underline-offset-4"
        >
          Sign out
        </button>
      </header>
      <main className="px-6 py-8">{children}</main>
    </div>
  );
}
