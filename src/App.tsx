import React, {useState, useEffect} from "react";
import "./App.css";
import getAuthorsRequest from "./api/authors/getAuthorsRequest";
import getCommentsRequest from "./api/comments/getCommentsRequest";
import Heart from "./Heart";
import EmptyHeart from "./EmptyHeart";

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
    const [page, setPage] = useState(1);
    const [comments, setComments] = useState<IComments[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        async function loadComments() {
            try {
                setLoading(true);
                const result = await getCommentsRequest(page);
                setComments((comments) => [...comments, ...result.data]);
                setErrorMsg("");
                setLoading(false);
            } catch (error) {
                setErrorMsg("Ошибка загрузки данных. Попробуйте еще раз");
            } finally {
                setLoading(false);
            }
        }

        loadComments();
    }, [page]);

    useEffect(() => {
        async function fetchAuthorsData() {
            try {
                const data = await getAuthorsRequest();
                setAuthors(data);
            } catch (error) {
                console.log("Ошибка загрузки авторов");
            }
        }

        fetchAuthorsData();
    }, []);

    const loadMore = () => {
        setPage((page) => page + 1);
    };

    let results = comments.filter((obj) => {
        return obj.parent === null;
    });

    let subcomments = comments.filter((obj) => {
        return obj.parent !== null;
    });

    let totalCount = comments.length;

    let totalLikes = comments?.reduce((a: number, b: any) => a + b.likes, 0);

    return (
        <div className="App-header">
            <div className="wrapper">
                <header className="header">
                    <span>{totalCount} комментариев</span>
                    <span className="cardSpan">
                        <EmptyHeart />
                        &nbsp;
                        {totalLikes}
                    </span>
                </header>
                {results &&
                    results.map((post) => (
                        <>
                            <Comment
                                key={post.id}
                                {...post}
                                {...authors[post.author]}
                            />
                            <br />
                            <div className="holder">
                                <div className="col11">
                                    <div className="loading"></div>
                                </div>
                                <div className="centered">
                                    {subcomments?.find(
                                        (e) => e?.parent === post?.id,
                                    )?.text ?? null}
                                </div>
                            </div>
                        </>
                    ))}
            </div>
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <div className="load-more">
                <button onClick={loadMore} className="btn-grad">
                    {loading ? "загрузка..." : "загрузить еще"}
                </button>
            </div>
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
                        {props?.avatar && (
                            <img
                                className="pic"
                                src={`${props?.avatar}`}
                                alt=""
                            />
                        )}
                    </div>
                </div>
                <div className="center">
                    <div className="upper">{props.name}</div>
                    <div className="lower">{commentDate.toLocaleString()}</div>
                </div>
                <div className="col2">
                    <span className="cardSpan">
                        {props.likes > 0 ? <Heart /> : <EmptyHeart />}&nbsp;
                        {props.likes}
                    </span>
                </div>
            </div>
            <div className="holder">
                <div className="col11">
                    <div className="loading"></div>
                </div>
                <div className="centered">{props.text}</div>
            </div>
        </div>
    );
};
