const CUSTOM_HEADERS = new Headers({ 
    "Accept": 'application/json',
    "Content-Type": 'application/json'
})

export async function sendToDatabase(bodyContent) {
    let options = {
        method: 'POST',
        /*
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        credentials: "same-origin", // include, *same-origin, omit
        */
        headers: CUSTOM_HEADERS,
        body: JSON.stringify(bodyContent),
    }

    // Getting a result
    let result = await fetch('https://menir-flask-4zzog2c4tq-uc.a.run.app/api/form_submit', options)
    .then((response) => { return response.json() })
    .catch((error) => { return error; });

    return result;
}