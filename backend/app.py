import datetime as dt
from flask import Flask, request, Request
import dataclasses

from api.model.search_parameters import SearchParameters, SeatClass

from predict.predict_flights import get_flights

app = Flask(__name__)

@app.route("/flights")
def hello_world():
    try:
        search_parameters = SearchParameters(
            int(get_parameter(request, "numPassengers")),
            SeatClass[get_parameter(request, "seatClass")],
            dt.datetime.strptime(get_parameter(request, "departDate"), '%m-%d-%Y').date(),
            dt.datetime.strptime(get_parameter(request, "returnDate"), '%m-%d-%Y').date(),
            get_parameter(request, "departAirport"),
            get_parameter(request, "returnAirport")
        )
    except ValueError as e:
        return str(e), 400
    except KeyError as e:
        return f"Invalid key {str(e)}", 400
    except Exception as e:
        return str(e), 400

    return get_flights(search_parameters)

def get_parameter(req: Request, param: str) -> str:
    param_value = req.args.get(param)

    if param_value is None:
        raise ValueError(f"Missing parameter {param}")
    
    return param_value