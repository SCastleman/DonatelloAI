"use client"

import { ChakraProvider } from "@chakra-ui/react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

const inter = Inter({ subsets: ["latin"] })

const client = new ApolloClient({
    uri: "api/query",
    cache: new InMemoryCache(),
})

export default function ClientProvider({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ApolloProvider client={client}>
                    <ChakraProvider>
                        <main>{children}</main>
                    </ChakraProvider>
                </ApolloProvider>
            </body>
        </html>
    )
}
