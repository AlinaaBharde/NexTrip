import axios from 'axios';

const fetchFlightsFromAPI = async (departureCity, arrivalCity, startDate, endDate, itineraryType, classOfService, adults, pageNumber) => {
    const options = {
        method: 'GET',
        url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
        params: {
            sourceAirportCode: await getAirportCode(departureCity),
            destinationAirportCode: await getAirportCode(arrivalCity),
            date: startDate,
            itineraryType: itineraryType,
            sortOrder: 'PRICE',
            numAdults: adults,
            numSeniors: '0',
            classOfService: classOfService,
            returnDate: endDate ? endDate : "",
            pageNumber: pageNumber,
            currencyCode: 'INR'
        },
        headers: {
            'X-RapidAPI-Key': '98aab30ab4msh84a78a7fb99a115p102461jsn550e1020b4fc',
            'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const relevantFlightDetails = extractRelevantDetails(response.data.data);
        console.log(relevantFlightDetails);
        return relevantFlightDetails;
    } catch (error) {
        console.error("Error fetching flights:", error);
        return null;
    }
};

const extractRelevantDetails = (flightData) => {

    if (!flightData || !flightData.flights) {
        return [];
    }

    return flightData.flights.map((flight) => {
        if (!flight.segments) {
            return {};
        }

        const Segment = flight.segments[0].legs[0];
        const temp = flight.purchaseLinks[0];

        return {
            departureTime: Segment.departureDateTime,
            arrivalTime: Segment.arrivalDateTime,
            classOfService: Segment.classOfService,
            airline: Segment.operatingCarrier.displayName,
            logo: Segment.operatingCarrier.logoUrl,
            totalPrice: temp.totalPrice,
            purchaseUrl: temp.url
        };
    });
};


const getAirportCode = async (city) => {
    switch (city) {
        case "Delhi":
            return "DEL";
        case "Mumbai":
            return "BOM";
        case "Bengaluru":
            return "BLR";
        case "Hyderabad":
            return "HYD";
        case "Chennai":
            return "MAA";
        case "Kolkata":
            return "CCU";
        case "Ahmedabad":
            return "AMD";
        case "Kochi":
            return "COK";
        case "Goa":
            return "GOI";
        case "Pune":
            return "PNQ";
        case "Lucknow":
            return "LKO";
        case "Guwahati":
            return "GAU";
        case "Jaipur":
            return "JAI";
        case "Srinagar":
            return "SXR";
        case "Patna":
            return "PAT";
        case "Chandigarh":
            return "IXC";
        case "Bhubaneswar":
            return "BBI";
        case "Thiruvananthapuram":
            return "TRV";
        case "Kozhikode":
            return "CCJ";
        case "Indore":
            return "IDR";
        case "Nagpur":
            return "NAG";
        case "Coimbatore":
            return "CJB";
        case "Siliguri":
            return "IXB";
        case "Varanasi":
            return "VNS";
        case "Amritsar":
            return "ATQ";
        case "Visakhapatnam":
            return "VTZ";
        case "Ranchi":
            return "IXR";
        case "Mangalore":
            return "IXE";
        case "Dehradun":
            return "DED";
        case "Jammu":
            return "IXJ";
        case "Thiruchirapalli":
            return "TRZ";
        case "Agartala":
            return "IXA";
        case "Udaipir":
            return "UDR";
        case "Andaman and Nicobar Islands":
            return "IXZ";
        case "Leh":
            return "IXL";
        case "Kannur":
            return "CNN";
        case "Surat":
            return "STV";
        case "Imphal":
            return "IMF";
        case "Madurai":
            return "IXM";
        case "Bhopal":
            return "BHO";
        case "Vadodara":
            return "BDQ";
        case 'Tirupati':
            return "TIR";
        case "Jodhpur":
            return "JDH";
        case 'Rajkot':
            return "RAJ";
        case "Shirdi":
            return "SAG";
        case "Gorakhpur":
            return "GOP";
        case "Laksadweep":
            return "AGX";
    }
};

export { fetchFlightsFromAPI };
