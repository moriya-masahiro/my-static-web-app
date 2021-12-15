import logging

import azure.functions as func
import json
import shutil
from PIL import Image

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

        return func.HttpResponse(
                f"OK, your upload file name is {imagefile.filename}"
            )
    except Exception as e:
        return func.HttpResponse(
                    body = str(e),
                    headers = {"my-http-header": "some-value"},
                    status_code=200
                ) 

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
