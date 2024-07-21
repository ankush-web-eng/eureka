import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient()

export async function POST(req : NextRequest){
    try {
        const reqBody = await req.json();
        const {email} = reqBody;

        const isUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (isUser){
            return NextResponse.json({message: "User already exists"}, {status: 200})
        }

        const user = await db.user.create({
            data: {
                email
            }
        })

        if (!user){
            return NextResponse.json({message: "User not created"}, {status: 400})
        }
        return NextResponse.json({message: "User created successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
}