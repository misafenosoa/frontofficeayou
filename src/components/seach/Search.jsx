export default function Search({handleSearchChange}) {
    return(
        <div class="responsive-search-wrapper">
            <button
            type="button"
            class="button ion ion-md-close"
            id="responsive-search-close-button"
            ></button>
            <div class="responsive-search-container">
            <div class="container">
                <p>Start typing and press Enter to search</p>
                <form class="responsive-search-form">
                <label class="sr-only" for="search-text">
                    Search
                </label>
                <input
                    id="search-text"
                    type="text"
                    class="responsive-search-field"
                    placeholder="PLEASE SEARCH"
                    onChange={handleSearchChange}
                />
                <i class="fas fa-search"></i>
                </form>
            </div>
            </div>
        </div>
    )
}