import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
        loadedPost: null
    }

    componentDidUpdate () {

        if (this.props.id) {

            // Because both 'componentDidUpdate()' and 'setState()' will re-render the component, to avoid infinity loop, we check the id if equally and if there has a post.
            // Adn we still need to check if there have a post(because at first the loadedPost is 'null').
            // Since 'setState' update the data, 'componentDidUpdate()' update again, then the 'setState()' update again...
            if( !this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id).then(response => {
                    this.setState({loadedPost: response.data})
                    console.log(response);
                });
            }
        }
    }

    render () {

        let post = <p style = {{textAlign: 'center'}}>Please select a Post!</p>;

        // Aviod fecthing data until axios.get() done.
        if (this.props.id) {
            post = <p style = {{textAlign: 'center'}}>Loading...</p>;
        }
        // At the begin, loadedPost is null, so it will be false.
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;