import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import {Link, useParams} from 'react-router-dom'

import imgNotebook from '../../assets/products/Notebook.png'
import imgLenovo from '../../assets/logos/Lenovo_Global_Corporate_Logo.png'

import './produtos.css'

import api from '../../services/api'

export default function ProdutosDetalhe(){
    let {cat} = useParams();
    const [produtos, setProdutos] = useState([])
    
    let fabricantes = []

    useEffect(()=>{
        api.get('produtos/'+cat).then(response =>{
            setProdutos(response.data)
        })

        api.get('parceiros/')
    },[])
    return(
        <div>
            <header id="header-produtos" className="detalhe">
                    <Header></Header>
            </header>

            <main id="main-produtos">
                <div className="main-first-produto">
                    <div>
                        <h1>{cat}</h1>
                        <img src={imgLenovo}></img>
                    </div>
                    <div>
                        <img src={imgNotebook}></img>
                    </div>
                </div>
                <div className="list-produtos">
                    
                    {produtos.map(produto => {
                        if (fabricantes.indexOf(produto.fabricante) === -1) {
                            fabricantes.push(produto.fabricante)
                        }
                        
                        return (
                            <div className="card-produto">
                                <img src={`http://localhost:3333/getImage/${produto.imagem}`}/>
                                <div>
                                    <h3>{produto.fabricante} {produto.modelo}</h3>
                                    <p>{produto.caracteristica}</p>
                                </div>
                                <a href="#">Baixe o catalogo</a>
                            </div>
                        )
                    })}
                    {console.log(fabricantes)}
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
    
}