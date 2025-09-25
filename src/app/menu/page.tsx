"use client"

import { useEffect, useState } from "react";
import Episodios from "../episodios/page";
import Favoritos from "../favoritos/page";
import {Episode} from "../interfaces";
import {NewEpisode} from "../interfaces";
import { Toaster } from "@/components/ui/sonner"
import Form from "../form/page";

export default function Menu() {

    const [episodes, setEpisodes] = useState<Episode[]>([])
    const [favorites, setFavorites] = useState<Episode[]>([])

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch("https://rickandmortyapi.com/api/episode")
            const data = await response.json()
            const episodios: Episode[] = data.results
            setEpisodes(episodios)
        }
        fetchData();

    }, []);

    const addFavorito = (id : number) => {
        const fav = episodes?.find(item => item.id === id)
        if (fav) {
            setFavorites([...favorites, fav])
        }
    }

    const deleteFavorito = (id : number) => {
        setFavorites(favorites.filter(item => item.id !== id))
    }

    const addEpisode = (episode : NewEpisode) => {
        const ch_ids = episode.character_ids
        const path = "https://rickandmortyapi.com/api/character/"
        const newEpisode : Episode = {
        ...episode,
        id: episodes.length + 1,
        characters: [
            path + ch_ids[0],
            path + ch_ids[1],
            path + ch_ids[2],
            path + ch_ids[3],
            path + ch_ids[4],
        ]
    };
        setEpisodes([...episodes,newEpisode])
    }

    return (
        <div className="grid grid-cols-2">
            <div className="bg-red-50">
                <Episodios episodes={episodes} addFavorito={addFavorito} ></Episodios>
            </div>

            <div className="flex-col">
                <div className="bg-blue-50">
                    <Favoritos episodes={favorites} deleteFavorito={deleteFavorito}></Favoritos>
                </div>

                <div className="bg-purple-100">
                    <Form addEpisode={addEpisode}></Form>
                </div>

            </div>
            <Toaster />
        </div>
        
    );
}