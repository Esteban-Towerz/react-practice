import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import withClass from '../hoc/withClass';
// import Radium, { StyleRoot } from 'radium';


class App extends PureComponent {
  constructor(props) {
    super(props);
    console.log('[App.js] inside constructor', props);
    this.state = {
      persons: [
        { id: '1*3o', name: 'Robert', age: 36 },
        { id: '25dl', name: 'Jack', age: 53 },
        { id: '$m9p', name: 'Sergio', age: 26 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    };
  }

  componentWillMount() {
    console.log(('[App.js] inside componentWillMount'));
  }

  componentDidMount() {
    console.log(('[App.js] inside componentDidMount'));
  }

  // to check whether this single props which is important to you did change or not and ignore all the other ones:
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE App.js] inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.person !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log('[UPDATE App.js] inside componentWillUpdate', nextProps, nextState);
  }


  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      "[UPDATE app.js] Inside getDerivedStateFromProps",
      nextProps,
      prevState
    );

    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log(
      "[UPDATE app.js] Inside getDerivedStateFromProps"
    );
  }

  componentDidUpdate() {
    console.log('[UPDATE App.js] inside componentDidUpdate');
  }


  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };
    // const person = Object.assign({}, this.state.persons[personIndex]) other way

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({ authenticated: true })
  }

  render() {
    console.log('[Persons.js] inside render()');
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangeHandler}
        isAuthenticated={this.state.authenticated} />;
      // style[':hover'] = {
      //   backgroundColor: '#35a54b',
      //   border: '2px solid #35a54b'
      // }
    }

    return (
      // <StyleRoot>
      <Aux>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} />
        {persons}
      </Aux>
      // </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.
  }

}
export default withClass(App, classes.App); //Radium(App)