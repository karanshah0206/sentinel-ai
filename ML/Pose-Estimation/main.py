import cv2, asyncio, threading, concurrent.futures
from server import main

if __name__ == "__main__":
    
    asyncio.run(main())

    if cv2.waitKey(5) & 0xFF == ord("q"):
        pass

    cv2.destroyAllWindows()