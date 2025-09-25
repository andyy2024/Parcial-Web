"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {Character} from "../interfaces";

export default function Personaje({ url }: { url: string }) {
    const [character, setCharacter] = useState<Character | null>(null);

    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(url);
            const personaje: Character = await response.json();
            setCharacter(personaje);
        };

        fetchData();
    }, [url]);

    return (
        <div>
            {character ? (
                <div className="flex-col p-5">
                    <Image
                        src={character.image}
                        alt={character.name}
                        width={100}
                        height={100}
                        className="rounded-full object-cover"
                    />
                    <h2 className="text-md font-bold text-center">{character.name}</h2>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}