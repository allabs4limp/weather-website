const request = require('request')

const GeoCode = (address, callback) => {
    const GeoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYWxsYWJzNGxpbXAiLCJhIjoiY2p3YWhkbHJhMDcycjQ4dGwxdXk1ZHRqciJ9.PSxm3kYvN9vZCwTDvlQk9A' 

    request({url: GeoURL, json: true}, (error, response)=> {
        if (error) {
            callback('cannot connect to the Geolocation service', undefined)
        } else if (response.body.features.length === 0){
            callback('Invalid Location', undefined)
        }  else {
            callback(undefined, {
                'longitude': response.body.features[0].center[0],
                'latitude': response.body.features[0].center[1],
                'location' : response.body.features[0].place_name

            })
        }
    })
}


module.exports = GeoCode