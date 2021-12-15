import logging

import azure.functions as func
import json
import shutil
from PIL import Image

import torch
from torchvision import models, transforms

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:

        # name = req.form['name']
        imagefile = req.files["upfile"]
        # filename = imagefile.filename
        # filestream = imagefile.stream
        # filestream.seek(0)

        image = Image.open(imagefile)
        # imgByteIO = io.BytesIO()
        # image.save(imgByteIO, format=image.format)
        # imgByteArr = imgByteIO.getvalue()

        image.save(imagefile.filename)

        # with open(filename, "wb") as f:
        #     shutil.copyfileobj(filestream.read(), f)

        # For CNN.
        resnet18= models.resnet18(pretrained=True)

        preprocess = transforms.Compose([
            transforms.Resize(224),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])

        img = preprocess(image)

        img_batch = img[None]

        resnet18.eval()

        result = resnet18(img_batch)

        idx = torch.argmax(result[0])

        # /For CNN.

        """return func.HttpResponse(
                f"OK, your upload file name is {imagefile.filename}, image size is {image.size[0]}x{image.size[1]}"
            )"""

        return func.HttpResponse(
                f"The detected class is [{idx}]!"
            )

    except Exception as e:
        return func.HttpResponse(str(e)) 

    """name = req.params.get('name')
    if not name:
        try:
            req_body = req.get_json()
        except ValueError:
            pass
        else:
            name = req_body.get('name')

    if name:
        return func.HttpResponse(f"Hello, {name}. This HTTP triggered function executed successfully.")
    else:
        return func.HttpResponse(
             "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.",
             status_code=200
        )"""
