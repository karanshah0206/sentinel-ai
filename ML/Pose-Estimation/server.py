import socket, cv2, pickle, struct, imutils

# Automatic retrieval of host IP Address:
# host_name  = socket.gethostname()
# host_ip = socket.gethostbyname(host_name)

# Hardcoded IP address
host_ip = '192.168.1.109'
port = 9999

def setup_socket_connection(host_ip, port):
	# Socket Create
	server_socket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)

	print('HOST IP:', host_ip)
	socket_address = (host_ip,port)

	# Socket Bind
	server_socket.bind(socket_address)

	# Socket Listen
	server_socket.listen(5)
	print("LISTENING AT:", socket_address)

	return server_socket

def send_message(server_socket):
	# Socket Accept
	while True:
		client_socket,addr = server_socket.accept()
		print('GOT CONNECTION FROM:',addr)
		if client_socket:
			vid = cv2.VideoCapture(0, cv2.CAP_DSHOW)
			
			while(vid.isOpened()):
				img, frame = vid.read()
				frame = imutils.resize(frame, width=480)
				
				# Serializes a python object into a bytes object
				a = pickle.dumps(frame)
				
				# Returns a buffer of bytes containing value of 2nd arg
				message = struct.pack("Q", len(a)) + a

				# Sends buffer until an exception/error is encountered
				client_socket.sendall(message)
				
				cv2.imshow('Server video feed',frame)
				key = cv2.waitKey(1) & 0xFF
				if key ==ord('q'):
					client_socket.close()

server_socket = setup_socket_connection(host_ip, port)
send_message(server_socket)