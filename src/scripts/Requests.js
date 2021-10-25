import { getRequests, sendCompletion, deleteRequest, getPlumbers, getCompletions, deleteCompletion } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")
const plumbers = getPlumbers()



mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    } else if (click.target.id.startsWith("completion--")) {
        const [,completionId] = click.target.id.split("--")
        deleteCompletion(parseInt(completionId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
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
    if(completions.find(completion => completion.requestId === request.id)){
        return
    }
    return `
    <li id="request-${request.id}">
        <div>${request.description}</div>
        <select class="plumbers" id="plumbers">
        <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>
        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
        
    </li>
`
}

const CompletionListItem = (completion) => {
    const requests = getRequests()
    const foundRequest = requests.find(request => request.id === parseInt(completion.requestId))
    //if statement prevents error when there are no completion objects yet.
    if (!foundRequest) {
        return
    }
    return `
    <li>
        <div>${foundRequest.description}</div>
        <button class="completion__delete"
                id="completion--${completion.id}">
            Delete
        </button>
    </li>
`
}

export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul class="requestList">
            ${
                requests.map(RequestListItem).join("")
            }
        </ul>
    `
        
    return html
}

export const Completions = () => {
    const completions = getCompletions()
    let html = `
        <ul class="completionList">
            ${
                completions.map(CompletionListItem).join("")
            }
        </ul>
    `
        
    return html
}
