import './App.css';
import PhotosSelectionSide from './component/photosSelectionSide';
import PostPostedSide from './component/postPostedSide';

function App() {
  return (
    <div className="">
      <h1>Post Any Google Photo on the Facebook</h1>

      <div className="components-wrapper">
        <PhotosSelectionSide />
        <PostPostedSide />
      </div>

    </div>
  );
}

export default App;
