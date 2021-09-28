import './App.css';
import PhotosSelectionSide from './component/photosSelectionSide';
import PostPostedSide from './component/postPostedSide';

function App() {
  return (
    <div className="">
      <h1>Upload Google Profile on Facebook</h1>

      <div className="components-wrapper position-center">
        <PhotosSelectionSide />
        <PostPostedSide />
      </div>

    </div>
  );
}

export default App;
