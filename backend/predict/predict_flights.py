import datetime as dt
import random

from api.model.search_parameters import SearchParameters
from api.model.flight_result import FlightResult

from typing import List

def get_flights(flight_search: SearchParameters) -> List[FlightResult]:
    return [dummy_flight_result(flight_search) for _ in range(10)]

def dummy_flight_result(flight_search: SearchParameters) -> FlightResult:
    takeoff_time = dt.datetime.combine(flight_search.depart_date, dt.datetime.min.time())+ dt.timedelta(hours=random.randint(6, 18))

    return FlightResult(
        "Delta", 
        "DL1234", 
        "drewcutchins.com", 
        takeoff_time, 
        takeoff_time + dt.timedelta(hours=2),
        flight_search.depart_airport,
        flight_search.destination_airport,
        random.randint(0, 100)
        )
