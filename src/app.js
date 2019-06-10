const express = require('express')
const path = require('path')
const hbs = require('hbs')
const GeoCode = require('../src/utils/Geocode')
const Forcast = require('../src/utils/forcast')




const app = express()
const port = process.env.PORT || 3000

const DirectoryPath = path.join(__dirname, '../public')
const ViewsPath = path.join(__dirname, '../templates/views')
const  PartialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', ViewsPath)
hbs.registerPartials(PartialsPath)
 
app.get('', (req, res)=> {
   const data =  {
        title: 'Home' 
    }
    res.render('Index', data)
})

app.get('/about', (req, res)=> {
    const data =  {
        title: 'About'
    }
    res.render('About', data)
})

app.get('/help', (req, res)=> {
    const data =  {
        title: 'Help'
    }
    res.render('Help', data)
})


app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter the address'
        })
    }

    GeoCode(req.query.address, (error, Georesponse) => {
        if (error) {
            return res.send({
                error: 'Invalid Search Criterium'
            })
        } else {
            Forcast(Georesponse.longitude, Georesponse.latitude, (error, ForcastResponse) => {
                if (error) {
                    return res.send({
                        error: 'Invalid Search criteria'
                    })
                } else {
                   // res.send('The Temperature in ' + req.query.address + ' is' + ForcastResponse.temperature + ' and  The chance of it raining is ' + ForcastResponse.RainProb)
                 
                   res.send({
                        temperature: ForcastResponse.temperature,
                        RainProb: ForcastResponse.RainProb,
                        summary: ForcastResponse.summary
                    })
                }
            })
        }

    })

})

app.get('/products',  (req, res) => {
    if (!req.query.search) {
        return  res.send({
            error: 'You must enter a serch term'
        })
    }
   

    res.send({
        products: []
    })
})

app.get('*',  (req, res) => {
res.send('Error 404 page')
})
 
app.listen(port, () => {
    console.log('Server started at port ' + port )
})