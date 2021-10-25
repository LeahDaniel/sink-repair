import { ServiceForm } from "./ServiceForm.js"
import { Completions, Requests } from "./Requests.js"


export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>

        <section class="serviceRequests">
            <h2>Service Requests</h2>
            <section class="tabletitles">
                <h4 id="tabletitle-1">Description</h4>
                <h4 id="tabletitle-2">Completed By</h4>
            </section>
            ${Requests()}
            ${Completions()}
        </section>
    `
}


