import './header.css'

export default function Header () {
    return (
        <header>
            <div className='headerGrid'>
                <span className='gameInfo'>
                    <div className='gameGrid'>
                        <h1 className='gameTitle widHeit'>Memory Card</h1>
                        <h4 className='gameInst widHeit'>Get points by clicking on an image but don't click on any more than once!</h4>
                    </div>
                </span>
                <span className='scoreInfo'>
                    <div className='scoreGrid'>
                        <div className='cur widHeit'>
                            <span className='curScoreTitle widHeit scoreFont'>Current Score:</span>
                            <span className='curScoreDigit widHeit scoreFont'>0</span>
                        </div>
                        <div className='high widHeit'>
                            <span className='highScoreTitle widHeit scoreFont'>High Score:</span>
                            <span className='highScoreDigit widHeit scoreFont'>0</span>
                        </div>
                    </div>
                </span>
            </div>
        </header>
    )
}