import SearchIcon from "../assets/searchIcon.svg"

function SearchAudio() {
    return (
        <div className="flex gap-7 items-center grow">
            <img src={SearchIcon} className='w-10 h-10'/>
            <input type="text" className='w-80 h-10 p-2 font-regular text-black text-xl placeholder::text-grey-200 focus:outline-none focus:border-b focus:border-black' placeholder="Search Audio"/>
        </div>
    )
}

export default SearchAudio;