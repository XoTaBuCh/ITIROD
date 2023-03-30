import socket
import threading
from utils import receive, send
import time

if __name__ == '__main__':
    t = time.monotonic()
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    source_port = 889

    source_ip = "127.0.0.1"
    sock.bind((source_ip, source_port))
    name = input("Input name: ")
    print("To connect: " + source_ip + f":{source_port}")
    print("Type 'exit' to exit.")

    dest_ip, dest_port = input("Enter address to connect: ").split()

    thr1 = threading.Thread(target=send, args=(name, sock, source_port, dest_port, dest_ip,))
    thr2 = threading.Thread(target=receive, args=(sock, t,))

    thr1.start()
    thr2.start()
