import cv2
import mediapipe as mp
import numpy as np
from mediapipe.python.solutions.pose import PoseLandmark
from mediapipe.python.solutions.drawing_utils import DrawingSpec

mp_draw  = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
mp_hol = mp.solutions.holistic
mp_face_mesh = mp.solutions.face_mesh

LEFT_IRIS = [474, 475, 476, 477]
RIGHT_IRIS = [469, 470, 471, 472]

FACE_OVAL = [10, 338, 297, 332, 284, 251, 389, 356, 454, 323, 361, 288, 397, 365, 379, 378, 400, 377, 152, 148, 176, 
             149, 150, 136, 172, 58, 132, 93, 234, 127, 162, 21, 54, 103, 67, 109]

'''
NOSE_MOUTH = [4, 5, 45, 275, 267, 269, 270, 409, 291, 375, 321, 405, 314, 17, 84, 181, 91, 146, 61, 185, 40, 39, 37, 
              0, 267]

NOSE_MOUTH_CONNECTIONS = [(NOSE_MOUTH[i], NOSE_MOUTH[i + 1]) for i in range(len(NOSE_MOUTH) - 1)]
'''

# Define connections based on the order of landmarks in FACE_OVAL
FACE_OVAL_CONNECTIONS = [(FACE_OVAL[i], FACE_OVAL[i + 1]) for i in range(len(FACE_OVAL) - 1)]
# Add a connection between the last and first landmark to close the oval
FACE_OVAL_CONNECTIONS.append((FACE_OVAL[-1], FACE_OVAL[0]))

# Add a scale factor for the iris circles
scale_factor = 0.5

custom_style = mp_drawing_styles.get_default_pose_landmarks_style()
custom_connections = list(mp_hol.POSE_CONNECTIONS)

custom_face_landmark_style = DrawingSpec(color=(0, 0, 255), thickness=1)

hand_connections_style = DrawingSpec(color=(0, 255, 0), thickness=2)

excluded_pose_landmarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17, 18, 19, 20, 21, 22]

for landmark in excluded_pose_landmarks:
    # Change the way the excluded landmarks are drawn
    custom_style[landmark] = DrawingSpec(color=(255,255,0), thickness=None) 
    # Remove all connections which contain these landmarks
    custom_connections = [connection_tuple for connection_tuple in custom_connections 
                            if landmark not in connection_tuple]

cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
with mp_hol.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    with mp_face_mesh.FaceMesh(max_num_faces=1, 
                               refine_landmarks=True, 
                               min_detection_confidence=0.5,
                               min_tracking_confidence=0.5) as face_mesh:
        while cap.isOpened():
            ret, frame = cap.read()
            # Detection
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            img_h, img_w = frame.shape[:2]
            results = holistic.process(image)
            face_results = face_mesh.process(image)

            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            if face_results.multi_face_landmarks:
                for face_landmarks in face_results.multi_face_landmarks:
                    for landmark_num in FACE_OVAL:
                        landmark = face_landmarks.landmark[landmark_num]
                        cv2.circle(image, (int(landmark.x * img_w), int(landmark.y * img_h)), 2, (0, 255, 0), -1)
                    for connection in FACE_OVAL_CONNECTIONS:
                        start = face_landmarks.landmark[connection[0]]
                        end = face_landmarks.landmark[connection[1]]
                        cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)
                    '''
                    for landmark_num in NOSE_MOUTH:
                        landmark = face_landmarks.landmark[landmark_num]
                        cv2.circle(image, (int(landmark.x * img_w), int(landmark.y * img_h)), 2, (0, 255, 0), -1)
                    for connection in NOSE_MOUTH_CONNECTIONS:
                        start = face_landmarks.landmark[connection[0]]
                        end = face_landmarks.landmark[connection[1]]
                        cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)
                    '''
            
            # Draw hand pose landmarks
            mp_draw.draw_landmarks(image, results.right_hand_landmarks, mp_hol.HAND_CONNECTIONS, connection_drawing_spec=hand_connections_style)
            mp_draw.draw_landmarks(image, results.left_hand_landmarks, mp_hol.HAND_CONNECTIONS, connection_drawing_spec=hand_connections_style)

            # Draw pose landmarks manually
            if results.pose_landmarks:
                for idx, landmark in enumerate(results.pose_landmarks.landmark):
                    if landmark.visibility > 0.5:  # Only draw visible landmarks
                        if PoseLandmark(idx) not in excluded_pose_landmarks:
                            cv2.circle(image, (int(landmark.x * img_w), int(landmark.y * img_h)), 5, (0, 255, 0), -1)
                for connection in custom_connections:
                    start = results.pose_landmarks.landmark[connection[0]]
                    end = results.pose_landmarks.landmark[connection[1]]
                    if start.visibility > 0.5 and end.visibility > 0.5:  # Only draw visible connections
                        if PoseLandmark(connection[0]) not in excluded_pose_landmarks and PoseLandmark(connection[1]) not in excluded_pose_landmarks:
                            cv2.line(image, (int(start.x * img_w), int(start.y * img_h)), (int(end.x * img_w), int(end.y * img_h)), (0, 255, 0), 2)

            if face_results.multi_face_landmarks:
                mesh_points=np.array([np.multiply([p.x, p.y], [img_w, img_h]).astype(int) for p in face_results.multi_face_landmarks[0].landmark])
                (l_cx, l_cy), l_radius = cv2.minEnclosingCircle(mesh_points[LEFT_IRIS])
                (r_cx, r_cy), r_radius = cv2.minEnclosingCircle(mesh_points[RIGHT_IRIS])

                center_left = np.array([l_cx, l_cy], dtype=np.int32)
                center_right = np.array([r_cx, r_cy], dtype=np.int32)

                # Draw the circles with the scaled radius
                cv2.circle(image, center_left, int(l_radius * scale_factor), (0,255,0), 1, cv2.LINE_AA)
                cv2.circle(image, center_right, int(r_radius * scale_factor), (0,255,0), 1, cv2.LINE_AA)

                cv2.imshow('Video Feed', image)

            if cv2.waitKey(10) & 0xFF == ord('q'):
                break
cap.release()
cv2.destroyAllWindows()
