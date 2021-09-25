import React from 'react'
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

function Image(props) {
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="345"
          image={ `http://${props.image.imageName}`}
          alt="green iguana"
          style={{padding: "2px"}}
        />
      </Card>
    )
}

export default Image




// import React from 'react'
// import Card from "@material-ui/core/Card";
// import CardMedia from "@material-ui/core/CardMedia";

// function Image(props) {
//     return (
//       <div style={{backgroundImage: `url(http://${props.image.imageName})`, height: "400px", width: "100%", backgroundRepeat: "no-repeat", backgroundPosition: "ceter", backgroundSize: "cover"}}></div>
//       // <img className="image" src={`http://${props.image.imageName}`} width="460" height="345" />
//     )
// }

// export default Image

