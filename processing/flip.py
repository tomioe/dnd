import cv2
import sys
import os
import time

def main():
    if len(sys.argv) >= 2:
        arg = sys.argv[1]

        path = arg[0:arg.rfind(os.sep)]
        temp_filename = arg[arg.rfind(os.sep)+1:]
        dot_index = temp_filename.rfind(".")
        filename = temp_filename[:dot_index] + '_out' + temp_filename[dot_index:]
        full_path = os.path.join(path, filename)
        
        img = cv2.imread(arg)
        out_img = cv2.rotate(img, cv2.ROTATE_180)
        cv2.imwrite(full_path, out_img)
		
        time.sleep(30)

        print(full_path, flush=True)
    else:
        print("no_args", flush=True)
        
main()