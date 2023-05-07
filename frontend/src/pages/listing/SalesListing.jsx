import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import styles from "./SalesListing.module.css";

const SalesListing = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const formatDate = (dateArr) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArr;
    const date = new Date(year, month - 1, day, hour, minute, second, millisecond);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formatConditionToFinnish = (condition) => {
    switch (condition) {
      case "NEW":
        return "Uusi";
      case "VERY_GOOD":
        return "Erinomainen";
      case "GOOD":
        return "Hyvä";
      case "FAIR":
        return "Kohtalainen";
      case "POOR":
        return "Huono";
      default:
        return "";
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/v1/listing/getListing/${id}`);
        const json = await response.json();
        console.log("json:", json);

        const imageResponse = await fetch(
          `/api/v1/listing/getListingImage/${json.salesListing.imgURL}`
        );
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob);

        json.salesListing.imgUrl = imageUrl;
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { user, salesListing } = data;

  return (
    <div className={styles.listingBody}>
      <div>
        <Navbar />
      </div>
      <a className={styles.linkToHome} href="/">Palaa etusivulle</a>
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {salesListing.imgUrl && (
            <img src={salesListing.imgUrl} alt="listing image" />
          )}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.namePriceContainer}>
            <div className={styles.itemName}>
              <p> <p2>Myynnissä:</p2> {salesListing.productName}</p>
            </div>
            <div className={styles.itemPrice}>
              <p> <p2>Hinta:</p2> {salesListing.price}€</p>
            </div>
          </div>

          <div className={styles.itemInformation}>
            <p><p2>Kuvaus:</p2> {salesListing.description}</p>
            <p>
              <p2>Kunto:</p2> {formatConditionToFinnish(salesListing.productCondition)}
            </p>
            <p><p2>Kaupunki:</p2> {salesListing.city}</p>
            <p style={{ fontStyle: "italic" }}>
              Ilmoitus jätetty: {formatDate(salesListing.listingDate)}
            </p>
          </div>
          <div className={styles.sellerInfo}>
            <p>
              <p2>Myyjä:</p2> {user.firstname} {user.lastname} ({user.username})
            </p>
            <p>
              <p2>Puh:</p2> {user.phonenumber}
            </p>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SalesListing;
