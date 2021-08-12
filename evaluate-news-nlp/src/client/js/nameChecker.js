function checkForName(inputText) {
    //console.log("::: Running checkForName :::", inputText);
    const r = new RegExp(/^(ftp|http|https):\/\/[^ "]+$/);
    const result = r.test(inputText);
    console.log(result)
    if (result == false) {
        alert("Please enter a valid URL");
    }


return result;
    
}

export { checkForName }