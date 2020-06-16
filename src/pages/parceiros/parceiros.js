import React, { useEffect, useState } from 'react'

import Header from '../header'
import Footer from '../footer'

import imgPartnership from '../../assets/content/partnership.png'

import './parceiros.css'

export default function Parceiros(){
    return(
        <div>
            <header id="header-parceiros">
            <Header></Header>

            <div>
                <h1>Parceiros</h1>
            </div>
            </header>

            <main id="main-parceiros">
                <div className="content-parceiros-img">
                    <h3>
                    A NorthWare possui parcerias com os melhores fornecedores de Tecnologia da Informação do mundo. 
                    </h3>
                    <p>
                    Com o intuito de possuir identidade e conhecimento profundo nas soluções comercializadas, 
                    trabalha de forma dedicada para fabricantes de segmentos distintos. 
                    O resultado foi reconhecido através de certificações e premiações
                    </p>
                </div>
                <div className="content-list-parceiros">
                    <div className="list-parceiros">

                    </div>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}