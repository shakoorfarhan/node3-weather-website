const request = require('request')

const forecast = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=55f0782d8a604f03293e9124b3c8c7f4&query='+address+'&units=f';
    request({url, json: true}, (error, {body}) =>{
        if(error) {
            callback('unable to connect to weatherstack', undefined)
        } else if (body.error) {
            callback('unable to get predictions', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0]+' it is ' + body.current.temperature + ' degrees outside but feels like '+body.current.feelslike)
        }
    })
}

module.exports = forecast