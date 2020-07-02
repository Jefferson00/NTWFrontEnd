import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import Header from '../header'
import imgNotebook from '../../assets/products/Notebook.png'
import imgDesk from '../../assets/products/Desktop.png'
import imgScanner from '../../assets/products/scanner.png'
import imgServidor from '../../assets/products/server.png'
import imgMonitor from '../../assets/products/aoc22p1e.png'
import imgNetworking from '../../assets/products/switch.webp'

import Footer from '../footer'



import './produtos.css'

export default function Produtos(){

    window.addEventListener('load', function () {
        const title = document.querySelector(".header-tittle h1")
        title.style.transform = "translateX(0)"
    })

    useEffect(()=>{
    /*ANIMAÇÕES*/

    const linkProdutos = document.querySelectorAll('.desc-produto a')
    linkProdutos.forEach(element =>{
            const cardProd = element.parentElement.parentElement
            const descProd = element.parentElement.parentElement.childNodes.item(1)
            const background = element.parentElement.parentElement.childNodes.item(2)
            const h3 = descProd.childNodes.item(0)
            const p = descProd.childNodes.item(1)
        element.addEventListener('mouseover', ()=>{
            background.style.opacity = "1"
            h3.style.color = "#ffffff"
            p.style.color = "#ffffff"
            background.classList.add('produto-animated')
        })
        element.addEventListener('mouseout', ()=>{
            background.style.opacity = "0"
            h3.style.color = "#565656"
            p.style.color = "#818181"
            background.classList.remove('produto-animated')
        })
        })
    },[])

    return(
    <div>
        <header id="header-produtos">
            <Header></Header>

            <div className="header-tittle">
                <h1>PRODUTOS E SOLUÇÕES</h1>
            </div>
        </header>

        <main id="main-produtos">
            <div className="main-content-produtos">
                <div className="card-produto">
                    <img src={imgNotebook} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Notebooks</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <Link to="produtos/detalhe/notebooks">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
                <div className="card-produto">
                    <img src={imgDesk} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Desktops</h3>
                        <p>Desktops corporativos lenovo. Perfeitos para qualquer ambiente de tabalho, com opções Intel e AMD</p>
                        <Link to="produtos/detalhe/desktops">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
                <div className="card-produto">
                    <img src={imgScanner} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Scanners</h3>
                        <p>Scanners Fujitsu. Várias opções para diferentes cargas de trabalho</p>
                        <Link to="produtos/detalhe/scanners">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
                <div className="card-produto">
                    <img src={imgServidor} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Servidores</h3>
                        <p>Trabalhamos com toda linha datacenter Lenovo</p>
                        <Link to="produtos/detalhe/servidores">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
                <div className="card-produto">
                    <img src={imgMonitor} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Monitores</h3>
                        <p>Monitores AOC, Philips e Lenovo, opções para seu ambiente de trabalho</p>
                        <Link to="produtos/detalhe/monitores">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
                <div className="card-produto">
                    <img src={imgNetworking} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Networking</h3>
                        <p>Todos os produtos e soluções para sua infraestrutura de rede</p>
                        <Link to="produtos/detalhe/networking">SAIBA MAIS</Link>
                    </div>
                    <div className="background-produtos"></div>
                </div>
            </div>
        </main>

        <Footer></Footer>
    </div>
    )
}