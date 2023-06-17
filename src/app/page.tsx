"use client"

import { ChakraProvider, Heading } from "@chakra-ui/react"
import styles from "./page.module.css"

export default function Home() {
    return (
        <ChakraProvider>
            <main className={styles.main}>
                <Heading as="h1">Hello world!</Heading>
            </main>
        </ChakraProvider>
    )
}
