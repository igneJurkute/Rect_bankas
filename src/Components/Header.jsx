import AddNew from "./Addnew"
import "./Header.scss"
// import Logo from "./logo/logo"
import Search from "./Search"

export default function Header({ setCreateData, filter, setFilter, msg}){
    return (
        <div className="main-header">
            <div>
                <h1>REACT banko aplikacijos versija</h1>
            </div>
            <div className="header-wrapper">
                {/* <Search filter={filter} setFilter={setFilter}/> */}
                <AddNew setCreateData={setCreateData} msg={msg}/>
            </div>
        </div>
    )
}