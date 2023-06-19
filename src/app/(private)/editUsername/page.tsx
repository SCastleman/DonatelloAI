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
import PrivateLayout from "../layout"

export default function JobTitleChangeCard() {
    const [username, setUsername] = useState("")

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
                        Set your preferred username
                    </Heading>
                </Stack>
                <Box
                    rounded="lg"
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow="lg"
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="jobTitle">
                            <FormLabel>Job Title</FormLabel>
                            <Input
                                onChange={(e) => setUsername(e.target.value)}
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
                                onClick={() =>
                                    localStorage.setItem("username", username)
                                }
                            >
                                set username
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
