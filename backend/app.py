import datetime as dt
from flask import Flask, request, Request
from flask_cors import CORS

from api.model.search_parameters import SearchParameters, SeatClass
from predict.predict_flights import get_flights

from typing import Tuple, Callable, TypeVar

app = Flask(__name__)
CORS(app)


@app.route("/flights")
def hello_world():
    try:
        search_parameters = parse_search_parameters(request)
    except Exception as e:
        return error_response(str(e), 400)

    return [flight.to_json_dict() for flight in get_flights(search_parameters)]


def parse_search_parameters(req: Request) -> SearchParameters:
    return SearchParameters(
            get_parameter(req, "numPassengers", int),
            get_parameter(req, "seatClass", lambda p: SeatClass[p]),
            get_parameter(req, "departDate", lambda p: dt.datetime.strptime(p, '%Y-%m-%d').date()),
            get_parameter(req, "returnDate", lambda p: dt.datetime.strptime(p, '%Y-%m-%d').date()),
            get_parameter(req, "departAirport"),
            get_parameter(req, "arriveAirport")
        )


def error_response(message: str, code: int) -> Tuple[str, int]:
    return {"error": message}, code


T = TypeVar("T")
def get_parameter(req: Request, param: str, parser: Callable[[str], T] = None) -> T:
    if parser is None:
        parser = lambda x: x
    
    param_value = req.args.get(param)

    if param_value is None:
        raise ValueError(f"Missing parameter {param}")
    
    try:
        parsed = parser(param_value)
    except Exception as e:
        raise ValueError(f"Invalid value for {param}: {str(e)}")

    return parsed