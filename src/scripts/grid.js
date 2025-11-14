function generateGrid() { 
    let gridCont = document.querySelector('.grid-cont')
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let grid = document.createElement('div')
            grid.classList.add('grid')
            gridCont.appendChild(grid)
        }
    }
}

export default generateGrid