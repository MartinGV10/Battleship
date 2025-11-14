import { Ship } from "../scripts/classes"

test ('Hits tracked correctly', () => {
    const ship = new Ship(3)

    ship.hit()
    ship.hit()
    expect(ship.isSunk()).toBe(false)

    ship.hit()
    expect(ship.isSunk()).toBe(true)
})