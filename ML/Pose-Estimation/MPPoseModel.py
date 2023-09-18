import cv2
import mediapipe as mp
import numpy as np
from mediapipe.python.solutions.pose import PoseLandmark
from mediapipe.python.solutions.drawing_utils import DrawingSpec

mp_draw  = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hol = mp.solutions.holistic

custom_style = mp_drawing_styles.get_default_pose_landmarks_style()
custom_connections = list(mp_hol.POSE_CONNECTIONS)

custom_face_landmark_style = DrawingSpec(color=(0, 0, 255), thickness=1)  # Adjust the thickness as needed

excluded_landmarks = [
    PoseLandmark.LEFT_EYE, 
    PoseLandmark.RIGHT_EYE, 
    PoseLandmark.LEFT_EYE_INNER, 
    PoseLandmark.RIGHT_EYE_INNER, 
    PoseLandmark.LEFT_EAR,
    PoseLandmark.RIGHT_EAR,
    PoseLandmark.LEFT_EYE_OUTER,
    PoseLandmark.RIGHT_EYE_OUTER,
    PoseLandmark.NOSE,
    PoseLandmark.MOUTH_LEFT,
    PoseLandmark.MOUTH_RIGHT,
    PoseLandmark.LEFT_THUMB,
    PoseLandmark.LEFT_INDEX,
    PoseLandmark.LEFT_PINKY,
    PoseLandmark.RIGHT_THUMB,
    PoseLandmark.RIGHT_INDEX,
    PoseLandmark.RIGHT_PINKY]

for landmark in excluded_landmarks:
    # Change the way the excluded landmarks are drawn
    custom_style[landmark] = DrawingSpec(color=(255,255,0), thickness=None) 
    # Remove all connections which contain these landmarks
    custom_connections = [connection_tuple for connection_tuple in custom_connections 
                            if landmark.value not in connection_tuple]

cap = cv2.VideoCapture(0)
with mp_hol.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    while cap.isOpened():
        ret, frame = cap.read()
        
        # Detection

        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        results = holistic.process(image)
        #print (results)

        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

        mp_draw.draw_landmarks(image, results.face_landmarks, mp_hol.FACEMESH_CONTOURS, landmark_drawing_spec=custom_face_landmark_style)

        mp_draw.draw_landmarks(image, results.right_hand_landmarks, mp_hol.HAND_CONNECTIONS)

        mp_draw.draw_landmarks(image, results.left_hand_landmarks, mp_hol.HAND_CONNECTIONS)

        mp_draw.draw_landmarks(image, results.pose_landmarks, custom_connections, landmark_drawing_spec=custom_style)

        cv2.imshow('Video Feed', image)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()
