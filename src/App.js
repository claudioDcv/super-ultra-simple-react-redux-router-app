import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './static/style.css'

import Header from './components/header'
import Home from './views/home/Home'
import CourseTemplates from './views/course_template/CourseTemplates'
import Students from './views/student/Students'

const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/course-templates" component={CourseTemplates} />
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
