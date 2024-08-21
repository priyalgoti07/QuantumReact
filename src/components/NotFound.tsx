import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const NotFound: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-50">
            <Card className="w-[30rem] h-72 bg-opacity-75" elevation={3}>
                <CardContent className="flex flex-col justify-center items-center h-full">
                    <Typography variant="h4" component="div" className="text-black">
                        404
                    </Typography>
                    <Typography variant="h6" component="div" className="mt-4">
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" component="p" className="mt-2 text-center">
                        Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
                    </Typography>
                    <Typography component="div" className="mt-6 text-center">
                        <ArrowLeftIcon fontSize='small'/>
                        <Link
                            to="/"
                            className="font-bold underline hover:text-blue-900"
                        >
                            Back To Site
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default NotFound;
