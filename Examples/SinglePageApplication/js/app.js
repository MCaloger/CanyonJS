let root = canyon.render(NavigatorComponent())

window.addEventListener("hashchange", (e) => {
  
    let currentLocation = location.hash

    console.log('currentLocation', currentLocation)
    
    canyon.render(View(currentLocation))
})