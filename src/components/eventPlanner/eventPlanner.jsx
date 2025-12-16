import { useState } from "react"
import "./eventPlanner.css"

const EventPlanner = () => {
    const [events, setEvents] = useState ([
        {
            id: crypto.randomUUID(),
            start: "1970-01-01 13:00",
            end: "1970-01-01 13:00",
            title: "Title 1",
            description: "Konsert jaaow",
            // owner: currentUser
        },
        {
            id: crypto.randomUUID(),
            start: "1970-01-01 13:00",
            end: "1970-01-01 13:00",
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
    const [selectedToEdit, setSelectedToEdit] = useState(null)
    const [eventFilter, setEventFilter] = useState("all")

    const userSubmit = (e) => {
        e.preventDefault()

        if (selectedToEdit === null) {
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
        } else {
            setEvents(oldArray => 
                oldArray.map(event => event.id === selectedToEdit ? {...event, start, end, title, description} : event)
                .sort((eventA, eventB) => new Date(eventA.start) - new Date(eventB.start))
            )

            setSelectedToEdit(null)
        }

        setStart("")
        setEnd("")
        setTitle("")
        setDescription("")
    }

    const updateEvent = (editEvent) => {
        setSelectedToEdit(editEvent.id)
        setStart(editEvent.start)
        setEnd(editEvent.end)
        setTitle(editEvent.title)
        setDescription(editEvent.description)
    }

    const cancelEdit = () => {
        setSelectedToEdit(null)
        setStart("")
        setEnd("")
        setTitle("")
        setDescription("")
    }

    const removeEvent = (id) => {
        setEvents(oldArray => oldArray.filter(event => event.id !== id))
    }

    const eventStatus = (event) => {
        const now = new Date()
        const start = new Date(event.start)
        const end = new Date(event.end)
        if (start > now) return "upcoming"
        if (end < now) return "past"
        return "ongoing"
    }

    const sortEvent = events
    .map(event => ({...event, status: eventStatus(event)}))
    .filter(event => {
        if (eventFilter === "all") return true
        return event.status === eventFilter
    })
    .sort((eventA, eventB) => {
        const eventOrder = { upcoming: 0, ongoing: 1, past: 2 }
        if (eventOrder[eventA.status] !== eventOrder[eventB.status]) {
            return eventOrder[eventA.status] - eventOrder[eventB.status]
        }
        return new Date(eventA.status) - new Date(eventB.status)
    })

    return(
        <div className="main-div">
            <div className="form-div">
                <form className="form-container" onSubmit={userSubmit}>
                    <div className="submit-1">
                        <div className="start-div">
                            <label htmlFor="eventStart">Start-tid: </label>
                            <input type="datetime-local" id="eventStart" value={start} onChange={(e) => setStart(e.target.value)} required/>
                        </div>

                        <div className="end-div">
                            <label htmlFor="eventEnd">Slut-tid: </label>
                            <input type="datetime-local" id="eventEnd" value={end} onChange={(e) => setEnd(e.target.value)} required/>
                        </div>

                        <div className="title-div">
                            <label htmlFor="eventTitle">Titel: </label> 
                            <input type="text" name="eventTitle" id="eventTitle" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                    </div>

                    <div className="submit-2">
                        <div className="description-div">
                            <label htmlFor="eventDesc"></label>
                            <textarea name="eventDesc" id="eventDesc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beskriv kortfattat eventet" rows={7} cols={40} required></textarea>
                        </div>

                        <div className="button-div">
                            <button type="submit" className="add-button">{selectedToEdit === null ? "Lägg till event" : "Spara ändringar"}</button>
                            {selectedToEdit !== null && (<button type="button" className="cancel-button" onClick={cancelEdit}>Avbryt redigering</button>)}
                        </div>
                    </div>
                </form>
            </div>

            <div className="event-div">
                <div className="filter-div">
                    <label htmlFor="sort">Filtrera event nedan till: </label>
                    <select name="sort" id="sort" value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
                        <option value="all">Alla event</option>
                        <option value="upcoming">Kommande</option>
                        <option value="ongoing">Pågående</option>
                        <option value="past">Tidigare</option>
                    </select>
                </div>

                <ul className="event-list">
                    {sortEvent.map(event => {
                        return(
                            <li key={event.id} className="list-item">
                                <div>
                                    <h3>{event.title}</h3>
                                    <span>Event starting: {new Date(event.start).toLocaleString()}<br />Event ending: {new Date(event.end).toLocaleString()}</span>
                                    <p>{event.description}</p>
                                </div>
                                <div className="buttons-in-event">
                                    <button type="button" className="edit-button" onClick={() => updateEvent(event)}>Redigera</button>
                                    <button type="button" className="delete-button" onClick={() => removeEvent(event.id)}>Ta bort</button>
                                </div>
                            </li>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}

export default EventPlanner