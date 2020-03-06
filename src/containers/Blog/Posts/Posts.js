import React, { Component } from 'react';
import axios from 'axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {

        // get the http request to the url
        // Axios use 'promises' and GET returns a promises, and we can use 'then()' which takes a function as the input and will executed once
        // the promises resolves.
        axios.get('/posts').then(response => {

            // show only 4 data on the page.
            const posts = response.data.slice(0, 4);


            // distribute the author to the posts
            const updatePosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max',
                }
            });

            // setState need write here because axios.get() only send the request to the server, it won't wait the fetch data come back if you write the setState outside the function.
            this.setState({posts: updatePosts});

            // custom error dispaly
        }).catch(error => {
            console.log(error)
            // this.setState({error: true});
        });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {

        let posts = <p style = {{textAlign:'center'}}>Opps! Something went wong!</p>
        if(!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post key = {post.id} 
                             title = {post.title}
                             author = {post.author}
                             clicked = {() => this.postSelectedHandler(post.id)}/>
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}

export default Posts;