/* eslint-disable jsx-a11y/anchor-is-valid */

"use client"

import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react"
import { getCookies } from "cookies-next"
import NextLink from "next/link"
import { redirect } from "next/navigation"

type LinkList = ["Home", "Change Username", "Change Job Title", "Anime List"]
const Links: LinkList = [
    "Home",
    "Change Username",
    "Change Job Title",
    "Anime List",
]
const linkHrefs = {
    Home: "home",
    "Change Username": "editUsername",
    "Change Job Title": "editJobTitle",
    "Anime List": "query",
}

// const supabase = createClientComponentClient<Database>()
export default function PrivateLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // const router = useRouter()

    // const handleSignOut = async () => {
    //    await supabase.auth.signOut()
    //    router.push("/")
    // }
    const bg = useColorModeValue("gray.200", "gray.700")
    const authCookie = getCookies()
    if (!authCookie) redirect("/login")
    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <HStack spacing="auto" alignItems="center">
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
                                    <Text
                                        px={2}
                                        py={1}
                                        rounded="md"
                                        _hover={{
                                            textDecoration: "none",
                                            bg,
                                        }}
                                    >
                                        {link}
                                    </Text>
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
