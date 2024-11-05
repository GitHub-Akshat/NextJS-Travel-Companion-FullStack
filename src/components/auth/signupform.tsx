"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import CardWrapper from "./cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/schema/authSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"
import toast from "react-hot-toast";
import Image from "next/image";

const SignupComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues:{
      fullname:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  });

  const onSubmit = async ( data: z.infer<typeof SignUpSchema> ) =>{
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/user", data);
      console.log("User created successfully:", response.data);
      if (response.data.success) 
      {
        toast.success("User created successfully! Please login to continue.", { duration: 8000 });
        router.push('/login');
      } 
      else {
        console.error("Error in creating your account:", response.data.message || "Unknown error");
        setError(response.data.message || "An error occurred during account creation.");
      }
    } 
    catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } 
    finally {
      setLoading(false);
    }
  }

  const loginwithgoogle = () =>{
    signIn('google', { callbackUrl: 'http://localhost:3000/home' })
  }

  return (
    <CardWrapper
      label="Create an Account"
      title="Sign Up"
      backButtonHref="/login"
      backButtonLabel=" Already Have An Account? Login Here "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="space-y-2 mb-2">
            <FormField
              control={form.control}
              name="fullname"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Dwayne Johnson" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="example@example.com" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({field})=>(
                <FormItem>
                  <FormLabel>
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : "Create Account"}
          </Button>
        </form>
        <div className="mx-auto my-0.5 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <Button disabled={loading} onClick={loginwithgoogle} className="w-full bg-white text-black border border-gray-300 rounded-md py-2 px-4 transition duration-200 ease-in-out hover:bg-slate-100">
          <Image loading="lazy" alt="google" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg"></Image>
          <span>Sign Up with Google</span>
        </Button>
      </Form>
    </CardWrapper>
  )
}

export default SignupComponent;