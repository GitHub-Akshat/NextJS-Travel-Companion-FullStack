"use client";

import { useForm } from "react-hook-form";
import CardWrapper from "./cardWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/authSchema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import { useState } from "react";

const LoginComponent = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:""
    }
  });
  const onSubmit = ( data: z.infer<typeof LoginSchema> ) =>{
    setLoading(true);
    console.log(data);
  }

  const { pending } = useFormStatus();
  
  return (
    <CardWrapper
      label="Login to your account"
      title="Sign In"
      backButtonHref="/signup"
      backButtonLabel=" Don't have an account? Create One Here "
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <div className="space-y-3 mb-2">
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
          <Button type="submit" className="w-full" disabled={pending}>
            {loading ? "Loading..." : " Sign In"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginComponent;
