from pymavlink import mavutil
import time

master = mavutil.mavlink_connection('udp:127.0.0.1:14550')
