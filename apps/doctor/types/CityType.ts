export interface City {
    name: string;
}

export interface Country {
    name: string;
    isoCode: string;
}

export interface State {
    name: string;
    isoCode: string;
    countryCode: string;
}
export interface Address {
    place_id: string,
    osm_id: string,
    osm_type: string,
    licence: string,
    lat: string,
    lon: string,
    class: string,
    type: string,
    display_name: string,
    display_place: string,
    display_address: string,
    address: {
        name: string,
        county: string,
        state: string,
        postcode: string,
        country: string,
        country_code: string
    }
}