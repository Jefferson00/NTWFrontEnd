import React from 'react'
import logoImg from '../assets/logos/logo-ntw.png'

export default function Header(){
    return (
        <div>
                   <img id="img-logo" src={logoImg} alt="logo" />
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
                                <a href="/contatos">Contatos</a>
                            </li>
                        </ul>
                    </nav>

        </div>
    )
}

