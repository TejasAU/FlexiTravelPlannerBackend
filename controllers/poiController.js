import POI from '../models/poiSchema.js'; // Import the POI model

// Controller function to fetch all POIs
export const getAllPOIs = async (req, res) => {
  try {
    const allPOIs = await POI.find();
    res.json(allPOIs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to fetch a single POI by cityName
export const getPOIByCityName = async (req, res) => {
  const { cityName } = req.params;
  try {
    const poi = await POI.findOne({ cityName });
    if (!poi) {
      return res.status(404).json({ error: 'POI not found' });
    }
    res.json(poi);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default { getAllPOIs, getPOIByCityName };
