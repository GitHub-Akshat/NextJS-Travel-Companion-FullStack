import z from "zod";

export const SignUpSchema = z.
    object({
        fullname: z.string().min(2, { message:"Enter a valid Name" }),
        email: z.string().email({ message:"Please enter a valid email" }),
        password: z.string().min(6 , { message:"Password must be atleast 6 characters" } ),
        confirmPassword: z.string().min(6 , { message:"Password must be atleast 6 characters" } )
    })
    .refine((data)=> data.password === data.confirmPassword, { path: ['confirmPassword'], message:'Passwords do not match'})

export const LoginSchema = z.object({
    email: z.string().email({message: "Please enter a valid email address"}),
    password: z.string().min(6, { message: "Password must be at least 6 characters long"})
})