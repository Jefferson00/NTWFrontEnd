import React, { useEffect, useState } from 'react'

import Header from '../header'
import Footer from '../footer'

import './cases.css'
import './responsive.css'

import api from '../../services/api'

export default function Cases() {
    const [cases, setCases] = useState([])
    const [caseModal, setCaseModal] = useState([])

    async function loadResult(id){
        const result = await api.get('/cases/'+id)
        setCaseModal(result.data)
    }

    function openModal(id) {
    
        const modal = document.getElementById("modal")
        modal.style.display = "flex"
        
        loadResult(id)
       
    }

    function closeModal() {
        const modal = document.getElementById("modal")
        modal.style.display = "none"
        const loading = document.getElementById('loading')
        loading.style.display = "flex"
        setCaseModal([])

    }

    useEffect(() => {
        api.get('cases').then(response => {
            setCases(response.data)
        })

         //Menu responsivo

         let show = true;
         const header = document.getElementById("header-cases")
         const menuToggle = header.querySelector(".menu-toggle")
 
         menuToggle.addEventListener("click", () =>{
 
             document.body.style.overflow = show ? "hidden" : "initial"
             header.classList.toggle("on", show)
             show = !show
         })
    }, [])

    window.addEventListener('load', function () {
        const title = document.querySelector(".header-tittle h1")
        title.style.transform = "translateX(0)"
    })

    function itsLoaded(){
        const loading = document.getElementById('loading')
        loading.style.display = "none"
    }

    return (
        <div>
            <header id="header-cases">
                <Header></Header>

                <div className="header-tittle">
                    <h1>CASES</h1>
                </div>
            </header>

            <main id="main-cases">
                <div className="content-cases-img">
                    <h3>
                        A NorthWare possui parcerias com os melhores fornecedores de Tecnologia da Informação do mundo.
                        </h3>
                    <p>
                        Conheça alguns cases de sucesso, de vendas ao governo,
                        que contribuíram para o crescimento da Northware em fornecimento no país
                        </p>
                </div>

                <div className="content-list-cases">
                    {cases.map(cs => (
                        <div className="cases-card">
                            <div className="cases-card-title">
                                <p>{cs.orgao}</p>
                            </div>
                            <div className="cases-card-content"  onClick={() => openModal(cs.id)}>
                                <img src={`http://localhost:3333/getImage/${cs.imagem}`} />
                            </div>
                            <div className="cases-card-span">
                                <p>{cs.descricao}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer></Footer>

            <div id="modal" className="box-modal-cases">
                <div className="box-modal-content">
                    {caseModal.map(csm => (
                        <div id="box" className="border" onLoad={()=>{itsLoaded()}}>
                            <div>
                                <img src={`http://localhost:3333/getImage/${csm.imagem}`}/>
                            </div>
                            <div>
                                <p>
                                    {csm.descricao}
                                </p>
                            </div>
                            
                            <div id="close-modal" onClick={() => closeModal()}>
                                X
                            </div>
                        </div>
                    ))}
                    
                </div>
                <div id="loading" className="loading-modal">
                                <span></span>
                </div>
            </div>
        </div>
    )
}