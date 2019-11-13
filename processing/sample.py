import time
import random
import sys


def main():
	sleep_time = 2 + random.randint(1,2)
	time.sleep(sleep_time)
	if len(sys.argv) >= 2:
		print(f'{sys.argv[1]}')
	else:
		print("no_args")
	
	
main()