import React, {useEffect, useState} from "react";
import {auth} from "../firebase/firebase-config";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
    const [favorites, setFavorites] = useState([])
    const [myReviews, setMyReviews] = useState({})
    const [playlist, setPlaylist] = useState([]);
    const [follows, setFollows] = useState([])
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const getEmail = (email) => {
        setEmail(email);

    };
    const getPassword = (password) => {
        setPassword(password);
    }
    const handleRegister = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            navigate("/login", {replace: true});
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    };
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLogin(true);
            navigate("/", {replace: true});

        } catch (error) {
            console.error("Authentication failed:", error);
        }
    };
    const logout = async () => {
        try {
            await auth.signOut();
            setIsLogin(false);

        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }
    const addToFavorites = (movie) => {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        } else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites)
    };
    const addReview = (movie, review) => {
        setMyReviews({...myReviews, [movie.id]: review})
    };

    const removeFromFavorites = (movie) => {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };
    const addToFollows = (actor) => {
        let newFollows = [];
        if (!follows.includes(actor.id)) {
            newFollows = [...follows, actor.id];
        } else {
            newFollows = [...follows];
        }
        setFollows(newFollows)
    };
    const removeFromFollows = (actor) => {
        setFollows(follows.filter(
            (aId) => aId !== actor.id
        ))
    };
    const addToPlaylist = (movie) => {
        let newToPlay = [];
        if (!playlist.includes(movie.id)) {
            newToPlay = [...playlist, movie.id];
        } else {
            newToPlay = [...playlist];
        }
        setPlaylist(newToPlay);
    };
    const removeFromPlaylist = (movie) => {
        setPlaylist(playlist.filter(
            (mId) => mId !== movie.id
        ))
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                addReview,
                playlist,
                addToPlaylist,
                removeFromPlaylist,
                follows,
                addToFollows,
                removeFromFollows,
                handleLogin,
                handleRegister,
                getPassword,
                getEmail,
                isLogin,
                email,
                logout,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;