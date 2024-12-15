import './cardDeck.css'
import Card from './card.jsx'
import { useEffect, useState } from 'react'

export default function CardDeck () {
    const pokemonArr = ['pikachu', 'squirtle', 'bulbasaur', 'charmander', 'pidgey', 'mudkip', 'quilava','cyndaquil', 'chikorita', 'totodile', 'ditto', 'mew', 'arceus', 'ho-oh', 'suicune', 'reshiram', 'zekrom', 'raichu', 'pichu', 'magikarp', 'gyarados', 'cubone']
    const [cards, setCards] = useState(Array(8).fill(''))
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    function deckSet () {
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            console.log(pokemonArr[getRandomInt(pokemonArr.length)])
            //console.log(randomName)
            return <Card pokeName={randomName} onClick={deckSet} key={randomName}></Card>
    })
        setCards(newSet)
    }
    useEffect(() => {
        deckSet()
    }, [])
    return(
        <div className='cardDeckGridChild'>
            <div className='cardDeckDisplay'>{cards}</div>
        </div>
    )
}

/*
    create random number function
    create onClick function
    loops the pokemonArr 8 times when triggered
    each iteration will pull the card component and set its name to be pokemonArr.random
    card[i] (i being iteration) will have it's state set to the new card
    repeat
*/
