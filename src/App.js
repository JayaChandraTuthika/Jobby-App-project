import {Switch, Route, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import JobsPage from './components/JobsPage'
import NotFound from './components/NotFound'
import JobSpecificDetails from './components/JobSpecificDetails'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <div className="bg-container">
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />

      <ProtectedRoute exact path="/jobs/:id" component={JobSpecificDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
)

export default App
