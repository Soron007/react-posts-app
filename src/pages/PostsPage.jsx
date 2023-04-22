import { useEffect, useState } from "react";
import axios from "axios";
import {
    Grid,
    Typography,
    CircularProgress,
    Card,
    AppBar,
    Toolbar,
    IconButton,
    ThemeProvider,
    createTheme,
    CssBaseline,
    useTheme,
    Zoom,
} from "@mui/material";
import { styled } from "@mui/system";
import { Brightness2, Brightness7 } from "@mui/icons-material";
import { Posts } from "../components/Posts";

export const PostsPage = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [err, setErr] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/posts");
                const data = response.data;
                setPosts(data.posts);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setErr(true);
            }
        };
        fetchPosts();



    }, []);

    const CustomCard = styled(Card)({
        backgroundColor: darkMode ? "#424242" : "#fafafa",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "none",
        cursor: "pointer",
        transition: "all 0.3s ease-out",
        transform: "translate(0, 0)",
        "&:hover": {
            transform: "translate(-5px, -5px)",
            boxShadow: `0px 5px 5px ${theme.palette.success.main}`,
        },

    });

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeProvider theme={createTheme({ palette: { mode: darkMode ? "dark" : "light" } })}>
            <CssBaseline />
            <AppBar position="sticky">
                <Toolbar>
                    <Typography fontWeight="bold" variant="h6" sx={{ flexGrow: 1 }}>
                        My Posts
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="toggle dark mode"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <Brightness7 /> : <Brightness2 />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            {!err ? (
                <>
                    <Zoom in timeout={transitionDuration} style={{ transitionDelay: `${darkMode ? transitionDuration.exit : 0}ms` }}>
                        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ my: 4 }}>
                            Below are the list of available posts
                        </Typography>
                    </Zoom>
                    <Grid container spacing={2}>
                        {loading ? (
                            <Grid item xs={12}>
                                <CircularProgress />
                            </Grid>
                        ) :

                            <Posts posts={posts}
                                CustomCard={CustomCard}
                                transitionDuration={transitionDuration}
                                darkMode={darkMode}

                            />}
                    </Grid>
                </>
            ) : (
                <Typography variant="h4" fontWeight="bold" color="primary" sx={{ my: 4 }}>
                    Sorry, something went wrong. Please try again after sometime. Sigh!
                </Typography>

            )}
        </ThemeProvider>
    );
};


