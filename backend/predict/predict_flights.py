import datetime as dt
import random

from api.model.search_parameters import SearchParameters
from api.model.flight_result import FlightResult

from typing import List

def get_flights(flight_search: SearchParameters) -> List[FlightResult]:
    return get_dummy_flights(flight_search)


def get_dummy_flights(flight_search: SearchParameters) -> List[FlightResult]:
    flights = [dummy_flight_result(flight_search) for _ in range(15)]

    flight_numbers = set()
    unique_flights = [flight_numbers.add(flight.flight_number) or flight for flight in flights if flight.flight_number not in flight_numbers]
    
    return unique_flights

def dummy_flight_result(flight_search: SearchParameters) -> FlightResult:
    takeoff_time = dt.datetime.combine(flight_search.depart_date, dt.datetime.min.time())+ dt.timedelta(hours=random.randint(6, 18))

    return FlightResult(
        "Delta", 
        "DL" + str(random.randint(1000, 9999)), 
        "drewcutchins.com", 
        takeoff_time, 
        takeoff_time + dt.timedelta(hours=2),
        flight_search.depart_airport,
        flight_search.destination_airport,
        random.randint(0, 100)
        )