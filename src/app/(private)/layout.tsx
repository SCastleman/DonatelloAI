/* eslint-disable jsx-a11y/anchor-is-valid */

"use client"

import { Box, Flex, HStack, Link, useColorModeValue } from "@chakra-ui/react"
import NextLink from "next/link"

type LinkList = ["Home", "Change Username", "Change Job Title", "Query"]
const Links: LinkList = ["Home", "Change Username", "Change Job Title", "Query"]
const linkHrefs = {
    Home: "home",
    "Change Username": "editUsername",
    "Change Job Title": "editJobTitle",
    Query: "query",
}

export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const bg = useColorModeValue("gray.200", "gray.700")
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <HStack spacing={8} alignItems="center">
                        <HStack
                            as="nav"
                            spacing={4}
                            display={{ base: "none", md: "flex" }}
                        >
                            {Links.map((link) => (
                                <NextLink
                                    href={linkHrefs[link]}
                                    passHref
                                    key={link}
                                >
                                    <Link
                                        px={2}
                                        py={1}
                                        rounded="md"
                                        _hover={{
                                            textDecoration: "none",
                                            bg,
                                        }}
                                    >
                                        {link}
                                    </Link>
                                </NextLink>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>
            </Box>

            {children}
        </>
    )
}
