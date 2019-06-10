const request = require('request')


const GetForcast = (Longitude, latitude, callback) => {

const url = 'https://api.darksky.net/forecast/e384288400ec36206698512ab2ee3401/' + Longitude + ',' + latitude
request({url: url, json: true}, (error, response) => {
    if (error) {
        callback('Unable to connect to weather service', undefined)  
    } else if (response.body.error) 
    {
        callback('Cannot find location, please check parameters', undefined) 
    } else {
        callback(undefined, {
            'temperature': response.body.currently.temperature,
            'RainProb': response.body.currently.precipProbability,
            'summary': response.body.daily.data[0].summary
        })   
    } 
}) 
}

module.exports = GetForcast