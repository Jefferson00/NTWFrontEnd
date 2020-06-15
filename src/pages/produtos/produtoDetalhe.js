import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'

import imgNotebook from '../../assets/products/Notebook.png'

import './produtos.css'

export default function Produtos(){
    return(
        <div>
            <header id="header-produtos" className="detalhe">
                    <Header></Header>
            </header>

            <main id="main-produtos">
                <div className="main-first-produto">
                    <div>
                        <h1>NOTEBOOKS</h1>
                        <img src={imgNotebook}></img>
                    </div>
                    <div>
                        <img src={imgNotebook}></img>
                    </div>
                </div>
                <div className="list-produtos">
                    <div className="card-produto">
                        <img src={imgNotebook}/>
                        <div>
                            <h3>ThinkPad E14</h3>
                        </div>
                        <a href="#">Baixe o catalogo</a>
                    </div>
                    <div className="card-produto">
                        <img src={imgNotebook}/>
                        <div>
                            <h3>ThinkPad E14</h3>
                        </div>
                        <a href="#">Baixe o catalogo</a>
                    </div>
                    <div className="card-produto">
                        <img src={imgNotebook}/>
                        <div>
                            <h3>ThinkPad E14</h3>
                        </div>
                        <a href="#">Baixe o catalogo</a>
                    </div>
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
}