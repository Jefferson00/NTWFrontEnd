import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function Header() {
    const [logs, setLogs] = useState([]);
    const [users1, setUsers1] = useState([]);

    useEffect(() => {
        api.get('logs').then(response => {
            setLogs(response.data)
        });
        api.get('users').then(response => {
            setUsers1(response.data.filter(user => user.access != 0))
        });

    }, [])


    function setLogsByUser(id) {
        api.get(`logs/${id}`).then(response => {
            setLogs(response.data)
        });
    }

    function setLogsByAll() {
        api.get('logs').then(response => {
            setLogs(response.data)
        });
    }

    function print() {
		
        const element = document.querySelector('#topdf')
        const doc = new jsPDF('p', 'px', 'a4');
		const call = () => {
			doc.save('test.pdf');
		};
		
		doc.fromHTML(element, 10, 10, {}, call);
    }
    
    return (
        <div>
            <div className="logs-content">
                <div className="logs-list" id="topdf">
                    <ul>
                        {logs.map(log => (
                            <li key={log.id_log}>
                                <strong>Usuario:</strong>
                                <p>{log.name}</p>
                                <strong>Ação:</strong>
                                <p>{log.acao}</p>
                                <strong>Tabela:</strong>
                                <p>{log.tabela}</p>
                                <strong>Detalhe:</strong>
                                <p>{log.detalhe}</p>
                                <strong>Data:</strong>
                                <p>{log.data}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="logs-options">
                    <div>
            
                         <button className="btn download" id="btn-pdf" onClick={()=>{print()}}>Salvar PDF</button>
                          
                    </div>
                    <div>
                        <ul>
                            {users1.map(user => (
                                <li key={user.id} onClick={() => { setLogsByUser(user.id) }}>
                                    <strong>Usuario:</strong> {user.name}
                                </li>
                            ))}
                            <li onClick={() => { setLogsByAll() }}>Todos</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}