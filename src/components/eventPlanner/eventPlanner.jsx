import { useState } from "react"

const EventApp = () => {
    const [events, setEvents] = useState ([
        {
            id: crypto.randomUUID(),
            start: 123,
            end: 456,
            title: "Title 1",
            description: "Konsert jaaow",
            // owner: currentUser
        },
        {
            id: crypto.randomUUID(),
            start: 2626,
            end: 2727,
            title: "Title 2",
            description: "Foodfight",
            // owner: currentUser
        }
    ])

    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    // const [owner, setOwner] = ("")

    const userSubmit = (e) => {
        e.preventDefault()

        const newEvent = {
            id: crypto.randomUUID(),
            start,
            end,
            title,
            description,
            // owner
        }

        setEvents(oldArray => 
        [...oldArray, newEvent].sort((eventA, eventB) => new Date(eventA.start) - new Date(eventB.start))
        )

        setStart("")
        setEnd("")
        setTitle("")
        setDescription("")
    }

    return(
        <div>
            <div>
                <form onSubmit={userSubmit}>
                    <label htmlFor="eventStart">Start-tid: </label>
                    <input type="datetime-local" id="eventStart" value={start} onChange={(e) => setStart(e.target.value)} required/>

                    <label htmlFor="eventEnd">Slut-tid: </label>
                    <input type="datetime-local" id="eventEnd" value={end} onChange={(e) => setEnd(e.target.value)} required/>

                    <label htmlFor="eventTitle">Titel: </label>
                    <input type="text" name="eventTitle" id="eventTitle" value={title} onChange={(e) => setTitle(e.target.value)} required/>

                    <label htmlFor="eventDesc">Kort beskrivning av eventet: </label>
                    <textarea name="eventDesc" id="eventDesc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beskriv kortfattat eventet" rows={7} cols={40} required></textarea>

                    <button type="submit">Lägg till event</button>
                </form>
            </div>

            <div>
                <ul>
                    {events.map(event => {
                        return(
                            <li key={event.id}>
                                <h3>{event.title}</h3>
                                <span>Event start: {new Date(event.start).toLocaleString()}<br />Event end: {new Date(event.end).toLocaleString()}</span>
                                <p>{event.description}</p>
                            </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}

export default EventApp