import { getRequests, sendCompletion, deleteRequest, getPlumbers, getCompletions, deleteCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    } else if (click.target.id.startsWith("completion--")) {
        const [,completionId] = click.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})

mainContainer.addEventListener("change", event => {
        if (event.target.id === "plumbers") {
            const requests = getRequests()
            const [requestId, plumberId] = event.target.value.split("--")
            const currentDate = Date.now()

            //sets starting key-value pairs for completion objects in completions array
            const completion = { 
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: currentDate
            }
            //Performs POST request
            sendCompletion(completion)

            //removes the corresponding request list item from the html
            const requestItemHTML = document.getElementById(`request-${parseInt(requestId)}`)
            requestItemHTML.remove() 

            //change the boolean on request object to true
            const foundRequest = requests.find(request => request.id === parseInt(requestId))
            foundRequest.completed = true


        }
    }
)

const RequestListItem = (request) => {
    const completions = getCompletions()
    const plumbers = getPlumbers()
    const isCompleted = completions.find(completion => completion.requestId ===request.id)
    // if(completions.find(completion => completion.requestId === request.id)){
    //     return
    // }
    return `
    <li id="request-${request.id}" ${
        isCompleted ? `class="completionList"`: `class="requestList"`
    }>
        <div>${request.description}</div>
        ${
            !isCompleted ?
        `<select class="plumbers" id="plumbers">
        <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>`
        : ''
        }
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        
    </li>
`
}


export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()
    
    
    requests.sort((req1, req2) => {
        const bool2 = completions.find(completion => completion.requestId === req2.id)
        const bool1 = completions.find(completion => completion.requestId === req1.id)
        
        return (bool1 === bool2)
        ? 0 : bool1
        ? 1 : -1;

    });
    
    debugger

    let html = `
        <ul>
            ${
                requests.map(RequestListItem).join("")
            }
        </ul>
    `
        
    return html
}
