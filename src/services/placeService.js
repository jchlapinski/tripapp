import places from '../data/places.json'

export class PlaceService {
    getAllPlaces() {
        return places
    }
    getPlaceById(id) {
        const place = places.find(place => place.id === id)
        return place || null
    }
}

const placeService = new PlaceService()
export default placeService