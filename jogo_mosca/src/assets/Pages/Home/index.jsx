import { useEffect, useState } from 'react'
import Fly from '../../Components/Fly'
import './styles/styles.css'

export default function Home() {
    const [maisPontos, setMaisPontos] = useState(0)
    const [playNow, setPlayNow] = useState(false)

    useEffect(() => {
        const ultimosPontos = localStorage.getItem('PontosJogoMosca')
        if(ultimosPontos) {
            setMaisPontos(JSON.parse(ultimosPontos))
        }
    }, [])

    function PlayGame() {
        console.log(1111);
        document.getElementsByTagName('nav')[0].style.display = 'none'
        setPlayNow(true)
    }

    return (
        <div className='Home_Page'>
            <div id='container_pizza_icon'>
                <img src="/src/assets/Imgs/pizza.png" alt="" />
            </div>
        
            <nav>
                <div>
                    <h1>Mata Moscas</h1>
                    <p>Maior pontuação: {maisPontos}</p>
                    <button onClick={PlayGame}>Jogar</button>
                </div>
            </nav>

            {
                playNow ? 
                <Fly/> : null
            }
        </div>
    )
}