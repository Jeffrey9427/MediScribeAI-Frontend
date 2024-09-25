function CancelButton ({handleButtonClick}) {
    return ( 
        <button 
            className='hover:bg-primary font-semibold hover:text-white px-12 py-2 text-xl rounded-lg text-primary bg-transparent border-primary border-2'
            onClick={handleButtonClick}
        >
            CANCEL
        </button>
    )
}

export default CancelButton;