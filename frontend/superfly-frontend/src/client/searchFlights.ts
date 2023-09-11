import { FlightSearchInput, SeatClass } from "../components/FlightSearchBar";

export interface FlightSearchResult {
    airline: string,
    flightNumber: string,
    purchaseLink: string,
    takeoffTime: Date,
    arrivalTime: Date,
    takeoffAirport: string,
    arrivalAirport: string,
    reliabilityScore: number
}

export async function getFlights(searchInput: FlightSearchInput): Promise<Array<FlightSearchResult>> {
    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
  
    const baseUrl = 'http://127.0.0.1:5000/flights';

    const queryParams = new URLSearchParams({
        numPassengers: searchInput.numPassengers.toString(),
        seatClass: getSeatClassStr(searchInput.seatClass),
        departDate: searchInput.departDate.toISOString().split("T")[0],
        returnDate: searchInput.returnDate.toISOString().split("T")[0],
        departAirport: searchInput.departAirport,
        arriveAirport: searchInput.destinationAirport
    });

    const requestUrl = `${baseUrl}?${queryParams.toString()}`;

    const response = await fetch(requestUrl);

    const json = await response.json();

    const results: Array<FlightSearchResult> = json.map((result: any) => {
        return {
            airline: result.airline,
            flightNumber: result.flightNumber,
            purchaseLink: result.purchaseLink,
            takeoffTime: new Date(result.takeoffTime),
            arrivalTime: new Date(result.arrivalTime),
            takeoffAirport: result.takeoffAirport,
            arrivalAirport: result.arrivalAirport,
            reliabilityScore: result.reliabilityScore
        }
    })

    return results;
  }

  function getSeatClassStr(seatClass: SeatClass) : string {
    switch (seatClass) {
        case SeatClass.Enonomy:
            return "ECONOMY";
        case SeatClass.PremiumEconomy:
            return "PREMIUM_ECONOMY";
        case SeatClass.Business:
            return "BUSINESS";
        case SeatClass.First:
            return "FIRST";
    }
  }