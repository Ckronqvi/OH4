import React, { useState } from "react";
import CustomNavbar from "./customNavbar";
import styles from "./addListing.module.css";

const AddListing = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const [selectedImage, setSelectedImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPrompt, setLoadingPrompt] = useState(null);
  const [imageName, setImageName] = useState("");
 
   if (!jwtToken) {
    window.location.href = "/login";
    return null;
  }  

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImageName(file.name);
  }

  const addInputFieldListener = () => {
    const inputField = document.getElementById("price");

    inputField.addEventListener("keypress", function (event) {
      const key = event.key;

      if (isNaN(key)) {
        event.preventDefault();
      }
    });
  };
  document.addEventListener("DOMContentLoaded", addInputFieldListener);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!productName || !category || !location || !price || !condition) {
      alert("Täytä kaikki kohdat!");
      return;
    }
    setLoading(true); //avoid spam submitting.
    setLoadingPrompt("Lähtetään ilmoitusta...");
    const currentTime = new Date().getTime();
    const imageName = `${currentTime}_${selectedImage.name}`;
    const token = sessionStorage.getItem("jwtToken");

    const salesListing = {
      productName: productName,
      productCategory: category,
      city: location,
      price: parseFloat(price),
      productCondition: condition,
      description: description,
      imgURL: imageName,
    };

    // Request 1: Upload sales listing
    const response1 = await fetch("/api/v1/listing/addListing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify(salesListing),
    });

    // Request 2: Upload image
    const formData = new FormData();
    formData.append("file", selectedImage, imageName);

    const response2 = await fetch("/api/v1/listing/addListingImage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
      body: formData,
    });
    setLoading(false);
    setLoadingPrompt(null);
    window.location.href = "/";
  };
  return (
    <>
      <div className={styles.addListingBody}>
        <CustomNavbar />
        <div className={styles.listingContent}>
          <p>Jätä ilmoitus</p>
          <div
            name="listingInfoContainer"
            className={styles.listinInfoContainer}
          >
            <div className={styles.leftContainer}>
              <div className={styles.data}>
                <label htmlFor="productName">Tuotteen nimi *</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  placeholder="Tuotteen nimi..."
                  required
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                />
              </div>
              <div className={styles.data}>
                <label htmlFor="category">Kategoria *</label>
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="" disabled selected hidden>
                    Kategoria...
                  </option>
                  <option value="ASUNNOT">Asunnot</option>
                  <option value="AUTOT">Autot</option>
                  <option value="LELUT">Lelut</option>
                  <option value="PIHA_JA_PUUTARHA">Piha ja puutarha</option>
                  <option value="REKENTAMINEN">Rakentaminen</option>
                  <option value="SISUSTUS">Sisustus</option>
                  <option value="URHEILU">Urheilu</option>
                  <option value="VAATETUS">Vaatetus</option>
                  <option value="MUU">Muu</option>
                </select>
              </div>
              <div className={styles.data}>
                <label htmlFor="location">Sijainti *</label>
                <input
                  type="text"
                  id="loaction"
                  name="location"
                  placeholder="Syötä sijainti..."
                  required
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
              <div className={styles.data}>
                <label htmlFor="price">Hinta *</label>
                <div className={styles.priceContainer}>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    placeholder="Syötä hinta..."
                    required
                    inputmode="numeric"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                  />
                  <span className={styles.euroSign}>€</span>
                </div>
              </div>
              <div className={styles.data}>
                <label htmlFor="selling-buying">Myydään/ostetaan *</label>
                <select id="selling-buying" required>
                  <option value="Myydään">Myydään</option>
                  <option value="Ostetaan">Ostetaan (ei toimi)</option>
                </select>
              </div>
              <div className={styles.data}>
                <label htmlFor="condition">Kuntoluokitus *</label>
                <select
                  id="condition"
                  required
                  value={condition}
                  onChange={(event) => setCondition(event.target.value)}
                >
                  <option value="" disabled selected hidden>
                    tuotteen kunto...
                  </option>
                  <option value="NEW">Uusi</option>
                  <option value="VERY_GOOD">Erinomainen</option>
                  <option value="GOOD">Hyvä</option>
                  <option value="FAIR">Kohtalainen</option>
                  <option value="POOR">Heikko</option>
                </select>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <div className={styles.data}>
                <label htmlFor="description">Tarkemmat tiedot:</label>
                <textarea
                  id="description"
                  name="description"
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                >
                </textarea>
              </div>

              <div className={styles.imageInfoContainer}>
                <label className={styles.fileUpload}>
                  <span className={styles.fileUploadLabel}>Lataa kuva</span>
                  <input
                    type="file"
                    name="image"
                    required
                    className={styles.fileUploadInput}
                    onChange={handleImageChange}
                  />
                </label>
                  <div className={styles.imageNameContainer}>
                 {imageName && <p className={styles.fileName}>{imageName}</p>}
                 </div>
              </div>

              <div className={styles.lowerButtonContainer}>
                <div className={styles.button}>
                  <button onClick={() => (window.location.href = "/")}>
                    Peruuta
                  </button>
                </div>
                <div className={styles.button}>
                  <button onClick={(event) => handleSubmit(event)} disabled={loading}>
                    Jätä ilmoitus
                  </button>
                </div>
                {loadingPrompt && (
                  <div className={styles.loadingPromptContainer}>
                    <div className={styles.prompt}>{loadingPrompt}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddListing;
