import json
from haversine import inverse_haversine, Direction, Unit

# Any interesting state should be stored in a singleton of this object
class Backend:
    def __init__(self, inputBytes):
        # Do something interesting with the input
        print(f"Got {len(inputBytes)} bytes as input")

    def exampleCall(self, center, dist):
        # The haversine library uses the opposite order from GeoJSON
        def swap(pt):
            return (pt[1], pt[0])

        center = swap(center)
        pt1 = swap(
            inverse_haversine(center, dist, Direction.NORTHWEST, unit=Unit.METERS)
        )
        pt2 = swap(
            inverse_haversine(center, dist, Direction.NORTHEAST, unit=Unit.METERS)
        )
        pt3 = swap(inverse_haversine(center, dist, Direction.SOUTH, unit=Unit.METERS))

        gj = {
            "type": "Feature",
            "properties": {
                "key": "value",
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[pt1, pt2, pt3, pt1]],
            },
        }

        return json.dumps(gj)
