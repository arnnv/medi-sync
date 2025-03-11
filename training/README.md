# X-Ray Fracture Detection

This project is designed to classify X-ray images into different body parts and detect fractures using deep learning models. The models are built using TensorFlow and Keras, leveraging the ResNet50 architecture.

## Directory Structure

- **predictions.py**: Contains functions for loading models and making predictions on X-ray images.
- **pred_test_metrics.py**: Includes functions for evaluating model predictions and generating classification reports.
- **training fracture.ipynb**: Jupyter notebook for training models specifically for fracture detection.
- **training parts.ipynb**: Jupyter notebook for training models to classify different body parts.
- **weights/**: Directory where trained model weights are stored.
- **plots/**: Contains plots of model accuracy and loss during training.
- **test/**: Directory for test datasets.
- **dataset/**: Contains the dataset used for training and testing.

## Getting Started

### Prerequisites

- Python 3.x
- TensorFlow
- Keras
- NumPy
- Pandas
- Matplotlib
- Scikit-learn
- Tqdm
- Tabulate

### Installation

1. Clone the repository.
2. Install the required packages using pip:
   ```bash
   pip install tensorflow keras numpy pandas matplotlib scikit-learn tqdm tabulate
   ```

### Usage

1. **Training**: Use the Jupyter notebooks (`training fracture.ipynb` and `training parts.ipynb`) to train the models. Ensure the dataset is properly structured in the `dataset/` directory.
2. **Prediction**: Use `predictions.py` to load models and make predictions on new X-ray images.
3. **Evaluation**: Use `pred_test_metrics.py` to evaluate model performance and generate reports.

### Results

- The classification reports and plots generated during training are stored in the `plots/` directory.
- Model weights are saved in the `weights/` directory.

## License

This project is licensed under the MIT License.

## Acknowledgments

- TensorFlow and Keras for providing the deep learning framework.
- The authors of the ResNet50 architecture.
