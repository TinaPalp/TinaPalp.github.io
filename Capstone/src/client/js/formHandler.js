  import { getCountdown } from "./getCountdown";

document.getElementById('submit').addEventListener('click', generateOutput);

function generateOutput(e) {  
    e.preventDefault()
    const destination = document.getElementById('city').value;
    console.log(destination)
    console.log(date)


    //event.preventDefault();
    // check what text was put into the form field
    //let userInput = document.getElementById('name').value;
    const data = {destination, date}
    //if (Client.checkForName(userInput)) 
    fetch('http://localhost:8081/text', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json()) 
            .then(function (res) {
                console.log(res)
                updateUI(res)        


            }) 

}




 

function updateUI(res) {

    const countdown = getCountdown()
    const result = document.getElementById("results")
    const weatherResult = document.getElementById("weather")
    const cityResult = document.getElementById("destinationResult")

    if (countdown[0] > 1){

        cityResult.innerHTML = "Your trip to " +  res[1].city + "will start in " + countdown[0] + " days and has a duration of " + countdown[1] + " days"
        document.getElementById("myImg").src = res[2].img;
        document.getElementById("myImg").alt = "Picture of " + res[1].city;
        weatherResult.innerHTML = "Now it has " + res[0].temp + "° and it is " + res[0].weather
    }
    else {
        cityResult.innerHTML = countdown
    }
    

    result.scrollIntoView({ behavior: "smooth" })

}

export { generateOutput }
export { updateUI }
