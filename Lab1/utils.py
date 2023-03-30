import os
import struct
import time


def send(name, sock, source_port, dest_port, dest_ip):
    while True:
        message = input()
        date_send = time.monotonic()

        if message == "exit":
            exit(0)

        mes = f"{name}- {message}".encode()
        header = struct.pack("!IIIII", source_port, int(dest_port), len(mes), check_sum(mes), int(date_send))
        packet = header + mes
        sock.sendto(packet, (dest_ip, int(dest_port)))


def receive(sock, t):
    time_received = t

    while True:
        packet, sender_address = sock.recvfrom(1024)
        header = packet[:20]
        data = packet[20:]

        header = struct.unpack("!IIIII", header)

        sender_len = header[2]
        sender_sum = header[3]
        time_send = header[4]

        checksum = check_sum(data)
        data = data.decode()

        flag = time_send >= time_received

        if sender_sum == checksum and sender_len == len(data) and flag:
            time_received = time_send
            print("MES: " + data)

        elif not flag:
            raise ("Неправильный порядок")

        else:
            raise ("Не все данные дошли")


def check_sum(data):
    checksum = 0
    data_len = len(data)
    if data_len % 2:
        data_len += 1
        data += struct.pack('!B', 0)

    for i in range(0, data_len, 2):
        w = (data[i] << 8) + (data[i + 1])
        checksum += w

    checksum = (checksum >> 16) + (checksum & 0xFFFF)
    checksum = ~checksum & 0xFFFF
    return checksum
