interface Shape {
    color: string
    direction: {
        lr: number
        ud: number
    },
    size: number
    speed: {
        lr: number
        ud: number
    },
    x: number
    y: number
}

const defaultShapes: Shape[] = [{
    color: 'green',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 50,
    speed: {
        lr: 640 / 10000,
        ud: 480 / 10000,
    },
    x: 10,
    y: 10,
}, {
    color: 'red',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 75,
    speed: {
        lr: 640 / 8000,
        ud: 480 / 8000,
    },
    x: 80,
    y: 300,
},{
    color: 'blue',
    direction: {
        lr: 1,
        ud: 1
    },
    size: 30,
    speed: {
        lr: 640 / 4000,
        ud: 480 / 4000,
    },
    x: 250,
    y: 400,
}]

export class ShapeManager {
    private shapes: Shape[] = []

    addDefaultShapes() {
        this.shapes.push(defaultShapes[0])
        this.shapes.push(defaultShapes[1])
        this.shapes.push(defaultShapes[2])
    }

    addShape(shape: Shape) {
        this.shapes.push(shape)
    }

    getShapes(): Shape[] {
        return this.shapes
    }

    updateShape(index: number, x: number, y: number, leftRight: number, upDown: number) {
        if(!this.shapes[index]) return
        this.shapes[index].x = x
        this.shapes[index].y = y
        this.shapes[index].direction.lr = leftRight
        this.shapes[index].direction.ud = upDown
    }
}