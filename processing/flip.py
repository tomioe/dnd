import cv2
import sys
import os
import time

def main():
    if len(sys.argv) >= 2:
        
        # argument should always be the full file path to the image (e.g. "/tmp/images/img.jpg")
        arg = sys.argv[1]

        # find the full path of the file (e.g. "/tmp/images/")
        path = arg[0:arg.rfind(os.sep)]
        # get the filename (e.g. "img.jpg")
        temp_filename = arg[arg.rfind(os.sep)+1:]
        # get the index of the filename without the extension
        dot_index = temp_filename.rfind(".")
        # make a new string that is "[filename]_out.[extension]" (e.g. "img_out.jpg")
        filename = temp_filename[:dot_index] + '_out' + temp_filename[dot_index:]
        # join the previously extracted path with the new filename
        full_path = os.path.join(path, filename)
        
        # read the given input image
        img = cv2.imread(arg)
        # rotate it 180 degres
        out_img = cv2.rotate(img, cv2.ROTATE_180)
        # write the output image
        cv2.imwrite(full_path, out_img)
		
        # simulate that this process actually takes a while longer,
        # to ensure frontend can handle long processing time
        time.sleep(30)

        # print out the path of the output file
        print(full_path, flush=True)
    else:
        print("no_args", flush=True)
        
main()