import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/home/home'
import Atas from './pages/atas/atas'
import Produtos from './pages/produtos/produtos'
import ProdutoDetalhe from './pages/produtos/produtoDetalhe'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Home}/>   
            <Route path="/atas" exact component={Atas}/>   
            <Route path="/produtos" exact component={Produtos}/>   
            <Route path="/produtos/detalhe" exact component={ProdutoDetalhe}/>   
            </Switch>
        </BrowserRouter>
    )
}

