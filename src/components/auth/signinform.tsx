"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/authSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import Image from "next/image";

const LoginComponent = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });

  const onSubmit = async ( data: z.infer<typeof LoginSchema> ) =>{
    setLoading(true);
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect:false
      });
      if(response?.error)
      {
        toast.error("Login failed. Please try again.");
      }
      else{
        router.refresh();
        toast.success("Login successful!", { duration: 7000 });
        router.push("/home");
      }
    } 
    finally {
      setLoading(false);
    }
  }

  const loginwithgoogle = () =>{
    signIn('google', { callbackUrl:'http://localhost:3000/home' })
  }
  
  return (
    <CardWrapper
      label="Login to your account"
      title="Sign In"
      backButtonHref="/signup"
      backButtonLabel=" Don't have an account? Create One Here "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="space-y-2 mb-2">
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
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Loading..." : " Sign In"}
          </Button>
        </form>
        <div className="mx-auto my-0.5 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
          or
        </div>
        <Button disabled={loading} onClick={loginwithgoogle} className="w-full bg-white text-black border border-gray-300 rounded-md py-2 px-4 transition duration-200 ease-in-out hover:bg-slate-100">
          <Image loading="lazy" alt="google" height="24" width="24" id="provider-logo" src="https://authjs.dev/img/providers/google.svg"></Image>
          <span>Sign in with Google</span>
        </Button>
      </Form>
    </CardWrapper>
  )
}

export default LoginComponent;
