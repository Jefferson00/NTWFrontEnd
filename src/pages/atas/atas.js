import React, { useEffect, useState } from 'react'
import Header from '../header'

import Footer from '../footer'

import api from '../../services/api'

import './atas.css'
import './responsive.css'


export default function Atas() {

    const [atas, setAtas] = useState([]);
    const [ataModal, setAtaModal] = useState([]);
    const [id_atas, setIdAtas] = useState([])

    const [clienteNome, setClienteNome] = useState('');
    const [clienteEmpresa, setClienteEmpresa] = useState('');
    const [clienteEmail, setClienteEmail] = useState('');
    const [clienteTelefone, setClienteTelefone] = useState('');
    const [clienteCidade, setClienteCidade] = useState('');
    const [clienteUF, setClienteUF] = useState('');
 
    //variavel que irá guardar os cards itens das atas
    let itensProd = []

    // funções Modal
    //função que fecha a modal
    function closeModal() {
        var modal = document.getElementById("modal")
        modal.style.display = "none";
        //coloca o display flex no loading
        const loading = document.getElementById('loading')
        loading.style.display = "flex"
        setAtaModal([])
    }

    function loadResults(id_atas){
        //busca no banco a ata correspondente a aquela que foi clicada e atualiza a variavel ataModal
        api.get('/atas/'+id_atas).then(response =>{
            setAtaModal(response.data)
        })
    }

    //função de abrir a modal
    function openModal(id_atas) {
        var modal = document.getElementById("modal")
        modal.style.display = "flex";
        loadResults(id_atas)
    }
    // função que torna o loading desabilitado depois que o conteúdo é carregado
    function itsLoaded(){
        const loading = document.getElementById('loading')
        loading.style.display = "none"
    }

    //função de limpar os campos do formulario
    function clearInputs(){
        setClienteNome('')
        setClienteEmail('')
        setClienteEmpresa('')
        setClienteTelefone('')
        setClienteCidade('')
        setClienteUF('')
    }

    //função que envia email com o interesse na ata
    async function sendMail(e){
        const data = {clienteNome, clienteEmpresa, clienteEmail, clienteTelefone, clienteCidade, clienteUF}
        e.preventDefault()
        try {
            await api.post(`send/${id_atas}`, data)
            
            alert('Obrigado, entraremos em contato')
            clearInputs()
            closeModal()   
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        /* MENU DE ATAS */
        // cria variavel com as divs do menu de itens
        const itens = document.querySelectorAll('.items >div')
      
        let checkedItems = []
        let selectedItems = []

        //função que ao clicar no item atualiza dinamicamente os cards das atas com a categoria correspondete
        function verifyItemSelected() {
            //adciona todas as divs card-item na variavel
            itensProd = document.querySelectorAll('.card-item')
            //faz uma verificação se as divs dos items está selecionada
            for (var i = 0; i < itens.length; i++) {
                //se estiver selecionada, adiciona o id do item na variavel checkedItems como true, do contrario adciona como falso
                if (itens[i].classList.contains('item-selected')) {
                    checkedItems[i] = [itens[i].id, true]
                } else {
                    checkedItems[i] = [itens[i].id, false]
                }
            }
            //verificações dos itens selecionados correspondem aos cards
            for (var x = 0; x < itensProd.length; x++) {
                for (var r = 0; r < checkedItems.length; r++) {
                    //verifica se o item verificado é 'todos' e se é verdadeiro
                    if (checkedItems[r][0] === 'todos' && checkedItems[r][1] === true) {
                        //se for verdadeiro, verifica se na variavel selectedItems não possui o item e o adciona
                        if (selectedItems.indexOf(checkedItems[r][0]) == -1) {
                            selectedItems.push(checkedItems[r][0])
                        }
                    }
                    // verifica se o item verificado verdadeiro é igual ao id do card da ata (verificando se é a mesma categoria está selecionada)
                    else if (itensProd[x].id === checkedItems[r][0] && checkedItems[r][1] === true) {
                        //verifica se na variavel selectedItems não possui o item e o adciona
                        if (selectedItems.indexOf(checkedItems[r][0]) == -1) {
                            selectedItems.push(checkedItems[r][0])
                            var todosIndex = selectedItems.indexOf('todos') // pega o indice de 'todos'
                            // se "todos" estiver selecionado, então retira ele da variavel selectedItems
                            if (todosIndex != -1) {
                                selectedItems.splice(todosIndex, 1)
                            }
                        }
                    }
                    // verifica se a mesma categoria não está selecionada, se sim retira o item da variavel selectedItems
                    else if (itensProd[x].id === checkedItems[r][0] && checkedItems[r][1] === false) {
                        var indexItem = selectedItems.indexOf(checkedItems[r][0])
                        if (indexItem != -1) {
                            selectedItems.splice(indexItem, 1)
                        }
                    }
                }
            }
            //mudanças dinamicas dos cards
            for (var x = 0; x < itensProd.length; x++) {
                (function (x) {
                    //se não houver nenhum item selecionado, torna todos cards desabilitados
                    if (selectedItems.length == 0) {
                        itensProd[x].style.opacity = 0
                        setTimeout(() => { itensProd[x].style.display = "none" }, 500)
                    }
                    //se o item selecionado for todos, todos ficam habilitados
                    else if (selectedItems[0] === "todos") {

                        itensProd[x].style.display = "block"

                        setTimeout(() => {
                            itensProd[x].style.opacity = 1
                        }, 300)
                    }
                    //se o item selecionado existir, mostra, do contrario torna desabilitado
                    else {
                        for (var i = 0; i < selectedItems.length; i++) {
                            var pos1 = selectedItems.indexOf(itensProd[x].id)
                            if (pos1 != -1) {
                                itensProd[x].style.display = "block"

                                setTimeout(() => {
                                    itensProd[x].style.opacity = 1
                                }, 300)
                            } else {
                                itensProd[x].style.opacity = 0
                                setTimeout(() => { itensProd[x].style.display = "none" }, 500)
                            }
                        }
                    }
                })(x)
            }
        }

        //ao carregar a pagina, executa as funções
        window.addEventListener('load', function () {
            verifyItemSelected()
            const title = document.querySelector(".header-tittle h1")
            title.style.transform = "translateX(0)"
        })

        //ao clicar nos itens, adiciona ou remove a classe item-selected e executa a função de verificação
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
                    verifyItemSelected();
                })
            })(i);
        }

        //busca todas as atas no banco de dados
        api.get('atas').then(response =>{
            setAtas(response.data);
        })

        //Menu responsivo
        let show = true;
        const header = document.getElementById("header-atas")
        const menuToggle = header.querySelector(".menu-toggle")

        menuToggle.addEventListener("click", () =>{
            document.body.style.overflow = show ? "hidden" : "initial"
            header.classList.toggle("on", show)
            show = !show
        })
        
    }, [])

    return (
        <div>
            <header id="header-atas">
                <Header></Header>
                <div className="header-tittle">
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
                    <button className="btn download">Download</button>
                </div>
            </main>

            <Footer></Footer>

            <div id="modal" className="box-modal">
                <div className="box-modal-content">
                    {ataModal.map( ata1 => (
                        <div className="border" onLoad={()=>{itsLoaded()}}>
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
                                
                                    <form onSubmit={sendMail}>
                                        
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
                                            <input type="submit" onClick={() => {setIdAtas(ata1.id_atas)}}></input>
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
                <div id="loading" className="loading-modal">
                    <span></span>
                </div>
            </div>

        </div>
    )
}