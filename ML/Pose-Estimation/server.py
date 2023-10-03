import asyncio, cv2, base64, json
from websockets.server import serve
from MPPoseModel import draw

# Hardcoded IP address
host_ip = "localhost"

# Ports
raw_video_port = 9999
processed_video_port = 9998

def run_async(coroutine):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(coroutine())

async def echo(websocket):
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)

    while cap.isOpened:
        img, raw_frame = cap.read()

        processed_frame = draw(raw_frame)

        img, raw_buffer = cv2.imencode('.jpg', raw_frame)
        img, processed_buffer = cv2.imencode('.jpg', processed_frame)

        base64_message_raw = base64.b64encode(raw_buffer).decode('utf-8')
        base64_message_processed = base64.b64encode(processed_buffer).decode('utf-8')

        await websocket.send(json.dumps({"msg1": base64_message_raw, "msg2": base64_message_processed}))

async def main():
    async with serve(echo, host_ip, raw_video_port):
        await asyncio.Future()