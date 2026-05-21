const express = require('express')
const app = express()
const port = 3000

//produtos
let produtos = [
    { id: 1, nome: 'Shampoo' },
    { id: 2, nome: 'Condicionador'},
    { id: 3, nome: 'Barbeador eletrico',},
    { id: 4, nome: 'Gilete'},
    { id: 5, nome: 'Creme dental'},
]
 
//use json
app.use(express.json())

//pagina principal loja
app.get(`/`, (req, res) =>{
    res.send("Página principal da loja")
})

//pagina produtos
app.get(`/produtos`, (req, res) =>{
    res.send("Página produtos da loja")
})

//listando produtos
app.get('/produtos', (req, res) => {
    res.json(produtos)
})

//Pesquisa produtos
app.get(`/pesquisa`, (req,res)=>{
    const produto = req.query.produto
    res.status(201).json(
        {resultado: `Produto pesquisado: ${produto}`}
    )
})

//pesquisando produtos
app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    const produto = produtos.find(idPro => idPro.id === id)
    if(!produto){
        return res.status(404).json({
            erro: 'Produto não encontrado'
        })
    }
    res.json(produto) 
})

//adicionando produtos
app.post('/produtos',(req,res)=>{
    const novoproduto = req.body
    produtos.push(novoproduto)
    res.status(201).json({
        Mensagem : "Novo produto cadastrado",
        produto: novoproduto
    })
})

//apagando produtos
//Excluindo alunos
app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    produtos = produtos.filter(idPro => idPro.id !== id)
    res.json({
        mensagem: 'Produto removido'
    })
})

//executando
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})