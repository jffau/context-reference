import React, { Component } from 'react';

// first we will make a new context
const MyContext = React.createContext();

// Then create a provider Component
class MyProvider extends Component {
  state = {
    name: 'Person',
    age: 100,
    cool: true
  };
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          growAYearOlder: () => {
            this.setState({
              age: this.state.age + 1
            });
          },
          handleChange: event => {
            this.setState({
              name: event.target.value
            });
          }
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

const Family = props => (
  <div className="family">
    <Person />
  </div>
);

class Person extends Component {
  render() {
    return (
      <div className="person">
        <MyContext.Consumer>
          {context => (
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <button onClick={context.growAYearOlder}>
                Grow a year older
              </button>
              <form>
                <label>
                  Change Name:
                  <input
                    type="text"
                    value={context.state.name}
                    onChange={context.handleChange}
                  />
                </label>
              </form>
            </React.Fragment>
          )}
        </MyContext.Consumer>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <MyProvider>
        <div>
          <p>I am the app</p>
          <Family />
        </div>
      </MyProvider>
    );
  }
}

export default App;
