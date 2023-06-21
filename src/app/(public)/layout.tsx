"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "lib/database.types"
import { usePathname } from "next/navigation"
import { AuthResponse } from "@supabase/supabase-js"
import LoginScreen from "./login/page"
import SignupCard from "./signup/page"

const supabase = createClientComponentClient<Database>()

// const handleSignOut = async () => {
// await supabase.auth.signOut()
// router.refresh()
// }

export default function AuthWrapper() {
    const pathName = usePathname()

    const handleSignUp = async (
        email: string,
        password: string
    ): Promise<AuthResponse> =>
        supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback/signup`,
            },
        })

    const handleSignIn = async (
        email: string,
        password: string
    ): Promise<AuthResponse> =>
        supabase.auth.signInWithPassword({
            email,
            password,
        })

    if (pathName === "/login") return <LoginScreen params={{ handleSignIn }} />
    return <SignupCard params={{ handleSignUp }} />
}
