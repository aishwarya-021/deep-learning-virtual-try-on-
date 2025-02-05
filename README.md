<br/>Dataset: [VITON_PLUS](https://1drv.ms/u/s!Ai8t8GAHdzVUiQQYX0azYhqIDPP6?e=4cpFTI)

- Python 3.11 support.
  - torch=2.0.1
  - torchvision=0.15.2
  - opencv = 4.8.1.78
- CPU support only (slower than GPU)
  - no need to install cuda and cudnn
- Run `app.py` for testing or training. 
- it can automatically run both commands (GMM and TOM) and take care of copying files. 
- For training / testing 
  - `subprocess.call(gmm_train/gmm_test, shell=True)`
  - `subprocess.call(tom_train/tom_test, shell=True)`
- fix all the deprecated warning of torch and resolve all isuses regarding dependency.
- have a dedicated branch for only-cpu version.

if you find any problem feel free to raise issue.


## Installation and Run
create and virtual env.

after that, install the dependencies.
```bash
pip install -r requirements.txt
```

### AutoRun
Run `python app.py`

for tensorboard Run `tensorboard --logdir tensorboard`

### Training
Run python train.py with your specific usage options for GMM and TOM stage.
For example, GMM: python train.py --name GMM --stage GMM --workers 4 --save_count 5000 --shuffle
Then run test.py for GMM network with the training dataset, which will generate the warped clothes and masks in "warp-cloth" and "warp-mask" folders inside the "result/GMM/train/" directory. Copy the "warp-cloth" and "warp-mask" folders into your data directory, for example inside "data/train" folder.
Run TOM stage, python train.py --name TOM --stage TOM --workers 4 --save_count 5000 --shuffle#training
### Testing
Run 'python test.py' with your specific usage options.
For example, GMM: python test.py --name GMM --stage GMM --workers 4 --datamode test --data_list test_pairs.txt --checkpoint checkpoints/GMM/gmm_final.pth
Then run test.py for GMM network with the testing dataset, which will generate the warped clothes and masks in "warp-cloth" and "warp-mask" folders inside the "result/GMM/test/" directory. Copy the "warp-cloth" and "warp-mask" folders into your data directory, for example inside "data/test" folder.
Run TOM stage: python test.py --name TOM --stage TOM --workers 4 --datamode test --data_list test_pairs.txt --checkpoint checkpoints/TOM/tom_final.pth#testing

Testing with custom images
to run the model with custom internet images, make sure you have the following:

image (image of a person, crop/resize to 192 x 256 (width x height) pixels)
image-parse (you can generate with CIHP_PGN or Graphonomy pretrained networks from the person image. See this comment)
cloth (in-shop cloth image, crop/resize to 192 x 256 (width x height) pixels)
cloth-mask (binary mask of cloth image, you can generate it with simple pillow/opencv function)
pose (pose keypoints of the person, generate with openpose COCO-18 model (OpenPose from the official repository is preferred))
Also, make a test_pairs.txt file for your custom images. Follow the VITON dataset format to keep same arrangements, otherwise you can modify the code.


There are many factors that can make distorted/unexpected results. when you encounter unexpected results do as fololows:

First try the original viton dataset and test pair combinations, check the intermediate results and the final output. Check if they are as expected.
If the original viton results are not as expected, please check the issues raised in this github repo, people have already found several issues and see how they solved it.
If the original viton test results are as expected, then run your custom test sets and check the intermediate results and debug where its going wrong.
If you are testing with custom images then check the github repository readme and related issues on how to run with custom images.

