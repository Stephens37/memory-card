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
    
    const [topText, setTopText] = useState("Get points by clicking on an image but don't click on any more than once!")
    
    const [pokemonClickedArr, setPokemonClickedArr] = useState([])
    const [scoreInc, setScoreInc] = useState(-1)
    const [highScore, setHighScore] = useState(0)

    const topTextRef = useRef(topText)
    const pokeArrRef = useRef(pokemonClickedArr)
    const scoreIncRef = useRef(scoreInc)
    const highScoreRef = useRef(highScore)

    useEffect (() => {
        topTextRef.current = topText
    }, [topText])

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
        let curTopText = topTextRef.current
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
            setTopText(() => "Get points by clicking on an image but don't click on any more than once!")
            setPokemonClickedArr([scoreName])
            setScoreInc((curScoreInc) => curScoreInc + 1)
            console.log(scoreInc)
            return
        } else {
            console.log(curPokeArr)
            for (let i = 0; i < curPokeArr.length; i++) {
                if (curPokeArr[i] === scoreName) {
                    console.log('d')
                    if (curHighScore < curScoreInc) {
                        console.log('e')
                        setHighScore(curScoreInc)
                    } 
                    setTopText(() => 'Try Again')
                    console.log(curTopText)
                    setPokemonClickedArr([])
                    setScoreInc((curScoreInc) => curScoreInc - curScoreInc)
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && curScoreInc < 20) {
                    console.log('f')
                    console.log(i)
                    console.log(curScoreInc)
                    setPokemonClickedArr((curPokeArr) => [...curPokeArr, scoreName])
                    setScoreInc((curScoreInc) => curScoreInc + 1)
                    console.log(curPokeArr)
                    return
                } else if (curPokeArr[i] !== scoreName && i === (curPokeArr.length - 1) && curScoreInc === 20) {
                    console.log('g')
                    console.log('You Win!')
                    console.log(curScoreInc)
                    setTopText(() => 'Game Over!')
                    console.log(curTopText)
                    setHighScore((curHighScore) => curScoreInc + 1)
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

        -score skipping because as deckSet is being called again, scoreKeeping is also called
    */
    const checkIfClicked = () => {
        console.log(pokeArrCur)
        // regenSet returning same set each time, put it in loop to randomize
        let clickDeckCur = []
        let presentPokeArr = [...pokeArrCur, clickedElement]
        if(presentPokeArr.length === 0) {
            return clickedNewSet
        } else {
            console.log(pokeArrCur)
            console.log(presentPokeArr)
            function checkLoop (clickedLoopSet) {
                for(let i = 0; i <= presentPokeArr.length; i++) {
                    for(let j = 0; j < clickedLoopSet.length; j++) {
                        if(newSet === undefined) {
                            return
                        }
                        else if (i === 21) {
                            newSet === undefined
                            return newSet
                        } else if (presentPokeArr[i] === clickedLoopSet[j].key) {
                            console.log(clickedLoopSet[j].key)
                            clickDeckCur.push(clickedLoopSet[j].key)
                        } else if (clickDeckCur.length === 8) {
                            clickDeckCur = []
                            const regenSet = cards.map(() => {
                                const randomName = pokemonArr[getRandomInt(pokemonArr.length)]
                                const thisCardName = checkInputName(randomName).inputedName
                                return <Card pokeName={thisCardName} onClick={() => deckSet(thisCardName)} key={thisCardName}></Card>
                            })
                            return checkLoop(regenSet)
                        } else if (clickDeckCur.length < 8 && i === presentPokeArr.length) {
                            clickDeckCur = []
                            return clickedLoopSet
                        }
                    }
                }
            }
            return checkLoop(newSet)
        }
    }

    setCards(checkIfClicked)
    /*
        - need to keep testing to ensure checkLoop(regenSet) logic works
        - stop infinite loop when score reaches 21
    */
    }
    useEffect(() => {
        deckSet(undefined)
    }, [])
    useEffect(() => {
        console.log('Updated scoreInc:', scoreInc)
    }, [scoreInc])
    
    return(
        <>
            <Header headBodyText={topText} headCurScore={scoreInc} headHighScore={highScore}/>
            <div className='cardDeckGridChild'>
                <div className='cardDeckDisplay'>{cards}</div>
            </div>
        </>
    )
}
