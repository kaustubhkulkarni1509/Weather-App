const request = require('request')

const forecast = (longitude,latitude,callback) =>{
    const url = 'https://api.darksky.net/forecast/c418469cc73faf9f88aa97187bbc15a9/'+longitude+','+latitude

    request({url:url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to service',undefined)
        }
        else if(response.body.error){
            callback('Can not find the location. Try another search',undefined)
        }else{
            callback(undefined,{
                temperature: response.body.currently.temperature,
                rainpossibility:response.body.currently.precipProbability * 100 
            })
        }

    })

}

module.exports=forecast