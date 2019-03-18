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

const Images = withContext(SliderContext)(class Images extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.wrapperRef = React.createRef();
        this.wrapperWidth = this.leftPosition = 0;

        this.state = {
            left: 0
        };
    }

    _scrollHandler = (e) => requestAnimationFrame(() => {
        e.preventDefault();
        const { deltaX } = e;

        this.setState(({ left }) => {
            const newLeft = left - deltaX;
            
            if (Math.abs(newLeft) > this.wrapperWidth - 330 || newLeft > 0) return null;

            return { left: newLeft };
        });
    });

    render() {
        const { name, images } = this.props;
        const { left } = this.state;

        return (
            <div className={styles.images} ref={this.wrapperRef} style={{ transform: `translateX(${left}px)`, overflow: "hidden" }}>
                {images.map(image => <img key={image} className={styles.image} src={makeImgUrl(image)} alt={`${name} ${image}`} />)}
            </div>
        );
    }

    componentWillUnmount() {
    }

    componentDidMount() {
        const { width } = this.wrapperRef.current.getBoundingClientRect() || {};

        this.wrapperWidth = width;
    }
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