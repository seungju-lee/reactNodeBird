import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CardMedia, Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import {
  useStyles,
  Container,
  StyledSlider,
  ImageContainer,
  Image,
} from './styles';

const ImagePost = ({ images }) => {
  const classes = useStyles();
  const [carousel, setCarousel] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };

  const onClickCarousel = useCallback(e => {
    e.preventDefault();
    setCarousel(true);
  }, []);

  const onCloseDialog = useCallback(
    e => {
      e.preventDefault();
      setCarousel(prev => !prev);
    },
    [carousel],
  );

  if (images.length === 1) {
    return (
      <>
        <CardMedia
          className={classes.media}
          image={images[0].src}
          title="포스팅 이미지"
        />
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              className={classes.media}
              image={images[0].src}
              title="포스팅 이미지"
            />
          </Grid>
          <Grid item xs={6}>
            <CardMedia
              className={classes.media}
              image={images[1].src}
              title="포스팅 이미지"
            />
          </Grid>
        </Grid>
      </>
    );
  }
  if (images.length > 2) {
    return (
      <>
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              className={classes.media}
              image={images[0].src}
              title="포스팅 이미지"
            />
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <IconButton
              aria-label="upload picture"
              component="span"
              onClick={onClickCarousel}
            >
              <AddIcon />
            </IconButton>
            <div>더 보기</div>
          </Grid>
        </Grid>
        {carousel && (
          <Dialog open={carousel} onClose={onCloseDialog}>
            <Container>
              <StyledSlider {...settings}>
                {images.map(v => (
                  <ImageContainer key={v.src}>
                    <Image src={v.src} />
                  </ImageContainer>
                ))}
              </StyledSlider>
            </Container>
          </Dialog>
        )}
      </>
    );
  }
  return (
    <>
      <CardMedia
        className={classes.media}
        image="http://placehold.it/500x250"
        title="포스팅 이미지"
      />
    </>
  );
};

ImagePost.propTypes = {
  images: PropTypes.array.isRequired,
};

export default ImagePost;
