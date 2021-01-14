import React, { useEffect, useState } from 'react'
import Header from '../header'
import Footer from '../footer'
import {useParams} from 'react-router-dom'

import imgNotebook from '../../assets/products/Notebook.png'
import imgDesktop from '../../assets/products/Desktop.png'
import imgScanner from '../../assets/products/fujtsu.png'
import imgServidor from '../../assets/products/server.png'
import imgMonitor from '../../assets/products/aoc22p1e.png'
import imgNetwork from '../../assets/products/switch.webp'

import './produtos.css'

import Functions from '../../functions'

import api from '../../services/api'

const API_URL = process.env.REACT_APP_API_URL
const API_IMAGE_PATH = process.env.REACT_APP_API_IMAGE_PATH

export default function ProdutosDetalhe(){
    let {cat} = useParams();

    // imagem do tipo de produto que irá carregar
    let img 
    const categorias = 
    {
        0: {"name": "desktops", "img":imgDesktop},
        1: {"name": "notebooks", "img":imgNotebook},
        2: {"name": "scanners", "img":imgScanner},
        3: {"name": "servidores", "img":imgServidor},
        4: {"name": "monitores", "img":imgMonitor},
        5: {"name": "networking", "img":imgNetwork},
    }
    
   function getImageOfProduct(){
    const catLength = (Object.keys(categorias).length)
        for(var i=0; i<catLength; i++){
            if(cat == categorias[i].name){
                img = categorias[i].img
            }
        }
        
   }

   window.addEventListener('load', getImageOfProduct())

    //lista de produtos
    const [produtos, setProdutos] = useState([])
    const [fabricantes1, setFabricantes] = useState([])

    let fabricantes = []
    let fabricante = ''

    useEffect(()=>{
        api.get('produtos/'+cat).then(response =>{
            setProdutos(response.data)
        })

        //Menu responsivo

        Functions.responsiveMenu("header-produtos")
    },[cat])

    
    return(
        <div>
            <header id="header-produtos" className="detalhe">
                    <Header></Header>
            </header>

            <main id="main-produtos">
                <div className="link-back">
                    <a href='/produtos'>Voltar</a>
                </div>
                <div className="main-first-produto">
                    <div>
                        <h1>{cat.toUpperCase()}</h1>
                            {produtos.map(produto => {
                            if (fabricantes.indexOf(produto.fabricante) === -1) {
                                fabricantes.push(produto.fabricante)
                                }
                            })}
                            
                            {()=>{
                                api.get('parceiros/'+fabricante).then(response =>{
                                    setFabricantes(response.data)
                                console.log(response.data)})
                            }}
                    </div>
                    <div>
                        <img src={img}/>
                    </div>
                </div>
                <div className="list-produtos">
                    
                    {produtos.map(produto => (
                            <div className="card-produto" key={produto.id_produto}>
                                <img src={API_URL+API_IMAGE_PATH+produto.imagem}/>
                                <div>
                                    <h3>{produto.fabricante} {produto.modelo}</h3>
                                    <p>{produto.caracteristica}</p>
                                </div>
                                <a href={produto.catalogo} target="_blank" rel="noopener noreferrer">Baixe o catalogo</a>
                            </div>
                        )
                    )}
  
                </div>
            </main>

            <Footer></Footer>
        </div>
    )
    
}