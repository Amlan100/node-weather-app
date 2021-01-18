const request = require("request")

const forecast = (lat,longi,callback)=>{
	
	const url = "http://api.weatherstack.com/current?access_key=25376582424c855dbbd3e1f8ed0b2f40&units=m"+"&query="+lat+","+longi

	//console.log(url)

	request({url,json:true},(error,response)=>{
		if(error){
			callback("Unable to fetch weather data")
		}
		else if(response.body.error){
			callback("No weatherr data is available for the given location")
		}
		else{
			const {temperature,precip:precipitation,is_day:daytime,} = response.body.current
			const data = {
				temperature,
				precipitation,
				daytime,
				currentTime: response.body.location.localtime,
				desc: response.body.current.weather_descriptions[0]
			}
			callback(undefined,data)
		}
	})
	//console.log("forecast completed")
} 

module.exports = forecast