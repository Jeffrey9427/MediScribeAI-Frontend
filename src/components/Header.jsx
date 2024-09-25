function Header( {subtitle, totalRecordings} ) {
    return (
        <div className="mt-7 flex">
            <div className="grow">
                <p className="font-bold text-[2.5rem] mb-2">MediScribe AI</p>
                <p className="font-medium text-xl text-quaternary">{subtitle}</p>
            </div>
            <div className="flex-none mt-5 lexend">
                <p className="font-medium text-xl text-quaternary">{totalRecordings}/100 recordings</p>
            </div>
        </div>
    )
}

export default Header;