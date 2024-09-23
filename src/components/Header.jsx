function Header() {
    return (
        <div className="mt-7 flex">
            <div className="grow">
                <p className="font-bold text-[2.5rem] mb-2">Record Audio</p>
                <p className="font-medium text-xl text-quaternary">Collection of your audio recordings</p>
            </div>
            <div className="flex-none mt-5">
                <p className="font-medium text-xl text-quaternary">0/100 recordings</p>
            </div>
        </div>
    )
}

export default Header;