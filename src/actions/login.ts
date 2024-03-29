"use server"

// import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"
import { LoginSchema } from "@/schemas"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export async function login(values: z.infer<typeof LoginSchema>) {
    const validated = LoginSchema.safeParse(values)

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    const { email, password } = validated.data

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid credentials!",
                    }
                default:
                    return {
                        error: "Something went wrong!",
                    }
            }
        }

        throw error
    }
}
