import React, {useState, useEffect} from "react";
import "./App.css";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";

interface IAuthor {
    id: number;
    name: string;
    avatar: string;
}

interface IComments {
    id: number;
    created: string;
    text: string;
    author: number;
    parent: number;
    likes: number;
}

const App: React.FC = () => {
    const [authors, setAuthors] = useState<IAuthor[]>([]);
    const [comments, setComments] = useState<IComments[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        async function fetchCommentData() {
            try {
                const data = await getCommentsRequest(page);
                console.log("async", page, data);
                setComments(data.data);
                setLoading(false);
            } catch (error) {
                console.log("error while fetching comments");
                setLoading(false);
            }
        }

        fetchCommentData();
    }, [page]);

    useEffect(() => {
        async function fetchAuthorsData() {
            try {
                const data = await getAuthorsRequest();
                setAuthors(data);
            } catch (error) {
                console.log("error while fetching authors");
            }
        }

        fetchAuthorsData();
    }, []);

    const results = comments.filter((obj) => {
        return obj.parent === null;
    });

    if (loading) {
        return (
            <div className="App-header">
                <div className="wrapper">
                    <div>loading</div>
                </div>
            </div>
        );
    }

    return (
        <div className="App-header">
            <div className="wrapper">
                {`${comments.length} comments`}
                <hr />
                {results.map((post) => (
                    <Comment
                        key={post.id}
                        {...post}
                        {...authors[post.author]}
                    />
                ))}
            </div>
            <button
                onClick={() => setPage((prevValue) => prevValue + 1)}
                className="load"
            >
                загрузить еще
            </button>
        </div>
    );
};

export default App;

const Comment: React.FC = (props: any) => {
    let commentDate = new Date(props.created);
    return (
        <div className="comment-wrap">
            <div className="holder">
                <div className="col1">
                    <div className="loaded">
                        <img className="pic" src={`${props.avatar}`} />
                    </div>
                </div>
                <div className="col2">
                    {props.name}
                    <br />
                    <p className="darken">{commentDate.toLocaleString()}</p>
                </div>
            </div>
            <div className="holder">
                <div className="col1">
                    <div className="loaded"></div>
                </div>
                <div className="col2">{props.text}</div>
            </div>
        </div>
    );
};
