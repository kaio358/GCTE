import Container from "../layout/Container"
import styles from "./Home.module.css"

function Home() {
    return(
        <div className={styles.containerHome}>
            <Container customClass=".tiposColunas">
                <h1>Página principal</h1>

            </Container>

        </div>
    )
}

export default Home