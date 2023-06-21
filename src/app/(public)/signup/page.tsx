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
    useColorModeValue,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    useDisclosure,
    CloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import NextLink from "next/link"
import { AuthResponse } from "@supabase/supabase-js"

type SignUpType = (email: string, password: string) => Promise<AuthResponse>
type SignUpCardParams = { handleSignUp: SignUpType }
type ErrorObject = { email?: string; password?: string }

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function SignupCard({ params }: { params: SignUpCardParams }) {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errors, setErrors] = useState<ErrorObject>({})
    const { handleSignUp } = params

    const {
        isOpen: successIsVisible,
        onOpen,
        onClose,
    } = useDisclosure({
        defaultIsOpen: false,
    })

    const validatePassword = (pw: string) => {
        if (pw.length < 6) {
            setErrors({
                ...errors,
                password: "Password must be a minimum 6 characters",
            })
        } else {
            setErrors({ ...errors, password: "" })
        }
        setPassword(pw)
    }

    const validateEmail = (em: string) => {
        const isValidEmail = emailRegex.test(em)
        if (!isValidEmail) setErrors({ ...errors, email: "Invalid email" })
        else setErrors({ ...errors, email: "" })
        setEmail(em)
    }

    const signUp = (signUpEmail: string, signUpPassword: string) => {
        handleSignUp(signUpEmail, signUpPassword).then((res) => {
            if (!res.error) onOpen()
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
                {successIsVisible && (
                    <Alert status="success">
                        <AlertIcon />
                        <Box>
                            <AlertTitle>Success!</AlertTitle>
                            <AlertDescription>
                                Your request was received! Check your email to
                                finalise the sign up process.
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
                        New around here? We&apos;re happy to have you.
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
                                onChange={(e) => validateEmail(e.target.value)}
                                isInvalid={!!errors.email}
                            />
                            {errors.email && (
                                <Text color="red.300">{errors.email}</Text>
                            )}
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                isInvalid={!!errors.password}
                                onChange={(e) =>
                                    validatePassword(e.target.value)
                                }
                            />
                            {errors.password && (
                                <Text color="red.300">{errors.password}</Text>
                            )}
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
                                onClick={() => signUp(email, password)}
                                isDisabled={
                                    !email ||
                                    !password ||
                                    !!errors.email ||
                                    !!errors.password
                                }
                            >
                                Sign Up
                            </Button>
                            <Stack>
                                <Text>
                                    Already have an account?{" "}
                                    <NextLink href="/login" passHref>
                                        <Text color="blue.400">Log in</Text>
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
