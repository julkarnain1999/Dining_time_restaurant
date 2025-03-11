import { collection, doc, setDoc } from "firebase/firestore";
import { carouselImages, restaurants } from "../store/restaurants";
import { db } from "../config/firebaseConfig";

const restaurantData = carouselImages;

const uploadData = async () => {
  try {
    // Check if data exists
    if (!restaurantData || restaurantData.length === 0) {
      throw new Error("No restaurant data found!");
    }

    for (let i = 0; i < restaurantData.length; i++) {
      const restaurant = restaurantData[i];
      const docRef = doc(
        collection(db, "carousel"), 
        `carousel_${i + 1}` 
      );
      await setDoc(docRef, restaurant);
      console.log(`Uploaded restaurant ${i + 1}`);
    }
    console.log("All data uploaded successfully!");
  } catch (error) {
    console.error("Error uploading data: ", error);
  }
};

export default uploadData;
