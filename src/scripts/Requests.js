import { sendCompletion, getRequests, deleteRequest, getPlumbers, getCompletions } from "./dataAccess.js"



export const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()
    let html = "" 
    html += `<li>${request.description}`
    html += `<select class="plumbers" id="plumbers">
            <option value="">Choose</option>
                ${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                    }).join("")
                }
            </select>

            <button class="request__delete"
                id="request--${request.id}">
                Delete
            </button>
        </li>`
    completions.map (completion => {
        if (completion.requestId === request.id){
            html = `<li> ${request.description}
            <button class= "request_delete" id= "request-- ${request.id}">
            Delete
        </button><li>`
        }
    }
    )
    return html
}
// maps and joins all <li> elements together
export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
            ${requests.map(convertRequestToListElement).join("")}
        </ul>
    `
    return html
}

/*
    Now add an event listener to the main container. When the user clicks on any 
    of the delete buttons, invoke the deleteRequest() function you just made above. 
    Make sure you pass the id of the service request to the deleteRequest() function 
    as an argument.
*/

const mainContainer = document.querySelector("#container")
// func detects and deletes an ID
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                1. requestId
                2. plumberId
                3. date_created
            */
            

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                neededBy: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletion(completion)
        }
    }
)