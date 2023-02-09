const ImageProfil=(props) =>{
    const filename = props.filename;
    const alt_title=props.title;
    const image_link=props.image;
    const change_image=props.changePicture;
    if(filename && filename!=="" && change_image===false) {
      return (
        <>
        <img src={"/uploads/profil/picture/"+filename} alt={alt_title} height="150px" width="150px"></img>
        </>
        );
      }else if(change_image===true){
        return (
          <>
          <img src={image_link} alt={alt_title} height="150px" width="150px"></img>
          </>
          );
      }
      else{
      return (
        <>
        <label><strong>Image :</strong></label>
        </>
        );
    }
    
  };

  export default ImageProfil;