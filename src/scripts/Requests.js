import { sendCompletion, getRequests, deleteRequest, getPlumbers } from "./dataAccess.js"

export const Requests = () => {
    const requests = getRequests()
    let html = `
        <ul>
            ${requests.map(convertRequestToListElement).join("")}
        </ul>
    `
    return html
}

export const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    return `
    <li class = "desciptions">
        ${request.description}

        <select class="plumbers" id="plumbers">
        <option value="plumbers">Choose</option>
        ${
        plumbers.map(plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }).join("")
        }
        </select>

        <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    </li>
    `
}


/*
    Now add an event listener to the main container. When the user clicks on any 
    of the delete buttons, invoke the deleteRequest() function you just made above. 
    Make sure you pass the id of the service request to the deleteRequest() function 
    as an argument.
*/

const mainContainer = document.querySelector("#container")

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
            const request = requestId
            const plumber = plumberId 
            const date = request.neededBy

            const completion = {
                requestId: request,
                plumberId: plumber,
                neededBy: date
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