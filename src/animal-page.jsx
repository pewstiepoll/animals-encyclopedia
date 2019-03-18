import React from "react";

import ImageSlider from "./image-slider";

import styles from "./animal-page.module.css";

function AnimalDescription ({scientificName, type}) {
    return (
        <div className={styles.description}>
            <span>
                Scientific name: {scientificName}
            </span>
            <span>
                Type: {type}
            </span>
        </div>
    )
}

function Header ({ animal }) {
    const { type, scientific_name: scientificName } = animal;

    return (
        <div>
            <h1 className={styles.title}>Wild Animals</h1>
            <AnimalDescription type={type} scientificName={scientificName} />
        </div>
    )
}

export default function AnimalPage ({ animal }) {
    const [defaultBackground] = animal.images;
    

    const defaultBackgroundPath = `${process.env.PUBLIC_URL}/images/${defaultBackground}`;

    return (
        <div className={styles.container} style={{ backgroundImage: `url(${defaultBackgroundPath })`}}>
            <div className={styles.wrapper}>
                <Header animal={animal} />
                <ImageSlider name={animal.name} images={animal.images} />
            </div>
        </div>
    )
}