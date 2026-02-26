import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../components/Post'
import { usePost } from '../hook/usePost'

const Feed = () => {

    const { feed, handleGetFeed, loading, handleToggleLike } = usePost()

    useEffect(() => { 
        handleGetFeed()
    }, [])

    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }
    
    // console.log(feed)
    // Feed.jsx me return se pehle:
    // console.log(feed.map(post => ({ id: post._id, isLiked: post.isLiked })))

    return (
        <main className='feed-page' >
            <div className="feed">
                <div className="posts">
                {feed.map((post) => (
            <Post
              user={post.user}
              key={post._id}
              post={post}
              onToggleLike={handleToggleLike}
            />
          ))}
                </div>
            </div>
        </main>
    )
}

export default Feed