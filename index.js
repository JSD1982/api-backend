const express = require( 'express' )
const cors = require('express')

const app = express()

app.use(cors())
app.use( express.json() )
//app.use( logger)
let items = [
    {
        "id": 1,
        "content": "aca content 2",
        "date": "2019-05-",
        "background": "http",
        "active": true
    },
    {
        "id": 2,
        "content": "aca content",
        "date": "2019-05-",
        "active": true
    },
    {
        "id": 3,
        "content": "aca content",
        "date": "2019-05-",
        "active": true
    }
]

// const app = http.createServer( ( request, response ) =>
// {
//     response.writeHead( 200, { 'Content-Type': 'application/json' } )
//     response.end(JSON.stringify(items))
// } )

app.get( '/', ( request, response ) =>
{
    response.send('<h1>Hello world</h1>')
} )
app.get( '/items', ( request, response ) =>
{
    response.json(items)
} )
// app.get( '/api/items/:id', ( request, response ) =>
// {
//     const id = Number(request.params.id)
//     const item = items.find( item => item.id === id )
//     if ( item )
//     {
//         response.json( item )
//     } else
//     {
//         response.status(404).end()
//     }
    
// } )

app.post( '/items', ( request, response ) =>
{
    const item = request.body
    if ( !item.content )
    {
        return response.status( 400 ).json( {
            error: 'content requerido'
        })
    }
    const ids = items.map( item => item.id )
    const maxId = Math.max( ...ids )
    const newItem = {
        id: maxId + 1,
        qr: item.qr,
        name: item.name,
        email: item.email,
        content: item.content,
        background: item.background,
        active: item.active || false,
        date: new Date().toISOString()
    }
    items = [ ...items, newItem]
    response.json( newItem)
} )




app.delete( '/items/:id', ( request, response ) =>
{
    const id = Number( request.params.id )
    items = items.filter( item => item.id != id )
    
   
    response.status(204).end()

} )


const PORT = process.env.PORT || 3002
app.listen( PORT, () =>{
    console.log( 'server runing in port ' + PORT )
} )
