"use server"

import { z } from "zod"
import { RegisterSchema } from "@/schemas"

export async function register(values: z.infer<typeof RegisterSchema>) {
    const validated = RegisterSchema.safeParse(values)

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    return {
        success: "Confirmation email sent!",
    }
}
