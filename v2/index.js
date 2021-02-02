window.addEventListener("load", function() {
    document.body.style.width = window.innerWidth + 'px';
    document.body.style.height = window.innerHeight + 'px';
    requestAnimationFrame(function () {
        const noodel = new Noodel("#root", {
            retainDepthOnTapNavigation: true,
            swipeMultiplierTrunk: 0.9,
            swipeMultiplierBranch: 0.7,
            snapMultiplierTrunk: 0.8,
            onFocalNoodeChange: function(current) {
                const index = current.getIndex() + 1;
                const total = current.getParent().getChildCount();
                document.getElementById("noodeCount").textContent = index + " / " + total; 
            },
            onMount: function() {
                document.getElementById("noodeCount").classList.remove("hidden");

                const search = new NoodelSearch(noodel, "searchFocus");
                const searchInput = document.getElementById("searchInput");
                const searchButton = document.getElementById("searchButton");

                const resetSearch = function() {
                    search.clear();
                    document.getElementById("searchCount").classList.add("hidden");
                    document.getElementById("searchIcon").classList.remove("hidden");
                    document.getElementById("searchPrev").disabled = true;
                    document.getElementById("searchNext").disabled = true;
                }
                const updateSearchCount = function() {
                    if (search.getMarkCount() > 0) {
                        document.getElementById("searchCount").textContent = search.getFocalMarkPosition().globalMarkIndex + 1 + " / " + search.getMarkCount();
                    }
                    else {
                        document.getElementById("searchCount").textContent = "0 / 0";
                    }
                }
                const executeSearch = function() {
                    search.search(searchInput.value, {
                        separateWordSearch: false
                    }, function() {
                        document.getElementById("searchCount").classList.remove("hidden");
                        document.getElementById("searchIcon").classList.add("hidden");

                        if (search.getMarkCount() > 1) {
                            document.getElementById("searchPrev").disabled = false;
                            document.getElementById("searchNext").disabled = false;
                        }
                        
                        search.next();
                        updateSearchCount();
                    });
                }
                const toPrev = function() {
                    search.prev();
                    updateSearchCount();
                }
                const toNext = function() {
                    search.next();
                    updateSearchCount();
                }

                searchButton.classList.remove("hidden");
                searchButton.addEventListener("click", function(ev) {
                    const searchBar = document.getElementById("searchBar");

                    if (searchBar.classList.contains("hidden")) {
                        searchBar.classList.remove("hidden");
                        searchButton.firstElementChild.src = "x.svg";
                        searchInput.focus()
                        searchInput.select();
                    }
                    else {
                        searchBar.classList.add("hidden");
                        resetSearch();
                        searchButton.firstElementChild.src = "search.svg";
                    }
                });
                document.getElementById("searchBar").addEventListener("submit", function(ev) {
                    ev.preventDefault();

                    if (searchInput.value.length === 0) {
                        resetSearch();
                    }
                    else {
                        executeSearch();
                    }
                });
                searchInput.addEventListener("input", function(ev) {
                    resetSearch();
                });
                document.getElementById("searchPrev").addEventListener("click", toPrev);
                document.getElementById("searchNext").addEventListener("click", toNext);
            }
        });
        
        noodel.mount("#root");
    });
});
window.addEventListener("resize", function () {
    document.body.style.width = window.innerWidth + 'px';
    document.body.style.height = window.innerHeight + 'px';
});