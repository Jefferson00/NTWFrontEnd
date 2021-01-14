import React, { useEffect, useState } from 'react'
import Footer from '../footer'

import api from '../../services/api'

import room from '../../assets/icons/room.svg'
import phone from '../../assets/icons/phone.svg'

import hlImg1 from '../../assets/content/hl-1.jpg'

import mainImage from '../../assets/content/Main-Image.svg'


import logoImg from '../../assets/logos/logo-ntw.png'
import logoBlue from '../../assets/logos/logo-ntw-blue.svg'
import slideImg1 from '../../assets/content/sl-1.png'
import slideImg2 from '../../assets/content/sl-2.png'
import slideImg3 from '../../assets/content/sl-3.png'



import inst1 from '../../assets/content/inst-1.jpg'

import Empresas from './empresas-svg'
import Ideias from './ideias-svg'
import Equipe from './equipe-svg'
import Suporte from './suporte-svg'

import Functions from '../../functions/index'

import './home.css'
import './responsive.css'


const instText1 = `Compromisso, parceria e seriedade são as principais 
objetivos da NorthWare ao oferecer as melhores Soluções em Tecnologia e Informação (TI)
 para os seus clientes. <br></br>
 A NorthWare, há mais de 20 anos,
  tem a honra de possuir soluções de fabricantes líderes de mercado em seu portfólio.
   Além disso, conta com equipe de profissionais capacitados com as mais importantes
    e reconhecidas certificações do mercado.  
    O resultado é a excelência nos projetos de infra-estrutura,
     digitalização, segurança, gerenciamento, 
produtividade e comunicação nas redes corporativas. `

const instText2 =
    `A NorthWare está presente desde 1992, 
    baseada nos conceitos de diferenciação pelo 
    seu compromisso com o cliente. 
    Agrega em seu portfólio produtos de parceiros diversos como Nutanix,
     Fujitsu, AOC, Lenovo, Netscolt entre outros, líderes mundiais do setor. 
    Tornou-se referência no fornecimento de soluções em Tecnologia da Informação (TI) 
    em razão do alto nível dos seus profissionais
     e do elaborado portfólio em produtos e serviços. <br></br>
    Sediada em Brasília, 
    conta com agentes em todo o Brasil,
     o que a capacita a atuar em projetos de âmbito nacional.  
    Com profundo conhecimento e experiência no setor governamental,
     a empresa oferece aos clientes soluções 
    integradas em hardware e software , desde a implementação, 
    o treinamento até o suporte.`

const API_URL = process.env.REACT_APP_API_URL
const API_IMAGE_PATH = process.env.REACT_APP_API_IMAGE_PATH

export default function Home() {

    const [parceiros, setParceiros] = useState([]);



    useEffect(() => {
        document.getElementById("instText1").innerHTML = instText1
        document.getElementById("instText2").innerHTML = instText2

        Functions.slider()

        const imgLogo = document.getElementById("img-logo")
        /* MENU DOWN */

        const menu = document.getElementById('home');
        const presentation = document.getElementById('presentation');

        function animePresentation() {
            const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
            if ((windowTop) > presentation.style.height + window.innerHeight) {
                const upPresentation = document.querySelector(" .up-presentation div")
                upPresentation.style.transform = 'translateX(0)'
                upPresentation.style.opacity = '1'
            }
        }

        function menuDown() {

            const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4);
            if ((windowTop) > menu.style.height + window.innerHeight) {
                menu.classList.add('menu-down')
                imgLogo.src = logoBlue
            }
        }

        function menuUp() {
            menu.classList.remove('menu-down')
            imgLogo.src = logoImg
        }

        if (menu != null) {
            window.addEventListener('scroll', function () {
                menuDown();
                animePresentation()
                if (window.scrollY === 0 && window.scrollX === 0) {
                    menuUp();
                }
            })
        }

        //Menu responsivo

        let show = true;
        const header = document.getElementById("home")
        const menuToggle = header.querySelector(".menu-toggle")

        menuToggle.addEventListener("click", () => {

            document.body.style.overflow = show ? "hidden" : "initial"
            header.classList.toggle("on", show)
            show = !show
        })

        /*ANIMAÇÕES*/

        Functions.animationCasesItem()

        api.get('parceiros').then(response => {
            setParceiros(response.data)
        })

    }, [])

    function scrollToInst() {
        document.querySelector('.institutional').scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <div className="top-header">
                <div>
                    <img src={phone} alt="telefone" />
                    <p>(61) 3202-9393</p>
                </div>
                <div>
                    <img src={room} alt="endereço" />
                    <p>SCN Quadra 01 Bloco F, Ed. América Office Tower, Sala 501</p>
                </div>
            </div>
            <header id="home">
                <img id="img-logo" src={logoImg} alt="logo" />
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a onClick={() => { scrollToInst() }} style={{ cursor: "pointer" }}>Institucional</a>
                        </li>
                        <li>
                            <a href="/atas">Atas Governo</a>
                        </li>
                        <li>
                            <a href="/produtos">Produtos</a>
                        </li>
                        <li>
                            <a href="/parceiros">Parceiros</a>
                        </li>
                        <li>
                            <a href="/cases">Cases</a>
                        </li>
                        <li>
                            <a href="/contato">Contatos</a>
                        </li>
                    </ul>

                </nav>
                <div className="menu-toggle">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>

            </header>

            <section className="container-slider">
                <div className="carousel">
                    <div className="slider">
                        <section>
                            <a href="https://psref.lenovo.com/" target="_blank" rel="noopener noreferrer">
                                <img src={slideImg1} alt="slide-1" />
                            </a>
                        </section>
                        <section>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={slideImg2} alt="slide-2" />
                            </a>
                        </section>
                        <section>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                <img src={slideImg3} alt="slide-3" />
                            </a>
                        </section>
                    </div>
                    <div className="controls">
                        <span className="arrow prev" />
                        <span className="arrow next" />
                    </div>
                </div>
            </section>

            <section className="highlight">
                <div>
                    <Empresas></Empresas>
                    <p>Empresas Lideres do Mercado de Tecnologia</p>
                </div>
                <div>
                    <Ideias></Ideias>
                    <p>Ideias Inovadoras</p>
                </div>
                <div>
                    <Equipe></Equipe>
                    <p>Equipe Especializada</p>
                </div>
                <div>
                    <Suporte></Suporte>
                    <p>Suporte Técnico</p>
                </div>
            </section>
            <section className="presentation" id="presentation" data-aos="fade-in">
                <div className="up-presentation">
                    <div>
                        <h1>
                            COM MAIS DE 20 ANOS DE EXPERIÊNCIA
                            </h1>
                        <p>
                            A Northware oferece a seus clientes um portfólio de soluções tecnológicas com grande valor agregado.
                        </p>
                    </div>

                </div>
                <img id="productsImg" src={mainImage} alt="imagem" />

            </section>


            <section id="inst" className="institutional">
                <div>
                    <h1>SOBRE A NORTHWARE</h1>
                    <p id="instText1">

                    </p>
                </div>
                <div>
                    <img src={inst1} alt="inst-1" />
                </div>
                <div>
                    <img src={hlImg1} alt="inst-2" />
                </div>
                <div>
                    <h1>DIFERENCIAL</h1>
                    <p id="instText2">

                    </p>
                </div>
            </section>

            <div className="cases-title">
                <h1>Alguns Cases de Sucesso</h1>
            </div>

            <section className="cases">
                <div>
                    <h1>Segurança</h1>
                    <p>
                        A NorthWare participou de alguns dos projetos de maior destaque do mercado brasileiro de TI. Seja com clientes do setor público ou empresas privadas.
                    </p>
                    <div className="cases-btn-div">
                        <a href="/cases" className="btn-link">SAIBA MAIS</a>
                    </div>
                    <div className="background"></div>
                </div>
                <div>
                    <h1>Hiperconvergencia</h1>
                    <p>
                        A NorthWare participou de alguns dos projetos de maior destaque do mercado brasileiro de TI.  Seja com clientes do setor público ou empresas privadas
                     </p>
                    <div className="cases-btn-div">
                        <a href="/cases" className="btn-link">SAIBA MAIS</a>
                    </div>
                    <div className="background"></div>
                </div>
                <div>
                    <h1>Digitalização</h1>
                    <p>
                        A NorthWare participou de alguns dos projetos de maior destaque do mercado brasileiro de TI. Seja com clientes do setor público ou empresas privadas.
                    </p>
                    <div className="cases-btn-div">
                        <a href="/cases" className="btn-link">SAIBA MAIS</a>
                    </div>
                    <div className="background"></div>
                </div>
            </section>

            <div className="partner-title">
                <h1>PARCEIROS</h1>
            </div>

            <section className="partners">
                <div className="slide-track">
                    {parceiros.map(parceiro => (
                        <div key={parceiro.id}>
                            <img src={API_URL + API_IMAGE_PATH + parceiro.imagem} alt="logo-lenovo" />
                        </div>
                    ))}
                    {parceiros.map(parceiro => (
                        <div key={parceiro.id}>
                            <img src={API_URL + API_IMAGE_PATH + parceiro.imagem} alt="logo-lenovo" />
                        </div>
                    ))}
                </div>
            </section>

            <Footer></Footer>


        </div>
    )
}

