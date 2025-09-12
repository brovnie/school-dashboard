"use client";
import { useClerk } from "@clerk/nextjs";

const Logout = () => {
  const { signOut } = useClerk();
  signOut({ redirectUrl: "/" });
  return null;
};
export default Logout;
