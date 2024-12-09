import Header from './header.jsx'
import './index.css'

export default function App () {
    return (
        <>
            <Header/>
            <div className='pokeBallMiddle'>
                <div className='buttonGrid'>
                    <div className='blackMiddle'></div>
                    <div className='pokeBallButton'>
                        <div className='buttonCenter'></div>
                    </div>
                    <div className='whiteBottom'></div>
                </div>
            </div>
        </>
    )
}