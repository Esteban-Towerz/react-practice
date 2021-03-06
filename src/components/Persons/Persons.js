import React, { PureComponent } from 'react';
import Person from './Person/Person';


class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons.js] inside constructor', props);
        this.lastPersonRef = React.createRef();
    }

    componentWillMount() {
        console.log(('[Persons.js] inside componentWillMount'));
    }

    componentDidMount() {
        console.log(('[Persons.js] inside componentDidMount'));
        this.lastPersonRef.current.focus();
    }

    componentWillReceiveProps(nextProps) {
        console.log('[UPDATE Persons.js ] inside componentWillReceiveProps', nextProps);
    }

    // to check whether this single props which is important to you did change or not and ignore all the other ones:
    // PureComponent already have this checked:
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[UPDATE Persons.js] inside shouldComponentUpdate', nextProps, nextState);
    //     return nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked;
    //     // return true;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log('[UPDATE Persons.js] inside componentWillUpdate', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[UPDATE Persons.js] inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] inside render()');
        return this.props.persons.map((person, index) => {
            return <Person
                click={() => this.props.clicked(index)}
                position={index}
                name={person.name}
                age={person.age}
                key={person.id}
                ref={this.lastPersonRef}
                authenticated={this.props.isAuthenticated}
                changed={(event) => this.props.changed(event, person.id)} />
        });
    }
}

export default Persons;