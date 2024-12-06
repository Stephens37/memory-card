import './header.css'

export default function Header () {
    return (
        <header>
            <span className='basicInfo'>
                <div className='gameTitle'>Memory Card</div>
                <div className='gameInst'>Get points by clicking on an image but don't click on any more than once!</div>
            </span>
            <span className='scoreDisplay'>
                <div className='curScoreDisplay'>0</div>
                <div className='highScoreDisplay'>0</div>
            </span>
        </header>
    )
}