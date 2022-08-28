import '../styles/general.scss'
import '../styles/parts/charSingle.scss'
import loki from '../resources/images/char_loki.jpg'

const CharSingle = () => {
    return (
        <section className="character">
            <div className="container">
                <div className="character__wrapper">
                    <div className="character__img">
                        <img src={loki} alt="loki"/>
                    </div>
                    <div className="character__info">
                        <h2 className="character__name title">
                            Loki
                        </h2>
                        <p className="character__descr">
                            In Norse mythology, Loki is a god or jötunn (or both). Loki is the son of Fárbauti and Laufey, and the brother of Helblindi and Býleistr. By the jötunn Angrboða, Loki is the father of Hel, the wolf Fenrir, and the world serpent Jörmungandr. By Sigyn, Loki is the father of Nari and/or Narfi and with the stallion Svaðilfari as the father, Loki gave birth—in the form of a mare—to the eight-legged horse Sleipnir. In addition, Loki is referred to as the father of Váli in the Prose Edda.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CharSingle;