const CUSTOM_HEADERS = new Headers({
    "Accept": 'application/json',
    "Content-Type": 'application/json'
})

export async function sendToEmail(fields){
    let options = {
        method: 'POST',
        headers: CUSTOM_HEADERS,
        body: JSON.stringify(fields)
    }

    let result = await fetch("https://formsubmit.co/ajax/7de9bedd6cdb98993b57752ef1013a10", options)
    .then((response) => { return response.json() })
    .catch((error) => { return error });

    return result;
}