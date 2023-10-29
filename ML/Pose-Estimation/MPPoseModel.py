import cv2
import requests
import base64
import mediapipe as mp
import numpy as np
from mediapipe.python.solutions.pose import PoseLandmark
from mediapipe.python.solutions.drawing_utils import DrawingSpec

BUFFER_PERIOD = 100 # Number of Frames to Ignore Before Starting Detection

pose_estimation_state = False  # True when target detected
target_frames_counter = 0
key_actions_detected = set()

mp_draw = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hol = mp.solutions.holistic
mp_face_mesh = mp.solutions.face_mesh

LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 
             149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]

# Define Nose and Mouth connections
NOSE = [0, 4, 6]
NOSE_CONNECTIONS = [(NOSE[i], NOSE[i + 1]) for i in range(len(NOSE) - 1)]

MOUTH_OUTER = [61, 185, 40, 39, 37, 0, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61]
MOUTH_OUTER_CONNECTIONS = [(MOUTH_OUTER[i], MOUTH_OUTER[i + 1]) for i in range(len(MOUTH_OUTER) - 1)]

# Define connections based on the order of landmarks in FACE_OVAL
FACE_OVAL_CONNECTIONS = [
    (FACE_OVAL[i], FACE_OVAL[i + 1]) for i in range(len(FACE_OVAL) - 1)
]
# Add a connection between the last and first landmark to close the oval
FACE_OVAL_CONNECTIONS.append((FACE_OVAL[-1], FACE_OVAL[0]))

# Add a scale factor for the iris circles
scale_factor = 0.5

custom_style = mp_drawing_styles.get_default_pose_landmarks_style()
custom_connections = list(mp_hol.POSE_CONNECTIONS)

custom_face_landmark_style = DrawingSpec(color=(0, 0, 255), thickness=1)

hand_connections_style = DrawingSpec(color=(0, 255, 0), thickness=2)

excluded_pose_landmarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 31, 32]

holistic = mp_hol.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5)
face_mesh = mp_face_mesh.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5,
)

for landmark in excluded_pose_landmarks:
    # Change the way the excluded landmarks are drawn
    custom_style[landmark] = DrawingSpec(color=(255, 255, 0), thickness=None)
    # Remove all connections which contain these landmarks
    custom_connections = [
        connection_tuple
        for connection_tuple in custom_connections
        if landmark not in connection_tuple
    ]

# Calculate Euclidean distance between two points
def calculate_distance(a, b):
    a = np.array(a)
    b = np.array(b)
    return np.sqrt(np.sum((a - b) ** 2))

# Calculate angle between any 3 landmarks
def calculate_angle(a, b, c):
    a = np.array(a) # First
    b = np.array(b) # Mid
    b = np.array(c) # End
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(radians*180.0/np.pi)
    if angle >180.0:
        angle = 360-angle        
    return angle

# Switch Between Detection On/Off State
def switch_state(image):
    global pose_estimation_state
    

# New Target Detected, Update Entry in Database
def save_target_on_database(image):
    _, img_encoded = cv2.imencode(".jpg", image)
    data = {"Image": str(base64.b64encode(img_encoded))[2:-1]}
    requests.post("https://localhost:7251/History", verify=False, json=data)

def getKeyActions():
    global key_actions_detected
    return list(key_actions_detected)

def draw(frame):
    global pose_estimation_state
    global target_frames_counter
    global key_actions_detected

    new_key_actions_detected = False

    # Detection
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    img_h, img_w = frame.shape[:2]
    results = holistic.process(image)
    face_results = face_mesh.process(image)

    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Pose Estimation State Transitions
    if ((face_results.multi_face_landmarks or results.pose_landmarks) and not pose_estimation_state) or (not (face_results.multi_face_landmarks or results.pose_landmarks) and pose_estimation_state):
        pose_estimation_state = not pose_estimation_state
        key_actions_detected = set()
        new_key_actions_detected = True
        target_frames_counter = 0

    # No Need for Processing if No Target Found
    if pose_estimation_state == False:
        return (image, new_key_actions_detected)

    # If Target Found, Increment Target Frames Counter
    target_frames_counter = target_frames_counter + 1

    # On New Target, Allow Buffer Period to Settle into Frame
    if target_frames_counter < BUFFER_PERIOD:
        return (image, new_key_actions_detected)

    # Save Target's Image to DB on End of Buffer Period
    if target_frames_counter == BUFFER_PERIOD:
        save_target_on_database(image)

    # Drawing Face, Nose and Mouth Connections
    if face_results.multi_face_landmarks:
        for face_landmarks in face_results.multi_face_landmarks:
            # Draw Face Landmarks
            for landmark_num in FACE_OVAL:
                landmark = face_landmarks.landmark[landmark_num]
                cv2.circle(image, (int(landmark.x * img_w), int(landmark.y * img_h)), 4, (0, 0, 255), -1)

            # Draw Face Landmark Connections
            for connection in FACE_OVAL_CONNECTIONS:
                start = face_landmarks.landmark[connection[0]]
                end = face_landmarks.landmark[connection[1]]
                cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)

            # Draw Noses Landmark Connections
            for connection in NOSE_CONNECTIONS:
                start = face_landmarks.landmark[connection[0]]
                end = face_landmarks.landmark[connection[1]]
                cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)

            #  Draw Mouth Landmark Connections
            for connection in MOUTH_OUTER_CONNECTIONS:
                start = face_landmarks.landmark[connection[0]]
                end = face_landmarks.landmark[connection[1]]
                cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)

    # Draw Hand Landmarks & Connections
    mp_draw.draw_landmarks(image, results.right_hand_landmarks, mp_hol.HAND_CONNECTIONS, connection_drawing_spec=hand_connections_style)
    mp_draw.draw_landmarks(image, results.left_hand_landmarks, mp_hol.HAND_CONNECTIONS, connection_drawing_spec=hand_connections_style)

    # Draw Upper Body Pose Landmarks & Connections
    if results.pose_landmarks:
        # Draw Upper Body Pose Landmarks
        for idx, landmark in enumerate(results.pose_landmarks.landmark):
            if landmark.visibility > 0.5:
                if PoseLandmark(idx) not in excluded_pose_landmarks:
                    cv2.circle(image, (int(landmark.x * img_w), int(landmark.y * img_h)), 5, (0, 0, 255), -1)

        # Draw Upper Body Pose Connections
        for connection in custom_connections:
            start = results.pose_landmarks.landmark[connection[0]]
            end = results.pose_landmarks.landmark[connection[1]]
            if (start.visibility > 0.5 and end.visibility > 0.5):
                if (PoseLandmark(connection[0]) not in excluded_pose_landmarks and PoseLandmark(connection[1]) not in excluded_pose_landmarks):
                    cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)

    # Draw Irides
    if face_results.multi_face_landmarks:
        mesh_points = np.array([
            np.multiply([p.x, p.y], [img_w, img_h]).astype(int)
            for p in face_results.multi_face_landmarks[0].landmark
        ])

        (l_cx, l_cy), l_radius = cv2.minEnclosingCircle(mesh_points[LEFT_IRIS])
        (r_cx, r_cy), r_radius = cv2.minEnclosingCircle(mesh_points[RIGHT_IRIS])

        center_left = np.array([l_cx, l_cy], dtype=np.int32)
        center_right = np.array([r_cx, r_cy], dtype=np.int32)

        cv2.circle(image, center_left, int(l_radius * scale_factor), (0, 255, 0), 1, cv2.LINE_AA)
        cv2.circle(image, center_right, int(r_radius * scale_factor), (0, 255, 0), 1, cv2.LINE_AA)

    # Pose Classification on Upper Body
    if results.pose_landmarks:
        # Getting Wrist, Elbow & Shoulder Landmarks
        landmarks = results.pose_landmarks.landmark
        left_wrist = [landmarks[mp_hol.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_hol.PoseLandmark.LEFT_WRIST.value].y]
        right_wrist = [landmarks[mp_hol.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_hol.PoseLandmark.RIGHT_WRIST.value].y]
        left_elbow = [landmarks[mp_hol.PoseLandmark.LEFT_ELBOW.value].x, landmarks[mp_hol.PoseLandmark.LEFT_ELBOW.value].y]
        right_elbow = [landmarks[mp_hol.PoseLandmark.RIGHT_ELBOW.value].x, landmarks[mp_hol.PoseLandmark.RIGHT_ELBOW.value].y]
        left_shoulder = [landmarks[mp_hol.PoseLandmark.LEFT_SHOULDER.value].x, landmarks[mp_hol.PoseLandmark.LEFT_SHOULDER.value].y]
        right_shoulder = [landmarks[mp_hol.PoseLandmark.RIGHT_SHOULDER.value].x, landmarks[mp_hol.PoseLandmark.RIGHT_SHOULDER.value].y]

        # Calculating Relative Distances
        distance_left_wrist_right_elbow = calculate_distance(left_wrist, right_elbow)
        distance_right_wrist_left_elbow = calculate_distance(right_wrist, left_elbow)

        # Detect Folded Arms
        if (distance_left_wrist_right_elbow < 0.25 and distance_right_wrist_left_elbow < 0.25):
            if (left_wrist[0] > right_shoulder[0] and right_wrist[0] < left_shoulder[0]):
                key_actions_detected.add("Folded Arms")
                new_key_actions_detected = True

        # Detect Soothing Arms
        if distance_left_wrist_right_elbow < 0.2 and distance_right_wrist_left_elbow > 0.2:
            key_actions_detected.add("Soothing Arms")
            new_key_actions_detected = True
        elif distance_right_wrist_left_elbow < 0.2 and distance_left_wrist_right_elbow > 0.2:
            key_actions_detected.add("Soothing Arms")
            new_key_actions_detected = True

    # Pose Classification on Hands
    if results.left_hand_landmarks and results.right_hand_landmarks:
        # Detect Holding Hands
        close_fingers = 0
        finger_tips = { 'thumb': mp_hol.HandLandmark.THUMB_TIP, 'index': mp_hol.HandLandmark.INDEX_FINGER_TIP, 'middle': mp_hol.HandLandmark.MIDDLE_FINGER_TIP }

        for finger, landmark in finger_tips.items():
            # Get Finger Tips
            left_finger_tip = [results.left_hand_landmarks.landmark[landmark.value].x, results.left_hand_landmarks.landmark[landmark.value].y]
            right_finger_tip = [results.right_hand_landmarks.landmark[landmark.value].x, results.right_hand_landmarks.landmark[landmark.value].y]

            if calculate_distance(left_finger_tip, right_finger_tip) < 0.1:
                close_fingers += 1

        if close_fingers >= 3:
            key_actions_detected.add("Holding Hands")
            new_key_actions_detected = True
    else:
        # Detect Hiding Hands
        key_actions_detected.add("Hiding Hands")
        new_key_actions_detected = True

    return (image, new_key_actions_detected)
