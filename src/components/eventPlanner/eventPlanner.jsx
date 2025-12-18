import { useState, useEffect } from "react"
import styles from "./eventPlanner.module.css"

const EventPlanner = () => {

    const [events, setEvents] = useState(() => {
        return JSON.parse(localStorage.getItem("events")) || []
    })
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [selectedToEdit, setSelectedToEdit] = useState(null)
    const [eventFilter, setEventFilter] = useState("all")

    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    }, [events])

    const userSubmit = (e) => {
        e.preventDefault()

        const startDate = new Date(start)
        const endDate = new Date(end)
        if (endDate <= startDate) {
            alert("Sluttiden får inte vara innan starttiden")
            return
        }

        if (selectedToEdit === null) {
            const newEvent = {
                id: crypto.randomUUID(),
                start,
                end,
                title,
                description,
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
        const yes = confirm("Vill du verkligen ta bort detta event?")
        if (yes) {
            setEvents(oldArray => oldArray.filter(event => event.id !== id))
        } else {
            return
        }
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
        const eventOrder = { ongoing: 0, upcoming: 1, past: 2 }
        if (eventOrder[eventA.status] !== eventOrder[eventB.status]) {
            return eventOrder[eventA.status] - eventOrder[eventB.status]
        }
        return new Date(eventA.start) - new Date(eventB.start)
    })

    return(
        <div className={styles["main-div"]}>
            <div className={styles["form-div"]}>
                <form className={styles["form-container"]} onSubmit={userSubmit}>
                    <div className={styles["submit-1"]}>
                        <div className={styles["start-div"]}>
                            <label htmlFor="eventStart">Start-tid: </label>
                            <input type="datetime-local" id="eventStart" value={start} onChange={(e) => setStart(e.target.value)} required/>
                        </div>

                        <div className={styles["end-div"]}>
                            <label htmlFor="eventEnd">Slut-tid: </label>
                            <input type="datetime-local" id="eventEnd" value={end} min={start} onChange={(e) => setEnd(e.target.value)} required/>
                        </div>

                        <div className={styles["title-div"]}>
                            <label htmlFor="eventTitle">Titel: </label> 
                            <input type="text" name="eventTitle" id="eventTitle" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                        </div>
                    </div>

                    <div className={styles["submit-2"]}>
                        <div className={styles["description-div"]}>
                            <label htmlFor="eventDesc"></label>
                            <textarea name="eventDesc" id="eventDesc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Beskriv kortfattat eventet" rows={7} cols={40} required></textarea>
                        </div>

                        <div className={styles["button-div"]}>
                            <button type="submit" className={styles["add-button"]}>{selectedToEdit === null ? "Lägg till event" : "Spara ändringar"}</button>
                            {selectedToEdit !== null && (<button type="button" className={styles["cancel-button"]} onClick={cancelEdit}>Avbryt redigering</button>)}
                        </div>
                    </div>
                </form>
            </div>

            <div className={styles["event-div"]}>
                <div className={styles["filter-div"]}>
                    <label htmlFor="sort">Filtrera event nedan till: </label>
                    <select name="sort" id="sort" value={eventFilter} onChange={(e) => setEventFilter(e.target.value)}>
                        <option value="all">Alla event</option>
                        <option value="ongoing">Pågående</option>
                        <option value="upcoming">Kommande</option>
                        <option value="past">Tidigare</option>
                    </select>
                </div>
                {events.length === 0 ? (
                    <p className={styles["no-events-p"]}>
                        Lägg till event för att se dom i listan...
                    </p>
                ) : (
                <ul className={styles["event-list"]}>
                    {sortEvent.map(event => {
                        return(
                            <li key={event.id} className={`${styles["list-item"]} ${styles[event.status]}`}>
                                <div>
                                    <span className={`${styles["status-badge"]} ${styles[event.status]}`}>
                                        {event.status === "ongoing" && "Pågående"}
                                        {event.status === "upcoming" && "Kommande"}
                                        {event.status === "past" && "Tidigare"}
                                    </span>
                                    <h3>{event.title}</h3>
                                    <span>Event starting: {new Date(event.start).toLocaleString()}<br />Event ending: {new Date(event.end).toLocaleString()}</span>
                                    <p>{event.description}</p>
                                </div>
                                <div className={styles["buttons-in-event"]}>
                                    <button type="button" className={styles["edit-button"]} onClick={() => updateEvent(event)}>Redigera</button>
                                    <button type="button" className={styles["delete-button"]} onClick={() => removeEvent(event.id)}>Ta bort</button>
                                </div>
                            </li>
                            )
                        })}
                </ul>
                )}
            </div>
        </div>
    )
}

export default EventPlanner