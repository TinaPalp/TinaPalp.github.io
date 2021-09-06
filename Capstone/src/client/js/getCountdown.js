function getCountdown() {
    const date = document.getElementById('date').value;
    const enddate = document.getElementById('enddate').value;
    const parts =date.split('-');
    const endparts =enddate.split('-');
    const inputDate = new Date(parts[0], parts[1] - 1, parts[2], '06'); 
    const endDate = new Date(endparts[0], endparts[1] - 1, endparts[2], '06'); 
    console.log(inputDate)
    const today = new Date();
    const timeDiff = Math.round((inputDate.getTime() - today.getTime())  / (1000 * 60 * 60 * 24));
    const tripLength = Math.round((endDate.getTime() - inputDate.getTime())  / (1000 * 60 * 60 * 24)) + 1;
    console.log("it is" + timeDiff + "days away")

    if (timeDiff < 0) {
        return [timeDiff, tripLength]
    } else {
        return `Trip is expired`
    }
}

export { getCountdown }