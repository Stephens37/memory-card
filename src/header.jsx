import './header.css'

export default function Header ({headBodyText, headCurScore, headHighScore}) {
    return (
        <header>
            <div className='headerGrid'>
                <span className='gameInfo'>
                    <div className='gameGrid'>
                        <h1 className='gameTitle widHeit'>Memory Card</h1>
                        <h4 className='gameInst widHeit'>{headBodyText}</h4>
                    </div>
                </span>
                <span className='scoreInfo'>
                    <div className='scoreGrid'>
                        <div className='cur widHeit'>
                            <span className='curScoreTitle widHeit scoreFont'>Current Score:</span>
                            <span className='curScoreDigit widHeit scoreFont'>{headCurScore}</span>
                        </div>
                        <div className='high widHeit'>
                            <span className='highScoreTitle widHeit scoreFont'>High Score:</span>
                            <span className='highScoreDigit widHeit scoreFont'>{headHighScore}</span>
                        </div>
                    </div>
                </span>
            </div>
            <div className='pokeBallMiddle'>
                <div className='buttonGrid'>
                    <div className='blackMiddle'></div>
                    <div className='pokeBallButton'>
                        <div className='buttonCenter'></div>
                    </div>
                    <div className='whiteBottom'></div>
                </div>
            </div>
        </header>
    )
}