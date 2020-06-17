import React, { useEffect, useState } from 'react'

import Header from '../header'
import Footer from '../footer'

import StjImg from '../../assets/content/stj-case.jpg'

import './cases.css'

import api from '../../services/api'

export default function Cases() {
    const [cases, setCases] = useState([])
    const [caseModal, setCaseModal] = useState([])

    function openModal(id) {
        console.log(id)
        api.get('/cases/'+id).then(response => {
            setCaseModal(response.data)
        })
        console.log(caseModal)
        const modal = document.getElementById("modal")
        modal.style.display = "flex"
    }

    function closeModal() {
        const modal = document.getElementById("modal")
        modal.style.display = "none"
    }

    useEffect(() => {
        api.get('cases').then(response => {
            setCases(response.data)
        })
    }, [])

    return (
        <div>
            <header id="header-cases">
                <Header></Header>

                <div>
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
                        <div className="border">
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
            </div>
        </div>
    )
}