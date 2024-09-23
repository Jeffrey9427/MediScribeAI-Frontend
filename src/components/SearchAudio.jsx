import SearchIcon from "../assets/searchIcon.svg"

function SearchAudio() {
    return (
        <div className="flex">
            <div className="flex gap-7 items-center grow">
                <img src={SearchIcon} className='w-10 h-10'/>
                <input type="text" className='w-80 h-10 p-2 text-black text-xl placeholder::text-grey-200' placeholder="Search Audio"/>
            </div>
            <div className="flex-none">
                <button className='hover:bg-primary font-semibold hover:text-white px-10 py-2 text-xl rounded-lg text-primary bg-transparent border-primary border-2'>CREATE NEW</button>
            </div>
        </div>
    )
}

export default SearchAudio;