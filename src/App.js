import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './static/style.css'

import Header from './components/header'
import Home from './views/home/Home'
import Courses from './views/course/Courses'
import Course from './views/course/Course'
import Students from './views/student/Students'

const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route exact path="/courses" component={Courses} />
          <Route path="/courses/:id" component={Course} />
          <Route path="/students" component={Students} />
        </div>
      </Router>
    </Provider>
  </div>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
