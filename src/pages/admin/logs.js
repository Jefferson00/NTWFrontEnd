import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import 'jspdf-autotable'
import jsPDF from 'jspdf'
import UserIcon from '../../assets/icons/user-icon.svg'

export default function Header({teste}) {
    const [logs, setLogs] = useState([]);
    const [users1, setUsers1] = useState([]);
    let tst = teste

    useEffect(() => {
        api.get('logs').then(response => {
            setLogs(response.data)
        });
        api.get('users').then(response => {
            setUsers1(response.data.filter(user => user.access != 0))
        });
    }, [tst])


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
		
        //const element = document.querySelector('#topdf')
        const doc = new jsPDF('landscape ', 'px', 'a4', true);
        doc.autoTable({
            html :'#topdf',
            startY: false,
            theme: 'grid',
            tableWidth: 'fixed',
            columnWidth: 'wrap',
            showHeader: 'everyPage',
            tableLineColor: 200,
            tableLineWidth: 0,
            columnStyles: {
                3: {
                  columnWidth: 'auto'
                }
              },
            styles: {
                overflow: 'linebreak',
                columnWidth: 'wrap',
                font: 'arial',
                fontSize: 10,
                cellPadding: 2,
                overflowColumns: 'linebreak'
            }
        
        })
        //doc.text(20, doc.lastAutoTable.finalY, 'Lista de Logs')
        
        /*const call = () => {
			doc.save('logs.pdf');
        };*/
        
        doc.save('logs.pdf');
		
		//doc.fromHTML(element, 10, 10, {}, call);
    }
    
    return (
        <div>
            <div className="logs-content">
                <div className="logs-list" >
                    <table id="topdf">
                        <thead>
                            <tr>
                                <th style={{width:"15%"}}>
                                    Usuario
                                </th>
                                <th style={{width:"15%"}}>
                                    Ação
                                </th>
                                <th style={{width:"15%"}}>
                                    Tabela
                                </th>
                                <th style={{width:"40%"}}>
                                    Detalhe
                                </th>
                                <th style={{width:"15%"}}>
                                    Data
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {logs.map(log=>{
                                    
                                    var dt = new Date(log.data)
                                    return(
                                    <tr key={log.id_log}>
                                        <td>{log.name}</td>
                                        <td>{log.acao}</td>
                                        <td>{log.tabela}</td>
                                        <td>{log.detalhe}</td>
                                        <td>
                                            {dt.getDate()} / {dt.getMonth()+1} / {dt.getFullYear()}<br></br>
                                            {dt.getHours()}:{dt.getMinutes()}:{dt.getSeconds()}
                                        </td>
                                    </tr>
                                )})}
                        </tbody>
                    </table>
                </div>
                <div className="logs-options">
                    <div>
                        <strong>Usuários</strong>
                        <ul>
                            {users1.map(user => (
                                <li key={user.id} onClick={() => { setLogsByUser(user.id) }} className="logs-user-li">
                                      <img src={UserIcon} alt="user" />
                                     {user.name}
                                </li>
                            ))}
                            <li onClick={() => { setLogsByAll() }} className="logs-user-li all">Todos</li>
                        </ul>
                    </div>
                    <div>
            
                         <button className="btn download" id="btn-pdf" onClick={()=>{print()}}>Salvar PDF</button>
                          
                    </div>
                </div>
            </div>
        </div>
    )
}