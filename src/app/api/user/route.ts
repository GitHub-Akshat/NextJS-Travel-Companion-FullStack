import prisma from "@/lib/database";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignUpSchema } from "@/schema/authSchema";

export async function POST(req:Request){
    try {
        const body = await req.json();

        const parsed = SignUpSchema.safeParse(body);
        
        if (!parsed.success) {
            const validationErrors = parsed.error.errors.map(err => ({
                path: err.path,
                message: err.message
            }));
            return NextResponse.json({ 
                error: "Invalid input data", 
                details: validationErrors,
                success: false 
            }, { status: 400 });
        }

        const { fullname, email, password } = parsed.data;

        const emailExist = await prisma.user.findUnique({ where: { email: email } });
        if (emailExist) {
            return NextResponse.json({ user:null, message:"User with this email exist", error: "Email already exists", success:false }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const newUser = await prisma.user.create({
            data: {
                fullname,
                email,
                password: hashedPassword 
            }
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _ , ...userWithoutPassword } = newUser;
        return NextResponse.json({ message: "User created successfully", user: userWithoutPassword, success:true }, { status:201 });
    }
    catch (error) {
        console.error("Error in user registration:", error);
        return NextResponse.json({ error: "Failed to create user", success:false }, { status: 500 });
    }
}