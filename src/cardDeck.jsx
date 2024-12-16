import './cardDeck.css'
import Card from './card.jsx'
import { useEffect, useState } from 'react'

export default function CardDeck () {
    let thesePokeArr = []

    const pokemonArr = ['pikachu', 'squirtle', 'bulbasaur', 'charmander', 'pidgey', 'mudkip', 'quilava','cyndaquil', 'chikorita', 'totodile', 'ditto', 'mew', 'arceus', 'ho-oh', 'suicune', 'reshiram', 'zekrom', 'raichu', 'pichu', 'magikarp', 'gyarados', 'cubone']
    const [cards, setCards] = useState(Array(8).fill(''))

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function checkDuplicates(inputedName, limitNum) {
        console.log(inputedName)
        console.log(limitNum)
        for (let i = 0; i < limitNum; i++) {
            console.log('d')
            console.log(thesePokeArr.length)
            if (thesePokeArr.length === 0) {
                thesePokeArr.push({name: inputedName, key: inputedName})
            } else {
                for (let i = 0; i < thesePokeArr.length; i++) {
                    console.log(thesePokeArr[i])
                    console.log('onetime')
                    const pokeIt = thesePokeArr[i].key
                    if (inputedName === pokeIt) {
                        console.log('hi')
                        console.log(inputedName)
                        console.log(JSON.stringify(thesePokeArr[i].key))
                        const newName = pokemonArr[getRandomInt(pokemonArr.length)]
                        checkDuplicates(newName, 8)
                    } 
                }
                    if (thesePokeArr.length === limitNum) {
                        console.log(inputedName)
                        thesePokeArr = []
                        console.log('hello')
                        return inputedName
                    } else if (thesePokeArr.length < limitNum) {
                        console.log(inputedName)
                        thesePokeArr.push({name: inputedName, key: inputedName})
                        console.log('yo')
                        return inputedName
                    }
                }
            }
            return inputedName
        }
    function deckSet () {
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            const thisCardName = checkDuplicates(randomName, 8)
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
