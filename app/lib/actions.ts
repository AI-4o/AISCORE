"use server";
import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { User } from "./definitions";
import { z } from "zod";
import { sql } from "@vercel/postgres";

export type DBResult<A> = {
  success: boolean;
  values?: any; // TODO: successivo refactoring si rende di tipo A | A[] | null
  errors?: Partial<TransformToStringArray<A>>;
  errorsMessage?: string;
};

// Utility type to transform properties into string[]
export type TransformToStringArray<T> = {
  [K in keyof T]: string[];
};
export type State<A> = {
  message?: string;
  values?: Partial<A>;
  errors?: Partial<TransformToStringArray<A>>;
  dbError?: string;
};

/** AUTHENTICATION */
export async function authenticate(
  formData: FormData
) {
  try {
    //console.log(prevState);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function _signOut() {
  await signOut();
}

export async function createUser(
  //prevState: State<{ name?: string[]; email?: string[]; password?: string[] }>,
  formData: FormData
) {
  const parsedData = z
    .object({
      name: z.string({ invalid_type_error: "Please enter a username" }).min(4, {
        message: "The username should be at least 4 characters long",
      }),
      email: z
        .string({ invalid_type_error: "Please entre an email" })
        .email({ message: "Please enter an email" }),
      password: z
        .string({ invalid_type_error: "Please enter a password" })
        .min(6, {
          message: "The password should be at least 6 characters long",
        }),
    })
    .safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

  if (!parsedData.success) {
    return {
      //...prevState,
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
}

export async function getUser(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
