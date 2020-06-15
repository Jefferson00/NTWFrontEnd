import React, { useEffect, useState } from 'react'
import Header from '../header'
import imgNotebook from '../../assets/products/Notebook.png'
import imgDesk from '../../assets/products/Desktop.png'
import imgScanner from '../../assets/products/scanner.png'
import imgServidor from '../../assets/products/server.png'
import imgMonitor from '../../assets/products/aoc22p1e.png'
import imgNetworking from '../../assets/products/switch.webp'

import Footer from '../footer'

import api from '../../services/api'

import './produtos.css'

export default function Produtos(){
    return(
    <div>
        <header id="header-produtos">
            <Header></Header>

            <div>
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
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
                <div className="card-produto">
                    <img src={imgDesk} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Desktops</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
                <div className="card-produto">
                    <img src={imgScanner} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Scanners</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
                <div className="card-produto">
                    <img src={imgServidor} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Servidores</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
                <div className="card-produto">
                    <img src={imgMonitor} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Monitores</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
                <div className="card-produto">
                    <img src={imgNetworking} alt="teste"/>
                    <div className="desc-produto">
                        <h3>Networking</h3>
                        <p>Notebooks corporativos lenovo. Leves e resistentes com opções Intel e AMD</p>
                        <a href="produtos/detalhe">SAIBA MAIS</a>
                    </div>
                </div>
            </div>
        </main>

        <Footer></Footer>
    </div>
    )
}