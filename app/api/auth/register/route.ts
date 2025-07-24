import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: 'Please enter all fields' }, { status: 400 });
    }

    const userExistsByEmail = await User.findOne({ email });
    if (userExistsByEmail) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    const userExistsByUsername = await User.findOne({ username });
    if (userExistsByUsername) {
      return NextResponse.json({ message: 'User with this username already exists' }, { status: 400 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User registered successfully', user: user.username }, { status: 201 });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Registration error:", error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
