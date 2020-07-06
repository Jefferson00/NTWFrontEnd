import React, { useEffect, useState } from 'react'
import Footer from '../footer'

import api from '../../services/api'

import hlImg1 from '../../assets/content/hl-1.jpg'
import hlImg2 from '../../assets/content/hl-2.jpg'
import hlImg3 from '../../assets/content/hl-3.jpg'
import hlImg4 from '../../assets/content/hl-4.jpg'

import logoImg from '../../assets/logos/logo-ntw.png'
import logoBlue from '../../assets/logos/logo-ntw-blue.svg'
import slideImg1 from '../../assets/content/sl-1.png'
import slideImg2 from '../../assets/content/sl-2.png'
import slideImg3 from '../../assets/content/sl-3.png'

import productsImg from '../../assets/products/products.png'

import inst1 from '../../assets/content/inst-1.jpg'

import './home.css'
import './responsive.css'


const instText1 = `Compromisso, parceria e seriedade são as principais 
objetivos da NorthWare ao oferecer as melhores Soluções em Tecnologia e Informação (TI)
 para os seus clientes. 
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
    Agrega em seu portfólio produtos de parceiros diversos como Air Tight,
     Fujitsu, LANDesk, Lenovo, R-Post e Oracle, líderes mundiais do setor. 
    Tornou-se referência no fornecimento de soluções em Tecnologia da Informação (TI) 
    em razão do alto nível dos seus profissionais
     e do elaborado portfólio em produtos e serviços. 
    Sediada em Brasília, 
    conta com agentes em todo o Brasil,
     o que a capacita a atuar em projetos de âmbito nacional.  
    Com profundo conhecimento e experiência no setor governamental,
     a empresa oferece aos clientes soluções 
    integradas em hardware e software , desde a implementação, 
    o treinamento até o suporte.`


export default function Home() {

    const [parceiros, setParceiros] = useState([]);

    useEffect(() => {

        /*Slider*/
        const slider = document.querySelector('.slider');
        const carousel = document.querySelector('.carousel');
        const prev = document.querySelector('.prev');
        const next = document.querySelector('.next');

        var direction;
        if (slider != null) {
            var cont = 0
            window.addEventListener('load', function () {
                
                this.setInterval(() => {
                    direction = -1;

                    carousel.style.justifyContent = 'flex-start';
                    slider.style.transform = 'translate(-33.4%)';
                    
                }, 3000)
            })

            prev.addEventListener('click', function () {
                if (direction === -1) {
                    slider.appendChild(slider.firstElementChild);
                    direction = 1;
                }

                slider.style.transform = 'translate(33.4%)';
                carousel.style.justifyContent = 'flex-end';
            });

            next.addEventListener('click', function () {
                direction = -1;

                carousel.style.justifyContent = 'flex-start';
                slider.style.transform = 'translate(-33.4%)';
            });

            slider.addEventListener('transitionend', function () {
                console.log(cont++)
                if (direction === -1) {
                    slider.appendChild(slider.firstElementChild);
                } else if (direction === 1) {
                    slider.prepend(slider.lastElementChild);
                }


                slider.style.transition = 'none';
                slider.style.transform = 'translate(0)';
                setTimeout(function () {
                    slider.style.transition = 'all 0.8s';
                })
            })
        }

            const imgLogo = document.getElementById("img-logo")
                /* MENU DOWN */ 
            
            const menu = document.getElementById('home');
            
            function menuDown(){
            
            const windowTop = window.pageYOffset +  ((window.innerHeight * 3)/4);
                    if((windowTop) > menu.style.height + window.innerHeight){
                        menu.classList.add('menu-down')
                        imgLogo.src = logoBlue
                    }
            }
            
            function menuUp(){
                    menu.classList.remove('menu-down')
                    imgLogo.src =  logoImg
            }
            
            if(menu != null){
            window.addEventListener('scroll', function(){
                menuDown();
                if(window.scrollY===0&&window.scrollX===0){
                    menuUp();
                }
            })
            }

            //Menu responsivo

            let show = true;
            const header = document.getElementById("home")
            const menuToggle = header.querySelector(".menu-toggle")

            menuToggle.addEventListener("click", () =>{

                document.body.style.overflow = show ? "hidden" : "initial"
                header.classList.toggle("on", show)
                show = !show
            })
      
            /*ANIMAÇÕES*/

            const linkCases = document.querySelectorAll('.cases a')
            //const classes = ['case-animated','case-animated2']
            linkCases.forEach(element =>{
                element.addEventListener('mouseover', ()=>{
                    /*element.parentElement.parentElement.childNodes.item(3).style.opacity = "1"
                    element.parentElement.parentElement.childNodes.item(4).style.opacity = "1"
                    element.parentElement.parentElement.childNodes.item(5).style.opacity = "1"
                    element.parentElement.parentElement.childNodes.item(3).classList.add('case-animated')
                    element.parentElement.parentElement.childNodes.item(4).classList.add('case-animated')
                    element.parentElement.parentElement.childNodes.item(5).classList.add('case-animated')*/
                    //element.parentElement.parentElement.style.border ="none"
                    element.parentElement.parentElement.childNodes.item(0).style.color = "#ffffff"
                    element.parentElement.parentElement.childNodes.item(1).style.color = "#ffffff"
                    element.parentElement.parentElement.childNodes.item(3).style.opacity = "1"
                    element.parentElement.parentElement.childNodes.item(3).classList.add('case-animated2')
                })
                element.addEventListener('mouseout', ()=>{
                    //element.parentElement.parentElement.classList.remove('case-animated2')
                    /*element.parentElement.parentElement.childNodes.item(3).style.opacity = "0"
                    element.parentElement.parentElement.childNodes.item(4).style.opacity = "0"
                    element.parentElement.parentElement.childNodes.item(5).style.opacity = "0"
                    element.parentElement.parentElement.childNodes.item(3).classList.remove('case-animated')
                    element.parentElement.parentElement.childNodes.item(4).classList.remove('case-animated')
                    element.parentElement.parentElement.childNodes.item(5).classList.remove('case-animated')*/
                    //element.parentElement.parentElement.style.border ="1px solid #C1C1C1"
                    element.parentElement.parentElement.childNodes.item(0).style.color = "#757272"
                    element.parentElement.parentElement.childNodes.item(1).style.color = "#757272"
                    element.parentElement.parentElement.childNodes.item(3).style.opacity = "0"
                    element.parentElement.parentElement.childNodes.item(3).classList.remove('case-animated2')
                })
            })
            
            api.get('parceiros').then(response =>{
                setParceiros(response.data)
            })
    
    },[])

    function scrollToInst(){
        document.querySelector('.institutional').scrollIntoView({behavior:'smooth'})
    }

    return (
        <div>
            <header id="home">
                <img id="img-logo" src={logoImg} alt="logo" />
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a onClick={() =>{scrollToInst()}} style={{cursor : "pointer"}}>Institucional</a>
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
                        <section><img src={slideImg1} alt="slide-1" /></section>
                        <section><img src={slideImg2} alt="slide-2" /></section>
                        <section><img src={slideImg3} alt="slide-3" /></section>
                    </div>
                    <div className="controls">
                        <span className="arrow prev"/>
                        <span className="arrow next"/>
                    </div>
                </div>
            </section>

            <section className="highlight">
                <div>
                    <img src={hlImg1} alt="Empresas Lideres do Mercado de Tecnologia" />
                    <p>Empresas Lideres do Mercado de Tecnologia</p>
                </div>
                <div>
                    <img src={hlImg2} alt="Ideias Inovadoras" />
                    <p>Ideias Inovadoras</p>
                </div>
                <div>
                    <img src={hlImg3} alt="Equipe Especializada" />
                    <p>Equipe Especializada</p>
                </div>
                <div>
                    <img src={hlImg4} alt="Suporte Técnico" />
                    <p>Suporte Técnico</p>
                </div>
            </section>
                <section className="presentation" id="pres" data-aos="fade-in">
                    <div className="up-presentation">
                        <h1>
                            COM MAIS DE 20 ANOS DE EXPERIÊNCIA
                        </h1>
                        <p>
                            A Northware ofere a seus clientes um portfólio de soluções tecnológicas com grande valor agregado.
                        </p>
                    </div>

                    <img id="productsImg" src={productsImg} alt="imagem"/>

                    <div className="down-presentation">
                    </div>
                </section>
            

            <section id="inst" className="institutional">
                <div>
                    <h1>SOBRE A NORTHWARE</h1>
                    <p>
                        {instText1}
                    </p>
                </div>
                <div>
                    <img src={inst1} alt="inst-1"/>
                </div>
                <div>
                    <img src={hlImg1} alt="inst-2"/>
                </div>
                <div>
                    <h1>DIFERENCIAL</h1>
                    <p>
                        {instText2}
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
                        A NorthWare participou de alguns dos projetos de maior destaque do mercado brasileiro de TI. Projetos de Hiperconvergencias deram o que falar bicho
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
                       <div>
                            <img src={`http://localhost:3333/getImage/${parceiro.imagem}`} alt="logo-lenovo"/>
                        </div>
                   ))}
                   {parceiros.map(parceiro => (
                       <div>
                            <img src={`http://localhost:3333/getImage/${parceiro.imagem}`} alt="logo-lenovo"/>
                        </div>
                   ))}
                </div>
            </section>

            <Footer></Footer>


        </div>
    )
}

