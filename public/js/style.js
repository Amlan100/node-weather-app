console.log("Client side javascript is running")




const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")

const p1 = document.querySelector("#m1")
const p2 = document.querySelector("#m2")


weatherForm.addEventListener("submit",(e)=>{
	e.preventDefault()
	const location = searchElement.value
	p1.style.color = "#2F4F4F"
	p1.textContent = "Loading..."
	p2.textContent = ""
	fetch("/weather?address="+location).then((response)=>{
	response.json().then((data)=>{
		console.log(data)
		if(data.error){
			p1.textContent = data.error
			p1.style.color = "red"
			p2.textContent = ""
		}
		else{
			p1.textContent = "Location is "+data.location
			p2.textContent = "The temperature is "+data.temperature+"\u00B0 C as of "+data.currentTime+". The weather is "+data.description+"."
		}
	})
})
})