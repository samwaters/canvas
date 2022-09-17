import { store } from '../store'
import { setTimerId, updateFPSAction } from 'store/fps.store'

export class FPS {
    private framesDrawn = 0

    frameDrawn() {
        this.framesDrawn++
    }

    reset() {
        this.framesDrawn = 0
    }

    start() {
        // Cancel any existing timer
        this.stop()
        const timerId: number = window.setInterval(() => {
            store.dispatch(updateFPSAction(this.framesDrawn))
            this.framesDrawn = 0
        }, 1000)
        store.dispatch(setTimerId(timerId))
    }

    stop() {
        window.clearInterval(store.getState().fps.timerId)
    }
}
