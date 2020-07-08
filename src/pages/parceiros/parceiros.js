import React, { useEffect, useState } from 'react'

import Header from '../header'
import Footer from '../footer'

import './parceiros.css'
import './responsive.css'

import api from '../../services/api'

const API_URL = process.env.REACT_APP_API_URL
const API_IMAGE_PATH = process.env.REACT_APP_API_IMAGE_PATH

export default function Parceiros(){
    const [parceiros, setParceiros] = useState([]);

    useEffect(() => {
        api.get('parceiros').then(response =>{
            setParceiros(response.data);
        })

          //Menu responsivo

          let show = true;
          const header = document.getElementById("header-parceiros")
          const menuToggle = header.querySelector(".menu-toggle")
  
          menuToggle.addEventListener("click", () =>{
  
              document.body.style.overflow = show ? "hidden" : "initial"
              header.classList.toggle("on", show)
              show = !show
          })
    },[])

    window.addEventListener('load', function () {
        const title = document.querySelector(".header-tittle h1")
        title.style.transform = "translateX(0)"
    })

    return(
        <div>
            <header id="header-parceiros">
            <Header></Header>

            <div className="header-tittle">
                <h1>Parceiros</h1>
            </div>
            </header>

            <main id="main-parceiros">
                <div className="content-parceiros-img">
                    <div>
                        <h3>
                        A NorthWare possui parcerias com os melhores fornecedores de Tecnologia da Informação do mundo. 
                        </h3>
                        <p>
                        Com o intuito de possuir identidade e conhecimento profundo nas soluções comercializadas, 
                        trabalha de forma dedicada para fabricantes de segmentos distintos. 
                        O resultado foi reconhecido através de certificações e premiações
                        </p>
                    </div>
                </div>
                <div className="content-list-parceiros">
                    <div className="list-parceiros">
                        {parceiros.map(parceiro =>(
                            <div>
                                <a href={parceiro.site} target="_blank">
                                    <img src={API_URL+API_IMAGE_PATH+parceiro.imagem} alt={parceiro.nome}/>
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