import mongoose from 'mongoose';

// Define the schema for Points of Interest (POIs)
const poiSchema = new mongoose.Schema({
  cityId: {
    type: String, // Assuming cityId is a string ID
    required: true,
  },
  cityName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  photoPrefix: {
    type: String,
    required: true,
  },
  photoSuffix: {
    type: String,
    required: true,
  },
});

// Create the POI model using the poiSchema
const POI = mongoose.model('POI', poiSchema);

export default POI;
