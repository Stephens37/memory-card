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
            if (checkDupName === curArr[i].key) {
                const newName = pokemonArr[getRandomInt(pokemonArr.length)]
                return checkDuplicates(newName, thesePokeArr)
            } else if (i === (curArr.length - 1) && checkDupName !== curArr[i]) {
                return checkDupName
            }
        }
        return checkDupName
    }

    function checkInputName(inputedName) {
            if (thesePokeArr.length === 0) {
                thesePokeArr.push({name: inputedName, key: inputedName})
                return {thesePokeArr, inputedName}
            } else {
                    inputedName = checkDuplicates(inputedName, thesePokeArr)
                    if (thesePokeArr.length === 7) {
                        thesePokeArr = []
                        return {thesePokeArr, inputedName}
                    } else if (thesePokeArr.length < 7) {
                        thesePokeArr.push({name: inputedName, key: inputedName})
                        return {thesePokeArr, inputedName}
                    }
                }
            }

    const [pokemonClickedArr, setPokemonClickedArr] = useState([])
    const [scoreInc, setScoreInc] = useState(-1)
    const [highScore, setHighScore] = useState(0)

    function scoreKeeping (scoreName) {
        console.log(scoreName)
        console.log(scoreInc)
        if (pokemonClickedArr.length === 0 && highScore === 0 && scoreInc === -1) {
            console.log('a')
            console.log(scoreInc)
            setScoreInc((scoreInc) => scoreInc + 1)
            return
        } else if (scoreName !== undefined) {
            console.log('b')
            setPokemonClickedArr([scoreName.key])
            setScoreInc(1)
            return
        } else {
            for (let i = 0; i < pokemonClickedArr.length; i++) {
                console.log('c')
                if (pokemonClickedArr[i].key === scoreName.key) {
                    console.log('d')
                    if (highScore < scoreInc) {
                        console.log('e')
                        setHighScore(scoreInc)
                        return
                    } setPokemonClickedArr([])
                    setScoreInc(0)
                    return
                } else if (pokemonClickedArr[i].key !== scoreName.key && i === pokemonClickedArr.length && scoreInc < 20) {
                    console.log('f')
                    setPokemonClickedArr((pokemonClickedArr) => [...pokemonClickedArr, scoreName.key])
                    setScoreInc((scoreInc) => scoreInc + 1)
                    return
                } else if (pokemonClickedArr[i] !== scoreName.key && i === pokemonClickedArr.length && scoreInc === 20) {
                    console.log('g')
                    alert('You Win!')
                }
            }
        }
    }

    function deckSet (clickedElement = undefined) {
        console.log(scoreInc)
        console.log(clickedElement)
        console.log(scoreInc)
        scoreKeeping(clickedElement)
        console.log(scoreInc)
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            const thisCardName = checkInputName(randomName).inputedName
            return <Card pokeName={thisCardName} onClick={() => deckSet(thisCardName)} key={thisCardName}></Card>
    })
    setCards(newSet)
    }
    useEffect(() => {
        console.log('hi')
        deckSet()
    }, [])
    useEffect(() => {
        console.log('Updated scoreInc:', scoreInc)
    }, [scoreInc])
    
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
