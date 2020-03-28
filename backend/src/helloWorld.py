import json
from datetime import datetime
import numpy as np


def hello_world(event, context):
    # Playing around with numpy
    a = np.arange(15).reshape(3, 5)

    print(event, flush=True)
    print(context, flush=True)
    response = {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Welcome to Prolyzer on Python. The time is " + datetime.now().isoformat(),
            "sampleNumpyArray": a.tolist()
        }),
        "headers": {
            "Access-Control-Allow-Origin": '*',
            "Access-Control-Allow-Credentials": True,
        }
    }

    return response


handler = hello_world
