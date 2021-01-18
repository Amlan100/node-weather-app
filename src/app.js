const path = require("path")
const express = require("express")
const app = express()
const hbs = require("hbs")

//importing geocode and forecast
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")
//define paths for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//setup handlebars engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

console.log(__dirname)

console.log(path.join(__dirname,"../public"))

app.get("",(req,resp)=>{
	resp.render("index",{
		title: "Weather",
		name: "Amlan"
	})
})

app.get("/help",(req,resp)=>{
	resp.send([{
		name : "Amlan",
		age : 25,
		place : "Tiniali"
	},
	{
		name : "Kuki",
		age : "23",
		place : "Amtola"
	}])
})

app.get("/about",(req,resp)=>{
	resp.render("about",{
		subject: "About the app",
		title: "Gitu" 
	})
})


app.get("/weather",(req,resp)=>{
	if(!req.query.address){
		resp.send({
			error: "Please enter an address to fetch the weather data"
		})
	}
	else{
		geocode(req.query.address,(err,data)=>{
			if(err){
				resp.send({
					error: err
				})
			}
			else{
				const location = data.PlaceName
				forecast(data.Latitude,data.Longitude,(err,data)=>{
					if(err){
						resp.send({
							error:err
						})
					}
					else{
						resp.send({
							location,
							currentTime: data.currentTime,
							temperature: data.temperature,
							description: data.desc
						})
					}
				})
			}
		})
	}
})

//query testing
app.get("/products",(req,resp)=>{
	console.log(req.query)
	if(!req.query.product){
		resp.send({
			error: "Please insert a product name in the query"
		})
	}
	else{
		resp.send({
			products: ["games","clothes"],
			ratings: [5,4]
		})
	}
	
})

app.get("/help/*",(req,resp)=>{
	resp.render("err",{
		name: "404",
		msg: "Help article not found",
		title: "Amlan"
	})
})

app.get("*",(req,resp)=>{
	resp.render("err",{
		name: "404",
		msg: "Page not found",
		title: "Amlan"
	})
})

app.listen(3000,()=>{
	console.log("Server is up and running on port 3000")
})