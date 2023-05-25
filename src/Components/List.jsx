import './List.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faArrowsUpDown } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';


export default function List({ accounts, setDeleteModalData, setDeleteData, setAddModalData, setMinusModalData, setDeleteMessage, deleteMessage, doSort, sort}) {
    const destroy = c => {
            setDeleteMessage('Ar tikrai norite pašalinti šią sąskaitą? \n' + c.Name + ', ' + c.Surname);
            if (c.Balance !== 0){
                setDeleteMessage('Negalima pašalinti sąskaitos, nes joje yra: ' + (c.Balance/100) + '€\n Ar norite išimti šią sumą?');
            }
            setDeleteModalData(c);
    }

    const plus = c => {
        setAddModalData(c);
        setMinusModalData(null);
    };
    const minus = c => {
        setMinusModalData(c);   
        setAddModalData(null);    
    };
    

    return (
        <div className='acounts-wrapper'>
            <ul className="account-list">
                <li key={1001} className="list-group-header">
                    <div className="list-item headers">
                        
                        <div className="account-name column-sort">
                            <div className='column-name' style={{border:'none'}}>Vardas</div>
                            <div className='sort-symbol' onClick={()=>doSort('Name')}>
                                {sort.sortName !== 'Name' && <FontAwesomeIcon icon={faArrowsUpDown} />}
                                {sort.sortDirection==='default' && sort.sortName==='Name' && <FontAwesomeIcon icon={faArrowsUpDown} />}
                                {sort.sortDirection==='up' && sort.sortName==='Name' && <FontAwesomeIcon icon={faArrowUp} />}
                                {sort.sortDirection==='down' && sort.sortName==='Name' && <FontAwesomeIcon icon={faArrowDown} />}
                            </div>
                        </div>

                        <div className="account-surname  column-sort">
                            <div className='column-name' style={{border:'none'}}>Pavardė</div>
                            <div className='sort-symbol' onClick={()=>doSort('Surname')}>
                                {sort.sortName !== 'Surname' && <FontAwesomeIcon icon={faArrowsUpDown} />}
                                {sort.sortDirection==='default' && sort.sortName==='Surname' && <FontAwesomeIcon icon={faArrowsUpDown} />}
                                {sort.sortDirection==='up' && sort.sortName==='Surname' && <FontAwesomeIcon icon={faArrowUp} />}
                                {sort.sortDirection==='down' && sort.sortName==='Surname' && <FontAwesomeIcon icon={faArrowDown} />}
                            </div>
                        </div>
                        <div className="account-balance column-sort">
                            <div className='column-name'style={{border:'none'}}>Sąskaitos suma</div>
                            {/* <div className='sort-symbol' onClick={()=>doSort('Balance')}>
                                {sort.sortName !== 'Balance' && <FontAwesomeIcon icon={faSort} />}
                                {sort.sortDirection==='default' && sort.sortName==='Balance' && <FontAwesomeIcon icon={faSort} />}
                                {sort.sortDirection==='up' && sort.sortName==='Balance' && <FontAwesomeIcon icon={faSortUp} />}
                                {sort.sortDirection==='down' && sort.sortName==='Balance' && <FontAwesomeIcon icon={faSortDown} />}
                            </div> */}
                        </div>
                        <div className="buttons">
                            <div>Veiksmai</div>
                        </div>
                    </div>
                </li>
                {
                    accounts
                        ? accounts.length
                            ? accounts.map(c => (c.show ?                               
                                    <li key={c.id} className="list-group-item">
                                        <div className="list-item">
                                            <div className="account-name">{c.Name}</div>
                                            <div className="account-surname">{c.Surname}</div>
                                            <div className="account-balance">{(c.Balance/100).toFixed(2) + ' €' }</div>
                                            <div className="buttons">
                                                <span className='add' onClick={_ => plus(c)}><FontAwesomeIcon icon={faPlus} /></span>
                                                <span className='minus' onClick={_ => minus(c)}><FontAwesomeIcon icon={faMinus} /></span>
                                                <span className='delete' onClick={_ => destroy(c)}><FontAwesomeIcon icon={faTrashCan} /></span>
                                            </div>
                                        </div>
                                    </li>: null
                                ))
                            : 'Sąskaitų nėra'
                        : '...loading'
                }
            </ul>
        </div>
    )
}
