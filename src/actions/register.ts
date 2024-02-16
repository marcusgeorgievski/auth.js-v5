"use server"

import { z } from "zod"
import { RegisterSchema } from "@/schemas"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import { getUserByEmail } from "@/data/user"

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validated = RegisterSchema.safeParse(values)

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    const { name, email, password } = validated.data
    const hashedPassword = await bcrypt.hash(password, 10)

    // Confirm email is not taken
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
        return {
            error: "Email already in use!",
        }
    }

    // Create user
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    // TODO: Send email confirmation

    return {
        success: "User created!",
    }
}
