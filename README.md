# Movie Recommender System

A serverless movie recommendation system built with AWS Lambda and React. The system provides personalized movie recommendations based on user preferences and viewing history.

## 🚀 Features

- Personalized movie recommendations
- Real-time search functionality
- User preference tracking
- Responsive design
- Serverless architecture

## 🛠️ Tech Stack

### Frontend

- React
- Material-UI
- Axios

### Backend

- AWS Lambda
- Python
- PostgreSQL
- OpenAI API

## 📋 Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- AWS Account
- OpenAI API key
- PostgreSQL database

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ishaqbreiwish/movie_recommender.git
   cd movie_recommender

2. **Frontend Setup**
   ```bash
   cd react-frontend
   npm install
   npm start

3. **Backend Setup**
   ```bash
   Create virtual environment
   python -m venv myenv
   source myenv/bin/activate # On Windows: myenv\Scripts\activate
   Install dependencies
   pip install -r requirements.txt

3. **Environment Variables**
    Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key
   DATABASE_URL=your_database_url
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   

## 🚀 Deployment

### Frontend

bash
npm run build

### Backend

The backend is automatically deployed to AWS Lambda through GitHub Actions.

## 📖 API Documentation

### Endpoints

- `GET /api/movies`: Get movie recommendations
- `POST /api/preferences`: Update user preferences
- `GET /api/search`: Search for movies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- **Ishaq Breiwish** - _Initial work_

## 🙏 Acknowledgments

- OpenAI for providing the GPT API
- The Movie Database (TMDb) for movie data
- AWS for serverless infrastructure

## 📊 Performance Optimization

The application uses several optimization techniques:

- Lambda function warm-up
- Database connection pooling
- Caching for frequently accessed data
- Optimized API calls

## 🔍 Troubleshooting

Common issues and their solutions:

1. **Cold Start Issues**: Implement provisioned concurrency
2. **API Rate Limiting**: Implement request throttling
3. **Database Connection Issues**: Check connection pool settings
