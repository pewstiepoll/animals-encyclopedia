import React from "react";
import ImageSlider from "./image-slider";
import { makeImgUrl } from "./helpers";
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

export default class AnimalPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            imageId: 0,
            image: null
        }
    }

    _handleImageClick = (id) => {
        const { animal } = this.props;
        const { imageId : prevImageId, image: prevImage, isLoading } = this.state;

        if (id === prevImageId || isLoading) return;

        this.setState({ isLoading: true });

        const image = new Image();
        image.src = makeImgUrl(animal.images[id].url) || prevImageId;

        image.onload = () => {
            this.setState({ isLoading: false, image: image.src, imageId: id });
        }

        image.onerror = () => {
            this.setState({ isLoading: false, image: prevImage });
        }
    }

    componentWillMount() {
        const { animal } = this.props;
        const { imageId } = this.state;

        const defaultImageUrl = animal.images[imageId].url;

        const image = new Image();

        image.src = makeImgUrl(defaultImageUrl);

        image.onload = () => {
            this.setState({
                isLoading: false,
                image: image.src
            });
        };
    }

    render() {
        const { animal } = this.props;
        const { image, imageId, isLoading } = this.state;

        const classes = [styles.backgroundImage, isLoading ? styles.backgroundImageLoading : styles.backgroundImageLoaded].join(" ");

        return image && (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Header animal={animal} />
                    <ImageSlider current={imageId + 1} onImageClick={this._handleImageClick} name={animal.name} images={animal.images} />
                </div>
                <img className={classes} src={this.state.image} alt="background"/>
            </div>
        )
    }
}