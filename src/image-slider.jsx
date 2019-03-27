import React from "react";

import styles from "./image-slider.module.css";

import { makeImgUrl } from "./helpers";

const SliderContext = React.createContext({ name: "", images: [] });

const withContext = Context => Component => props => (
  <Context.Consumer>
    {contextValues => <Component {...contextValues} {...props} />}
  </Context.Consumer>
);

const ImageCounter = withContext(SliderContext)(function ImageCounter({
  current,
  images
}) {
  return (
    <h1 className={styles.counter}>
      <span className={styles.counterCurrent}>{current}</span>
      <span className={styles.counterDelimiter}>/</span>
      <span className={styles.counterOf}>{images.length}</span>
    </h1>
  );
});

const SliderDetails = withContext(SliderContext)(function SliderDetails({
  name
}) {
  return (
    <div className={styles.sliderDetails}>
      <h1 className={styles.sliderName}>{name}</h1>
      <div className={styles.sliderSeparator} />
    </div>
  );
});

const Img = ({ webp, fallback, alt, ...rest }) => (
  <picture>
    <source srcset={webp} type="image/webp" />
    <source srcset={fallback} type="image/jpeg" />
    <img {...rest} src={fallback} alt={alt} />
  </picture>
);

const Images = withContext(SliderContext)(
  class Images extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.wrapperRef = React.createRef();
      this.wrapperWidth = this.leftPosition = 0;

      this.state = {
        transition: 0
      };
    }

    render() {
      const { name, images, onImageClick } = this.props;

      return (
        <div className={styles.images}>
          {images.map((image, id) => (
            <Img
              key={image.thumbnail}
              onClick={() => onImageClick(id)}
              className={styles.image}
              webp={makeImgUrl(image.thumbnail)}
              fallback={makeImgUrl(image.fallback)}
              alt={`${name} ${image.url}`}
            />
          ))}
        </div>
      );
    }
  }
);

export default function ImageSlider(props) {
  const { current } = props;

  return (
    <div className={styles.container}>
      <SliderContext.Provider value={props}>
        <ImageCounter current={current} />
        <div className={styles.wrapper}>
          <SliderDetails />
          <Images />
        </div>
      </SliderContext.Provider>
    </div>
  );
}
