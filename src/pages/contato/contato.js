import React, {useState} from 'react'

import api from '../../services/api'

import Header from '../header'
import logoWhite from '../../assets/logos/logo-ntw-white.svg'
import facebook from '../../assets/icons/facebook.svg'
import linkedin from '../../assets/icons/linkedin.svg'
import instagram from '../../assets/icons/instagram.svg'
import mail from '../../assets/icons/mail.svg'
import room from '../../assets/icons/room.svg'
import phone from '../../assets/icons/phone.svg'

import Map from './map'

import './contato.css'

export default function Contato() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');

    async function sendMail(){
        
        const data = {nome, sobrenome, email, assunto, mensagem}

        try {
            await api.post('sendMailContact', data)
            alert('Obrigado, entraremos em contato')
        } catch (error) {
            console.log(error)
        }
    }

    window.addEventListener('load', function () {
        const title = document.querySelector(".header-tittle h1")
        title.style.transform = "translateX(0)"
    })

    return (
        <div>
            <header id="header-contato">
                <Header></Header>

                <div className="header-tittle">
                    <h1>CONTATO</h1>
                </div>
            </header>

            <main id="main-contato">
                <div className="contact-content">
                    <div className="contact-form-container">
                        <div className="contact-form">
                            <form onSubmit={()=> sendMail()}>
                                <div className="input-group">
                                    <div>
                                        <label data-end=" *">Nome</label>
                                        <input type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
                                    </div>
                                    <div>
                                        <label data-end=" *">Sobrenome</label>
                                        <input type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} required/>
                                    </div>
                                </div>
                                <label data-end=" *">Email</label>
                                <input type="text" value={email} onChange={e => setEmail(e.target.value)} required/>
                                <label data-end=" *">Assunto</label>
                                <input type="text" value={assunto} onChange={e => setAssunto(e.target.value)} required/>
                                <label data-end=" *">Mensagem</label>
                                <textarea value={mensagem} onChange={e => setMensagem(e.target.value)} required/>
                                <input type="submit" value="ENVIAR" />
                            </form>

                            <div className="informations">
                                <p> SCN Quadra 01 Bloco F, Ed. América Office Tower, Sala 501 Brasília-DF CEP 70711-905</p>
                                <p> 61 3202-9393</p>
                                <p> northware@northware.com.br</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-contact">
                        <p>VAMOS CONVERSAR!</p>
                        <p>Temos uma equipe especializada de vendedores prontos para te atender.</p>
                    </div>
                </div>

                <div className="footer-2">
                    <div className="maps">
                        <Map></Map>
                    </div>

                    <div className="social-line">
                        <div className="social">
                            <h1>SIGA-NOS</h1>
                            <div>
                                <h1>
                                    <a href="https://facebook.com">
                                        <img src={facebook} alt="facebook" />
                                    </a>
                                </h1>
                                <h1>
                                    <a href="https://linkedin.com">
                                        <img src={linkedin} alt="linkedin" />
                                    </a>
                                </h1>
                                <h1>
                                    <a href="https://instagram.com">
                                        <img src={instagram} alt="instagram" />
                                    </a>
                                </h1>
                                <h1>
                                    <a href="#">
                                        <img src={mail} alt="mail" />
                                    </a>
                                </h1>
                            </div>
                        </div>

                        <div className="logo-white">
                            <img src={logoWhite} alt="logo"></img>
                        </div>
                    </div>

                </div>

            </main>
        </div>
    )

}