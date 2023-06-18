"use client"

import { ChakraProvider } from "@chakra-ui/react"
import LoginScreen from "./LoginScreen"

function Main() {
    return (
        <ChakraProvider>
            <main>
                <LoginScreen />
            </main>
        </ChakraProvider>
    )
}

export default Main
