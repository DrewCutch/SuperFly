from dataclasses import dataclass
import datetime as dt

@dataclass
class FlightResult:
    airline: str
    flight_number: str
    purchase_link: str
    takeoff_time: dt.datetime
    arrival_time: dt.datetime
    takeoff_airport: str
    arrival_airport: str
    reliability_score: int