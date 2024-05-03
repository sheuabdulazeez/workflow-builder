"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { SignedOut, SignedIn, SignOutButton, useUser, UserProfile, SignInButton, SignUpButton } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Link from "next/link";

export default function Home() {
  const { user } = useUser()
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-xl text-bold">Landing Page</h1>
        <SignedOut>
          <div className="flex gap-3">
            <Button>
              <SignInButton>
              Login
              </SignInButton>
            </Button>
            <Button>
              <SignUpButton>
              Sign Up
              </SignUpButton>
            </Button>
          </div>
          
          
        </SignedOut>
        <SignedIn>
          <h2>Welcome back {user?.fullName}</h2>
          <Button>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </SignedIn>
      </div>
    </div>
  );
}
