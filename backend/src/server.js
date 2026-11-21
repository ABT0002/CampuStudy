import express from 'express';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//Health-Check Endpoint 
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'CampuStudy backend server is running successfully'
    });
});

//endpoints for study group
apps.use('/api/study-groups', studyGroupRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 