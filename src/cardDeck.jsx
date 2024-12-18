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

    function checkDuplicates(checkDupName, curArr) {
        for (let i = 0; i < curArr.length; i++) {
            console.log(i)
            console.log(checkDupName)
            if (checkDupName === curArr[i].key) {
                console.log(checkDupName)
                console.log(curArr[i].key)
                const newName = pokemonArr[getRandomInt(pokemonArr.length)]
                console.log(newName)
                return checkDuplicates(newName, thesePokeArr)
            } else if (i === (curArr.length - 1) && checkDupName !== curArr[i]) {
                console.log(checkDupName)
                return checkDupName
            }
        }
        console.log(checkDupName)
        return checkDupName
    }

    function checkInputName(inputedName) {
            if (thesePokeArr.length === 0) {
                thesePokeArr.push({name: inputedName, key: inputedName})
                console.log(thesePokeArr)
                return {thesePokeArr, inputedName}
            } else {
                    inputedName = checkDuplicates(inputedName, thesePokeArr)
                    console.log(inputedName)
                    if (thesePokeArr.length === 7) {
                        thesePokeArr = []
                        console.log(thesePokeArr)
                        return {thesePokeArr, inputedName}
                    } else if (thesePokeArr.length < 7) {
                        console.log(thesePokeArr)
                        thesePokeArr.push({name: inputedName, key: inputedName})
                        return {thesePokeArr, inputedName}
                    }
                }
            }
    function deckSet () {
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            console.log(thesePokeArr)
            const thisCardName = checkInputName(randomName).inputedName
            
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
