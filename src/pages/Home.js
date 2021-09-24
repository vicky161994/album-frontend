import React,{useEffect, useState} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';
import { getImageList } from '../actions/HomeActions';
import { Button, TextField, Typography } from "@material-ui/core";
import Image from '../component/Image'


function Home(props) {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const {user} = userLogin;
    if(!user){
      props.history.push('/login');
    }
    const imageList = useSelector((state) => state.imageList);
    const { loading, images, error } = imageList;
    useEffect(() => {
        dispatch(getImageList(page, 2));
      }, [dispatch, page]);
    return (
        <Container>
            {loading ? ( <div>
          <i className="fa fa-spinner fa-spin"></i>
          Loading ...
        </div>) : error ? (<div>some error here</div>) : (
            <Row>
                {images && images.length === 0 && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ textAlign: "center" }}
              className="mt-2"
            >
              Image not found. Please upload an image
            </Typography>
          )}
          {images.map((image, index) => {
            return (
              <Col lg={6} md={12} sm={12} xs={12} key={image._id} className="image-column">
                <Image image={image} />
              </Col>
            );
          })}
            </Row>)}
            <style>
                {`
                .image-column{
                    padding: 5px;
                }
                `}
            </style>
        </Container>
    )
}

export default Home
