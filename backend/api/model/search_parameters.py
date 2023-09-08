from dataclasses import dataclass
import datetime as dt
from enum import Enum

class SeatClass(str, Enum):
    ECONOMY = "ECONOMY"
    PREMIUM_ECONOMY = "PREMIUM_ECONOMY"
    BUSINESS = "BUSINESS"
    FIRST = "FIRST"

@dataclass
class SearchParameters:
    num_passengers: int
    seat_class: SeatClass
    depart_date: dt.date
    return_date: dt.date
    depart_airport: str
    return_airport: str