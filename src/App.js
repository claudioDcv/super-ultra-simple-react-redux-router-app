import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './static/style.css'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './views/auth/Login'
import Home from './views/home/Home'
import Courses from './views/course/Courses'
import Course from './views/course/Course'
import CourseTemplates from './views/course_templates/CourseTemplates'
import Students from './views/student/Students'
import Student from './views/student/Student'

const App = ({ store }) => (
  <div>
    <Provider store={store}>
      <Router>
        <div>
          <div className="parent">
            <Header />
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/courses" component={Courses} />
            <Route path="/courses/:id" component={Course} />
            <Route exact path="/students" component={Students} />
            <Route path="/students/:id" component={Student} />
            <Route path="/course-templates" component={CourseTemplates} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  </div>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
