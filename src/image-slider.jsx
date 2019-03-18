import React from "react";

import styles from "./image-slider.module.css";

const makeImgUrl = (imgUrl) => `${process.env.PUBLIC_URL}/images/${imgUrl}`;

const SliderContext = React.createContext({ name: "", images: []});

const withContext = (Context) => (Component) => (props) => (
    <Context.Consumer>
        {
            (contextValues) => <Component {...contextValues} {...props} />
            
        }
    </Context.Consumer>
)

const ImageCounter = withContext(SliderContext)(function ImageCounter ({ current, images }) {
    return (
        <h1 className={styles.counter}>
            <span className={styles.counterCurrent}>{current}</span> 
            <span className={styles.counterDelimiter}>/</span> 
            <span className={styles.counterOf}>{images.length}</span>
        </h1>
    );       
});

const SliderDetails = withContext(SliderContext)(function SliderDetails ({ name }) {
    return (
        <div className={styles.sliderDetails}>
            <h1 className={styles.sliderName}>{name}</h1>
            <div className={styles.sliderSeparator}></div>
        </div>
    );
});

const Images = withContext(SliderContext)(function Images ({ name, images }) {
    return (
        <div className={styles.images}>
            {images.map(image => <img key={image} className={styles.image} src={makeImgUrl(image)} alt={`${name} ${image}`} />)}
        </div>
    );
});

export default function ImageSlider(props) {
    return (
        <div className={styles.container}>
            <SliderContext.Provider value={props}>
                <ImageCounter current={1} />
                <div className={styles.wrapper}>
                    <SliderDetails />
                    <Images />
                </div>
            </SliderContext.Provider>
        </div>
    );
}