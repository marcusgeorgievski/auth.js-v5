import { auth } from "@/auth"

interface SettingsPageProps {
    //children: React.ReactNode;
}
export default async function SettingsPage() {
    const session = await auth()
    console.log(session)
    return <div>settings</div>
}
