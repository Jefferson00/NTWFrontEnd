import React from 'react'
import logoImg from '../assets/logos/logo-ntw.png'

export default function Header(){
    return (
        <div className="main-div-header">
            <div className="logo">
                <img id="img-logo" src={logoImg} alt="logo" />
                   <div className="menu-toggle">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
            </div>      
                    <nav className="main-menu">
                        <ul>
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/">Institucional</a>
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
        </div>
    )
}

