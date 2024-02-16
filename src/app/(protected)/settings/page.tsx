import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"

interface SettingsPageProps {
    //children: React.ReactNode;
}
export default async function SettingsPage() {
    const session = await auth()
    // console.log(session)
    return (
        <pre className="whitespace-prewrap">
            <form
                action={async () => {
                    "use server"
                    await signOut()
                }}
            >
                <Button type="submit">Sign Out</Button>
            </form>
            {JSON.stringify(session)}
        </pre>
    )
}
