import { useEffect, useState } from 'react'
import './card.css'

export default function Card ({ pokeName, onClick }) {
    const [pokeImageSrc, setPokeImageSrc] = useState('')
    const [nameText, setNameText] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`, {
            mode: 'cors'
          })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            setPokeImageSrc(response.sprites.front_default)
        })
        .then(function () {
            setNameText(pokeName.toUpperCase())
        })
        .catch(error => {
            setError(error)
            console.log(error)
        })
    }, [pokeName])
    return (
        <div className='pokeCardGridChild' onClick={onClick}>
            <div className='pokeCard'>
                <img className='pokeImage' src={pokeImageSrc}></img>
                <div className='pokeText'>{nameText}</div>
            </div>
        </div>
    )
}