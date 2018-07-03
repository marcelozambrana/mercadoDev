import React, { Component } from 'react'

import HeaderInterno from './HeaderInterno'

import base, { storage } from './base'
import { Redirect } from 'react-router-dom'

class NovoAnuncio extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            success: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        const file = this.foto.files[0]
        const { name,size } = file  //const name = file.name
        const ref = storage.ref(name)
        ref
            .put(file)
            .then( img => {
                console.log(img)
                const novoAnuncio = {
                    nome: this.nome.value,
                    preco: this.preco.value,
                    descricao: this.descricao.value,
                    telefone: this.telefone.value,
                    vendedor: this.vendedor.value,
                    categoria: this.categoria.value,
                    foto: img.metadata.downloadURLs[0] //'http://placehold.it/200x140'
                }
                
                base.push('anuncios', {
                    data: novoAnuncio
                })
                .then(() => {
                    this.setState({ success: true })
                })        
                console.log(novoAnuncio)
            })
       
        e.preventDefault()
    }
    render(){
        return (
            <div>
                { this.state.success && <Redirect to='/' /> }
                <HeaderInterno />
                <div className="container" style={{paddingTop: '120px'}}>
                    <h1>Novo Anúncio</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='foto'>Foto</label>
                            <input type='file' className='form-control' id='foto' placeholder='Foto' ref={ (ref) => this.foto = ref }/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='nome'>Nome</label>
                            <input type='text' className='form-control' id='nome' placeholder='Nome' ref={ (ref) => this.nome = ref }/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='descricao'>Descrição</label>
                            <input type='text' className='form-control' id='descricao' placeholder='Descrição' ref={ (ref) => this.descricao = ref } />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='preco'>Preço</label>
                            <input type='text' className='form-control' id='preco' placeholder='Preço' ref={ (ref) => this.preco = ref } />
                         </div>
                         <div className='form-group'>
                            <label htmlFor='telefone'>Telefone</label>
                            <input type='text' className='form-control' id='telefone' placeholder='Telefone' ref={ (ref) => this.telefone = ref } />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='vendedor'>Vendedor</label>
                            <input type='text' className='form-control' id='vendedor' placeholder='Vendedor' ref={ (ref) => this.vendedor = ref } />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='categoria'>Categoria</label>
                            <select id='categoria' ref={ (ref) => this.categoria = ref }>
                                { 
                                    this.props.categorias.map( cat => 
                                        <option key={cat.url} value={cat.url}>{cat.categoria}</option> 
                                    )
                                }
                            </select>
                        </div>    
                        <button type='submit' className='btn btn-primary'>Salvar anúncio</button>
                    </form>
                </div>
            </div>
        )}
}

export default NovoAnuncio