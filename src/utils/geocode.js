const request = require('request')



const geocode = (address, cb) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib2Rhd2FoIiwiYSI6ImNrcGNnbXVpNzAwYXQyb3BoYzBuNHR2Y3AifQ.RA1m1tNH0YIzdDLviJwSlw&limit=1'

    request({url, json: true}, (error,{body}) => {
        if(error){
            cb('unable to connect',undefined)
        }else if (body.features.length === 0){
            cb('unable to find location. try another',undefined)
        }else {
            cb(undefined,{
                lat: body.features[0].center[0],
                long : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode