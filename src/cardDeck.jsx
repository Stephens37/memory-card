import './cardDeck.css'
import Header from './header.jsx'
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

    const [pokemonClickedArr, setPokemonClickedArr] = useState([])
    const [scoreInc, setScoreInc] = useState()
    const [highScore, setHighScore] = useState(0)

    function scoreKeeping (scoreName) {
        for (let i = 0; i < pokemonClickedArr.length; i++) {
            if (scoreName.key === undefined) {
                setScoreInc(0)
                return
            } else if (pokemonClickedArr.length === 0 && scoreInc === 0) {
                setPokemonClickedArr[scoreName.key]
                setScoreInc(1)
                return
            } else if (pokemonClickedArr[i].key === scoreName.key) {
                if (highScore < scoreInc) {
                    setHighScore(scoreInc)
                    return
                } setPokemonClickedArr([])
                setScoreInc(0)
                return
            } else if (pokemonClickedArr[i].key !== scoreName.key && i === pokemonClickedArr.length && scoreInc < 20) {
                setPokemonClickedArr((pokemonClickedArr) => [...pokemonClickedArr, scoreName.key])
                setScoreInc((scoreInc) => scoreInc + 1)
                return
            } else if (pokemonClickedArr[i] !== scoreName.key && i === pokemonClickedArr.length && scoreInc === 20) {
                alert('You Win!')
            }
        }
    }

    function deckSet (clickedElement) {
        scoreKeeping(clickedElement)
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            console.log(thesePokeArr)
            const thisCardName = checkInputName(randomName).inputedName
            return <Card pokeName={thisCardName} onClick={() => deckSet(this)} key={thisCardName}></Card>
    })
    setCards(newSet)
    }
    useEffect(() => {
        console.log('hi')
        deckSet()
    }, [])
    
    return(
        <>
            <Header headCurScore={scoreInc} headHighScore={highScore}/>
            <div className='cardDeckGridChild'>
                <div className='cardDeckDisplay'>{cards}</div>
            </div>
        </>
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
