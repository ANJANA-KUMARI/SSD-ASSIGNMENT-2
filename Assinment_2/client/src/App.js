import './App.css'
import GoogleSide from './component/googleSide'
import PostPostedSide from './component/postPostedSide'

function App() {
  return (
    <div className="">
      <h1>Upload Google Profile on Facebook</h1>

      <div className="components-wrapper position-center">
        <GoogleSide />
        <PostPostedSide />
      </div>
    </div>
  )
}

export default App
