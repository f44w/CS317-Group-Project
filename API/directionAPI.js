const BASE_URL = "https://api.openrouteservice.org/v2/directions/foot-walking";

export default async function getRoute(start, end) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      coordinates: [
        [start.longitude, start.latitude],
        [end.longitude, end.latitude]
      ]
    })
  });

  if(!response.ok){
    throw new Error("Failed to fetch route");
  }

  const data = await response.json();
  return data;
}

export async function snapToStreet(lng, lat) {
  const SNAP_URL = "https://api.openrouteservice.org/v2/snap/foot-walking";

  const response = await fetch(SNAP_URL, {
    method: "POST",
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      locations: [[lng, lat]],
      radius: 300
    })
  });

  if(!response.ok){
    throw new Error("Failed to snap location");
  }

  const data = await response.json();

  if (data.locations && data.locations[0] !== null) {
    const snapped = data.locations[0];
    return { longitude: snapped.location[0], latitude: snapped.location[1] };
  }

  // Fallback to original coords if snapping fails
  return { longitude: lng, latitude: lat };
}
