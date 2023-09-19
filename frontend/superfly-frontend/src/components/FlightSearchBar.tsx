import * as React from 'react';
import DatePicker from 'react-datepicker';

export interface FlightSearchBarProps {
    onSearch: (searchInput: FlightSearchInput) => void
}

export enum SeatClass {
    Enonomy = "Economy",
    PremiumEconomy = "Premium Economy",
    Business = "Business",
    First = "First"
}

export interface FlightSearchInput {
    numPassengers: number,
    seatClass: SeatClass,
    departDate: Date,
    returnDate: Date,
    departAirport: string,
    destinationAirport: string
}

export function FlightSearchBar(props: FlightSearchBarProps) {
    const [formInput, updateSearchInput] = React.useReducer(
        (currentInput: FlightSearchInput, update: Partial<FlightSearchInput>) => (
            {...currentInput, ...update}
        ),
        {
            numPassengers: 1,
            seatClass: SeatClass.Enonomy,
            departDate: new Date("2023-09-09"),
            returnDate: new Date("2023-09-10"),
            departAirport: "ATL",
            destinationAirport: "RDU"
        }
    );

    function onSubmit() {
        props.onSearch(formInput);
    }

    return (
        <div id="flight-search-input">
            <span>I want to fly with </span>
            
            <input type="number" name="numPassengers" 
                value={formInput.numPassengers} 
                onChange={e => updateSearchInput({numPassengers: parseInt(e.target.value)})}
            />

            <label htmlFor="numPassengers"> passengers, in </label>
            
            <select value={formInput.seatClass} onChange={(e) => updateSearchInput({seatClass: SeatClass[e.target.value as keyof typeof SeatClass]})}>
                {
                    getEnumKeys(SeatClass).map((key, index) => (
                        <option key={index} value={SeatClass[key]}>
                            {SeatClass[key]}
                        </option>
                    ))
                }
            </select>
            <br/>

            <label htmlFor="departAirport">From </label>
            <input type="text" name="departAirport" 
                value={formInput.departAirport} 
                onChange={e => updateSearchInput({departAirport: e.target.value})}
            />
            
            <label htmlFor="destinationAirport"> to </label>
            <input type="text" name="destinationAirport" 
                value={formInput.destinationAirport} 
                onChange={e => updateSearchInput({destinationAirport: e.target.value})}
            />
            
            <label htmlFor="departDate"> on </label>
            <input type="date" name="departDate" 
                value={formInput.departDate.toISOString().split("T")[0]} 
                onChange={e => updateSearchInput({departDate: new Date(e.target.value)})}
            />
            
            <label htmlFor="departDate"> returning </label>
            <input type="date" name="returnDate" 
                value={formInput.returnDate.toISOString().split("T")[0]} 
                onChange={e => updateSearchInput({returnDate: new Date(e.target.value)})}
            />

            <br/>
            <br/>
            <button onClick={onSubmit} >Search</button>
        </div>
    )
}

function getEnumKeys<T extends object>(enumToDeconstruct: T): Array<keyof typeof enumToDeconstruct> {
    return Object.keys(enumToDeconstruct) as Array<keyof typeof enumToDeconstruct>;
}