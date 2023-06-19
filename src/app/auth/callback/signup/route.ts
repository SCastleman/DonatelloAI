/* eslint-disable import/prefer-default-export */
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "lib/database.types"
// import { SupabaseClient, createClient } from "@supabase/supabase-js"

// const { env } = process

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (code) {
        const supabase = createRouteHandlerClient<Database>({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
        //    const token = res.data.session?.access_token
        //    const refreshToken = res.data.session?.refresh_token
        //    if (token) {
        //        const { sub, email }: { sub: string; email: string } = JSON.parse(
        //            Buffer.from(token.split(".")[1], "base64").toString()
        //        )
        //        const supabaseClient = createClient(
        //            process.env.NEXT_PUBLIC_SUPABASE_URL,
        //            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        //        )
        //        const sessionRes = await supabaseClient.auth.setSession({
        //            access_token: token,
        //            refresh_token: refreshToken || "",
        //        })
        //        console.log("data", sessionRes.data)
        //        console.log("error", sessionRes.error)
        //        const { error } = await supabaseClient
        //            .from("Users")
        //            .insert({ user_id: sub, email })
        //        console.log(error)
        //    }
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
}
