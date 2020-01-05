console.log('cliend side java script loaded')

fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


fetch('http://localhost:3000/weather?address=San%20Francisco').then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            console.log(data.error)
        }
        else{
            console.log(data.location)
            console.log(data.forecast)
        }
        
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value
    const url = 'http://localhost:3000/weather?address=' + location
    messageOne.textContent = ''
    messageTwo.textContent = ''
    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if (data.error){
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else{
                console.log(data.location)
                messageOne.textContent = data.location
                console.log(data.forecast)
                messageTwo.textContent = 'Todays temperature is ' + ' ' +data.forecast.temperature
            }
        })
    })
    console.log(location)
})