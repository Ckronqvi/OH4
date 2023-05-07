import React from "react";
import ItemFilterBox from "../../components/filter/ItemFilterBox"; 
import Navbar from "../../components/navbar/navbar";
import SalesListingGrid from "../../components/salesListingGrid/SalesListingGrid";
import styles from "./home.module.css"; 

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <ItemFilterBox />
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.scrollableGrid}>
            <SalesListingGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;