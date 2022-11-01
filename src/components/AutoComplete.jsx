

export const AutoComplete = () => {
    return (
        <div className="w-50 p-5 rounded mx-auto">
            <div className="form-floating dropdown">
                <input style={{backgroundColor: "rgba(145,158,171, 0.04)"}} type="text"  id="search"
                classname="form-control" placeholder="Search" />
            </div>
        </div>
    )
}