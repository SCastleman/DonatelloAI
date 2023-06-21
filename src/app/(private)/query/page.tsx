/* eslint-disable react/function-component-definition */

"use client"

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client"
import { gql } from "graphql-tag"
import {
    Box,
    Heading,
    Image,
    Text,
    HStack,
    Tag,
    SpaceProps,
    useColorModeValue,
    Container,
    Stack,
    Skeleton,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import parse from "html-react-parser"

type Media = {
    id: string
    averageScore: number
    episodes: number
    title: { english: string; romaji: string }
    genres: string[]
    description: string
    coverImage: { large: string }
}

type MediaList = [Media] | []
interface ITags {
    tags: Array<string>
    marginTop?: SpaceProps["marginTop"]
}

const Tags: React.FC<ITags> = ({ marginTop, tags }) => (
    <HStack spacing={2} marginTop={marginTop}>
        {tags.map((tag) => (
            <Tag size="md" variant="solid" colorScheme="orange" key={tag}>
                {tag}
            </Tag>
        ))}
    </HStack>
)

const ANIME = gql`
    query ANIME {
        Page {
            media(averageScore_greater: 90) {
                id
                title {
                    english
                    romaji
                }
                averageScore
                episodes
                genres
                description
                coverImage {
                    large
                }
            }
        }
    }
`
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "https://graphql.anilist.co",
        fetchOptions: {
            method: "POST",
        },
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
    }),
})

export default function QueryCard() {
    const [mediaList, setMediaList] = useState<MediaList>([])
    useEffect(() => {
        client.query({ query: ANIME }).then((res) => {
            setMediaList(res.data.Page.media)
        })
    }, [])

    const orangeColour = useColorModeValue(
        "radial(orange.600 1px, transparent 1px)",
        "radial(orange.300 1px, transparent 1px)"
    )

    const greyColour = useColorModeValue("gray.700", "gray.200")

    return (
        <Container maxW="7xl" p="12">
            <Heading as="h1">
                Looking for new anime? Here are the top scoring on anilist.co.
            </Heading>
            {mediaList.length === 0 ? (
                <Stack>
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                    <Skeleton height="20px" />
                </Stack>
            ) : (
                mediaList.map((med) => (
                    <Box
                        marginTop={{ base: "1", sm: "5" }}
                        display="flex"
                        flexDirection={{ base: "column", sm: "row" }}
                        justifyContent="space-between"
                        key={med.id}
                    >
                        <Box
                            display="flex"
                            flex="1"
                            marginRight="3"
                            position="relative"
                            alignItems="center"
                        >
                            <Box
                                width={{ base: "100%", sm: "85%" }}
                                zIndex="2"
                                marginLeft={{ base: "0", sm: "5%" }}
                                marginTop="5%"
                            >
                                <Image
                                    borderRadius="lg"
                                    src={med.coverImage.large}
                                    alt="anime thumbnail"
                                    objectFit="contain"
                                />
                            </Box>
                            <Box
                                zIndex="1"
                                width="100%"
                                position="absolute"
                                height="100%"
                            >
                                <Box
                                    bgGradient={orangeColour}
                                    backgroundSize="20px 20px"
                                    opacity="0.4"
                                    height="100%"
                                />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            flex="1"
                            flexDirection="column"
                            justifyContent="center"
                            marginTop={{ base: "3", sm: "0" }}
                        >
                            <Heading marginTop="1" marginBottom="2">
                                <Text
                                    as="p"
                                    marginTop="2"
                                    color={greyColour}
                                    fontSize="2xl"
                                >
                                    {med.title.english || med.title.romaji}
                                </Text>
                            </Heading>
                            <Tags tags={med.genres} />
                            <Heading marginTop="1" />
                            <Text
                                as="p"
                                marginTop="2"
                                color={greyColour}
                                fontSize="lg"
                            >
                                {parse(med.description)}
                            </Text>
                        </Box>
                    </Box>
                ))
            )}
        </Container>
    )
}
