import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {Button} from "@material-ui/core";
import {logout} from "../actions/UserActions"
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, styled} from '@material-ui/core';
import { selectedImageUpload } from "../actions/HomeActions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Input = styled('input')({
  display: 'none',
});

function Header() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState('no_image_available.png');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {user} = userLogin;
  const [image, setImage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleLogoutAction = () => {
    dispatch(logout())
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleFile = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  }
  let counter = 0;
  
  const uploadSelectedImage = async () => {
    if(!image){
      return false
    }
    if(counter == 0){
      const formData = new FormData();
      formData.append('image', image);
      setProcessing(true)
      await dispatch(selectedImageUpload(formData));
      setProcessing(false)
      setOpen(false);
      setFile('no_image_available.png')
      setImage(null)
    }
    counter++;
  }

  return (
    <Navbar bg="dark" variant="dark" collapseOnSelect expand="md" sticky="top">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Select or capture an image"}</DialogTitle>
        <DialogContent>
        <label htmlFor="contained-button-file">
          <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFile}/>
          <Button variant="contained" component="span">
            Select Image
          </Button>
        </label>
        <div className="image-box">
          <img src={file} alt="Image not available" height="100%" width="100%"></img>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="danger">Cancel</Button>
          {!processing && (<Button onClick={uploadSelectedImage} variant="contained" color="primary">Upload</Button>)}
          {processing && (<Button onClick={uploadSelectedImage} variant="contained" color="primary">Uploading Please wait</Button>)}
        </DialogActions>
      </Dialog>
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />{" "}
            Album
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav className="mr-auto">
              {!user && (<LinkContainer to="login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>)}
              {user && (<Nav.Link>
                <Button variant="contained" onClick={handleClickOpen}>Upload Image</Button>
              </Nav.Link>)}
              {user && (<Nav.Link>
                {user.name}
              </Nav.Link>)}
              {user && (<Nav.Link onClick={handleLogoutAction}>
                Logout
                <ExitToAppIcon />
              </Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;