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

    def to_json_dict(self):
        return {
            "airline": self.airline,
            "flightNumber": self.flight_number,
            "purchaseLink": self.purchase_link,
            "takeoffTime": self.takeoff_time.isoformat(),
            "arrivalTime": self.arrival_time.isoformat(),
            "takeoffAirport": self.takeoff_airport,
            "arrivalAirport": self.arrival_airport,
            "reliabilityScore": self.reliability_score
        }