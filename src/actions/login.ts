"use server"

// import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"
import { LoginSchema } from "@/schemas"

export async function login(values: z.infer<typeof LoginSchema>) {
    const validated = LoginSchema.safeParse(values)

    if (!validated.success) {
        return {
            error: "Invalid fields!",
        }
    }

    return {
        success: "Confirmation email sent!",
    }
}
