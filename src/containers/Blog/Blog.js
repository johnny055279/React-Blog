import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, Link } from 'react-router-dom';
import NewPost from '../../containers/Blog/NewPost/NewPost'

class Blog extends Component {

    render () {

        return (
            <div className = 'Blog'>
                <header>
                    <nav>
                        <ul>
                            {/* use Link to avoid re-render the page after click the achor */}
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to={{
                                            pathname: '/new-post',
                                            hash: '#submit',
                                            search: '?quick-submit=true'}}>New Post</Link></li>
                            <li><Link to="/">Home</Link></li>
                        </ul>
                    </nav>
                </header>

                {/* use exact to render specific page */}
                <Route path='/' exact component={Posts}/>
                <Route path='/new-post' exact component={NewPost}/>
            </div>
        );
    }
}

export default Blog;