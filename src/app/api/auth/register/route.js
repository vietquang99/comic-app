import { NextResponse } from "next/server";

// In a real application, you would store users in a database
// This is a simplified example for demonstration purposes
const users = [];

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // In a real application, you would hash the password here
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      // password: hashedPassword,
      password, // For demo purposes only
      createdAt: new Date().toISOString(),
    };

    // Store user (in a real app, you'd save to a database)
    users.push(newUser);

    // Return success response (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}