const sortByMostPopular = document.createElement("button")
sortByMostPopular.innerText = "Sort by most popular"
sortByMostPopular.id = "sortByMostPopular"

const sortByLeastPopular = document.createElement("button")
sortByLeastPopular.innerText = "Sort by least popular"
sortByLeastPopular.id = "sortByLeastPopular"

const sortByMostHardWorking = document.createElement("button")
sortByMostHardWorking.innerText = "Sort by most Hardworking"
sortByMostHardWorking.id = "sortByMostHardWorking"

const sortByLeastHardWorking = document.createElement("button")
sortByLeastHardWorking.innerText = "Sort by least Hardworking"
sortByLeastHardWorking.id = "sortByLeastHardWorking"


document.querySelector("body").appendChild(sortByMostPopular)
document.querySelector("body").appendChild(sortByLeastPopular)
document.querySelector("body").appendChild(sortByMostHardWorking)
document.querySelector("body").appendChild(sortByLeastHardWorking)


sortByMostPopular.addEventListener("click", () => {
    main()
})