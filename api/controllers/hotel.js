import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};


export const getHotels = async (req, res, next) => {
  const { min, max, limit, ...others } = req.query; // Extract limit parameter
  const minPrice = parseInt(min);
  const maxPrice = parseInt(max);
  const limitValue = limit ? parseInt(limit) : 10; // Parse limit to integer, default to 10 if not provided

  try {
    let query = { ...others };

    if (!isNaN(minPrice)) {
      query.cheapestPrice = { ...query.cheapestPrice, $gte: minPrice };
    }
    if (!isNaN(maxPrice)) {
      query.cheapestPrice = { ...query.cheapestPrice, $lte: maxPrice };
    }

    const hotels = await Hotel.find(query).limit(limitValue); // Apply limit to the query
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};


export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};

/*Route to update hotel images by ID
router.put("/:id/images", async (req, res, next) => {
  const { id } = req.params;
  const { photos } = req.body;

  try {
    // Find the hotel document by ID and update the photos array
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $push: { photos: { $each: photos } } }, // Push each photo URL to the photos array
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    console.error("Error updating hotel images:", error);
    next(error);
  }
});*/
