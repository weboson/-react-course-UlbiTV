import React, { Component } from 'react';

class ClassCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

// Если не привязывать контекст к методам классового компонента, 
// то состояние не будет изменяться, чтобы это решить  есть три варианта решения:
//1) метод в виде стрелочной функции: increment = () => {...}
//2) использовать привязку контекста через bind: this.increment = this.increment.bind(this)
//3) колбек в событии  <button onClick={() => this.handleClick()}>, но это не приветствуется, так как может порождать множество колбэков:
// подробнее: https://ru.reactjs.org/docs/handling-events.html#gatsby-focus-wrapper
    increment() {
        this.setState({
            count: this.state.count + 1
        })
    }
    
    decrement() {
        this.setState({
            count: this.state.count - 1
        })
    }


    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.count}</h1>
                    <button onClick={this.increment}>Increment</button>
                    <button onClick={this.decrement}>Decrement</button>
                </div>
            </div>
        );
    }
}

export default ClassCounter;