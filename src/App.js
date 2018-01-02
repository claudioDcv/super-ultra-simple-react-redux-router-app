import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import 'semantic-ui-css/semantic.min.css'
import './static/style.css'
import 'react-select/dist/react-select.css';

import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Login from './views/auth/Login'
import Home from './views/home/Home'

import Courses from './views/course/Courses'
import Course from './views/course/Course'
import CourseEdit from './views/course/CourseEdit'

import CourseTemplates from './views/course_template/CourseTemplates'
import CourseTemplate from './views/course_template/CourseTemplate'
import CourseTemplateEdit from './views/course_template/CourseTemplateEdit'

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
            <Route exact path="/home" component={Home} />

            <Route exact path="/courses" component={Courses} />
            <Route exact path="/courses/:id" component={Course} />
            <Route path="/courses/:id/edit" component={CourseEdit} />

            <Route exact path="/students" component={Students} />
            <Route path="/students/:id" component={Student} />

            <Route exact path="/course-templates" component={CourseTemplates} />
            <Route exact path="/course-templates/:id" component={CourseTemplate} />
            <Route path="/course-templates/:id/edit" component={CourseTemplateEdit} />

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
