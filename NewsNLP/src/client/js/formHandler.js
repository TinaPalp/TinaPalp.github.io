function handleSubmit(event) {
    event.preventDefault();
    // check what text was put into the form field
    let userInput = document.getElementById('name').value;
    const data = {
        userInput
    }
    if (Client.checkForName(userInput)) {
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
                document.getElementById('score_tag').innerHTML = 'Result Score: ' + res.score_tag;
                document.getElementById('irony').innerHTML = 'Result Irony: ' + res.irony;
                document.getElementById('agreement').innerHTML = 'Result Agreement: ' + res.agreement;
                document.getElementById('subjectivity').innerHTML = 'Result Subjectivity: ' + res.subjectivity;
                document.getElementById('confidence').innerHTML = 'Result Confidence: ' + res.confidence;
            })
    } else {
        alert ('Please enter a valid URL')
    };
}

export { handleSubmit }