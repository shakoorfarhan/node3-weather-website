const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('../src/utils/forecast')

const app = express()

//define path to config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//setup handle bars config
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup static directory
app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'farhan'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about',
        name: 'tom'
    })
})
app.get('/help', (req, res) => {
   res.render('help', {
    help: 'please help me!',
    name: 'farhan',
    title: 'help'
   }) 
})  

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }
    forecast(req.query.address, (error, data) => {
        if(error){
            return res.send({
                error
            })
        }
        console.log(data);
     res.send({
        forecase: data,
        location: '',
        address: req.query.address 
    })
    })
 
})

app.get('/help/*', (req, res) => {
    res.render('notfound', {
        notfoundtext: 'help page not found'
    })
})
app.get('*', (req, res) => {
    res.render('notfound', {
        notfoundtext: 'page not found'
    })
})
app.listen(3000, () => {
    console.log('server is up and running on  port 3000')
})
