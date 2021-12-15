import logging
import io
import numpy as np
import azure.functions as func
import matplotlib
import matplotlib.pyplot as plt

matplotlib.use('Agg')

def main(req: func.HttpRequest) -> func.HttpResponse:
  logging.info('Python HTTP trigger function processed a request.')

  image = io.BytesIO()
  x = np.linspace(0, 10)
  y = np.sin(x)
  plt.plot(x, y)
  plt.savefig(image, format='png')
  image.seek(0)
  return func.HttpResponse(image.read(),mimetype='image/png')
        
