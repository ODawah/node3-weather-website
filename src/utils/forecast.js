const request = require('request')


const forecast = (lat, long, cb) => {
    const url = `http://api.weatherstack.com/current?access_key=4fd0fa002c37550c140b584e13f2a2f9&query=${lat},${long}&units=f`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            cb('unable to connect', undefined)
        } else if (body.error) {
            cb('invalid lat and long', undefined)
        } else {
            cb(undefined, body.current.weather_descriptions[0]+ " it's currently " + body.current.temperature + "The Humdity is " + body.current.humidity)
        }
    })

}


module.exports = forecast