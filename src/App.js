import {Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/HomePage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'
import JobsPage from './components/JobsPage'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <div className="bg-container">
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
    </Switch>
  </div>
)

export default App
