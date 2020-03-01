import json
from datetime import datetime
import numpy as np


def prolyzer(event, context):
    # Playing around with numpy
    a = np.arange(15).reshape(3, 5)

    response = {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Welcome to Prolyzer on Python. The time is " + datetime.now().isoformat(),
            "sampleNumpyArray": a.tolist()
        })
    }

    return response


handler = prolyzer
'''tone_analysis = tone_analyzer.tone(
{'text': nTweet},
content_type='application/json'
).get_result()

print(json.dumps(tone_analysis))'''

