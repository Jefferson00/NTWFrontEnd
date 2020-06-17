import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './pages/home/home'
import Atas from './pages/atas/atas'
import Produtos from './pages/produtos/produtos'
import ProdutoDetalhe from './pages/produtos/produtoDetalhe'
import Parceiros from './pages/parceiros/parceiros'
import Cases from './pages/cases/cases'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
            <Route path="/" exact component={Home}/>   
            <Route path="/atas" exact component={Atas}/>   
            <Route path="/produtos" exact component={Produtos}/>   
            <Route path="/produtos/detalhe/:cat" exact component={ProdutoDetalhe}/>   
            <Route path="/parceiros" exact component={Parceiros}/>   
            <Route path="/cases" exact component={Cases}/>   
            </Switch>
        </BrowserRouter>
    )
}

