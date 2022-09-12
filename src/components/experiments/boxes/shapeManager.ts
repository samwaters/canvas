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

export class ShapeManager {
    private shapes: Shape[] = []

    addDefaultShapes() {
        this.shapes.push(
            ShapeManager.createShape(10, 10, 50, "green", 10000)
        )
        this.shapes.push(
            ShapeManager.createShape(80, 300, 75, "red", 8000)
        )
        this.shapes.push(
            ShapeManager.createShape(250, 400, 30, "blue", 4000)
        )
        this.shapes.push(
            ShapeManager.createShape(600, 10, 45, "yellow", 2000)
        )
        this.shapes.push(
            ShapeManager.createShape(400, 100, 50, "purple", 7000)
        )
    }

    addShape(shape: Shape) {
        this.shapes.push(shape)
    }

    static createShape = (x: number, y: number, size: number, color: string, speed: number) => ({
        color,
        direction: {
            lr: 1,
            ud: 1
        },
        size,
        speed: {
            lr: 640 / speed,
            ud: 480 / speed,
        },
        x,
        y,
    } as Shape)

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