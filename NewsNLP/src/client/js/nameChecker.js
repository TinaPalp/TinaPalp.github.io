function checkForName(userData) {
    console.log("::: Running checkForName :::", userData);
    const checkResult = userData.match(/^(http|https):\/\/[^ "]+$/);
    console.log(checkResult!==null)
    return checkResult!==null;
}

export { checkForName }