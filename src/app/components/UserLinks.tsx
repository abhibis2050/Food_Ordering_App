"use client";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const UserLinks = () => {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <Link href="/orders">Orders</Link>
          <span className="ml-4 cursor-pointer" onClick={() => signOut()}>Logout</span>
        </>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default UserLinks;
