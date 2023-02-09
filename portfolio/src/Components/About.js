
const About = (props) => {

    return (
      <>
      <section id="about-me" className="about-me">
        <h2>A Propos de moi</h2>
        <div className="line_hr"></div>
        <div className="picture_profil">
            <img src={"uploads/profil/picture/"+props.profil.picture_profil} alt={props.profil.lastname+" "+ props.profil.firstname}/>
        </div>
    
        <div className="about-me-description">
            <p>{props.profil.description}</p>
        </div>

      </section>
      </>
    )
}
export default About;