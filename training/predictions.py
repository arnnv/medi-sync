import numpy as np
import tensorflow as tf
from keras.preprocessing import image
from typing import Dict, Union

# Model paths
MODEL_PATHS = {
    'Parts': "weights/ResNet50_BodyParts.h5",
    'Elbow': "weights/ResNet50_Elbow_frac.h5", 
    'Hand': "weights/ResNet50_Hand_frac.h5",
    'Shoulder': "weights/ResNet50_Shoulder_frac.h5"
}

# Categories for predictions
CATEGORIES_PARTS = ["Elbow", "Hand", "Shoulder"]
CATEGORIES_FRACTURE = ['fractured', 'normal']

# Load models
models: Dict[str, tf.keras.Model] = {}
try:
    for model_name, path in MODEL_PATHS.items():
        models[model_name] = tf.keras.models.load_model(path)
except Exception as e:
    raise RuntimeError(f"Failed to load models: {e}")

def preprocess_image(img: Union[str, np.ndarray], target_size: int = 224) -> np.ndarray:
    """
    Preprocess image for model input.
    
    Args:
        img: Input image as file path or numpy array
        target_size: Target size for image resizing
        
    Returns:
        Preprocessed image as numpy array
    """
    if isinstance(img, str):
        img = tf.keras.utils.load_img(img, target_size=(target_size, target_size))
        img = tf.keras.utils.img_to_array(img)
    elif isinstance(img, np.ndarray):
        if img.shape[:2] != (target_size, target_size):
            raise ValueError(f"Input image must be of size ({target_size}, {target_size})")
    else:
        raise TypeError("Input image must be a file path or numpy array")
        
    return np.expand_dims(img, axis=0)

def predict(img: Union[str, np.ndarray], model: str = "Parts", verbose: int = 0) -> str:
    """
    Predict body part or fracture status from X-ray image.
    
    Args:
        img: Input image as file path or numpy array
        model: Model to use for prediction ('Parts', 'Elbow', 'Hand', or 'Shoulder')
        verbose: Verbosity level for model prediction
        
    Returns:
        Prediction string (body part or fracture status)
    """
    if model not in models:
        raise ValueError(f"Invalid model '{model}'. Valid options are: {list(models.keys())}")
        
    # Preprocess image
    processed_img = preprocess_image(img)
    
    try:
        # Get prediction
        prediction = np.argmax(models[model].predict(processed_img, verbose=verbose), axis=1)
        
        # Map prediction index to category string
        categories = CATEGORIES_PARTS if model == 'Parts' else CATEGORIES_FRACTURE
        return categories[prediction.item()]
        
    except Exception as e:
        raise RuntimeError(f"Prediction failed: {e}")