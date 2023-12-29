"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { publicEnv } from "@/lib/env/public";
import AuthInput from "./AuthInput";
import { useToast } from "@/components/toast/use-toast";
import { cn } from "@/lib/utils";

function AuthForm() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var fail = false;
    if(password.length < 8) {
      toast({
        variant: "destructive",
        description: "Password should be at least of length 8",
      });
      fail = true
    }
    if(isSignUp && password !== confirmPassword) {
      toast({
        variant: "destructive",
        description: "Confirm password must match password",
      });
      fail = true
    }
    if(isSignUp && !username) {
      toast({
        variant: "destructive",
        description: "Please fill in your username",
      });
      fail = true
    }
    if(fail) return;
    signIn("credentials", {
      email,
      username,
      password,
      callbackUrl: `${publicEnv.NEXT_PUBLIC_BASE_URL}/menu`,
    });
  };
  return (
    <div className={cn("min-w-[300px] border-2 border-white rounded text-white", isSignUp && "-mt-10")}>
        <div className="m-4 mb-3 text-lg font-semibold">Sign {isSignUp ? "Up" : "In"}</div>
      <div className="flex flex-col gap-2 m-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <AuthInput
            label="Email"
            type="email"
            value={email}
            setValue={setEmail}
          />
          {isSignUp && (
            <AuthInput
              label="Username"
              type="text"
              value={username}
              setValue={setUsername}
            />
          )}
          <AuthInput
            label="Password"
            type="password"
            value={password}
            setValue={setPassword}
          />
          {isSignUp && (
            <AuthInput
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              setValue={setConfirmPassword}
            />
          )}
          <div className="text-sm text-gray-500">
            {isSignUp ? (
              <span>
                Already have an account?{" "}
                <a
                  className="cursor-pointer hover:text-white"
                  onClick={() => setIsSignUp(false)}
                >
                  Sign In
                </a>
              </span>
            ) : (
              <span>
                Do not have an account?{" "}
                <a
                  className="cursor-pointer hover:text-white"
                  onClick={() => setIsSignUp(true)}
                >
                  Sign Up
                </a>
              </span>
            )}
          </div>
          <button type="submit" className="font-semibold w-full border-2 p-1 hover:bg-white hover:text-black">
            Sign {isSignUp ? "Up" : "In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthForm;
