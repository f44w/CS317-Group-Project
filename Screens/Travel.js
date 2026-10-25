import { useState, useEffect, useRef } from "react";
import { useAppStyles } from "../styles";
import {View, Text, Dimensions,Pressable} from "react-native";
import * as Location from "expo-location";
import MapView, {Marker, Polyline} from "react-native-maps";
import { getWeatherByCoords } from "../API/weatherAPI.js";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRoute, { snapToStreet } from "../API/directionAPI.js";
import { decode as decodePolyline } from "@mapbox/polyline";

const { width, height } = Dimensions.get('window'); // read device screen dimensions
const ASPECT_RATIO = width / height; 

const LATITUDE_DELTA = 0.008; // street level zoom, smaller value more zoomed in
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; // E/W zoom level

// start with QEUH so map valid before get user location
const DEFAULT_REGION = {
    latitude: 55.86222, 
    longitude: -4.341111, 
    latitudeDelta: LATITUDE_DELTA, 
    longitudeDelta: LONGITUDE_DELTA,
};

export default function Travel() {

    const styles = useAppStyles();
    const route = useRoute();

    const [destinationLL, setDestinationLL] = useState(null);
    
    const[region, setRegion] = useState(DEFAULT_REGION);
    const[location, setLocation] = useState(null); // stores last retrieved location object
    const[errorMsg, setErrorMsg] = useState(null); 

    const[weatherError, setWeatherError] = useState(null);
	const[weatherData, setWeatherData] = useState(null);

    const [routeCoords, setRouteCoords] = useState([]); // stores polyline points
    const mapRef = useRef(null);

    

    // get destination when its passed in from schedule
    const destination = route.params?.destination;

    // getting the coords from name of preset from async storage
    const getCoordsFromName = async (name) => {
        try {
            const saved = await AsyncStorage.getItem("presetLocations");
            if (!saved) {
                setErrorMsg("No preset locations saved");
                return;
            }
            const locations = JSON.parse(saved);
            const match = locations.find((loc) => loc.name === name);
            if (!match) {
                setErrorMsg("Location not found");
                return;
            }
            setDestinationLL({
                name: name,
                longitude: match.longitude,
                latitude: match.latitude
            });
        } catch (e) {
            console.log(e);
            setErrorMsg("Failed to load location data");
        }
    };

    const centerOnUser = async () => {
            setErrorMsg(null); 
            
            try {
                // asking for location permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission Denied");
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(loc);
    
                // center map on user
                setRegion({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
    
                
            } catch (e) {
                setErrorMsg("Failed to get location");
                console.log(e);
            }
        };

    useEffect(() => {
        if (destination) {
            getCoordsFromName(destination); // async, sets destinationLL
        }
    }, [destination]); // run when destination has been gotten
    

    useEffect(() => {
        const fetchRoute = async () => {
            if (!location || !destinationLL) return;
            try {
                // snapping start and end locations to nearest streets
                const startSnapped = await snapToStreet(location.coords.longitude, location.coords.latitude);
                const endSnapped = await snapToStreet(destinationLL.longitude, destinationLL.latitude);
        
                const data = await getRoute(startSnapped, endSnapped);
        
                if (!data.routes || data.routes.length === 0) {
                    console.log("No route found");
                    return;
                }
        
                const encoded = data.routes[0].geometry; // polyline decoding using google polyline decode
                const coords = decodePolyline(encoded).map(([lat, lng]) => ({
                    latitude: lat,
                    longitude: lng,
                }));

                setRouteCoords(coords);
            } catch (e) {
                console.log("Failed to get route:", e);
            }
        };
    
        fetchRoute();
    }, [location, destinationLL]);


    useEffect(() => {
        const fetchLocation = async () => {
            setErrorMsg(null); 
            setWeatherError(null);
    
            try {
                // asking for location permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setErrorMsg("Permission Denied");
                    return;
                }
                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLocation(loc);
    
                // center map on user
                setRegion({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                });
    
                // get weather
                try {
                    const deviceWeather = await getWeatherByCoords(
                        loc.coords.latitude,
                        loc.coords.longitude
                    );
                    setWeatherData(deviceWeather);
                } catch (e) {
                    setWeatherError(`Weather Request Failed: ${e.message}`);
                    setWeatherData(null);
                }
            } catch (e) {
                setErrorMsg("Failed to get location");
                console.log(e);
            }
        };
    
        fetchLocation();
    }, []); // run when screen loads

    return (
        <View style = {styles.container}>
            <MapView
                style = {styles.map}
                region = {region}
                ref= {mapRef}
                onRegionChangeComplete={(r) => setRegion(r)} // needed for Android
            >
            
                {destinationLL && (
                    <Marker
                        coordinate={{
                            latitude: destinationLL?.latitude,
                            longitude: destinationLL?.longitude
                        }}
                        title={destinationLL?.name}
                    />
                )}

                {/* nav */}
                {routeCoords.length > 0 && (
                    <Polyline
                        coordinates={routeCoords}
                        strokeWidth={6}
                        strokeColor="blue"
                    />
                )}

                {location && (
                    <Marker
                        // use user coordinates 
                        // only shows if stored user location exists
                        coordinate={{latitude: location.coords.latitude,longitude: location.coords.longitude,}}
                        title = "You"
                        pinColor = "blue"
                    />
                )}
            </MapView>
            <View style={styles.weatherContainer}>
                {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
                {weatherError && <Text style={styles.errorText}>{weatherError}</Text>}

                {weatherData && (
                    <>
                        <Text style={styles.weatherTemp}>
                            {weatherData.temperature}°C
                        </Text>
                        <Text style={styles.weatherDesc}>
                            {weatherData.description}
                        </Text>
                    </>
                )}

                {destination && (
                    <Text style={styles.destinationText}>
                        Destination: {destination}
                    </Text>
                )}
            </View>
            <View style={[styles.centerbuttoncontainer, styles.dropshadow]}>
                <Pressable style={styles.locateButton} onPress={centerOnUser}>
                    <Text style={styles.locateButtonText}>Center On Me</Text>
                </Pressable>
            </View>
    </View>
	
    );
}
