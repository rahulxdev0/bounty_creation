import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BountyFormWizard from './components/BountyFormWizard'
import ConfirmationScreen from './components/ConfirmationScreen'
import ResultPage from './components/ResultPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BountyFormWizard />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  )
}

export default App