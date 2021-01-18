const request = require("request")

const geocode = (address,callback)=>{
	const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?limit=1&access_token=pk.eyJ1IjoiYW1sYW4xMDEiLCJhIjoiY2tpdDJhOTcyMTMyYzMwbnk2ZDI2c2traSJ9.DTtZu3TNJoeF57DXOr2hyg"
	request({url:geoURL,json:true},(error,response)=>{
		if(error){
			callback("Unable to connect to the network")
		}
		else if(response.body.features.length===0){
			callback("No data available for the given location",undefined)
		}
		else{
			const data = {
				"Longitude" : response.body.features[0].center[0],
				"Latitude" : response.body.features[0].center[1],
				"PlaceName" : response.body.features[0].place_name
			}
			callback(undefined,data)
		}
	})
	//console.log("geocode completed")

}

module.exports = geocode