import React, { useEffect, useState } from 'react'
import Header from '../header'

import Footer from '../footer'

import api from '../../services/api'

import './atas.css'
import './responsive.css'


export default function Atas() {

    const [atas, setAtas] = useState([]);
    const [ataModal, setAtaModal] = useState([]);

    const [clienteNome, setClienteNome] = useState('');
    const [clienteEmpresa, setClienteEmpresa] = useState('');
    const [clienteEmail, setClienteEmail] = useState('');
    const [clienteTelefone, setClienteTelefone] = useState('');
    const [clienteCidade, setClienteCidade] = useState('');
    const [clienteUF, setClienteUF] = useState('');
 
    let itensProd = []

    function closeModal() {
        var modal = document.getElementById("modal")
        modal.style.display = "none";
    }

    function openModal(id_atas) {
        console.log(id_atas)
        api.get('/atas/'+id_atas).then(response =>{
            setAtaModal(response.data)
        })
        console.log(ataModal)
        var modal = document.getElementById("modal")
        modal.style.display = "flex";
    }

    async function sendMail(id_atas){
        const data = {clienteNome, clienteEmpresa, clienteEmail, clienteTelefone, clienteCidade, clienteUF}
        console.log(data)
        try {
            await api.post(`send/${id_atas}`, data)

            alert('Obrigado, entraremos em contato')   
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        /* MENU DE ATAS */

        const itens = document.querySelectorAll('.items >div')
      

        let teste = []
        let coiso = []

        function ver() {
            itensProd = document.querySelectorAll('.card-item')
            for (var i = 0; i < itens.length; i++) {
                if (itens[i].classList.contains('item-selected')) {
                    teste[i] = [itens[i].id, true]
                } else {
                    teste[i] = [itens[i].id, false]
                }
            }
            for (var x = 0; x < itensProd.length; x++) {
                for (var r = 0; r < teste.length; r++) {
                    if (teste[r][0] === 'todos' && teste[r][1] === true) {
                        if (coiso.indexOf(teste[r][0]) == -1) {
                            coiso.push(teste[r][0])
                        }
                    }
                    else if (itensProd[x].id === teste[r][0] && teste[r][1] === true) {
                        if (coiso.indexOf(teste[r][0]) == -1) {
                            coiso.push(teste[r][0])
                            var postodos = coiso.indexOf('todos')
                            if (postodos != -1) {
                                coiso.splice(postodos, 1)
                            }
                        }
                    }
                    else if (itensProd[x].id === teste[r][0] && teste[r][1] === false) {
                        var pos = coiso.indexOf(teste[r][0])
                        if (pos != -1) {
                            coiso.splice(pos, 1)
                        }
                    }
                }
            }

            for (var x = 0; x < itensProd.length; x++) {
                (function (x) {
                    if (coiso.length == 0) {
                        itensProd[x].style.opacity = 0
                        itensProd[x].style.maxWidth = 0
                        itensProd[x].style.margin = 0
                        setTimeout(() => { itensProd[x].style.display = "none" }, 500)

                    }
                    else if (coiso[0] === "todos") {

                        itensProd[x].style.display = "block"

                        setTimeout(() => {
                            itensProd[x].style.maxWidth = "350px"
                            itensProd[x].style.margin = "20px"
                            itensProd[x].style.opacity = 1
                        }, 300)
                    }
                    else {
                        for (var i = 0; i < coiso.length; i++) {
                            var pos1 = coiso.indexOf(itensProd[x].id)

                            if (pos1 != -1) {
                                itensProd[x].style.display = "block"

                                setTimeout(() => {
                                    itensProd[x].style.maxWidth = "350px"
                                    itensProd[x].style.margin = "20px"
                                    itensProd[x].style.opacity = 1
                                }, 300)
                            } else {
                                itensProd[x].style.opacity = 0
                                itensProd[x].style.maxWidth = 0
                                itensProd[x].style.margin = 0
                                setTimeout(() => { itensProd[x].style.display = "none" }, 500)
                            }
                        }
                    }
                })(x)

            }
        }

        window.addEventListener('load', function () {
            ver()
            
        })

        for (var i = 0; i < itens.length; i++) {
            (function (i) {
                itens[i].addEventListener('click', function () {
                    if (itens[i].id === 'todos') {
                        for (var y = 1; y < itens.length; y++) {
                            itens[y].classList.remove('item-selected')
                        }
                        itens[i].classList.add('item-selected')
                    } else {
                        if (itens[i].classList.contains('item-selected')) {
                            itens[i].classList.remove('item-selected')
                        } else {
                            itens[i].classList.add('item-selected')
                            itens[0].classList.remove('item-selected')
                        }
                    }
                    ver();

                })
            })(i);
        }

        api.get('atas').then(response =>{
            setAtas(response.data);
        })
    }, [])

    return (
        <div>
            <header id="header-atas">
                <Header></Header>
                <div>
                    <h1>ATAS DE REGISTRO DE PREÇOS</h1>
                </div>
            </header>

            <main id="main-atas">
                <div id="item" className="items">
                    <div id="todos" className="item-selected">Todos</div>
                    <div id="monitores">Monitores</div>
                    <div id="desktops">Computadores</div>
                    <div id="notebooks">Notebooks</div>
                    <div id="hiper">Hiperconvergencia</div>
                    <div id="scanners">Scanners</div>
                    <div id="networking">Redes</div>
                    <div id="wifi">Wi-Fi</div>
                </div>

                <div className="card-item-list">
                    {atas.map(ata => (
                            <div id={ata.categoria} className="card-item" onClick={() => openModal(ata.id_atas)}>
                            <div className="card-title">
                                <h1>{ata.categoria}</h1>
                            </div>
                            <div className="card-img">
                                <img src= {`http://localhost:3333/getImage/${ata.imagem}`} />
                            </div>
                            <h3>{ata.modelo}</h3>
                            <div className="card-table-description">
                                <table>
                                    <tr>
                                        <td>Caracteristica:</td>
                                        <td>{ata.descricao}</td>
                                    </tr>
                                    <tr>
                                        <td>Orgão:</td>
                                        <td>{ata.orgao}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantidade Registrada:</td>
                                        <td>{ata.quantidade} unidades</td>
                                    </tr>
                                    <tr>
                                        <td>Garantia:</td>
                                        <td>{ata.garantia}</td>
                                    </tr>
                                    <tr>
                                        <td>Validade:</td>
                                        <td>{ata.validade}</td>
                                    </tr>
                                    <tr>
                                        <td>Valor únitario registrado:</td>
                                        <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(ata.valor)}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="download-item">
                    <button className="btn download">DOWNLOAD</button>
                </div>
            </main>

            <Footer></Footer>

            <div id="modal" className="box-modal">
                <div className="box-modal-content">
                {ataModal.map( ata1 => (
                    <div className="border">
                                <div className="item-description">
                                <img src= {`http://localhost:3333/getImage/${ata1.imagem}`}/>
                                <h3>{ata1.modelo}</h3>
                                <table>
                                    <tr>
                                        <td>Orgão:</td>
                                        <td>{ata1.orgao}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantidade Registrada:</td>
                                        <td>{ata1.quantidade} unidades</td>
                                    </tr>
                                    <tr>
                                        <td>Garantia:</td>
                                        <td>{ata1.garantia}</td>
                                    </tr>
                                    <tr>
                                        <td>Validade:</td>
                                        <td>{ata1.validade}</td>
                                    </tr>
                                    <tr>
                                        <td>Valor únitario registrado:</td>
                                        <td>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(ata1.valor)}</td>
                                    </tr>
                                </table>
                            </div>
                        <div className="item-details">
                            <div>
                                <p>{ata1.descricao}</p>
                                <a href={ata1.catalogo} target="_blank">Baixe o catalogo</a>
                            </div>
                            <div className="form-details">
                                <p>Gostou? Preencha o formulario que entraremos em contato</p>
                               
                                <form onSubmit={() => sendMail(ata1.id_atas)}>
                                    
                                    <label>Nome</label>
                                        <input type="text" 
                                           value={clienteNome} 
                                           onChange={e => setClienteNome(e.target.value)}  
                                           required/>
                                    <label>Empresa</label>
                                        <input type="text" 
                                           value={clienteEmpresa} 
                                           onChange={e => setClienteEmpresa(e.target.value)}  
                                           required/>
                                    <label>Email</label>
                                        <input type="text" 
                                           value={clienteEmail} 
                                           onChange={e => setClienteEmail(e.target.value)}  
                                           required/>
                                    <div className="input-group">
                                        <div>
                                            <label>Telefone</label>
                                                <input type="text" 
                                                value={clienteTelefone} 
                                                onChange={e => setClienteTelefone(e.target.value)}  
                                                required/>
                                        </div>
                                        <div>
                                            <label>Cidade/UF</label>
                                            <div>
                                                <input type="text" 
                                                value={clienteCidade} 
                                                onChange={e => setClienteCidade(e.target.value)}  
                                                required/>
                                                <input type="text" 
                                                id="uf"
                                                value={clienteUF} 
                                                onChange={e => setClienteUF(e.target.value)}  
                                                required/>
                                                </div>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <input type="submit"></input>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                ))}

                    <div id="close-modal" onClick={() => closeModal()}>
                        X
                    </div>
                </div>
            </div>

        </div>
    )
}