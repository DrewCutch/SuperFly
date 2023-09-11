import * as React from 'react';
import { FlightSearchResult, getFlights } from "../client/searchFlights";
import { FlightResultsTable } from "./FlightResultsTable";
import { FlightSearchBar, FlightSearchInput } from "./FlightSearchBar";

export function FlightSearchArea() {
    const [flightSearchResults, setFlightSearchResults] = React.useState<Array<FlightSearchResult>>([]);

    function searchFlights(searchInput: FlightSearchInput) {
        getFlights(searchInput).then(setFlightSearchResults);
    }

    return (
        <div id='flight-search-area'>
          <FlightSearchBar onSearch={searchFlights}></FlightSearchBar>
          <FlightResultsTable flightResults={flightSearchResults}></FlightResultsTable>
        </div>
      );
}