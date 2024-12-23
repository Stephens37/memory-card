import './cardDeck.css'
import Header from './header.jsx'
import Card from './card.jsx'
import { useEffect, useState, useRef } from 'react'

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

    const pokeArrRef = useRef(pokemonClickedArr)
    const scoreIncRef = useRef(scoreInc)
    const highScoreRef = useRef(highScore)

    useEffect (() => {
        pokeArrRef.current = pokemonClickedArr
    }, [pokemonClickedArr])

    useEffect(() => {
        scoreIncRef.current = scoreInc
    }, [scoreInc])

    useEffect (() => {
        highScoreRef.current = highScore
    }, [highScore])

    function scoreKeeping (scoreName) {
        console.log(scoreName)
        console.log(pokemonClickedArr)
        let curScoreInc = scoreIncRef.current
        let curPokeArr = pokeArrRef.current
        let curHighScore = highScoreRef.current
        console.log(curScoreInc)
        if (curPokeArr.length === 0 && highScore === 0 && curScoreInc === -1) {
            console.log('a')
            setScoreInc((curScoreInc) => curScoreInc + 1)
            console.log(curScoreInc)
            return
        } else if (curPokeArr.length === 0 && curScoreInc === 0 && scoreName !== undefined) {
            console.log('b')
            setPokemonClickedArr([scoreName])
            setScoreInc((curScoreInc) => curScoreInc + 1)
            console.log(scoreInc)
            return
        } else {
            console.log(curPokeArr)
            for (let i = 0; i < curPokeArr.length; i++) {
                console.log('c')
                console.log(curPokeArr[i])
                console.log(scoreName)
                if (curPokeArr[i] === scoreName) {
                    console.log('d')
                    if (curHighScore < curScoreInc) {
                        console.log('e')
                        setHighScore(curScoreInc)
                    } setPokemonClickedArr([])
                    setScoreInc((curScoreInc) => curScoreInc - curScoreInc)
                    console.log(curPokeArr)
                    console.log(curScoreInc)
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && scoreInc < 21) {
                    console.log('f')
                    setPokemonClickedArr((curPokeArr) => [...curPokeArr, scoreName])
                    setScoreInc((curScoreInc) => curScoreInc + 1)
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && scoreInc === 21) {
                    console.log('g')
                    alert('You Win!')
                    setHighScore(curScoreInc)
                    setPokemonClickedArr([])
                    setScoreInc((curScoreInc) => curScoreInc - curScoreInc)
                }
            }
        }
    }

    const [clickDeckArr, setClickDeckArr] = useState([])
    const clickDeckRef = useRef(clickDeckArr)

    useEffect (() => {
        clickDeckRef.current = clickDeckArr
    }, [clickDeckArr])


    function deckSet (clickedElement = undefined) {
        let clickDeckCur = clickDeckRef.current
        let pokeArrCur = pokeArrRef.current
        scoreKeeping(clickedElement)
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            const thisCardName = checkInputName(randomName).inputedName
            return <Card pokeName={thisCardName} onClick={() => deckSet(thisCardName)} key={thisCardName}></Card>
    })
    /*
        - within the deckSet function after orgSet
        - create const checkIfClicked with an arrow function inside
        - function starts with a loop which checks over all elements in pokemonArrRef
        - inside of that loop, a new loop starts which checks over all elements in deckArr
        - if two elements in each arr are the same, add them to clickDeckArr
        - if clickDeckArr.length = 8 then run deckSet again
        - else return deckArr
        - setCards will then take checkIfClicked as a parameter
    */

    const checkIfClicked = () => {
        console.log(pokeArrCur)
        if(pokeArrCur.length === 0) {
            return newSet
        } else {
            for(let i = 0; i < pokeArrCur.length; i++) {
                for(let j = 0; j < newSet.length; j++) {
                    console.log(clickDeckCur)
                    if (pokeArrCur[i] === newSet[j].key) {
                        console.log('dd')
                        console.log(newSet[j].key)
                        setClickDeckArr((clickDeckCur) => [...clickDeckCur, newSet[j].key])
                        console.log(clickDeckCur)
                    } else if (clickDeckCur.length === 8) {
                        console.log('ee')
                        console.log(clickDeckCur)
                        return deckSet(undefined)
                    } else if (clickDeckCur.length < 8 && i === pokeArrCur.length - 1) {
                        console.log('ff')
                        console.log(clickDeckCur)
                        setClickDeckArr([])
                        return newSet
                    }
                }
            }
        }
    }
    setCards(checkIfClicked)
    }
    useEffect(() => {
        deckSet(undefined)
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
