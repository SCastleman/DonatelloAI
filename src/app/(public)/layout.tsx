"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "lib/database.types"
import { redirect, usePathname, useRouter } from "next/navigation"
import LoginScreen from "./login/page"
import SignupCard from "./signup/page"

const supabase = createClientComponentClient<Database>()

// const handleSignOut = async () => {
// await supabase.auth.signOut()
// router.refresh()
// }

export default function AuthWrapper() {
    const router = useRouter()
    const pathName = usePathname()

    const handleSignUp = async (email: string, password: string) => {
        await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback/signup`,
            },
        })
        router.refresh()
    }

    const handleSignIn = async (email: string, password: string) => {
        console.log("signing in!")
        await supabase.auth.signInWithPassword({
            email,
            password,
        })
        redirect("/")
    }

    if (pathName === "/login")
        return <LoginScreen handleSignIn={handleSignIn} />
    return <SignupCard handleSignUp={handleSignUp} />
}
