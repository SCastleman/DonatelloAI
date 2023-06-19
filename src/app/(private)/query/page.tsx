"use client"

import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client"
import { gql } from "graphql-tag"

export default function QueryCard() {
    const ANIME = gql`
        query ANIME {
            Page {
                media {
                    title {
                        english
                    }
                    averageScore
                    episodes
                }
            }
        }
    `
    const { loading, error, data } = useQuery(ANIME)
    console.log(loading, error, data)
    return <h1>Query page</h1>
}
