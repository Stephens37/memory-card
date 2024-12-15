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
            const thesePokemon = []
            function checkDuplicates(inputedName, thisArr) {
                for (let i = 0; i < thisArr.length; i++) {
                    if (inputedName === thisArr[i]) {
                        checkDuplicates()
                    } else if (inputedName !== thisArr[i] && thisArr.length === 8) {
                        thesePokemon = []
                        console.log(inputedName)
                        return inputedName
                    } else if (inputedName !== thisArr[i] && thisArr.length < 8) {
                        thesePokemon.push(inputedName)
                        console.log(inputedName)
                        return inputedName
                    }
                }
            }
            console.log(checkDuplicates(randomName, thesePokemon))
            const thisCardName = checkDuplicates(randomName, thesePokemon)
            return <Card pokeName={thisCardName} onClick={deckSet} key={thisCardName}></Card>
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
