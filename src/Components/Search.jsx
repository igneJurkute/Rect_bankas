import './Search.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'



export default function Search({filter, setFilter}){
    return(
        <form id="search-form" >
            <button type="submit" form="search-form" value="Submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
            <label style={{display:'none'}} htmlFor="gsearch">Search Google:</label>
            <input type="text" id="gsearch" name="gsearch" placeholder="Client Name" value={filter} onChange={e => setFilter(e.target.value)} required/>
        </form>
        )
}