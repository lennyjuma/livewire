import store from '@/Store'

export default class {
    constructor(component, actionQueue) {
        this.component = component
        this.actionQueue = actionQueue
    }

    get refs() {
        return this.actionQueue
            .map(action => {
                return action.ref
            })
            .filter(ref => ref)
    }

    payload() {
        let payload = {
            id: this.component.id,
            data: this.component.data,
            name: this.component.name,
            checksum: this.component.checksum,
            children: this.component.children,
            actionQueue: this.actionQueue.map(action => {
                // This ensures only the type & payload properties only get sent over.
                return {
                    type: action.type,
                    payload: action.payload,
                }
            }),
            gc: store.getComponentsForCollection(),
        }

        if (Object.keys(this.component.errorBag).length > 0) {
            payload.errorBag = this.component.errorBag
        }

        return payload
    }

    storeResponse(payload) {
        return this.response = {
            id: payload.id,
            dom: payload.dom,
            checksum: payload.checksum,
            children: payload.children,
            dirtyInputs: payload.dirtyInputs,
            eventQueue: payload.eventQueue,
            events: payload.events,
            data: payload.data,
            redirectTo: payload.redirectTo,
            gc: payload.gc,
            errorBag: payload.errorBag || {},
        }
    }
}
