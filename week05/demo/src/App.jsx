import './App.css'

import Welcome from './components/Welcome'


function App() {

  return <div>
    <h1>Demo application</h1>
    <Welcome lang='it' formal={true}/>
    <Welcome lang='en' formal={true} times={4}/>

  </div>
}

export default App
