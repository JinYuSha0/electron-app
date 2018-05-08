import { store, history } from '../index'

export const jump = (path) => {
    const { user, router: {location: {pathname}} } = store.getState()
    if(pathname !== path) {
        history.push(path)

        //user.get('lock')
    }
}