import socket, pickle, struct, imutils

# Automatic retrieval of host IP Address:
# host_name  = socket.gethostname()
# host_ip = socket.gethostbyname(host_name)

# Hardcoded IP address
host_ip = '192.168.1.109'

# Ports
raw_video_port = 9999
processed_video_port = 9998

def setup_server():
	raw_video_server_socket =  setup_socket(raw_video_port)
	processed_video_server_socket = setup_socket(processed_video_port)

	# Socket Accept
	raw_video_client_socket, addr = raw_video_server_socket.accept()
	print('RECEIVED CONNECTION FROM:', addr)
	processed_video_client_socket, addr = processed_video_server_socket.accept()
	print('RECEIVED CONNECTION FROM:', addr)
	
	return (raw_video_client_socket, processed_video_client_socket)

def setup_socket(port):
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

def send_message(img, client_socket):
	if client_socket:
			img - imutils.resize(img, width=640)

			# Serializes a python object into a bytes object
			a = pickle.dumps(img)
			
			# Returns a buffer of bytes containing value of 2nd arg
			message = struct.pack("Q", len(a)) + a

			# Sends buffer until an exception/error is encountered
			client_socket.sendall(message)