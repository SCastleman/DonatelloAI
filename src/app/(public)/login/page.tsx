"use client"

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useDisclosure,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import NextLink from "next/link"
import { AuthResponse } from "@supabase/supabase-js"

type SignInType = (email: string, password: string) => Promise<AuthResponse>
type LoginCardParams = { handleSignIn: SignInType }

export default function LoginCard({ params }: { params: LoginCardParams }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleSignIn } = params

    const {
        isOpen: isVisible,
        onOpen,
        onClose,
    } = useDisclosure({
        defaultIsOpen: false,
    })

    const router = useRouter()

    const login = (signInEmail: string, signInPassword: string) => {
        handleSignIn(signInEmail, signInPassword).then((res) => {
            if (res.error) onOpen()
            else router.push("/home")
        })
    }

    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                {isVisible && (
                    <Alert status="error">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Sorry, there was a problem signing you in. Check
                                your username and password, then try again.
                            </AlertDescription>
                        </Box>
                        <CloseButton
                            alignSelf="flex-start"
                            position="relative"
                            right={-1}
                            top={-1}
                            onClick={onClose}
                        />
                    </Alert>
                )}
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
                                onClick={() => login(email, password)}
                            >
                                Sign in
                            </Button>
                            <Stack>
                                <Text>
                                    Don&apos;t have an account?{" "}
                                    <NextLink href="/signup" passHref>
                                        <Text color="blue.400">Sign up</Text>
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
