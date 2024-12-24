import './cardDeck.css'
import Header from './header.jsx'
import Card from './card.jsx'
import { useEffect, useState, useRef } from 'react'

export default function CardDeck () {
    let thesePokeArr = []

    const pokemonArr = ['pikachu', 'squirtle', 'bulbasaur', 'charmander', 'pidgey', 'mudkip', 'quilava','cyndaquil', 'chikorita', 'totodile', 'ditto', 'mew', 'arceus', 'ho-oh', 'suicune', 'reshiram', 'zekrom', 'pichu', 'magikarp', 'gyarados', 'cubone']
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
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && scoreInc < 21) {
                    console.log('f')
                    setPokemonClickedArr((curPokeArr) => [...curPokeArr, scoreName])
                    setScoreInc((curScoreInc) => curScoreInc + 1)
                    console.log(curPokeArr)
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && scoreInc === 21) {
                    console.log('g')
                    console.log('You Win!')
                    setHighScore(curScoreInc)
                    setPokemonClickedArr([])
                    setScoreInc((curScoreInc) => curScoreInc - curScoreInc)
                }
            }
        }
    }

    function deckSet (clickedElement = undefined) {
        scoreKeeping(clickedElement)
        let pokeArrCur = pokeArrRef.current
        const newSet = cards.map(() => {
            const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
            const thisCardName = checkInputName(randomName).inputedName
            return <Card pokeName={thisCardName} onClick={() => deckSet(thisCardName)} key={thisCardName}></Card>
    })

    /*
        - occasional scoreName showing as undefined, presumable after deckSet triggers again
        - score (might) still be skipping from 20 to 22, no high score/reset,
        possible from presentPokeArr loop having one more iteration,
        possible fix found in just returning func at 21, need to verify
    */
    const checkIfClicked = () => {
        console.log(pokeArrCur)
        let clickDeckCur = []
        let presentPokeArr = [...pokeArrCur, clickedElement]
        if(presentPokeArr.length === 0) {
            return newSet
        } else {
            console.log(pokeArrCur)
            console.log(presentPokeArr)
            for(let i = 0; i <= presentPokeArr.length + 1; i++) {
                for(let j = 0; j < newSet.length; j++) {
                    console.log(clickDeckCur)
                    if (presentPokeArr[i] === newSet[j].key) {
                        console.log('dd')
                        console.log(newSet[j].key)
                        clickDeckCur.push(newSet[j].key)
                        console.log(clickDeckCur)
                    } else if (clickDeckCur.length === 8) {
                        console.log('ee')
                        console.log(clickDeckCur)
                        return deckSet(undefined)
                    } else if (clickDeckCur.length < 8 && i === presentPokeArr.length) {
                        console.log(presentPokeArr.length)
                        console.log('ff')
                        console.log(clickDeckCur)
                        clickDeckCur = []
                        return newSet
                    } else if (i === 21) {
                        return
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
