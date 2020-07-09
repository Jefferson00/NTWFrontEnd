import React from 'react'
import logoWhite from '../assets/logos/logo-ntw-white.svg'
import facebook from '../assets/icons/facebook.svg'
import linkedin from '../assets/icons/linkedin.svg'
import instagram from '../assets/icons/instagram.svg'
import mail from '../assets/icons/mail.svg'
import room from '../assets/icons/room.svg'
import phone from '../assets/icons/phone.svg'


function Footer(){

    function scrolToTop(){
        window.scroll({
            top:0,
            behavior:'smooth'
        })
    }

    window.onscroll = function (){
        const toTopElement = document.getElementById('toTop')

        if(window.pageYOffset > window.innerHeight){
            toTopElement.style.opacity = 1
        }else{
            toTopElement.style.opacity = 0
        }

    }

    return(
        <footer>
            <div className="inform">
                <div className="social">
                    <h1>SIGA-NOS</h1>
                    <div>
                        <h1>
                            <a href="https://facebook.com">
                                <img src={facebook} alt="facebook"/>
                            </a>
                        </h1>
                        <h1>
                            <a href="https://linkedin.com">
                                <img src={linkedin} alt="linkedin"/>
                            </a>
                        </h1>
                        <h1>
                            <a href="https://instagram.com">
                                <img src={instagram} alt="instagram"/>
                            </a>
                        </h1>
                        <h1>
                            <a href="#">
                                <img src={mail} alt="mail"/>
                            </a>
                        </h1>
                    </div>
                </div>
                <div className="address">
                    <div>
                        <img src={phone} alt="telefone"/>
                        <h2>61 3202-9393</h2>
                    </div>
                    <div>
                        <img src={mail} alt="e-mail"/>
                        <h2>northware@northware.com.br</h2> 
                    </div>
                    <div> 
                        <img src={room} alt="endereço"/>
                        <h2>SCN Quadra 01 Bloco F, Ed. América Office Tower, Sala 501</h2>
                    </div>  
                </div>
            </div>
            <div className="logo-white">
                <img src={logoWhite} alt="logo"></img>
            </div>
            <div id="toTop" className="top">
                <span onClick={() => {scrolToTop()}}></span>
            </div> 
            <div className="copy">
                <p>
                    © Copyright - Northware Serviços e Comercios LTDA
                </p>
            </div>
        </footer>
    )
}

export default Footer;