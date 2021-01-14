import api from '../services/api';

/**Funções utilizadas na página Admin */
function itsLoaded(){
    const loading = document.getElementById('loading')
    loading.style.display = "none"
}

function showLogs(){
    const logsContent = document.querySelector('.logs-content')
    logsContent.style.display = "flex"
    logsContent.scrollIntoView({behavior:'smooth'})
}

function verifyUser(id, history) {
    //let output
    return api.get(`users/${id}`).then(response => {
        const userLogged = response.data
        let output = false
        if(userLogged.access == 0){
            output = true
        }else{
            output = false
        }
        return output
    }, error => {
        if (error) {
            history.push('/admin')
            return false
        }
    })
}

function selectItemMenu(){
    /* menu de seleção dos itens */
    const itensAdmin = document.querySelectorAll('.itens-admin >div')
    const formsAdmin = document.querySelectorAll('.contact-form.grid form')
    const lists = document.querySelectorAll('.content-list.grid ul')

    /*função que muda os formularios e tabelas com base no item clicado*/

    for (var i = 0; i < itensAdmin.length; i++) {
        (function (i) {
            itensAdmin[i].addEventListener('click', function () {
                //clearInputs()
                for (var x = 0; x < itensAdmin.length; x++) {
                    if (x != i) {
                        itensAdmin[x].classList.remove('item-selected')
                    }
                }
                itensAdmin[i].classList.add('item-selected')
                for (var t = 0; t < formsAdmin.length; t++) {
                    if (formsAdmin[t].id === itensAdmin[i].id) {
                        formsAdmin[t].classList.add('active')
                    }
                    else {
                        formsAdmin[t].classList.remove('active')
                    }
                }
                for (var y = 0; y < lists.length; y++) {
                    if (lists[y].id === itensAdmin[i].id) {
                        lists[y].classList.add('active')
                    } else {
                        lists[y].classList.remove('active')
                    }
                }
            })
        })(i);
    }
}

async function createLog(log, idLogged){
    try {
        const id_user = idLogged
        const acao = log.acao
        const tabela = log.tabela
        const detalhe = JSON.stringify(log.detalhe)
        const data = {id_user,acao,tabela,detalhe}
        await api.post('logs',data)
    } catch (error) {
        alert('Erro no log')
    }
}

function buttonEditUserDisable() {
    const btnEdit = document.getElementById("btn-edit")
    btnEdit.style.display = "none"
}

function buttonEditAtaDisable() {
    const btnEdit = document.getElementById("btn-edit-ata")
    const btnCancel = document.getElementById("btn-cancel-ata")
    btnEdit.style.display = "none"
    btnCancel.style.display = "none"
}

function buttonEditProdutoDisable() {
    const btnEdit = document.getElementById("btn-edit-produto")
    const btnCancel = document.getElementById("btn-cancel-produto")
    btnEdit.style.display = "none"
    btnCancel.style.display = "none"
}

function buttonEditCaseDisable() {
    const btnEdit = document.getElementById("btn-edit-case")
    btnEdit.style.display = "none"
}

function buttonEditParceiroDisable() {
    const btnEdit = document.getElementById("btn-edit-parceiro")
    const btnCancel = document.getElementById("btn-cancel-parceiro")
    btnEdit.style.display = "none"
    btnCancel.style.display = "none"
}


/**FUNÇÕES DA PÁGINA PRINCIPAL */

function slider(){
    /*Slider*/
    const slider = document.querySelector('.slider');
    const carousel = document.querySelector('.carousel');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    var direction;
    if (slider != null) {
        var cont = 0
        window.addEventListener('load', function () {

            this.setInterval(() => {
                direction = -1;

                carousel.style.justifyContent = 'flex-start';
                slider.style.transform = 'translate(-33.4%)';

            }, 5000)

        })

        prev.addEventListener('click', function () {
            if (direction === -1) {
                slider.appendChild(slider.firstElementChild);
                direction = 1;
            }

            slider.style.transform = 'translate(33.4%)';
            carousel.style.justifyContent = 'flex-end';
        });

        next.addEventListener('click', function () {
            direction = -1;

            carousel.style.justifyContent = 'flex-start';
            slider.style.transform = 'translate(-33.4%)';
        });

        slider.addEventListener('transitionend', function () {
            if (direction === -1) {
                slider.appendChild(slider.firstElementChild);
            } else if (direction === 1) {
                slider.prepend(slider.lastElementChild);
            }


            slider.style.transition = 'none';
            slider.style.transform = 'translate(0)';
            setTimeout(function () {
                slider.style.transition = 'all 0.8s';
            })
        })
    }
}

function animationCasesItem(){
    const linkCases = document.querySelectorAll('.cases a')
        //const classes = ['case-animated','case-animated2']
        linkCases.forEach(element => {
            element.addEventListener('mouseover', () => {
                element.parentElement.parentElement.childNodes.item(0).style.color = "#ffffff"
                element.parentElement.parentElement.childNodes.item(1).style.color = "#ffffff"
                element.parentElement.parentElement.childNodes.item(3).style.opacity = "1"
                element.parentElement.parentElement.childNodes.item(3).classList.add('case-animated2')
            })
            element.addEventListener('mouseout', () => {
                element.parentElement.parentElement.childNodes.item(0).style.color = "#757272"
                element.parentElement.parentElement.childNodes.item(1).style.color = "#757272"
                element.parentElement.parentElement.childNodes.item(3).style.opacity = "0"
                element.parentElement.parentElement.childNodes.item(3).classList.remove('case-animated2')
            })
        })
}

function animationProductsItem(){
    const linkProdutos = document.querySelectorAll('.desc-produto a')
    linkProdutos.forEach(element =>{
            const descProd = element.parentElement.parentElement.childNodes.item(1)
            const background = element.parentElement.parentElement.childNodes.item(2)
            const h3 = descProd.childNodes.item(0)
            const p = descProd.childNodes.item(1)
        element.addEventListener('mouseover', ()=>{
            background.style.opacity = "1"
            h3.style.color = "#ffffff"
            p.style.color = "#ffffff"
            background.classList.add('produto-animated')
        })
        element.addEventListener('mouseout', ()=>{
            background.style.opacity = "0"
            h3.style.color = "#565656"
            p.style.color = "#818181"
            background.classList.remove('produto-animated')
        })
        })
}

function responsiveMenu(headerId){
    //Menu responsivo
    let show = true;
    const header = document.getElementById(headerId)
    const menuToggle = header.querySelector(".menu-toggle")

    menuToggle.addEventListener("click", () =>{
        document.body.style.overflow = show ? "hidden" : "initial"
        header.classList.toggle("on", show)
        show = !show
    })
}

export default{
    itsLoaded,
    showLogs,
    verifyUser,
    selectItemMenu,
    createLog,
    buttonEditUserDisable,
    buttonEditAtaDisable,
    buttonEditProdutoDisable,
    buttonEditCaseDisable,
    buttonEditParceiroDisable,
    slider,
    animationCasesItem,
    animationProductsItem,
    responsiveMenu,
}