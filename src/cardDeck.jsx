import './cardDeck.css'
import Card from './card.jsx'
import { useEffect, useState } from 'react'

export default function CardDeck () {
    const [thesePokeArr, setThesePokeArr] = useState([])

    const pokemonArr = ['pikachu', 'squirtle', 'bulbasaur', 'charmander', 'pidgey', 'mudkip', 'quilava','cyndaquil', 'chikorita', 'totodile', 'ditto', 'mew', 'arceus', 'ho-oh', 'suicune', 'reshiram', 'zekrom', 'raichu', 'pichu', 'magikarp', 'gyarados', 'cubone']
    const [cards, setCards] = useState(Array(8).fill(''))

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function checkDuplicates(checkDupName, curArr) {
        for (let i = 0; i < curArr.length; i++) {
            let j = 0
            j++
            console.log(j)
            if (checkDupName === curArr[i].key) {
                const newName = pokemonArr[getRandomInt(pokemonArr.length)]
                checkDuplicates(newName, thesePokeArr)
            }
        }
        return checkDupName
    }

    function checkInputName(inputedName) {
            if (thesePokeArr.length === 0) {
                thesePokeArr.push({name: inputedName, key: inputedName})
                return inputedName
            } else {
                    inputedName = checkDuplicates(inputedName, thesePokeArr)
                    if (thesePokeArr.length === 8) {
                        setThesePokeArr([])
                        return inputedName
                    } else if (thesePokeArr.length < 8) {
                        thesePokeArr.push({name: inputedName, key: inputedName})
                        return inputedName
                    }
                }
            }
    function deckSet () {
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            const thisCardName = checkInputName(randomName)
            
            return <Card pokeName={thisCardName} onClick={deckSet} key={thisCardName}></Card>
    })
    setCards(newSet)
    }   
    useEffect(() => {
        console.log('hi')
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
