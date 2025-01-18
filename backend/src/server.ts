import app from './app'; 
import dotenv from 'dotenv';

dotenv.config();

// const PORT = process.env.PORT || 5000;

app.listen(5000,'0.0.0.0',() => {
  console.log(`Server is running on port 5000`);
});
