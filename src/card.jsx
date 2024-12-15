import { useEffect } from 'react'
import './card.css'

export default function Card ({ pokeName, onClick }) {
    console.log(pokeName)
    const pokeImage = document.querySelector('.pokeImage')
    const nameDiv = document.querySelector('.pokeText')
    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`, {
            mode: 'cors'
          })
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            pokeImage.src = response.sprites.front_default
        })
        .then(function (response) {
            nameDiv.innerText = response.name
        })
    }, [pokeName])
    return (
        <div className='pokeCard'>
            <img className='pokeImage'></img>
            <div className='pokeText'></div>
        </div>
    )
}