import { getRequests, sendCompletion, deleteRequest, getPlumbers, getCompletions } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("delete--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
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
        }
    }
)

const RequestListItem = (request) => {
    const completions = getCompletions()
    const plumbers = getPlumbers()
    const isCompleted = completions.find(completion => completion.requestId ===request.id)

    return `
    <li id="request-${request.id}" ${isCompleted ? "class='completionList'": "class='requestList'"}>
        <div>${request.description}</div>
        ${!isCompleted ?
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
        : ""
        }
        <button class="delete"
                id="delete--${request.id}">
            Delete
        </button>
        
    </li>
`
}


export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()
    
    //Sort the requests array based on the boolean values of the below find functions 
    //(whether or not there is a completion with a matching requestID)
    //This will put the completed ones at the bottom of the array and thus they will render at the end of the HTML list
    
    requests.sort((req1, req2) => {
        const bool2 = completions.find(completion => completion.requestId === req2.id)
        const bool1 = completions.find(completion => completion.requestId === req1.id)
        
        return (bool1 === bool2)
        ? 0 : bool1
        ? 1 : -1;

    });
    

    let html = `
        <ul>
            ${
                requests.map(RequestListItem).join("")
            }
        </ul>
    `
        
    return html
}
