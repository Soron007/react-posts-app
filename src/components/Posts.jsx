import {
    Grid,
    Typography,
    CardContent,
    Zoom,
} from "@mui/material";

export const Posts = ({ posts, CustomCard, darkMode, transitionDuration }) => {
    return (
        (
            posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <Zoom in timeout={transitionDuration} style={{ transitionDelay: `${darkMode ? transitionDuration.exit : 0}ms` }}>
                        <CustomCard>
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="primary">
                                    {post.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ color: darkMode ? "#f5f5f5" : undefined }}
                                >
                                    {post.body}
                                </Typography>
                            </CardContent>
                        </CustomCard>
                    </Zoom>
                </Grid>
            ))
        )
    )
}


