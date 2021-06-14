const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectioryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectioryPath));

app.get('', (req, res) => {
    res.render("index", {
        title: 'weather',
        name: 'andrew mead'
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        title: 'about me',
        name: 'andrew mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'can i help you??',
        title: 'help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "you must provide an address"
        })
    }

    geocode(req.query.address, (error, { lat, long,location}={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(lat, long, (error, weather) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: weather,
                location,
                address: req.query.address
            })
        })
    })

   
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render("404", {
        errorMessage: 'help article not found',
        name: 'andrew mead',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'page Not Found',
        name: 'andrew mead',
        title: '404'
    })
})


app.listen(port, () => {
    console.log('server is up on port '+ port)
})