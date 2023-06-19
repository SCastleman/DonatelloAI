"use client"

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"
import { redirect } from "next/navigation"
import { getCookie } from "cookies-next"
import NextLink from "next/link"

type SignInType = (email: string, password: string) => void

export default function LoginCard(props: { handleSignIn: SignInType }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleSignIn } = props

    const authCookie = getCookie("sb-mmfpwphgxlydoomyisvw-auth-token")
    if (authCookie) {
        redirect("/home")
    }

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                <Stack align="center">
                    <Heading fontSize="4xl">
                        Meet Donatello.ai - next level turtle generation
                    </Heading>
                </Stack>
                <Box
                    rounded="lg"
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow="lg"
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align="start"
                                justify="space-between"
                            />
                            <Button
                                bg="blue.400"
                                color="white"
                                _hover={{
                                    bg: "blue.500",
                                }}
                                onClick={() => handleSignIn(email, password)}
                            >
                                Sign in
                            </Button>
                            <Stack>
                                <Text>
                                    Don&apos;t have an account?{" "}
                                    <NextLink href="/signup" passHref>
                                        <Link color="blue.400">Sign up</Link>
                                    </NextLink>
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
