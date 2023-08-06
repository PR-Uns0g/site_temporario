const CUSTOM_HEADERS = new Headers({ 
    "Accept": 'application/json',
    "Content-Type": 'application/json'
})

export async function sendToDatabase(bodyContent) {
    let options = {
        method: 'POST',
        headers: CUSTOM_HEADERS,
        body: JSON.stringify(bodyContent),
    }

    // Getting a result
    let result = await fetch('https://menir-prod-4zzog2c4tq-uc.a.run.app/api/form_submit', options)
    .then((response) => { return response.json() })
    .catch((error) => { return error; });

    return result;
}