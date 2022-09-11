import {store} from "../store";
import { updateFPSAction } from "store/fps.store";

export class FPS {
    private framesDrawn: number = 0
    private timerId: number = 0

    frameDrawn() {
        this.framesDrawn++
    }

    reset() {
        this.framesDrawn = 0
    }

    start() {
        this.timerId = window.setInterval(() => {
            store.dispatch(updateFPSAction(this.framesDrawn))
            this.framesDrawn = 0
        }, 1000)
    }

    stop() {
        window.clearInterval(this.timerId)
    }
}