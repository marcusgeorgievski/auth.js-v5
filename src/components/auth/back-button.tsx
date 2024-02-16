"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
    // children: React.ReactNode;
    href: string
    label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
    return (
        <Button variant="link" className="w-full text-center" size="sm" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    )
}
