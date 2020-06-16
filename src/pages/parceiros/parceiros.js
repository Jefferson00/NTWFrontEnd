import React, { useEffect, useState } from 'react'

import Header from '../header'
import Footer from '../footer'

import './parceiros.css'

import api from '../../services/api'

export default function Parceiros(){
    const [parceiros, setParceiros] = useState([]);

    useEffect(() => {
        api.get('parceiros').then(response =>{
            setParceiros(response.data);
        })
    },[])

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
                        {parceiros.map(parceiro =>(
                            <div>
                                <a href={parceiro.site} target="_blank">
                                    <img src={`http://localhost:3333/getImage/${parceiro.imagem}`} alt={parceiro.nome}/>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}