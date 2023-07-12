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

    let result = await fetch("https://formsubmit.co/ajax/0c59797b0de7e626abb17b649f9e8bfa", options)
    .then((response) => { return response.json() })
    .catch((error) => { return error });

    return result;
}