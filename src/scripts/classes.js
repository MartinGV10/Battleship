class Ship {
    constructor(length) {
        this.length = length
        this.timesHit = 0
    }

    hit() {
        this.timesHit++
    }

    isSunk() {
        return this.timesHit >= this.length
    }
}

class Gameboard {
    constructor(size = 10) {
        this.size = size

        this.ships = []

        this.missedShots = []
    }

    isInBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size
    }

    isOverlap(coords) {
        return this.ships.some(obj => {
            obj.coords.some(c => {
                coords.some(nc => nc.x === c.x && nc.y === nc.y)
            })
        })
    }

    placeShip(length, startX, startY, direction = 'horizontal') {
        const ship = new Ship(length)

        let coords = []

        for (let i = 0; i < length; i++) {
            let x = startX + (direction === 'horizontal' ? i : 0)
            let y = startY + (direction === 'vertical' ? i : 0)

            if (!this.isInBounds(x, y)) {
                throw new Error('Ship placement out of bounds')
            }
        }

        coords.push({x, y})

        if (this.isOverlap(coords)) {
            throw new Error('Ship overlaps another ship')
        }

        this.ships.push({
            ship,
            coords,
            hits: new Set()
        })

        return ship
    }

    receiveAttack(x, y) {
        for (let obj of this.ships) {
            for (let i = 0; i < obj.coords.length; i++) {
                const c = obj.coords[i]
                if (c.x === x && c.y === y) {
                    obj.ship.hit()
                    obj.hits.add(i)
                    return 'hit'
                }
            }
        }

        this.missedShots.push({ x, y })
        return 'miss'
    }

    allShipsSunk() {
        return this.ships.every(obj => obj.ship.isSunk())
    }
}

class Player extends Gameboard{
    constructor(real, computer) {
        this.real = real
        this.computer = computer
    }
}

export {Ship, Gameboard, Player}