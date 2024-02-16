"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import LoginButton from "@/components/auth/login-button"

export default function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center">
            <div className="space-y-6 text-center">
                <h1 className="text-4xl font-bold">🔑 Auth.js v5</h1>
                <p className="mt-4 text-lg">
                    A simple, flexible, and powerful authentication library for
                    JavaScript.
                </p>
                <div className="mt-8">
                    <LoginButton>
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}
