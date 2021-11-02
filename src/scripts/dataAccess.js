const mainContainer = document.querySelector("#container")
const API = "http://localhost:8088"

const applicationState = {
    requests: [],
    completions: [],
    plumbers: []
}
//Copies of data
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}
export const getCompletions = () => {
    return applicationState.completions.map(job => ({ ...job }))
}

//Fetch
export const fetchData = () => {
    fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
    fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (plumbersAPI) => {
                // Store the external state in application state
                applicationState.plumbers = plumbersAPI
            }
        )
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completionsAPI) => {
                // Store the external state in application state
                applicationState.completions = completionsAPI
            }
        )
}
//POST
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        //? What are the headers and body doing below? //
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}
//POST
export const sendCompletion = (completedRequest) => {
    const fetchOptions = {
        method: "POST",
        //? What are the headers and body doing below? //
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedRequest)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })

}
//DELETE
export const deleteRequest = (id) => {
    console.log(`Deleting request ${id}`)
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}