"use client"

import { getCookies } from "cookies-next"

import { Flex, Stack, Heading, Text, useColorModeValue } from "@chakra-ui/react"

export default function HomePage() {
    const jobTitle = localStorage.getItem("jobTitle")
    const username = localStorage.getItem("username")
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                <Stack align="left">
                    <Heading fontSize="2xl">Your current job title:</Heading>
                    <Text>{jobTitle || "None set!"}</Text>
                </Stack>
                <Stack align="left">
                    <Heading fontSize="2xl">Your current username:</Heading>
                    <Text>{username || "None set!"}</Text>
                </Stack>
            </Stack>
        </Flex>
    )
}
