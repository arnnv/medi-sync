# MediSync

MediSync is a comprehensive medical imaging platform that uses AI to analyze X-ray images, detect fractures, and generate detailed medical reports. The system combines a modern React frontend with a powerful AI-driven backend to provide healthcare professionals with an efficient tool for medical image analysis.

## 🚀 Features

- **AI-Powered X-ray Analysis**: Automatically detect fractures and classify body parts in X-ray images
- **Intelligent Report Generation**: Create detailed medical reports using advanced AI models
- **Modern Web Interface**: Intuitive, responsive UI built with React and Tailwind CSS
- **Secure API Backend**: FastAPI-based backend with TensorFlow and LangGraph integration
- **Training Pipeline**: Complete training pipeline for X-ray classification and fracture detection models

## 🏗️ Project Structure

```
medi-sync-prod/
├── frontend/           # React frontend application
├── backend/            # FastAPI backend service
├── training/           # Model training scripts and notebooks
├── .gitignore         # Git ignore file
├── .gitmodules        # Git submodules configuration
├── LICENSE            # MIT license
└── README.md          # This file
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Radix UI
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Build Tool**: Vite

### Backend

- **Framework**: FastAPI
- **AI Models**: TensorFlow, LangChain, LangGraph
- **Image Processing**: Pillow, NumPy
- **Generative AI**: Google Generative AI
- **Deployment**: Docker, Hugging Face Spaces

### Training

- **Framework**: TensorFlow, Keras
- **Architecture**: ResNet50
- **Data Processing**: NumPy, Pandas
- **Visualization**: Matplotlib
- **Evaluation**: Scikit-learn

## 📋 Prerequisites

- **Frontend**: Node.js 18.x or higher, npm or yarn
- **Backend**: Python 3.10 or higher, pip
- **Training**: Python 3.x, TensorFlow, Jupyter Notebook
- **Optional**: Docker for containerized deployment

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/arnnv/medi-sync.git
cd medi-sync
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:

   - Create a `.env` file in the frontend directory
   - Add the following variables:
     ```env
     VITE_API_URL=your_backend_api_url
     ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The application will be available at `http://localhost:5173`

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:

   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:

   - Create a `.env` file in the backend directory
   - Add required environment variables:
     ```
     GOOGLE_API_KEY=your_google_api_key_here
     ```

5. Download model weights:

   - Create a `weights` directory in the backend folder
   - Download the required model weights and place them in the `weights` directory

6. Run the development server:
   ```bash
   python app.py
   ```
   The server will start on `http://localhost:7860`

### Training Setup

1. Navigate to the training directory:

   ```bash
   cd training
   ```

2. Install required packages:

   ```bash
   pip install tensorflow keras numpy pandas matplotlib scikit-learn tqdm tabulate
   ```

3. Use the Jupyter notebooks for training:
   - `training fracture.ipynb` for fracture detection models
   - `training parts.ipynb` for body part classification models

## 🚢 Deployment

### Frontend Deployment

The frontend is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using the Vercel dashboard or CLI

### Backend Deployment

The backend is configured for deployment on Hugging Face Spaces:

1. Using Docker:

   ```bash
   cd backend
   docker build -t medisync-backend .
   docker run -p 7860:7860 --env-file .env medisync-backend
   ```

2. On Hugging Face Spaces:
   - Push the backend code to a Hugging Face Space
   - Configure the Space to use Docker deployment
   - Set the required environment variables in the Space settings

## 📄 API Documentation

The backend provides the following main endpoints:

- `POST /predict`: Upload and analyze medical images
- `POST /generate-report`: Generate medical reports based on analysis
- Additional endpoints are documented in the backend's `api.py`

## 🧪 Training Models

The training directory contains Jupyter notebooks for training the X-ray classification and fracture detection models:

1. **Body Part Classification**: Uses ResNet50 architecture to classify X-ray images into different body parts
2. **Fracture Detection**: Uses ResNet50 architecture to detect fractures in X-ray images

The trained model weights are stored in the `weights` directory and used by the backend for predictions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

- **Arnav Gupta** - [GitHub](https://github.com/arnnv)

## 🙏 Acknowledgments

- TensorFlow and Keras for providing the deep learning framework
- The authors of the ResNet50 architecture
- React and Vite teams for the frontend framework and build tools
- FastAPI for the backend framework
- Google Generative AI for report generation capabilities
