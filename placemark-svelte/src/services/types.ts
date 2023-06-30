export interface Placemark extends PlacemarkNoImage{

    image: Array<string>;
}
export interface ReturnedPlacemark extends Placemark {
    createdby: string,
    _id: string,
}
export interface DataForPlacemark{
    placemark: ReturnedPlacemark,
}
export interface PlacemarkNoImage{
    name: string;
    description: string;
    location: {
        latitude: number;
        longitude: number;
    };
    category: string;
}
export interface Mapconfig {
    location: { latitude: number, longitude: number };
    zoom: number;
    minZoom: number;
};
export interface Location{
    location: {
        latitude: number;
        longitude: number;
    };
}
export interface Charts {
    labels: string[];
    datasets: [{ values: number[] }];
}

