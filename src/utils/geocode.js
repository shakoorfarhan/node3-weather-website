const request = require('request')

const geocode = (address, callback) => {
    const url = 'ur'+address;
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect', undefined)
        } else if(body.features.length == 0) {
            callback('unable to find locaation', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}
geocode('New York', (error, data) => {
    console.log('Error', error);
    console.log('Data', data);
})
module.exports = geocode