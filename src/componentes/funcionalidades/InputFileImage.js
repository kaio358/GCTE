import { useRef, useEffect } from "react";
import styles from "./InputFileImage.module.css"
function InputFileImage({img,id}) {
    const pictureImage = useRef()

    function carrega(e) {
        
        const inputTarget = e.target;
        const file = inputTarget.files[0];
        if (file) {
                const reader = new FileReader();
        
                reader.addEventListener("load", function (e) {
                const readerTarget = e.target;
        
                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add(`${styles.picture__img}`);
        
                pictureImage.current.textContent = "";
                pictureImage.current.appendChild(img) 
               
                // pictureImage.appendChild(img);
                });
        
                reader.readAsDataURL(file);
            } else {
                pictureImage.current.innerHTML = "";
            }
    } 

    return(
        <div>
            <label className={styles.picture} htmlFor={id} tabIndex="0">
                <span ref={pictureImage} className={styles.picture__image}>{img? <img src={img}/> :"Clique para inserir uma imagem" }</span>
            </label>

            <input type="file" name="picture__input" className={styles.picture__input} id={id} onChange={carrega}/>
        </div>
      
    )
}

export default InputFileImage