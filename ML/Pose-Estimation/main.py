import cv2
from MPPoseModel import draw
from server import setup_server, send_message

if __name__ == "__main__":
  cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

  raw_video_client_socket, processed_video_client_socket = setup_server()

  while cap.isOpened:
    img, raw_frame = cap.read()

    processed_frame = draw(raw_frame)

    send_message(raw_frame, raw_video_client_socket)
    send_message(processed_frame, processed_video_client_socket)

    if cv2.waitKey(5) & 0xFF == ord('q'):
      raw_video_client_socket.close()
      processed_video_client_socket.close()
      break

  cap.release()
  cv2.destroyAllWindows()