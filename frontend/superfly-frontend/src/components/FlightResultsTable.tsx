import * as React from 'react';
import { FlightSearchResult } from '../client/searchFlights';
import { Style } from 'util';

export interface FlightResultsTableProps {
    flightResults: Array<FlightSearchResult>
}

export function FlightResultsTable(props: FlightResultsTableProps) {
  return (
    <div>
      <table id='flight-result-table'>
          <thead>
              <tr>
                  <th>Airline</th>
                  <th>Departure</th>
                  <th>Arrival</th>
                  <th>Reliability Score</th>
              </tr>
          </thead>
          <tbody>
            {
              props.flightResults.map(result => (
                <tr key={result.flightNumber}>
                  <td>{result.airline}</td>
                  <td>{result.takeoffTime.toLocaleTimeString()}</td>
                  <td>{result.arrivalTime.toLocaleTimeString()}</td>
                  <td>{result.reliabilityScore}</td>
                </tr>
              ))
            }
          </tbody>
      </table>
    </div>
  );
}
