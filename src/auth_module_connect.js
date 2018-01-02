import api from './api/Auth'
import store from './store'

import auth, { requestBase } from './auth_module'

export const secure = requestBase(store, api)
export const actions = auth.actionsBase(api)
