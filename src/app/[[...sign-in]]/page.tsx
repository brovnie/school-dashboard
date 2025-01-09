"use client";
import React, { useEffect } from "react";
import * as Clark from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  useEffect(() => {
    const role = user?.publicMetadata.role;
    role && router.push(`/${role}`);
  }, [user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-skyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
        >
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={24} height={24} />
            School Management Board
          </h1>
          <p className="text-gray-400">Sign in to your account</p>
          <Clark.GlobalError className="text-sm text-red-400" />
          <Clark.Field name="identifier" className="flex flex-col gap-2">
            <Clark.Label className="text-xs text-gray-500">
              Username
            </Clark.Label>
            <Clark.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clark.FieldError className="text-sm text-red-400" />
          </Clark.Field>
          <Clark.Field name="password" className="flex flex-col gap-2">
            <Clark.Label className="text-xs text-gray-500">
              Password
            </Clark.Label>
            <Clark.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clark.FieldError className="text-sm text-red-400" />
          </Clark.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default HomePage;
