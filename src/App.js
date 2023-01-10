import React, { Component } from 'react';
import ParticleBackground from './components/ParticleBackground/ParticleBackground';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Rank from './components/Rank/Rank';
import ImgForm from './components/ImgForm/ImgForm';
import Footer from './components/Footer/Footer';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      faces: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const facesList = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    // calculate face boxes for each face in the picture
    const faces = [];

    for (let face of facesList) {
      const faceDims = face.region_info.bounding_box;

      const leftCol = faceDims.left_col * width;
      const topRow = faceDims.top_row * height;
      const rightCol = width - (faceDims.right_col * width);
      const bottomRow = height - (faceDims.bottom_row * height);

      faces.push(
        <div
          className="bounding-box"
          style={{ top: topRow, right: rightCol, bottom: bottomRow, left: leftCol }}>
        </div>
      );
    }

    return faces;
  }

  displayFaces = (faces) => {
    this.setState({ faces: faces });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    const USER_ID = "shadizx";
    const PAT = "43ea8f784a5f441a85e3b9ba1a489a71";
    const APP_ID = "my-first-application";

    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = "6dc7e46bc9124c5c8824be4822abe105";
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    fetch(
      "https://api.clarifai.com/v2/models/" +
      MODEL_ID +
      "/versions/" +
      MODEL_VERSION_ID +
      "/outputs",
      requestOptions
    )
      .then((response) =>
        response.json()
      )
      .then((result) => {
        if (result) {
          fetch('https://shadimagicbrain-api.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count.entries }))
            })
        }
        this.displayFaces(this.calculateFaceLocation(result))
      })
      .catch((error) => console.log("error", error));
  };

  onEnterPress = (key) => {
    if (key.keyCode === 13) {
      this.onButtonSubmit();
    }
  };

  onRouteChange = (route) => {
    console.log('route is ', route);

    if (route === 'signout') {
      this.setState({ isSignedIn: false });
      this.setState({ route: 'signin' });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
      this.setState({ route: route });
    } else {
      this.setState({ route: route });
    }
  };

  render() {
    const { isSignedIn, imageUrl, route, faces } = this.state;
    return (
      <div className="App">
        <ParticleBackground className='particles' />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        <Logo />
        {
          route === 'home'
            ?
            <div>
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImgForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                onEnterPress={this.onEnterPress}
              />
              <FaceRecognition faces={faces} imageUrl={imageUrl} />
            </div>
            : (
              route === "signin"
                ?
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                :
                <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
        <Footer />
      </div>
    );
  }
}

export default App;
