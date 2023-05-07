import React, { useState } from "react";
import styles from "./ItemFilterBox.module.css";
import PriceRangeSlider from "../price-slider/PriceRangeSlider";

const ItemFilterBox = () => {
  const [isPriceSliderOpen, setIsPriceSliderOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]); 
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

  const handleTogglePriceSlider = () => {
    if (isPriceSliderOpen) {
      setTempPriceRange(priceRange); 
    }
    setIsPriceSliderOpen(!isPriceSliderOpen);
  };

  const handlePriceRangeChange = (newValue) => {
    setPriceRange(newValue);
  };

  const handleTogglePriceSlider2 = () => {
    setPriceRange(tempPriceRange); 
    setIsPriceSliderOpen(false);
  };

  
  return (
    <>
    <div name="item-filter-box" className={styles['item-filter-box']}>
      <div className={styles.filterLabel}>
        <label>Suodata hakua</label>
      </div> 
      <div className={styles['filter-field']}>
        <label htmlFor="filter-category">Kategoria:</label>
        <select id="filter-category">
          <option value="">Kaikki</option>
          <option value="Asunnot">Asunnot</option>
          <option value="Autot">Autot</option>
          <option value="Lelut">Lelut</option>
          <option value="Piha ja puutarha">Piha ja puutarha</option>
          <option value="Rakentaminen">Rakentaminen</option>
          <option value="Sisustus">Sisustus</option>
          <option value="Urheilu">Urheilu</option>
          <option value="Vaatetus">Vaatetus</option>
          <option value="Muu">Muu</option>
        </select>
      </div>
      <div className={styles['filter-field']}>
        <label htmlFor="filter-location">Sijainti:</label>
        <input type="text" id="filter-loaction" placeholder="Syötä sijainti..." />
      </div>

      {isPriceSliderOpen ? (
        <div className={styles['filter-field']}>
          <label htmlFor="filter-price">Hinta:</label>
          <div className={styles.slider}>
            <PriceRangeSlider
              value={priceRange}
              onChange={handlePriceRangeChange}
            /> 
          </div>
          <button className={styles['price-btn']} onClick={handleTogglePriceSlider2}>Peruuta</button>
          <button className={styles['price-btn-accept']} onClick={handleTogglePriceSlider}>Aseta</button>
        </div>
      ) : (
        <div className={styles['filter-field']}>
          <label htmlFor="filer-price">Hinta:</label>
          <button onClick={handleTogglePriceSlider} className={styles['price-selector-btn']}>
            <label className={styles['price-selector-field']} 
              htmlFor="filter-price">{`${priceRange[0]}€ - ${priceRange[1]}€ ${priceRange[1] === 1000 ? '<' : ''}`}
            </label>
          </button>
        </div>
      )}

      <div className={styles['filter-field']}>
        <label htmlFor="filter-selling-buying">Myydään/ostetaan:</label>
        <select id="filter-selling-buying">
          <option value="-">-</option>
          <option value="Myydään">Myydään</option>
          <option value="Ostetaan">Ostetaan</option>
        </select>
      </div>
      <div className={styles['filter-field']}>
        <label htmlFor="filter-quality">Kuntoluokitus:</label>
        <select id="filter-quality">
          <option value="Kaikki">Kaikki</option>
          <option value="Erinomainen">Uusi</option>
          <option value="Erinomainen">Erinomainen</option>
          <option value="Hyvä">Hyvä</option>
          <option value="Kohtalainen">Kohtalainen</option>
          <option value="Heikko">Heikko</option>
        </select>
      </div>
      <button className={styles['search-btn']}>Hae</button>
    </div>
    </>
  );
};

export default ItemFilterBox;