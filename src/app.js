const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public') 

//if you do not want to use name views for the directory then use the following two lines...where templates is the name of directory
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath)

const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))


// app.com
// app.com/help
// app.com/about

app.get('', (req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'KK'
    })
})

app.get('/about',(req,res)=>{
        res.render('about',{
        author:'KK',
        title:'Weather App'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        author:'KK',
        title:'Weather App',
        message:'You will get help here'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
    
        forecast(latitude,longitude,  (error, forecastData) => {
            if (error){
                return res.send({
                    error:error
                })
            }
            console.log(location)
            console.log(forecastData)
            res.send({
                location:location,
                forecast:forecastData
            })
        })
    })


    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide search term'
        })
    }
    res.send({
        products:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errMessage:'Help Article not found',
        author:'KK'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errMessage:'Page not found',
        author:'KK'
    })
})

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'KK',
//         age:'25'
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About Page</h1>')
// })



 


app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})