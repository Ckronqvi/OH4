import React, { useState, useEffect } from 'react';
import styles from './SalesListingGrid.module.css'
import { Link } from 'react-router-dom';
const SalesListingGrid = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch('api/v1/listing/getListings')
      .then(response => response.json())
      .then(data => {
        setListings(data);

        data.forEach(listing => {
          fetch(`api/v1/listing/getListingImage/${listing.imgURL}`)
            .then(response => response.blob())
            .then(imageBlob => {
              const imageUrl = URL.createObjectURL(imageBlob);
              listing.imgUrl = imageUrl;
              setListings(prevListings => [...prevListings]);
            })
            .catch(error => console.error('Error fetching image:', error));
        });
      })
      .catch(error => console.error('Error fetching sales listings:', error));
  }, []);

  const formatDate = (dateArr) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArr;
    const date = new Date(year, month - 1, day, hour, minute, second, millisecond);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString(undefined, options);
    return formattedDate;
  };

  const formatConditionToFinnish = (condition) => {
    switch (condition) {
      case 'NEW':
        return 'Uusi';
      case 'VERY_GOOD':
        return 'Erinomainen';
      case 'GOOD':
        return 'Hyvä';
      case 'FAIR':
        return 'Kohtalainen';
      case 'POOR':
        return 'Huono';
      default:
        return '';
    }
  };

  return (
    <div className={styles['entities-container']}>
      {listings.map(listing => (
          <div key={listing.id} className={styles['entity-container']}>
            <Link key={listing.id} to={`/salesListing/${listing.id}`} className={styles.entityLink}>
            <div className={styles['entity-image-container']}>
              {listing.imgUrl && <img src={listing.imgUrl} alt="Product" />}
            </div>
            <div className={styles['entity-info-container']}>
              <h2>{listing.productName}</h2>
              <p>Kuvaus: {listing.description}</p>
              <p>Hinta: {listing.price}€</p>
              <p>Kunto: {formatConditionToFinnish(listing.productCondition)}</p>
              <p>Kaupunki: {listing.city}</p>
              <p style={{fontStyle: 'italic'}}>Ilmoitus jätetty: {formatDate(listing.listingDate)}</p>
            </div>
            </Link>  
          </div>
      ))}
    </div>
  );
};

export default SalesListingGrid;
