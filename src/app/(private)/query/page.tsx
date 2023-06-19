"use client"

import { useQuery } from "@apollo/client"
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
    console.log("cause", error?.cause)
    return <h1>Query page</h1>
}
