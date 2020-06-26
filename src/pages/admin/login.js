import React, {useState} from 'react'
import './admin.css'
import logoImg from '../../assets/logos/logo-ntw.png'
import logoW from '../../assets/logos/Logo-w.png'
import api from '../../services/api';
import {useHistory} from 'react-router-dom'

export default function Login(){
    const [name, setNome] = useState('');
    const [password, setSenha] = useState('');
    const history = useHistory();

    async function login(e){
        e.preventDefault();
        try {
            const response = await api.post('login', {name, password});
          
            localStorage.setItem('Userid',response.data.user.id); 
            localStorage.setItem('name',response.data.user.name);

            const TOKEN = `Bearer ${response.data.token}`
            
            api.defaults.headers.common['Authorization'] = TOKEN;
            localStorage.setItem('token', TOKEN)

            history.push('/admin/index')

        } catch (error) {
            alert('Usuario ou senha incorreto')
        }
    }

    return(
    <div>
        <div className="main-content">
            <div className="main-content-div">
                <header className="header-admin">
                    <div>
                        <img src={logoW}/>
                    </div>
                    <div>
                        <h3>PAINEL ADMINISTRATIVO</h3>
                    </div>
                </header>

            <div className="main-content-div-login">
                    <div className="main-content-login">
                        <div>
                            <img src={logoImg}/>
                        </div>
                        <div className="contact-form">
                            <form onSubmit={login}>
                                <label>Usuário</label>
                                <input type="text" value={name} onChange={e =>setNome(e.target.value)}/>
                                <label>Senha</label>
                                <input type="password" value={password} onChange={e =>setSenha(e.target.value)}/>
                                <input type="submit" value="ENTRAR"/>
                            </form>
                        </div>
                    </div>
            </div>
                
            </div>
        
        </div>
        
    </div>
    )
}