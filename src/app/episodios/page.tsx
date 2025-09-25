"use client"

import Image from "next/image";
import Personaje from "../personaje/page";
import {Episode} from "../interfaces";
import { toast } from "sonner"

export default function Episodios({ episodes, addFavorito }: {
    episodes: Episode[] | null,
    addFavorito: (id : number) => void 
    }) {

    return (
        <div className="h-screen overflow-y-scroll">
            {
                episodes?.map((ep: Episode) => (
                    <div className="border border-white p-5" key={ep.id}>
                        <div className="flex justify-between">
                            <h1>{ep.name}</h1>
                            <h1>{ep.air_date}</h1>
                        </div>

                        <div className="flex">
                            {
                                ep.characters.slice(0, 5).map
                                    ((url: string) => (
                                        <Personaje url={url} key={url}></Personaje>
                                    ))
                            }
                        </div>

                        <div>
                            <button onClick={() => {addFavorito(ep.id); toast("Añadido a Favoritos")}}>
                                💗
                            </button>
                        </div>

                    </div>
                )

                )
            }
        </div>
    );
}