import api from './api/Auth'
import store from './store'

import auth from './auth_module'

// Inject store and apiAuth : login, refresh
export const request = auth.requestBase(store, api)
export const actions = auth.actionsBase(api)
