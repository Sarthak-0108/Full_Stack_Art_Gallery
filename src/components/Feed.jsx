import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const Feed = () => {
    const [post, setPost] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/feed")
            .then((response) => response.json())
            .then((data) => setPost(data.data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="display-post bg-slate-700 px-8">
                <div className="feed-container flex flex-wrap justify-between">
                    {post.map((data) => (
                        <>
                            <div
                                className="image-container m-4 border-4 border-double border-slate-400"
                                key={data._id}
                            >
                                <img
                                    src={data.imageUrl}
                                    // height={"100px"}
                                    // width={"300px"}
                                    className="aspect-square w-64 object-cover"
                                />
                                <div className="caption bg-slate-950 text-white">
                                    {" "}
                                    {data.caption}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Feed;
