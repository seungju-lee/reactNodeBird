import { makeStyles } from '@material-ui/core';
import styles from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const useStyles = makeStyles(() => ({
  media: {
    height: 340,
  },
}));

export const Container = styles.div`
    overflow:hidden;
  `;

export const StyledSlider = styles(Slider)`
      .slick-slide div{
        outline: none;
      }
  `;

export const ImageContainer = styles.div`
    margin: 0 16px;
  `;

export const Image = styles.img`
  max-width:100%;
  max-height:100%;
  `;
