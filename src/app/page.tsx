"use client"

import { redirect } from "next/navigation"
import { getCookies } from "cookies-next"

export default async function Main() {
    const authCookie = getCookies()
    if (Object.keys(authCookie).length === 0) {
        redirect("/login")
    } else {
        redirect("/home")
    }

    // if (userLoggedIn) return
    // do something
    // redirect("/login")
}
