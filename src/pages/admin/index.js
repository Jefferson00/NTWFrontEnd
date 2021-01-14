import React, { useState, useEffect } from 'react'
import './admin.css'
import logoW from '../../assets/logos/Logo-w.png'
import api from '../../services/api';
import { useHistory } from 'react-router-dom'
import Logs from './logs'
import Functions from '../../functions/index'

const API_URL = process.env.REACT_APP_API_URL
const API_IMAGE_PATH = process.env.REACT_APP_API_IMAGE_PATH

export default function Admin() {

    const history = useHistory();

    /*Token*/
    api.defaults.headers.common['Authorization'] = localStorage.getItem('token')

    /*variaveis de estado */
    const [valueSearch, setValueSearch] = useState('')
    //form users
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');
    const [name, setNome] = useState('');
    const [password, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');
    //form atas
    const [atas, setAtas] = useState([]);
    const [resultAtas, setResultAtas] = useState([]);
    const [id_atas, setIdAtas] = useState('');
    const [produtoAta, setProdutoAta] = useState('');
    const [produtosAta, setProdutosAta] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [orgaoAta, setOrgaoAta] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [garantia, setGarantia] = useState('');
    const [validade, setValidade] = useState('');
    const [valor, setValor] = useState('');
    //form produtos
    const [produtos, setProdutos] = useState([])
    const [resultProdutos, setResultProdutos] = useState([])
    const [id_produto, setIdProduto] = useState('')
    const [categoriaProduto, setCategoriaProduto] = useState('')
    const [modelo, setModelo] = useState('')
    const [fabricante, setFabricante] = useState('')
    const [catalogo, setCatalogo] = useState('')
    const [caracteristica, setCaracteristica] = useState('')
    const [isEOL, setIsEOL] = useState('')
    const [fileProduto, setFileProduto] = useState('')

    //form cases
    const [cases, setCases] = useState([])
    const [resultCases, setResultCases] = useState([])
    const [id_cases, setIdCases] = useState('')
    const [orgaoCase, setOrgaoCase] = useState('')
    const [descricaoCase, setDescricaoCase] = useState('')
    const [categoriaCase, setCategoriaCase] = useState('')
    const [fileCase, setFileCase] = useState('')
    //form parceiros
    const [parceiros, setParceiros] = useState([])
    const [resultParceiros, setResultParceiros] = useState([])
    const [id_parceiros, setIdParceiros] = useState('')
    const [nomeParceiro, setNomeParceiro] = useState('')
    const [siteParceiro, setSiteParceiro] = useState('')
    const [isValidParceiro, setIsValidParceiro] = useState('')
    const [fileParceiro, setFileParceiro] = useState('')
    const [adminAccess, setAdminAccess] = useState(false)

    const [logsUpdate, setLogsUpdate] = useState(0)

    let arrayCat = []
    let catProds = []

    const userName = localStorage.getItem('name');

    /* Verifica se existe algum usuario logado, caso não existe redireciona para a pagina de login */
    const idLogged = localStorage.getItem('Userid');




    window.onbeforeunload = function(){
        logout()
        return ''
    }

    window.addEventListener('load', setCategoryOptions())

    useEffect(() => {
        loadResults()

        handleProduto('')

        Functions.selectItemMenu()
        //limpar os campos do formulario

        Functions.verifyUser(idLogged, history).then(res => {
            setAdminAccess(res)
        })

    }, [])




    function setCategoryOptions() {
        for (var i = 0; i < produtos.length; i++) {
            arrayCat[i] = produtos[i].categoria

        }
        catProds = [...new Set(arrayCat)]
    }

    /*função que recarrega todos os usuarios */
    function loadResults() {
        api.get('users').then(response => {
            setUsers(response.data.filter(user => user.access != 0))
        });
        api.get('atas').then(response => {
            setAtas(response.data)
            setResultAtas(response.data)
        })
        api.get('produtos').then(response => {
            setProdutos(response.data)
            setResultProdutos(response.data)
        })
        setCategoryOptions()
        api.get('cases').then(response => {
            setCases(response.data)
            setResultCases(response.data)
        })
        api.get('parceiros').then(response => {
            setParceiros(response.data)
            setResultParceiros(response.data)
        })
    }

    /*função que limpa os campos */

    function clearInputs() {
        const select = document.querySelectorAll('select#select-produto option')
        for (var i = 0; i < select.length; i++) {
            if (select[i].value == 'Selecione') {
                select[i].selected = true;
            }
        }
        loadResults()
        setId('')
        setNome('')
        setSenha('')
        setConfSenha('')
        setDescricao('')
        setOrgaoAta('')
        setQuantidade('')
        setGarantia('')
        setValidade('')
        setValor('')
        setCategoriaProduto('')
        setModelo('')
        setFabricante('')
        setCatalogo('')
        setCaracteristica('')
        setIsEOL('')
        setFileProduto('')
        setOrgaoCase('')
        setDescricaoCase('')
        setCategoriaCase('')
        setFileCase('')
        setNomeParceiro('')
        setSiteParceiro('')
        setIsValidParceiro('')
        setFileParceiro('')
    }

    /**FUNÇÕES TABELA USUARIOS */
    /*função de cadastrar novo usuario */
    async function cadastrarUser(e) {
        e.preventDefault()

        if (password != confSenha) {
            alert('A senha não corresponde!')
        } else {
            try {
                const data = { name, password }
                const response = await api.post('users', data)
                alert('Cadastro realizado!')
                clearInputs()
            } catch (err) {
                alert('Cadastro não realizado')

            }
        }
    }
    /*função de deletar um usuario */
    async function deleteUser(id) {
        try {
            var conf = window.confirm("Deseja realmente excluir?")
            if (conf) {
                await api.delete(`users/${id}`);
                const userDeleted = users.filter(user => user.id === id)
                const detalhe = { "usuario": userDeleted[0].name }
                const log = { acao: 'deletar', tabela: 'users', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                setUsers(users.filter(user => user.id !== id))
            }
        } catch (err) {
            alert('nao foi possivel deletar')
        }
    }
    /*função de atualizar usuario */
    async function editUser(id) {

        const data = { name, password }

        if (password != '') {
            if (password == confSenha) {
                try {
                    await api.put(`users/${id}`, data)
                    alert('Senha atualizada com sucesso!')
                    clearInputs()
                    Functions.buttonEditUserDisable()
                } catch (err) {
                    alert('nao foi possivel atualizar a senha')
                }
            } else {
                alert('Senha não corresponde')
            }
        } else {
            try {
                await api.put(`users/${id}`, data)
                const detalhe = { "Usuário": data }
                const log = { acao: 'atualizar', tabela: 'users', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                alert('Atualizado!')
                clearInputs()
                Functions.buttonEditUserDisable()
            } catch (err) {
                alert('nao foi possivel atualizar')
            }
        }
    }
    /*função que carrega os dados do usuario no formulario para alteração */
    function clickEditUser(id) {
        const btnEdit = document.getElementById("btn-edit")
        btnEdit.style.display = "block"
        const userEdit = users.filter(user => user.id == id)
        setNome(userEdit[0].name)
        setId(id)
    }


    /**FUNÇÕES TABELA ATAS */
    /*função de cadastrar nova ata */
    async function cadastraAta(e) {
        e.preventDefault()
        try {
            const id_produtos = produtoAta
            const orgao = orgaoAta

            const data = { id_produtos, descricao, orgao, quantidade, garantia, validade, valor }
            await api.post('atas', data)
            alert('Cadastro realizado!')
            const log = { acao: 'cadastrar', tabela: 'atas', detalhe: data }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            clearInputs()
        } catch (err) {
            alert('Cadastro não realizado')
        }
    }
    /*função de deletar ata */
    async function deleteAta(id_atas) {
        try {
            var conf = window.confirm("Deseja realmente excluir?")
            if (conf) {
                await api.delete(`atas/${id_atas}`);
                const ataDeleted = atas.filter(ata => ata.id_atas === id_atas)
                const detalhe = { "ata": ataDeleted }
                const log = { acao: 'deletar', tabela: 'atas', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                setAtas(atas.filter(ata => ata.id_atas !== id_atas))
                setResultAtas(atas.filter(ata => ata.id_atas !== id_atas))
            }
        } catch (error) {
            alert('nao foi possivel deletar')
        }
    }
    /*função de atualizar atas */
    async function editAta(id_atas) {
        const id_produtos = produtoAta
        const orgao = orgaoAta

        const data = { id_produtos, descricao, orgao, quantidade, garantia, validade, valor }
        try {
            await api.put(`atas/${id_atas}`, data)
            const detalhe = { "Ata": data }
            const log = { acao: 'atualizar', tabela: 'atas', detalhe: detalhe }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            alert('Atualizado!')
            clearInputs()
            Functions.buttonEditAtaDisable()
        } catch (error) {
            alert('nao foi possivel atualizar')
        }
    }
    /*função que carrega os dados da ata no formulario para alteração */
    function clickEditAta(id_atas) {
        setIdAtas(id_atas)
        const ataEdit = atas.filter(ata => ata.id_atas == id_atas)
        const select = document.querySelectorAll('select#select-produto option')

        const btnEdit = document.getElementById("btn-edit-ata")
        const btnCancel = document.getElementById("btn-cancel-ata")
        btnEdit.style.display = "block"
        btnCancel.style.display = "block"

        setProdutoAta(ataEdit[0].id_produtos)
        setDescricao(ataEdit[0].descricao)
        setOrgaoAta(ataEdit[0].orgao)
        setQuantidade(ataEdit[0].quantidade)
        setGarantia(ataEdit[0].garantia)
        setValidade(ataEdit[0].validade)
        setValor(ataEdit[0].valor)

        for (var i = 0; i < select.length; i++) {
            if (select[i].value == ataEdit[0].id_produtos) {
                select[i].selected = true;
            }
        }
    }

    /**FUNÇÕES TABELA PRODUTOS */
    /*função de cadastrar novo produto */
    async function cadastraProduto(e) {
        e.preventDefault()
        try {
            const categoria = categoriaProduto
            const file = fileProduto
            var cont = 0
            const formData = new FormData();
            const radioEOL = document.getElementsByName("isEOL");
            while (cont < radioEOL.length) {
                if (radioEOL[cont].checked) {
                    if (radioEOL[cont].id == "false") {
                        formData.set('isEOL', false)
                    } else {
                        formData.set('isEOL', true)
                    }
                }
                cont++
            }

            formData.set('categoria', categoria)
            formData.set('modelo', modelo)
            formData.set('fabricante', fabricante)
            formData.set('caracteristica', caracteristica)
            formData.set('catalogo', catalogo)
            formData.append('file', file)

            await api({
                method: 'POST',
                url: 'produtos',
                data: formData,
                headers: { 'Content-type': 'multipart/form-data' }
            })
            alert('Cadastro realizado!')
            const detalhe = { categoria, modelo, fabricante, caracteristica, catalogo }
            const log = { acao: 'cadastrar', tabela: 'produtos', detalhe: detalhe }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            clearInputs()
        } catch (error) {
            alert('Cadastro não realizado')
        }
    }
    /*função de deletar um produto */
    async function deleteProduto(id_produto) {
        try {
            var conf = window.confirm("Deseja realmente excluir?")
            if (conf) {
                await api.delete(`produtos/${id_produto}`);
                alert('deletado com sucesso')
                const produtoDeleted = produtos.filter(prod => prod.id_produto === id_produto)
                const detalhe = { "produto": produtoDeleted[0].modelo }
                const log = { acao: 'deletar', tabela: 'produtos', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                setProdutos(produtos.filter(produto => produto.id_produto !== id_produto))
                setResultProdutos(produtos.filter(produto => produto.id_produto !== id_produto))
            }
        } catch (error) {
            alert('nao foi possivel deletar')
        }
    }
    /*função de atualizar um produto */
    async function editProduto(id_produto) {
        try {
            const categoria = categoriaProduto
            const file = fileProduto

            var cont = 0
            const formData = new FormData();
            const radioEOL = document.getElementsByName("isEOL");
            while (cont < radioEOL.length) {
                if (radioEOL[cont].checked) {
                    if (radioEOL[cont].id == "false") {
                        formData.set('isEOL', false)
                    } else {
                        formData.set('isEOL', true)
                    }
                }
                cont++
            }
            formData.set('categoria', categoria)
            formData.set('modelo', modelo)
            formData.set('fabricante', fabricante)
            formData.set('caracteristica', caracteristica)
            formData.set('catalogo', catalogo)
            formData.append('file', file)

            await api({
                method: 'PUT',
                url: `produtos/${id_produto}`,
                data: formData,
                headers: { 'Content-type': 'multipart/form-data' }
            })

            const detalhe = { "produto": { categoria, modelo, fabricante, caracteristica, catalogo, file } }
            const log = { acao: 'atualizar', tabela: 'produtos', detalhe: detalhe }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            alert('Atualizado!')
            clearInputs()
            Functions.buttonEditProdutoDisable()
        } catch (error) {
            alert('Erro na atualização')
        }
    }
    /*função que carrega os dados do produto no formulario para alteração */
    function clickEditProduto(id_produto) {
        setIdProduto(id_produto)

        const produtoEdit = produtos.filter(produto => produto.id_produto == id_produto)

        const btnEdit = document.getElementById("btn-edit-produto")
        const btnCancel = document.getElementById("btn-cancel-produto")
        btnEdit.style.display = "block"
        btnCancel.style.display = "block"

        const radioEOL = document.getElementsByName("isEOL");

        if (produtoEdit[0].isEOL) {
            radioEOL[1].checked = true
        } else {
            radioEOL[0].checked = true
        }

        setCategoriaProduto(produtoEdit[0].categoria)
        setModelo(produtoEdit[0].modelo)
        setFabricante(produtoEdit[0].fabricante)
        setCatalogo(produtoEdit[0].catalogo)
        setCaracteristica(produtoEdit[0].caracteristica)
        setIsEOL(produtoEdit[0].isEOL)
    }


    /**FUNÇÕES TABELA CASES */
    /*função de cadastrar novo case*/
    async function cadastraCase(e) {
        e.preventDefault()
        try {
            const categoria = categoriaCase
            const orgao = orgaoCase
            const descricao = descricaoCase
            const file = fileCase
            //const data = {categoria, modelo, fabricante, caracteristica, catalogo, isEOL, file}

            const formData = new FormData();
            formData.set('categoria', categoria)
            formData.set('orgao', orgao)
            formData.set('descricao', descricao)
            formData.append('file', file)

            await api({
                method: 'POST',
                url: 'cases',
                data: formData,
                headers: { 'Content-type': 'multipart/form-data' }
            })
            alert('Cadastro realizado!')
            const detalhe = { categoria, orgao, descricao }
            const log = { acao: 'cadastrar', tabela: 'case', detalhe: detalhe }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            clearInputs()
        } catch (error) {
            alert('Cadastro não realizado')
        }
    }
    /*função de deletar um case */
    async function deleteCase(id) {
        try {
            var conf = window.confirm("Deseja realmente excluir?")
            if (conf) {
                await api.delete(`cases/${id}`);
                alert('deletado com sucesso')
                const caseDeleted = cases.filter(cs => cs.id === id)
                const detalhe = { "case": caseDeleted[0].orgao }
                const log = { acao: 'deletar', tabela: 'cases', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                setCases(cases.filter(cs => cs.id !== id))
                setResultCases(cases.filter(cs => cs.id !== id))
            }
        } catch (error) {
            alert('nao foi possivel deletar')
        }
    }
    /*função de atualizar um case */
    async function editCase(id) {
        try {
            if (categoriaCase != '' && orgaoCase != '' && descricaoCase != '') {
                const categoria = categoriaCase
                const orgao = orgaoCase
                const descricao = descricaoCase
                const file = fileCase
                const formData = new FormData();
                formData.set('categoria', categoria)
                formData.set('orgao', orgao)
                formData.set('descricao', descricao)
                formData.append('file', file)

                await api({
                    method: 'PUT',
                    url: `cases/${id}`,
                    data: formData,
                    headers: { 'Content-type': 'multipart/form-data' }
                })

                const detalhe = { "case": { categoria, orgao, descricao, file } }
                const log = { acao: 'atualizar', tabela: 'cases', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                alert('Atualizado!')
                clearInputs()
                Functions.buttonEditCaseDisable()
            } else {
                alert('Erro na atualização! Campos vazios')
            }

        } catch (error) {
            alert('Erro na atualização')
        }
    }
    /*função que carrega os dados do case no formulario para alteração */
    function clickEditCase(id) {
        setIdCases(id)

        const caseEdit = cases.filter(cs => cs.id == id)

        const btnEdit = document.getElementById("btn-edit-case")
        btnEdit.style.display = "block"

        setCategoriaCase(caseEdit[0].categoria)
        setOrgaoCase(caseEdit[0].orgao)
        setDescricaoCase(caseEdit[0].descricao)
        setCategoriaCase(caseEdit[0].categoria)

    }


    /**FUNÇÕES TABELA PARCEIROS */
    /*função de cadastrar novo parceiro*/
    async function cadastraParceiro(e) {
        e.preventDefault()
        try {
            const nome = nomeParceiro
            const site = siteParceiro
            const file = fileParceiro

            var cont = 0
            const formData = new FormData();
            const radioValid = document.getElementsByName("isValid");
            while (cont < radioValid.length) {
                if (radioValid[cont].checked) {
                    if (radioValid[cont].id == "false") {
                        formData.set('isValid', false)
                    } else {
                        formData.set('isValid', true)
                    }
                }
                cont++
            }
            formData.set('nome', nome)
            formData.set('site', site)
            formData.append('file', file)

            await api({
                method: 'POST',
                url: 'parceiros',
                data: formData,
                headers: { 'Content-type': 'multipart/form-data' }
            })
            alert('Cadastro realizado!')
            const detalhe = { nome, site }
            const log = { acao: 'cadastrar', tabela: 'parceiros', detalhe: detalhe }
            Functions.createLog(log, idLogged)
            setLogsUpdate(logsUpdate + 1)
            clearInputs()
        } catch (error) {
            alert('Cadastro não realizado')
        }
    }
    /*função de deletar um parceiro */
    async function deleteParceiro(id) {
        try {
            var conf = window.confirm("Deseja realmente excluir?")
            if (conf) {
                await api.delete(`parceiros/${id}`);
                alert('deletado com sucesso')
                const parceiroDeleted = parceiros.filter(parceiro => parceiro.id === id)
                const detalhe = { "parceiro": parceiroDeleted[0].nome }
                const log = { acao: 'deletar', tabela: 'parceiros', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)
                setParceiros(parceiros.filter(parceiro => parceiro.id !== id))
                setResultParceiros(parceiros.filter(parceiro => parceiro.id !== id))
            }
        } catch (error) {
            alert('nao foi possivel deletar')
        }
    }
    /*função de atualizar um parceiro */
    async function editParceiro(id) {
        try {
            if (nomeParceiro != '' && siteParceiro != '') {
                const nome = nomeParceiro
                const site = siteParceiro
                const file = fileParceiro
                var cont = 0

                const formData = new FormData();
                const radioValid = document.getElementsByName("isValid");
                while (cont < radioValid.length) {
                    if (radioValid[cont].checked) {
                        if (radioValid[cont].id == "false") {
                            formData.set('isValid', false)
                        } else {
                            formData.set('isValid', true)
                        }
                    }
                    cont++
                }
                formData.set('nome', nome)
                formData.set('site', site)
                formData.append('file', file)


                await api({
                    method: 'PUT',
                    url: `parceiros/${id}`,
                    data: formData,
                    headers: { 'Content-type': 'multipart/form-data' }
                })
                const detalhe = { "parceiro": { nome, site, file } }
                const log = { acao: 'atualizar', tabela: 'parceiros', detalhe: detalhe }
                Functions.createLog(log, idLogged)
                setLogsUpdate(logsUpdate + 1)

                alert('Atualizado!')
                clearInputs()
                Functions.buttonEditParceiroDisable()
            } else {
                alert('Erro na atualização! Campos vazios')
            }

        } catch (error) {
            alert('Erro na atualização')
        }
    }
    /*função que carrega os dados do parceiro no formulario para alteração */
    function clickEditParceiro(id) {
        setIdParceiros(id)

        const parceiroEdit = parceiros.filter(parceiro => parceiro.id == id)

        const btnEdit = document.getElementById("btn-edit-parceiro")
        btnEdit.style.display = "block"
        const btnCancel = document.getElementById("btn-cancel-parceiro")
        btnCancel.style.display = "block"

        const radioValid = document.getElementsByName("isValid");

        if (parceiroEdit[0].isValid) {
            radioValid[1].checked = true
        } else {
            radioValid[0].checked = true
        }

        setNomeParceiro(parceiroEdit[0].nome)
        setSiteParceiro(parceiroEdit[0].site)
    }

    /*função de logout */
    function logout() {
        localStorage.clear();
        history.push('/admin')
    }

    function handleProduto(value) {
        /*carrega produtos com base em uma categoria especifica*/

        api.get(`produtos/${value}`).then(response => {
            setProdutosAta(response.data)
        })
    }

    function searching(e) {
        setValueSearch(e.target.value)
    }

    useEffect(() => {
        let resultsAtas = atas.filter(ata => 
            ata.descricao.toLowerCase().includes(valueSearch.toLowerCase()) ||
            ata.orgao.toLowerCase().includes(valueSearch.toLowerCase()) ||
            ata.garantia.toLowerCase().includes(valueSearch.toLowerCase()) || 
            ata.validade.toLowerCase().includes(valueSearch.toLowerCase()) 
            )
        let resultsProdutos = produtos.filter(prod => 
            prod.modelo.toLowerCase().includes(valueSearch.toLowerCase()) ||
            prod.categoria.toLowerCase().includes(valueSearch.toLowerCase()) ||
            prod.fabricante.toLowerCase().includes(valueSearch.toLowerCase()) ||
            prod.caracteristica.toLowerCase().includes(valueSearch.toLowerCase()) 
            )
        let resultsCases = cases.filter(cases => 
            cases.descricao.toLowerCase().includes(valueSearch.toLowerCase()) ||
            cases.orgao.toLowerCase().includes(valueSearch.toLowerCase()) ||
            cases.categoria.toLowerCase().includes(valueSearch.toLowerCase()) 
            )
        let resultsParceiros = parceiros.filter(parc => 
            parc.nome.toLowerCase().includes(valueSearch.toLowerCase())
            )

        setResultAtas(resultsAtas)
        setResultProdutos(resultsProdutos)
        setResultCases(resultsCases)
        setResultParceiros(resultsParceiros)

    }, [valueSearch])

    return (
        <div>
            <header className="header-admin-index">
                <div>
                    <div>
                        <img src={logoW} />
                    </div>
                    <div>
                        <h3>PAINEL ADMINISTRATIVO</h3>
                    </div>
                </div>
                <div>
                    {adminAccess ?
                        <div id="logs" onClick={Functions.showLogs}>
                            <p>Logs</p>
                        </div>
                        :
                        <div style={{ pointerEvents: "none" }}></div>
                    }
                    <div id="userName">
                        <p>{userName}</p>
                    </div>
                    <div id="logout" onClick={logout}>
                        <p>Logout</p>
                    </div>
                </div>
            </header>

            <div id="item-admins" className="itens-admin">
                <div id="atas" className="item-selected">Atas</div>
                <div id="produtos">Produtos</div>
                <div id="cases">Cases</div>
                <div id="parceiros">Parceiros</div>
                {adminAccess ?
                    <div id="usuarios">Usuarios</div>
                    :
                    <div style={{ pointerEvents: "none" }}></div>
                }

            </div>

            <div className="search">
                <div>
                <label>
                    <h3>Buscar</h3>
                </label>
                <input type="text" value={valueSearch} onChange={searching} />
                </div>
            </div>

            <div className="main-content-index" onLoad={() => { Functions.itsLoaded() }}>
                <div className="contact-form grid">
                    <form id="atas" className="active" onSubmit={cadastraAta}>
                        <div className="input-group">
                            <div>
                                <label data-end=" *">Categoria</label>
                                <select id="select-categoria" name="categorias" onChange={e => handleProduto(e.target.value)} required>
                                    {
                                        catProds.map(prod => (
                                            <option value={prod} key={prod.id}>{prod}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div>
                                <label data-end=" *">Produto</label>
                                <select id="select-produto" name="produtos" onChange={e => setProdutoAta(e.target.value)} required>
                                    <option>Selecione</option>
                                    {produtosAta.map(produto => (
                                        <option value={produto.id_produto} key={produto.id}>{produto.modelo}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <label data-end=" *">Descrição</label>
                        <textarea value={descricao} onChange={e => setDescricao(e.target.value)} required />
                        <div className="input-group">
                            <div>
                                <label data-end=" *">Orgão</label>
                                <input type="text" value={orgaoAta} onChange={e => setOrgaoAta(e.target.value)} required />
                            </div>
                            <div>
                                <label data-end=" *">Quantidade</label>
                                <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <div>
                                <label data-end=" *">Garantia</label>
                                <input type="text" value={garantia} onChange={e => setGarantia(e.target.value)} required />
                            </div>
                            <div>
                                <label data-end=" *">Validade</label>
                                <input type="text" value={validade} onChange={e => setValidade(e.target.value)} required />
                            </div>
                            <div>
                                <label data-end=" *">Valor</label>
                                <input type="number" value={valor} onChange={e => setValor(e.target.value)} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <input className="btn edit"
                                type="button"
                                value="ATUALIZAR"
                                style={{ display: "none" }}
                                id="btn-edit-ata"
                                onClick={() => { editAta(id_atas) }} />
                            <input className="btn cancel"
                                type="button"
                                value="CANCELAR"
                                style={{ display: "none" }}
                                id="btn-cancel-ata"
                                onClick={() => { Functions.buttonEditAtaDisable(); clearInputs() }} />
                            <input className="btn-cad" type="submit" value="CADASTRAR" />
                        </div>
                    </form>

                    <form id="produtos" onSubmit={cadastraProduto}>
                        <label data-end=" *">Categoria</label>
                        <input type="text" value={categoriaProduto} onChange={e => setCategoriaProduto(e.target.value)} required />
                        <label data-end=" *">Modelo</label>
                        <input type="text" value={modelo} onChange={e => setModelo(e.target.value)} required />
                        <label data-end=" *">Fabricante</label>
                        <input type="text" value={fabricante} onChange={e => setFabricante(e.target.value)} required />
                        <label data-end=" *">Catalogo</label>
                        <input type="text" value={catalogo} onChange={e => setCatalogo(e.target.value)} required />
                        <label data-end=" *">Caracteristica</label>
                        <textarea value={caracteristica} onChange={e => setCaracteristica(e.target.value)} required />
                        <div className="input-group">
                            <div>
                                <label data-end=" *">É EOL (End of Life)?</label>
                                <div className="input-group">
                                    <label htmlFor="false">Não</label>
                                    <input type="radio" id="false" name="isEOL" value={isEOL} />
                                    <label htmlFor="true">Sim</label>
                                    <input type="radio" id="true" name="isEOL" value={isEOL} />
                                </div>
                            </div>
                            <div>
                                <label data-end=" *">Imagem</label>
                                <input type="file" name="file" onChange={e => setFileProduto(e.target.files[0])} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <input className="btn edit"
                                type="button"
                                value="ATUALIZAR"
                                style={{ display: "none" }}
                                id="btn-edit-produto"
                                onClick={() => { editProduto(id_produto) }} />
                            <input className="btn cancel"
                                type="button"
                                value="CANCELAR"
                                style={{ display: "none" }}
                                id="btn-cancel-produto"
                                onClick={() => { Functions.buttonEditProdutoDisable(); clearInputs() }} />
                            <input type="submit" value="CADASTRAR" />
                        </div>
                    </form>

                    <form id="cases" onSubmit={cadastraCase}>
                        <label data-end=" *">Categoria</label>
                        <input type="text" value={categoriaCase} onChange={e => setCategoriaCase(e.target.value)} required />
                        <label data-end=" *">Órgão</label>
                        <input type="text" value={orgaoCase} onChange={e => setOrgaoCase(e.target.value)} required />
                        <label data-end=" *">Descrição</label>
                        <textarea value={descricaoCase} onChange={e => setDescricaoCase(e.target.value)} required />
                        <label data-end=" *">Imagem</label>
                        <input type="file" onChange={e => setFileCase(e.target.files[0])} required />
                        <input className="btn edit" type="button" value="ATUALIZAR" style={{ display: "none" }} id="btn-edit-case" onClick={() => { editCase(id_cases) }} />
                        <input type="submit" value="CADASTRAR"></input>
                    </form>

                    <form id="parceiros" onSubmit={cadastraParceiro}>
                        <label data-end=" *">Nome</label>
                        <input type="text" value={nomeParceiro} onChange={e => setNomeParceiro(e.target.value)} required />
                        <label data-end=" *">Site</label>
                        <input type="text" value={siteParceiro} onChange={e => setSiteParceiro(e.target.value)} required />
                        <div className="input-group">
                            <div>
                                <label data-end=" *">Parceria ativa?</label>
                                <div className="input-group">
                                    <label htmlFor="false">Não</label>
                                    <input type="radio" id="false" name="isValid" />
                                    <label htmlFor="true">Sim</label>
                                    <input type="radio" id="true" name="isValid" />
                                </div>
                            </div>
                            <div>
                                <label data-end=" *">Imagem</label>
                                <input type="file" name="file" onChange={e => setFileParceiro(e.target.files[0])} required />
                            </div>
                        </div>

                        <div className="input-group">
                            <input className="btn edit"
                                type="button"
                                value="ATUALIZAR"
                                style={{ display: "none" }}
                                id="btn-edit-parceiro"
                                onClick={() => { editParceiro(id_parceiros) }} />
                            <input className="btn cancel"
                                type="button"
                                value="CANCELAR"
                                style={{ display: "none" }}
                                id="btn-cancel-parceiro"
                                onClick={() => { Functions.buttonEditParceiroDisable(); clearInputs() }} />
                            <input type="submit" value="CADASTRAR" />
                        </div>
                    </form>

                    <form id="usuarios" onSubmit={cadastrarUser}>
                        <label data-end=" *">Nome</label>
                        <input type="text" value={name} onChange={e => setNome(e.target.value)} required />
                        <label data-end=" *">Senha</label>
                        <input type="password" value={password} onChange={e => setSenha(e.target.value)} required />
                        <label data-end=" *">Confirmar Senha</label>
                        <input type="password" value={confSenha} onChange={e => setConfSenha(e.target.value)} required />
                        <div className="input-group">
                            <input className="btn edit" type="button" value="ATUALIZAR" style={{ display: "none" }} id="btn-edit" onClick={() => { editUser(id) }}></input>
                            <input className="btn-cad" type="submit" value="CADASTRAR"></input>
                        </div>
                    </form>

                </div>
                <div className="content-list grid">

                    <ul id="atas" className="active">
                        {resultAtas.map(ata => (
                            <li key={ata.id_atas}>
                                <div>
                                    <strong>Produto: </strong>{ata.modelo}
                                    <strong>Descrição:</strong> {ata.descricao}
                                    <strong>Orgão:</strong> {ata.orgao}
                                    <strong>Quantidade:</strong> {ata.quantidade}
                                    <strong>Garantia:</strong> {ata.garantia}
                                    <strong>Validade:</strong> {ata.validade}
                                    <strong>Valor:</strong>
                                    {Intl.NumberFormat(
                                        'pt-BR',
                                        { style: 'currency', currency: 'BRL' }
                                    ).format(ata.valor)}
                                </div>
                                <div>
                                    <button className="btn-edit" onClick={() => { clickEditAta(ata.id_atas); handleProduto(ata.categoria) }}>
                                        <span></span>
                                    </button>
                                    <button className="btn-delete" onClick={() => { deleteAta(ata.id_atas) }}>
                                        <span></span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul id="produtos">
                        {resultProdutos.map(produto => {
                            let isEol = 'Não'
                            if (produto.isEOL) {
                                isEol = 'Sim'
                            }
                            return (
                                <li key={produto.id_produto}>
                                    <div>
                                        <strong>Categoria:</strong> {produto.categoria}
                                        <strong>Modelo:</strong> {produto.modelo}
                                        <strong>Fabricante:</strong> {produto.fabricante}
                                        <strong>Caracteristica:</strong> {produto.caracteristica}
                                        <strong>Link Catalogo:</strong> {produto.catalogo}
                                        <strong>Fora de linha (EOL): {isEol} </strong>
                                        <img src={API_URL + API_IMAGE_PATH + produto.imagem} />

                                    </div>
                                    <div>
                                        <button className="btn-edit" onClick={() => { clickEditProduto(produto.id_produto) }}>
                                            <span></span>
                                        </button>
                                        <button className="btn-delete" onClick={() => { deleteProduto(produto.id_produto) }}>
                                            <span></span>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <ul id="cases">
                        {resultCases.map(cs => (
                            <li key={cs.id}>
                                <div>
                                    <strong>Orgão:</strong> {cs.orgao}
                                    <strong>Categoria:</strong> {cs.categoria}
                                    <strong>Descrição:</strong> {cs.descricao}
                                    <img src={API_URL + API_IMAGE_PATH + cs.imagem} />
                                </div>
                                <div>
                                    <button className="btn-edit" onClick={() => { clickEditCase(cs.id) }}>
                                        <span></span>
                                    </button>
                                    <button className="btn-delete" onClick={() => { deleteCase(cs.id) }}>
                                        <span></span>
                                    </button>
                                </div>
                            </li>
                        )
                        )}
                    </ul>
                    <ul id="parceiros">
                        {resultParceiros.map(parceiro => {

                            let isValid = 'Não'
                            if (parceiro.isValid) {
                                isValid = 'Sim'
                            }
                            return (
                                <li key={parceiro.id}>
                                    <div>
                                        <strong>Nome:</strong> {parceiro.nome}
                                        <strong>Site:</strong> {parceiro.site}
                                        <strong>É valido: {isValid}</strong>
                                        <img src={API_URL + API_IMAGE_PATH + parceiro.imagem} />
                                    </div>
                                    <div>
                                        <button className="btn-edit" onClick={() => { clickEditParceiro(parceiro.id) }}>
                                            <span></span>
                                        </button>
                                        <button className="btn-delete" onClick={() => { deleteParceiro(parceiro.id) }}>
                                            <span></span>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                    <ul id="usuarios">
                        {users.map(user => (
                            <li key={user.id}>
                                <div>
                                    <strong>Usuário:</strong> {user.name};
                                </div>
                                <div>
                                    <button className="btn-edit" onClick={() => { clickEditUser(user.id) }}>
                                        <span></span>
                                    </button>
                                    <button className="btn-delete" onClick={() => { deleteUser(user.id) }}>
                                        <span></span>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {adminAccess ?
                <Logs teste={logsUpdate}></Logs>
                :
                <div></div>
            }


            <div id="loading" className="loading-admin">
                <span></span>
            </div>
        </div>
    )
}