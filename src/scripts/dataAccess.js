const mainContainer = document.querySelector("#container")

const applicationState = {
    requests: [],
    completions: [],
    plumbers: [
        {
            "id": 1,
            "name": "Maude"
        },
        {
            "id": 2,
            "name": "Merle"
        }
    ],
}

const API = "http://localhost:8088"

export const fetchData = () => {
    fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (serviceRequests) => {
            // Store the external state in application state
            applicationState.completions = serviceRequests
        }
    )
}

// export const fetchPlumbers = () => {
//     return fetch(`${API}/plumbers`)
//         .then(response => response.json())
//         .then(
//             (plumbersAPI) => {
//                 // Store the external state in application state
//                 applicationState.plumbers = plumbersAPI
//             }
//         )
// }

// export const fetchCompletions = () => {
//     return fetch(`${API}/completions`)
//         .then(response => response.json())
//         .then(
//             (serviceCompletions) => {
//                 // Store the external state in application state
//                 applicationState.completions = serviceCompletions
//             }
//         )
// }

export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}

export const getCompletions = () => {
    return applicationState.completions.map(plumber => ({ ...plumber }))
}

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

export const deleteRequest = (id) => {
    console.log(`Deleting request ${id}`)
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const deleteCompletion = (id) => {
    console.log(`Deleting completion ${id}`)
    return fetch(`${API}/completions/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}