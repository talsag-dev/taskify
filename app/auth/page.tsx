"use client";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormInputs = {
  email: string;
  password: string;
  name?: string;
  age?: number;
};

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleCredentialsAuth: SubmitHandler<FormInputs> = async (data) => {
    const { email, password, name, age } = data;

    if (isSignup) {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, name, age }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        setError("Signup failed. User might already exist.");
        return;
      }

      setError("");
      setIsSignup(false);
      reset(); // Reset the form
      redirect("/");
    } else {
      // Handle Login
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        setError("");
        redirect("/");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[150px]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        {isSignup ? "Signup for Taskify" : "Login to Taskify"}
      </h1>

      <form
        onSubmit={handleSubmit(handleCredentialsAuth)}
        className="w-full max-w-md space-y-4"
      >
        {isSignup && (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="age"
                className="block text-gray-700 dark:text-gray-300"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                {...register("age", {
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "You must be at least 18 years old",
                  },
                })}
                className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
          </>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <div className="w-full max-w-md mt-8 space-y-4">
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded"
        >
          {isSignup ? "Signup with GitHub" : "Login with GitHub"}
        </button>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          {isSignup ? "Signup with Google" : "Login with Google"}
        </button>
      </div>

      <p className="mt-4 text-gray-600 dark:text-gray-400">
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
            reset(); // Reset the form when switching modes
          }}
          className="text-blue-600 hover:underline"
        >
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
}
