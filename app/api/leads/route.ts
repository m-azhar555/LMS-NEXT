import { NextResponse } from "next/server";
import { leadSchema } from "../../../lib/validations/lead";

// Yeh function POST requests handle karega
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Zod se validation check karein (Backend Security)
    const validation = leadSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid data", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // 2. Filhaal hum database nahi connect kar rahe, 
    // toh hum sirf console par data print karenge.
    console.log("New Lead Received at API:", validation.data);

    // 3. Success Response bhejein
    return NextResponse.json(
      { message: "Lead captured successfully!", data: validation.data },
      { status: 201 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}